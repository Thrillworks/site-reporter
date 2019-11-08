#!/bin/bash

cd ..
sudo npm install -g site-reporter lighthouse-batch
cd site-reporter
url_answer="N"
while [[ "$url_answer" != Y && "$url_answer" != y ]]
do
    echo "Enter URL of the website: "
    read url
    echo "You entered:" $url ". Is that correct(Y/N)?"
    read url_answer
done
echo "Now executing site-reporter script $url"
site-reporter report $url
sudo npm uninstall -g site-reporter lighthouse-batch