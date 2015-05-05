/**
 *
 * (c) 2013-2015 Wishtack
 *
 * $Id: $
 */

module.exports = function testE2e(done) {

    var gulp = require('gulp');
    var protractorRunner = require('wt-protractor-runner');

    /* Load config. */
    var config = require('../config-protractor')();

    /* Run tests. */
    protractorRunner(config)(done);

};
