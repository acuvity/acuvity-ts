#!/bin/bash -e

echo "npm sanity tests"
npm test

echo "bun sanity test"
npm run test_bun

echo "deno sanity test"
deno task all
