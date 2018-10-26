#!/usr/bin/env bash
asc ./src/helloworld.ts -o ./dist/helloworld.wast --optimize --validate --binaryFile ./dist/helloworld.wasm
#cd ./dist
#sed -i.bak 's/,/_/g' helloworld.wast && rm helloworld.wast.bak
