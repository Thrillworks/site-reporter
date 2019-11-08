#!/bin/bash

cd .. && npm -i -g site-reporter lighthouse-batch
cd site-reporter
echo "Enter URL of the website: "
read url
echo "You entered:" $url ". Do you want to continue (Y/N)? "
read $url_answer
site-reporter report $url