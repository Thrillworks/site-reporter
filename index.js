#!/usr/bin/env node

const Crawler = require("crawler");
const domainMatch = require("domain-match");
const yargs = require('yargs');

//globals
var urlList = [];

const argv = yargs
    .command('site', 'the site to run reports against', {
        site: {
            description: 'url of site to run report against, example: https://www.amazon.com',
            alias: 's',
            type: 'string',
        }
    })
    .option('verbose',{
        description: 'verbose output to the process',
        alias: 'v',
        default: false,
        type: 'boolean',
    })
    .help()
    .alias('help','h')
    .argv;
 
const primaryURLScrape = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server

                /* URI Object example properties
                    uri:
                    protocol: 'https:',
                    slashes: true,
                    auth: null,
                    host: 'www.amazon.com',
                    port: 443,
                    hostname: 'www.amazon.com',
                    hash: null,
                    search: null,
                    query: null,
                    pathname: '/',
                    path: '/',
                    href: 'https://www.amazon.com/' }
                */
            
            const requestUri = res.request.uri
            const uri = requestUri.protocol+'//'+requestUri.host+':'+requestUri.port
            console.log(uri)
            var count = 0;
            $("a").each(function(index,value){
                const href = value.attribs.href
                
                if (!href){
                    //no href
                    return
                }
                const isPageAnchor = href === "#" || href[0] === "#";
                if (isPageAnchor) {
                    //we don't collect page anchors
                    return
                }

                //check only for Local URLs
                const isSameDomain = domainMatch(uri,href)
                const isAbsoluteURL = href.includes("http://") || href.includes("https://");
                if (!isSameDomain && isAbsoluteURL) {
                    //disgarding external Url;
                    return
                }

                if(isSameDomain) {
                    //likely an absolute url on this domain
                    console.log("absolute url");
                    console.log(href)
                }else{
                    //assemble full url
                    console.log(uri+href);
                }
                count++;
                
            });
            console.log(`found ${count} pages`)
            
        }
        done();
    }
});
 
// Queue just one URL, with default callback
if(argv._.includes('site')){
    if(argv.verbose) {
        console.log(`Beginning reports for ${argv.site}`)
    }
    primaryURLScrape.queue(argv.site);
}

 
