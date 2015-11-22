# MobileSiteOS ES6
This repository demo's our MobileSiteOS's 'base.js' and 'core.js' scripts as written in JavaScript ES6. With ES6, we can combine our previous standard build: consisting of 'site.js', 'base.js' and 'core.js', into one file. Using the import method to replace our none-blocking script loading code, we load all the required base files via the browser, ensuring they are ready before executing the code in our 'config.es6' file. As a result, only one configuration file is necessary now. Although the demo is slow to load, (given the size of the required 'traceur.js' file, and it's required time to execute), the overall demo experience is nearly identical to our ES5 scripts version, while being more compact. It is important to note that the ES6 specification does not allow for dynamic loading of JavaScript, so we continue to use our module loading code as before. Thus we have the best of both worlds, browser controlled base script loading with the complete ability to load additional code dynamically.
