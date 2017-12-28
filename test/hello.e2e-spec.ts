/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { browser, by } from 'protractor';

describe('Hello', () => {

    it('should go to wishtack', async () => {
        await browser.driver.get('https://www.wishtack.com')
    });

    it('should find signin button', async () => {
        await browser.wait(async () => {
            return await browser.driver.findElement(by.css('button'));
        });
    });

});
