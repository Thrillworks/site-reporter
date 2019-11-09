#!/bin/bash
cd -- "$(dirname "$0")"
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
cp ./report-ui/build/index.html ./report-result.html
sudo npm uninstall -g site-reporter lighthouse-batch
echo "Results in report-result.html. Now opening it in your browser..."
open ./report-result.html