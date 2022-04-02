/**
 * Dom
 * Version: 0.2.13
 * Author: Dmitry Shimkin <dmitryshimkin@gmail.com>
 * License: MIT
 * https://github.com/dmitryshimkin/Dom
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Dom = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * TBD
 * @param   {Array}    arr
 * @param   {Function} fn
 * @param   {Object}   [thisArg]
 * @returns {Array}
 */

function each (arr, fn, thisArg) {
  for (var i = 0, len = arr.length; i < len; i++) {
    fn.call(thisArg, arr[i], i);
  }
}

module.exports = each;

},{}],2:[function(require,module,exports){
'use strict';

/**
 * Determines whether a string ends with the characters of another string,
 * returning true or false as appropriate.
 * @param {String} subjectStr
 * @param {String} searchStr
 * @returns {Boolean}
 */

function endsWith (subjectStr, searchStr) {
  var position = subjectStr.length - searchStr.length;
  var lastIndex = subjectStr.indexOf(searchStr, position);
  return lastIndex !== -1 && lastIndex === position;
}

module.exports = endsWith;

},{}],3:[function(require,module,exports){
'use strict';

/**
 * Returns `false` if passed object has at least one own property and `true` otherwise.
 * @param   {Object}  obj
 * @returns {Boolean}
 */

function hasOwnProps (obj) {
  'use strict';

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
}

module.exports = hasOwnProps;

},{}],4:[function(require,module,exports){
'use strict';

/**
 * Returns `true` if given argument is array.
 * Returns `false` otherwise.
 * @param   {*} arg
 * @returns {Boolean}
 */

function isArray (arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
}

if (typeof Array.isArray === 'function') {
  module.exports = Array.isArray;
} else {
  module.exports = isArray;
}

},{}],5:[function(require,module,exports){
'use strict';

/**
 * Returns `true` if a given argument is a function, false otherwise.
 * @param   {*} arg
 * @returns {Boolean}
 */

function isFunction (arg) {
  return typeof arg === 'function';
}

module.exports = isFunction;

},{}],6:[function(require,module,exports){
'use strict';

/**
 * Returns `true` if a given argument is an object, false otherwise.
 * @param   {*} arg
 * @returns {Boolean}
 */

function isObject (arg) {
  return typeof arg === 'object' && arg !== null;
}

module.exports = isObject;

},{}],7:[function(require,module,exports){
'use strict';

var elem = document.createElement('input');

function getMatchesImplementation (elem) {
  var vendors = [
    'oMatchesSelector',
    'msMatchesSelector',
    'mozMatchesSelector',
    'webkitMatchesSelector',
    'matches'
  ];

  var i = vendors.length;
  while (i--) {
    if (typeof elem[vendors[i]] === 'function') {
      return vendors[i];
    }
  }

  return false;
}

function isFunction (arg) {
  return typeof arg === 'function';
}

function isObject (arg) {
  return arg !== null && typeof arg === 'object';
}

module.exports = {
  ADD_EVENT_LISTENER: isFunction(elem.addEventListener),
  ATTACH_EVENT: isFunction(elem.attachEvent) || isObject(elem.attachEvent),
  CLASS_LIST: ('classList' in elem),
  CONTAINS: isFunction(elem.contains),
  EVENT_ONINPUT: isFunction(elem.oninput),
  EVENT_ONPROPERTYCHANGE: isFunction(elem.onpropertychange),
  MATCHES_SELECTOR: getMatchesImplementation(elem)
};

},{}],8:[function(require,module,exports){
'use strict';

var Core = require('./core/core');
var supports = require('supports2');
var endsWith = require('lang2/src/endsWith');

/* istanbul ignore next */
if (!supports.CLASS_LIST) {
  Core= require('./core/core-legacy');
}

var addClass = Core.addClass;
var containsClass = Core.containsClass;
var getAll = Core.getAll;
var removeClass = Core.removeClass;

/**
 * TBD
 * @param {Element|Array|HTMLCollection|NodeList} elem
 * @param {String} suffix
 * @returns {Dom.Class}
 * @public
 */

function addSuffix (elem, suffix) {
  var separator = module.exports.SUFFIX_SEPARATOR;

  var i;
  var l;

  // List of elements
  if (typeof elem.length === 'number') {
    i = elem.length;
    while (i--) {
      if (elem[i]) {
        addSuffix(elem[i], suffix);
      }
    }
    return this;
  }

  var classes = getAll(elem);
  var className;

  suffix = separator + suffix;

  for (i = 0, l = classes.length; i < l; i++) {
    className = classes[i];
    if (!endsWith(className, suffix)) {
      addClass(elem, className + suffix);
    }
  }

  return this;
}

/**
 * TBD
 * @param {Element|Array|HTMLCollection|NodeList} elem
 * @param {String} suffix
 * @returns {Dom.Class}
 * @public
 */

function removeSuffix (elem, suffix) {
  var separator = module.exports.SUFFIX_SEPARATOR;

  var i;
  var l;

  // List of elements
  if (typeof elem.length === 'number') {
    i = elem.length;
    while (i--) {
      if (elem[i]) {
        removeSuffix(elem[i], suffix);
      }
    }
    return this;
  }

  var classes = getAll(elem);
  var className;

  suffix = separator + suffix;

  for (i = 0, l = classes.length; i < l; i++) {
    className = classes[i];
    if (endsWith(className, suffix)) {
      removeClass(elem, className);
    }
  }

  return this;
}

/**
 * TBD
 * @param {Element|Array|HTMLCollection|NodeList} elem
 * @param {String} className
 * @param {Boolean} [condition]
 * @returns {Dom.Class}
 * @public
 */

function toggleClass (elem, className, condition) {
  // List of elements
  if (typeof elem.length === 'number') {
    var i = elem.length;
    while (i--) {
      if (elem[i]) {
        toggleClass(elem[i], className, condition);
      }
    }
    return this;
  }

  // Condition
  if (condition !== void 0) {
    if (condition) {
      addClass(elem, className);
    } else {
      removeClass(elem, className);
    }
    return this;
  }

  // No condition
  if (containsClass(elem, className)) {
    removeClass(elem, className);
  } else {
    addClass(elem, className);
  }

  return this;
}

// Public API
module.exports = {
  add: addClass,
  addSuffix: addSuffix,
  contains: containsClass,
  getAll: getAll,
  remove: removeClass,
  removeSuffix: removeSuffix,
  toggle: toggleClass
};

module.exports.SUFFIX_SEPARATOR = '_';

},{"./core/core":10,"./core/core-legacy":9,"lang2/src/endsWith":2,"supports2":7}],9:[function(require,module,exports){
'use strict';

var RE_SPACE = /^\s|\s$/;

/**
 * TBD
 * @param {Element} elem
 * @param {String} className
 * @public
 */

function addClass (elem, className) {
  var i;
  var l;

  // List of elements
  if (typeof elem.length === 'number') {
    i = elem.length;
    while (i--) {
      if (elem[i]) {
        addClass(elem[i], className);
      }
    }
    return this;
  }

  // Not element
  if (elem.className === void 0) {
    return this;
  }

  // Empty className
  if (elem.className === '') {
    elem.className = className;
    return this;
  }

  // Multiple classes
  if (className.indexOf(' ') !== -1) {
    var classNames = className.split(' ');
    for (i = 0, l = classNames.length; i < l; i++) {
      addClass(elem, classNames[i]);
    }
    return this;
  }

  // Already has this class
  if (containsClass(elem, className)) {
    return this;
  }

  elem.className = elem.className + ' ' + className;

  return this;
}

/**
 * TBD
 * @param {Element} elem
 * @param {String} className
 * @public
 */

function containsClass (elem, className) {
  if (className !== '' && elem.className) {
    var reg = new RegExp('(^|\\s)' + className + '($|\\s)');
    return elem.className.search(reg) !== -1;
  } else {
    return false;
  }
}

/**
 * TBD
 * @param {Element} elem
 * @returns {Array}
 * @public
 */

function getAll (elem) {
  var result = [];
  var all = elem.className.split(' ');

  for (var i = 0, l = all.length; i < l; i++) {
    if (all[i] !== '') {
      result.push(all[i]);
    }
  }

  return result;
}

/**
 * TBD
 * @param {Element} elem
 * @param {String} className
 * @public
 */

function removeClass (elem, className) {
  var i;
  var l;

  // List of elements
  if (typeof elem.length === 'number') {
    i = elem.length;
    while (i--) {
      if (elem[i]) {
        removeClass(elem[i], className);
      }
    }
    return this;
  }

  // Not element
  if (elem.className === void 0 || elem.className === '') {
    return this;
  }

  // Multiple classes
  if (className.indexOf(' ') !== -1) {
    var classNames = className.split(' ');
    for (i = 0, l = classNames.length; i < l; i++) {
      removeClass(elem, classNames[i]);
    }
    return this;
  }

  var re = new RegExp('(^|\\s)' + className + '($|\\s)');

  elem.className = elem.className
    .replace(re, ' ')
    .replace(RE_SPACE, '');

  return this;
}

// Public API
module.exports = {
  addClass: addClass,
  containsClass: containsClass,
  getAll: getAll,
  removeClass: removeClass
};

},{}],10:[function(require,module,exports){
'use strict';

/**
 * TBD
 * @param {Element|Array|HTMLCollection|NodeList} elem
 * @param {String} className
 * @returns {Dom.Class}
 * @public
 */

function addClass (elem, className) {
  var i;
  var l;

  // Multiple class names
  if (className.indexOf(' ') !== -1) {
    var classNames = className.split(' ');
    for (i = 0, l = classNames.length; i < l; i++) {
      addClass(elem, classNames[i]);
    }
    return this;
  }

  // List of elements
  if (typeof elem.length === 'number') {
    i = elem.length;
    while (i--) {
      if (elem[i] && elem[i].classList) {
        elem[i].classList.add(className);
      }
    }
    return this;
  }

  // Not element
  if (!elem.classList) {
    return this;
  }

  // Single element
  elem.classList.add(className);

  return this;
}

/**
 * TBD
 * @param {Element} elem
 * @param {String} className
 * @returns {Boolean}
 * @public
 */

function containsClass (elem, className) {
  if (className === '') {
    return false;
  } else {
    return elem.classList.contains(className);
  }
}

/**
 * TBD
 * @param {Element} elem
 * @returns {Array}
 * @public
 */

function getAll (elem) {
  return Array.prototype.slice.call(elem.classList);
}

/**
 * TBD
 * @param {Element|Array|HTMLCollection|NodeList} elem
 * @param {String} className
 * @returns {Dom.Class}
 * @public
 */

function removeClass (elem, className) {
  var i;
  var l;

  // Multiple class names
  if (className.indexOf(' ') !== -1) {
    var classNames = className.split(' ');
    for (i = 0, l = classNames.length; i < l; i++) {
      removeClass(elem, classNames[i]);
    }
    return this;
  }

  // List of elements
  if (typeof elem.length === 'number') {
    i = elem.length;
    while (i--) {
      if (elem[i] && elem[i].classList) {
        elem[i].classList.remove(className);
      }
    }
    return this;
  }

  // Not element
  if (!elem.classList) {
    return this;
  }

  // Single element
  elem.classList.remove(className);

  return this;
}

// Public API
module.exports = {
  addClass: addClass,
  containsClass: containsClass,
  getAll: getAll,
  removeClass: removeClass
};

},{}],11:[function(require,module,exports){
'use strict';

module.exports = require('./class');

},{"./class":8}],12:[function(require,module,exports){
'use strict';

var matches = require('./matches');

/**
 * @param {Element} elem
 * @param {String} selector
 * @returns {Element|Null}
 * @public
 */

module.exports = function closest (elem, selector) {
  'use strict';

  if (matches(elem, selector)) {
    return elem;
  }

  while (elem = elem.parentNode) {
    if (elem !== document && matches(elem, selector)) {
      return elem;
    }
  }

  return null;
};

},{"./matches":23}],13:[function(require,module,exports){
'use strict';

/**
 * TBD
 * @param   {Element} parent
 * @param   {Element} child
 * @returns {Boolean}
 * @public
 */

module.exports = function contains (parent, child) {
  'use strict';
  /* istanbul ignore else */
  if (parent.contains) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Node.contains
    return parent.contains(child);
  } else {
    // http://ejohn.org/blog/comparing-document-position/
    // https://developer.mozilla.org/en-US/docs/Web/API/Node.compareDocumentPosition
    return !!(parent.compareDocumentPosition(child) & 16);
  }
};

},{}],14:[function(require,module,exports){
'use strict';

var remove = require('./remove');

module.exports = {
  remove: remove
};

},{"./remove":15}],15:[function(require,module,exports){
'use strict';

var each = require('lang2/src/each');
var isArray = require('lang2/src/isArray');

var trashBin = document.createElement('div');

/**
 * Clears the content of the trash bin element
 * @private
 */

function cleanUp () {
  trashBin.innerHTML = '';
}

/**
 * Removes given elements from their parents
 * @param {Element[]} elems
 * @public
 */

function removeElements (elems) {
  if (!isArray(elems)) {
    elems = [elems];
  }

  each(elems, function iterateElementsToRemove (elem) {
    trashBin.appendChild(elem);
  });

  cleanUp();
}

module.exports = removeElements;

},{"lang2/src/each":1,"lang2/src/isArray":4}],16:[function(require,module,exports){
'use strict';

var closest = require('../closest');
var hasOwnProps = require('lang2/src/hasOwnProps');
var isFunction = require('lang2/src/isFunction');
var isObject = require('lang2/src/isObject');
var supports = require('supports2');

var entries = {};
var uids = 0;
var wrappers = [];
var needWrapper = !supports.ADD_EVENT_LISTENER;

// ================================================================
// Public methods
// ================================================================

/**
 * TBD
 * @param {Element|Array|HTMLCollection|NodeList} elem
 * @param {String} type
 * @param {String|Null} selector
 * @param {Function|Object} listener
 * @param {Object} [ctx]
 * @returns {Event}
 * @public
 */

function addEvent (elem, type, selector, listener, ctx) {
  var i;
  var l;

  // Parse arguments
  if (isFunction(selector) || isObject(selector)) {
    ctx = listener;
    listener = selector;
    selector = null;
  }

  // Multiple subscriptions
  if (isObject(type)) {
    ctx = listener;
    for (var key in type) {
      /* istanbul ignore else */
      if (type.hasOwnProperty(key)) {
        addEvent(elem, key, null, type[key], ctx);
      }
    }
    return this;
  }

  // Support handleEvent
  if (isObject(listener)) {
    if (typeof listener.handleEvent !== 'function') {
      return null;
    }
    ctx = listener;
    listener = listener.handleEvent;
  }

  // Multiple events
  if (type.indexOf(' ') !== -1) {
    type = type.split(' ');
    i = type.length;
    while (i--) {
      if (type[i] !== '') {
        addEvent(elem, type[i], selector, listener, ctx);
      }
    }
    return this;
  }

  // List of elements
  if (elem.length) {
    for (i = 0, l = elem.length; i < l; i++) {
      if (elem[i]) {
        addEvent(elem[i], type, selector, listener, ctx);
      }
    }
    return this;
  }

  var uid = getUid(elem, true);
  var entries = getElementEntries(uid);
  var handlers = entries[type];
  var listenerAdded = handlers !== void 0;

  if (!listenerAdded) {
    handlers = [];
    entries[type] = handlers;
  }

  handlers.push({
    selector: selector,
    fn: listener,
    ctx: ctx
  });

  var fn = needWrapper ? wrap(elem) : handleEvent;

  if (!listenerAdded) {
    if (supports.ADD_EVENT_LISTENER) {
      elem.addEventListener(type, fn, false);
    } else /* istanbul ignore else */ if (supports.ATTACH_EVENT) {
      elem.attachEvent('on' + type, fn);
    }
  }

  return this;
}

/**
 * TBD
 * @param {Element|Array|HTMLCollection|NodeList} elem
 * @param {String} type
 * @param {String|Null} selector
 * @param {Function|Object} listener
 * @param {Object} [ctx]
 * @returns {Event}
 * @public
 */

function removeEvent (elem, type, selector, listener, ctx) {
  var i;
  var l;

  // Parse arguments
  if (isFunction(selector) || isObject(selector)) {
    ctx = listener;
    listener = selector;
    selector = null;
  }

  // Multiple subscriptions
  if (isObject(type)) {
    ctx = listener;
    for (var key in type) {
      /* istanbul ignore else */
      if (type.hasOwnProperty(key)) {
        removeEvent(elem, key, null, type[key], ctx);
      }
    }
    return this;
  }

  // Support handleEvent
  if (isObject(listener)) {
    if (typeof listener.handleEvent !== 'function') {
      return null;
    }
    ctx = listener;
    listener = listener.handleEvent;
  }

  // Support multiple events
  if (type.indexOf(' ') !== -1) {
    type = type.split(' ');
    i = type.length;
    while (i--) {
      if (type[i] !== '') {
        removeEvent(elem, type[i], selector, listener, ctx);
      }
    }
    return this;
  }

  // List of elements
  if (elem.length) {
    for (i = 0, l = elem.length; i < l; i++) {
      if (elem[i]) {
        removeEvent(elem[i], type, selector, listener, ctx);
      }
    }
    return this;
  }

  var uid = getUid(elem, false);
  if (uid) {
    removeHandler(elem, uid, type, selector, listener, ctx);
  }

  return this;
}

// ================================================================
// Private methods
// ================================================================

/**
 * TBD
 * @private
 */

function getWrapper (elem) {
  var uid = elem.__uid__;
  var wrapper = wrappers[uid];

  wrapper.use = wrapper.use - 1;
  if (wrapper.use === 0) {
    delete wrappers[uid];
  }

  return wrapper.fn;
}

/**
 *  Returns element uid
 *  @param {HTMLElement} elem
 *  @param {Boolean} createIfNeeded
 *  @returns {String}
 *  @private
 */

function getUid (elem, createIfNeeded) {
  var uid = elem.__uid__;
  if (uid === void 0 && createIfNeeded) {
    uid = 'uid' + uids++;
    elem.__uid__ = uid;
  }
  return uid;
}

/**
 * Returns list of all handlers
 * for specified element and event type
 * @param {Element} elem
 * @param {String} type
 * @returns {Array}
 */

function getHandlers (elem, type) {
  var elemUid = elem.__uid__;
  /* istanbul ignore else */
  if (elemUid !== void 0) {
    var elemEntries = entries[elemUid];
    /* istanbul ignore else */
    if (elemEntries) {
      return elemEntries[type] || null;
    }
  }
  /* istanbul ignore next */
  return null;
}

/**
 * Returns entries for specified element
 * @param {String} uid
 * @returns {Object}
 */

function getElementEntries (uid) {
  var elemEntries = entries[uid];
  if (elemEntries === void 0) {
    elemEntries = {};
    entries[uid] = elemEntries;
  }
  return elemEntries;
}

/**
 * Main event handler
 * @param {Event} evt
 * @returns {*}
 * @private
 */

var handleEvent = function (evt) {
  evt = normalizeEvent(evt);

  var handlers = getHandlers(this, evt.type);
  var selector;
  var listener;
  var ctx;

  /* istanbul ignore if */
  if (!handlers) {
    if (window.DOM_DEBUG) {
      throw new Error('[wrong event call]');
    }
    return;
  }

  for (var i = 0, l = handlers.length; i < l; i++) {
    selector = handlers[i].selector;
    listener = handlers[i].fn;
    ctx = handlers[i].ctx || this;

    // Event delegation
    if (typeof selector === 'string') {
      if (closest(evt.target, selector) !== null) {
        callListener(listener, evt, ctx);
      }
      continue;
    }

    callListener(listener, evt, ctx);
  }
};

/**
 * Calls event listener
 * @param {Function} listener
 * @param {Event} evt
 * @param {Object} ctx
 */

function callListener (listener, evt, ctx) {
  try {
    listener.call(ctx, evt);
  } catch (err) {
    window.setTimeout(function throwErrorTimeout () {
      throw err;
    }, 0);
  }
}

/**
 * TBD
 * @param evt {Event}
 * @private
 */

function normalizeEvent (evt) {
  evt = evt || window.event;

  var hasDefaultPrevented = evt.defaultPrevented !== void 0;
  var hasPreventDefault = evt.preventDefault !== void 0;
  var hasReturnValue = 'returnValue' in evt;

  // Add support event target
  if (evt.target === void 0) {
    evt.target = evt.target || evt.srcElement;
  }

  // Add defaultPrevented support for old IE according to returnValue
  if (!hasDefaultPrevented) {
    if (hasPreventDefault) {
      evt.defaultPrevented = false;
    } else if (hasReturnValue) {
      evt.defaultPrevented = (evt.returnValue === false);
    }
  }

  // Add preventDefault support
  if (!hasPreventDefault || !hasDefaultPrevented) {
    if (!hasReturnValue) {
      evt.defaultPrevented = false;
    }
    evt._preventDefault = evt.preventDefault;
    evt.preventDefault = preventDefault;
  }

  // Add stopPropagation support
  if (evt.stopPropagation === void 0) {
    evt.stopPropagation = stopPropagation;
  }

  return evt;
}

/**
 * TBD
 * @private
 */

function preventDefault () {
  this.defaultPrevented = true;
  this.returnValue = false;

  // Call original preventDefault if exists
  if (isFunction(this._preventDefault)) {
    this._preventDefault();
  }
}

/**
 * TBD
 * @private
 */

function removeHandler (elem, uid, type, selector, fn, ctx) {
  var elemEntries = getElementEntries(uid);
  var handler;
  var index = -1;

  /* istanbul ignore if */
  if (!elemEntries) {
    return;
  }

  var handlers = elemEntries[type];

  /* istanbul ignore if */
  if (!handlers) {
    return;
  }

  // Find index of handler
  for (var i = 0, l = handlers.length; i < l; i++) {
    handler = handlers[i];
    if (handler.selector === selector &&
      handler.fn === fn &&
      handler.ctx === ctx) {
      index = i;
      break;
    }
  }

  if (index === -1) {
    return;
  }

  handlers.splice(index, 1);

  // Last handler removed
  if (handlers.length === 0) {
    delete elemEntries[type];

    // Last element entry removed
    if (!hasOwnProps(elemEntries)) {
      delete entries[uid];
    }

    var listener = needWrapper ? getWrapper(elem) : handleEvent;

    if (supports.ADD_EVENT_LISTENER) {
      elem.removeEventListener(type, listener, false);
    } else /* istanbul ignore else */ if (supports.ATTACH_EVENT) {
      elem.detachEvent('on' + type, listener);
    }
  }
}

/**
 * TBD
 * @private
 */

function stopPropagation () {
  this.cancelBubble = true;
}

/**
 * TBD
 * @private
 */

function wrap (elem) {
  var uid = elem.__uid__;
  var wrapper = wrappers[uid];
  if (!wrapper) {
    wrapper = {
      fn: function () {
        return handleEvent.apply(elem, arguments);
      },
      use: 1
    };
    wrappers[uid] = wrapper;
  } else {
    wrapper.use++;
  }
  return wrapper.fn;
}

// Allow access to entries for debug
addEvent.entries = entries;
addEvent.wrappers = wrappers;

module.exports = {
  add: addEvent,
  remove: removeEvent
};

},{"../closest":12,"lang2/src/hasOwnProps":3,"lang2/src/isFunction":5,"lang2/src/isObject":6,"supports2":7}],17:[function(require,module,exports){
'use strict';

var Event = require('./event');

module.exports = Event;

},{"./event":16}],18:[function(require,module,exports){

},{}],19:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],20:[function(require,module,exports){
'use strict';

var Class = require('./class');
var Event = require('./event');
var Element = require('./element');
var Layout = require('./layout');

var closest = require('./closest');
var contains = require('./contains');
var find = require('./find');
var findAll = require('./findAll');
var matches = require('./matches');
var ready = require('./ready');

module.exports = {
  Event: Event,
  Class: Class,
  Element: Element,
  Layout: Layout,
  closest: closest,
  contains: contains,
  find: find,
  findAll: findAll,
  matches: matches,
  ready: ready
};

},{"./class":11,"./closest":12,"./contains":13,"./element":14,"./event":17,"./find":18,"./findAll":19,"./layout":22,"./matches":23,"./ready":26}],21:[function(require,module,exports){
'use strict';

/**
 * @param elem {Element}
 * @param [parent] {Element}
 * @public
 */

function getRect (elem, parent) {
  var top = 0;
  var left = 0;
  var height = 0;
  var width = 0;

  var rect = elem.getBoundingClientRect();

  top = rect.top;
  left = rect.left;
  height = rect.bottom - rect.top;
  width = rect.right - rect.left;

  if (parent) {
    var parentRect = parent.getBoundingClientRect();
    top = top - parentRect.top;
    left = left - parentRect.left;
  }

  return {
    top: top,
    left: left,
    width: width,
    height: height
  };
}

module.exports = getRect;

},{}],22:[function(require,module,exports){
'use strict';

var getRect = require('./getRect');

module.exports = {
  getRect: getRect
};

},{"./getRect":21}],23:[function(require,module,exports){
'use strict';

var matches = require('./matches');
var supports = require('supports2');

/* istanbul ignore next */
if (!supports.MATCHES_SELECTOR) {
  matches = require('./matches-legacy');
}

module.exports = matches;

},{"./matches":25,"./matches-legacy":24,"supports2":7}],24:[function(require,module,exports){
'use strict';

var Class = require('../class');

/**
 * Simple fallback if no vendor implementation
 * Supports element name, class, attribute or id
 * @param {Element} elem
 * @param {String} selector
 * @returns {Boolean}
 */

module.exports = function matches (elem, selector) {
  var firstChar = selector.charAt(0);

  if (firstChar === '.') {
    return Class.contains(elem, selector.substr(1));
  }

  if (firstChar === '[') {
    selector = selector.split('=');
    var key = selector[0].substr(1);
    var value = selector[1].substr(1, selector[1].length - 3);
    return elem.getAttribute(key) === value;
  }

  if (firstChar === '#') {
    return elem.id === selector.substr(1);
  }

  return elem.nodeName === selector.toUpperCase();
};

},{"../class":11}],25:[function(require,module,exports){
'use strict';

var supports = require('supports2');
var isFunction = require('lang2/src/isFunction');

var nativeMatches = supports.MATCHES_SELECTOR;

/**
 * TBD
 * @param {Element} elem
 * @param {String} selector
 * @returns {Boolean}
 */

module.exports = function matches (elem, selector) {
  if (isFunction(elem[nativeMatches])) {
    return elem[nativeMatches](selector);
  } else {
    return false;
  }
};

},{"lang2/src/isFunction":5,"supports2":7}],26:[function(require,module,exports){
//

},{}]},{},[20])(20)
});