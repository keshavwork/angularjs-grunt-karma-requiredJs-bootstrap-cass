#!/bin/bash -ue

echo "Removing old files..."

cd clm-web-ui
rm app/scripts/common/config.js -f

echo "Installing development dependencies..."

npm cache clean
npm prune
npm install

echo "Installing Bower dependencies..."

bower cache clean
bower prune
bower update
bower install

echo "Building application..."

grunt build:${enviorment}

if [ -z "${NOTESTS:-}" ]; then
   grunt karma:unit # For code coverage
   grunt htmlangular:dist --force # Testing 'compiled' code
   grunt jenkins # Testing 'compiled' code
fi