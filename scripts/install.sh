#!/bin/bash -ue

sudo apt-get update -y || true
sudo apt-get install -y npm ruby ruby-dev phantomjs git zip
sudo ln -sfv /usr/bin/nodejs /usr/bin/node

sudo npm install bower bower-requirejs grunt grunt-cli karma karma-cli  -g
sudo gem install sass compass --no-rdoc --no-ri

# Notes: For some reason you will have to add this code to your .bashrc in order to install sass and comapss gems
#
# if which ruby >/dev/null && which gem >/dev/null; then
#    PATH="$(ruby -rubygems -e 'puts Gem.user_dir')/bin:$PATH"
# fi
#
# And then run:
# gem install --user-install sass compass --no-rdoc --no-ri