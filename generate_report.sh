#!/bin/bash

npm i -g lighthouse-batch site-reporter
echo "Enter URL of the website: "
read url
echo "You entered:" $url;
site-reporter report $url