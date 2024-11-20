import path from 'path';
import fs from 'fs-extra';
import _ from 'lodash';
import nunjucks from 'nunjucks';
import yargs from 'yargs';

import { IModelsJSON, ISpec } from './const';
import {
  compileTypeDef,
  writeElementalInfo,
  writeSchemaDict,
} from './tasks';

const extraTypeFilenames = [
  'elemental.json',
];

async function main(inDir: string, outDir: string) {
  nunjucks.configure({
    autoescape: false,
    throwOnUndefined: true,
  });

  const mapFilenameToSpec = async (filename: string) => {
    return fs.readJson(path.resolve(inDir, filename)).then((spec: ISpec) => ({ ...spec, $id: filename }));
  }

  fs.copySync('src/utils/elemental/cli/types', inDir); // For json-schema-to-typescript
  const modelJson = fs.readJsonSync(path.resolve(inDir, '_models.json')) as IModelsJSON;
  let listJson = fs.readJsonSync(path.resolve(inDir, '_lists.json'));
  listJson = { ...listJson, $id: '_lists.json' };
  const specFilenames = _.map(modelJson.properties, '$ref');
  const specs = await Promise.all(specFilenames.map(mapFilenameToSpec));
  const extraTypeSpecs = await Promise.all(extraTypeFilenames.map(mapFilenameToSpec));
  await fs.ensureDir(outDir);

  return Promise.all([
    compileTypeDef(specs, inDir, outDir),
    writeSchemaDict([...specs, ...extraTypeSpecs, listJson], outDir),
    writeElementalInfo(specs, outDir),
  ]);
}

const argv = <{ in: string; out: string }><unknown>(yargs(process.argv.slice(2))
  .option(
    'in',
    {
      alias: 'i',
      demandOption: true,
      describe: 'directory containing spec files',
      type: 'string',
    },
  )
  .option(
    'out',
    {
      alias: 'o',
      demandOption: true,
      describe: 'root directory for output',
      type: 'string',
    },
  ).argv);

main(argv.in, argv.out)
  .catch((e: Error) => {
    console.error(e.stack);
    process.exit(1);
  });
