// Copyright Notice:
//					base.js
//			Copyright©2012-2015 - OpenSiteMobile
//				All rights reserved
// ==========================================================================
//			http://opensitemobile.com
// ==========================================================================
// Contact Information:
//			Author: Dwight Vietzke
//			Email:  dwight_vietzke@yahoo.com

/*
	OpenSiteMobile MobileSiteOS base object file.
	Use as the installation base for all your MobileSiteOS web apps.

	This file includes: Modernizr.js, Purl.js, Verge.js, Basil.js
*/

/*global
    jQuery: false,
    Modernizr: false,
    _: false
*/

if (console && console.info) { console.info('msos/base -> start.'); }

// --------------------------
// Our Global Object
// --------------------------
export let msos = {

	// *******************************************
    // Edit these key/value pairs on initial setup
	// *******************************************

    // Edit msos.default_locale (to be your native or typical user language) using one of the
    // codes in 'msos.config.i18n.select_trans_msos'. This must correspond to the language used
    // for the files in the 'ROOT' of the '/msos/nls' folder (those used as default, which are currently 'en').
    default_locale: (document.getElementsByTagName('html')[0].getAttribute('lang') || 'en'),

	// Edit msos.default_translate to be your preferred initial 'translate to' language for
	// '/demo/msos_translate.html'.
	default_translate: 'fr',

    // Edit msos.default_country to be the country codes most likely used by your user's, based on browser
    // language locale code (note: use underscores for '-' in object item name). See 'msos.countrystate.country'
    // for ref. to available two-letter country codes for value.
    default_country: {
        en: 'US',
        fr: 'FR',
        de: 'DE'
    },

	// Edit msos.default_keyboard_locales to be the most utilized language (locale) by your user's.
	// Order is relative to there display. These codes are base on the available codes found in
	// msos.config.i18n.select_kbrds_msos
	default_keyboard_locales: [
		'en', 'fr', 'de', 'es'
	],

	// *******************************************
    // *** Do NOT edit the key/value pairs below ***
	// *******************************************

    base_site_url: '//' + document.domain,
	base_script_url: '',
	base_config_url: '',
	base_images_url: '',

    body: null,
    head: null,
    html: null,
    docl: null,

	ajax_loading_kbps: {},

	deferred_css: [],
	deferred_scripts: [],

	dom: {},

    form_inputs: null,
    form_validate: null,
    html_inputs: ['text', 'file', 'password', 'textarea', 'radio', 'checkbox', 'select'],
    html5_attributes: [
		// All possible HTML5 form input attributes
		'autocomplete', 'autofocus', 'list', 'placeholder', 'max', 'min', 'maxlength', 'multiple', 'pattern', 'required', 'step'
	],
    html5_inputs: [
		// All possible HTML5 input fields
		'search', 'tel', 'url', 'email', 'datetime', 'date', 'month', 'week', 'time', 'datetime-local', 'number', 'range', 'color'
	],

    i18n_order: [],
    i18n_queue: 0,

	log_methods: ['error', 'warn', 'info', 'debug', 'time', 'timeEnd', 'log'],

	onload_func_pre:	[],
    onload_func_start:	[],
    onload_functions:	[],
    onload_func_done:	[],
	onload_func_post:	[],

	ondisplay_size_change: [],

	onorientationchange_functions: [],
    onresize_functions: [],

    record_times: {},

    registered_files: {
        js: {},
        css: {},
        ico: {},
		ajax: {}
    },
    registered_folders: {
        msos: '',
        jquery: '',
        apps: ''
    },
    registered_modules: {
        msos: false
    },
    registered_templates: {},
    registered_tools: {},
    require_attempts: 0,
	require_deferred: 0,
    require_queue: 0
};


// *******************************************
// Base Configuration Settings
// Edit as deisired for all apps
// *******************************************

msos.config = {
	// Ref. -> set app specifics in '/js/config.js' file
    console: false,
	clear_storage: false,
    debug: false,
	debug_css: false,
	debug_output: false,
	debug_script: false,
	debug_disable: false,
    mobile: false,
	verbose: false,
	visualevent: false,

    run_ads: false,
	run_size: false,
	run_analytics: false,
    run_onerror: false,
	run_overflowscroll: false,
    run_social: false,
	run_translate: false,
	run_amazon_prev: false,

    browser: {
		ok: false,
        advanced: false,
        current: false,
        direction: '',
        editable: false,
        mobile: false,
        touch: false
    },

    // jQuery.ajax, 'cache' required scripts/templates (static files), false for testing
    cache: true,

    // Editable display or resource variables
    color: {
        bk: 'black',
        wh: 'white',
        dg: 'darkgrey',
        lg: 'lightgrey',
        sl: 'salmon',
        lb: 'lightblue',
        rd: 'red',
        be: 'beige'
    },

	connection: {
		type: 0,
		bandwidth: 10,
		metered: false
	},

    storage: {
		// These are specific storage identifier names
        site_pref: { name: 'msos_site_pref', value: '', set: false },		// Site Preferences -> core.uc.js & core.min.js
        site_i18n: { name: 'msos_site_i18n', value: '', set: false },		// i18n -> msos.i18n & msos.intl
		site_cltl: { name: 'msos_site_cltl', value: '', set: false },		// Colortool -> msos.colortool.calc
		site_bdwd: { name: 'msos_site_bdwd', value: '', set: false },		// Bandwidth -> core.uc.js & core.min.js
		site_ajax: { name: 'msos_site_ajax', value: '', set: false },		// Ajax load times object -> core.uc.js & core.min.js 

		// These are base names
		site_tabs: { name: 'msos_site_tab_'  },		// Tabs -> msos.tab
		site_sdmn: { name: 'msos_site_sdm_'  },		// Slashdot Menu -> msos.sdmenu.js
		site_popu: { name: 'msos_site_pop_'  }		// Popup Div's -> msos.popdiv
    },

	// All the T/F toggles used for debugging (see msos.debugform)
	debugging: [
		'console',
		'debug', 'debug_script', 'debug_css', 'debug_output',
		'mobile', 'verbose', 'visualevent',
		'run_ads', 'run_size', 'run_analytics', 'run_onerror',
		'run_overflowscroll', 'run_social', 'run_translate', 'run_amazon_prev',
		'use_date', 'use_color', 'use_number', 'use_range',
		'clear_storage'
	],

    // Default settings and tests
    doctype: window.document.getElementsByTagName('html')[0].getAttribute('xmlns') ? 'xhtml5' : 'html5',

    file: {
        'file': (typeof window.File === "object" ? true : false),
        'reader': (typeof window.FileReader === "function" ? true : false),
        'list': (typeof window.FileList === "object" ? true : false),
        'blob': (typeof window.Blob === "object" ? true : false)
    },

    // Force the use of MSOS HTML5 shim widgets?
	force_shim: {
		inputs: {
			date: true,
			color: true,
			number: true,
			range: true,
			time: false,
			month: false,
			week: false
		},
		media: {
			// Future
			video: false,
			audio: false
		}
	},

	google: {
		no_translate: {},
		hide_tooltip: {}
	},

	// Set full url in config.js file
	hellojs_redirect: '/mobilesiteos/hello/redirect.html',

    // See 'msos.i18n' and the 'MSOS Available Language Matrix' for ref.
    i18n: {
        select_trans_msos: {},
        select_kbrds_msos: {}
    },

    // See 'msos.intl' for ref.
    intl: {
        select_culture: {},
        select_calendar: {}
    },

    // i18n Internationalization config and object definitions
     locale: (navigator.language || navigator.userLanguage || msos.default_locale).replace('-', '_').toLowerCase(),
    culture: (navigator.language || navigator.userLanguage || msos.default_locale).replace('-', '_').toLowerCase(),
    calendar: 'standard',

    json: (typeof JSON === 'object' && typeof JSON.stringify === 'function' && typeof JSON.parse === 'function' ? true : false),

    jquery_ui_theme: 'mobilesiteos',
    jquery_ui_avail: {
        base: 'Base (generic)',
        lightness: 'UI-Lightness',
		mobilesiteos: 'MobileSiteOS'
    },

	keyboard: '',
	keyboard_locales: [...msos.default_keyboard_locales],

    gesture: (function () {
        "use strict";
        let el = document.createElement('div');
        el.setAttribute('ongesturestart', 'return;');
        return (typeof el.ongesturestart === 'function' ? true : false);
    }()),

	onerror_uri: 'http://' + window.location.hostname + '/onerror.html',

	orientation: (typeof window.orientation === 'number' ? true : false),
    orientation_change: ('onorientationchange' in window ? true : false),

	page_uri: window.location.href,

    pixel_ratio: window.devicePixelRatio || 1,

    popups_blocked: false,

	query: {},

    script_onerror: (function () {
        "use strict";
        let spt = document.createElement('script');
			spt.type = 'text/javascript';
			spt.setAttribute('onerror', "return;");
        if (typeof spt.onerror === 'function') {
            return true;
        }
        return ('onerror' in spt ? true : false);
    }()),

	script_preload: {
		available: false,
		async: false,
		defer: false,
		explicit: false,
		ordered: false,
		xhr_cache: false
	},

    scrolltop: (window.pageXOffset !== undefined || document.documentElement.scrollTop !== undefined ? true : false),

	size: '',
	size_folder: 'css',
	size_array: [],
    size_wide: {		// Note: these keys are the names used to call sizing CSS
		'desktop': 1080,
        'large': 960,
        'medium': 760,
        'small': 640,
        'tablet': 480,
        'phone': 320
    },

	social: {},

    touch: {
        ontouchstart: ('ontouchstart' in window ? true : false),
        ontouchend: ('ontouchend' in document ? true : false),
        object: (typeof window.Touch === "object" ? true : false),
        event: (window.TouchEvent !== undefined ? true : false),
        create: ('createTouch' in document ? true : false),
		doc_touch: ('DocumentTouch' in window && document instanceof DocumentTouch ? true : false)
    },

    view_orientation: {
        layout: '',
        direction: '',
        method: '',
        numeric: 0
    },

    view_port: {
        height: 0,
        width: 0,
        delta_width: 0,
        delta_heigth: 0
    }
};


/*
 * Purl (A JavaScript URL parser) v2.3.1
 * Developed and maintanined by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 */

(function (_global) {

    let tag2attr = {
            a       : 'href',
            img     : 'src',
            form    : 'action',
            base    : 'href',
            script  : 'src',
            iframe  : 'src',
            link    : 'href',
            embed   : 'src',
            object  : 'data'
        },

        key = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'], // keys available to query

        aliases = { 'anchor' : 'fragment' }, // aliases for backwards compatability

        parser = {
            strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
            loose :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
        },

        isint = /^[0-9]+$/;

    function parseUri( url, strictMode ) {
        let str = decodeURI( url ),
        res   = parser[ strictMode || false ? 'strict' : 'loose' ].exec( str ),
        uri = { attr : {}, param : {}, seg : {} },
        i   = 14;

        while ( i-- ) {
            uri.attr[ key[i] ] = res[i] || '';
        }

        // build query and fragment parameters
        uri.param['query'] = parseString(uri.attr['query']);
        uri.param['fragment'] = parseString(uri.attr['fragment']);

        // split path and fragement into segments
        uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g,'').split('/');
        uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g,'').split('/');

        // compile a 'base' domain attribute
        uri.attr['base'] = uri.attr.host ? (uri.attr.protocol ?  uri.attr.protocol+'://'+uri.attr.host : uri.attr.host) + (uri.attr.port ? ':'+uri.attr.port : '') : '';

        return uri;
    }

    function getAttrName( elm ) {
        let tn = elm.tagName;
        if ( typeof tn !== 'undefined' ) return tag2attr[tn.toLowerCase()];
        return tn;
    }

    function promote(parent, key) {
        if (parent[key].length === 0) return parent[key] = {};
        let t = {};
        for (let i in parent[key]) t[i] = parent[key][i];
        parent[key] = t;
        return t;
    }

    function parse(parts, parent, key, val) {
        let part = parts.shift();
        if (!part) {
            if (isArray(parent[key])) {
                parent[key].push(val);
            } else if ('object' == typeof parent[key]) {
                parent[key] = val;
            } else if ('undefined' == typeof parent[key]) {
                parent[key] = val;
            } else {
                parent[key] = [parent[key], val];
            }
        } else {
            let obj = parent[key] = parent[key] || [];
            if (']' == part) {
                if (isArray(obj)) {
                    if ('' !== val) obj.push(val);
                } else if ('object' == typeof obj) {
                    obj[keys(obj).length] = val;
                } else {
                    obj = parent[key] = [parent[key], val];
                }
            } else if (~part.indexOf(']')) {
                part = part.substr(0, part.length - 1);
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
                // key
            } else {
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
            }
        }
    }

    function merge(parent, key, val) {
        if (~key.indexOf(']')) {
            let parts = key.split('[');
            parse(parts, parent, 'base', val);
        } else {
            if (!isint.test(key) && isArray(parent.base)) {
                let t = {};
                for (let k in parent.base) t[k] = parent.base[k];
                parent.base = t;
            }
            if (key !== '') {
                set(parent.base, key, val);
            }
        }
        return parent;
    }

    function parseString(str) {
        return reduce(String(str).split(/&|;/), function (ret, pair) {
            try {
                pair = decodeURIComponent(pair.replace(/\+/g, ' '));
            } catch(e) {
                // ignore
            }
            let eql = pair.indexOf('='),
                brace = lastBraceInKey(pair),
                key = pair.substr(0, brace || eql),
                val = pair.substr(brace || eql, pair.length);

            val = val.substr(val.indexOf('=') + 1, val.length);

            if (key === '') {
                key = pair;
                val = '';
            }

            return merge(ret, key, val);
        }, { base: {} }).base;
    }

    function set(obj, key, val) {
        let v = obj[key];
        if (typeof v === 'undefined') {
            obj[key] = val;
        } else if (isArray(v)) {
            v.push(val);
        } else {
            obj[key] = [v, val];
        }
    }

    function lastBraceInKey(str) {
        let len = str.length,
            brace,
            c;
        for (let i = 0; i < len; ++i) {
            c = str[i];
            if (']' == c) brace = false;
            if ('[' == c) brace = true;
            if ('=' == c && !brace) return i;
        }
		return undefined;
    }

    function reduce(obj, accumulator){
        let i = 0,
            l = obj.length >> 0,
            curr = arguments[2];
        while (i < l) {
            if (i in obj) curr = accumulator.call(undefined, curr, obj[i], i, obj);
            ++i;
        }
        return curr;
    }

    function isArray(vArg) {
        return Object.prototype.toString.call(vArg) === "[object Array]";
    }

    function keys(obj) {
        let key_array = [];
        for ( let prop in obj ) {
            if ( obj.hasOwnProperty(prop) ) key_array.push(prop);
        }
        return key_array;
    }

    function purl( url, strictMode ) {
        if ( arguments.length === 1 && url === true ) {
            strictMode = true;
            url = undefined;
        }
        strictMode = strictMode || false;
        url = url || window.location.toString();

        return {

            data : parseUri(url, strictMode),

            // get various attributes from the URI
            attr : function ( attr ) {
                attr = aliases[attr] || attr;
                return typeof attr !== 'undefined' ? this.data.attr[attr] : this.data.attr;
            },

            // return query string parameters
            param : function ( param ) {
                return typeof param !== 'undefined' ? this.data.param.query[param] : this.data.param.query;
            },

            // return fragment parameters
            fparam : function ( param ) {
                return typeof param !== 'undefined' ? this.data.param.fragment[param] : this.data.param.fragment;
            },

            // return path segments
            segment : function ( seg ) {
                if ( typeof seg === 'undefined' ) {
                    return this.data.seg.path;
                } else {
                    seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.path[seg];
                }
            },

            // return fragment segments
            fsegment : function ( seg ) {
                if ( typeof seg === 'undefined' ) {
                    return this.data.seg.fragment;
                } else {
                    seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.fragment[seg];
                }
            }

        };

    }

	_global.parse_string = parseString;
    _global.purl = purl;

}(msos));


msos.parse_query = () => {

	let url = msos.purl(),	// Get current page url
		key = '',
        cfg = '',
		result = url.param();

    for (key in result) {
		// only allow std word characters
		if (result.hasOwnProperty(key)) {
			result[key] = result[key].replace(/[^0-9a-zA-Z_]/g, '_');
	
			if (result[key] === 'true')		{ result[key] = true; }
			if (result[key] === 'false')	{ result[key] = false; }
		}
	}

    // Update msos.config if new info passed in by query string
    for (cfg in msos.config) {
		if (msos.config.hasOwnProperty(cfg)) {
			if (result[cfg] || result[cfg] === false) {
				msos.config[cfg] = result[cfg];
			}
		}
    }

	// Verbose output implies debugging too.
	if (msos.config.verbose) { msos.config.debug = true; }

    return result;
};

// Run immediately so inputs are evaluated
msos.config.query = msos.parse_query();


msos.console = (function () {

	let console_obj = { queue: [] },
		console_win = window.console,
		idx = msos.log_methods.length - 1,
		aps = Array.prototype.slice;

	// From AngularJS
    function formatError(arg) {
		if (arg instanceof Error) {
			if (arg.stack) {
				arg = (arg.message && arg.stack.indexOf(arg.message) === -1)
					? 'Error: ' + arg.message + '\n' + arg.stack
					: arg.stack;
			} else if (arg.sourceURL) {
				arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
			}
		}
		return arg;
    }

	while (idx >= 0) {

		(function (method) {

			console_obj[method] = function (...args) {

				// Always show errors and warnings
				if (!(method === 'error' || method === 'warn') && !msos.config.debug) {
					return;
				}

				let cfg = msos.config,
					filter = cfg.query.debug_filter || '',
					i = 0,
					name = args[0] ? args[0].replace(/\W/g, '_') : 'missing_args',
					console_org = console_win[method] || console_win.log;

				if (method === 'debug' && cfg.verbose && filter && /^[0-9a-zA-Z.]+$/.test(filter)) {
					filter = new RegExp('^' + filter.replace('.', "\."));
					if (!name.match(filter)) {
						msos.console.warn('msos.console -> no match for debug filter: ' + filter);
						return;
					}
				}

				if (method === 'time' || method === 'timeEnd') {
					msos.record_times[name + '_' + method] = (new Date()).getTime();
				}

				// if msos console output, add this
				if (cfg.console) {

					let log_output = [method, ...args];

					if (method === 'time' || method === 'timeEnd') {
						log_output.push(msos.record_times[name + '_' + method]);
					}

					console_obj.queue.push(log_output);
				}

				// if window console, add it
				if (console_win) {
					if (console_org.apply) {
						let out_args = [];

						for (i = 0; i < args.length; i += 1) {
							out_args.push(formatError(args[i]));
						}

						// Do this for normal browsers
						console_org.apply(console_win, out_args);

					} else {
						// Do this for IE9
						let message = args.join(' ');
						console_org(message);
					}
				}
			};

		}(msos.log_methods[idx]));

		idx -= 1;
	}

	return console_obj;
}());

msos.console.time('base');
msos.console.debug('msos/base -> msos.console now available.');
msos.console.debug('msos/base -> purl.js now available.');


/*!
 * modernizr v3.2.0
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */

(function(window, document) {

    var tests = [],
        classes = [],
        ModernizrProto = {
            _version: '3.2.0',

            // Any settings that don't work as separate modules
            // can go in here as configuration.
            _config: {
                'classPrefix': '',
                'enableClasses': true,
                'enableJSClass': true,
                'usePrefixes': true
            },

            // Queue of tests
            _q: [],

            // Stub these for people who are listening
            on: function(test, cb) {
                var self = this;

                setTimeout(function() {
                    cb(self[test]);
                }, 0);
            },

            addTest: function(name, fn, options) {
                tests.push({
                    name: name,
                    fn: fn,
                    options: options
                });
            },

            addAsyncTest: function(fn) {
                tests.push({
                    name: null,
                    fn: fn
                });
            }
        },
        Modernizr = function() {},
        docElement = document.documentElement,
        prefixes,
        newSyntax,
        oldSyntax,
        isSVG = docElement.nodeName.toLowerCase() === 'svg',
        hasEvent,
        testStyles,
        inputElem,
        inputtypes = ['search', 'tel', 'url', 'email', 'datetime', 'date', 'month', 'week', 'time', 'datetime-local', 'number', 'range', 'color'],
        inputs = {},
        domPrefixes,
        cssomPrefixes,
        modElem,
        mStyle,
        omPrefixes = 'Moz O ms Webkit',
        i = 0;

    function createElement() {

        if (typeof document.createElement !== 'function') {
            // This is the case in IE7, where the type of createElement is "object".
            // For this reason, we cannot call apply() as Object is not a Function.
            return document.createElement(arguments[0]);
        }

        if (isSVG) {
            return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
        }

        return document.createElement.apply(document, arguments);
    }

    inputElem = createElement('input');

    Modernizr.prototype = ModernizrProto;

    // Leak modernizr globally when you `require` it rather than force it here.
    // Overwrite name so constructor name is nicer :D
    Modernizr = new Modernizr();

    Modernizr.addTest('geolocation', 'geolocation' in navigator);
    Modernizr.addTest('websockets', 'WebSocket' in window && window.WebSocket.CLOSING === 2);
    Modernizr.addTest('devicemotion', 'DeviceMotionEvent' in window);
    Modernizr.addTest('deviceorientation', 'DeviceOrientationEvent' in window);

    Modernizr.addTest('localstorage', function() {
        var mod = 'modernizr';
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    });

    Modernizr.addTest('sessionstorage', function() {
        var mod = 'modernizr';
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    });

    Modernizr.addTest('websqldatabase', 'openDatabase' in window);

	Modernizr.addTest('cors', 'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest());

    // dataset API for data-* attributes
     Modernizr.addTest('dataset', function () {
        var n = createElement('div');

        n.setAttribute('data-a-b', 'c');

        return !!(n.dataset && n.dataset.aB === 'c');
    });

    function is(obj, type) {
        return typeof obj === type;
    }

    function testRunner() {
        var featureNames,
            feature,
            aliasIdx,
            result,
            nameIdx,
            featureName,
            featureNameSplit,
            featureIdx;

        for (featureIdx in tests) {
            if (tests.hasOwnProperty(featureIdx)) {
                featureNames = [];
                feature = tests[featureIdx];

                if (feature.name) {
                    featureNames.push(feature.name.toLowerCase());

                    if (feature.options && feature.options.aliases && feature.options.aliases.length) {
                        // Add all the aliases into the names list
                        for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx += 1) {
                            featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
                        }
                    }
                }

                // Run the test, or use the raw value if it's not a function
                result = is(feature.fn, 'function') ? feature.fn() : feature.fn;

                // Set each of the names on the Modernizr object
                for (nameIdx = 0; nameIdx < featureNames.length; nameIdx += 1) {
                    featureName = featureNames[nameIdx];

                    featureNameSplit = featureName.split('.');

                    if (featureNameSplit.length === 1) {
                        Modernizr[featureNameSplit[0]] = result;
                    } else {
                        // cast to a Boolean, if not one already
                        /* jshint -W053 */
                        if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
                            Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
                        }

                        Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
                    }

                    classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
                }
            }
        }
    }

    prefixes = (ModernizrProto._config.usePrefixes ? ['-webkit-', '-moz-', '-o-', '-ms-'] : []);

    // expose these for the plugin API. Look in the source for how to join() them against your input
    ModernizrProto._prefixes = prefixes;

    newSyntax = 'CSS' in window && 'supports' in window.CSS;
    oldSyntax = 'supportsCSS' in window;

    Modernizr.addTest('supports', newSyntax || oldSyntax);

    hasEvent = (function () {

        // Detect whether event support can be detected via `in`. Test on a DOM element
        // using the "blur" event b/c it should always exist. bit.ly/event-detection
        var needsFallback = !('onblur' in document.documentElement);

        function inner(eventName, element) {
            var isSupported;

            if (!eventName) {
                return false;
            }
            if (!element || typeof element === 'string') {
                element = createElement(element || 'div');
            }

            // Testing via the `in` operator is sufficient for modern browsers and IE.
            // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and
            // "resize", whereas `in` "catches" those.
            eventName = 'on' + eventName;
            isSupported = eventName in element;

            // Fallback technique for old Firefox - bit.ly/event-detection
            if (!isSupported && needsFallback) {
                if (!element.setAttribute) {
                    // Switch to generic element if it lacks `setAttribute`.
                    // It could be the `document`, `window`, or something else.
                    element = createElement('div');
                }

                element.setAttribute(eventName, '');
                isSupported = typeof element[eventName] === 'function';

                if (element[eventName] !== undefined) {
                    // If property was created, "remove it" by setting value to `undefined`.
                    element[eventName] = undefined;
                }
                element.removeAttribute(eventName);
            }

            return isSupported;
        }
        return inner;
    }());

    ModernizrProto.hasEvent = hasEvent;

    Modernizr.addTest('audio', function() {
        /* jshint -W053 */
        var elem = createElement('audio'),
            bool = false;

        try {
            bool = !!elem.canPlayType;

            if (bool) {
                bool = new Boolean(bool);
                bool.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '');
                bool.mp3 = elem.canPlayType('audio/mpeg;').replace(/^no$/, '');
                bool.opus = elem.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, '');
                bool.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '');
                bool.m4a = (elem.canPlayType('audio/x-m4a;') ||
                    elem.canPlayType('audio/aac;')).replace(/^no$/, '');
            }
        } catch (e) {}

        return bool;
    });

    Modernizr.addTest('contenteditable', function() {
        // early bail out
        if (!('contentEditable' in docElement)) {
            return false;
        }

        var div = createElement('div');

        div.contentEditable = true;
        return div.contentEditable === 'true';
    });

    Modernizr.addTest('video', function() {
        /* jshint -W053 */
        var elem = createElement('video'),
            bool = false;

        // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
        try {
            bool = !!elem.canPlayType;

            if (bool) {
                bool = new Boolean(bool);
                bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '');
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '');
                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '');
                bool.vp9 = elem.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, '');
                bool.hls = elem.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, '');
            }
        } catch (e) {}

        return bool;
    });

    Modernizr.addTest('cssgradients', function() {

        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            css = '',
            angle,
            i = 0,
            len,
            elem,
            style;

        for (i = 0, len = prefixes.length - 1; i < len; i += 1) {
            angle = (i === 0 ? 'to ' : '');
            css += str1 + prefixes[i] + 'linear-gradient(' + angle + 'left top, #9f9, white);';
        }

        if (Modernizr._config.usePrefixes) {
            // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
            css += str1 + '-webkit-' + str2;
        }

        elem = createElement('a');
        style = elem.style;

        style.cssText = css;

        // IE6 returns undefined so cast to string
        return ('' + style.backgroundImage).indexOf('gradient') > -1;
    });

    Modernizr.addTest('csspointerevents', function () {
        var style = createElement('a').style;

        style.cssText = 'pointer-events:auto';
        return style.pointerEvents === 'auto';
    });

    Modernizr.addTest('formattribute', function() {
        var form = createElement('form'),
            input = createElement('input'),
            div = createElement('div'),
            id = 'formtest' + (new Date()).getTime(),
            attr,
            bool = false;

        form.id = id;

        //IE6/7 confuses the form idl attribute and the form content attribute, so we use document.createAttribute
        try {
            input.setAttribute('form', id);
        } catch (e) {
            if (document.createAttribute) {
                attr = document.createAttribute('form');
                attr.nodeValue = id;
                input.setAttributeNode(attr);
            }
        }

        div.appendChild(form);
        div.appendChild(input);

        docElement.appendChild(div);

        bool = form.elements && form.elements.length === 1 && input.form == form;

        div.parentNode.removeChild(div);
        return bool;
    });

    function getBody() {
        // After page load injecting a fake body doesn't work so check if body exists
        var body = document.body;

        if (!body) {
            // Can't use the real body create a fake one.
            body = createElement(isSVG ? 'svg' : 'body');
            body.fake = true;
        }

        return body;
    }

    domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);

    ModernizrProto._domPrefixes = domPrefixes;

    Modernizr.addTest('pointerevents', function() {
        // Cannot use `.prefixed()` for events, so test each prefix
        var bool = false,
            i = domPrefixes.length;

        // Don't forget un-prefixed...
        bool = Modernizr.hasEvent('pointerdown');

        while (i-- && !bool) {
            if (hasEvent(domPrefixes[i] + 'pointerdown')) {
                bool = true;
            }
        }
        return bool;
    });

    function injectElementWithStyles(rule, callback, nodes, testnames) {
        var mod = 'modernizr',
            style,
            ret,
            node,
            docOverflow,
            div = createElement('div'),
            body = getBody(),
            oh;

        if (parseInt(nodes, 10)) {
            // In order not to give false positives we create a node for each test
            // This also allows the method to scale for unspecified uses
            while (nodes--) {
                node = createElement('div');
                node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
                div.appendChild(node);
            }
        }

        style = createElement('style');
        style.type = 'text/css';
        style.id = 's' + mod;

        // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
        // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
        (!body.fake ? div : body).appendChild(style);
        body.appendChild(div);

        if (style.styleSheet) {
            style.styleSheet.cssText = rule;
        } else {
            style.appendChild(document.createTextNode(rule));
        }
        div.id = mod;

        if (body.fake) {
            //avoid crashing IE8, if background image is used
            body.style.background = '';
            //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
            body.style.overflow = 'hidden';
            docOverflow = docElement.style.overflow;
            docElement.style.overflow = 'hidden';
            docElement.appendChild(body);
        }

        ret = callback(div, rule);

        // If this is done after page load we don't want to remove the body so check if body exists
        if (body.fake) {
            body.parentNode.removeChild(body);
            docElement.style.overflow = docOverflow;
            // Trigger layout so kinetic scrolling isn't disabled in iOS6+
            oh = docElement.offsetHeight;
        } else {
            div.parentNode.removeChild(div);
        }

        return !!ret;
    }

    testStyles = ModernizrProto.testStyles = injectElementWithStyles;

    // Chrome (desktop) used to lie about its support on this, but that has since been rectified: http://crbug.com/36415
    Modernizr.addTest('touchevents', function() {
        var bool,
            query;

        if (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) {
            bool = true;
        } else {
            query = ['@media (', prefixes.join('touch-enabled),('), 'heartz', ')', '{#modernizr{top:9px;position:absolute}}'].join('');
            testStyles(query, function(node) {
                bool = node.offsetTop === 9;
            });
        }
        return bool;
    });

    Modernizr.addTest('formvalidation', function() {
        var form = createElement('form'),
            invalidFired = false,
            input;

        if (!('checkValidity' in form) || !('addEventListener' in form)) {
            return false;
        }
        if ('reportValidity' in form) {
            return true;
        }

        Modernizr.formvalidationapi = true;

        // Prevent form from being submitted
        form.addEventListener('submit', function(e) {
            // Old Presto based Opera does not validate form, if submit is prevented
            // although Opera Mini servers use newer Presto.
            if (!window.opera || window.operamini) {
                e.preventDefault();
            }
            e.stopPropagation();
        }, false);

        // Calling form.submit() doesn't trigger interactive validation,
        // use a submit button instead
        //older opera browsers need a name attribute
        form.innerHTML = '<input name="modTest" required><button></button>';

        testStyles('#modernizr form{position:absolute;top:-99999em}', function(node) {
            node.appendChild(form);

            input = form.getElementsByTagName('input')[0];

            // Record whether "invalid" event is fired
            input.addEventListener('invalid', function(e) {
                invalidFired = true;
                e.preventDefault();
                e.stopPropagation();
            }, false);

            //Opera does not fully support the validationMessage property
            Modernizr.formvalidationmessage = !!input.validationMessage;

            // Submit form by clicking submit button
            form.getElementsByTagName('button')[0].click();
        });

        return invalidFired;
    });

    Modernizr.inputtypes = (function(props) {
        var i = 0,
            len = props.length,
            smile = ':)',
            inputElemType,
            defaultView,
            bool;

        for (i = 0; i < len; i += 1) {

            inputElem.setAttribute('type', inputElemType = props[i]);
            bool = inputElem.type !== 'text' && 'style' in inputElem;

            // We first check to see if the type we give it sticks..
            // If the type does, we feed it a textual value, which shouldn't be valid.
            // If the value doesn't stick, we know there's input sanitization which infers a custom UI
            if (bool) {

                inputElem.value = smile;
                inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                if (/^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined) {

                    docElement.appendChild(inputElem);
                    defaultView = document.defaultView;

                    // Safari 2-4 allows the smiley as a value, despite making a slider
                    bool = defaultView.getComputedStyle &&
                        defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                        // Mobile android web browser has false positive, so must
                        // check the height to see if the widget is actually there.
                        (inputElem.offsetHeight !== 0);

                    docElement.removeChild(inputElem);

                } else if (/^(search|tel)$/.test(inputElemType)) {
                    // Spec doesn't define any special parsing or detectable UI
                    //   behaviors so we pass these through as true

                    // Interestingly, opera fails the earlier test, so it doesn't
                    //  even make it here.

                } else if (/^(url|email|number)$/.test(inputElemType)) {
                    // Real url and email support comes with prebaked validation.
                    bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                } else {
                    // If the upgraded input compontent rejects the :) text, we got a winner
                    bool = inputElem.value !== smile;
                }
            }

            inputs[props[i]] = !!bool;
        }
        return inputs;

    }(inputtypes));

    Modernizr.addTest('localizednumber', function() {
        // this extends our testing of input[type=number], so bomb out if that's missing
        if (!Modernizr.inputtypes.number) {
            return false;
        }
        // we rely on checkValidity later, so bomb out early if we don't have it
        if (!Modernizr.formvalidation) {
            return false;
        }

        var el = createElement('div'),
            diff,
            body = getBody(),
            root = (function() {
                return docElement.insertBefore(body, docElement.firstElementChild || docElement.firstChild);
            }()),
            input;

        el.innerHTML = '<input type="number" value="1.0" step="0.1"/>';

        input = el.childNodes[0];
        root.appendChild(el);
        input.focus();

        try {
            document.execCommand('InsertText', false, '1,1');
        } catch (e) {
            // prevent warnings in IE
        }

        diff = input.type === 'number' && input.valueAsNumber === 1.1 && input.checkValidity();
        root.removeChild(el);
        body.fake && root.parentNode.removeChild(root);

        return diff;
    });

    cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);

    ModernizrProto._cssomPrefixes = cssomPrefixes;

    function contains(str, substr) {
        return !!~('' + str).indexOf(substr);
    }

    function cssToDOM(name) {
        return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
            return m1 + m2.toUpperCase();
        }).replace(/^-/, '');
    }

    function fnBind(fn, that) {
        return function() {
            return fn.apply(that, arguments);
        };
    }

    function testDOMProps(props, obj, elem) {
        var item,
            pro;

        for (pro in props) {
            if (props[pro] in obj) {

                // return the property name as a string
                if (elem === false) {
                    return props[pro];
                }

                item = obj[props[pro]];

                // let's bind a function
                if (is(item, 'function')) {
                    // bind to obj unless overriden
                    return fnBind(item, elem || obj);
                }

                // return the unbound function or obj or value
                return item;
            }
        }
        return false;
    }

    modElem = {
        elem: createElement('modernizr')
    };

    // Clean up this element
    Modernizr._q.push(function() {
        delete modElem.elem;
    });

    mStyle = {
        style: modElem.elem.style
    };

    // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
    // the front of the queue.
    Modernizr._q.unshift(function() {
        delete mStyle.style;
    });

    function domToCSS(name) {
        return name.replace(/([A-Z])/g, function(str, m1) {
            return '-' + m1.toLowerCase();
        }).replace(/^ms-/, '-ms-');
    }

    function nativeTestProps(props, value) {
        var i = props.length,
            conditionText = [];

        // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
        if ('CSS' in window && 'supports' in window.CSS) {
            // Try every prefixed variant of the property
            while (i--) {
                if (window.CSS.supports(domToCSS(props[i]), value)) {
                    return true;
                }
            }
            return false;
        }
        // Otherwise fall back to at-rule (for Opera 12.x)
        else if ('CSSSupportsRule' in window) {
            // Build a condition string for every prefixed variant
            while (i--) {
                conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
            }

            conditionText = conditionText.join(' or ');

            return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function(node) {
                return getComputedStyle(node, null).position === 'absolute';
            });
        }
        return undefined;
    }

    function testProps(props, prefixed, value, skipValueTest) {

        skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

        var result,
            afterInit,
            elems = ['modernizr', 'tspan'],
            i = 0,
            propsLength,
            prop,
            before;

        // Try native detect first
        if (!is(value, 'undefined')) {
            result = nativeTestProps(props, value);

            if (!is(result, 'undefined')) {
                return result;
            }
        }

        while (!mStyle.style) {
            afterInit = true;
            mStyle.modElem = createElement(elems.shift());
            mStyle.style = mStyle.modElem.style;
        }

        // Delete the objects if we created them.
        function cleanElems() {
            if (afterInit) {
                delete mStyle.style;
                delete mStyle.modElem;
            }
        }

        propsLength = props.length;

        for (i = 0; i < propsLength; i += 1) {

            prop = props[i];
            before = mStyle.style[prop];

            if (contains(prop, '-')) {
                prop = cssToDOM(prop);
            }

            if (mStyle.style[prop] !== undefined) {

                // If value to test has been passed in, do a set-and-check test.
                // 0 (integer) is a valid property value, so check that `value` isn't
                // undefined, rather than just checking it's truthy.
                if (!skipValueTest && !is(value, 'undefined')) {

                    // Needs a try catch block because of old IE. This is slow, but will
                    // be avoided in most cases because `skipValueTest` will be used.
                    try {
                        mStyle.style[prop] = value;
                    } catch (e) {}

                    // If the property value has changed, we assume the value used is
                    // supported. If `value` is empty string, it'll fail here (because
                    // it hasn't changed), which matches how browsers have implemented
                    // CSS.supports()
                    if (mStyle.style[prop] != before) {
                        cleanElems();
                        return prefixed === 'pfx' ? prop : true;
                    }
                }
                // Otherwise just return true, or the property name if this is a
                // `prefixed()` call
                else {
                    cleanElems();
                    return prefixed === 'pfx' ? prop : true;
                }
            }
        }
        cleanElems();
        return false;
    }

    function testPropsAll(prop, prefixed, elem, value, skipValueTest) {
        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
            props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        // did they call .prefixed('boxSizing') or are we just testing a prop?
        if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
            return testProps(props, prefixed, value, skipValueTest);
        }

        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
        return testDOMProps(props, prefixed, elem);
    }

    ModernizrProto.testAllProps = testPropsAll;

    function testAllProps(prop, value, skipValueTest) {
        return testPropsAll(prop, undefined, undefined, value, skipValueTest);
    }

    ModernizrProto.testAllProps = testAllProps;

    Modernizr.addTest('cssanimations', testAllProps('animationName', 'a', true));

    Modernizr.addTest('overflowscrolling', testAllProps('overflowScrolling', 'touch', true));

	Modernizr.addTest('boxshadow', testAllProps('boxShadow', '1px 1px', true));

    Modernizr.addTest('csstransforms', function() {
        // Android < 3.0 is buggy, so we sniff and blacklist
        // http://git.io/hHzL7w
        return navigator.userAgent.indexOf('Android 2.') === -1 &&
            testAllProps('transform', 'scale(1)', true);
    });

    Modernizr.addTest('csstransforms3d', function() {
        var ret = !!testAllProps('perspective', '1px', true),
            usePrefix = Modernizr._config.usePrefixes,
            mq,
            defaultStyle = '#modernizr{width:0;height:0}';

        if (ret && (!usePrefix || 'webkitPerspective' in docElement.style)) {

            // Use CSS Conditional Rules if available
            if (Modernizr.supports) {
                mq = '@supports (perspective: 1px)';
            } else {
                // Otherwise, Webkit allows this media query to succeed only if the feature is enabled.
                // `@media (transform-3d),(-webkit-transform-3d){ ... }`
                mq = '@media (transform-3d)';
                if (usePrefix) {
                    mq += ',(-webkit-transform-3d)';
                }
            }

            mq += '{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}';

            testStyles(defaultStyle + mq, function(elem) {
                ret = elem.offsetWidth === 7 && elem.offsetHeight === 18;
            });
        }

        return ret;
    });

    Modernizr.addTest('csstransitions', testAllProps('transition', 'all', true));

    // Run each test
    testRunner();

    delete ModernizrProto.addTest;
    delete ModernizrProto.addAsyncTest;

    // Run the things that are supposed to run after the tests
    for (i = 0; i < Modernizr._q.length; i += 1) {
        Modernizr._q[i]();
    }

    // Leak Modernizr namespace
    window.Modernizr = Modernizr;

	msos.console.debug('msos/base -> Modernizr.js now available.');

}(window, document));


// Copyright 2014 Wisembly and contributors
// https://github.com/Wisembly/basil.js

(function () {
    // Basil
    var Basil = function (options) {

        return _.extend(
			{},
			Basil.plugins,
			new Basil.Storage().init(options)
		);
    };

    // Version
    Basil.version = '0.4.2';

    // Utils
    Basil.utils = {
        each: function (obj, fnIterator, context) {
            if (_.isArray(obj)) {
                for (var i = 0; i < obj.length; i++)
                    if (fnIterator.call(context, obj[i], i) === false) return;
            } else if (obj) {
                for (var key in obj)
                    if (fnIterator.call(context, obj[key], key) === false) return;
            }
        },
        tryEach: function (obj, fnIterator, fnError, context) {
            this.each(
				obj,
				function (value, key) {
					try {
						return fnIterator.call(context, value, key);
					} catch (error) {
						if (_.isFunction(fnError)) {
							try {
								fnError.call(context, value, key, error);
							} catch (error) {
								msos.console.error('msos/base - Basil.tryEach -> failed:', error);
							}
						}
					}
					return undefined;
				},
				this
			);
        },
        registerPlugin: function (methods) {
            Basil.plugins = _.extend(methods, Basil.plugins);
        }
    };

    // Plugins
    Basil.plugins = {};

    // Options
    Basil.options = _.extend({
        namespace: 'msos_b45i1',
        storages: ['local', 'cookie', 'session', 'memory'],
        expireDays: 31
    }, window.Basil ? window.Basil.options : {});

    // Storage
    Basil.Storage = function () {
        var _salt = 'b45i1' + (Math.random() + 1)
            .toString(36)
            .substring(7),
            _storages = {},
            _toStoragesArray = function (storages) {
                if (_.isArray(storages))
                    return storages;
                return _.isString(storages) ? [storages] : [];
            },
            _toStoredKey = function (namespace, path) {
                var key = '';
                if (_.isString(path) && path.length)
                    path = [path];
                if (_.isArray(path) && path.length)
                    key = path.join(':');
                return key && namespace ? namespace + ':' + key : key;
            },
            _toKeyName = function (namespace, key) {
                if (!namespace)
                    return key;
                return key.replace(new RegExp('^' + namespace + ':'), '');
            },
            _toStoredValue = function (value) {
                return JSON.stringify(value);
            },
            _fromStoredValue = function (value) {
                return value ? JSON.parse(value) : null;
            };

        // HTML5 web storage interface
        var webStorageInterface = {
            engine: null,
            check: function () {
                try {
                    window[this.engine].setItem(_salt, true);
                    window[this.engine].removeItem(_salt);
                } catch (e) {
					msos.console.warn('msos/base - Basil.check -> response:', e);
                    return false;
                }
                return true;
            },
            set: function (key, value, options) {
                if (!key)
                    throw Error('invalid key');
                window[this.engine].setItem(key, value);
            },
            get: function (key) {
                return window[this.engine].getItem(key);
            },
            remove: function (key) {
                window[this.engine].removeItem(key);
            },
            reset: function (namespace) {
                for (var i = 0, key; i < window[this.engine].length; i++) {
                    key = window[this.engine].key(i);
                    if (!namespace || key.indexOf(namespace) === 0) {
                        this.remove(key);
                        i--;
                    }
                }
            },
            keys: function (namespace) {
                var keys = [];
                for (var i = 0, key; i < window[this.engine].length; i++) {
                    key = window[this.engine].key(i);
                    if (!namespace || key.indexOf(namespace) === 0)
                        keys.push(_toKeyName(namespace, key));
                }
                return keys;
            }
        };

        // local storage
        _storages.local = _.extend({}, webStorageInterface, {
            engine: 'localStorage'
        });
        // session storage
        _storages.session = _.extend({}, webStorageInterface, {
            engine: 'sessionStorage'
        });

        // memory storage
        _storages.memory = {
            _hash: {},
            check: function () {
                return true;
            },
            set: function (key, value, options) {
                if (!key)
                    throw Error('invalid key');
                this._hash[key] = value;
            },
            get: function (key) {
                return this._hash[key] || null;
            },
            remove: function (key) {
                delete this._hash[key];
            },
            reset: function (namespace) {
                for (var key in this._hash) {
                    if (!namespace || key.indexOf(namespace) === 0)
                        this.remove(key);
                }
            },
            keys: function (namespace) {
                var keys = [];
                for (var key in this._hash)
                    if (!namespace || key.indexOf(namespace) === 0)
                        keys.push(_toKeyName(namespace, key));
                return keys;
            }
        };

        // cookie storage
        _storages.cookie = {
            check: function () {
                return navigator.cookieEnabled;
            },
            set: function (key, value, options) {
                if (!this.check())
                    throw Error('cookies are disabled');
                options = options || {};
                if (!key)
                    throw Error('invalid key');
                var cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);
                // handle expiration days
                if (options.expireDays) {
                    var date = new Date();
                    date.setTime(date.getTime() + (options.expireDays * 24 * 60 * 60 * 1000));
                    cookie += '; expires=' + date.toGMTString();
                }
                // handle domain
                if (options.domain && options.domain !== document.domain) {
                    var _domain = options.domain.replace(/^\./, '');
                    if (document.domain.indexOf(_domain) === -1 || _domain.split('.').length <= 1)
                        throw Error('invalid domain');
                    cookie += '; domain=' + options.domain;
                }
                // handle secure
                if (options.secure === true) {
                    cookie += '; secure';
                }
                document.cookie = cookie + '; path=/';
            },
            get: function (key) {
                if (!this.check())
                    throw Error('cookies are disabled');
                var encodedKey = encodeURIComponent(key);
                var cookies = document.cookie ? document.cookie.split(';') : [];
                // retrieve last updated cookie first
                for (var i = cookies.length - 1, cookie; i >= 0; i--) {
                    cookie = cookies[i].replace(/^\s*/, '');
                    if (cookie.indexOf(encodedKey + '=') === 0)
                        return decodeURIComponent(cookie.substring(encodedKey.length + 1, cookie.length));
                }
                return null;
            },
            remove: function (key) {
                // remove cookie from main domain
                this.set(key, '', {
                    expireDays: -1
                });
                // remove cookie from upper domains
                var domainParts = document.domain.split('.');
                for (var i = domainParts.length; i >= 0; i--) {
                    this.set(key, '', {
                        expireDays: -1,
                        domain: '.' + domainParts.slice(-i).join('.')
                    });
                }
            },
            reset: function (namespace) {
                var cookies = document.cookie ? document.cookie.split(';') : [];
                for (var i = 0, cookie, key; i < cookies.length; i++) {
                    cookie = cookies[i].replace(/^\s*/, '');
                    key = cookie.substr(0, cookie.indexOf('='));
                    if (!namespace || key.indexOf(namespace) === 0)
                        this.remove(key);
                }
            },
            keys: function (namespace) {
                if (!this.check())
                    throw Error('cookies are disabled');
                var keys = [],
                    cookies = document.cookie ? document.cookie.split(';') : [];
                for (var i = 0, cookie, key; i < cookies.length; i++) {
                    cookie = cookies[i].replace(/^\s*/, '');
                    key = decodeURIComponent(cookie.substr(0, cookie.indexOf('=')));
                    if (!namespace || key.indexOf(namespace) === 0)
                        keys.push(_toKeyName(namespace, key));
                }
                return keys;
            }
        };

        return {
            init: function (options) {
                this.setOptions(options);
                return this;
            },
            setOptions: function (options) {
                this.options = _.extend({}, this.options || Basil.options, options);
            },
            support: function (storage) {
                return _storages.hasOwnProperty(storage);
            },
            check: function (storage) {
                if (this.support(storage))
                    return _storages[storage].check();
                return false;
            },
            set: function (key, value, options) {
				if (msos.config.verbose) {
					msos.console.debug('msos/base - Basil.set -> called, key: ' + key);
				}
                options = _.extend({}, this.options, options);
                if (!(key = _toStoredKey(options.namespace, key)))
                    return false;
                value = options.raw === true ? value : _toStoredValue(value);
                var where = null;
                // try to set key/value in first available storage
                Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage, index) {
                    _storages[storage].set(key, value, options);
                    where = storage;
                    return false; // break;
                }, null, this);
                if (!where) {
                    // key has not been set anywhere
                    return false;
                }
                // remove key from all other storages
                Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage, index) {
                    if (storage !== where)
                        _storages[storage].remove(key);
                }, null, this);
                return true;
            },
            get: function (key, options) {
				if (msos.config.verbose) {
					msos.console.debug('msos/base - Basil.get -> start, key: ' + key);
				}
                options = _.extend({}, this.options, options);
                if (!(key = _toStoredKey(options.namespace, key)))
                    return null;
                var value = null;
                Basil.utils.tryEach(
					_toStoragesArray(options.storages),
					function (storage, index) {
						if (value !== null)
							return false; // break if a value has already been found.
						value = _storages[storage].get(key, options) || null;
						value = options.raw === true ? value : _fromStoredValue(value);
						return true;
					},
					function (storage, index, error) {
						value = null;
					},
					this
				);

				if (msos.config.verbose) {
					msos.console.debug('msos/base - Basil.get ->  done, key: ' + key + ', value:', value);
				}
                return value;
            },
            remove: function (key, options) {
				if (msos.config.verbose) {
					msos.console.debug('msos/base - Basil.remove -> called, key: ' + key);
				}
                options = _.extend({}, this.options, options);
                if (!(key = _toStoredKey(options.namespace, key)))
                    return;
                Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage) {
                    _storages[storage].remove(key);
                }, null, this);
            },
            reset: function (options) {
				if (msos.config.verbose) {
					msos.console.debug('msos/base - Basil.reset -> called.');
				}
                options = _.extend({}, this.options, options);
                Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage) {
                    _storages[storage].reset(options.namespace);
                }, null, this);
            },
            keys: function (options) {
                options = options || {};
                var keys = [];
                for (var key in this.keysMap(options))
                    keys.push(key);
                return keys;
            },
            keysMap: function (options) {
                options = _.extend({}, this.options, options);
                var map = {};
                Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage) {
                    Basil.utils.each(_storages[storage].keys(options.namespace), function (key) {
                        map[key] = _.isArray(map[key]) ? map[key] : [];
                        map[key].push(storage);
                    }, this);
                }, null, this);
                return map;
            }
        };
    };

    // Access to native storages, without namespace or basil value decoration
    Basil.memory = new Basil.Storage().init({
        storages: 'memory',
        namespace: null,
        raw: true
    });
    Basil.cookie = new Basil.Storage().init({
        storages: 'cookie',
        namespace: null,
        raw: true
    });
    Basil.localStorage = new Basil.Storage().init({
        storages: 'local',
        namespace: null,
        raw: true
    });
    Basil.sessionStorage = new Basil.Storage().init({
        storages: 'session',
        namespace: null,
        raw: true
    });

    // browser export
    window.Basil = Basil;

	msos.console.debug('msos/base -> basil.js now available.');
}());


// Generate our new Basil object
msos.basil = new window.Basil();

// Clear storage for testing, debugging
if (msos.config.clear_storage) { msos.basil.reset(); }

if (msos.config.verbose) {
	msos.console.debug('msos/base -> storage availability,\n        cookies: ' + msos.basil.check('cookie') + ',\n   localStorage: ' + msos.basil.check('local') + ',\n sessionStorage: ' + msos.basil.check('session'));

	msos.basil.get('last_script_exec');
	msos.basil.set('last_script_exec', (new Date()));
}


// Copyright (C) 2012 Ryan Van Etten

(function (root, name, make) {
    root[name] = make();
}(msos, 'verge', function () {

    var xports = {},
        win = window !== undefined && window,
        doc = document !== undefined && document,
        docElem = doc && doc.documentElement,
        matchMedia = win.matchMedia || win.msMatchMedia,
        mq = matchMedia ? function (q) {
            return !!matchMedia.call(win, q).matches;
        } : function () {
            return false;
        };

    xports.viewportW = function () {
        var a = docElem.clientWidth,
            b = win.innerWidth;
        return a < b ? b : a;
    };

    xports.viewportH = function () {
        var a = docElem.clientHeight,
            b = win.innerHeight;
        return a < b ? b : a;
    };

    xports.mq = mq;

    xports.matchMedia = matchMedia ? function () {
        // matchMedia must be bound to window
        return matchMedia.apply(win, arguments);
    } : function () {
        // Gracefully degrade to plain object
        return {};
    };

    xports.viewport = function () {
        return {
            'width': xports.viewportW(),
            'height': xports.viewportH()
        };
    };

    xports.scrollX = function () {
        return win.pageXOffset || docElem.scrollLeft;
    };

    xports.scrollY = function () {
        return win.pageYOffset || docElem.scrollTop;
    };

    function calibrate(coords, cushion) {
        var o = {};

        cushion = +cushion || 0;

        o.right =  coords.right  + cushion;
        o.left =   coords.left   - cushion;
        o.bottom = coords.bottom + cushion;
        o.top =    coords.top    - cushion;

        o.width = o.right - o.left;
        o.height = o.bottom - o.top;

        return o;
    }

    xports.rectangle = function (el, cushion) {
        el = el && !el.nodeType ? el[0] : el;
        if (!el || 1 !== el.nodeType) { return false; }
        return calibrate(el.getBoundingClientRect(), cushion);
    };

    xports.aspect = function (o) {
        o = o === undefined ? xports.viewport() : 1 === o.nodeType ? xports.rectangle(o) : o;

        var h = o.height,
            w = o.width;

        h = typeof h === 'function' ? h.call(o) : h;
        w = typeof w === 'function' ? w.call(o) : w;

        return w / h;
    };

    xports.inX = function (el, cushion) {
        var r = xports.rectangle(el, cushion);
        return !!r && r.right >= 0 && r.left <= xports.viewportW();
    };

    xports.inY = function (el, cushion) {
        var r = xports.rectangle(el, cushion);
        return !!r && r.bottom >= 0 && r.top <= xports.viewportH();
    };

    xports.inViewport = function (el, cushion) {
        var r = xports.rectangle(el, cushion);
        return !!r && r.bottom >= 0 && r.right >= 0 && r.top <= xports.viewportH() && r.left <= xports.viewportW();
    };

    return xports;
}));


// *******************************************
// Script Basics (No jQuery, Backbone.js)
// *******************************************

// Sort 'size_wide' object into consistent 'size_array' for resizeable displays
Object.keys(msos.config.size_wide).map(
		(k) => {
			return [k, msos.config.size_wide[k]];
		}
	).sort(
		(a, b) => {
			if (a[1] < b[1]) { return -1; }
			if (a[1] > b[1]) { return  1; }
			return 0;
		}
	).forEach(
		(d) => {
			msos.config.size_array.push(d[0]);
		}
	);


// --------------------------
// MSOS Helper Functions
// --------------------------
msos.var_is_null = (variable) => {

    if (variable === undefined)	{ return true;  }
    if (variable === null)		{ return true;  }
    return false;
};

msos.var_is_empty = (variable) => {

    if (msos.var_is_null(variable))	{ return true;  }
    if (variable === '')			{ return true;  }
	return false;
};

msos.do_nothing = (evt) => {

    evt.preventDefault();
    evt.stopPropagation();
};

msos.do_abs_nothing = (evt) => {

    evt.preventDefault();
    evt.stopImmediatePropagation();
};

msos.new_time = () => {

	return (new Date()).getTime();
};

msos.set_version = function (mjr, mnr, pth) {

	let self = this;

	self = {			// loosely translates to:
		major: mjr,		// year
		minor: mnr,		// month
		patch: pth,		// day
		toString() {
			return 'v' + self.major + '.' + self.minor + '.' + self.patch;
		}
	};

	return self;
};

msos.gen_namespace = (b) => {

	let a = window,
		c = 0;

	b = b.split('.');

	for (c = 0; c < b.length; c += 1) {
		a = a[b[c]] || (a[b[c]] = {});
	}

	return a;
};

msos.generate_url_name = (url) => {
	let path,
		parts = [],
		name = '';

	path = msos.purl(url).attr('path');

	parts = path.split('/');

	// Remove first two "commom" elements and clean up for use as key
	name = parts.slice(2).join(':');
	name = name.replace(/[^0-9a-zA-Z]/g, '_');

	return name;
};

msos.run_function_array = (name = 'missing') => {
	let temp_fa = 'msos.run_func_array -> ',
		m = 0;

	msos.console.debug(temp_fa + 'start: ' + name);

	if (!msos[name] || !(_.isArray(msos[name]))) {
		msos.console.error(temp_fa + 'for: ' + name + ', failed.');
		return;
	}

	for (m = 0; m < msos[name].length; m += 1) {

		msos.console.debug(temp_fa + 'index: ' + m);

		try {
			msos[name][m]();
		} catch (e) {
			msos.console.error(temp_fa + 'for: ' + name, e);
		}
	}

	// Clear all functions
	msos[name] = [];

	msos.console.debug(temp_fa + ' done: ' + name);
};


// --------------------------
// Apply Resource (relative) Locations
// --------------------------
msos.resource_url = (folder, resource_file) => {
    // Always relative to 'msos' folder
    return msos.base_script_url.replace(/\/msos\//, '/' + folder + '/') + resource_file;
};

msos.set_locale = () => {
	let temp_gl = 'msos.set_locale -> ',
		cfg = msos.config,
		store_obj = cfg.storage.site_i18n,
		store_array = [];

	if (store_obj.value) { store_array = store_obj.value.split(':'); }

	msos.console.debug(temp_gl + 'start, stored local: ' + (store_obj.value || 'na'));

    // Check user input, then stored, then browser or default value
    cfg.locale =   cfg.query.locale		|| store_array[0] || cfg.locale		|| msos.default_locale;
    cfg.culture =  cfg.query.culture	|| store_array[1] || cfg.culture	|| cfg.locale;
    cfg.calendar = cfg.query.calendar	|| store_array[2] || cfg.calendar;

	msos.console.debug(temp_gl + ' done, locale: ' + cfg.locale + ', culture: ' + cfg.culture + ', calendar: ' + cfg.calendar);
};

msos.set_locale_storage = () => {
	let temp_sl = 'msos.set_locale_storage -> ',
		store_obj = msos.config.storage.site_i18n;

	msos.console.debug(temp_sl + 'start.');

    store_obj.value = msos.config.locale + ':' + msos.config.culture + ':' + msos.config.calendar;

	msos.basil.set(store_obj.name, store_obj.value);

	msos.console.debug(temp_sl + 'done, value: ' + store_obj.value );
    store_obj.set = true;
};


// --------------------------
// Browser detection & testing
// --------------------------
msos.get_viewport = (for_win) => {
	let port = msos.verge.viewport();

    if (window === for_win) { msos.config.view_port = port; }

    msos.console.debug('msos.get_viewport -> viewport:', port);
    return port;
};

msos.browser_orientation = () => {
    let orient_ref = msos.config.view_orientation,
		v_port_ref = msos.get_viewport(window),
		temp_txt = 'msos.browser_orientation -> ';

    if (window.orientation !== undefined) {
		switch (window.orientation) {
			case 0:
				orient_ref.layout = "portrait";
				orient_ref.direction = 'normal';
				orient_ref.numeric = 0;
			break;
			case -90:
				orient_ref.layout = "landscape";
				orient_ref.direction = 'right';
				orient_ref.numeric = -90;
			break;
			case 90:
				orient_ref.layout = "landscape";
				orient_ref.direction = 'left';
				orient_ref.numeric = 90;
			break;
			case 180:
				orient_ref.layout = "portrait";
				orient_ref.direction = 'flipped';
				orient_ref.numeric = 180;
			break;
			default:
				orient_ref.layout = v_port_ref.width / v_port_ref.height < 1.1 ? "portrait" : "landscape";
				orient_ref.direction = 'normal';
				orient_ref.numeric = v_port_ref.width / v_port_ref.height < 1.1 ? 0 : 90;
		}
		orient_ref.method = 'window.orientation(' + window.orientation + ')';
    } else {
		orient_ref.layout = v_port_ref.width / v_port_ref.height < 1.1 ? "portrait" : "landscape";
		orient_ref.direction = 'normal';
		orient_ref.method = 'document.documentElement';
		orient_ref.numeric = v_port_ref.width / v_port_ref.height < 1.1 ? 0 : 90;
      }

    msos.console.debug(temp_txt + 'layout: ' + orient_ref.layout + ', dir: ' + orient_ref.direction + ' for ' + orient_ref.method);

    return orient_ref;
};

msos.browser_ok = () => {
    let temp_txt = 'msos.browser_ok -> ',
		failed = [];

	// Absolute minimum requirements...more may be needed for jQuery 2.x.x
    if (!window.focus)              { failed.push('window.focus'); }
    if (!document.images)           { failed.push('document.images'); }
    if (!document.styleSheets)      { failed.push('document.styleSheets'); }
    if (!document.open)             { failed.push('document.open'); }
    if (!document.close)            { failed.push('document.close'); }
    if (!window.document.write)     { failed.push('document.write'); }
	if (!document.addEventListener) { failed.push('document.addEventListener'); }	// Looking at you IE...

    if (failed.length === 0) {
        msos.console.debug(temp_txt + 'browser is ok');
		msos.config.browser.ok = true;
        return;
    }

    msos.console.error(temp_txt + 'browser failed, does not support: ' + failed.join(', '));
    msos.config.browser.ok = false;
};

msos.browser_current = () => {
    let temp_txt = 'msos.browser_current -> ',
		failed = [];

	// Hoped for features
	if (!Array.prototype.indexOf)	{ failed.push('Array.indexOf'); }
    if (!Array.prototype.forEach)	{ failed.push('Array.forEach'); }
	if (!String.prototype.indexOf)	{ failed.push('String.indexOf'); }
    if (!String.prototype.trim)		{ failed.push('String.trim'); }                
    if (!Function.prototype.bind)	{ failed.push('Function.bind'); }
    if (!Object.keys)				{ failed.push('Object.keys'); }
    if (!Object.create)				{ failed.push('Object.create'); }
    if (!JSON || !JSON.stringify || !JSON.stringify.length || JSON.stringify.length < 3) {
		failed.push('JSON.stringify');
	}

    if (failed.length === 0) {
        msos.console.debug(temp_txt + 'browser is current');
		msos.config.browser.current = true;
        return;
    }

    msos.console.warn(temp_txt + 'browser does not support: ' + failed.join(', ') + ' -> for doctype ' + msos.config.doctype);

    if (msos.config.doctype === 'xhtml5' && failed[2] === 'document.write') {
		msos.config.browser.current = true;
		return;
	}

    msos.console.error(temp_txt + 'browser is not current');
    msos.config.browser.current = false;
};

msos.browser_touch = () => {
    let temp_tch = 'msos.browser_touch -> ',
		test = '',
		test_div = document.createElement('div'),
		touch_avail = 0;

    // Is touch capability showing up?
    for (test in msos.config.touch) {
		if (msos.config.touch.hasOwnProperty(test)) {
			if (msos.config.touch[test] === true)	{ touch_avail += 1; }
			else									{ touch_avail -= 1; }
		}
    }

    // Try creating or adding an event
    try {
		document.createEvent("TouchEvent");
		touch_avail += 1;
    } catch (e) {
		touch_avail -= 1;
      }

    if ("ontouchstart" in test_div) {
		touch_avail += 1;
    } else {
		test_div.setAttribute("ontouchstart", 'return;');
		touch_avail += (typeof test_div.ontouchstart === 'function') ? 1 : -1;
      }

    test_div = null;

    if (touch_avail > 0) { msos.config.browser.touch = true; }

	if (Modernizr.touchevents !== msos.config.browser.touch) {
		msos.console.warn(temp_tch + 'Modernizr.touchevents returned: ' + Modernizr.touchevents);
	}

    msos.console.debug(temp_tch + 'touch is ' + (msos.config.browser.touch ? '' : 'not') + ' available, ref. (' + String(touch_avail) + ')');
};

msos.browser_mobile = () => {
    let temp_mbl = 'msos.browser_mobile -> ',
		device = '',
		scrn_px = 0,
		flag = [];

    // Screen width (available)
    if (!msos.var_is_empty(screen.height) && !msos.var_is_empty(screen.width)) {
		scrn_px = (screen.height > screen.width) ? screen.height : screen.width;
    }

    // Probably mobile
    if (scrn_px && scrn_px < 481)	{ flag.push('screen'); }
    if (msos.config.browser.touch)	{ flag.push('touch'); }

    // Most likely
    if (msos.config.orientation)		{ flag.push('orientation'); }
    if (msos.config.orientation_change)	{ flag.push('orientation_change'); }
    if (msos.config.pixel_ratio > 1)	{ flag.push('pixel_ratio'); }
	if (Modernizr.devicemotion)			{ flag.push('device_motion'); }
	if (Modernizr.deviceorientation)	{ flag.push('device_orientation'); }

    if (flag.length > 2) {
		msos.config.browser.mobile = true;
		msos.config.mobile = true;
    }

    msos.console.debug(temp_mbl + 'browser is ' + (msos.config.browser.mobile ? 'mobile' : 'not mobile') + (flag.length > 0 ? ', flag(s): ' + flag.join(', ') : ''));
    
    if (msos.config.query.mobile === true
     || msos.config.query.mobile === false) {
		if (msos.config.browser.mobile !== msos.config.query.mobile) {
			msos.console.debug(temp_mbl + 'force mobile setting: ' + msos.config.query.mobile);
		}
		msos.config.mobile = msos.config.query.mobile ? true : false;
    }
};

msos.browser_advanced = () => {
    let temp_txt = 'msos.browser_advanced -> ',
		M = Modernizr,
		failed = [];

	if (!M.cssgradients)	{ failed.push('cssgradients'); }
	if (!M.boxshadow)		{ failed.push('boxshadow'); }
	if (!M.csstransitions)	{ failed.push('csstransitions'); }
	if (!M.csstransforms)	{ failed.push('csstransforms'); }
	if (!M.cssanimations)	{ failed.push('cssanimations'); }
    if (!M.websockets)		{ failed.push('websockets'); }
	if (!M.localstorage)	{ failed.push('localstorage'); }
	if (!M.dataset)			{ failed.push('dataset'); }

    if (!msos.config.scrolltop) { failed.push('scrollTop'); }

    if (failed[0]) {
		msos.console.debug(temp_txt + 'browser is not advanced, missing: ' + failed.join(' '));
		msos.config.browser.advanced = false;
		return false;
    }
    msos.console.debug(temp_txt + 'browser is advanced.');
    msos.config.browser.advanced = true;
    return true;
};

msos.browser_editable = () => {
    if (!(document.designMode || msos.body.contentEditable))	{ msos.config.browser.editable = false; return; }
    if (document.execCommand === undefined)						{ msos.config.browser.editable = false; return; }

    msos.console.debug('msos.browser_editable -> browser supports content editing');
    msos.config.browser.editable = true;
};

// Don't run before 'body' is loaded, see 'msos.run_onload'
msos.browser_direction = () => {
    let browser_dir = '',
		build_test = null;

    build_test = () => {
		let container = document.createElement("p"),
			span = document.createElement("span"),
			direction = '';
	
		container.style.margin =  "0 0 0 0";
		container.style.padding = "0 0 0 0";
		container.style.textAlign = "";
		
		span.innerHTML = "X";
		
		container.appendChild(span);
		document.body.appendChild(container);
		
		direction = span.offsetLeft < (container.offsetWidth - (span.offsetLeft + span.offsetWidth)) ? "ltr" : "rtl";
		msos.body.removeChild(container);
	
		if (msos.config.verbose) { msos.console.debug('msos.browser_direction -> by build_test: ' + direction); }
		return direction;
    };

    browser_dir = (msos.body.dir || document.documentElement.dir || build_test() || 'ltr').toLowerCase();
    msos.config.browser.direction = browser_dir;
};

msos.browser_preloading = () => {
	let script_pre = msos.config.script_preload,
		script_elm = document.createElement("script"),
		dua = navigator.userAgent;

	script_pre.async = 'async' in script_elm ? true : false;
	script_pre.defer = 'defer' in script_elm ? true : false;

	script_pre.explicit  = typeof script_elm.preload === "boolean" ? true : false;
	script_pre.available = script_pre.explicit ? true : (script_elm.readyState && script_elm.readyState === "uninitialized") ? true : false;
	script_pre.ordered   = (!script_pre.available && script_elm.async === true) ? true : false;
	script_pre.xhr_cache = (script_pre.available || (!script_pre.ordered && !(dua.indexOf("Opera") !== -1) && !(dua.indexOf("Gecko") !== -1))) ? true : false;

	script_elm = null;
};

msos.get_head = (win) => {
    let d = win.document,
		de = d.documentElement,
		hd = d.head || d.getElementsByTagName('head')[0];

    if (!hd) {
		hd = d.createElement('head');
		de.insertBefore(hd, de.firstChild);
    }
    return hd;
};

msos.create_node = (tag, atts_obj, win) => {
    // Allow creating element in another window
    if (!win) { win = window; }

    let elem = win.document.createElement(tag),
		at = '';

    if (msos.config.verbose) {
		msos.console.debug('msos.create_node -> called for: ' + tag, atts_obj);
    }

    for (at in atts_obj) {
		if (atts_obj.hasOwnProperty(at)) {
			elem.setAttribute(at, atts_obj[at]);
		}
    }

    return elem;
};

msos.loader = function (win = window) {
    let temp_mod = 'msos.loader',
		ld_obj = this,
		file = msos.purl().attr('file'),
		i = 0;

    if (!win.msos)	{ win.msos = {}; }		// Popup might not have msos defined
    if (!win.name)	{ win.name = file.replace(/[^0-9a-zA-Z]/g, '_') || 'base_win'; }

    // Initiate 'dynamic_files' tracking
    if (!win.msos.registered_files) {
		win.msos.registered_files = { js : {}, css : {}, ico : {}, ajax: {} };
    }

    msos.console.debug(temp_mod + " -> start for window: " + win.name);

    // Get document head element
    this.doc_head = msos.get_head(win);
    this.toggle_css = [];
    this.delay_css = 0;
	this.deferred_array = [];
	this.deferred_done = true;

	this.add_resource_onload = [];

    // Load the resource
    this.load = function (name, url, type, attribs = {}) {
		let base = url.split('?')[0],
			ext = base.substr(base.lastIndexOf('.') + 1),
			pattern = /^js|css|ico$/,
			lo = ' - load -> ',
			load_resource_func = null;

		if (msos.config.verbose) {
			msos.console.debug(temp_mod + lo + 'start.');
		}

		// If file type passed in use it, otherwise determine from url
		if (!type) { type = ext || 'na'; }

		if (!pattern.test(type)) {
			msos.console.error(temp_mod + lo + 'missing or invalid: ' + type);
			return;
		}

		if (ld_obj.check(name, url, type)) {

			msos.console.debug(temp_mod + lo + 'already loaded: ' + name + ', url: ' + url);

		} else {

			load_resource_func = () => ld_obj.resource(name, url, type, attribs);

			if (attribs.defer
			 && attribs.defer === 'defer') {

				if (msos.config.script_preload.ordered) {

					load_resource_func();
					msos.console.debug(temp_mod + lo + 'browser deferred file: ' + url);

				} else {

					if (ld_obj.deferred_done === true) {
						ld_obj.deferred_done = false;
						load_resource_func();	// Load first one directly
					} else {
						// Load next at callback. See ld_obj.resource -> on_resource_load()
						ld_obj.deferred_array.push(load_resource_func);
					}

					msos.console.debug(temp_mod + lo + 'deferred file: ' + url + ', queue: ' + ld_obj.deferred_array.length);
				}

			} else if (type === 'css') {

				// Some browsers (especially Chrome) need a small delay for multiple css loads
				setTimeout(load_resource_func, ld_obj.delay_css);
				ld_obj.delay_css += 5;

				msos.console.debug(temp_mod + lo + 'css file: ' + url + ', delay: ' + ld_obj.delay_css);

			} else {

				load_resource_func();
				msos.console.debug(temp_mod + lo + 'file: ' + url);
			}
		}

		if (msos.config.verbose) {
			msos.console.debug(temp_mod + lo + 'done!');
		}
    };

    this.check = function (file_name, file_url, file_type) {
		let toggle = ld_obj.toggle_css,
			flag_loaded = false,
			ld = ' - check -> ';

		msos.console.debug(temp_mod + ld + 'start.');

		// Important: See the popwin.js for 'win.msos.registered_files' clearing
		if (win.msos.registered_files[file_type]
		 && win.msos.registered_files[file_type][file_name]) {
			flag_loaded = true;
		}

		// Allow only one css file to be 'active', if part of a toggle 'group' such as size
		if (file_type === 'css' && toggle.length > 0) {
			// Turn any already loaded css (per type spec ld_obj.toggle_css) off
			for (i = 0; i < toggle.length; i += 1) {
				if (win.msos.registered_files.css[toggle[i]]) {
					win.msos.registered_files.css[toggle[i]].disabled = true;
				}
			}
			// If already loaded, turn this one back on
			if (win.msos.registered_files.css[file_name]) {
				win.msos.registered_files.css[file_name].disabled = false;
				msos.console.debug(temp_mod + ld + 'set active: ' + file_url);
			}

			// Run any included onload functions
			for (i = 0; i < ld_obj.add_resource_onload.length; i += 1) {
				ld_obj.add_resource_onload[i]();
			}
		}

		msos.console.debug(temp_mod + ld + 'done, already loaded (t/f): ' + (flag_loaded ? 'true' : 'false') + ' for ' + file_name);
		return flag_loaded;
    };

    this.init_create_node = function (name, url, type, attribs) {
		let node = null,
			icn = ' - init_create_node -> ',
			node_attrs = {},
			ats = '';

		if (msos.config.verbose) {
			msos.console.debug(temp_mod + icn + 'start.');
		}

		// Force new copies (for testing)
		if (msos.config.cache === false) {
			url += ((/\?.*$/.test(url) ? "&_" : "?_") + ~~ (Math.random() * 1E9) + "=");
		}

		// Define our typical node attributes by type (for convenience)
		if			(type === 'js' ) {
			node_attrs = { id: name, type: 'text/javascript', src: url, charset: 'utf-8' };
		} else if	(type === 'css') {
			node_attrs = { id: name, type: 'text/css',		rel: 'stylesheet',		href: url,	media: 'all' };
		} else if	(type === 'ico') {
			node_attrs = { id: name, type: 'image/x-icon',	rel: 'shortcut icon',	href: url };
		  }

		if (attribs !== undefined && typeof attribs === 'object') {
			for (ats in attribs) {
				if (attribs.hasOwnProperty(ats)) {
					node_attrs[ats] = attribs[ats];
				}
			}
		}

		// Important: You have to create a node in the variable 'win' window context in order
		// for IE to be able to use it (see 'this.resource'). FF, Opera and Chrome don't care.

		if			(type === 'js' ) {
			node = msos.create_node('script',	node_attrs, win);
			if (attribs.defer === 'defer')	{ node.async = false; }		// Browsers lacking "real defered" order retention
			else							{ node.async = true;  }		// Browsers conforming to "defered" order retention
		} else if	(type === 'css') {
			node = msos.create_node('link',		node_attrs, win);
		} else if	(type === 'ico') {
			node = msos.create_node('link',		node_attrs, win);
		  }

		node.msos_load_state = 'loading';

		if (type === 'js' && msos.config.script_onerror) {
			node.onerror = (e) => msos.console.error(temp_mod + ' -> failed for: ' + name, e);
		}

		if (msos.config.verbose) {
			msos.console.debug(temp_mod + icn + 'done!');
		}
		return node;
    };

    this.resource = function (file_name, file_url, file_type, file_atts) {
		let node = ld_obj.init_create_node(file_name, file_url, file_type, file_atts) || null,
			ls = ' - resource -> ',
			on_resource_load = function () {
				let i = 0,
					shifted;

				if (this.msos_load_state !== 'loaded' && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete' || this.readyState === 'uninitialized')) {

					if (msos.config.verbose) {
						msos.console.debug(temp_mod + ls + 'loaded, name: ' + this.id);
					}

					this.msos_load_state = 'loaded';

					for (i = 0; i < ld_obj.add_resource_onload.length; i += 1) {
						ld_obj.add_resource_onload[i]();
					}

					// Check for (and run) next deferred script
					if (this.getAttribute('defer') === 'defer') {
						if (ld_obj.deferred_array.length) {
							shifted = ld_obj.deferred_array.shift();
							shifted();
						} else {
							ld_obj.deferred_done = true;
						}
					}

					this.onload = this.onreadystatechange = null;
				}

				return true;
			};

		msos.console.debug(temp_mod + ls + 'start, type: ' + file_type + ', name: ' + file_name);

		if (node !== null) {

			// Run something when node loads...
			node.onload = node.onreadystatechange = on_resource_load;

			// Add the new node to the page head...
			ld_obj.doc_head.appendChild(node);

			// Store our new dynamic file node
			win.msos.registered_files[file_type][file_name] = node;

			msos.console.debug(temp_mod + ls + 'done!');
		}
    };

    msos.console.debug(temp_mod + " -> done!");
};


// --------------------------
// Setup MSOS Environment
// --------------------------
msos.set_environment = () => {
    let set_txt = 'msos.set_environment -> ',
		st_obj = msos.config.storage;

    msos.console.debug(set_txt + 'start');

	// Get stored site user info
	st_obj.site_pref.value = msos.basil.get(st_obj.site_pref.name);
	st_obj.site_i18n.value = msos.basil.get(st_obj.site_i18n.name);
	st_obj.site_bdwd.value = msos.basil.get(st_obj.site_bdwd.name);

    // Get some browser capabilities
	msos.browser_ok();
    msos.browser_current();
    msos.browser_advanced();
    msos.browser_editable();
    msos.browser_orientation();
    msos.browser_touch();
    msos.browser_mobile();
	msos.browser_preloading();

	if (msos.config.verbose) {
		msos.console.debug(set_txt + 'done, browser env: ', msos.config.browser);
	} else {
		msos.console.debug(set_txt + 'done!');
	}
};

msos.calc_display_size = () => {
    let view = '',
		view_size = msos.config.view_port,
		view_width = 0,
		scrn_width = 0,
		scrn_px = 0,
		size = '',
		adj_width = 0;

    // Screen width (as displayed)
    if (!msos.var_is_empty(view_size.width) && view_size.width !== 0) { view_width = view_size.width; }
    if (!msos.var_is_empty(   screen.width) &&	  screen.width !== 0) { scrn_width =    screen.width; }

    scrn_px = view_width || scrn_width;

    for (size in msos.config.size_wide) {
		// Get the size that fits (size_wide + 1%)
		if (msos.config.size_wide.hasOwnProperty(size)) {
			adj_width = msos.config.size_wide[size] + (msos.config.size_wide[size] * 0.01);
			if (scrn_px > adj_width) {
				if (view) { if (msos.config.size_wide[view] < msos.config.size_wide[size])	{ view = size; } }
				else																		{ view = size; }
			}
		}
    }

    msos.console.debug('msos.calc_display_size -> calculated: ' + view + ', viewport w: ' + view_size.width + ', screen w: ' + screen.width);
    return view;
};

msos.get_display_size = (resize) => {
    let temp_dis = 'msos.get_display_size -> ',
		store_value = msos.config.storage.site_pref.value,
		browser_layout  = msos.config.view_orientation.layout,
		store_array = [],
		display_size = '';

    msos.console.debug(temp_dis + 'start, resize: ' + (resize ? 'true' : 'false'));

    if (store_value) {
		store_array = store_value.split(':');
		if (browser_layout === 'portrait')	{ display_size = store_array[0] || ''; }
		else								{ display_size = store_array[1] || ''; }
		msos.console.debug(temp_dis + 'stored value detected: ' + store_value);
    } else {
		// set stored value to something initially
		store_array[0] = 'unknown';
		store_array[1] = 'unknown';
      }

    // Always update this
    store_array[2] = browser_layout;

    // This layout not set yet, so set to undef and get_size will kick in
    if (display_size === 'unknown' || resize) { display_size = ''; }

    msos.config.size = msos.config.query.size || display_size || msos.calc_display_size();

    if (msos.config.query.size) {
		// Warn that onorientationchange or onresize display change may have been overridden by an input value
		msos.console.info(temp_dis + 'NOTE: size set by input!');
    }

    if (browser_layout === 'portrait')	{ store_array[0] = msos.config.size; }
    else								{ store_array[1] = msos.config.size; }

    store_value = store_array.join(':');

	// Reset site user preferences info...
	msos.config.storage.site_pref.value = store_value;

    msos.console.debug(temp_dis + 'done: ' + msos.config.size + ', for ' + browser_layout);
};


// --------------------------
// Bulk External CSS Loading
// --------------------------
msos.css_loader = (url_array, win) => {
	let temp_cl = 'msos.css_loader -> ',
		loader_obj = null,
		css_name = '',
		css_url = '',
		i = 0;

	msos.console.debug(temp_cl + 'start.');

	// One loader object retains load order 
	loader_obj = new msos.loader(win);

	for (i = 0; i < url_array.length; i += 1) {
		css_url = url_array[i];
		css_name = msos.generate_url_name(css_url);
		loader_obj.load(css_name, css_url, 'css');
	}

	msos.console.debug(temp_cl + 'done!');
};

msos.escape_html = (str) => {
    if (str) {
        return jQuery('<div></div>').text(str).html();
    }

    return '';
};

msos.valid_jq_node = ($node, type) => {
    let temp_vn = 'msos.valid_jq_node -> input is not a ';

	if (msos.in_dom_jq_node($node)) {
		if ($node[0].tagName.toLowerCase() === type) { return true; }
		else {
			msos.console.error(temp_vn + 'valid jQuery node: ', $node);
		}
	} else {
		msos.console.error(temp_vn + 'node of type: ' + type);
	}

    return false;
};

msos.in_dom_jq_node = ($node) => {
	if ($node
	 && $node.length
	 && $node[0].parentNode) {
		return true
	}

	$node = null;	// clean it up
	return false;
};

msos.byid = (id, in_doc) => {
    let temp_byi = 'msos.byid -> ',
		use_doc = null,
		dom_node = null;

    if (in_doc)	{ use_doc = in_doc; }
    else		{ use_doc = window.document; }

    if (typeof id !== "string") {
		msos.console.error(temp_byi + 'input not an id string!');
		return null;
    }

    dom_node = jQuery('#' + id, use_doc)[0];

    if (_.isElement(dom_node)) {
		return dom_node;
    }

	msos.console.warn(temp_byi + 'na: ' + id);
	return null;
};

msos.zero_pad = (input, count, left) => {
    let str = input.toString();

    while (str.length < count) {
        str = (left ? ("0" + str) : (str + "0"));
    }
    return str;
};

msos.run_onresize = () => {
    let temp_onr = 'msos.run_onresize -> ',
		port_width = msos.config.view_port.width,	// save original width
		m = 0;

	msos.console.debug(temp_onr + 'start.');

    // Get the viewport size (which resets msos.config.view_port)
    msos.get_viewport(window);

	// Run all window onresize functions now
	for (m = 0; m < msos.onresize_functions.length; m += 1) {
		msos.onresize_functions[m]();
	}

	msos.console.debug(temp_onr + 'done, orig. w: ' + port_width + ', new w: ' + msos.config.view_port.width + ', for: ' + m + ' functions.');
};

msos.run_onorientationchange = () => {
    let temp_ono = 'msos.run_onorientationchange -> ',
		port_width = msos.config.view_port.width,	// save original width
		previous = msos.config.view_orientation,	// previous orientation
		m = 0;

	msos.console.debug(temp_ono + 'start, new: ' + window.orientation + ', pre: ' + previous.numeric);

	// Quick check for orientation change
	if (window.orientation === previous.numeric) {

		msos.console.debug(temp_ono + 'done, no change.');
		return;
	}

	// Reset 'view_orientation' variables
	msos.browser_orientation();

	// Get the viewport size (which resets msos.config.view_port)
    msos.get_viewport(window);

	// Run all window onorientationchange functions now
	for (m = 0; m < msos.onorientationchange_functions.length; m += 1) {
		msos.onorientationchange_functions[m]();
	}

	msos.console.debug(temp_ono + 'done, orig. w: ' + port_width + ', new w: ' + msos.config.view_port.width + ', for: ' + m + ' functions.');
};

msos.gen_select_menu = (select_elm, options_object, selected) => {
    let temp_gen = 'msos.gen_select_menu',
        to_check = [],
        checked = [];

	if (msos.config.verbose) {
		msos.console.debug(temp_gen + ' -> start: ', options_object);
	} else {
		msos.console.debug(temp_gen + ' -> start, id: ' + (select_elm.attr('id') || 'na'));
	}

    if (!msos.valid_jq_node(select_elm, 'select')) { return; }

    // Clear past options
    select_elm.empty();

    // Don't allow non-word characters, ever
    selected = selected ? selected.replace(/\W/g, '_') : '';

    // Generate options or optgroup/options
    function add_opts(sel_elm, options_obj) {
        let key = '',
            value = '',
            optgroup, inner_obj;

        for (key in options_obj) {

			inner_obj = options_obj[key];
			if (typeof inner_obj === 'object') {
				key.replace('_', ' ');
				optgroup = jQuery('<optgroup label="' + key + '">');
				add_opts(optgroup, inner_obj);
				sel_elm.append(optgroup);
			}
			else if (typeof inner_obj === 'string') {
				value = jQuery.trim(options_obj[key]);
				if (key === selected) {
					sel_elm.append(new Option(value, key, false, true));
				}
				else {
					sel_elm.append(new Option(value, key));
				}
				to_check.push(key);
			}
			else {
				msos.console.error(temp_gen + ' -> oops: ' + key);
			}

        }
    }

    if (_.size(options_object) > 0) {
        // Start our select build function
        add_opts(select_elm, options_object);
    } else {
        msos.console.error(temp_gen + ' -> done, no options passed in!');
        return;
    }

    // Check for duplicate keys (which is very bad)
    checked = _.uniq(to_check);

    if (to_check.length !== checked.length) {
        msos.console.error(temp_gen + ' -> duplicate key!');
    }

    msos.console.debug(temp_gen + ' -> done!');
};


// *******************************************
// MSOS Module Loading Functions
// *******************************************

msos.provide = (register_module) => {
    let temp_p = 'msos.provide -> ',
		mod_id = register_module.replace(/\./g, '_');

    if (msos.registered_modules[mod_id]) {
		msos.console.warn(temp_p + 'already registered: ' + register_module);
    } else {
		msos.registered_modules[mod_id] = true;
    }

	msos.console.debug(temp_p + 'executing: ' + register_module);
};

msos.require = (module_name, add_onsuccess_func) => {
    let req_text = 'msos.require -> ',
		module_id = '',
		name_array = module_name.split("."),
		module_base = name_array[0],
		did_module_load = null,
		on_success = null,
		on_complete = null,
		uri = '';

	// Only allow a-z, 0-9, period, dash in module names
	if (!/^[0-9a-zA-Z.-]+$/.test(module_name)) {
		msos.console.error(req_text + 'name not allowed: ' + module_name);
		return;
	}

	module_id = module_name.replace(/\./g, '_');

    // Already loaded or loading, just go on...
    if (typeof msos.registered_modules[module_id] === 'boolean') {
		if (msos.registered_modules[module_id] === true) {
			if (_.isFunction(add_onsuccess_func)) { add_onsuccess_func(); }
		}
		return;
	}

    msos.registered_modules[module_id] = false;

    did_module_load = function () {
		if (msos.registered_modules[module_id]) {
			msos.console.debug(req_text + 'success: ' + module_name);
		} else {
			msos.console.error(req_text + 'failed: '  + module_name);
		  }
    };

    if (!msos.registered_folders[module_base]) {
		msos.console.debug(req_text + 'auto resolving module base: ' + module_base);
		msos.registered_folders[module_base] = msos.resource_url(module_base, '');
    }

    // Define new module objects
	msos.gen_namespace(module_name);

    // Special case: A 'msos.i18n.xxx' 'ajax' request is handled in msos.i18n
    if (name_array[0] === 'msos' && name_array[1] === 'i18n') {
		if (name_array.length > 2) {
			if (msos.config.verbose) {
				msos.console.debug(req_text + 'i18n request for: ' + module_name);
			}
			if (typeof msos.registered_modules.msos_i18n !== 'boolean') {
				// Set back to just 'msos.i18n' for std. 'require'
				name_array.splice(2);
				module_name = name_array.join('.');
				module_id   = name_array.join('_');
				// Register 'msos.i18n' as required (since it didn't above)
				msos.registered_modules.msos_i18n = false;
			} else {
				// msos.i18n already in 'require' queue
				return;
			  }
		}
    }

    // Bump the module base name
    name_array.shift();

    // Convert to path
    uri = msos.registered_folders[module_base] + name_array.join("/") + '.js';

    msos.require_queue += 1;

    if (msos.config.verbose) {
		msos.console.debug(req_text + 'request for module: ' + uri + ', queue: ' + msos.require_queue);
    }

    /* Available inputs: data, status, xhr */
    on_success = () => {
		msos.console.debug(req_text + 'found: ' + module_name + ', queue: ' + msos.require_queue);

		msos.registered_files.ajax[module_name] = uri;

		if (_.isFunction(add_onsuccess_func)) { add_onsuccess_func(); }
    };

    on_complete = () => {
		msos.console.debug(req_text + 'completed: ' +  module_name + ', queue: ' + msos.require_queue);

		// Now verify is executable
		setTimeout(did_module_load, 100);

		// Request completed, so de-increment the queue
		msos.require_queue -= 1;
    };

    msos.ajax_request(uri, "script", on_success, on_complete);
};

msos.template = (template_name, add_onsuccess_func) => {
    let req_text = 'msos.template -> ',
		template_id = template_name.replace(/\./g, '_'),
		name_array = template_name.split("."),
		template_base = name_array[0],
		tmpl_obj = null,
		on_success = null,
		on_complete = null,
		uri = '';

	// Only allow a-z, 0-9, period, dash in module names
	if (!/^[0-9a-zA-Z.-]+$/.test(template_name)) {
		msos.console.error(req_text + 'name not allowed: ' + template_name);
		return;
	}

	tmpl_obj = msos.gen_namespace(template_name);

    // Already loaded or loading, just go on...
    if (typeof msos.registered_templates[template_id] === 'boolean') {
		if (msos.registered_templates[template_id] === true) {
			if (_.isFunction(add_onsuccess_func)) { add_onsuccess_func(tmpl_obj); }
		}
		return;
	}

    msos.registered_templates[template_id] = false;

    if (!msos.registered_folders[template_base]) {
		msos.console.debug(req_text + 'auto resolving template base: ' + template_base);
		msos.registered_folders[template_base] = msos.resource_url(template_base, '');
    }

    // Bump the module base name
    name_array.shift();

    // Convert to path
    uri = msos.registered_folders[template_base] + name_array.join("/") + '.html';

    msos.require_queue += 1;

    if (msos.config.verbose) {
		msos.console.debug(req_text + 'request for template: ' + uri + ', queue: ' + msos.require_queue);
    }

    // Available inputs: data, status, xhr
    on_success = (data) => {
		// Now verify useful data
		if (typeof data === 'string' && data.length > 0) {
			// Load template html into the base object
			tmpl_obj.text = data;
			tmpl_obj.name = template_id;
			// Register loaded
			msos.registered_templates[template_id] = true;
			msos.console.debug(req_text + 'found: ' + template_name + ', queue: ' + msos.require_queue);

			if (_.isFunction(add_onsuccess_func)) { add_onsuccess_func(tmpl_obj); }

		} else {
			tmpl_obj.text = '';
			msos.console.error(req_text + 'failed, no data: ' + template_name + ', queue: ' + msos.require_queue);
		  }
    };

    on_complete = () => {
		msos.console.debug(req_text + 'completed: ' +  template_name + ', queue: ' + msos.require_queue);
		// Request completed, so de-increment the queue
		msos.require_queue -= 1;
    };

    msos.ajax_request(uri, "html", on_success, on_complete);
};

msos.ajax_request = (ajax_uri, data_type, on_success_func, on_complete_func) => {
    let req_text = 'msos.ajax_request -> ',
		ajax_name = msos.generate_url_name(ajax_uri),
		st = msos.new_time(),
		on_success_request = (data, status, xhr) => {

			// Track bandwidth for each request
			if (typeof data === 'string' && data.length > 0) {
				let et = msos.new_time(),
					sec = (et - st) / 1e3,
					bits = data.length * 8,
					bps = Math.round(bits / sec),
					kbps = parseInt(bps / 1024, 10);

				msos.ajax_loading_kbps[ajax_name] = kbps;
			}

			if (msos.config.verbose) {
				msos.console.debug(req_text + 'status: ' + status + ', data length: ' + (data.length || 0));
			}

			if (_.isFunction(on_success_func)) { on_success_func(data, status, xhr); }
		},
		on_complete_request = (xhr, status) => {
			let stat_msg = xhr.status + ', status: ' + status;

			if (msos.config.verbose) {
				msos.console.debug(req_text + 'completed: ' + stat_msg);
			}
			if (_.isFunction(on_complete_func)) { on_complete_func(xhr, status); }
		};

    jQuery.ajax(
		{
			url: ajax_uri,
			dataType: data_type,
			cache: msos.config.cache,
			success: on_success_request,
			error: msos.ajax_error,
			complete: on_complete_request
		}
    );
};

msos.ajax_error = (xhr, status, error) => {
    let err_msg = status + ': ' + error,
		use_msg = '',
		i18n = {};

    // Timing of i18n common loading is a factor
    if (msos.i18n
     && msos.i18n.common
     && msos.i18n.common.bundle) {
		i18n = msos.i18n.common.bundle;
    }

    switch (xhr.status) {
		case 200: use_msg = i18n.internal		|| 'Internal error';		break;
		case 404: use_msg = i18n.input			|| 'Input error';			break;
		case 407: use_msg = i18n.authentication || 'Authentication error';	break;
		case 500: use_msg = i18n.server			|| 'Server error';			break;
		case 504: use_msg = i18n.timeout		|| 'Timeout error';			break;
		default:  use_msg = i18n.unknown		|| 'Unknown error';
    }

	use_msg += ' (' + (xhr.status || 'no status') + ')';

	msos.notify.error(error, use_msg);

    if (msos.require_queue > 0) { use_msg += ', ref. req. queue ' + msos.require_queue; }
    if (msos.i18n_queue > 0)	{ use_msg += ', ref. i18n queue ' + msos.i18n_queue; }

    use_msg = 'msos.ajax_error -> failed: ' + err_msg + ', xhr: ' + use_msg;

    if (msos.config.verbose)	{ msos.console.error(use_msg, xhr); }
    else						{ msos.console.error(use_msg); }
};

msos.hide_mobile_url = () => {
	// Order with msos.notify is important. We don't want scrolling and DOM manipulations to interact.
	window.scrollTo(0, 1);

	let scrollTop =
			window.pageYOffset
		|| (window.document.compatMode === "CSS1Compat" && window.document.documentElement.scrollTop)
		||  window.document.body.scrollTop
		||  0;

	msos.console.debug('msos.hide_mobile_url -> called, scrollTop: ' + scrollTop);

	setTimeout(() => { window.scrollTo(0, scrollTop === 1 ? 0 : 1); }, 1);
};

msos.notify = {

	container: jQuery("<div id='notify_container'></div>"),

	add: function () {
		let cont = this.container;

		// Add our container
		jQuery('body').append(cont);

		// Position using jquery.ui.position object
		cont.position(
			{
				of: window,
				my: 'center top+60',
				at: 'center top',
				collision: 'none'
			}
		);

		// Now fix it in place
		cont.css('position', 'fixed');
	},

	queue: [],
	current: null,

	clear_current: function () {
		let self = this;

		// Errors and warnings are a special case, (we always show them to completion)
		if (self.current !== null
		 && self.current.type !== 'warning'
		 && self.current.type !== 'error') {

			msos.console.debug('msos.notify.clear_current -> called, on type: ' + self.current.type);

			self.current.fade_out();
		}
	},

	clear: function () {
		let self = this,
			n = 0;

		msos.console.debug('msos.notify.clear -> called, for queue: ' + self.queue.length);

		self.clear_current();

		for (n = 0; n < self.queue.length; n += 1) {
			if (self.queue[n].type !== 'warning'
			 && self.queue[n].type !== 'error') {
				clearTimeout(self.queue[n].auto_delay);
			}
		}
	},

	run: function () {
		let temp_rn = 'msos.notify.run -> ',
			self = this;

			self.current = self.queue.shift() || null;

		if (_.isObject(self.current)) {

			msos.console.debug(temp_rn + 'prepend, type: ' + self.current.type);

			// Prepend the notify element to our container
			self.container.prepend(self.current.note_el);

			// Add the specified display delay
			self.current.auto_delay = setTimeout(self.current.fade_out, self.current.delay);
		}
	},

	base: function (type, message, title, icon_html, delay = 4000) {	// default delay (minimum), is 4 sec.
		let temp_ntf = 'msos.notify.base -> ',
			self = this,
			base_obj = {
				type: type,
				delay: delay,
				auto_delay: 0,
				icon_el: null,
				butt_el: jQuery("<button class='btn btn-danger btn-small fa fa-times'></button>"),
				note_el: jQuery("<div class='notify'></div>"),
				disp_el: jQuery("<div class='notify_display'></div>"),
				titl_el: jQuery("<div class='notify_title'></div>"),
				 msg_el: jQuery("<div class='notify_msg'></div>")
			};

		msos.console.debug(temp_ntf + 'start, type: ' + type);

		// Append close button
		base_obj.disp_el.append(base_obj.butt_el);

		if (icon_html) {
			base_obj.icon_el = jQuery(icon_html);
			base_obj.note_el.append(base_obj.icon_el);
		}

		if (title) {
			base_obj.titl_el.append(document.createTextNode(title));
			base_obj.disp_el.append(base_obj.titl_el);
		}

		if (message) {
			base_obj.msg_el.append(document.createTextNode(message));
			base_obj.disp_el.append(base_obj.msg_el);
		}

		// Append new message
		base_obj.note_el.append(base_obj.disp_el);

		base_obj.fade_out = function () {
			if (base_obj.auto_delay === 0) {
				self.queue.pop();	// Skip (since it was called to fade before it displayed)
			} else {
				clearTimeout(base_obj.auto_delay);
				base_obj.note_el.fadeOut(
					'slow',
					function () {
						msos.console.debug(temp_ntf + 'fade_out, type: ' + type);
						base_obj.note_el.remove();
						self.run();
					}
				);
			}
		};

		base_obj.butt_el.on(
			"click",
			base_obj.fade_out
		);

		self.queue.push(base_obj);

		// Manually fire the first one
		if (self.current === null) { self.run(); }

		msos.console.debug(temp_ntf + 'done!');
		return base_obj;
	},

	info: function (message, title) {
		let obj = msos.notify.base(
			'info',
			message,
			title,
			'<i class="fa fa-info-circle fa-2x info">'
		);
		return obj;
	},

	warning: function (message, title) {
		let obj = msos.notify.base(
			'warning',
			message,
			title,
			'<i class="fa fa-warning fa-2x warning">',
			6000
		);
		return obj;
	},

	error: function (message, title) {
		let obj = msos.notify.base(
			'error',
			message,
			title,
			'<i class="fa fa-ban fa-2x error">',
			8000
		);
		return obj;
	},

	success: function (message, title) {
		let obj = msos.notify.base(
			'success',
			message,
			title,
			'<i class="fa fa-check-circle fa-2x success">'
		);
		return obj;
	},

	loading: function (message, title) {
		let obj = msos.notify.base(
			'loading',
			message,
			title,
			'<i class="fa fa-spinner fa-spin fa-2x loading">',
			10000
		);
		return obj;
	}
};

// Add error notification (Overwritten in msos.onerror for server notification)
window.onerror = (msg, url, line, col, er) => {
	let error_txt = 'JavaScript Error!';

	msos.console.error('window.onerror -> fired, line: ' + line + ', url: ' + url + ', error: ' + msg, er);

	// Timing and availability of i18n common loading is a factor (so isolate)
	if (msos.i18n
	 && msos.i18n.common
	 && msos.i18n.common.bundle) {
		error_txt = msos.i18n.common.bundle.error || error_txt;
	}

	msos.notify.error(msg, error_txt);
	return true;
};

msos.check_resources = () => {
    let temp_chk = 'msos.check_resources -> ',
		mod_id = '',
		count_module = 0,
		count_file = 0,
		scripts = document.getElementsByTagName("script") || [],
		src,
		i,
		i18n = {
			modules: 'module(s)',
			files: 'file(s)',
			load_error: 'Loading Error!',
			load_failed: 'failed to load.'
		},
		key = '',
		error_msg = '';

    // Check our ajax retrieved scripts for loading
    for (mod_id in msos.registered_modules) {
		if (!msos.registered_modules[mod_id]) {
			msos.console.error(temp_chk + 'module failed to load: ' + (mod_id.replace(/_/g, '.')));
			count_module += 1;
		}
    }

    // Check our document.write injected scripts for loading (Google API's, etc.)
    for (i = 0; i < scripts.length; i += 1) {
		if (scripts[i].readyState
		&& (scripts[i].readyState !== "loaded" || scripts[i].readyState !== "complete")) {
			src = scripts[i].getAttribute("src") || '';
			if (src) {
				msos.console.error(temp_chk + 'file failed to load: ' + src);
				count_file += 1;
			}
		}
    }

    if (count_module > 0 || count_file > 0) {
		// Timing of i18n common loading is a factor
		if (msos.i18n
		 && msos.i18n.common
		 && msos.i18n.common.bundle) {
			for (key in i18n) {
				if (msos.i18n.common.bundle[key]) {
					i18n[key] = msos.i18n.common.bundle[key];
				}
			}
		}

		if (count_module > 0) { error_msg += count_module + ' ' + i18n.modules; error_msg += count_file > 0 ? ', ' : ''; }
		if (count_file   > 0) { error_msg += count_file   + ' ' + i18n.files; }

		error_msg += ' ' + i18n.load_failed;

		msos.notify.error(error_msg, i18n.load_error);
    }
};

msos.set_bandwidth = () => {
    let temp_sb = 'msos.set_bandwidth -> ',
		clear = '',
		cfg = msos.config,
		ajax_obj = cfg.storage.site_ajax,
		bdwd_obj = cfg.storage.site_bdwd,
		ajx_ldg = msos.ajax_loading_kbps,	// loading speeds from ajax file calls
		ajx_ses = msos.basil.get(ajax_obj.name) || {},
		kbps = '',
		kbps_new = false,
		cnt = 0,
		sum = 0,
		avg = 0,
		i = 0;

	// This function does **not** provide a rigorous bandwidth value, but just
	// a reasonable "best guess" estimate. It is important to note that it
	// assumes reasonable server "caching" is employed. Ref. /htdocs/.htaccess

	if (cfg.clear_storage) {
		clear += ', cleared storage (as new user)';
	}

	if (cfg.verbose) {
		clear += ', request ajax bandwidth: ';
		msos.console.debug(temp_sb + 'start' + clear, ajx_ldg);
	} else {
		clear += '.';
		msos.console.debug(temp_sb + 'start' + clear);
	}

	// Determine new values...(for just loaded files, as others should come from cache)
	for (kbps in ajx_ldg) {
		ajx_ses[kbps] = ajx_ldg[kbps];
		kbps_new = true;
	}

	if (kbps_new) {

		msos.console.debug(temp_sb + 'new value(s) added!');

		for (kbps in ajx_ses) {
			sum += parseInt(ajx_ses[kbps], 10);
			cnt += 1;
		}

		avg = sum / cnt;

		ajax_obj.value = ajx_ses;
		msos.basil.set(ajax_obj.name, ajax_obj.value);
		ajax_obj.set = true;

	} else {

		msos.console.debug(temp_sb + 'no new values');

		// No uploaded files?  Just use previous stored value or an ultra-low default
		avg = bdwd_obj.value || 10.0;
	}

	// Reset site user stored info (Kbps)
    bdwd_obj.value = parseInt(avg, 10);
	msos.basil.set(bdwd_obj.name, bdwd_obj.value);
	bdwd_obj.set = true;

	msos.console.debug(temp_sb + 'done, bandwidth: ' + parseInt(avg, 10));
};

msos.connection = () => {
	let temp_con = 'msos.connection -> ',
		con_nav = navigator.connection || { type: 0, bandwidth: 0, metered: false },
		con_cfg = msos.config.connection,
		con_type = 'na',
		con_bwidth = 0,
		between = (val, low, high) => {
            return low < high ? val >= low && val <= high : val >= high && this <= low;
        };

	if (msos.config.verbose) {
		msos.console.debug(temp_con + 'start, input: ', con_nav);
	}

	if (!msos.config.storage.site_bdwd.set) {
		msos.console.warn(temp_con + 'calc\'d bandwidth not available yet!');
	}

	if (con_nav.bandwidth && !msos.var_is_empty(con_nav.bandwidth)) {
		con_bwidth = con_nav.bandwidth;
	} else {
		con_bwidth = msos.config.storage.site_bdwd.value || 10;	// default min. is 10kbps
	}

	if (con_nav.type === 1)									{ con_type = 'fast'; }
	if (con_nav.type === 2)									{ con_type = 'fast'; }
	if (/wifi|ethernet/i.test(con_nav.type))				{ con_type = 'fast'; }
	if (con_nav.type === 3 || /2g$/i.test(con_nav.type))	{ con_type = '2g'; }
	if (con_nav.type === 4 || /3g$/i.test(con_nav.type))	{ con_type = '3g'; }
	if (/4g$/i.test(con_nav.type))							{ con_type = '4g'; }

	// On a relative scale (not actual kbps - ref. see msos.ajax_request)
	if (con_type === 'na') {
		con_type = between(con_bwidth, 1, 50)
					? "slow"
					: between(con_bwidth, 51, 150)				// actual is approx. 100-150kbps
						? "2g"
						: between(con_bwidth, 151, 600)			// actual is approx. 600-1400kbps
							? "3g"
							: between(con_bwidth, 601, 1000)	// actual is approx. 3000-6000kbps 
								? "4g"
								: "fast";
	}

	// Record our findings
	con_cfg.type = con_type;
	con_cfg.bandwidth = con_bwidth;
	con_cfg.metered = con_nav.metered ? true : false;

	if (msos.config.verbose) {
		msos.console.debug(temp_con + 'done, output: ', con_cfg);
	}
};

msos.set_window_onchange = () => {
	let temp_sw = 'msos.set_window_onchange -> ';

	msos.console.debug(temp_sw + 'start.');

	// Bind onresize function
	jQuery(window).on('resize', _.debounce(msos.run_onresize, 250));

	// Bind onorientationchange function (always run on change)
	if (msos.config.orientation
	 && msos.config.orientation_change) {
		jQuery(window).on('orientationchange', _.debounce(msos.run_onorientationchange, 100));
	}

	msos.console.debug(temp_sw + 'done!');
};

msos.run_intial = () => {
	let run_in = 'msos.run_intial -> ';

	msos.console.debug(run_in + 'start.');

	// Set our broswer environment, now that page dom is loaded
	msos.body = window.document.body || window.document.getElementsByTagName("body")[0];
	msos.head = msos.get_head(window);
	msos.html = window.document.getElementsByTagName('html')[0];
	msos.docl = document.compatMode === "BackCompat" ? window.document.body : window.document.documentElement;

	msos.browser_direction();

	msos.console.debug(run_in + 'done!');
};

msos.run_final = () => {
	let temp_rf = 'msos.run_final';

	msos.console.debug(temp_rf + ' -> start.');

	// Run any "post" msos.run_onload functions
	msos.run_function_array('onload_func_post');

	msos.set_locale_storage();

	msos.console.debug(temp_rf + ' -> done!');

	// Last function, report debugging output
	if (msos.pyromane) { setTimeout(msos.pyromane.run, 500); }

	msos.run_onload_incr += 1;
};


// *******************************************
// MSOS Main Code Logic Control Function
// *******************************************

msos.run_onload_incr = 1;
msos.run_onload = () => {
    let run_txt = 'msos.run_onload (' + msos.run_onload_incr + ') =====> ',
		cfg = msos.config,
		delay = 100,
		to_secs = delay / 1000,
		report_stop,
		cc = cfg.storage;

	/*
		JavaScript is all about timing. This funtion allows precise timing of software
		execution in layers. Important because it allows us to load modules based on user
		preferences, browser settings and page html in cascading order of readiness.
	*/

	// Page is loaded, so lets get some setup started (but only once)
    if (msos.require_attempts === 0) {

		msos.console.time('run_onload');

		if (cfg.verbose) {
			msos.console.debug(run_txt + 'start.', cfg);
		} else {
			msos.console.debug(run_txt + 'start.');
		}

		// Run "preload" functions
		msos.run_function_array('onload_func_pre');

		setTimeout(msos.run_onload, delay);
		msos.require_attempts += 1;
		return;
    }

	// All 'require' files are loaded, so create i18n objects if requested (but only once)
	if (msos.require_queue === 0 && msos.i18n && !msos.i18n.done) {

		msos.i18n.module_add();
		msos.i18n.done = true;

		setTimeout(msos.run_onload, delay);
		msos.require_attempts += 1;
		return;
	}

	// All 'require' and 'i18n' files are loaded, so set stored values and get bandwidth
	if (msos.require_queue === 0 && msos.i18n_queue === 0 && !cc.site_bdwd.set) {

		// Calc. bandwidth
		// Note: also sets new values
		msos.set_bandwidth();
		msos.connection();

		// Set onresize, onorientationchange
		msos.set_window_onchange();

		// Set/Reset site user preferences
		msos.basil.set(
			cc.site_pref.name,
			cc.site_pref.value
		);
		cc.site_pref.set = true;

		// Set/Reset site user bandwidth tracking
		msos.basil.set(
			cc.site_bdwd.name,
			cc.site_bdwd.value
		);

		setTimeout(msos.run_onload, delay);
		msos.require_attempts += 1;
		return;
	}

	// All 'require' and 'i18n' files are loaded, so run module defined setup (but only once)
    if (msos.require_queue === 0 && msos.i18n_queue === 0 && msos.onload_func_start.length > 0) {

		// Run "start" functions
		msos.run_function_array('onload_func_start');

		setTimeout(msos.run_onload, delay);
		msos.require_attempts += 1;
		return;
    }

	if (msos.require_queue === 0 && msos.i18n_queue === 0) {

		// All required modules loaded, so run cached page level/user interface functions
		msos.run_function_array('onload_functions');

		// All normal cached functions have run, so run cleanup/end functions
		msos.run_function_array('onload_func_done');

		if (cfg.verbose) {
			msos.console.debug(
				run_txt + 'done, modules and templates: ',
				msos.registered_modules,
				msos.registered_templates
			);
		} else {
			msos.console.debug(run_txt + 'done!');
		}

		// Reset flags
		msos.require_attempts = 0;
		if (msos.i18n) { msos.i18n.done = false; }

		msos.console.timeEnd('run_onload');

		// Add slight delay, then finish up.
		setTimeout(msos.run_final, delay);

    } else {

		if (_.indexOf([10, 20, 40, 80, 100, 100], msos.require_attempts) !== -1) {
			msos.console.warn(run_txt + 'waited: ' + (msos.require_attempts * to_secs) + ' secs.');
		} else if (msos.require_attempts > 100) {
			report_stop = () => {
				msos.console.error(run_txt + 'failed, module queue: ' + msos.require_queue + ', i18n queue: ' + msos.i18n_queue);
				msos.notify.warning(jQuery('title').text(), 'Page Timed Out');
				msos.check_resources();
			};
			// Let any 'thrown errors' settle, then report script stop
			setTimeout(report_stop, 400);
			return;
		}
		setTimeout(msos.run_onload, delay);
		msos.require_attempts += 1;
    }
};


// *******************************************
// Establish base MSOS environment
// *******************************************

msos.set_environment();
msos.set_locale();
msos.get_display_size();


// *******************************************
// Start main MobileSiteOS functions
// *******************************************

jQuery(document).ready(
	() => {
		// Order is important!
		if (msos.config.mobile) {
			msos.hide_mobile_url();
		}

		msos.notify.add();
		msos.run_intial();
		msos.run_onload();
	}
);


// *******************************************
// Acknowledge and record
// *******************************************

msos.registered_modules.msos = true;

msos.console.info('msos/base -> done!');
msos.console.timeEnd('base');
