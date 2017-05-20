// Copyright Notice:
//					config.js
//			Copyright©2012-2017 - OpenSiteMobile
//				All rights reserved
// ==========================================================================
//			http://ngmomentum.com & http://opensitemobile.com
// ==========================================================================
// Contact Information:
//			Author: Dwight Vietzke
//			Email:  dwight_vietzke@yahoo.com

/*
	MobileSiteOS demo pages (base) configuration file
*/

/*global
	msos: false
*/

import '../mobilesiteos/jquery/v311_msos.uc.js';
import '../mobilesiteos/jquery/ui/v1120.uc.js';
import '../mobilesiteos/underscore/v183.uc.js';
import '../mobilesiteos/backbone/v123.uc.js';
import '../mobilesiteos/hammer/v204.uc.js';
import '../mobilesiteos/gmap3/v600.uc.js';
import { msos } from '../mobilesiteos_es6/msos/base.uc.es6';

// Make msos available globally
window.msos = msos;

msos.console.info('config -> start, (/mobilesiteos_es6/config.js file).');
msos.console.time('config');

// Set specific config flags (w/ boolean)
msos.site_specific({ run_onerror: true, run_ads: true, run_size: true });

// Set the url to the MobileSiteOS 'msos' folder
msos.base_script_url = msos.base_site_url + '/mobilesiteos/msos/';

if (msos.config.verbose) {
	msos.console.debug('config -> initial:', msos.config);
}


// --------------------------
// Google, AddThis Related Globals
// --------------------------
let _gaq = [],
    ___gcfg = {};


// Google Analytics
_gaq.push(['_setAccount', 'UA-24170958-1']);
_gaq.push(['_trackPageview']);
// Ref. 'msos.site.google_analytics' in site.uc.js -> site.min.js
msos.config.google.analytics_domain = 'opensitemobile.com';

// Add your Google Maps API key here.
msos.config.google.maps_api_key = 'AIzaSyAhvG_5h55iUW3fLREMTPxB6joCAexYQ2o';

// Add your Google Web Page Translator Widget ID here.
msos.config.google.translate_id = '7aa52b36fcd8fcb6-07fbdbdc6a976e62-g7261f6c2de6e277c-d';
msos.config.google.no_translate = {
	by_id: ['#marquee', '#header', '#footer', '#pyromane', '#locale', '#culture', '#calendar'],
	by_class: [],
	by_tag: ['code', 'u']
};
msos.config.google.hide_tooltip = {
	by_id: [],
	by_class: []
};

// Social website API access keys
msos.config.social = {
	google: '526338426431.apps.googleusercontent.com',
	facebook: '583738878406494',
	windows: '000000004C107945',
	instagram: '34e2fb9bd305446cb080d852597584e9',
	cloudmade: 'efca0172cf084708a66a6d48ae1046dd',
	foursquare: 'SFYWHRQ1LTUJEQWYQMHOCXYWNFNS0MKUCAGANTHLFUGJX02E'
};


// --------------------------
// Stylesheets to load (CSS injection)
// --------------------------

if (msos.config.debug_css) {

	msos.deferred_css = [
		msos.resource_url('fonts', 'css/fontawesome.uc.css'),
		msos.resource_url('css', 'normalize.uc.css'),
		msos.resource_url('css', 'msos.css'),
		msos.resource_url('css', 'msos_bs.css'),
		msos.resource_url('css', 'msos_theme.css'),
		msos.resource_url('demo', 'css/base.css')
	];

} else {

	msos.deferred_css = [
		msos.resource_url('fonts', 'css/fontawesome.min.css'),
		msos.resource_url('css', 'normalize.min.css'),
		msos.resource_url('css', 'msos.css'),
		msos.resource_url('css', 'msos_bs.css'),
		msos.resource_url('css', 'msos_theme.css'),
		msos.resource_url('demo', 'css/base.css')
	];

}


// --------------------------
// VisualEvent DOM3 Event Tracking
// --------------------------

// Add event debugging to "addEventListener", for DOM3 "VisualEvent"
if (msos.config.visualevent) {

	// Add event debugging to "addEventListener"
	Element.prototype.recorded_addEventListener = [];
	Element.prototype.org_addEventListener = Element.prototype.addEventListener;
	Element.prototype.addEventListener = function (a, b, c) {

		this.org_addEventListener(a, b, c);

		// Exclude jQuery added event, (we get them later)
		if (typeof jQuery._data(jQuery(this)[0], 'events') !== 'object') {
			this.recorded_addEventListener.push(
				{
					"type" : a,
					"func" : b.toString(),
					"removed": false,
					"source": 'DOM 3 event'
				}
			);
		}
	};
}


/*
 * Copyright (c) 2013 Mike King (@micjamking)
 *
 * jQuery Succinct plugin
 * Version 1.0.1 (July 2013)
 *
 * Licensed under the MIT License
 */
(function ($) {

	$.fn.succinct = function (opts) {

		let defaults = {
				size: 240,
				omission: '...',
				ignore: true
			},
			options = $.extend(defaults, opts);

		return this.each(function () {

			let textDefault,
				textTruncated,
				elements = $(this),
				regex    = /[!-\/:-@\[-`{-~]$/,
				truncate = function () {

					elements.each(function () {
						textDefault = $(this).text();
	
						if (textDefault.length > options.size) {
							textTruncated = $.trim(textDefault).
											substring(0, options.size).
											split(' ').
											slice(0, -1).
											join(' ');
	
							if (options.ignore) {
								textTruncated = textTruncated.replace( regex , '' );
							}
	
							$(this).text(textTruncated + options.omission);
						}
					});
				};

			// Now start...
			truncate();
		});
	};
}(jQuery));


/*!
 * FitText.js 1.1
 *
 * Copyright 2011, Dave Rupert http://daverupert.com
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 *
 * Date: Thu May 05 14:23:00 2011 -0600
 *
 * Modified for MobileSiteOS
 */
(function ($) {

	$.fn.fitText = function (compressor = 1, options) {

        // Setup options
        let settings = $.extend({
                'minFontSize': Number.NEGATIVE_INFINITY,
                'maxFontSize': Number.POSITIVE_INFINITY
            }, options);

        return this.each(
			function () {
				let $this = $(this);
				// Resizes items based on the object width divided by the compressor * 10
				$this.css('font-size', Math.max(Math.min($this.width() / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
			}
		);
	};

}(jQuery));

// Adjust branding display using above
msos.ondisplay_size_change.push(
	() => {

		let branding = jQuery('#branding');

		branding.hide();

		// Adjust branding for display size. (.8 is a compression factor for #branding)
		branding.fitText(0.8, { maxFontSize: branding.height() + 'px' });

		branding.fadeIn('slow');
	}
);

/*
	Use 'msos.site' to add site specific code for availability
	to many pages and apps.

	OpenSiteMobile MobileSiteOS site specific code:

	    Google Analytics,
	    AddThis,
	    other Social site calls, etc.
	
	Plus:

	    Auto-Load Modules - based on dom elements
*/

msos.site = {};

/*!
 * string_score.js: String Scoring Algorithm 0.1.20 
 *
 * http://joshaven.com/string_score
 * https://github.com/joshaven/string_score
 *
 * Copyright (C) 2009-2011 Joshaven Potter <yourtech@gmail.com>
 * 
 * Minimized and altered version for MobileSiteOS
*/
msos.site.likeness = (string, word) => {

	let temp_sl = 'msos.site.likeness -> ',
		i = 0,
        runningScore = 0,
        charScore,
        finalScore,
        lString = '',
        lWord = '',
        idxOf,
        startAt = 0;

	if (msos.config.verbose) {
		msos.console.debug(temp_sl + 'called, string: ' + string + ', word: ' + word);
	}

    if (string === word) { return 1; }

	if (msos.var_is_empty(string)) {
		msos.console.warn(temp_sl + 'called, string is empty!');
		return 0;
	}
    if (msos.var_is_empty(word)) {
		msos.console.warn(temp_sl + 'called, word is empty!');
		return 0;
	}

	lString = string.toLowerCase();
	lWord = word.toLowerCase();

    for (i = 0; i < word.length; i += 1) {

        idxOf = lString.indexOf(lWord[i], startAt);

        if (-1 === idxOf)		{ return 0; }

        if (startAt === idxOf)	{ charScore = 0.7; }
        else					{ charScore = 0.1; if (string[idxOf - 1] === ' ') { charScore += 0.8; } }

        if (string[idxOf] === word[i])  { charScore += 0.1; }

        runningScore += charScore;
        startAt = idxOf + 1;
    }

    // Reduce penalty for longer strings.
    finalScore = 0.5 * (runningScore / string.length + runningScore / word.length);

    if ((lWord[0] === lString[0]) && (finalScore < 0.85)) {
        finalScore += 0.15;
    }

    return finalScore;
};


// --------------------------
// Google Analytics Tracking Function
// --------------------------

msos.site.google_analytics = () => {

    // Set to your website or remove if/else statment
    if (document.domain === msos.config.google.analytics_domain) {

		let url = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js',
			ga_loader = new msos.loader();

		// Use our loader for better debugging
		ga_loader.load('google_analytics_api', url, 'js');

    } else {
		msos.console.warn('msos.site.google_analytics -> please update msos.config.google.analytics_domain in config.js!');
      }
};


// --------------------------
// Site Specific Code
// --------------------------

msos.site.auto_init = () => {

	let temp_ai = 'msos.site.auto_init -> ',
		cfg = msos.config,
		req = msos.require,
		bw_val = msos.config.storage.site_bdwd.value || '',
		bdwidth = bw_val ? parseInt(bw_val, 10) : 0;

	msos.console.debug(temp_ai + 'start.');

	// Run MobileSiteOS sizing (alt. would be: use media queries instead)
	if (cfg.run_size)		{ req("msos.size"); }

	// Add event debugging functions
    if (cfg.visualevent)	{ req("msos.visualevent"); }

    // If a mobile (touch) operating system
    if (cfg.mobile)			{ req("msos.mobile"); }

    // Add auto window.onerror alerting
    if (cfg.run_onerror)	{ req("msos.onerror"); }

	// Add debugging output (popup)
	if (cfg.debug_output)	{ req("msos.debug"); }

	// Add MSOS console output
	if (cfg.console)		{ req("msos.pyromane"); }

    // Based on page elements and configuration -> run functions or add modules
    if (cfg.run_ads && bdwidth > 150 && jQuery('#branding').length === 1) { req("msos.google.ad"); }

	// Or based on configuration settings
	if (cfg.run_analytics && bdwidth > 150)		{ msos.site.google_analytics(); }
	if (cfg.run_translate && bdwidth > 150)		{ req("msos.google.translate"); }

	// Bootstrap transitions: Always use this if "true"
	if (Modernizr.csstransitions)				{ req("bootstrap.transition"); }

	msos.console.debug(temp_ai + 'done!');
};

msos.site.css_load = () => {

    let temp_cl = 'msos.site.css_load -> ',
		css_loader = null,
		M = Modernizr,
		con_type = msos.config.connection.type;

	msos.console.debug(temp_cl + 'start.');

	// Skip altogether for slow internet connections
	if (con_type === 'slow' || con_type === '2g') {
		msos.console.debug(temp_cl + 'done, skip for slow connection!');
		return;
	}

	css_loader = new msos.loader();

    // Only load css3 if supported
	if (M.cssgradients) {
		css_loader.load(msos.resource_url('css', 'msos_gradient.css'));
    }
	if (M.csstransitions) {
		css_loader.load(msos.resource_url('css', 'msos_transition.css'));
    }
	if (M.cssanimations && M.csstransforms) {
		css_loader.load(msos.resource_url('css', 'msos_animation.css'));
    }

	msos.console.debug(temp_cl + 'done!');
};


// Load site specific css files
msos.css_loader(msos.deferred_css);

// Define and set the page 'app' to initialize
msos.onload_func_pre.push(
	() => {

		// Load the Page App
		msos.require("msos.page");

		// Load the #header and #footer html
		msos.template("demo.tmpl.header");
		msos.template("demo.tmpl.footer");

		// Define namespace for page content and header/footer templates
		msos.onload_func_post.push(
			() => {
				let app_config = {
						root: { base: '', group: 'demo', name: 'home' },	// is default page script location (ie: ./demo/home.js)
						header: demo.tmpl.header,
						footer: demo.tmpl.footer,
						template: 'tmpl'									// is template folder name (ie: ./demo/tmpl/home.html)
					};

				msos.page.initiate(app_config);

				// Mask the initial page building process (its ugly due lapse between header/footer and content)
				setTimeout(() => { jQuery('#body').css('visibility', 'visible'); }, 250);
			}
		);
	}
);

// Load site specific setup code
msos.onload_func_pre.push(msos.site.auto_init);

// Load additional CSS last, if supported
msos.onload_func_post.push(msos.site.css_load);

// Fix for ES6 timing issue (most likely due to traceur.js load and exec. duration)
// Near instananious page "document.ready()" call means the jQuery positioning code screws up.
msos.onload_func_start.push(
	() => {
		jQuery('#notify_container').position(
			{
				of: window,
				my: 'center top+60',
				at: 'center top',
				collision: 'none'
			}
		);
	}
);

msos.console.info('config -> done!');
msos.console.timeEnd('config');
