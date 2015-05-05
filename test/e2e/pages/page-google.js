/**
 *
 * (c) 2013-2015 Wishtack
 *
 * $Id: $
 */

var dejavu = require('dejavu');

module.exports = dejavu.Class.declare({

    pageUrl: function pageUrl() {
        return 'https://www.google.com';
    },

    selectorForm: function selectorFor() {
        return by.css('form[action="/search"]');
    },

    selectorInputSearch: function selectorInputSearch() {
        return by.id('lst-ib');
    },

    selectorResult: function selectorResult() {
        return by.id('rso');
    }

});
