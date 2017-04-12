webpackHotUpdate(0,{

/***/ 150:
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./~/axios/lib/adapters/xhr.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./../utils */ 24);
var settle = __webpack_require__(/*! ./../core/settle */ 236);
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ 239);
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ 245);
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ 243);
var createError = __webpack_require__(/*! ../core/createError */ 153);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ 238);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ 241);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        if (request.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../process/browser.js */ 1)))

/***/ }),

/***/ 151:
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ./~/axios/lib/cancel/Cancel.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ 152:
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./~/axios/lib/cancel/isCancel.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 153:
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/axios/lib/core/createError.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ 235);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),

/***/ 154:
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./~/axios/lib/helpers/bind.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ 155:
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./src/functions/getRandomInt.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getRandomInt;
//get random integer between a range, but not 0
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var result = Math.floor(Math.random() * (max - min + 1)) + min;
    if (result === 0) {
        getRandomInt(min, max);
    } else return result;
}

/***/ }),

/***/ 191:
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./~/prop-types/index.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ 190)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(/*! ./factoryWithThrowingShims */ 468)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../process/browser.js */ 1)))

/***/ }),

/***/ 217:
/* exports provided: subscriptionShape, storeShape */
/* exports used: storeShape, subscriptionShape */
/*!*********************************************!*\
  !*** ./~/react-redux/es/utils/PropTypes.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(/*! prop-types */ 191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return subscriptionShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return storeShape; });


var subscriptionShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  trySubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  tryUnsubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  notifyNestedSubs: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  isSubscribed: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});

var storeShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  subscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  dispatch: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  getState: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});

/***/ }),

/***/ 229:
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./~/axios/index.js ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ 230);

/***/ }),

/***/ 230:
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./~/axios/lib/axios.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ 24);
var bind = __webpack_require__(/*! ./helpers/bind */ 154);
var Axios = __webpack_require__(/*! ./core/Axios */ 232);
var defaults = __webpack_require__(/*! ./defaults */ 98);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ 151);
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ 231);
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ 152);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ 246);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ 231:
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/axios/lib/cancel/CancelToken.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ 151);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ 232:
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ./~/axios/lib/core/Axios.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ 98);
var utils = __webpack_require__(/*! ./../utils */ 24);
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ 233);
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ 234);
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ 242);
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ 240);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ 233:
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/axios/lib/core/InterceptorManager.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 24);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ 234:
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/axios/lib/core/dispatchRequest.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 24);
var transformData = __webpack_require__(/*! ./transformData */ 237);
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ 152);
var defaults = __webpack_require__(/*! ../defaults */ 98);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ 235:
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/axios/lib/core/enhanceError.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),

/***/ 236:
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./~/axios/lib/core/settle.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ 153);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ }),

/***/ 237:
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/axios/lib/core/transformData.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 24);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ 238:
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./~/axios/lib/helpers/btoa.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ 239:
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/axios/lib/helpers/buildURL.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 24);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ 24:
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./~/axios/lib/utils.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ 154);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  typeof document.createElement -> undefined
 */
function isStandardBrowserEnv() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ 240:
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/axios/lib/helpers/combineURLs.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};


/***/ }),

/***/ 241:
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./~/axios/lib/helpers/cookies.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 24);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ 242:
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/axios/lib/helpers/isAbsoluteURL.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ 243:
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/axios/lib/helpers/isURLSameOrigin.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 24);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ 244:
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/axios/lib/helpers/normalizeHeaderName.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ 24);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ 245:
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/axios/lib/helpers/parseHeaders.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 24);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),

/***/ 246:
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./~/axios/lib/helpers/spread.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ 247:
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./src/actions/actionIndex.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getGameHighestScore = exports.newPlayerRegistration = undefined;

var _axios = __webpack_require__(/*! axios */ 229);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SERVER = 'http://localhost:8080/';

var newPlayerRegistration = exports.newPlayerRegistration = function newPlayerRegistration(newPlayer) {
    return function (dispatch) {
        _axios2.default.post('http://localhost:8080/users/', newPlayer).then(function (player) {
            dispatch({
                type: 'NEW_PLAYER_REGISTRATION',
                payload: player
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
};

var getGameHighestScore = exports.getGameHighestScore = function getGameHighestScore() {
    (function (dispatch) {
        _axios2.default.get('http://localhost:8080/highestScore/').then(function (data) {
            var gameHighestScore = data.result[0].highestScore;
            dispatch({
                type: 'UPDATE_GAME_HIGHEST_SCORE',
                playload: gameHighestScore
            });
        }).catch(function (e) {
            console.log(e);
        });
    });
};

/***/ }),

/***/ 248:
/* unknown exports provided */
/* all exports used */
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ 68);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ 191);

var _reactDom = __webpack_require__(/*! react-dom */ 97);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(/*! react-redux */ 216);

var _store = __webpack_require__(/*! ./store */ 156);

var _store2 = _interopRequireDefault(_store);

var _game_main = __webpack_require__(/*! ./game_main */ 249);

var _game_main2 = _interopRequireDefault(_game_main);

var _state = __webpack_require__(/*! ./states/state */ 78);

var _state2 = _interopRequireDefault(_state);

var _actionIndex = __webpack_require__(/*! ./actions/actionIndex */ 247);

var actions = _interopRequireWildcard(_actionIndex);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global fb*/

var SERVER = 'http://localhost:8080/';
var facebookLogIn = function facebookLogIn() {
    // This is called with the results from from FB.getLoginStatus().
    window.fbAsyncInit = function () {
        FB.init({
            appId: '113731382506643',
            cookie: true, // enable cookies to allow the server to access
            // the session
            xfbml: true, // parse social plugins on this page
            version: 'v2.8' });

        FB.getLoginStatus(function (response) {
            //statusChangeCallback(response);
            if (response.status === 'connected') {
                FB.api('/me', function (response) {
                    var signedInUserFacebookId = response.id;
                    playerSignin(signedInUserFacebookId);
                });
            }
        });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
};

var startGame = function startGame() {
    $('#signinScreen').css('display', 'none');
    $.ajax({
        url: SERVER + 'highestScore',
        type: 'GET',
        success: function success(data) {
            _state2.default.gameHighestScore = data.result[0].highestScore;
            //$('body').data('gameHighestScore', gameHighestScore);
            var game = new _game_main2.default();
        },
        error: function error(e) {
            console.log(e);
        }
    });
};

var playerSignin = function playerSignin(facebookId) {
    //this ajax call checks if this is a first time player
    $.ajax({
        url: SERVER + 'users/facebookId/' + facebookId,
        type: 'GET',
        success: function success(data) {
            if (data.length === 0) {
                var register = '';
                register += '<p>Please enter a screen name</p>';
                register += '<input id="inputScreenName" type="text" />';
                register += '<button id="js-submitScreenName" type="submit">submit</button>';
                $('#signinScreen').append(register);
                $('#js-submitScreenName').click(function () {
                    var newPlayer = {
                        facebookId: facebookId,
                        screenName: $('#inputScreenName').val()
                    };
                    $.ajax({
                        url: SERVER + 'users/',
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify(newPlayer),
                        success: function success(player) {
                            _state2.default.playerData = player;
                            console.log(2);
                            startGame();
                        },
                        error: function error(e) {
                            console.log(e);
                        }
                    });
                });
            } else {
                startGame();
            }
        },
        error: function error(e) {
            console.log(e);
        }
    });
};

var object = _propTypes.PropTypes.object,
    func = _propTypes.PropTypes.func;

var App = function (_PureComponent) {
    _inherits(App, _PureComponent);

    /*
    static PropTypes = {
        gameHighestScore: object,
        getGameHighestScore: func,
        newPlayerRegistration: func,
    };
     static defaultProps = {
        gameHighestScore: 0,
        playerData: {},
    };
     state = {
        playerData: {},
    };
    */

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.playAsAGuest = _this.playAsAGuest.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'startGame',
        value: function startGame() {
            $('#signinScreen').css('display', 'none');
            $.ajax({
                url: SERVER + 'highestScore',
                type: 'GET',
                success: function success(data) {
                    _state2.default.gameHighestScore = data.result[0].highestScore;
                    //$('body').data('gameHighestScore', gameHighestScore);
                    var game = new _game_main2.default();
                },
                error: function error(e) {
                    console.log(e);
                }
            });
        }
    }, {
        key: 'playAsAGuest',
        value: function playAsAGuest(event) {
            event.preventDefault();
            var guestPlayer = {
                highestScore: 0,
                screenName: 'Guest'
            };
            startGame();
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            facebookLogIn();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('input', {
                    type: 'submit',
                    value: 'play as a Guest',
                    onClick: this.playAsAGuest
                })
            );
        }
    }]);

    return App;
}(_react.PureComponent);
/*
export default connect(storeState => ({
    gameHighestScore: storeState.gameHighestScore,
    playerData: storeState.playerData,
}));
*/


exports.default = App;

/***/ }),

/***/ 249:
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./src/game_main.js ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(/*! pixi */ 147);

__webpack_require__(/*! p2 */ 148);

var _phaser = __webpack_require__(/*! phaser */ 42);

var _phaser2 = _interopRequireDefault(_phaser);

var _Boot = __webpack_require__(/*! ./states/Boot */ 253);

var _Boot2 = _interopRequireDefault(_Boot);

var _Splash = __webpack_require__(/*! ./states/Splash */ 256);

var _Splash2 = _interopRequireDefault(_Splash);

var _Game = __webpack_require__(/*! ./states/Game */ 254);

var _Game2 = _interopRequireDefault(_Game);

var _Gameover = __webpack_require__(/*! ./states/Gameover */ 255);

var _Gameover2 = _interopRequireDefault(_Gameover);

var _config = __webpack_require__(/*! ./config */ 77);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Phaser$Game) {
    _inherits(Game, _Phaser$Game);

    function Game() {
        _classCallCheck(this, Game);

        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, _config2.default.gameWidth, _config2.default.gameHeight, _phaser2.default.CANVAS, 'game', null));

        _this.state.add('Boot', _Boot2.default, false);
        _this.state.add('Splash', _Splash2.default, false);
        _this.state.add('Game', _Game2.default, false);
        _this.state.add('Gameover', _Gameover2.default, false);

        _this.state.start('Boot');
        return _this;
    }

    return Game;
}(_phaser2.default.Game);

//window.game = new Game();


exports.default = Game;

/***/ }),

/***/ 251:
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./src/sprites/player.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 42);

var _phaser2 = _interopRequireDefault(_phaser);

var _config = __webpack_require__(/*! ../config */ 77);

var _config2 = _interopRequireDefault(_config);

var _state = __webpack_require__(/*! ../states/state */ 78);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//console.log(19, state);

var Player = function (_Phaser$Sprite) {
    _inherits(Player, _Phaser$Sprite);

    function Player(_ref) {
        var game = _ref.game,
            x = _ref.x,
            y = _ref.y,
            asset = _ref.asset;

        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, x, y, asset));

        _this.game = game;
        _this.anchor.setTo(0, 0);
        game.physics.arcade.enable(_this);
        _this.body.gravity.y = 980;
        _this.body.collideWorldBounds = false;
        _this.body.bounce.y = 0.1;

        _this.animations.add('run', [5, 6, 7, 8], 6, true);
        _this.animations.play('run');

        _this.speed = 1;
        game.input.onUp.add(function () {
            //this.body.velocity.y = -400 / Math.sqrt(this.speed);
            _this.body.velocity.y = -400 + _state2.default.speed;
        });

        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

        var startSpeechRecognition = function startSpeechRecognition() {
            var speechRecognizer = new SpeechRecognition();
            speechRecognizer.start();
            speechRecognizer.onresult = function (event) {
                var transcript = event.results[0][0].transcript;
                if (transcript === 'jump') {
                    console.log(1, transcript);
                }
                _this.body.velocity.y = -400;
                speechRecognizer.stop();
            };
            speechRecognizer.onspeechend = function () {
                //console.log('say some more');
                startSpeechRecognition();
            };
            speechRecognizer.onerror = function (event) {
                //console.log(400, 'error!!');
                startSpeechRecognition();
            };
        };

        if ('webkitSpeechRecognition' in window) {
            startSpeechRecognition();
        } else {
            alert('Your browser is not supported. If you are using google chrome, please upgrade!');
        }
        return _this;
    }

    _createClass(Player, [{
        key: 'update',
        value: function update() {
            this.speed = $('body').data('speed');
        }
    }]);

    return Player;
}(_phaser2.default.Sprite);

exports.default = Player;

/***/ }),

/***/ 252:
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./src/sprites/staticAsset.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 42);

var _phaser2 = _interopRequireDefault(_phaser);

var _getRandomInt = __webpack_require__(/*! ../functions/getRandomInt */ 155);

var _getRandomInt2 = _interopRequireDefault(_getRandomInt);

var _config = __webpack_require__(/*! ../config */ 77);

var _config2 = _interopRequireDefault(_config);

var _state = __webpack_require__(/*! ../states/state */ 78);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//const gameData = $('body').data();

var StaticAsset = function (_Phaser$Sprite) {
    _inherits(StaticAsset, _Phaser$Sprite);

    function StaticAsset(_ref) {
        var game = _ref.game,
            x = _ref.x,
            y = _ref.y,
            asset = _ref.asset;

        _classCallCheck(this, StaticAsset);

        var _this = _possibleConstructorReturn(this, (StaticAsset.__proto__ || Object.getPrototypeOf(StaticAsset)).call(this, game, x, y, asset));

        _this.anchor.setTo(0, 0);
        _this.enableBody = true;
        _this.game.physics.arcade.enable(_this);
        _this.body.immovable = true;
        //this.speed = state.speed;
        return _this;
    }

    _createClass(StaticAsset, [{
        key: 'update',
        value: function update() {
            //this.speed = $('body').data('speed');
            this.position.x -= 0.3 + _state2.default.speed;
            //this.position.x -= 1.54;

            if (this.position.x < -300) {
                this.kill();
            }
        }
    }]);

    return StaticAsset;
}(_phaser2.default.Sprite);

exports.default = StaticAsset;

/***/ }),

/***/ 253:
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./src/states/Boot.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 42);

var _phaser2 = _interopRequireDefault(_phaser);

var _webfontloader = __webpack_require__(/*! webfontloader */ 149);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

var _textButton = __webpack_require__(/*! ../sprites/textButton */ 99);

var _textButton2 = _interopRequireDefault(_textButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BootState = function (_Phaser$State) {
  _inherits(BootState, _Phaser$State);

  function BootState() {
    _classCallCheck(this, BootState);

    return _possibleConstructorReturn(this, (BootState.__proto__ || Object.getPrototypeOf(BootState)).apply(this, arguments));
  }

  _createClass(BootState, [{
    key: 'init',
    value: function init() {
      this.stage.backgroundColor = '#ddd';
      this.fontsReady = false;
      this.fontsLoaded = this.fontsLoaded.bind(this);
    }
  }, {
    key: 'preload',
    value: function preload() {
      _webfontloader2.default.load({
        google: {
          families: ['Bangers']
        },
        active: this.fontsLoaded
      });

      var text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' });
      text.anchor.setTo(0.5, 0.5);

      this.load.image('loaderBg', './assets/images/loader-bg.png');
      this.load.image('loaderBar', './assets/images/loader-bar.png');
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.fontsReady) {
        this.state.start('Splash');
      }
    }
  }, {
    key: 'fontsLoaded',
    value: function fontsLoaded() {
      this.fontsReady = true;
    }
  }]);

  return BootState;
}(_phaser2.default.State);

exports.default = BootState;

/***/ }),

/***/ 254:
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./src/states/Game.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 42);

var _phaser2 = _interopRequireDefault(_phaser);

var _staticAsset = __webpack_require__(/*! ../sprites/staticAsset */ 252);

var _staticAsset2 = _interopRequireDefault(_staticAsset);

var _player = __webpack_require__(/*! ../sprites/player */ 251);

var _player2 = _interopRequireDefault(_player);

var _config = __webpack_require__(/*! ../config */ 77);

var _config2 = _interopRequireDefault(_config);

var _getRandomInt = __webpack_require__(/*! ../functions/getRandomInt */ 155);

var _getRandomInt2 = _interopRequireDefault(_getRandomInt);

var _state = __webpack_require__(/*! ./state */ 78);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


var HEIGHT = _config2.default.gameHeight;
var WIDTH = _config2.default.gameWidth;

/*
const playerHighestScore = gameData.gameHighestScore !== null
  ? gameData.gamHighestScore
  : 0;
*/
//console.log(40, gameData.gameHighestScore);

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.speed = _state2.default.speed;

      //initial physics in world
      this.physics.startSystem(_phaser2.default.Physics.ARCADE);

      //initialize properties for generating ledges
      var ledgeXPosition = 50;
      var ledgeYPosition = HEIGHT / 2;
      var ledgeIndex = 0;
      var neighbourLedgeHeightDifference = 50;

      //generate ledge and add it to ledge group
      this.generateLedges = function () {
        console.log('ledge', ledgeIndex, ' ', ledgeXPosition, ', ', JSON.stringify(ledgeYPosition));
        _this2.ledge = new _staticAsset2.default({
          game: _this2,
          x: ledgeXPosition,
          y: ledgeYPosition,
          asset: 'platform'
        });
        _this2.add.existing(_this2.ledge);
        _this2.ledge.body.checkCollision.down = false;
        _this2.ledge.body.checkCollision.left = false;
        _this2.ledges.add(_this2.ledge);
        ledgeIndex++;
        //get position for the next ledge to be generated.
        //if positionY is too high then go lower.
        //if positionY is too low then go higher.

        if (ledgeIndex <= 3) {
          ledgeXPosition = ledgeXPosition + 295;
          _this2.ledge.scale.setTo(0.65, 0.9);
        } else {
          ledgeXPosition = WIDTH + 150;
          _this2.ledge.scale.setTo(0.5, 0.9);
        }

        if (ledgeYPosition < HEIGHT - 100 && ledgeYPosition > 100) {
          ledgeYPosition = ledgeYPosition + (0, _getRandomInt2.default)(-neighbourLedgeHeightDifference, neighbourLedgeHeightDifference);
        } else if (ledgeYPosition > HEIGHT - 100) {
          ledgeYPosition = ledgeYPosition + (0, _getRandomInt2.default)(-neighbourLedgeHeightDifference, 0);
        } else {
          ledgeYPosition = ledgeYPosition + (0, _getRandomInt2.default)(0, neighbourLedgeHeightDifference);
        }
      };
    }
  }, {
    key: 'preload',
    value: function preload() {}
  }, {
    key: 'create',
    value: function create() {
      var _this3 = this;

      //create ledge group
      this.ledges = this.add.group();
      this.physics.arcade.enable(this.ledges);
      this.ledges.enableBody = true;

      //generate initial ledges
      for (var i = 0; i <= 3; i++) {
        this.generateLedges();
      }

      //set the rate to generate ledges
      //and generate ledges
      this.ledgeGenerationRate = 1;
      this.game.time.events.loop(_phaser2.default.Timer.SECOND * (2.5 - this.ledgeGenerationRate), function () {
        _state2.default.speed = Number((_state2.default.speed * 1.01).toFixed(3));
        _this3.generateLedges();
      });

      //create player
      this.player = new _player2.default({
        game: this.game,
        x: 150,
        y: 30,
        asset: 'dude'
      });
      this.add.existing(this.player);

      //create score
      this.score = this.game.add.text(WIDTH / 2, 30, 'score: 0', {
        font: '32px',
        fill: 'black'
      });
      this.timer = 0;

      this.game.time.events.loop(_phaser2.default.Timer.SECOND * 1, function () {
        _this3.timer += 100;
        _this3.score.text = 'score: ' + _this3.timer;
        //this.stateb = state.b;
        //console.log(300, this.stateb);
        //$('body').data('speed', this.speed);
        //console.log(20, $('body').data());
      });
    }
  }, {
    key: 'update',
    value: function update() {
      this.physics.arcade.collide(this.player, this.ledges);
      this.ledgeGenerationRate += 0.00213;

      //game over if player falls out of bottom of screen
      if (this.player.position.y > HEIGHT + 250) {
        //check score
        if (this.timer > _state2.default.gameHighestScore) {
          var SERVER = 'http://localhost:8080/';
          $.ajax({
            url: SERVER + 'highestScore'
          });
        }
        //go to game over stage
        this.state.start('Gameover');
      }
    }
  }, {
    key: 'render',
    value: function render() {}
  }]);

  return GameState;
}(_phaser2.default.State);

exports.default = GameState;

/***/ }),

/***/ 255:
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./src/states/Gameover.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 42);

var _phaser2 = _interopRequireDefault(_phaser);

var _textButton = __webpack_require__(/*! ../sprites/textButton */ 99);

var _textButton2 = _interopRequireDefault(_textButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameoverState = function (_Phaser$State) {
  _inherits(GameoverState, _Phaser$State);

  function GameoverState() {
    _classCallCheck(this, GameoverState);

    return _possibleConstructorReturn(this, (GameoverState.__proto__ || Object.getPrototypeOf(GameoverState)).apply(this, arguments));
  }

  _createClass(GameoverState, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'preload',
    value: function preload() {}
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.start = new _textButton2.default({
        game: this.game,
        x: this.game.world.centerX,
        y: this.game.world.centerY,
        asset: 'button'
      });

      this.add.existing(this.start);

      this.start.onInputDown.add(function () {
        _this2.state.start('Game');
      });
    }
  }]);

  return GameoverState;
}(_phaser2.default.State);

exports.default = GameoverState;

/***/ }),

/***/ 256:
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./src/states/Splash.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 42);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../utils */ 257);

var _textButton = __webpack_require__(/*! ../sprites/textButton */ 99);

var _textButton2 = _interopRequireDefault(_textButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplashState = function (_Phaser$State) {
  _inherits(SplashState, _Phaser$State);

  function SplashState() {
    _classCallCheck(this, SplashState);

    return _possibleConstructorReturn(this, (SplashState.__proto__ || Object.getPrototypeOf(SplashState)).apply(this, arguments));
  }

  _createClass(SplashState, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'preload',
    value: function preload() {
      //this.load.setPreloadSprite(this.loaderBar);
      this.load.image('sky', 'assets/images/sky.png');
      this.load.image('star', 'assets/images/star.png');
      this.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
      this.load.image('mushroom', 'assets/images/mushroom2.png');
      this.load.image('platform', 'assets/images/platform.png');
      this.load.image('button', 'assets/images/button.png', 40, 10, 3);
    }
  }, {
    key: 'create',
    value: function create() {
      this.start = new _textButton2.default({
        game: this.game,
        x: this.game.world.centerX,
        y: this.game.world.centerY,
        label: 'play',
        asset: 'button',
        style: {
          font: '64px',
          fill: 'white'
        }
      });
      this.start.scale.setTo(0.7, 0.7);
      this.add.existing(this.start);
      this.start.onInputDown.add(function () {
        //this.state.start('Game');
      });
      this.state.start('Game');
    }
  }]);

  return SplashState;
}(_phaser2.default.State);

exports.default = SplashState;

/***/ }),

/***/ 257:
/* unknown exports provided */
/* all exports used */
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var centerGameObjects = exports.centerGameObjects = function centerGameObjects(objects) {
    objects.forEach(function (object) {
        object.anchor.setTo(0.5);
    });
};

/***/ }),

/***/ 539:
/* exports provided: default */
/* exports used: default */
/*!*************************************************!*\
  !*** ./~/react-redux/es/components/Provider.js ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__ = __webpack_require__(/*! ../utils/PropTypes */ 217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_warning__ = __webpack_require__(/*! ../utils/warning */ 143);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Provider; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_warning__["a" /* default */])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

var Provider = function (_Component) {
  _inherits(Provider, _Component);

  Provider.prototype.getChildContext = function getChildContext() {
    return { store: this.store, storeSubscription: null };
  };

  function Provider(props, context) {
    _classCallCheck(this, Provider);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.store = props.store;
    return _this;
  }

  Provider.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react__["Children"].only(this.props.children);
  };

  return Provider;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);




if (process.env.NODE_ENV !== 'production') {
  Provider.prototype.componentWillReceiveProps = function (nextProps) {
    var store = this.store;
    var nextStore = nextProps.store;


    if (store !== nextStore) {
      warnAboutReceivingStore();
    }
  };
}

Provider.propTypes = {
  store: __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["a" /* storeShape */].isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element.isRequired
};
Provider.childContextTypes = {
  store: __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["a" /* storeShape */].isRequired,
  storeSubscription: __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["b" /* subscriptionShape */]
};
Provider.displayName = 'Provider';
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../../../process/browser.js */ 1)))

/***/ }),

/***/ 77:
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var maxWidth = 760;
var maxHeight = 414;
var docElement = document.documentElement;
var width = docElement.clientWidth > maxWidth ? maxWidth : docElement.clientWidth;
var height = docElement.clientHeight > maxHeight ? maxHeight : docElement.clientHeight;

exports.default = {
    gameWidth: width,
    gameHeight: height,
    localStorageName: 'phaseres6webpack'
};

/***/ }),

/***/ 78:
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./src/states/state.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    gameHighestScore: 1,
    playerData: {},
    speed: 1
};

/***/ }),

/***/ 98:
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./~/axios/lib/defaults.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ 24);
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ 244);

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ 150);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ 150);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../process/browser.js */ 1)))

/***/ }),

/***/ 99:
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ./src/sprites/textButton.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextButton = function (_Phaser$Button) {
    _inherits(TextButton, _Phaser$Button);

    function TextButton(_ref) {
        var game = _ref.game,
            x = _ref.x,
            y = _ref.y,
            asset = _ref.asset,
            callback = _ref.callback,
            callbackContext = _ref.callbackContext,
            overFrame = _ref.overFrame,
            outFrame = _ref.outFrame,
            downFrame = _ref.downFrame,
            upFrame = _ref.upFrame,
            label = _ref.label,
            style = _ref.style;

        _classCallCheck(this, TextButton);

        var _this = _possibleConstructorReturn(this, (TextButton.__proto__ || Object.getPrototypeOf(TextButton)).call(this, game, x, y, asset, callback, callbackContext, overFrame, outFrame, downFrame, upFrame));

        _this.anchor.setTo(0.5);

        _this.label = label;
        _this.style = style;
        _this.text = new Phaser.Text(_this.game, 0, 0, _this.label, _this.style);
        _this.text.anchor.setTo(0.5);

        _this.addChild(_this.text);
        return _this;
    }

    return TextButton;
}(Phaser.Button);

exports.default = TextButton;

/***/ })

})
//# sourceMappingURL=0.5b74672c45abc3885f68.hot-update.js.map