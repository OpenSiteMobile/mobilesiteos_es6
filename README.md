# MobileSiteOS ES6
This repository demo's our MobileSiteOS's 'base.js' and 'core.js' scripts as written in JavaScript ES6. With ES6, we can combine our previous standard build: consisting of 'base.js' and 'core.js', into one file and 'config.js' and 'site.js' into one file.

Using the new ES6 import method to replace our none-blocking script loading code, we load all the required base files via the browser, ensuring they are ready before executing the code in our 'config.es6' file. As a result, only one configuration file is necessary to be called out to start the web application. Although the demo is slow to load, (given the size of the required 'traceur.js' file, and it's required time to execute), the overall demo experience is nearly identical to our ES5 scripts version, while being more compact.

It is important to note that the ES6 specification does not allow for dynamic loading of JavaScript, so we continue to use our module loading code as before. Thus we have the best of both worlds, browser controlled base script loading, with the complete ability to load additional code dynamically and programmatically.

The only notable problem we had using ES6 and "importing" code was a minor problem (difference) with the timing of jQuery-UI positioning of our msos.notify element. With ES6 importing, the document.ready() was calling jQuery-UI positioning at a different point in page rendering. The quick fix for now is to reposition the msos.notify element at a later point, which is what we did in the config.es6 file. Hard to say whether all or some of the problem is due to the loading and running of traceur.js, but I suspect it is at least somewhat contributing to the problem. Thus we employed the work-around.

## See the demo at http://opensitemobile.com/mobilesiteos_es6
