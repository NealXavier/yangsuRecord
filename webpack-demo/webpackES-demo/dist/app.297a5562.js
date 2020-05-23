/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\app.js: Identifier 'func' has already been declared (10:10)\\n\\n   8 | console.log('new Set(arrB)',new Set(arrB))\\n   9 | \\n> 10 | function* func(){}\\n     |           ^\\n  11 | \\n    at Parser._raise (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:742:17)\\n    at Parser.raiseWithData (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:735:17)\\n    at Parser.raise (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:729:17)\\n    at ScopeHandler.checkRedeclarationInScope (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:4781:12)\\n    at ScopeHandler.declareName (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:4747:12)\\n    at Parser.registerFunctionStatementId (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11849:16)\\n    at Parser.parseFunction (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11825:12)\\n    at Parser.parseFunctionStatement (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11450:17)\\n    at Parser.parseStatementContent (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11142:21)\\n    at Parser.parseStatement (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11104:17)\\n    at Parser.parseBlockOrModuleBlockBody (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11679:25)\\n    at Parser.parseBlockBody (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11665:10)\\n    at Parser.parseTopLevel (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11035:10)\\n    at Parser.parse (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12671:10)\\n    at parse (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12722:38)\\n    at parser (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\parser\\\\index.js:54:34)\\n    at parser.next (<anonymous>)\\n    at normalizeFile (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\transformation\\\\normalize-file.js:93:38)\\n    at normalizeFile.next (<anonymous>)\\n    at run (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\transformation\\\\index.js:31:50)\\n    at run.next (<anonymous>)\\n    at Function.transform (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\transform.js:27:41)\\n    at transform.next (<anonymous>)\\n    at step (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\gensync\\\\index.js:254:32)\\n    at gen.next (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\gensync\\\\index.js:266:13)\\n    at async.call.value (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\gensync\\\\index.js:216:11)\\n    at errback.call (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\gensync\\\\index.js:184:28)\\n    at runGenerator.errback (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\gensync-utils\\\\async.js:72:7)\\n    at val (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\gensync\\\\index.js:108:33)\\n    at step (E:\\\\yangsuRecord\\\\webpack-demo\\\\webpackES-demo\\\\node_modules\\\\gensync\\\\index.js:280:14)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAuanMuanMiLCJzb3VyY2VzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./app.js\n");

/***/ })

/******/ });