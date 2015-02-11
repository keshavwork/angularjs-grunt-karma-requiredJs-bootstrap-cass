#!/bin/bash
#

#Add Build Id from Jenkins to index.html
perl -pe "s/\{\{build\}\}/${BUILD_NUMBER:-0}/g" -i clm-web-ui/dist/index.html

echo "Creating 'package' zip file..."

cd clm-web-ui/dist
zip -r package.zip *

echo "Existing zip files:"
ls -l *.zip

cd ../..
exit 0
