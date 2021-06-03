const auditor = require('tw-accessibility-auditor');
const asyncReduce = require('tw-async-reduce');
const fs = require('fs-extra');
const config = require('../config');

module.exports = {
  command: 'accessibility',
  desc: 'Run an accessibility audit without running a full report. (Must have previously run a report).',
  builder: argv => {
    argv.option('verbose', {
      describe: 'Turn on verbose logging.',
      alias: 'v',
      default: true,
      type: 'boolean'
    });
  },
  handler: async (argv = {}) => {
    const summaryPath = `${config.reportPath}/summary.json`;
    const summary = require(`../${summaryPath}`);
    
    if (!summary) console.log(`Could not run accessibility audit: site report not found. You must run a site report before the accessibility audit.`);
    else {
      // if (argv.verbose) console.log(`Beginning accessibility audit`);
      console.log(`Beginning accessibility audit`);
      const results = await asyncReduce(summary, async (page, index) => {
        console.log(`Auditing page ${index+1} of ${summary.length}: ${page.url}`);
        try {
          const { url, violations } = await auditor.audit(page.url);
          page.accessibilityAudit = { url, violations };
          if (argv.verbose) console.log(`Found ${violations.length} violations.`);
        } catch (e) {}
        return page;
      });
      
      await fs.writeFile(summaryPath, JSON.stringify(results, null, 2));
      if (argv.verbose) console.log(`Accessibility audit complete`);
    }
  }
};

