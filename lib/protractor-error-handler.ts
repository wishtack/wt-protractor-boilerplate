/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { getSpecReferences } from 'jasmine-fail-fast';

export class ProtractorErrorHandler {

    _asyncFlow: Promise<any>;
    _onFailure: () => Promise<any>;
    _specReferences;
    _scenarioSuiteDepth: number;

    /**
     *
     * Example:
     *
     * level 0 (jasmine top level suite)
     * describe('level 1 (container)', () => {
     *   describe('level 2 (scenario)', () => {
     *     describe('level 3 (scene)', () => {
     *       it('...');
     *     });
     *   });
     * });
     *
     * If a spec fails, and if `suiteDepth` is set to 2, this will skip the scenario (level 2) and run the next one.
     *
     * @param {number} suiteDepth is the depth of the "scenario" suite.
     *
     */
    constructor({
                    onFailure,
                    scenarioSuiteDepth = 2
                }: {
        onFailure?: () => Promise<any>,
        scenarioSuiteDepth?: number
    } = {}) {

        this._onFailure = onFailure;
        this._scenarioSuiteDepth = scenarioSuiteDepth;
        this._specReferences = getSpecReferences();
    }

    jasmineStarted() {

        beforeEach(async () => {
            await this._asyncFlow;
            this._asyncFlow = null;
        });

    }

    specDone(result) {
        this._addAsyncTaskToFlow(() => this._asyncSpecDone({result}));
    }

    _addAsyncTaskToFlow(asyncTask: () => Promise<any>) {

        if (this._asyncFlow == null) {
            this._asyncFlow = asyncTask();
        }
        else {
            this._asyncFlow = this._asyncFlow
                .then(asyncTask);
        }

    }

    async _asyncSpecDone({result}) {

        if (result.status !== 'failed') {
            return;
        }

        const suite = this._findSuite({specId: result.id});

        this._disableSuite({suite});

        if (this._onFailure != null) {
            return await this._onFailure();
        }

    }

    _findSuite({specId}) {

        for (let suite of this._specReferences.suites) {

            if (!this._doesSuiteContainSpec({suite, specId})) {
                continue;
            }

            /* Looking for second level parent suite.
             * level 0 (jasmine top level suite)
             * describe('first level (container)', () => {
             *   describe('second level (scenario)', () => {
             *     describe('third level (scene)', () => {
             *       it('...');
             *     });
             *   });
             * });
             */
            while (this._getSuiteDepth({suite}) > this._scenarioSuiteDepth) {
                suite = suite.parentSuite;
            }

            return suite;

        }

    }

    _doesSuiteContainSpec({suite, specId}) {

        return suite.children.find(spec => spec.id === specId) != null;

    }

    _disableSuite({suite}) {

        for (const specOrSuite of suite.children) {

            if (specOrSuite.disable != null) {
                specOrSuite.disable();
            }
            else {
                this._disableSuite({suite: specOrSuite});
            }

        }

    }

    /**
     * Get suite's depth starting at 0 for jasmine top level suite.
     * @param {any} suite
     * @private
     */
    _getSuiteDepth({suite}) {

        let depth = 0;
        let parentSuite = suite.parentSuite;

        while (parentSuite != null) {
            parentSuite = parentSuite.parentSuite;
            ++depth;
        }

        return depth;

    }

}
