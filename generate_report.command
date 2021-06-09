#!/bin/bash
cd -- "$(dirname "$0")"
cd ..
if [[ `npm list -g | grep -c $site-reporter` = 0 && `npm list -g | grep -c $lighthouse-batch` = 0 ]]
then
    sudo npm install -g site-reporter lighthouse-batch
fi
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
node site-reporter.js report $url -a
cd ./report-ui/ 
npx react-scripts build
npx react-scripts start