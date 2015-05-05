/**
 *
 * (c) 2013-2015 Wishtack
 *
 * $Id: $
 */

describe('google wishtack', function testGoogleWishtack() {

    var _waitForElement = function _waitForElement(selector) {
        return browser.driver.wait(browser.driver.isElementPresent.bind(browser.driver, selector), 10000 /* Timeout. */);
    };

    it('should return wishtack', function shouldReturnWishtack() {

        var PageGoogle = require('./pages/page-google');

        var pageGoogle = new PageGoogle();

        /* Go to google. */
        browser.driver.get(pageGoogle.pageUrl());

        /* Wait for form. */
        _waitForElement(pageGoogle.selectorInputSearch());

        /* Search. */
        browser.driver.findElement(pageGoogle.selectorInputSearch()).sendKeys('wishtack');
        browser.driver.findElement(pageGoogle.selectorForm()).submit();

        /* Wait for result. */
        _waitForElement(pageGoogle.selectorResult());

        /* Check result content. */
        expect(browser.driver.findElement(pageGoogle.selectorResult()).getText()).toMatch(/www.wishtack.com/);

    });

});