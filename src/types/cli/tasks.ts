import path from "path";
import fs from "fs-extra";
import { compile } from "json-schema-to-typescript";
import _ from "lodash";
import nunjucks from "nunjucks";

import { ISpec } from "./const";
import * as utils from "./utils";

function assertPropertyIsString(spec: {}, propertyName: string): string {
  // eslint-disable-line
  const prop = _.get(spec, propertyName);
  if (typeof prop !== "string") {
    throw new Error(
      `Expected specification to have string property ${propertyName} but got: ${typeof prop} (${JSON.stringify(
        spec,
        null,
        2
      )})`
    );
  }

  return prop;
}

function specIsIdentifiable(spec: any): boolean {
  // eslint-disable-line
  if (_.get(spec, "properties.ID")) {
    return true;
  }
  const modelName = assertPropertyIsString(spec, "$modelName");
  if (modelName.startsWith("Indexed")) {
    return true;
  }

  return false;
}

// generatePropertyDetails returns the property details for the given property.
function generatePropertyDetails(property: {}): {} {
  // eslint-disable-line
  const result = {};

  const defaultValue = _.get(property, "$defaultValue");
  if (defaultValue !== null) {
    _.set(result, "defaultValue", defaultValue);
  }

  if (_.get(property, "$readOnly")) {
    _.set(result, "readOnly", true);
  }

  if (_.get(property, "$creationOnly")) {
    _.set(result, "creationOnly", true);
  }

  if (_.get(property, "$required")) {
    _.set(result, "required", true);
  }

  if (_.has(property, "description")) {
    _.set(result, "description", _.get(property, "description"));
  }

  if (_.has(property, "$friendlyName")) {
    _.set(result, "title", _.get(property, "$friendlyName"));
  }

  if (_.has(property, "type")) {
    _.set(result, "type", _.get(property, "type"));
  }

  if (_.has(property, "$secret")) {
    _.set(result, "secret", _.get(property, "$secret"));
  }

  return result;
}

/** Compile module entries (<ModelName>.d.ts) */
export async function compileTypeDef(
  specs: ISpec[],
  inDir: string,
  outDir: string
) {
  return Promise.all(
    specs.map(async (spec) => {
      const modelName = assertPropertyIsString(spec, "$modelName");

      return fs.writeFile(
        path.join(outDir, `${modelName}.ts`),
        nunjucks.render("src/utils/elemental/cli/templates/model.ts.njk", {
          // In the JSON  Schema, we have `additionalProperties: true` for all the models
          // because the backend can send additional properties,
          // and we don't want to reject the object because of it.
          // However, during `json-schema-to-typescript`, this option will introduce
          // `[k: string]: any;` to all the interfaces, which will make the type checking useless,
          // and when using `keyof ModelA`, we cannot get the explicit list of the known properties.
          // Thus, we need to manually override it to `false`.
          modelDefinition: await compile(
            { ...spec, additionalProperties: false },
            modelName,
            {
              bannerComment: "",
              cwd: inDir,
            }
          ),
          spec,
          modelName,
          restName: assertPropertyIsString(spec, "$modelRestName"),
          isIdentifiable: specIsIdentifiable(spec),
          generatePropertyDetails,
          utils,
        })
      );
    })
  );
}

/** Collect elemental info */
export const writeElementalInfo = async (specs: ISpec[], outDir: string) => {
  return fs.writeFile(
    path.join(outDir, "@elemental-info.ts"),
    nunjucks.render("src/utils/elemental/cli/templates/elemental-info.ts.njk", {
      models: _.sortBy(specs, "$modelName"),
    })
  );
};

export const writeSchemaDict = async (specs: ISpec[], outDir: string) =>
  fs.writeFile(
    path.join(outDir, "@schemasMap.json"),
    JSON.stringify(
      specs.reduce((acc, curr) => {
        const key = curr.$id;
        return { ...acc, [key]: curr };
      }, {})
    )
  );
