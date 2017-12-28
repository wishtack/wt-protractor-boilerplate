// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const HtmlReporter = require('protractor-beautiful-reporter');


exports.config = {
  /* Some pages are slow to start as they have to load long product lists which are displayed progressively etc... */
  allScriptsTimeout: 60000,
  specs: [
    './test/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--lang=en',
        '--window-size=1024,768'
      ],
      prefs: {
        profile: {
          managed_default_content_settings: {
            /* Automatically allow stupid facebook notifications' authorization dialog. */
            notifications: 1
          }
        }
      }
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
    includeStackTrace: true,
    isVerbose: true,
    realtimeFailure: true,
    showTiming: true,
    print: function() {}
  },
  onPrepare() {

    require('ts-node').register({
      project: 'tsconfig.json'
    });

    const { ProtractorErrorHandler } = require('./lib/protractor-error-handler');

    const reporterList = [

        /* Create beautiful reports with screenshots and browser logs. */
        new HtmlReporter({
            baseDirectory: 'reports/e2e',
            jsonsSubfolder: 'json',
            screenshotsSubfolder: 'screenshots'
        }).getJasmine2Reporter(),

        /* Skip scenario suite on error, clear cookies and local storage then move to next scenario suite. */
        new ProtractorErrorHandler(),

        /* Console reporter. */
        new SpecReporter({
            spec: {
                displayDuration: true,
                displayStacktrace: true
            }
        })

    ];

    reporterList.forEach((reporter) => jasmine.getEnv().addReporter(reporter));

  }
};

