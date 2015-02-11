#!/bin/bash -ue

cd clm-web-ui

echo "Loading dependencies..."

npm install
bower cache clean
bower install

cd scripts

echo "Generating license file"
mkdir -p ../docs
node licenses.js > ./../docs/licenses.json