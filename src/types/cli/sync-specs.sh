#!/bin/sh

# Specify where the specification files of your bahamut backend are.
# Note: you can override this env var if needed.
SPECIFICATIONS_DIRECTORY="${SPECIFICATIONS_DIRECTORY-../../../../acuvity/backend/pkgs/api/apex/jsonschema}"

# Determine the path to your elemental folder in the frontend codebase.
ELEMENTAL_DIR="./src/types"

# Convert models
echo "> Converting specs to TypeScript model..."
npx tsc --project "${ELEMENTAL_DIR}/cli/tsconfig.json"
node ${ELEMENTAL_DIR}/cli/build/cli.js start -i "${SPECIFICATIONS_DIRECTORY}" -o "${ELEMENTAL_DIR}/apex"

# cleanup
rm -rf "${ELEMENTAL_DIR}/cli/build"
