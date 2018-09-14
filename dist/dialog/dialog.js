/**
* @module vue-mdc-adapterdialog 0.18.2
* @exports VueMDCDialog
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCDialog = factory());
}(this, (function () { 'use strict';

    function autoInit(plugin) {
      // Auto-install
      var _Vue = null;
      if (typeof window !== 'undefined') {
        _Vue = window.Vue;
      } else if (typeof global !== 'undefined') {
        /*global global*/
        _Vue = global.Vue;
      }
      if (_Vue) {
        _Vue.use(plugin);
      }
    }

    function BasePlugin(components) {
      return {
        version: '0.18.2',
        install: function install(vm) {
          for (var key in components) {
            var component = components[key];
            vm.component(component.name, component);
          }
        },
        components: components
      };
    }

    var CustomElement = {
      functional: true,
      render: function render(createElement, context) {
        return createElement(context.props.is || context.props.tag || 'div', context.data, context.children);
      }
    };

    var CustomElementMixin = {
      components: {
        CustomElement: CustomElement
      }
    };

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    var inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    var possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    var toConsumableArray = function (arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
      } else {
        return Array.from(arr);
      }
    };

    /* global CustomEvent */

    var CustomButton = {
      name: 'custom-button',
      functional: true,
      props: {
        link: Object
      },
      render: function render(h, context) {
        var element = void 0;
        var data = _extends({}, context.data);

        if (context.props.link && context.parent.$router) {
          // router-link case
          element = context.parent.$root.$options.components['router-link'];
          data.props = _extends({ tag: context.props.tag }, context.props.link);
          data.attrs.role = 'button';
          if (data.on.click) {
            data.nativeOn = { click: data.on.click };
          }
        } else if (data.attrs && data.attrs.href) {
          // href case
          element = 'a';
          data.attrs.role = 'button';
        } else {
          // button fallback
          element = 'button';
        }

        return h(element, data, context.children);
      }
    };

    var CustomButtonMixin = {
      props: {
        href: String,
        disabled: Boolean,
        to: [String, Object],
        exact: Boolean,
        append: Boolean,
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String
      },
      computed: {
        link: function link() {
          return this.to && {
            to: this.to,
            exact: this.exact,
            append: this.append,
            replace: this.replace,
            activeClass: this.activeClass,
            exactActiveClass: this.exactActiveClass
          };
        }
      },
      components: {
        CustomButton: CustomButton
      }
    };

    var DispatchEventMixin = {
      props: {
        event: String,
        'event-target': Object,
        'event-args': Array
      },
      methods: {
        dispatchEvent: function dispatchEvent(evt) {
          evt && this.$emit(evt.type, evt);
          if (this.event) {
            var target = this.eventTarget || this.$root;
            var args = this.eventArgs || [];
            target.$emit.apply(target, [this.event].concat(toConsumableArray(args)));
          }
        }
      },
      computed: {
        listeners: function listeners() {
          var _this = this;

          return _extends({}, this.$listeners, {
            click: function click(e) {
              return _this.dispatchEvent(e);
            }
          });
        }
      }
    };

    var scope = Math.floor(Math.random() * Math.floor(0x10000000)).toString() + '-';

    var VMAUniqueIdMixin = {
      beforeCreate: function beforeCreate() {
        this.vma_uid_ = scope + this._uid;
      }
    };

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * @template A
     */
    var MDCFoundation = function () {
      createClass(MDCFoundation, null, [{
        key: "cssClasses",

        /** @return enum{cssClasses} */
        get: function get$$1() {
          // Classes extending MDCFoundation should implement this method to return an object which exports every
          // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
          return {};
        }

        /** @return enum{strings} */

      }, {
        key: "strings",
        get: function get$$1() {
          // Classes extending MDCFoundation should implement this method to return an object which exports all
          // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
          return {};
        }

        /** @return enum{numbers} */

      }, {
        key: "numbers",
        get: function get$$1() {
          // Classes extending MDCFoundation should implement this method to return an object which exports all
          // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
          return {};
        }

        /** @return {!Object} */

      }, {
        key: "defaultAdapter",
        get: function get$$1() {
          // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
          // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
          // validation.
          return {};
        }

        /**
         * @param {A=} adapter
         */

      }]);

      function MDCFoundation() {
        var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, MDCFoundation);

        /** @protected {!A} */
        this.adapter_ = adapter;
      }

      createClass(MDCFoundation, [{
        key: "init",
        value: function init() {
          // Subclasses should override this method to perform initialization routines (registering events, etc.)
        }
      }, {
        key: "destroy",
        value: function destroy() {
          // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
        }
      }]);
      return MDCFoundation;
    }();

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * @template F
     */

    var MDCComponent = function () {
      createClass(MDCComponent, null, [{
        key: 'attachTo',

        /**
         * @param {!Element} root
         * @return {!MDCComponent}
         */
        value: function attachTo(root) {
          // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
          // returns an instantiated component with its root set to that element. Also note that in the cases of
          // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
          // from getDefaultFoundation().
          return new MDCComponent(root, new MDCFoundation());
        }

        /**
         * @param {!Element} root
         * @param {F=} foundation
         * @param {...?} args
         */

      }]);

      function MDCComponent(root) {
        var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        classCallCheck(this, MDCComponent);

        /** @protected {!Element} */
        this.root_ = root;

        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        this.initialize.apply(this, args);
        // Note that we initialize foundation here and not within the constructor's default param so that
        // this.root_ is defined and can be used within the foundation class.
        /** @protected {!F} */
        this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
        this.foundation_.init();
        this.initialSyncWithDOM();
      }

      createClass(MDCComponent, [{
        key: 'initialize',
        value: function initialize() /* ...args */{}
        // Subclasses can override this to do any additional setup work that would be considered part of a
        // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
        // initialized. Any additional arguments besides root and foundation will be passed in here.


        /**
         * @return {!F} foundation
         */

      }, {
        key: 'getDefaultFoundation',
        value: function getDefaultFoundation() {
          // Subclasses must override this method to return a properly configured foundation class for the
          // component.
          throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
        }
      }, {
        key: 'initialSyncWithDOM',
        value: function initialSyncWithDOM() {
          // Subclasses should override this method if they need to perform work to synchronize with a host DOM
          // object. An example of this would be a form control wrapper that needs to synchronize its internal state
          // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
          // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          // Subclasses may implement this method to release any resources / deregister any listeners they have
          // attached. An example of this might be deregistering a resize event from the window object.
          this.foundation_.destroy();
        }

        /**
         * Wrapper method to add an event listener to the component's root element. This is most useful when
         * listening for custom events.
         * @param {string} evtType
         * @param {!Function} handler
         */

      }, {
        key: 'listen',
        value: function listen(evtType, handler) {
          this.root_.addEventListener(evtType, handler);
        }

        /**
         * Wrapper method to remove an event listener to the component's root element. This is most useful when
         * unlistening for custom events.
         * @param {string} evtType
         * @param {!Function} handler
         */

      }, {
        key: 'unlisten',
        value: function unlisten(evtType, handler) {
          this.root_.removeEventListener(evtType, handler);
        }

        /**
         * Fires a cross-browser-compatible custom event from the component root of the given type,
         * with the given data.
         * @param {string} evtType
         * @param {!Object} evtData
         * @param {boolean=} shouldBubble
         */

      }, {
        key: 'emit',
        value: function emit(evtType, evtData) {
          var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

          var evt = void 0;
          if (typeof CustomEvent === 'function') {
            evt = new CustomEvent(evtType, {
              detail: evtData,
              bubbles: shouldBubble
            });
          } else {
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(evtType, shouldBubble, false, evtData);
          }

          this.root_.dispatchEvent(evt);
        }
      }]);
      return MDCComponent;
    }();

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    var cssClasses = {
      ROOT: 'mdc-dialog',
      OPEN: 'mdc-dialog--open',
      ANIMATING: 'mdc-dialog--animating',
      BACKDROP: 'mdc-dialog__backdrop',
      SCROLL_LOCK: 'mdc-dialog-scroll-lock',
      ACCEPT_BTN: 'mdc-dialog__footer__button--accept',
      CANCEL_BTN: 'mdc-dialog__footer__button--cancel'
    };

    var strings = {
      OPEN_DIALOG_SELECTOR: '.mdc-dialog--open',
      DIALOG_SURFACE_SELECTOR: '.mdc-dialog__surface',
      ACCEPT_SELECTOR: '.mdc-dialog__footer__button--accept',
      ACCEPT_EVENT: 'MDCDialog:accept',
      CANCEL_EVENT: 'MDCDialog:cancel'
    };

    var numbers = {
      DIALOG_ANIMATION_TIME_MS: 120
    };

    /**
     * Copyright 2017 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    var MDCDialogFoundation = function (_MDCFoundation) {
      inherits(MDCDialogFoundation, _MDCFoundation);
      createClass(MDCDialogFoundation, null, [{
        key: 'cssClasses',
        get: function get$$1() {
          return cssClasses;
        }
      }, {
        key: 'strings',
        get: function get$$1() {
          return strings;
        }
      }, {
        key: 'numbers',
        get: function get$$1() {
          return numbers;
        }
      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return {
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            addBodyClass: function addBodyClass() /* className: string */{},
            removeBodyClass: function removeBodyClass() /* className: string */{},
            eventTargetHasClass: function eventTargetHasClass() {
              return (/* target: EventTarget, className: string */ /* boolean */false
              );
            },
            registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
            deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
            registerSurfaceInteractionHandler: function registerSurfaceInteractionHandler() /* evt: string, handler: EventListener */{},
            deregisterSurfaceInteractionHandler: function deregisterSurfaceInteractionHandler() /* evt: string, handler: EventListener */{},
            registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
            deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
            notifyAccept: function notifyAccept() {},
            notifyCancel: function notifyCancel() {},
            trapFocusOnSurface: function trapFocusOnSurface() {},
            untrapFocusOnSurface: function untrapFocusOnSurface() {},
            isDialog: function isDialog() {
              return (/* el: Element */ /* boolean */false
              );
            }
          };
        }
      }]);

      function MDCDialogFoundation(adapter) {
        classCallCheck(this, MDCDialogFoundation);

        var _this = possibleConstructorReturn(this, (MDCDialogFoundation.__proto__ || Object.getPrototypeOf(MDCDialogFoundation)).call(this, _extends(MDCDialogFoundation.defaultAdapter, adapter)));

        _this.isOpen_ = false;
        _this.componentClickHandler_ = function (evt) {
          if (_this.adapter_.eventTargetHasClass(evt.target, cssClasses.BACKDROP)) {
            _this.cancel(true);
          }
        };
        _this.dialogClickHandler_ = function (evt) {
          return _this.handleDialogClick_(evt);
        };
        _this.documentKeydownHandler_ = function (evt) {
          if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
            _this.cancel(true);
          }
        };

        _this.timerId_ = 0;
        _this.animationTimerEnd_ = function (evt) {
          return _this.handleAnimationTimerEnd_(evt);
        };
        return _this;
      }

      createClass(MDCDialogFoundation, [{
        key: 'destroy',
        value: function destroy() {
          // Ensure that dialog is cleaned up when destroyed
          if (this.isOpen_) {
            this.close();
          }
          // Final cleanup of animating class in case the timer has not completed.
          this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
          clearTimeout(this.timerId_);
        }
      }, {
        key: 'open',
        value: function open() {
          this.isOpen_ = true;
          this.disableScroll_();
          this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
          this.adapter_.registerSurfaceInteractionHandler('click', this.dialogClickHandler_);
          this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
          clearTimeout(this.timerId_);
          this.timerId_ = setTimeout(this.animationTimerEnd_, MDCDialogFoundation.numbers.DIALOG_ANIMATION_TIME_MS);
          this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
          this.adapter_.addClass(MDCDialogFoundation.cssClasses.OPEN);
        }
      }, {
        key: 'close',
        value: function close() {
          this.isOpen_ = false;
          this.enableScroll_();
          this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
          this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
          this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
          this.adapter_.untrapFocusOnSurface();
          clearTimeout(this.timerId_);
          this.timerId_ = setTimeout(this.animationTimerEnd_, MDCDialogFoundation.numbers.DIALOG_ANIMATION_TIME_MS);
          this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
          this.adapter_.removeClass(MDCDialogFoundation.cssClasses.OPEN);
        }
      }, {
        key: 'isOpen',
        value: function isOpen() {
          return this.isOpen_;
        }
      }, {
        key: 'accept',
        value: function accept(shouldNotify) {
          if (shouldNotify) {
            this.adapter_.notifyAccept();
          }

          this.close();
        }
      }, {
        key: 'cancel',
        value: function cancel(shouldNotify) {
          if (shouldNotify) {
            this.adapter_.notifyCancel();
          }

          this.close();
        }
      }, {
        key: 'handleDialogClick_',
        value: function handleDialogClick_(evt) {
          var target = evt.target;

          if (this.adapter_.eventTargetHasClass(target, cssClasses.ACCEPT_BTN)) {
            this.accept(true);
          } else if (this.adapter_.eventTargetHasClass(target, cssClasses.CANCEL_BTN)) {
            this.cancel(true);
          }
        }
      }, {
        key: 'handleAnimationTimerEnd_',
        value: function handleAnimationTimerEnd_() {
          this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
          if (this.isOpen_) {
            this.adapter_.trapFocusOnSurface();
          }
        }
      }, {
        key: 'disableScroll_',
        value: function disableScroll_() {
          this.adapter_.addBodyClass(cssClasses.SCROLL_LOCK);
        }
      }, {
        key: 'enableScroll_',
        value: function enableScroll_() {
          this.adapter_.removeBodyClass(cssClasses.SCROLL_LOCK);
        }
      }]);
      return MDCDialogFoundation;
    }(MDCFoundation);

    var tabbable = function (el, options) {
      options = options || {};

      var elementDocument = el.ownerDocument || el;
      var basicTabbables = [];
      var orderedTabbables = [];

      // A node is "available" if
      // - it's computed style
      var isUnavailable = createIsUnavailable(elementDocument);

      var candidateSelectors = ['input', 'select', 'a[href]', 'textarea', 'button', '[tabindex]'];

      var candidates = el.querySelectorAll(candidateSelectors.join(','));

      if (options.includeContainer) {
        var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

        if (candidateSelectors.some(function (candidateSelector) {
          return matches.call(el, candidateSelector);
        })) {
          candidates = Array.prototype.slice.apply(candidates);
          candidates.unshift(el);
        }
      }

      var candidate, candidateIndexAttr, candidateIndex;
      for (var i = 0, l = candidates.length; i < l; i++) {
        candidate = candidates[i];
        candidateIndexAttr = parseInt(candidate.getAttribute('tabindex'), 10);
        candidateIndex = isNaN(candidateIndexAttr) ? candidate.tabIndex : candidateIndexAttr;

        if (candidateIndex < 0 || candidate.tagName === 'INPUT' && candidate.type === 'hidden' || candidate.disabled || isUnavailable(candidate, elementDocument)) {
          continue;
        }

        if (candidateIndex === 0) {
          basicTabbables.push(candidate);
        } else {
          orderedTabbables.push({
            index: i,
            tabIndex: candidateIndex,
            node: candidate
          });
        }
      }

      var tabbableNodes = orderedTabbables.sort(function (a, b) {
        return a.tabIndex === b.tabIndex ? a.index - b.index : a.tabIndex - b.tabIndex;
      }).map(function (a) {
        return a.node;
      });

      Array.prototype.push.apply(tabbableNodes, basicTabbables);

      return tabbableNodes;
    };

    function createIsUnavailable(elementDocument) {
      // Node cache must be refreshed on every check, in case
      // the content of the element has changed
      var isOffCache = [];

      // "off" means `display: none;`, as opposed to "hidden",
      // which means `visibility: hidden;`. getComputedStyle
      // accurately reflects visiblity in context but not
      // "off" state, so we need to recursively check parents.

      function isOff(node, nodeComputedStyle) {
        if (node === elementDocument.documentElement) return false;

        // Find the cached node (Array.prototype.find not available in IE9)
        for (var i = 0, length = isOffCache.length; i < length; i++) {
          if (isOffCache[i][0] === node) return isOffCache[i][1];
        }

        nodeComputedStyle = nodeComputedStyle || elementDocument.defaultView.getComputedStyle(node);

        var result = false;

        if (nodeComputedStyle.display === 'none') {
          result = true;
        } else if (node.parentNode) {
          result = isOff(node.parentNode);
        }

        isOffCache.push([node, result]);

        return result;
      }

      return function isUnavailable(node) {
        if (node === elementDocument.documentElement) return false;

        var computedStyle = elementDocument.defaultView.getComputedStyle(node);

        if (isOff(node, computedStyle)) return true;

        return computedStyle.visibility === 'hidden';
      };
    }

    var listeningFocusTrap = null;

    function focusTrap(element, userOptions) {
      var tabbableNodes = [];
      var firstTabbableNode = null;
      var lastTabbableNode = null;
      var nodeFocusedBeforeActivation = null;
      var active = false;
      var paused = false;
      var tabEvent = null;

      var container = typeof element === 'string' ? document.querySelector(element) : element;

      var config = userOptions || {};
      config.returnFocusOnDeactivate = userOptions && userOptions.returnFocusOnDeactivate !== undefined ? userOptions.returnFocusOnDeactivate : true;
      config.escapeDeactivates = userOptions && userOptions.escapeDeactivates !== undefined ? userOptions.escapeDeactivates : true;

      var trap = {
        activate: activate,
        deactivate: deactivate,
        pause: pause,
        unpause: unpause
      };

      return trap;

      function activate(activateOptions) {
        if (active) return;

        var defaultedActivateOptions = {
          onActivate: activateOptions && activateOptions.onActivate !== undefined ? activateOptions.onActivate : config.onActivate
        };

        active = true;
        paused = false;
        nodeFocusedBeforeActivation = document.activeElement;

        if (defaultedActivateOptions.onActivate) {
          defaultedActivateOptions.onActivate();
        }

        addListeners();
        return trap;
      }

      function deactivate(deactivateOptions) {
        if (!active) return;

        var defaultedDeactivateOptions = {
          returnFocus: deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate,
          onDeactivate: deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate
        };

        removeListeners();

        if (defaultedDeactivateOptions.onDeactivate) {
          defaultedDeactivateOptions.onDeactivate();
        }

        if (defaultedDeactivateOptions.returnFocus) {
          setTimeout(function () {
            tryFocus(nodeFocusedBeforeActivation);
          }, 0);
        }

        active = false;
        paused = false;
        return this;
      }

      function pause() {
        if (paused || !active) return;
        paused = true;
        removeListeners();
      }

      function unpause() {
        if (!paused || !active) return;
        paused = false;
        addListeners();
      }

      function addListeners() {
        if (!active) return;

        // There can be only one listening focus trap at a time
        if (listeningFocusTrap) {
          listeningFocusTrap.pause();
        }
        listeningFocusTrap = trap;

        updateTabbableNodes();
        // Ensure that the focused element doesn't capture the event that caused the focus trap activation
        setTimeout(function () {
          tryFocus(firstFocusNode());
        }, 0);
        document.addEventListener('focus', checkFocus, true);
        document.addEventListener('click', checkClick, true);
        document.addEventListener('mousedown', checkPointerDown, true);
        document.addEventListener('touchstart', checkPointerDown, true);
        document.addEventListener('keydown', checkKey, true);

        return trap;
      }

      function removeListeners() {
        if (!active || listeningFocusTrap !== trap) return;

        document.removeEventListener('focus', checkFocus, true);
        document.removeEventListener('click', checkClick, true);
        document.removeEventListener('mousedown', checkPointerDown, true);
        document.removeEventListener('touchstart', checkPointerDown, true);
        document.removeEventListener('keydown', checkKey, true);

        listeningFocusTrap = null;

        return trap;
      }

      function getNodeForOption(optionName) {
        var optionValue = config[optionName];
        var node = optionValue;
        if (!optionValue) {
          return null;
        }
        if (typeof optionValue === 'string') {
          node = document.querySelector(optionValue);
          if (!node) {
            throw new Error('`' + optionName + '` refers to no known node');
          }
        }
        if (typeof optionValue === 'function') {
          node = optionValue();
          if (!node) {
            throw new Error('`' + optionName + '` did not return a node');
          }
        }
        return node;
      }

      function firstFocusNode() {
        var node;
        if (getNodeForOption('initialFocus') !== null) {
          node = getNodeForOption('initialFocus');
        } else if (container.contains(document.activeElement)) {
          node = document.activeElement;
        } else {
          node = tabbableNodes[0] || getNodeForOption('fallbackFocus');
        }

        if (!node) {
          throw new Error('You can\'t have a focus-trap without at least one focusable element');
        }

        return node;
      }

      // This needs to be done on mousedown and touchstart instead of click
      // so that it precedes the focus event
      function checkPointerDown(e) {
        if (config.clickOutsideDeactivates && !container.contains(e.target)) {
          deactivate({ returnFocus: false });
        }
      }

      function checkClick(e) {
        if (config.clickOutsideDeactivates) return;
        if (container.contains(e.target)) return;
        e.preventDefault();
        e.stopImmediatePropagation();
      }

      function checkFocus(e) {
        if (container.contains(e.target)) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        // Checking for a blur method here resolves a Firefox issue (#15)
        if (typeof e.target.blur === 'function') e.target.blur();

        if (tabEvent) {
          readjustFocus(tabEvent);
        }
      }

      function checkKey(e) {
        if (e.key === 'Tab' || e.keyCode === 9) {
          handleTab(e);
        }

        if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
          deactivate();
        }
      }

      function handleTab(e) {
        updateTabbableNodes();

        if (e.target.hasAttribute('tabindex') && Number(e.target.getAttribute('tabindex')) < 0) {
          return tabEvent = e;
        }

        e.preventDefault();
        var currentFocusIndex = tabbableNodes.indexOf(e.target);

        if (e.shiftKey) {
          if (e.target === firstTabbableNode || tabbableNodes.indexOf(e.target) === -1) {
            return tryFocus(lastTabbableNode);
          }
          return tryFocus(tabbableNodes[currentFocusIndex - 1]);
        }

        if (e.target === lastTabbableNode) return tryFocus(firstTabbableNode);

        tryFocus(tabbableNodes[currentFocusIndex + 1]);
      }

      function updateTabbableNodes() {
        tabbableNodes = tabbable(container);
        firstTabbableNode = tabbableNodes[0];
        lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
      }

      function readjustFocus(e) {
        if (e.shiftKey) return tryFocus(lastTabbableNode);

        tryFocus(firstTabbableNode);
      }
    }

    function isEscapeEvent(e) {
      return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
    }

    function tryFocus(node) {
      if (!node || !node.focus) return;
      if (node === document.activeElement) return;

      node.focus();
      if (node.tagName.toLowerCase() === 'input') {
        node.select();
      }
    }

    var focusTrap_1 = focusTrap;

    /**
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    function createFocusTrapInstance(surfaceEl, acceptButtonEl) {
      var focusTrapFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : focusTrap_1;

      return focusTrapFactory(surfaceEl, {
        initialFocus: acceptButtonEl,
        clickOutsideDeactivates: true
      });
    }

    /**
     * @license
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /* eslint no-unused-vars: [2, {"args": "none"}] */

    /**
     * Adapter for MDC Ripple. Provides an interface for managing
     * - classes
     * - dom
     * - CSS variables
     * - position
     * - dimensions
     * - scroll position
     * - event handlers
     * - unbounded, active and disabled states
     *
     * Additionally, provides type information for the adapter to the Closure
     * compiler.
     *
     * Implement this adapter for your framework of choice to delegate updates to
     * the component in your framework of choice. See architecture documentation
     * for more details.
     * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
     *
     * @record
     */
    var MDCRippleAdapter = function () {
      function MDCRippleAdapter() {
        classCallCheck(this, MDCRippleAdapter);
      }

      createClass(MDCRippleAdapter, [{
        key: "browserSupportsCssVars",

        /** @return {boolean} */
        value: function browserSupportsCssVars() {}

        /** @return {boolean} */

      }, {
        key: "isUnbounded",
        value: function isUnbounded() {}

        /** @return {boolean} */

      }, {
        key: "isSurfaceActive",
        value: function isSurfaceActive() {}

        /** @return {boolean} */

      }, {
        key: "isSurfaceDisabled",
        value: function isSurfaceDisabled() {}

        /** @param {string} className */

      }, {
        key: "addClass",
        value: function addClass(className) {}

        /** @param {string} className */

      }, {
        key: "removeClass",
        value: function removeClass(className) {}

        /** @param {!EventTarget} target */

      }, {
        key: "containsEventTarget",
        value: function containsEventTarget(target) {}

        /**
         * @param {string} evtType
         * @param {!Function} handler
         */

      }, {
        key: "registerInteractionHandler",
        value: function registerInteractionHandler(evtType, handler) {}

        /**
         * @param {string} evtType
         * @param {!Function} handler
         */

      }, {
        key: "deregisterInteractionHandler",
        value: function deregisterInteractionHandler(evtType, handler) {}

        /**
         * @param {string} evtType
         * @param {!Function} handler
         */

      }, {
        key: "registerDocumentInteractionHandler",
        value: function registerDocumentInteractionHandler(evtType, handler) {}

        /**
         * @param {string} evtType
         * @param {!Function} handler
         */

      }, {
        key: "deregisterDocumentInteractionHandler",
        value: function deregisterDocumentInteractionHandler(evtType, handler) {}

        /**
         * @param {!Function} handler
         */

      }, {
        key: "registerResizeHandler",
        value: function registerResizeHandler(handler) {}

        /**
         * @param {!Function} handler
         */

      }, {
        key: "deregisterResizeHandler",
        value: function deregisterResizeHandler(handler) {}

        /**
         * @param {string} varName
         * @param {?number|string} value
         */

      }, {
        key: "updateCssVariable",
        value: function updateCssVariable(varName, value) {}

        /** @return {!ClientRect} */

      }, {
        key: "computeBoundingRect",
        value: function computeBoundingRect() {}

        /** @return {{x: number, y: number}} */

      }, {
        key: "getWindowPageOffset",
        value: function getWindowPageOffset() {}
      }]);
      return MDCRippleAdapter;
    }();

    /**
     * @license
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    var cssClasses$1 = {
      // Ripple is a special case where the "root" component is really a "mixin" of sorts,
      // given that it's an 'upgrade' to an existing component. That being said it is the root
      // CSS class that all other CSS classes derive from.
      ROOT: 'mdc-ripple-upgraded',
      UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
      BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
      FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
      FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
    };

    var strings$1 = {
      VAR_LEFT: '--mdc-ripple-left',
      VAR_TOP: '--mdc-ripple-top',
      VAR_FG_SIZE: '--mdc-ripple-fg-size',
      VAR_FG_SCALE: '--mdc-ripple-fg-scale',
      VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
      VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
    };

    var numbers$1 = {
      PADDING: 10,
      INITIAL_ORIGIN_SCALE: 0.6,
      DEACTIVATION_TIMEOUT_MS: 225, // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
      FG_DEACTIVATION_MS: 150, // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
      TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices
    };

    /**
     * @license
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
     * @private {boolean|undefined}
     */
    var supportsCssVariables_ = void 0;

    /**
     * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
     * @private {boolean|undefined}
     */
    var supportsPassive_$1 = void 0;

    /**
     * @param {!Window} windowObj
     * @return {boolean}
     */
    function detectEdgePseudoVarBug(windowObj) {
      // Detect versions of Edge with buggy var() support
      // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
      var document = windowObj.document;
      var node = document.createElement('div');
      node.className = 'mdc-ripple-surface--test-edge-var-bug';
      document.body.appendChild(node);

      // The bug exists if ::before style ends up propagating to the parent element.
      // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
      // but Firefox is known to support CSS custom properties correctly.
      // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
      var computedStyle = windowObj.getComputedStyle(node);
      var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
      node.remove();
      return hasPseudoVarBug;
    }

    /**
     * @param {!Window} windowObj
     * @param {boolean=} forceRefresh
     * @return {boolean|undefined}
     */

    function supportsCssVariables(windowObj) {
      var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var supportsCssVariables = supportsCssVariables_;
      if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
        return supportsCssVariables;
      }

      var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
      if (!supportsFunctionPresent) {
        return;
      }

      var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
      // See: https://bugs.webkit.org/show_bug.cgi?id=154669
      // See: README section on Safari
      var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

      if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
        supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
      } else {
        supportsCssVariables = false;
      }

      if (!forceRefresh) {
        supportsCssVariables_ = supportsCssVariables;
      }
      return supportsCssVariables;
    }

    //
    /**
     * Determine whether the current browser supports passive event listeners, and if so, use them.
     * @param {!Window=} globalObj
     * @param {boolean=} forceRefresh
     * @return {boolean|{passive: boolean}}
     */
    function applyPassive$1() {
      var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
      var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (supportsPassive_$1 === undefined || forceRefresh) {
        var isSupported = false;
        try {
          globalObj.document.addEventListener('test', null, { get passive() {
              isSupported = true;
            } });
        } catch (e) {}

        supportsPassive_$1 = isSupported;
      }

      return supportsPassive_$1 ? { passive: true } : false;
    }

    /**
     * @param {!Object} HTMLElementPrototype
     * @return {!Array<string>}
     */
    function getMatchesProperty(HTMLElementPrototype) {
      return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(function (p) {
        return p in HTMLElementPrototype;
      }).pop();
    }

    /**
     * @param {!Event} ev
     * @param {{x: number, y: number}} pageOffset
     * @param {!ClientRect} clientRect
     * @return {{x: number, y: number}}
     */
    function getNormalizedEventCoords(ev, pageOffset, clientRect) {
      var x = pageOffset.x,
          y = pageOffset.y;

      var documentX = x + clientRect.left;
      var documentY = y + clientRect.top;

      var normalizedX = void 0;
      var normalizedY = void 0;
      // Determine touch point relative to the ripple container.
      if (ev.type === 'touchstart') {
        normalizedX = ev.changedTouches[0].pageX - documentX;
        normalizedY = ev.changedTouches[0].pageY - documentY;
      } else {
        normalizedX = ev.pageX - documentX;
        normalizedY = ev.pageY - documentY;
      }

      return { x: normalizedX, y: normalizedY };
    }

    /**
     * @license
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    // Activation events registered on the root element of each instance for activation
    var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

    // Deactivation events registered on documentElement when a pointer-related down event occurs
    var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup'];

    // Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations
    /** @type {!Array<!EventTarget>} */
    var activatedTargets = [];

    /**
     * @extends {MDCFoundation<!MDCRippleAdapter>}
     */

    var MDCRippleFoundation = function (_MDCFoundation) {
      inherits(MDCRippleFoundation, _MDCFoundation);
      createClass(MDCRippleFoundation, null, [{
        key: 'cssClasses',
        get: function get$$1() {
          return cssClasses$1;
        }
      }, {
        key: 'strings',
        get: function get$$1() {
          return strings$1;
        }
      }, {
        key: 'numbers',
        get: function get$$1() {
          return numbers$1;
        }
      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return {
            browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
            isUnbounded: function isUnbounded() /* boolean */{},
            isSurfaceActive: function isSurfaceActive() /* boolean */{},
            isSurfaceDisabled: function isSurfaceDisabled() /* boolean */{},
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            containsEventTarget: function containsEventTarget() /* target: !EventTarget */{},
            registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
            deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
            registerDocumentInteractionHandler: function registerDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
            deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
            registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
            deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
            updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
            computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
            getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
          };
        }
      }]);

      function MDCRippleFoundation(adapter) {
        classCallCheck(this, MDCRippleFoundation);

        /** @private {number} */
        var _this = possibleConstructorReturn(this, (MDCRippleFoundation.__proto__ || Object.getPrototypeOf(MDCRippleFoundation)).call(this, _extends(MDCRippleFoundation.defaultAdapter, adapter)));

        _this.layoutFrame_ = 0;

        /** @private {!ClientRect} */
        _this.frame_ = /** @type {!ClientRect} */{ width: 0, height: 0 };

        /** @private {!ActivationStateType} */
        _this.activationState_ = _this.defaultActivationState_();

        /** @private {number} */
        _this.initialSize_ = 0;

        /** @private {number} */
        _this.maxRadius_ = 0;

        /** @private {function(!Event)} */
        _this.activateHandler_ = function (e) {
          return _this.activate_(e);
        };

        /** @private {function(!Event)} */
        _this.deactivateHandler_ = function (e) {
          return _this.deactivate_(e);
        };

        /** @private {function(?Event=)} */
        _this.focusHandler_ = function () {
          return _this.handleFocus();
        };

        /** @private {function(?Event=)} */
        _this.blurHandler_ = function () {
          return _this.handleBlur();
        };

        /** @private {!Function} */
        _this.resizeHandler_ = function () {
          return _this.layout();
        };

        /** @private {{left: number, top:number}} */
        _this.unboundedCoords_ = {
          left: 0,
          top: 0
        };

        /** @private {number} */
        _this.fgScale_ = 0;

        /** @private {number} */
        _this.activationTimer_ = 0;

        /** @private {number} */
        _this.fgDeactivationRemovalTimer_ = 0;

        /** @private {boolean} */
        _this.activationAnimationHasEnded_ = false;

        /** @private {!Function} */
        _this.activationTimerCallback_ = function () {
          _this.activationAnimationHasEnded_ = true;
          _this.runDeactivationUXLogicIfReady_();
        };

        /** @private {?Event} */
        _this.previousActivationEvent_ = null;
        return _this;
      }

      /**
       * We compute this property so that we are not querying information about the client
       * until the point in time where the foundation requests it. This prevents scenarios where
       * client-side feature-detection may happen too early, such as when components are rendered on the server
       * and then initialized at mount time on the client.
       * @return {boolean}
       * @private
       */


      createClass(MDCRippleFoundation, [{
        key: 'isSupported_',
        value: function isSupported_() {
          return this.adapter_.browserSupportsCssVars();
        }

        /**
         * @return {!ActivationStateType}
         */

      }, {
        key: 'defaultActivationState_',
        value: function defaultActivationState_() {
          return {
            isActivated: false,
            hasDeactivationUXRun: false,
            wasActivatedByPointer: false,
            wasElementMadeActive: false,
            activationEvent: null,
            isProgrammatic: false
          };
        }

        /** @override */

      }, {
        key: 'init',
        value: function init() {
          var _this2 = this;

          if (!this.isSupported_()) {
            return;
          }
          this.registerRootHandlers_();

          var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
              ROOT = _MDCRippleFoundation$.ROOT,
              UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

          requestAnimationFrame(function () {
            _this2.adapter_.addClass(ROOT);
            if (_this2.adapter_.isUnbounded()) {
              _this2.adapter_.addClass(UNBOUNDED);
              // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
              _this2.layoutInternal_();
            }
          });
        }

        /** @override */

      }, {
        key: 'destroy',
        value: function destroy() {
          var _this3 = this;

          if (!this.isSupported_()) {
            return;
          }

          if (this.activationTimer_) {
            clearTimeout(this.activationTimer_);
            this.activationTimer_ = 0;
            var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

            this.adapter_.removeClass(FG_ACTIVATION);
          }

          this.deregisterRootHandlers_();
          this.deregisterDeactivationHandlers_();

          var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
              ROOT = _MDCRippleFoundation$2.ROOT,
              UNBOUNDED = _MDCRippleFoundation$2.UNBOUNDED;

          requestAnimationFrame(function () {
            _this3.adapter_.removeClass(ROOT);
            _this3.adapter_.removeClass(UNBOUNDED);
            _this3.removeCssVars_();
          });
        }

        /** @private */

      }, {
        key: 'registerRootHandlers_',
        value: function registerRootHandlers_() {
          var _this4 = this;

          ACTIVATION_EVENT_TYPES.forEach(function (type) {
            _this4.adapter_.registerInteractionHandler(type, _this4.activateHandler_);
          });
          this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
          this.adapter_.registerInteractionHandler('blur', this.blurHandler_);

          if (this.adapter_.isUnbounded()) {
            this.adapter_.registerResizeHandler(this.resizeHandler_);
          }
        }

        /**
         * @param {!Event} e
         * @private
         */

      }, {
        key: 'registerDeactivationHandlers_',
        value: function registerDeactivationHandlers_(e) {
          var _this5 = this;

          if (e.type === 'keydown') {
            this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
          } else {
            POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
              _this5.adapter_.registerDocumentInteractionHandler(type, _this5.deactivateHandler_);
            });
          }
        }

        /** @private */

      }, {
        key: 'deregisterRootHandlers_',
        value: function deregisterRootHandlers_() {
          var _this6 = this;

          ACTIVATION_EVENT_TYPES.forEach(function (type) {
            _this6.adapter_.deregisterInteractionHandler(type, _this6.activateHandler_);
          });
          this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
          this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

          if (this.adapter_.isUnbounded()) {
            this.adapter_.deregisterResizeHandler(this.resizeHandler_);
          }
        }

        /** @private */

      }, {
        key: 'deregisterDeactivationHandlers_',
        value: function deregisterDeactivationHandlers_() {
          var _this7 = this;

          this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
          POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
            _this7.adapter_.deregisterDocumentInteractionHandler(type, _this7.deactivateHandler_);
          });
        }

        /** @private */

      }, {
        key: 'removeCssVars_',
        value: function removeCssVars_() {
          var _this8 = this;

          var strings = MDCRippleFoundation.strings;

          Object.keys(strings).forEach(function (k) {
            if (k.indexOf('VAR_') === 0) {
              _this8.adapter_.updateCssVariable(strings[k], null);
            }
          });
        }

        /**
         * @param {?Event} e
         * @private
         */

      }, {
        key: 'activate_',
        value: function activate_(e) {
          var _this9 = this;

          if (this.adapter_.isSurfaceDisabled()) {
            return;
          }

          var activationState = this.activationState_;
          if (activationState.isActivated) {
            return;
          }

          // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
          var previousActivationEvent = this.previousActivationEvent_;
          var isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;
          if (isSameInteraction) {
            return;
          }

          activationState.isActivated = true;
          activationState.isProgrammatic = e === null;
          activationState.activationEvent = e;
          activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';

          var hasActivatedChild = e && activatedTargets.length > 0 && activatedTargets.some(function (target) {
            return _this9.adapter_.containsEventTarget(target);
          });
          if (hasActivatedChild) {
            // Immediately reset activation state, while preserving logic that prevents touch follow-on events
            this.resetActivationState_();
            return;
          }

          if (e) {
            activatedTargets.push( /** @type {!EventTarget} */e.target);
            this.registerDeactivationHandlers_(e);
          }

          activationState.wasElementMadeActive = this.checkElementMadeActive_(e);
          if (activationState.wasElementMadeActive) {
            this.animateActivation_();
          }

          requestAnimationFrame(function () {
            // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
            activatedTargets = [];

            if (!activationState.wasElementMadeActive && (e.key === ' ' || e.keyCode === 32)) {
              // If space was pressed, try again within an rAF call to detect :active, because different UAs report
              // active states inconsistently when they're called within event handling code:
              // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
              // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
              // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
              // variable is set within a rAF callback for a submit button interaction (#2241).
              activationState.wasElementMadeActive = _this9.checkElementMadeActive_(e);
              if (activationState.wasElementMadeActive) {
                _this9.animateActivation_();
              }
            }

            if (!activationState.wasElementMadeActive) {
              // Reset activation state immediately if element was not made active.
              _this9.activationState_ = _this9.defaultActivationState_();
            }
          });
        }

        /**
         * @param {?Event} e
         * @private
         */

      }, {
        key: 'checkElementMadeActive_',
        value: function checkElementMadeActive_(e) {
          return e && e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
        }

        /**
         * @param {?Event=} event Optional event containing position information.
         */

      }, {
        key: 'activate',
        value: function activate() {
          var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          this.activate_(event);
        }

        /** @private */

      }, {
        key: 'animateActivation_',
        value: function animateActivation_() {
          var _this10 = this;

          var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
              VAR_FG_TRANSLATE_START = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_START,
              VAR_FG_TRANSLATE_END = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_END;
          var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
              FG_DEACTIVATION = _MDCRippleFoundation$4.FG_DEACTIVATION,
              FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;
          var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;


          this.layoutInternal_();

          var translateStart = '';
          var translateEnd = '';

          if (!this.adapter_.isUnbounded()) {
            var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
                startPoint = _getFgTranslationCoor.startPoint,
                endPoint = _getFgTranslationCoor.endPoint;

            translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
            translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
          }

          this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
          this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
          // Cancel any ongoing activation/deactivation animations
          clearTimeout(this.activationTimer_);
          clearTimeout(this.fgDeactivationRemovalTimer_);
          this.rmBoundedActivationClasses_();
          this.adapter_.removeClass(FG_DEACTIVATION);

          // Force layout in order to re-trigger the animation.
          this.adapter_.computeBoundingRect();
          this.adapter_.addClass(FG_ACTIVATION);
          this.activationTimer_ = setTimeout(function () {
            return _this10.activationTimerCallback_();
          }, DEACTIVATION_TIMEOUT_MS);
        }

        /**
         * @private
         * @return {{startPoint: PointType, endPoint: PointType}}
         */

      }, {
        key: 'getFgTranslationCoordinates_',
        value: function getFgTranslationCoordinates_() {
          var _activationState_ = this.activationState_,
              activationEvent = _activationState_.activationEvent,
              wasActivatedByPointer = _activationState_.wasActivatedByPointer;


          var startPoint = void 0;
          if (wasActivatedByPointer) {
            startPoint = getNormalizedEventCoords(
            /** @type {!Event} */activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
          } else {
            startPoint = {
              x: this.frame_.width / 2,
              y: this.frame_.height / 2
            };
          }
          // Center the element around the start point.
          startPoint = {
            x: startPoint.x - this.initialSize_ / 2,
            y: startPoint.y - this.initialSize_ / 2
          };

          var endPoint = {
            x: this.frame_.width / 2 - this.initialSize_ / 2,
            y: this.frame_.height / 2 - this.initialSize_ / 2
          };

          return { startPoint: startPoint, endPoint: endPoint };
        }

        /** @private */

      }, {
        key: 'runDeactivationUXLogicIfReady_',
        value: function runDeactivationUXLogicIfReady_() {
          var _this11 = this;

          // This method is called both when a pointing device is released, and when the activation animation ends.
          // The deactivation animation should only run after both of those occur.
          var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
          var _activationState_2 = this.activationState_,
              hasDeactivationUXRun = _activationState_2.hasDeactivationUXRun,
              isActivated = _activationState_2.isActivated;

          var activationHasEnded = hasDeactivationUXRun || !isActivated;

          if (activationHasEnded && this.activationAnimationHasEnded_) {
            this.rmBoundedActivationClasses_();
            this.adapter_.addClass(FG_DEACTIVATION);
            this.fgDeactivationRemovalTimer_ = setTimeout(function () {
              _this11.adapter_.removeClass(FG_DEACTIVATION);
            }, numbers$1.FG_DEACTIVATION_MS);
          }
        }

        /** @private */

      }, {
        key: 'rmBoundedActivationClasses_',
        value: function rmBoundedActivationClasses_() {
          var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

          this.adapter_.removeClass(FG_ACTIVATION);
          this.activationAnimationHasEnded_ = false;
          this.adapter_.computeBoundingRect();
        }
      }, {
        key: 'resetActivationState_',
        value: function resetActivationState_() {
          var _this12 = this;

          this.previousActivationEvent_ = this.activationState_.activationEvent;
          this.activationState_ = this.defaultActivationState_();
          // Touch devices may fire additional events for the same interaction within a short time.
          // Store the previous event until it's safe to assume that subsequent events are for new interactions.
          setTimeout(function () {
            return _this12.previousActivationEvent_ = null;
          }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
        }

        /**
         * @param {?Event} e
         * @private
         */

      }, {
        key: 'deactivate_',
        value: function deactivate_(e) {
          var _this13 = this;

          var activationState = this.activationState_;
          // This can happen in scenarios such as when you have a keyup event that blurs the element.
          if (!activationState.isActivated) {
            return;
          }

          var state = /** @type {!ActivationStateType} */_extends({}, activationState);

          if (activationState.isProgrammatic) {
            var evtObject = null;
            requestAnimationFrame(function () {
              return _this13.animateDeactivation_(evtObject, state);
            });
            this.resetActivationState_();
          } else {
            this.deregisterDeactivationHandlers_();
            requestAnimationFrame(function () {
              _this13.activationState_.hasDeactivationUXRun = true;
              _this13.animateDeactivation_(e, state);
              _this13.resetActivationState_();
            });
          }
        }

        /**
         * @param {?Event=} event Optional event containing position information.
         */

      }, {
        key: 'deactivate',
        value: function deactivate() {
          var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          this.deactivate_(event);
        }

        /**
         * @param {Event} e
         * @param {!ActivationStateType} options
         * @private
         */

      }, {
        key: 'animateDeactivation_',
        value: function animateDeactivation_(e, _ref) {
          var wasActivatedByPointer = _ref.wasActivatedByPointer,
              wasElementMadeActive = _ref.wasElementMadeActive;

          if (wasActivatedByPointer || wasElementMadeActive) {
            this.runDeactivationUXLogicIfReady_();
          }
        }
      }, {
        key: 'layout',
        value: function layout() {
          var _this14 = this;

          if (this.layoutFrame_) {
            cancelAnimationFrame(this.layoutFrame_);
          }
          this.layoutFrame_ = requestAnimationFrame(function () {
            _this14.layoutInternal_();
            _this14.layoutFrame_ = 0;
          });
        }

        /** @private */

      }, {
        key: 'layoutInternal_',
        value: function layoutInternal_() {
          var _this15 = this;

          this.frame_ = this.adapter_.computeBoundingRect();
          var maxDim = Math.max(this.frame_.height, this.frame_.width);

          // Surface diameter is treated differently for unbounded vs. bounded ripples.
          // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
          // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
          // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
          // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
          // `overflow: hidden`.
          var getBoundedRadius = function getBoundedRadius() {
            var hypotenuse = Math.sqrt(Math.pow(_this15.frame_.width, 2) + Math.pow(_this15.frame_.height, 2));
            return hypotenuse + MDCRippleFoundation.numbers.PADDING;
          };

          this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();

          // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
          this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
          this.fgScale_ = this.maxRadius_ / this.initialSize_;

          this.updateLayoutCssVars_();
        }

        /** @private */

      }, {
        key: 'updateLayoutCssVars_',
        value: function updateLayoutCssVars_() {
          var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
              VAR_FG_SIZE = _MDCRippleFoundation$5.VAR_FG_SIZE,
              VAR_LEFT = _MDCRippleFoundation$5.VAR_LEFT,
              VAR_TOP = _MDCRippleFoundation$5.VAR_TOP,
              VAR_FG_SCALE = _MDCRippleFoundation$5.VAR_FG_SCALE;


          this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
          this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

          if (this.adapter_.isUnbounded()) {
            this.unboundedCoords_ = {
              left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
              top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
            };

            this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
            this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
          }
        }

        /** @param {boolean} unbounded */

      }, {
        key: 'setUnbounded',
        value: function setUnbounded(unbounded) {
          var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

          if (unbounded) {
            this.adapter_.addClass(UNBOUNDED);
          } else {
            this.adapter_.removeClass(UNBOUNDED);
          }
        }
      }, {
        key: 'handleFocus',
        value: function handleFocus() {
          var _this16 = this;

          requestAnimationFrame(function () {
            return _this16.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
          });
        }
      }, {
        key: 'handleBlur',
        value: function handleBlur() {
          var _this17 = this;

          requestAnimationFrame(function () {
            return _this17.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
          });
        }
      }]);
      return MDCRippleFoundation;
    }(MDCFoundation);

    var RippleBase = function (_MDCRippleFoundation) {
      inherits(RippleBase, _MDCRippleFoundation);
      createClass(RippleBase, null, [{
        key: 'isSurfaceActive',
        value: function isSurfaceActive(ref) {
          return ref[RippleBase.MATCHES](':active');
        }
      }, {
        key: 'MATCHES',
        get: function get$$1() {
          /* global HTMLElement */
          return RippleBase._matches || (RippleBase._matches = getMatchesProperty(HTMLElement.prototype));
        }
      }]);

      function RippleBase(vm, options) {
        classCallCheck(this, RippleBase);
        return possibleConstructorReturn(this, (RippleBase.__proto__ || Object.getPrototypeOf(RippleBase)).call(this, _extends({
          browserSupportsCssVars: function browserSupportsCssVars() {
            return supportsCssVariables(window);
          },
          isUnbounded: function isUnbounded() {
            return false;
          },
          isSurfaceActive: function isSurfaceActive() {
            return vm.$el[RippleBase.MATCHES](':active');
          },
          isSurfaceDisabled: function isSurfaceDisabled() {
            return vm.disabled;
          },
          addClass: function addClass(className) {
            vm.$set(vm.classes, className, true);
          },
          removeClass: function removeClass(className) {
            vm.$delete(vm.classes, className);
          },

          containsEventTarget: function containsEventTarget(target) {
            return vm.$el.contains(target);
          },
          registerInteractionHandler: function registerInteractionHandler(evt, handler) {
            vm.$el.addEventListener(evt, handler, applyPassive$1());
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
            vm.$el.removeEventListener(evt, handler, applyPassive$1());
          },
          registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
            return document.documentElement.addEventListener(evtType, handler, applyPassive$1());
          },
          deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
            return document.documentElement.removeEventListener(evtType, handler, applyPassive$1());
          },
          registerResizeHandler: function registerResizeHandler(handler) {
            return window.addEventListener('resize', handler);
          },
          deregisterResizeHandler: function deregisterResizeHandler(handler) {
            return window.removeEventListener('resize', handler);
          },
          updateCssVariable: function updateCssVariable(varName, value) {
            vm.$set(vm.styles, varName, value);
          },
          computeBoundingRect: function computeBoundingRect() {
            return vm.$el.getBoundingClientRect();
          },
          getWindowPageOffset: function getWindowPageOffset() {
            return { x: window.pageXOffset, y: window.pageYOffset };
          }
        }, options)));
      }

      return RippleBase;
    }(MDCRippleFoundation);

    var RippleMixin = {
      data: function data() {
        return {
          classes: {},
          styles: {}
        };
      },
      mounted: function mounted() {
        this.ripple = new RippleBase(this);
        this.ripple.init();
      },
      beforeDestroy: function beforeDestroy() {
        this.ripple.destroy();
      }
    };

    //

    var script = {
      name: 'mdc-ripple',
      mixins: [CustomElementMixin, RippleMixin],
      props: {
        tag: String
      }
    };

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("custom-element", {
        staticClass: "mdc-ripple",
        attrs: { tag: _vm.tag, classes: _vm.classes, styles: _vm.styles }
      }, [_vm._t("default")], 2);
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = undefined;
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* component normalizer */
    function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/ripple/mdc-ripple.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component;
    }
    /* style inject */
    function __vue_create_injector__() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
      var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) el.setAttribute('media', css.media);
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) style.element.removeChild(nodes[index]);
            if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
          }
        }
      };
    }
    /* style inject SSR */

    __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

    //

    var script$1 = {
      name: 'mdc-button-base',
      mixins: [DispatchEventMixin, CustomButtonMixin, RippleMixin],
      data: function data() {
        return {
          classes: {},
          styles: {}
        };
      }
    };

    /* script */
    var __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("custom-button", _vm._g({
        ref: "root",
        class: _vm.classes,
        style: _vm.styles,
        attrs: { href: _vm.href, link: _vm.link, disabled: _vm.disabled }
      }, _vm.listeners), [_vm._t("default")], 2);
    };
    var __vue_staticRenderFns__$1 = [];
    __vue_render__$1._withStripped = true;

    /* style */
    var __vue_inject_styles__$1 = undefined;
    /* scoped */
    var __vue_scope_id__$1 = undefined;
    /* module identifier */
    var __vue_module_identifier__$1 = undefined;
    /* functional template */
    var __vue_is_functional_template__$1 = false;
    /* component normalizer */
    function __vue_normalize__$1(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/button/mdc-button-base.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component;
    }
    /* style inject */
    function __vue_create_injector__$1() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
      var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) el.setAttribute('media', css.media);
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) style.element.removeChild(nodes[index]);
            if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
          }
        }
      };
    }
    /* style inject SSR */

    var mdcButtonBase = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

    var script$2 = {
      name: 'mdc-button',
      extends: mdcButtonBase,
      props: {
        raised: Boolean,
        unelevated: Boolean,
        outlined: Boolean,
        dense: Boolean
      },
      data: function data() {
        return {
          classes: {
            'mdc-button': true,
            'mdc-button--raised': this.raised,
            'mdc-button--unelevated': this.unelevated,
            'mdc-button--outlined': this.outlined,
            'mdc-button--dense': this.dense
          }
        };
      },

      watch: {
        raised: function raised() {
          this.$set(this.classes, 'mdc-button--raised', this.raised);
        },
        unelevated: function unelevated() {
          this.$set(this.classes, 'mdc-button--unelevated', this.unelevated);
        },
        outlined: function outlined() {
          this.$set(this.classes, 'mdc-button--outlined', this.outlined);
        },
        dense: function dense() {
          this.$set(this.classes, 'mdc-button--dense', this.dense);
        }
      }
    };

    /* script */
    var __vue_script__$2 = script$2;

    /* template */

    /* style */
    var __vue_inject_styles__$2 = undefined;
    /* scoped */
    var __vue_scope_id__$2 = undefined;
    /* module identifier */
    var __vue_module_identifier__$2 = undefined;
    /* functional template */
    var __vue_is_functional_template__$2 = undefined;
    /* component normalizer */
    function __vue_normalize__$2(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/button/mdc-button.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component;
    }
    /* style inject */
    function __vue_create_injector__$2() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
      var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) el.setAttribute('media', css.media);
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) style.element.removeChild(nodes[index]);
            if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
          }
        }
      };
    }
    /* style inject SSR */

    var mdcButton = __vue_normalize__$2({}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, __vue_create_injector__$2, undefined);

    //

    var script$3 = {
      name: 'mdc-dialog',
      components: {
        mdcButton: mdcButton
      },
      mixins: [VMAUniqueIdMixin],
      model: {
        prop: 'open',
        event: 'change'
      },
      props: {
        title: { type: String },
        accept: { type: String, default: 'Ok' },
        acceptDisabled: Boolean,
        acceptRaised: { type: Boolean, default: false },
        cancel: { type: String },
        cancelRaised: { type: Boolean, default: false },
        save: { type: String },
        saveRaised: { type: Boolean, default: false },
        accent: Boolean,
        scrollable: Boolean,
        open: Boolean
      },
      data: function data() {
        return {
          classes: {
            'mdc-theme--dark': this.dark
          },
          styles: {},
          surfaceClasses: {},
          bodyClasses: {
            'mdc-dialog__body--scrollable': this.scrollable
          }
        };
      },

      watch: { open: 'onOpen_' },
      mounted: function mounted() {
        var _this = this;

        if (this.accept) {
          this.focusTrap = createFocusTrapInstance(this.$refs.surface, this.$refs.accept);
        }

        this.foundation = new MDCDialogFoundation({
          addClass: function addClass(className) {
            return _this.$set(_this.classes, className, true);
          },
          removeClass: function removeClass(className) {
            return _this.$delete(_this.classes, className);
          },
          addBodyClass: function addBodyClass(className) {
            return document.body.classList.add(className);
          },
          removeBodyClass: function removeBodyClass(className) {
            return document.body.classList.remove(className);
          },
          eventTargetHasClass: function eventTargetHasClass(target, className) {
            return target.classList.contains(className);
          },
          registerInteractionHandler: function registerInteractionHandler(evt, handler) {
            return _this.$refs.root.addEventListener(evt, handler);
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
            return _this.$refs.root.removeEventListener(evt, handler);
          },
          registerSurfaceInteractionHandler: function registerSurfaceInteractionHandler() /*evt, handler*/{
            // VMA_HACK: handle button clicks ourselves
            // this.$refs.surface.addEventListener(evt, handler)
          },
          deregisterSurfaceInteractionHandler: function deregisterSurfaceInteractionHandler() /*evt, handler*/{
            // VMA_HACK: handle button clicks ourselves
            // this.$refs.surface.removeEventListener(evt, handler)
          },
          registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
            return document.addEventListener('keydown', handler);
          },
          deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
            return document.removeEventListener('keydown', handler);
          },
          notifyAccept: function notifyAccept() {
            _this.$emit('change', false);
            _this.$emit('accept');
          },
          notifyCancel: function notifyCancel() {
            _this.$emit('change', false);
            _this.$emit('cancel');
          },
          trapFocusOnSurface: function trapFocusOnSurface() {
            return _this.focusTrap && _this.focusTrap.activate();
          },
          untrapFocusOnSurface: function untrapFocusOnSurface() {
            return _this.focusTrap && _this.focusTrap.deactivate();
          },
          isDialog: function isDialog(el) {
            return _this.$refs.surface === el;
          }
        });

        this.foundation.init();
        this.open && this.foundation.open();
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation.destroy();
      },

      methods: {
        onOpen_: function onOpen_(value) {
          if (value) {
            this.foundation.open();
          } else {
            this.foundation.close();
          }
        },
        onSave: function onSave() {
          this.$emit('save');
        },
        onCancel: function onCancel() {
          var _this2 = this;

          if (this.$listeners['validateCancel']) {
            this.$emit('validateCancel', {
              cancel: function cancel() {
                var notify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                // if notify = false, the dialog will close
                // but the notifyAccept method will not be called
                // so we need to notify listeners the open state
                // is changing.
                if (!notify) {
                  _this2.$emit('change', false);
                }
                _this2.foundation.cancel(notify);
              }
            });
          } else {
            this.foundation.cancel(true);
          }
        },
        onAccept: function onAccept() {
          var _this3 = this;

          if (this.$listeners['validate']) {
            this.$emit('validate', {
              accept: function accept() {
                var notify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                // if notify = false, the dialog will close
                // but the notifyAccept method will not be called
                // so we need to notify listeners the open state
                // is changing.
                if (!notify) {
                  _this3.$emit('change', false);
                }
                _this3.foundation.accept(notify);
              }
            });
          } else {
            this.foundation.accept(true);
          }
        },
        show: function show() {
          this.foundation.open();
        },
        close: function close() {
          this.foundation.close();
        }
      }
    };

    /* script */
    var __vue_script__$3 = script$3;

    /* template */
    var __vue_render__$2 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("aside", {
        ref: "root",
        staticClass: "mdc-dialog",
        class: _vm.classes,
        style: _vm.styles,
        attrs: {
          "aria-labelledby": "label" + _vm.vma_uid_,
          "aria-describedby": "desc" + _vm.vma_uid_,
          role: "alertdialog"
        }
      }, [_c("div", {
        ref: "surface",
        staticClass: "mdc-dialog__surface",
        class: _vm.surfaceClasses
      }, [_vm.title ? _c("header", { staticClass: "mdc-dialog__header" }, [_c("h2", {
        staticClass: "mdc-dialog__header__title",
        attrs: { id: "label" + _vm.vma_uid_ }
      }, [_vm._v("\n        " + _vm._s(_vm.title) + "\n      ")])]) : _vm._e(), _vm._v(" "), _c("section", {
        staticClass: "mdc-dialog__body",
        class: _vm.bodyClasses,
        attrs: { id: "desc" + _vm.vma_uid_ }
      }, [_vm._t("default")], 2), _vm._v(" "), _vm.accept || _vm.cancel || _vm.save ? _c("footer", { staticClass: "mdc-dialog__footer" }, [_vm.save ? _c("mdcButton", {
        ref: "save",
        staticClass: "mdc-dialog__footer__button mdc-dialog__footer__button--save",
        class: { "mdc-dialog__action": _vm.accent },
        attrs: { raised: _vm.saveRaised },
        on: { click: _vm.onSave }
      }, [_vm._v(_vm._s(_vm.save))]) : _vm._e(), _vm._v(" "), _vm.cancel ? _c("mdcButton", {
        ref: "cancel",
        staticClass: "mdc-dialog__footer__button mdc-dialog__footer__button--cancel",
        class: { "mdc-dialog__action": _vm.accent },
        attrs: { raised: _vm.cancelRaised },
        on: { click: _vm.onCancel }
      }, [_vm._v(_vm._s(_vm.cancel))]) : _vm._e(), _vm._v(" "), _c("mdcButton", {
        ref: "accept",
        staticClass: "mdc-dialog__footer__button mdc-dialog__footer__button--accept",
        class: { "mdc-dialog__action": _vm.accent },
        attrs: {
          disabled: _vm.acceptDisabled,
          raised: _vm.acceptRaised
        },
        on: { click: _vm.onAccept }
      }, [_vm._v(_vm._s(_vm.accept))])], 1) : _vm._e()]), _vm._v(" "), _c("div", { staticClass: "mdc-dialog__backdrop" })]);
    };
    var __vue_staticRenderFns__$2 = [];
    __vue_render__$2._withStripped = true;

    /* style */
    var __vue_inject_styles__$3 = undefined;
    /* scoped */
    var __vue_scope_id__$3 = undefined;
    /* module identifier */
    var __vue_module_identifier__$3 = undefined;
    /* functional template */
    var __vue_is_functional_template__$3 = false;
    /* component normalizer */
    function __vue_normalize__$3(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/dialog/mdc-dialog.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component;
    }
    /* style inject */
    function __vue_create_injector__$3() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
      var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) el.setAttribute('media', css.media);
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) style.element.removeChild(nodes[index]);
            if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
          }
        }
      };
    }
    /* style inject SSR */

    var mdcDialog = __vue_normalize__$3({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, __vue_create_injector__$3, undefined);

    var plugin = BasePlugin({
      mdcDialog: mdcDialog
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1lbGVtZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tYnV0dG9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Rpc3BhdGNoLWV2ZW50LW1peGluLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kaWFsb2cvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kaWFsb2cvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy90YWJiYWJsZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9mb2N1cy10cmFwL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kaWFsb2cvdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS91dGlsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmlwcGxlL21kYy1yaXBwbGUtYmFzZS5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmlwcGxlL21kYy1yaXBwbGUudnVlIiwiLi4vLi4vY29tcG9uZW50cy9idXR0b24vbWRjLWJ1dHRvbi1iYXNlLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL21kYy1idXR0b24udnVlIiwiLi4vLi4vY29tcG9uZW50cy9kaWFsb2cvbWRjLWRpYWxvZy52dWUiLCIuLi8uLi9jb21wb25lbnRzL2RpYWxvZy9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvZGlhbG9nL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdChwbHVnaW4pIHtcbiAgLy8gQXV0by1pbnN0YWxsXG4gIGxldCBfVnVlID0gbnVsbFxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxuICB9XG4gIGlmIChfVnVlKSB7XG4gICAgX1Z1ZS51c2UocGx1Z2luKVxuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbihjb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiB2bSA9PiB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXG4gICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSwgY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgQ3VzdG9tRWxlbWVudCA9IHtcbiAgZnVuY3Rpb25hbDogdHJ1ZSxcbiAgcmVuZGVyKGNyZWF0ZUVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudChcbiAgICAgIGNvbnRleHQucHJvcHMuaXMgfHwgY29udGV4dC5wcm9wcy50YWcgfHwgJ2RpdicsXG4gICAgICBjb250ZXh0LmRhdGEsXG4gICAgICBjb250ZXh0LmNoaWxkcmVuXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBDdXN0b21FbGVtZW50TWl4aW4gPSB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBDdXN0b21FbGVtZW50XG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50KGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICBsZXQgZXZ0XG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcbn1cbiIsImV4cG9ydCBjb25zdCBDdXN0b21CdXR0b24gPSB7XG4gIG5hbWU6ICdjdXN0b20tYnV0dG9uJyxcbiAgZnVuY3Rpb25hbDogdHJ1ZSxcbiAgcHJvcHM6IHtcbiAgICBsaW5rOiBPYmplY3RcbiAgfSxcbiAgcmVuZGVyKGgsIGNvbnRleHQpIHtcbiAgICBsZXQgZWxlbWVudFxuICAgIGxldCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGV4dC5kYXRhKVxuXG4gICAgaWYgKGNvbnRleHQucHJvcHMubGluayAmJiBjb250ZXh0LnBhcmVudC4kcm91dGVyKSB7XG4gICAgICAvLyByb3V0ZXItbGluayBjYXNlXG4gICAgICBlbGVtZW50ID0gY29udGV4dC5wYXJlbnQuJHJvb3QuJG9wdGlvbnMuY29tcG9uZW50c1sncm91dGVyLWxpbmsnXVxuICAgICAgZGF0YS5wcm9wcyA9IE9iamVjdC5hc3NpZ24oeyB0YWc6IGNvbnRleHQucHJvcHMudGFnIH0sIGNvbnRleHQucHJvcHMubGluaylcbiAgICAgIGRhdGEuYXR0cnMucm9sZSA9ICdidXR0b24nXG4gICAgICBpZiAoZGF0YS5vbi5jbGljaykge1xuICAgICAgICBkYXRhLm5hdGl2ZU9uID0geyBjbGljazogZGF0YS5vbi5jbGljayB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkYXRhLmF0dHJzICYmIGRhdGEuYXR0cnMuaHJlZikge1xuICAgICAgLy8gaHJlZiBjYXNlXG4gICAgICBlbGVtZW50ID0gJ2EnXG4gICAgICBkYXRhLmF0dHJzLnJvbGUgPSAnYnV0dG9uJ1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBidXR0b24gZmFsbGJhY2tcbiAgICAgIGVsZW1lbnQgPSAnYnV0dG9uJ1xuICAgIH1cblxuICAgIHJldHVybiBoKGVsZW1lbnQsIGRhdGEsIGNvbnRleHQuY2hpbGRyZW4pXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEN1c3RvbUJ1dHRvbk1peGluID0ge1xuICBwcm9wczoge1xuICAgIGhyZWY6IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICB0bzogW1N0cmluZywgT2JqZWN0XSxcbiAgICBleGFjdDogQm9vbGVhbixcbiAgICBhcHBlbmQ6IEJvb2xlYW4sXG4gICAgcmVwbGFjZTogQm9vbGVhbixcbiAgICBhY3RpdmVDbGFzczogU3RyaW5nLFxuICAgIGV4YWN0QWN0aXZlQ2xhc3M6IFN0cmluZ1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGxpbmsoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLnRvICYmIHtcbiAgICAgICAgICB0bzogdGhpcy50byxcbiAgICAgICAgICBleGFjdDogdGhpcy5leGFjdCxcbiAgICAgICAgICBhcHBlbmQ6IHRoaXMuYXBwZW5kLFxuICAgICAgICAgIHJlcGxhY2U6IHRoaXMucmVwbGFjZSxcbiAgICAgICAgICBhY3RpdmVDbGFzczogdGhpcy5hY3RpdmVDbGFzcyxcbiAgICAgICAgICBleGFjdEFjdGl2ZUNsYXNzOiB0aGlzLmV4YWN0QWN0aXZlQ2xhc3NcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50czoge1xuICAgIEN1c3RvbUJ1dHRvblxuICB9XG59XG4iLCJleHBvcnQgY29uc3QgRGlzcGF0Y2hFdmVudE1peGluID0ge1xuICBwcm9wczoge1xuICAgIGV2ZW50OiBTdHJpbmcsXG4gICAgJ2V2ZW50LXRhcmdldCc6IE9iamVjdCxcbiAgICAnZXZlbnQtYXJncyc6IEFycmF5XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBkaXNwYXRjaEV2ZW50KGV2dCkge1xuICAgICAgZXZ0ICYmIHRoaXMuJGVtaXQoZXZ0LnR5cGUsIGV2dClcbiAgICAgIGlmICh0aGlzLmV2ZW50KSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmV2ZW50VGFyZ2V0IHx8IHRoaXMuJHJvb3RcbiAgICAgICAgbGV0IGFyZ3MgPSB0aGlzLmV2ZW50QXJncyB8fCBbXVxuICAgICAgICB0YXJnZXQuJGVtaXQodGhpcy5ldmVudCwgLi4uYXJncylcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgbGlzdGVuZXJzKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICBjbGljazogZSA9PiB0aGlzLmRpc3BhdGNoRXZlbnQoZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImNvbnN0IHNjb3BlID1cbiAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcigweDEwMDAwMDAwKSkudG9TdHJpbmcoKSArICctJ1xuXG5leHBvcnQgY29uc3QgVk1BVW5pcXVlSWRNaXhpbiA9IHtcbiAgYmVmb3JlQ3JlYXRlKCkge1xuICAgIHRoaXMudm1hX3VpZF8gPSBzY29wZSArIHRoaXMuX3VpZFxuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5cbi8qKlxuICogQHRlbXBsYXRlIEZcbiAqL1xuY2xhc3MgTURDQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHJldHVybiB7IU1EQ0NvbXBvbmVudH1cbiAgICovXG4gIHN0YXRpYyBhdHRhY2hUbyhyb290KSB7XG4gICAgLy8gU3ViY2xhc3NlcyB3aGljaCBleHRlbmQgTURDQmFzZSBzaG91bGQgcHJvdmlkZSBhbiBhdHRhY2hUbygpIG1ldGhvZCB0aGF0IHRha2VzIGEgcm9vdCBlbGVtZW50IGFuZFxuICAgIC8vIHJldHVybnMgYW4gaW5zdGFudGlhdGVkIGNvbXBvbmVudCB3aXRoIGl0cyByb290IHNldCB0byB0aGF0IGVsZW1lbnQuIEFsc28gbm90ZSB0aGF0IGluIHRoZSBjYXNlcyBvZlxuICAgIC8vIHN1YmNsYXNzZXMsIGFuIGV4cGxpY2l0IGZvdW5kYXRpb24gY2xhc3Mgd2lsbCBub3QgaGF2ZSB0byBiZSBwYXNzZWQgaW47IGl0IHdpbGwgc2ltcGx5IGJlIGluaXRpYWxpemVkXG4gICAgLy8gZnJvbSBnZXREZWZhdWx0Rm91bmRhdGlvbigpLlxuICAgIHJldHVybiBuZXcgTURDQ29tcG9uZW50KHJvb3QsIG5ldyBNRENGb3VuZGF0aW9uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHBhcmFtIHtGPX0gZm91bmRhdGlvblxuICAgKiBAcGFyYW0gey4uLj99IGFyZ3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKHJvb3QsIGZvdW5kYXRpb24gPSB1bmRlZmluZWQsIC4uLmFyZ3MpIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUVsZW1lbnR9ICovXG4gICAgdGhpcy5yb290XyA9IHJvb3Q7XG4gICAgdGhpcy5pbml0aWFsaXplKC4uLmFyZ3MpO1xuICAgIC8vIE5vdGUgdGhhdCB3ZSBpbml0aWFsaXplIGZvdW5kYXRpb24gaGVyZSBhbmQgbm90IHdpdGhpbiB0aGUgY29uc3RydWN0b3IncyBkZWZhdWx0IHBhcmFtIHNvIHRoYXRcbiAgICAvLyB0aGlzLnJvb3RfIGlzIGRlZmluZWQgYW5kIGNhbiBiZSB1c2VkIHdpdGhpbiB0aGUgZm91bmRhdGlvbiBjbGFzcy5cbiAgICAvKiogQHByb3RlY3RlZCB7IUZ9ICovXG4gICAgdGhpcy5mb3VuZGF0aW9uXyA9IGZvdW5kYXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSA6IGZvdW5kYXRpb247XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5pbml0KCk7XG4gICAgdGhpcy5pbml0aWFsU3luY1dpdGhET00oKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoLyogLi4uYXJncyAqLykge1xuICAgIC8vIFN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgdG8gZG8gYW55IGFkZGl0aW9uYWwgc2V0dXAgd29yayB0aGF0IHdvdWxkIGJlIGNvbnNpZGVyZWQgcGFydCBvZiBhXG4gICAgLy8gXCJjb25zdHJ1Y3RvclwiLiBFc3NlbnRpYWxseSwgaXQgaXMgYSBob29rIGludG8gdGhlIHBhcmVudCBjb25zdHJ1Y3RvciBiZWZvcmUgdGhlIGZvdW5kYXRpb24gaXNcbiAgICAvLyBpbml0aWFsaXplZC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIGJlc2lkZXMgcm9vdCBhbmQgZm91bmRhdGlvbiB3aWxsIGJlIHBhc3NlZCBpbiBoZXJlLlxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFGfSBmb3VuZGF0aW9uXG4gICAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCBmb3VuZGF0aW9uIGNsYXNzIGZvciB0aGVcbiAgICAvLyBjb21wb25lbnQuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgZ2V0RGVmYXVsdEZvdW5kYXRpb24gdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCAnICtcbiAgICAgICdmb3VuZGF0aW9uIGNsYXNzJyk7XG4gIH1cblxuICBpbml0aWFsU3luY1dpdGhET00oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaWYgdGhleSBuZWVkIHRvIHBlcmZvcm0gd29yayB0byBzeW5jaHJvbml6ZSB3aXRoIGEgaG9zdCBET01cbiAgICAvLyBvYmplY3QuIEFuIGV4YW1wbGUgb2YgdGhpcyB3b3VsZCBiZSBhIGZvcm0gY29udHJvbCB3cmFwcGVyIHRoYXQgbmVlZHMgdG8gc3luY2hyb25pemUgaXRzIGludGVybmFsIHN0YXRlXG4gICAgLy8gdG8gc29tZSBwcm9wZXJ0eSBvciBhdHRyaWJ1dGUgb2YgdGhlIGhvc3QgRE9NLiBQbGVhc2Ugbm90ZTogdGhpcyBpcyAqbm90KiB0aGUgcGxhY2UgdG8gcGVyZm9ybSBET01cbiAgICAvLyByZWFkcy93cml0ZXMgdGhhdCB3b3VsZCBjYXVzZSBsYXlvdXQgLyBwYWludCwgYXMgdGhpcyBpcyBjYWxsZWQgc3luY2hyb25vdXNseSBmcm9tIHdpdGhpbiB0aGUgY29uc3RydWN0b3IuXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbWF5IGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZWxlYXNlIGFueSByZXNvdXJjZXMgLyBkZXJlZ2lzdGVyIGFueSBsaXN0ZW5lcnMgdGhleSBoYXZlXG4gICAgLy8gYXR0YWNoZWQuIEFuIGV4YW1wbGUgb2YgdGhpcyBtaWdodCBiZSBkZXJlZ2lzdGVyaW5nIGEgcmVzaXplIGV2ZW50IGZyb20gdGhlIHdpbmRvdyBvYmplY3QuXG4gICAgdGhpcy5mb3VuZGF0aW9uXy5kZXN0cm95KCk7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiBsaXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBsaXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byByZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIHVubGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgdW5saXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlcyBhIGNyb3NzLWJyb3dzZXItY29tcGF0aWJsZSBjdXN0b20gZXZlbnQgZnJvbSB0aGUgY29tcG9uZW50IHJvb3Qgb2YgdGhlIGdpdmVuIHR5cGUsXG4gICAqIHdpdGggdGhlIGdpdmVuIGRhdGEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IU9iamVjdH0gZXZ0RGF0YVxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBzaG91bGRCdWJibGVcbiAgICovXG4gIGVtaXQoZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgICBsZXQgZXZ0O1xuICAgIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLnJvb3RfLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENDb21wb25lbnQ7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQnO1xuXG5leHBvcnQge01EQ0ZvdW5kYXRpb24sIE1EQ0NvbXBvbmVudH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBST09UOiAnbWRjLWRpYWxvZycsXG4gIE9QRU46ICdtZGMtZGlhbG9nLS1vcGVuJyxcbiAgQU5JTUFUSU5HOiAnbWRjLWRpYWxvZy0tYW5pbWF0aW5nJyxcbiAgQkFDS0RST1A6ICdtZGMtZGlhbG9nX19iYWNrZHJvcCcsXG4gIFNDUk9MTF9MT0NLOiAnbWRjLWRpYWxvZy1zY3JvbGwtbG9jaycsXG4gIEFDQ0VQVF9CVE46ICdtZGMtZGlhbG9nX19mb290ZXJfX2J1dHRvbi0tYWNjZXB0JyxcbiAgQ0FOQ0VMX0JUTjogJ21kYy1kaWFsb2dfX2Zvb3Rlcl9fYnV0dG9uLS1jYW5jZWwnLFxufTtcblxuY29uc3Qgc3RyaW5ncyA9IHtcbiAgT1BFTl9ESUFMT0dfU0VMRUNUT1I6ICcubWRjLWRpYWxvZy0tb3BlbicsXG4gIERJQUxPR19TVVJGQUNFX1NFTEVDVE9SOiAnLm1kYy1kaWFsb2dfX3N1cmZhY2UnLFxuICBBQ0NFUFRfU0VMRUNUT1I6ICcubWRjLWRpYWxvZ19fZm9vdGVyX19idXR0b24tLWFjY2VwdCcsXG4gIEFDQ0VQVF9FVkVOVDogJ01EQ0RpYWxvZzphY2NlcHQnLFxuICBDQU5DRUxfRVZFTlQ6ICdNRENEaWFsb2c6Y2FuY2VsJyxcbn07XG5cbmNvbnN0IG51bWJlcnMgPSB7XG4gIERJQUxPR19BTklNQVRJT05fVElNRV9NUzogMTIwLFxufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7TURDRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvaW5kZXgnO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1EQ0RpYWxvZ0ZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gKHtcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBhZGRCb2R5Q2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVCb2R5Q2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBldmVudFRhcmdldEhhc0NsYXNzOiAoLyogdGFyZ2V0OiBFdmVudFRhcmdldCwgY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IC8qIGJvb2xlYW4gKi8gZmFsc2UsXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dDogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnQ6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclN1cmZhY2VJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnQ6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyU3VyZmFjZUludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dDogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIG5vdGlmeUFjY2VwdDogKCkgPT4ge30sXG4gICAgICBub3RpZnlDYW5jZWw6ICgpID0+IHt9LFxuICAgICAgdHJhcEZvY3VzT25TdXJmYWNlOiAoKSA9PiB7fSxcbiAgICAgIHVudHJhcEZvY3VzT25TdXJmYWNlOiAoKSA9PiB7fSxcbiAgICAgIGlzRGlhbG9nOiAoLyogZWw6IEVsZW1lbnQgKi8pID0+IC8qIGJvb2xlYW4gKi8gZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENEaWFsb2dGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG4gICAgdGhpcy5pc09wZW5fID0gZmFsc2U7XG4gICAgdGhpcy5jb21wb25lbnRDbGlja0hhbmRsZXJfID0gKGV2dCkgPT4ge1xuICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uZXZlbnRUYXJnZXRIYXNDbGFzcyhldnQudGFyZ2V0LCBjc3NDbGFzc2VzLkJBQ0tEUk9QKSkge1xuICAgICAgICB0aGlzLmNhbmNlbCh0cnVlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuZGlhbG9nQ2xpY2tIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlRGlhbG9nQ2xpY2tfKGV2dCk7XG4gICAgdGhpcy5kb2N1bWVudEtleWRvd25IYW5kbGVyXyA9IChldnQpID0+IHtcbiAgICAgIGlmIChldnQua2V5ICYmIGV2dC5rZXkgPT09ICdFc2NhcGUnIHx8IGV2dC5rZXlDb2RlID09PSAyNykge1xuICAgICAgICB0aGlzLmNhbmNlbCh0cnVlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy50aW1lcklkXyA9IDA7XG4gICAgdGhpcy5hbmltYXRpb25UaW1lckVuZF8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZUFuaW1hdGlvblRpbWVyRW5kXyhldnQpO1xuICB9O1xuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gRW5zdXJlIHRoYXQgZGlhbG9nIGlzIGNsZWFuZWQgdXAgd2hlbiBkZXN0cm95ZWRcbiAgICBpZiAodGhpcy5pc09wZW5fKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICAgIC8vIEZpbmFsIGNsZWFudXAgb2YgYW5pbWF0aW5nIGNsYXNzIGluIGNhc2UgdGhlIHRpbWVyIGhhcyBub3QgY29tcGxldGVkLlxuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDRGlhbG9nRm91bmRhdGlvbi5jc3NDbGFzc2VzLkFOSU1BVElORyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXJJZF8pO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLmlzT3Blbl8gPSB0cnVlO1xuICAgIHRoaXMuZGlzYWJsZVNjcm9sbF8oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcih0aGlzLmRvY3VtZW50S2V5ZG93bkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyU3VyZmFjZUludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmRpYWxvZ0NsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5jb21wb25lbnRDbGlja0hhbmRsZXJfKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcklkXyk7XG4gICAgdGhpcy50aW1lcklkXyA9IHNldFRpbWVvdXQodGhpcy5hbmltYXRpb25UaW1lckVuZF8sIE1EQ0RpYWxvZ0ZvdW5kYXRpb24ubnVtYmVycy5ESUFMT0dfQU5JTUFUSU9OX1RJTUVfTVMpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDRGlhbG9nRm91bmRhdGlvbi5jc3NDbGFzc2VzLkFOSU1BVElORyk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENEaWFsb2dGb3VuZGF0aW9uLmNzc0NsYXNzZXMuT1BFTik7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLmlzT3Blbl8gPSBmYWxzZTtcbiAgICB0aGlzLmVuYWJsZVNjcm9sbF8oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJTdXJmYWNlSW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuZGlhbG9nQ2xpY2tIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcih0aGlzLmRvY3VtZW50S2V5ZG93bkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5jb21wb25lbnRDbGlja0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVudHJhcEZvY3VzT25TdXJmYWNlKCk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXJJZF8pO1xuICAgIHRoaXMudGltZXJJZF8gPSBzZXRUaW1lb3V0KHRoaXMuYW5pbWF0aW9uVGltZXJFbmRfLCBNRENEaWFsb2dGb3VuZGF0aW9uLm51bWJlcnMuRElBTE9HX0FOSU1BVElPTl9USU1FX01TKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ0RpYWxvZ0ZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkcpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDRGlhbG9nRm91bmRhdGlvbi5jc3NDbGFzc2VzLk9QRU4pO1xuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIHJldHVybiB0aGlzLmlzT3Blbl87XG4gIH1cblxuICBhY2NlcHQoc2hvdWxkTm90aWZ5KSB7XG4gICAgaWYgKHNob3VsZE5vdGlmeSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlBY2NlcHQoKTtcbiAgICB9XG5cbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBjYW5jZWwoc2hvdWxkTm90aWZ5KSB7XG4gICAgaWYgKHNob3VsZE5vdGlmeSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlDYW5jZWwoKTtcbiAgICB9XG5cbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBoYW5kbGVEaWFsb2dDbGlja18oZXZ0KSB7XG4gICAgY29uc3Qge3RhcmdldH0gPSBldnQ7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uZXZlbnRUYXJnZXRIYXNDbGFzcyh0YXJnZXQsIGNzc0NsYXNzZXMuQUNDRVBUX0JUTikpIHtcbiAgICAgIHRoaXMuYWNjZXB0KHRydWUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hZGFwdGVyXy5ldmVudFRhcmdldEhhc0NsYXNzKHRhcmdldCwgY3NzQ2xhc3Nlcy5DQU5DRUxfQlROKSkge1xuICAgICAgdGhpcy5jYW5jZWwodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQW5pbWF0aW9uVGltZXJFbmRfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDRGlhbG9nRm91bmRhdGlvbi5jc3NDbGFzc2VzLkFOSU1BVElORyk7XG4gICAgaWYgKHRoaXMuaXNPcGVuXykge1xuICAgICAgdGhpcy5hZGFwdGVyXy50cmFwRm9jdXNPblN1cmZhY2UoKTtcbiAgICB9XG4gIH07XG5cbiAgZGlzYWJsZVNjcm9sbF8oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRCb2R5Q2xhc3MoY3NzQ2xhc3Nlcy5TQ1JPTExfTE9DSyk7XG4gIH1cblxuICBlbmFibGVTY3JvbGxfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQm9keUNsYXNzKGNzc0NsYXNzZXMuU0NST0xMX0xPQ0spO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBlbGVtZW50RG9jdW1lbnQgPSBlbC5vd25lckRvY3VtZW50IHx8IGVsO1xuICB2YXIgYmFzaWNUYWJiYWJsZXMgPSBbXTtcbiAgdmFyIG9yZGVyZWRUYWJiYWJsZXMgPSBbXTtcblxuICAvLyBBIG5vZGUgaXMgXCJhdmFpbGFibGVcIiBpZlxuICAvLyAtIGl0J3MgY29tcHV0ZWQgc3R5bGVcbiAgdmFyIGlzVW5hdmFpbGFibGUgPSBjcmVhdGVJc1VuYXZhaWxhYmxlKGVsZW1lbnREb2N1bWVudCk7XG5cbiAgdmFyIGNhbmRpZGF0ZVNlbGVjdG9ycyA9IFtcbiAgICAnaW5wdXQnLFxuICAgICdzZWxlY3QnLFxuICAgICdhW2hyZWZdJyxcbiAgICAndGV4dGFyZWEnLFxuICAgICdidXR0b24nLFxuICAgICdbdGFiaW5kZXhdJyxcbiAgXTtcblxuICB2YXIgY2FuZGlkYXRlcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoY2FuZGlkYXRlU2VsZWN0b3JzLmpvaW4oJywnKSk7XG5cbiAgaWYgKG9wdGlvbnMuaW5jbHVkZUNvbnRhaW5lcikge1xuICAgIHZhciBtYXRjaGVzID0gRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyB8fCBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3I7XG5cbiAgICBpZiAoXG4gICAgICBjYW5kaWRhdGVTZWxlY3RvcnMuc29tZShmdW5jdGlvbihjYW5kaWRhdGVTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gbWF0Y2hlcy5jYWxsKGVsLCBjYW5kaWRhdGVTZWxlY3Rvcik7XG4gICAgICB9KVxuICAgICkge1xuICAgICAgY2FuZGlkYXRlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShjYW5kaWRhdGVzKTtcbiAgICAgIGNhbmRpZGF0ZXMudW5zaGlmdChlbCk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNhbmRpZGF0ZSwgY2FuZGlkYXRlSW5kZXhBdHRyLCBjYW5kaWRhdGVJbmRleDtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBjYW5kaWRhdGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNhbmRpZGF0ZSA9IGNhbmRpZGF0ZXNbaV07XG4gICAgY2FuZGlkYXRlSW5kZXhBdHRyID0gcGFyc2VJbnQoY2FuZGlkYXRlLmdldEF0dHJpYnV0ZSgndGFiaW5kZXgnKSwgMTApXG4gICAgY2FuZGlkYXRlSW5kZXggPSBpc05hTihjYW5kaWRhdGVJbmRleEF0dHIpID8gY2FuZGlkYXRlLnRhYkluZGV4IDogY2FuZGlkYXRlSW5kZXhBdHRyO1xuXG4gICAgaWYgKFxuICAgICAgY2FuZGlkYXRlSW5kZXggPCAwXG4gICAgICB8fCAoY2FuZGlkYXRlLnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgY2FuZGlkYXRlLnR5cGUgPT09ICdoaWRkZW4nKVxuICAgICAgfHwgY2FuZGlkYXRlLmRpc2FibGVkXG4gICAgICB8fCBpc1VuYXZhaWxhYmxlKGNhbmRpZGF0ZSwgZWxlbWVudERvY3VtZW50KVxuICAgICkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNhbmRpZGF0ZUluZGV4ID09PSAwKSB7XG4gICAgICBiYXNpY1RhYmJhYmxlcy5wdXNoKGNhbmRpZGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9yZGVyZWRUYWJiYWJsZXMucHVzaCh7XG4gICAgICAgIGluZGV4OiBpLFxuICAgICAgICB0YWJJbmRleDogY2FuZGlkYXRlSW5kZXgsXG4gICAgICAgIG5vZGU6IGNhbmRpZGF0ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHZhciB0YWJiYWJsZU5vZGVzID0gb3JkZXJlZFRhYmJhYmxlc1xuICAgIC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiBhLnRhYkluZGV4ID09PSBiLnRhYkluZGV4ID8gYS5pbmRleCAtIGIuaW5kZXggOiBhLnRhYkluZGV4IC0gYi50YWJJbmRleDtcbiAgICB9KVxuICAgIC5tYXAoZnVuY3Rpb24oYSkge1xuICAgICAgcmV0dXJuIGEubm9kZVxuICAgIH0pO1xuXG4gIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRhYmJhYmxlTm9kZXMsIGJhc2ljVGFiYmFibGVzKTtcblxuICByZXR1cm4gdGFiYmFibGVOb2Rlcztcbn1cblxuZnVuY3Rpb24gY3JlYXRlSXNVbmF2YWlsYWJsZShlbGVtZW50RG9jdW1lbnQpIHtcbiAgLy8gTm9kZSBjYWNoZSBtdXN0IGJlIHJlZnJlc2hlZCBvbiBldmVyeSBjaGVjaywgaW4gY2FzZVxuICAvLyB0aGUgY29udGVudCBvZiB0aGUgZWxlbWVudCBoYXMgY2hhbmdlZFxuICB2YXIgaXNPZmZDYWNoZSA9IFtdO1xuXG4gIC8vIFwib2ZmXCIgbWVhbnMgYGRpc3BsYXk6IG5vbmU7YCwgYXMgb3Bwb3NlZCB0byBcImhpZGRlblwiLFxuICAvLyB3aGljaCBtZWFucyBgdmlzaWJpbGl0eTogaGlkZGVuO2AuIGdldENvbXB1dGVkU3R5bGVcbiAgLy8gYWNjdXJhdGVseSByZWZsZWN0cyB2aXNpYmxpdHkgaW4gY29udGV4dCBidXQgbm90XG4gIC8vIFwib2ZmXCIgc3RhdGUsIHNvIHdlIG5lZWQgdG8gcmVjdXJzaXZlbHkgY2hlY2sgcGFyZW50cy5cblxuICBmdW5jdGlvbiBpc09mZihub2RlLCBub2RlQ29tcHV0ZWRTdHlsZSkge1xuICAgIGlmIChub2RlID09PSBlbGVtZW50RG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBGaW5kIHRoZSBjYWNoZWQgbm9kZSAoQXJyYXkucHJvdG90eXBlLmZpbmQgbm90IGF2YWlsYWJsZSBpbiBJRTkpXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGlzT2ZmQ2FjaGUubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpc09mZkNhY2hlW2ldWzBdID09PSBub2RlKSByZXR1cm4gaXNPZmZDYWNoZVtpXVsxXTtcbiAgICB9XG5cbiAgICBub2RlQ29tcHV0ZWRTdHlsZSA9IG5vZGVDb21wdXRlZFN0eWxlIHx8IGVsZW1lbnREb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuXG4gICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuXG4gICAgaWYgKG5vZGVDb21wdXRlZFN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgcmVzdWx0ID0gaXNPZmYobm9kZS5wYXJlbnROb2RlKTtcbiAgICB9XG5cbiAgICBpc09mZkNhY2hlLnB1c2goW25vZGUsIHJlc3VsdF0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBpc1VuYXZhaWxhYmxlKG5vZGUpIHtcbiAgICBpZiAobm9kZSA9PT0gZWxlbWVudERvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIGNvbXB1dGVkU3R5bGUgPSBlbGVtZW50RG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcblxuICAgIGlmIChpc09mZihub2RlLCBjb21wdXRlZFN0eWxlKSkgcmV0dXJuIHRydWU7XG5cbiAgICByZXR1cm4gY29tcHV0ZWRTdHlsZS52aXNpYmlsaXR5ID09PSAnaGlkZGVuJztcbiAgfVxufVxuIiwidmFyIHRhYmJhYmxlID0gcmVxdWlyZSgndGFiYmFibGUnKTtcblxudmFyIGxpc3RlbmluZ0ZvY3VzVHJhcCA9IG51bGw7XG5cbmZ1bmN0aW9uIGZvY3VzVHJhcChlbGVtZW50LCB1c2VyT3B0aW9ucykge1xuICB2YXIgdGFiYmFibGVOb2RlcyA9IFtdO1xuICB2YXIgZmlyc3RUYWJiYWJsZU5vZGUgPSBudWxsO1xuICB2YXIgbGFzdFRhYmJhYmxlTm9kZSA9IG51bGw7XG4gIHZhciBub2RlRm9jdXNlZEJlZm9yZUFjdGl2YXRpb24gPSBudWxsO1xuICB2YXIgYWN0aXZlID0gZmFsc2U7XG4gIHZhciBwYXVzZWQgPSBmYWxzZTtcbiAgdmFyIHRhYkV2ZW50ID0gbnVsbDtcblxuICB2YXIgY29udGFpbmVyID0gKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJylcbiAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudClcbiAgICA6IGVsZW1lbnQ7XG5cbiAgdmFyIGNvbmZpZyA9IHVzZXJPcHRpb25zIHx8IHt9O1xuICBjb25maWcucmV0dXJuRm9jdXNPbkRlYWN0aXZhdGUgPSAodXNlck9wdGlvbnMgJiYgdXNlck9wdGlvbnMucmV0dXJuRm9jdXNPbkRlYWN0aXZhdGUgIT09IHVuZGVmaW5lZClcbiAgICA/IHVzZXJPcHRpb25zLnJldHVybkZvY3VzT25EZWFjdGl2YXRlXG4gICAgOiB0cnVlO1xuICBjb25maWcuZXNjYXBlRGVhY3RpdmF0ZXMgPSAodXNlck9wdGlvbnMgJiYgdXNlck9wdGlvbnMuZXNjYXBlRGVhY3RpdmF0ZXMgIT09IHVuZGVmaW5lZClcbiAgICA/IHVzZXJPcHRpb25zLmVzY2FwZURlYWN0aXZhdGVzXG4gICAgOiB0cnVlO1xuXG4gIHZhciB0cmFwID0ge1xuICAgIGFjdGl2YXRlOiBhY3RpdmF0ZSxcbiAgICBkZWFjdGl2YXRlOiBkZWFjdGl2YXRlLFxuICAgIHBhdXNlOiBwYXVzZSxcbiAgICB1bnBhdXNlOiB1bnBhdXNlLFxuICB9O1xuXG4gIHJldHVybiB0cmFwO1xuXG4gIGZ1bmN0aW9uIGFjdGl2YXRlKGFjdGl2YXRlT3B0aW9ucykge1xuICAgIGlmIChhY3RpdmUpIHJldHVybjtcblxuICAgIHZhciBkZWZhdWx0ZWRBY3RpdmF0ZU9wdGlvbnMgPSB7XG4gICAgICBvbkFjdGl2YXRlOiAoYWN0aXZhdGVPcHRpb25zICYmIGFjdGl2YXRlT3B0aW9ucy5vbkFjdGl2YXRlICE9PSB1bmRlZmluZWQpXG4gICAgICAgID8gYWN0aXZhdGVPcHRpb25zLm9uQWN0aXZhdGVcbiAgICAgICAgOiBjb25maWcub25BY3RpdmF0ZSxcbiAgICB9O1xuXG4gICAgYWN0aXZlID0gdHJ1ZTtcbiAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICBub2RlRm9jdXNlZEJlZm9yZUFjdGl2YXRpb24gPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgaWYgKGRlZmF1bHRlZEFjdGl2YXRlT3B0aW9ucy5vbkFjdGl2YXRlKSB7XG4gICAgICBkZWZhdWx0ZWRBY3RpdmF0ZU9wdGlvbnMub25BY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIGFkZExpc3RlbmVycygpO1xuICAgIHJldHVybiB0cmFwO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVhY3RpdmF0ZShkZWFjdGl2YXRlT3B0aW9ucykge1xuICAgIGlmICghYWN0aXZlKSByZXR1cm47XG5cbiAgICB2YXIgZGVmYXVsdGVkRGVhY3RpdmF0ZU9wdGlvbnMgPSB7XG4gICAgICByZXR1cm5Gb2N1czogKGRlYWN0aXZhdGVPcHRpb25zICYmIGRlYWN0aXZhdGVPcHRpb25zLnJldHVybkZvY3VzICE9PSB1bmRlZmluZWQpXG4gICAgICAgID8gZGVhY3RpdmF0ZU9wdGlvbnMucmV0dXJuRm9jdXNcbiAgICAgICAgOiBjb25maWcucmV0dXJuRm9jdXNPbkRlYWN0aXZhdGUsXG4gICAgICBvbkRlYWN0aXZhdGU6IChkZWFjdGl2YXRlT3B0aW9ucyAmJiBkZWFjdGl2YXRlT3B0aW9ucy5vbkRlYWN0aXZhdGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgPyBkZWFjdGl2YXRlT3B0aW9ucy5vbkRlYWN0aXZhdGVcbiAgICAgICAgOiBjb25maWcub25EZWFjdGl2YXRlLFxuICAgIH07XG5cbiAgICByZW1vdmVMaXN0ZW5lcnMoKTtcblxuICAgIGlmIChkZWZhdWx0ZWREZWFjdGl2YXRlT3B0aW9ucy5vbkRlYWN0aXZhdGUpIHtcbiAgICAgIGRlZmF1bHRlZERlYWN0aXZhdGVPcHRpb25zLm9uRGVhY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIGlmIChkZWZhdWx0ZWREZWFjdGl2YXRlT3B0aW9ucy5yZXR1cm5Gb2N1cykge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeUZvY3VzKG5vZGVGb2N1c2VkQmVmb3JlQWN0aXZhdGlvbik7XG4gICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgIGlmIChwYXVzZWQgfHwgIWFjdGl2ZSkgcmV0dXJuO1xuICAgIHBhdXNlZCA9IHRydWU7XG4gICAgcmVtb3ZlTGlzdGVuZXJzKCk7XG4gIH1cblxuICBmdW5jdGlvbiB1bnBhdXNlKCkge1xuICAgIGlmICghcGF1c2VkIHx8ICFhY3RpdmUpIHJldHVybjtcbiAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICBhZGRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcbiAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuO1xuXG4gICAgLy8gVGhlcmUgY2FuIGJlIG9ubHkgb25lIGxpc3RlbmluZyBmb2N1cyB0cmFwIGF0IGEgdGltZVxuICAgIGlmIChsaXN0ZW5pbmdGb2N1c1RyYXApIHtcbiAgICAgIGxpc3RlbmluZ0ZvY3VzVHJhcC5wYXVzZSgpO1xuICAgIH1cbiAgICBsaXN0ZW5pbmdGb2N1c1RyYXAgPSB0cmFwO1xuXG4gICAgdXBkYXRlVGFiYmFibGVOb2RlcygpO1xuICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBmb2N1c2VkIGVsZW1lbnQgZG9lc24ndCBjYXB0dXJlIHRoZSBldmVudCB0aGF0IGNhdXNlZCB0aGUgZm9jdXMgdHJhcCBhY3RpdmF0aW9uXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICB0cnlGb2N1cyhmaXJzdEZvY3VzTm9kZSgpKTtcbiAgICB9LCAwKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGNoZWNrRm9jdXMsIHRydWUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDbGljaywgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgY2hlY2tQb2ludGVyRG93biwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGNoZWNrUG9pbnRlckRvd24sIHRydWUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjaGVja0tleSwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gdHJhcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICBpZiAoIWFjdGl2ZSB8fCBsaXN0ZW5pbmdGb2N1c1RyYXAgIT09IHRyYXApIHJldHVybjtcblxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgY2hlY2tGb2N1cywgdHJ1ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NsaWNrLCB0cnVlKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBjaGVja1BvaW50ZXJEb3duLCB0cnVlKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgY2hlY2tQb2ludGVyRG93biwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGNoZWNrS2V5LCB0cnVlKTtcblxuICAgIGxpc3RlbmluZ0ZvY3VzVHJhcCA9IG51bGw7XG5cbiAgICByZXR1cm4gdHJhcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE5vZGVGb3JPcHRpb24ob3B0aW9uTmFtZSkge1xuICAgIHZhciBvcHRpb25WYWx1ZSA9IGNvbmZpZ1tvcHRpb25OYW1lXTtcbiAgICB2YXIgbm9kZSA9IG9wdGlvblZhbHVlO1xuICAgIGlmICghb3B0aW9uVmFsdWUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdGlvblZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgbm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9uVmFsdWUpO1xuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYCcgKyBvcHRpb25OYW1lICsgJ2AgcmVmZXJzIHRvIG5vIGtub3duIG5vZGUnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRpb25WYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbm9kZSA9IG9wdGlvblZhbHVlKCk7XG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgJyArIG9wdGlvbk5hbWUgKyAnYCBkaWQgbm90IHJldHVybiBhIG5vZGUnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBmdW5jdGlvbiBmaXJzdEZvY3VzTm9kZSgpIHtcbiAgICB2YXIgbm9kZTtcbiAgICBpZiAoZ2V0Tm9kZUZvck9wdGlvbignaW5pdGlhbEZvY3VzJykgIT09IG51bGwpIHtcbiAgICAgIG5vZGUgPSBnZXROb2RlRm9yT3B0aW9uKCdpbml0aWFsRm9jdXMnKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgbm9kZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSB0YWJiYWJsZU5vZGVzWzBdIHx8IGdldE5vZGVGb3JPcHRpb24oJ2ZhbGxiYWNrRm9jdXMnKTtcbiAgICB9XG5cbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhblxcJ3QgaGF2ZSBhIGZvY3VzLXRyYXAgd2l0aG91dCBhdCBsZWFzdCBvbmUgZm9jdXNhYmxlIGVsZW1lbnQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIC8vIFRoaXMgbmVlZHMgdG8gYmUgZG9uZSBvbiBtb3VzZWRvd24gYW5kIHRvdWNoc3RhcnQgaW5zdGVhZCBvZiBjbGlja1xuICAvLyBzbyB0aGF0IGl0IHByZWNlZGVzIHRoZSBmb2N1cyBldmVudFxuICBmdW5jdGlvbiBjaGVja1BvaW50ZXJEb3duKGUpIHtcbiAgICBpZiAoY29uZmlnLmNsaWNrT3V0c2lkZURlYWN0aXZhdGVzICYmICFjb250YWluZXIuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICBkZWFjdGl2YXRlKHsgcmV0dXJuRm9jdXM6IGZhbHNlIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrQ2xpY2soZSkge1xuICAgIGlmIChjb25maWcuY2xpY2tPdXRzaWRlRGVhY3RpdmF0ZXMpIHJldHVybjtcbiAgICBpZiAoY29udGFpbmVyLmNvbnRhaW5zKGUudGFyZ2V0KSkgcmV0dXJuO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tGb2N1cyhlKSB7XG4gICAgaWYgKGNvbnRhaW5lci5jb250YWlucyhlLnRhcmdldCkpIHJldHVybjtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAvLyBDaGVja2luZyBmb3IgYSBibHVyIG1ldGhvZCBoZXJlIHJlc29sdmVzIGEgRmlyZWZveCBpc3N1ZSAoIzE1KVxuICAgIGlmICh0eXBlb2YgZS50YXJnZXQuYmx1ciA9PT0gJ2Z1bmN0aW9uJykgZS50YXJnZXQuYmx1cigpO1xuXG4gICAgaWYgKHRhYkV2ZW50KSB7XG4gICAgICByZWFkanVzdEZvY3VzKHRhYkV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0tleShlKSB7XG4gICAgaWYgKGUua2V5ID09PSAnVGFiJyB8fCBlLmtleUNvZGUgPT09IDkpIHtcbiAgICAgIGhhbmRsZVRhYihlKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmVzY2FwZURlYWN0aXZhdGVzICE9PSBmYWxzZSAmJiBpc0VzY2FwZUV2ZW50KGUpKSB7XG4gICAgICBkZWFjdGl2YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlVGFiKGUpIHtcbiAgICB1cGRhdGVUYWJiYWJsZU5vZGVzKCk7XG5cbiAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpICYmIE51bWJlcihlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JykpIDwgMCkge1xuICAgICAgcmV0dXJuIHRhYkV2ZW50ID0gZTtcbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGN1cnJlbnRGb2N1c0luZGV4ID0gdGFiYmFibGVOb2Rlcy5pbmRleE9mKGUudGFyZ2V0KTtcblxuICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICBpZiAoZS50YXJnZXQgPT09IGZpcnN0VGFiYmFibGVOb2RlIHx8IHRhYmJhYmxlTm9kZXMuaW5kZXhPZihlLnRhcmdldCkgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiB0cnlGb2N1cyhsYXN0VGFiYmFibGVOb2RlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnlGb2N1cyh0YWJiYWJsZU5vZGVzW2N1cnJlbnRGb2N1c0luZGV4IC0gMV0pO1xuICAgIH1cblxuICAgIGlmIChlLnRhcmdldCA9PT0gbGFzdFRhYmJhYmxlTm9kZSkgcmV0dXJuIHRyeUZvY3VzKGZpcnN0VGFiYmFibGVOb2RlKTtcblxuICAgIHRyeUZvY3VzKHRhYmJhYmxlTm9kZXNbY3VycmVudEZvY3VzSW5kZXggKyAxXSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVUYWJiYWJsZU5vZGVzKCkge1xuICAgIHRhYmJhYmxlTm9kZXMgPSB0YWJiYWJsZShjb250YWluZXIpO1xuICAgIGZpcnN0VGFiYmFibGVOb2RlID0gdGFiYmFibGVOb2Rlc1swXTtcbiAgICBsYXN0VGFiYmFibGVOb2RlID0gdGFiYmFibGVOb2Rlc1t0YWJiYWJsZU5vZGVzLmxlbmd0aCAtIDFdO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZGp1c3RGb2N1cyhlKSB7XG4gICAgaWYgKGUuc2hpZnRLZXkpIHJldHVybiB0cnlGb2N1cyhsYXN0VGFiYmFibGVOb2RlKTtcblxuICAgIHRyeUZvY3VzKGZpcnN0VGFiYmFibGVOb2RlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0VzY2FwZUV2ZW50KGUpIHtcbiAgcmV0dXJuIGUua2V5ID09PSAnRXNjYXBlJyB8fCBlLmtleSA9PT0gJ0VzYycgfHwgZS5rZXlDb2RlID09PSAyNztcbn1cblxuZnVuY3Rpb24gdHJ5Rm9jdXMobm9kZSkge1xuICBpZiAoIW5vZGUgfHwgIW5vZGUuZm9jdXMpIHJldHVybjtcbiAgaWYgKG5vZGUgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICByZXR1cm47XG5cbiAgbm9kZS5mb2N1cygpO1xuICBpZiAobm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcpIHtcbiAgICBub2RlLnNlbGVjdCgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZm9jdXNUcmFwO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUZvY3VzVHJhcCBmcm9tICdmb2N1cy10cmFwJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZvY3VzVHJhcEluc3RhbmNlKHN1cmZhY2VFbCwgYWNjZXB0QnV0dG9uRWwsIGZvY3VzVHJhcEZhY3RvcnkgPSBjcmVhdGVGb2N1c1RyYXApIHtcbiAgcmV0dXJuIGZvY3VzVHJhcEZhY3Rvcnkoc3VyZmFjZUVsLCB7XG4gICAgaW5pdGlhbEZvY3VzOiBhY2NlcHRCdXR0b25FbCxcbiAgICBjbGlja091dHNpZGVEZWFjdGl2YXRlczogdHJ1ZSxcbiAgfSk7XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFJpcHBsZS4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBjbGFzc2VzXG4gKiAtIGRvbVxuICogLSBDU1MgdmFyaWFibGVzXG4gKiAtIHBvc2l0aW9uXG4gKiAtIGRpbWVuc2lvbnNcbiAqIC0gc2Nyb2xsIHBvc2l0aW9uXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKiAtIHVuYm91bmRlZCwgYWN0aXZlIGFuZCBkaXNhYmxlZCBzdGF0ZXNcbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUFkYXB0ZXIge1xuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzVW5ib3VuZGVkKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlQWN0aXZlKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlRGlzYWJsZWQoKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50VGFyZ2V0fSB0YXJnZXQgKi9cbiAgY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YXJOYW1lXG4gICAqIEBwYXJhbSB7P251bWJlcnxzdHJpbmd9IHZhbHVlXG4gICAqL1xuICB1cGRhdGVDc3NWYXJpYWJsZSh2YXJOYW1lLCB2YWx1ZSkge31cblxuICAvKiogQHJldHVybiB7IUNsaWVudFJlY3R9ICovXG4gIGNvbXB1dGVCb3VuZGluZ1JlY3QoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSAqL1xuICBnZXRXaW5kb3dQYWdlT2Zmc2V0KCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICAvLyBSaXBwbGUgaXMgYSBzcGVjaWFsIGNhc2Ugd2hlcmUgdGhlIFwicm9vdFwiIGNvbXBvbmVudCBpcyByZWFsbHkgYSBcIm1peGluXCIgb2Ygc29ydHMsXG4gIC8vIGdpdmVuIHRoYXQgaXQncyBhbiAndXBncmFkZScgdG8gYW4gZXhpc3RpbmcgY29tcG9uZW50LiBUaGF0IGJlaW5nIHNhaWQgaXQgaXMgdGhlIHJvb3RcbiAgLy8gQ1NTIGNsYXNzIHRoYXQgYWxsIG90aGVyIENTUyBjbGFzc2VzIGRlcml2ZSBmcm9tLlxuICBST09UOiAnbWRjLXJpcHBsZS11cGdyYWRlZCcsXG4gIFVOQk9VTkRFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLXVuYm91bmRlZCcsXG4gIEJHX0ZPQ1VTRUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1iYWNrZ3JvdW5kLWZvY3VzZWQnLFxuICBGR19BQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1hY3RpdmF0aW9uJyxcbiAgRkdfREVBQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1kZWFjdGl2YXRpb24nLFxufTtcblxuY29uc3Qgc3RyaW5ncyA9IHtcbiAgVkFSX0xFRlQ6ICctLW1kYy1yaXBwbGUtbGVmdCcsXG4gIFZBUl9UT1A6ICctLW1kYy1yaXBwbGUtdG9wJyxcbiAgVkFSX0ZHX1NJWkU6ICctLW1kYy1yaXBwbGUtZmctc2l6ZScsXG4gIFZBUl9GR19TQ0FMRTogJy0tbWRjLXJpcHBsZS1mZy1zY2FsZScsXG4gIFZBUl9GR19UUkFOU0xBVEVfU1RBUlQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLXN0YXJ0JyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9FTkQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLWVuZCcsXG59O1xuXG5jb25zdCBudW1iZXJzID0ge1xuICBQQURESU5HOiAxMCxcbiAgSU5JVElBTF9PUklHSU5fU0NBTEU6IDAuNixcbiAgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVM6IDIyNSwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtdHJhbnNsYXRlLWR1cmF0aW9uIChpLmUuIGFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBGR19ERUFDVElWQVRJT05fTVM6IDE1MCwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtZmFkZS1vdXQtZHVyYXRpb24gKGkuZS4gZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgVEFQX0RFTEFZX01TOiAzMDAsIC8vIERlbGF5IGJldHdlZW4gdG91Y2ggYW5kIHNpbXVsYXRlZCBtb3VzZSBldmVudHMgb24gdG91Y2ggZGV2aWNlc1xufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgQ1NTIGN1c3RvbSB2YXJpYWJsZSBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBhcHBseVBhc3NpdmUgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzUGFzc2l2ZV87XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKSB7XG4gIC8vIERldGVjdCB2ZXJzaW9ucyBvZiBFZGdlIHdpdGggYnVnZ3kgdmFyKCkgc3VwcG9ydFxuICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzExNDk1NDQ4L1xuICBjb25zdCBkb2N1bWVudCA9IHdpbmRvd09iai5kb2N1bWVudDtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBub2RlLmNsYXNzTmFtZSA9ICdtZGMtcmlwcGxlLXN1cmZhY2UtLXRlc3QtZWRnZS12YXItYnVnJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAvLyBUaGUgYnVnIGV4aXN0cyBpZiA6OmJlZm9yZSBzdHlsZSBlbmRzIHVwIHByb3BhZ2F0aW5nIHRvIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgLy8gQWRkaXRpb25hbGx5LCBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgbnVsbCBpbiBpZnJhbWVzIHdpdGggZGlzcGxheTogXCJub25lXCIgaW4gRmlyZWZveCxcbiAgLy8gYnV0IEZpcmVmb3ggaXMga25vd24gdG8gc3VwcG9ydCBDU1MgY3VzdG9tIHByb3BlcnRpZXMgY29ycmVjdGx5LlxuICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93T2JqLmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGNvbnN0IGhhc1BzZXVkb1ZhckJ1ZyA9IGNvbXB1dGVkU3R5bGUgIT09IG51bGwgJiYgY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BTdHlsZSA9PT0gJ3NvbGlkJztcbiAgbm9kZS5yZW1vdmUoKTtcbiAgcmV0dXJuIGhhc1BzZXVkb1ZhckJ1Zztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3dPYmosIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPT09ICdib29sZWFuJyAmJiAhZm9yY2VSZWZyZXNoKSB7XG4gICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG5cbiAgY29uc3Qgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSB3aW5kb3dPYmouQ1NTICYmIHR5cGVvZiB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIXN1cHBvcnRzRnVuY3Rpb25QcmVzZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJy0tY3NzLXZhcnMnLCAneWVzJyk7XG4gIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxuICAvLyBTZWU6IFJFQURNRSBzZWN0aW9uIG9uIFNhZmFyaVxuICBjb25zdCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnKC0tY3NzLXZhcnM6IHllcyknKSAmJlxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJ2NvbG9yJywgJyMwMDAwMDAwMCcpXG4gICk7XG5cbiAgaWYgKGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgfHwgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSAhZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopO1xuICB9IGVsc2Uge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gZmFsc2U7XG4gIH1cblxuICBpZiAoIWZvcmNlUmVmcmVzaCkge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG4gIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbn1cblxuLy9cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cbiAqL1xuZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSBIVE1MRWxlbWVudFByb3RvdHlwZVxuICogQHJldHVybiB7IUFycmF5PHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudFByb3RvdHlwZSkge1xuICByZXR1cm4gW1xuICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLCAnbXNNYXRjaGVzU2VsZWN0b3InLCAnbWF0Y2hlcycsXG4gIF0uZmlsdGVyKChwKSA9PiBwIGluIEhUTUxFbGVtZW50UHJvdG90eXBlKS5wb3AoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFFdmVudH0gZXZcbiAqIEBwYXJhbSB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gcGFnZU9mZnNldFxuICogQHBhcmFtIHshQ2xpZW50UmVjdH0gY2xpZW50UmVjdFxuICogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKGV2LCBwYWdlT2Zmc2V0LCBjbGllbnRSZWN0KSB7XG4gIGNvbnN0IHt4LCB5fSA9IHBhZ2VPZmZzZXQ7XG4gIGNvbnN0IGRvY3VtZW50WCA9IHggKyBjbGllbnRSZWN0LmxlZnQ7XG4gIGNvbnN0IGRvY3VtZW50WSA9IHkgKyBjbGllbnRSZWN0LnRvcDtcblxuICBsZXQgbm9ybWFsaXplZFg7XG4gIGxldCBub3JtYWxpemVkWTtcbiAgLy8gRGV0ZXJtaW5lIHRvdWNoIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByaXBwbGUgY29udGFpbmVyLlxuICBpZiAoZXYudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9IGVsc2Uge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfVxuXG4gIHJldHVybiB7eDogbm9ybWFsaXplZFgsIHk6IG5vcm1hbGl6ZWRZfTtcbn1cblxuZXhwb3J0IHtzdXBwb3J0c0Nzc1ZhcmlhYmxlcywgYXBwbHlQYXNzaXZlLCBnZXRNYXRjaGVzUHJvcGVydHksIGdldE5vcm1hbGl6ZWRFdmVudENvb3Jkc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge2dldE5vcm1hbGl6ZWRFdmVudENvb3Jkc30gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBpc0FjdGl2YXRlZDogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGFjdGl2YXRpb25FdmVudDogRXZlbnQsXG4gKiAgIGlzUHJvZ3JhbW1hdGljOiAoYm9vbGVhbnx1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgQWN0aXZhdGlvblN0YXRlVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBkZWFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGZvY3VzOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGJsdXI6IChzdHJpbmd8dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVySW5mb1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGZvY3VzOiBmdW5jdGlvbigpLFxuICogICBibHVyOiBmdW5jdGlvbigpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJzVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB4OiBudW1iZXIsXG4gKiAgIHk6IG51bWJlclxuICogfX1cbiAqL1xubGV0IFBvaW50VHlwZTtcblxuLy8gQWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiB0aGUgcm9vdCBlbGVtZW50IG9mIGVhY2ggaW5zdGFuY2UgZm9yIGFjdGl2YXRpb25cbmNvbnN0IEFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJywgJ2tleWRvd24nXTtcblxuLy8gRGVhY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIGRvY3VtZW50RWxlbWVudCB3aGVuIGEgcG9pbnRlci1yZWxhdGVkIGRvd24gZXZlbnQgb2NjdXJzXG5jb25zdCBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hlbmQnLCAncG9pbnRlcnVwJywgJ21vdXNldXAnXTtcblxuLy8gVHJhY2tzIGFjdGl2YXRpb25zIHRoYXQgaGF2ZSBvY2N1cnJlZCBvbiB0aGUgY3VycmVudCBmcmFtZSwgdG8gYXZvaWQgc2ltdWx0YW5lb3VzIG5lc3RlZCBhY3RpdmF0aW9uc1xuLyoqIEB0eXBlIHshQXJyYXk8IUV2ZW50VGFyZ2V0Pn0gKi9cbmxldCBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1JpcHBsZUFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IC8qIGJvb2xlYW4gLSBjYWNoZWQgKi8ge30sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICgvKiB0YXJnZXQ6ICFFdmVudFRhcmdldCAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAoLyogdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IC8qIENsaWVudFJlY3QgKi8ge30sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAvKiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9ICovIHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENSaXBwbGVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUgeyFDbGllbnRSZWN0fSAqL1xuICAgIHRoaXMuZnJhbWVfID0gLyoqIEB0eXBlIHshQ2xpZW50UmVjdH0gKi8gKHt3aWR0aDogMCwgaGVpZ2h0OiAwfSk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubWF4UmFkaXVzXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuZGVhY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlRm9jdXMoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUJsdXIoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuXG4gICAgLyoqIEBwcml2YXRlIHt7bGVmdDogbnVtYmVyLCB0b3A6bnVtYmVyfX0gKi9cbiAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnU2NhbGVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IHRydWU7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUgez9FdmVudH0gKi9cbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogV2UgY29tcHV0ZSB0aGlzIHByb3BlcnR5IHNvIHRoYXQgd2UgYXJlIG5vdCBxdWVyeWluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY2xpZW50XG4gICAqIHVudGlsIHRoZSBwb2ludCBpbiB0aW1lIHdoZXJlIHRoZSBmb3VuZGF0aW9uIHJlcXVlc3RzIGl0LiBUaGlzIHByZXZlbnRzIHNjZW5hcmlvcyB3aGVyZVxuICAgKiBjbGllbnQtc2lkZSBmZWF0dXJlLWRldGVjdGlvbiBtYXkgaGFwcGVuIHRvbyBlYXJseSwgc3VjaCBhcyB3aGVuIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXJcbiAgICogYW5kIHRoZW4gaW5pdGlhbGl6ZWQgYXQgbW91bnQgdGltZSBvbiB0aGUgY2xpZW50LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNTdXBwb3J0ZWRfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshQWN0aXZhdGlvblN0YXRlVHlwZX1cbiAgICovXG4gIGRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2YXRlZDogZmFsc2UsXG4gICAgICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogZmFsc2UsXG4gICAgICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IGZhbHNlLFxuICAgICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IGZhbHNlLFxuICAgICAgYWN0aXZhdGlvbkV2ZW50OiBudWxsLFxuICAgICAgaXNQcm9ncmFtbWF0aWM6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UKTtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgICAvLyBVbmJvdW5kZWQgcmlwcGxlcyBuZWVkIGxheW91dCBsb2dpYyBhcHBsaWVkIGltbWVkaWF0ZWx5IHRvIHNldCBjb29yZGluYXRlcyBmb3IgYm90aCBzaGFkZSBhbmQgcmlwcGxlXG4gICAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWN0aXZhdGlvblRpbWVyXykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuICAgICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG4gICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhST09UKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgIHRoaXMucmVtb3ZlQ3NzVmFyc18oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbW92ZUNzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtzdHJpbmdzfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4gICAgT2JqZWN0LmtleXMoc3RyaW5ncykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignVkFSXycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoc3RyaW5nc1trXSwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjdGl2YXRlXyhlKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcmVhY3RpbmcgdG8gZm9sbG93LW9uIGV2ZW50cyBmaXJlZCBieSB0b3VjaCBkZXZpY2UgYWZ0ZXIgYW4gYWxyZWFkeS1wcm9jZXNzZWQgdXNlciBpbnRlcmFjdGlvblxuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gICAgY29uc3QgaXNTYW1lSW50ZXJhY3Rpb24gPSBwcmV2aW91c0FjdGl2YXRpb25FdmVudCAmJiBlICYmIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50LnR5cGUgIT09IGUudHlwZTtcbiAgICBpZiAoaXNTYW1lSW50ZXJhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA9IGUgPT09IG51bGw7XG4gICAgYWN0aXZhdGlvblN0YXRlLmFjdGl2YXRpb25FdmVudCA9IGU7XG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0FjdGl2YXRlZEJ5UG9pbnRlciA9IGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA/IGZhbHNlIDogKFxuICAgICAgZS50eXBlID09PSAnbW91c2Vkb3duJyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICdwb2ludGVyZG93bidcbiAgICApO1xuXG4gICAgY29uc3QgaGFzQWN0aXZhdGVkQ2hpbGQgPVxuICAgICAgZSAmJiBhY3RpdmF0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgYWN0aXZhdGVkVGFyZ2V0cy5zb21lKCh0YXJnZXQpID0+IHRoaXMuYWRhcHRlcl8uY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpKTtcbiAgICBpZiAoaGFzQWN0aXZhdGVkQ2hpbGQpIHtcbiAgICAgIC8vIEltbWVkaWF0ZWx5IHJlc2V0IGFjdGl2YXRpb24gc3RhdGUsIHdoaWxlIHByZXNlcnZpbmcgbG9naWMgdGhhdCBwcmV2ZW50cyB0b3VjaCBmb2xsb3ctb24gZXZlbnRzXG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goLyoqIEB0eXBlIHshRXZlbnRUYXJnZXR9ICovIChlLnRhcmdldCkpO1xuICAgICAgdGhpcy5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlICYmIChlLmtleSA9PT0gJyAnIHx8IGUua2V5Q29kZSA9PT0gMzIpKSB7XG4gICAgICAgIC8vIElmIHNwYWNlIHdhcyBwcmVzc2VkLCB0cnkgYWdhaW4gd2l0aGluIGFuIHJBRiBjYWxsIHRvIGRldGVjdCA6YWN0aXZlLCBiZWNhdXNlIGRpZmZlcmVudCBVQXMgcmVwb3J0XG4gICAgICAgIC8vIGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW4gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MzU5NzFcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICAgIC8vIFdlIHRyeSBmaXJzdCBvdXRzaWRlIHJBRiB0byBzdXBwb3J0IEVkZ2UsIHdoaWNoIGRvZXMgbm90IGV4aGliaXQgdGhpcyBwcm9ibGVtLCBidXQgd2lsbCBjcmFzaCBpZiBhIENTU1xuICAgICAgICAvLyB2YXJpYWJsZSBpcyBzZXQgd2l0aGluIGEgckFGIGNhbGxiYWNrIGZvciBhIHN1Ym1pdCBidXR0b24gaW50ZXJhY3Rpb24gKCMyMjQxKS5cbiAgICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSkge1xuICAgIHJldHVybiAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGwsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXyhlKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgY29uc3QgZXZ0T2JqZWN0ID0gbnVsbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGV2dE9iamVjdCwgc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhlLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZGVhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCJpbXBvcnQgTURDUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMnXG5pbXBvcnQge1xuICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyxcbiAgZ2V0TWF0Y2hlc1Byb3BlcnR5LFxuICBhcHBseVBhc3NpdmVcbn0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS91dGlsJ1xuXG5leHBvcnQgY2xhc3MgUmlwcGxlQmFzZSBleHRlbmRzIE1EQ1JpcHBsZUZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IE1BVENIRVMoKSB7XG4gICAgLyogZ2xvYmFsIEhUTUxFbGVtZW50ICovXG4gICAgcmV0dXJuIChcbiAgICAgIFJpcHBsZUJhc2UuX21hdGNoZXMgfHxcbiAgICAgIChSaXBwbGVCYXNlLl9tYXRjaGVzID0gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSkpXG4gICAgKVxuICB9XG5cbiAgc3RhdGljIGlzU3VyZmFjZUFjdGl2ZShyZWYpIHtcbiAgICByZXR1cm4gcmVmW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICB9XG5cbiAgY29uc3RydWN0b3Iodm0sIG9wdGlvbnMpIHtcbiAgICBzdXBlcihcbiAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHtcbiAgICAgICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdm0uJGVsW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2bS5kaXNhYmxlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB2bS4kc2V0KHZtLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdm0uJGRlbGV0ZSh2bS5jbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiB0YXJnZXQgPT4gdm0uJGVsLmNvbnRhaW5zKHRhcmdldCksXG4gICAgICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgIHZtLiRlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICB2bS4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcbiAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgYXBwbHlQYXNzaXZlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICBldnRUeXBlLFxuICAgICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAgICBhcHBseVBhc3NpdmUoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdm0uJHNldCh2bS5zdHlsZXMsIHZhck5hbWUsIHZhbHVlKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZtLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgeDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXQgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKVxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUmlwcGxlTWl4aW4gPSB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgc3R5bGVzOiB7fVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGN1c3RvbS1lbGVtZW50IFxuICAgIDp0YWc9XCJ0YWdcIiBcbiAgICA6Y2xhc3Nlcz1cImNsYXNzZXNcIlxuICAgIDpzdHlsZXM9XCJzdHlsZXNcIiBcbiAgICBjbGFzcz1cIm1kYy1yaXBwbGVcIj5cbiAgICA8c2xvdCAvPlxuICA8L2N1c3RvbS1lbGVtZW50PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IEN1c3RvbUVsZW1lbnRNaXhpbiB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgeyBSaXBwbGVNaXhpbiB9IGZyb20gJy4vbWRjLXJpcHBsZS1iYXNlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtcmlwcGxlJyxcbiAgbWl4aW5zOiBbQ3VzdG9tRWxlbWVudE1peGluLCBSaXBwbGVNaXhpbl0sXG4gIHByb3BzOiB7XG4gICAgdGFnOiBTdHJpbmdcbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxjdXN0b20tYnV0dG9uIFxuICAgIHJlZj1cInJvb3RcIlxuICAgIDpjbGFzcz1cImNsYXNzZXNcIiBcbiAgICA6c3R5bGU9XCJzdHlsZXNcIlxuICAgIDpocmVmPVwiaHJlZlwiIFxuICAgIDpsaW5rPVwibGlua1wiIFxuICAgIDpkaXNhYmxlZD1cImRpc2FibGVkXCJcbiAgICB2LW9uPVwibGlzdGVuZXJzXCI+XG4gICAgPHNsb3QgLz5cbiAgPC9jdXN0b20tYnV0dG9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IERpc3BhdGNoRXZlbnRNaXhpbiwgQ3VzdG9tQnV0dG9uTWl4aW4gfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHsgUmlwcGxlTWl4aW4gfSBmcm9tICcuLi9yaXBwbGUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1idXR0b24tYmFzZScsXG4gIG1peGluczogW0Rpc3BhdGNoRXZlbnRNaXhpbiwgQ3VzdG9tQnV0dG9uTWl4aW4sIFJpcHBsZU1peGluXSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge30sXG4gICAgICBzdHlsZXM6IHt9XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsIjxzY3JpcHQ+XG5pbXBvcnQgbWRjQnV0dG9uQmFzZSBmcm9tICcuL21kYy1idXR0b24tYmFzZS52dWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1idXR0b24nLFxuICBleHRlbmRzOiBtZGNCdXR0b25CYXNlLFxuICBwcm9wczoge1xuICAgIHJhaXNlZDogQm9vbGVhbixcbiAgICB1bmVsZXZhdGVkOiBCb29sZWFuLFxuICAgIG91dGxpbmVkOiBCb29sZWFuLFxuICAgIGRlbnNlOiBCb29sZWFuXG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgJ21kYy1idXR0b24nOiB0cnVlLFxuICAgICAgICAnbWRjLWJ1dHRvbi0tcmFpc2VkJzogdGhpcy5yYWlzZWQsXG4gICAgICAgICdtZGMtYnV0dG9uLS11bmVsZXZhdGVkJzogdGhpcy51bmVsZXZhdGVkLFxuICAgICAgICAnbWRjLWJ1dHRvbi0tb3V0bGluZWQnOiB0aGlzLm91dGxpbmVkLFxuICAgICAgICAnbWRjLWJ1dHRvbi0tZGVuc2UnOiB0aGlzLmRlbnNlXG4gICAgICB9XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIHJhaXNlZCgpIHtcbiAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsICdtZGMtYnV0dG9uLS1yYWlzZWQnLCB0aGlzLnJhaXNlZClcbiAgICB9LFxuICAgIHVuZWxldmF0ZWQoKSB7XG4gICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWRjLWJ1dHRvbi0tdW5lbGV2YXRlZCcsIHRoaXMudW5lbGV2YXRlZClcbiAgICB9LFxuICAgIG91dGxpbmVkKCkge1xuICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgJ21kYy1idXR0b24tLW91dGxpbmVkJywgdGhpcy5vdXRsaW5lZClcbiAgICB9LFxuICAgIGRlbnNlKCkge1xuICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgJ21kYy1idXR0b24tLWRlbnNlJywgdGhpcy5kZW5zZSlcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8YXNpZGVcbiAgICByZWY9XCJyb290XCJcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCJcbiAgICA6c3R5bGU9XCJzdHlsZXNcIlxuICAgIDphcmlhLWxhYmVsbGVkYnk9XCInbGFiZWwnICsgdm1hX3VpZF9cIlxuICAgIDphcmlhLWRlc2NyaWJlZGJ5PVwiJ2Rlc2MnICsgdm1hX3VpZF9cIlxuICAgIGNsYXNzPVwibWRjLWRpYWxvZ1wiXG4gICAgcm9sZT1cImFsZXJ0ZGlhbG9nXCJcbiAgPlxuICAgIDxkaXZcbiAgICAgIHJlZj1cInN1cmZhY2VcIlxuICAgICAgOmNsYXNzPVwic3VyZmFjZUNsYXNzZXNcIlxuICAgICAgY2xhc3M9XCJtZGMtZGlhbG9nX19zdXJmYWNlXCI+XG4gICAgICA8aGVhZGVyXG4gICAgICAgIHYtaWY9XCJ0aXRsZVwiXG4gICAgICAgIGNsYXNzPVwibWRjLWRpYWxvZ19faGVhZGVyXCI+XG4gICAgICAgIDxoMlxuICAgICAgICAgIDppZD1cIidsYWJlbCcgKyB2bWFfdWlkX1wiXG4gICAgICAgICAgY2xhc3M9XCJtZGMtZGlhbG9nX19oZWFkZXJfX3RpdGxlXCI+XG4gICAgICAgICAge3sgdGl0bGUgfX1cbiAgICAgICAgPC9oMj5cbiAgICAgIDwvaGVhZGVyPlxuICAgICAgPHNlY3Rpb25cbiAgICAgICAgOmlkPVwiJ2Rlc2MnICsgdm1hX3VpZF9cIlxuICAgICAgICA6Y2xhc3M9XCJib2R5Q2xhc3Nlc1wiXG4gICAgICAgIGNsYXNzPVwibWRjLWRpYWxvZ19fYm9keVwiPlxuICAgICAgICA8c2xvdCAvPlxuICAgICAgPC9zZWN0aW9uPlxuICAgICAgPGZvb3RlclxuICAgICAgICB2LWlmPVwiYWNjZXB0fHxjYW5jZWx8fHNhdmVcIlxuICAgICAgICBjbGFzcz1cIm1kYy1kaWFsb2dfX2Zvb3RlclwiPlxuICAgICAgICA8bWRjQnV0dG9uXG4gICAgICAgICAgdi1pZj1cInNhdmVcIlxuICAgICAgICAgIHJlZj1cInNhdmVcIlxuICAgICAgICAgIDpjbGFzcz1cInsnbWRjLWRpYWxvZ19fYWN0aW9uJzphY2NlbnR9XCJcbiAgICAgICAgICA6cmFpc2VkPVwic2F2ZVJhaXNlZFwiXG4gICAgICAgICAgY2xhc3M9XCJtZGMtZGlhbG9nX19mb290ZXJfX2J1dHRvbiBtZGMtZGlhbG9nX19mb290ZXJfX2J1dHRvbi0tc2F2ZVwiXG4gICAgICAgICAgQGNsaWNrPVwib25TYXZlXCJcbiAgICAgICAgPnt7IHNhdmUgfX08L21kY0J1dHRvbj5cbiAgICAgICAgPG1kY0J1dHRvblxuICAgICAgICAgIHYtaWY9XCJjYW5jZWxcIlxuICAgICAgICAgIHJlZj1cImNhbmNlbFwiXG4gICAgICAgICAgOmNsYXNzPVwieydtZGMtZGlhbG9nX19hY3Rpb24nOmFjY2VudH1cIlxuICAgICAgICAgIDpyYWlzZWQ9XCJjYW5jZWxSYWlzZWRcIlxuICAgICAgICAgIGNsYXNzPVwibWRjLWRpYWxvZ19fZm9vdGVyX19idXR0b24gbWRjLWRpYWxvZ19fZm9vdGVyX19idXR0b24tLWNhbmNlbFwiXG4gICAgICAgICAgQGNsaWNrPVwib25DYW5jZWxcIlxuICAgICAgICA+e3sgY2FuY2VsIH19PC9tZGNCdXR0b24+XG4gICAgICAgIDxtZGNCdXR0b25cbiAgICAgICAgICByZWY9XCJhY2NlcHRcIlxuICAgICAgICAgIDpjbGFzcz1cInsnbWRjLWRpYWxvZ19fYWN0aW9uJzphY2NlbnR9XCJcbiAgICAgICAgICA6ZGlzYWJsZWQ9XCJhY2NlcHREaXNhYmxlZFwiXG4gICAgICAgICAgOnJhaXNlZD1cImFjY2VwdFJhaXNlZFwiXG4gICAgICAgICAgY2xhc3M9XCJtZGMtZGlhbG9nX19mb290ZXJfX2J1dHRvbiBtZGMtZGlhbG9nX19mb290ZXJfX2J1dHRvbi0tYWNjZXB0XCJcbiAgICAgICAgICBAY2xpY2s9XCJvbkFjY2VwdFwiXG4gICAgICAgID57eyBhY2NlcHQgfX08L21kY0J1dHRvbj5cbiAgICAgIDwvZm9vdGVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtZGMtZGlhbG9nX19iYWNrZHJvcFwiLz5cbiAgPC9hc2lkZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTURDRGlhbG9nRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvZGlhbG9nL2ZvdW5kYXRpb24nXG5pbXBvcnQgeyBjcmVhdGVGb2N1c1RyYXBJbnN0YW5jZSB9IGZyb20gJ0BtYXRlcmlhbC9kaWFsb2cvdXRpbCdcbmltcG9ydCB7IG1kY0J1dHRvbiB9IGZyb20gJy4uL2J1dHRvbidcbmltcG9ydCB7IFZNQVVuaXF1ZUlkTWl4aW4gfSBmcm9tICcuLi9iYXNlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtZGlhbG9nJyxcbiAgY29tcG9uZW50czoge1xuICAgIG1kY0J1dHRvbjogbWRjQnV0dG9uXG4gIH0sXG4gIG1peGluczogW1ZNQVVuaXF1ZUlkTWl4aW5dLFxuICBtb2RlbDoge1xuICAgIHByb3A6ICdvcGVuJyxcbiAgICBldmVudDogJ2NoYW5nZSdcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICB0aXRsZTogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICBhY2NlcHQ6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnT2snIH0sXG4gICAgYWNjZXB0RGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgYWNjZXB0UmFpc2VkOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlIH0sXG4gICAgY2FuY2VsOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgIGNhbmNlbFJhaXNlZDogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiBmYWxzZSB9LFxuICAgIHNhdmU6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgc2F2ZVJhaXNlZDogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiBmYWxzZSB9LFxuICAgIGFjY2VudDogQm9vbGVhbixcbiAgICBzY3JvbGxhYmxlOiBCb29sZWFuLFxuICAgIG9wZW46IEJvb2xlYW5cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge1xuICAgICAgICAnbWRjLXRoZW1lLS1kYXJrJzogdGhpcy5kYXJrXG4gICAgICB9LFxuICAgICAgc3R5bGVzOiB7fSxcbiAgICAgIHN1cmZhY2VDbGFzc2VzOiB7fSxcbiAgICAgIGJvZHlDbGFzc2VzOiB7XG4gICAgICAgICdtZGMtZGlhbG9nX19ib2R5LS1zY3JvbGxhYmxlJzogdGhpcy5zY3JvbGxhYmxlXG4gICAgICB9XG4gICAgfVxuICB9LFxuICB3YXRjaDogeyBvcGVuOiAnb25PcGVuXycgfSxcbiAgbW91bnRlZCgpIHtcbiAgICBpZiAodGhpcy5hY2NlcHQpIHtcbiAgICAgIHRoaXMuZm9jdXNUcmFwID0gY3JlYXRlRm9jdXNUcmFwSW5zdGFuY2UoXG4gICAgICAgIHRoaXMuJHJlZnMuc3VyZmFjZSxcbiAgICAgICAgdGhpcy4kcmVmcy5hY2NlcHRcbiAgICAgIClcbiAgICB9XG5cbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDRGlhbG9nRm91bmRhdGlvbih7XG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSksXG4gICAgICBhZGRCb2R5Q2xhc3M6IGNsYXNzTmFtZSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICAgIHJlbW92ZUJvZHlDbGFzczogY2xhc3NOYW1lID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpLFxuICAgICAgZXZlbnRUYXJnZXRIYXNDbGFzczogKHRhcmdldCwgY2xhc3NOYW1lKSA9PlxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSksXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT5cbiAgICAgICAgdGhpcy4kcmVmcy5yb290LmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+XG4gICAgICAgIHRoaXMuJHJlZnMucm9vdC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciksXG4gICAgICByZWdpc3RlclN1cmZhY2VJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKmV2dCwgaGFuZGxlciovKSA9PiB7XG4gICAgICAgIC8vIFZNQV9IQUNLOiBoYW5kbGUgYnV0dG9uIGNsaWNrcyBvdXJzZWx2ZXNcbiAgICAgICAgLy8gdGhpcy4kcmVmcy5zdXJmYWNlLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJTdXJmYWNlSW50ZXJhY3Rpb25IYW5kbGVyOiAoLypldnQsIGhhbmRsZXIqLykgPT4ge1xuICAgICAgICAvLyBWTUFfSEFDSzogaGFuZGxlIGJ1dHRvbiBjbGlja3Mgb3Vyc2VsdmVzXG4gICAgICAgIC8vIHRoaXMuJHJlZnMuc3VyZmFjZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICByZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXI6IGhhbmRsZXIgPT5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXI6IGhhbmRsZXIgPT5cbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpLFxuICAgICAgbm90aWZ5QWNjZXB0OiAoKSA9PiB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGZhbHNlKVxuICAgICAgICB0aGlzLiRlbWl0KCdhY2NlcHQnKVxuICAgICAgfSxcbiAgICAgIG5vdGlmeUNhbmNlbDogKCkgPT4ge1xuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBmYWxzZSlcbiAgICAgICAgdGhpcy4kZW1pdCgnY2FuY2VsJylcbiAgICAgIH0sXG4gICAgICB0cmFwRm9jdXNPblN1cmZhY2U6ICgpID0+IHRoaXMuZm9jdXNUcmFwICYmIHRoaXMuZm9jdXNUcmFwLmFjdGl2YXRlKCksXG4gICAgICB1bnRyYXBGb2N1c09uU3VyZmFjZTogKCkgPT4gdGhpcy5mb2N1c1RyYXAgJiYgdGhpcy5mb2N1c1RyYXAuZGVhY3RpdmF0ZSgpLFxuICAgICAgaXNEaWFsb2c6IGVsID0+IHRoaXMuJHJlZnMuc3VyZmFjZSA9PT0gZWxcbiAgICB9KVxuXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxuICAgIHRoaXMub3BlbiAmJiB0aGlzLmZvdW5kYXRpb24ub3BlbigpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb25PcGVuXyh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZm91bmRhdGlvbi5vcGVuKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZm91bmRhdGlvbi5jbG9zZSgpXG4gICAgICB9XG4gICAgfSxcbiAgICBvblNhdmUoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdzYXZlJylcbiAgICB9LFxuICAgIG9uQ2FuY2VsKCkge1xuICAgICAgaWYgKHRoaXMuJGxpc3RlbmVyc1sndmFsaWRhdGVDYW5jZWwnXSkge1xuICAgICAgICB0aGlzLiRlbWl0KCd2YWxpZGF0ZUNhbmNlbCcsIHtcbiAgICAgICAgICBjYW5jZWw6IChub3RpZnkgPSB0cnVlKSA9PiB7XG4gICAgICAgICAgICAvLyBpZiBub3RpZnkgPSBmYWxzZSwgdGhlIGRpYWxvZyB3aWxsIGNsb3NlXG4gICAgICAgICAgICAvLyBidXQgdGhlIG5vdGlmeUFjY2VwdCBtZXRob2Qgd2lsbCBub3QgYmUgY2FsbGVkXG4gICAgICAgICAgICAvLyBzbyB3ZSBuZWVkIHRvIG5vdGlmeSBsaXN0ZW5lcnMgdGhlIG9wZW4gc3RhdGVcbiAgICAgICAgICAgIC8vIGlzIGNoYW5naW5nLlxuICAgICAgICAgICAgaWYgKCFub3RpZnkpIHtcbiAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgZmFsc2UpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZvdW5kYXRpb24uY2FuY2VsKG5vdGlmeSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZvdW5kYXRpb24uY2FuY2VsKHRydWUpXG4gICAgICB9XG4gICAgfSxcbiAgICBvbkFjY2VwdCgpIHtcbiAgICAgIGlmICh0aGlzLiRsaXN0ZW5lcnNbJ3ZhbGlkYXRlJ10pIHtcbiAgICAgICAgdGhpcy4kZW1pdCgndmFsaWRhdGUnLCB7XG4gICAgICAgICAgYWNjZXB0OiAobm90aWZ5ID0gdHJ1ZSkgPT4ge1xuICAgICAgICAgICAgLy8gaWYgbm90aWZ5ID0gZmFsc2UsIHRoZSBkaWFsb2cgd2lsbCBjbG9zZVxuICAgICAgICAgICAgLy8gYnV0IHRoZSBub3RpZnlBY2NlcHQgbWV0aG9kIHdpbGwgbm90IGJlIGNhbGxlZFxuICAgICAgICAgICAgLy8gc28gd2UgbmVlZCB0byBub3RpZnkgbGlzdGVuZXJzIHRoZSBvcGVuIHN0YXRlXG4gICAgICAgICAgICAvLyBpcyBjaGFuZ2luZy5cbiAgICAgICAgICAgIGlmICghbm90aWZ5KSB7XG4gICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGZhbHNlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mb3VuZGF0aW9uLmFjY2VwdChub3RpZnkpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uLmFjY2VwdCh0cnVlKVxuICAgICAgfVxuICAgIH0sXG4gICAgc2hvdygpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5vcGVuKClcbiAgICB9LFxuICAgIGNsb3NlKCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLmNsb3NlKClcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHsgQmFzZVBsdWdpbiB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgbWRjRGlhbG9nIGZyb20gJy4vbWRjLWRpYWxvZy52dWUnXG5cbmV4cG9ydCB7IG1kY0RpYWxvZyB9XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNEaWFsb2dcbn0pXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQgeyBhdXRvSW5pdCB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cblxuYXV0b0luaXQocGx1Z2luKVxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJrZXkiLCJjb21wb25lbnQiLCJ2bSIsIm5hbWUiLCJDdXN0b21FbGVtZW50IiwiZnVuY3Rpb25hbCIsInJlbmRlciIsImNyZWF0ZUVsZW1lbnQiLCJjb250ZXh0IiwicHJvcHMiLCJpcyIsInRhZyIsImRhdGEiLCJjaGlsZHJlbiIsIkN1c3RvbUVsZW1lbnRNaXhpbiIsIkN1c3RvbUJ1dHRvbiIsImxpbmsiLCJPYmplY3QiLCJoIiwiZWxlbWVudCIsImJhYmVsSGVscGVycy5leHRlbmRzIiwicGFyZW50IiwiJHJvdXRlciIsIiRyb290IiwiJG9wdGlvbnMiLCJhdHRycyIsInJvbGUiLCJvbiIsImNsaWNrIiwibmF0aXZlT24iLCJocmVmIiwiQ3VzdG9tQnV0dG9uTWl4aW4iLCJTdHJpbmciLCJkaXNhYmxlZCIsIkJvb2xlYW4iLCJ0byIsImV4YWN0IiwiYXBwZW5kIiwicmVwbGFjZSIsImFjdGl2ZUNsYXNzIiwiZXhhY3RBY3RpdmVDbGFzcyIsImNvbXB1dGVkIiwiRGlzcGF0Y2hFdmVudE1peGluIiwiZXZlbnQiLCJBcnJheSIsIm1ldGhvZHMiLCJkaXNwYXRjaEV2ZW50IiwiZXZ0IiwiJGVtaXQiLCJ0eXBlIiwidGFyZ2V0IiwiZXZlbnRUYXJnZXQiLCJhcmdzIiwiZXZlbnRBcmdzIiwibGlzdGVuZXJzIiwiJGxpc3RlbmVycyIsImUiLCJzY29wZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwiVk1BVW5pcXVlSWRNaXhpbiIsImJlZm9yZUNyZWF0ZSIsInZtYV91aWRfIiwiX3VpZCIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJNRENDb21wb25lbnQiLCJyb290IiwiZm91bmRhdGlvbiIsInVuZGVmaW5lZCIsInJvb3RfIiwiaW5pdGlhbGl6ZSIsImZvdW5kYXRpb25fIiwiZ2V0RGVmYXVsdEZvdW5kYXRpb24iLCJpbml0IiwiaW5pdGlhbFN5bmNXaXRoRE9NIiwiRXJyb3IiLCJkZXN0cm95IiwiZXZ0VHlwZSIsImhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dERhdGEiLCJzaG91bGRCdWJibGUiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImJ1YmJsZXMiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiY3NzQ2xhc3NlcyIsIlJPT1QiLCJPUEVOIiwiQU5JTUFUSU5HIiwiQkFDS0RST1AiLCJTQ1JPTExfTE9DSyIsIkFDQ0VQVF9CVE4iLCJDQU5DRUxfQlROIiwic3RyaW5ncyIsIk9QRU5fRElBTE9HX1NFTEVDVE9SIiwiRElBTE9HX1NVUkZBQ0VfU0VMRUNUT1IiLCJBQ0NFUFRfU0VMRUNUT1IiLCJBQ0NFUFRfRVZFTlQiLCJDQU5DRUxfRVZFTlQiLCJudW1iZXJzIiwiRElBTE9HX0FOSU1BVElPTl9USU1FX01TIiwiTURDRGlhbG9nRm91bmRhdGlvbiIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJhZGRCb2R5Q2xhc3MiLCJyZW1vdmVCb2R5Q2xhc3MiLCJldmVudFRhcmdldEhhc0NsYXNzIiwicmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJTdXJmYWNlSW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlclN1cmZhY2VJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXIiLCJkZXJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlciIsIm5vdGlmeUFjY2VwdCIsIm5vdGlmeUNhbmNlbCIsInRyYXBGb2N1c09uU3VyZmFjZSIsInVudHJhcEZvY3VzT25TdXJmYWNlIiwiaXNEaWFsb2ciLCJkZWZhdWx0QWRhcHRlciIsImlzT3Blbl8iLCJjb21wb25lbnRDbGlja0hhbmRsZXJfIiwiY2FuY2VsIiwiZGlhbG9nQ2xpY2tIYW5kbGVyXyIsImhhbmRsZURpYWxvZ0NsaWNrXyIsImRvY3VtZW50S2V5ZG93bkhhbmRsZXJfIiwia2V5Q29kZSIsInRpbWVySWRfIiwiYW5pbWF0aW9uVGltZXJFbmRfIiwiaGFuZGxlQW5pbWF0aW9uVGltZXJFbmRfIiwiY2xvc2UiLCJjbGVhclRpbWVvdXQiLCJkaXNhYmxlU2Nyb2xsXyIsInNldFRpbWVvdXQiLCJlbmFibGVTY3JvbGxfIiwic2hvdWxkTm90aWZ5IiwiYWNjZXB0IiwibW9kdWxlIiwiZWwiLCJvcHRpb25zIiwiZWxlbWVudERvY3VtZW50Iiwib3duZXJEb2N1bWVudCIsImJhc2ljVGFiYmFibGVzIiwib3JkZXJlZFRhYmJhYmxlcyIsImlzVW5hdmFpbGFibGUiLCJjcmVhdGVJc1VuYXZhaWxhYmxlIiwiY2FuZGlkYXRlU2VsZWN0b3JzIiwiY2FuZGlkYXRlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJqb2luIiwiaW5jbHVkZUNvbnRhaW5lciIsIm1hdGNoZXMiLCJFbGVtZW50IiwicHJvdG90eXBlIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3IiLCJzb21lIiwiY2FuZGlkYXRlU2VsZWN0b3IiLCJjYWxsIiwic2xpY2UiLCJhcHBseSIsInVuc2hpZnQiLCJjYW5kaWRhdGUiLCJjYW5kaWRhdGVJbmRleEF0dHIiLCJjYW5kaWRhdGVJbmRleCIsImkiLCJsIiwibGVuZ3RoIiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiLCJpc05hTiIsInRhYkluZGV4IiwidGFnTmFtZSIsInB1c2giLCJ0YWJiYWJsZU5vZGVzIiwic29ydCIsImEiLCJiIiwiaW5kZXgiLCJtYXAiLCJub2RlIiwiaXNPZmZDYWNoZSIsImlzT2ZmIiwibm9kZUNvbXB1dGVkU3R5bGUiLCJkb2N1bWVudEVsZW1lbnQiLCJkZWZhdWx0VmlldyIsImdldENvbXB1dGVkU3R5bGUiLCJyZXN1bHQiLCJkaXNwbGF5IiwicGFyZW50Tm9kZSIsImNvbXB1dGVkU3R5bGUiLCJ2aXNpYmlsaXR5IiwibGlzdGVuaW5nRm9jdXNUcmFwIiwiZm9jdXNUcmFwIiwidXNlck9wdGlvbnMiLCJmaXJzdFRhYmJhYmxlTm9kZSIsImxhc3RUYWJiYWJsZU5vZGUiLCJub2RlRm9jdXNlZEJlZm9yZUFjdGl2YXRpb24iLCJhY3RpdmUiLCJwYXVzZWQiLCJ0YWJFdmVudCIsImNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJjb25maWciLCJyZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZSIsImVzY2FwZURlYWN0aXZhdGVzIiwidHJhcCIsImFjdGl2YXRlIiwiZGVhY3RpdmF0ZSIsInBhdXNlIiwidW5wYXVzZSIsImFjdGl2YXRlT3B0aW9ucyIsImRlZmF1bHRlZEFjdGl2YXRlT3B0aW9ucyIsIm9uQWN0aXZhdGUiLCJhY3RpdmVFbGVtZW50IiwiZGVhY3RpdmF0ZU9wdGlvbnMiLCJkZWZhdWx0ZWREZWFjdGl2YXRlT3B0aW9ucyIsInJldHVybkZvY3VzIiwib25EZWFjdGl2YXRlIiwiYWRkTGlzdGVuZXJzIiwiZmlyc3RGb2N1c05vZGUiLCJjaGVja0ZvY3VzIiwiY2hlY2tDbGljayIsImNoZWNrUG9pbnRlckRvd24iLCJjaGVja0tleSIsInJlbW92ZUxpc3RlbmVycyIsImdldE5vZGVGb3JPcHRpb24iLCJvcHRpb25OYW1lIiwib3B0aW9uVmFsdWUiLCJjb250YWlucyIsImNsaWNrT3V0c2lkZURlYWN0aXZhdGVzIiwicHJldmVudERlZmF1bHQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJibHVyIiwiaXNFc2NhcGVFdmVudCIsImhhbmRsZVRhYiIsImhhc0F0dHJpYnV0ZSIsIk51bWJlciIsImN1cnJlbnRGb2N1c0luZGV4IiwiaW5kZXhPZiIsInNoaWZ0S2V5IiwidHJ5Rm9jdXMiLCJ1cGRhdGVUYWJiYWJsZU5vZGVzIiwidGFiYmFibGUiLCJyZWFkanVzdEZvY3VzIiwiZm9jdXMiLCJ0b0xvd2VyQ2FzZSIsInNlbGVjdCIsImNyZWF0ZUZvY3VzVHJhcEluc3RhbmNlIiwic3VyZmFjZUVsIiwiYWNjZXB0QnV0dG9uRWwiLCJmb2N1c1RyYXBGYWN0b3J5IiwiY3JlYXRlRm9jdXNUcmFwIiwiaW5pdGlhbEZvY3VzIiwiTURDUmlwcGxlQWRhcHRlciIsImNsYXNzTmFtZSIsInZhck5hbWUiLCJ2YWx1ZSIsIlVOQk9VTkRFRCIsIkJHX0ZPQ1VTRUQiLCJGR19BQ1RJVkFUSU9OIiwiRkdfREVBQ1RJVkFUSU9OIiwiVkFSX0xFRlQiLCJWQVJfVE9QIiwiVkFSX0ZHX1NJWkUiLCJWQVJfRkdfU0NBTEUiLCJWQVJfRkdfVFJBTlNMQVRFX1NUQVJUIiwiVkFSX0ZHX1RSQU5TTEFURV9FTkQiLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJERUFDVElWQVRJT05fVElNRU9VVF9NUyIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsInN1cHBvcnRzUGFzc2l2ZV8iLCJkZXRlY3RFZGdlUHNldWRvVmFyQnVnIiwid2luZG93T2JqIiwiYm9keSIsImFwcGVuZENoaWxkIiwiaGFzUHNldWRvVmFyQnVnIiwiYm9yZGVyVG9wU3R5bGUiLCJyZW1vdmUiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlcyIsImZvcmNlUmVmcmVzaCIsInN1cHBvcnRzRnVuY3Rpb25QcmVzZW50IiwiQ1NTIiwic3VwcG9ydHMiLCJleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIiwid2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzIiwiYXBwbHlQYXNzaXZlIiwiZ2xvYmFsT2JqIiwiaXNTdXBwb3J0ZWQiLCJwYXNzaXZlIiwiZ2V0TWF0Y2hlc1Byb3BlcnR5IiwiSFRNTEVsZW1lbnRQcm90b3R5cGUiLCJmaWx0ZXIiLCJwIiwicG9wIiwiZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzIiwiZXYiLCJwYWdlT2Zmc2V0IiwiY2xpZW50UmVjdCIsIngiLCJ5IiwiZG9jdW1lbnRYIiwibGVmdCIsImRvY3VtZW50WSIsInRvcCIsIm5vcm1hbGl6ZWRYIiwibm9ybWFsaXplZFkiLCJjaGFuZ2VkVG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJhY3RpdmF0ZWRUYXJnZXRzIiwiTURDUmlwcGxlRm91bmRhdGlvbiIsImJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMiLCJpc1VuYm91bmRlZCIsImlzU3VyZmFjZUFjdGl2ZSIsImlzU3VyZmFjZURpc2FibGVkIiwiY29udGFpbnNFdmVudFRhcmdldCIsInJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJkZXJlZ2lzdGVyUmVzaXplSGFuZGxlciIsInVwZGF0ZUNzc1ZhcmlhYmxlIiwiY29tcHV0ZUJvdW5kaW5nUmVjdCIsImdldFdpbmRvd1BhZ2VPZmZzZXQiLCJsYXlvdXRGcmFtZV8iLCJmcmFtZV8iLCJ3aWR0aCIsImhlaWdodCIsImFjdGl2YXRpb25TdGF0ZV8iLCJkZWZhdWx0QWN0aXZhdGlvblN0YXRlXyIsImluaXRpYWxTaXplXyIsIm1heFJhZGl1c18iLCJhY3RpdmF0ZUhhbmRsZXJfIiwiYWN0aXZhdGVfIiwiZGVhY3RpdmF0ZUhhbmRsZXJfIiwiZGVhY3RpdmF0ZV8iLCJmb2N1c0hhbmRsZXJfIiwiaGFuZGxlRm9jdXMiLCJibHVySGFuZGxlcl8iLCJoYW5kbGVCbHVyIiwicmVzaXplSGFuZGxlcl8iLCJsYXlvdXQiLCJ1bmJvdW5kZWRDb29yZHNfIiwiZmdTY2FsZV8iLCJhY3RpdmF0aW9uVGltZXJfIiwiZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfIiwiYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyIsImFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyIsInJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XyIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyIsImlzQWN0aXZhdGVkIiwiaGFzRGVhY3RpdmF0aW9uVVhSdW4iLCJ3YXNBY3RpdmF0ZWRCeVBvaW50ZXIiLCJ3YXNFbGVtZW50TWFkZUFjdGl2ZSIsImFjdGl2YXRpb25FdmVudCIsImlzUHJvZ3JhbW1hdGljIiwiaXNTdXBwb3J0ZWRfIiwicmVnaXN0ZXJSb290SGFuZGxlcnNfIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibGF5b3V0SW50ZXJuYWxfIiwiZGVyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwicmVtb3ZlQ3NzVmFyc18iLCJmb3JFYWNoIiwia2V5cyIsImsiLCJhY3RpdmF0aW9uU3RhdGUiLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudCIsImlzU2FtZUludGVyYWN0aW9uIiwiaGFzQWN0aXZhdGVkQ2hpbGQiLCJyZXNldEFjdGl2YXRpb25TdGF0ZV8iLCJyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsImNoZWNrRWxlbWVudE1hZGVBY3RpdmVfIiwiYW5pbWF0ZUFjdGl2YXRpb25fIiwidHJhbnNsYXRlU3RhcnQiLCJ0cmFuc2xhdGVFbmQiLCJnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfIiwic3RhcnRQb2ludCIsImVuZFBvaW50Iiwicm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfIiwiYWN0aXZhdGlvbkhhc0VuZGVkIiwic3RhdGUiLCJldnRPYmplY3QiLCJhbmltYXRlRGVhY3RpdmF0aW9uXyIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibWF4RGltIiwibWF4IiwiZ2V0Qm91bmRlZFJhZGl1cyIsImh5cG90ZW51c2UiLCJzcXJ0IiwicG93IiwidXBkYXRlTGF5b3V0Q3NzVmFyc18iLCJyb3VuZCIsInVuYm91bmRlZCIsIlJpcHBsZUJhc2UiLCJyZWYiLCJNQVRDSEVTIiwiX21hdGNoZXMiLCJIVE1MRWxlbWVudCIsIiRlbCIsIiRzZXQiLCJjbGFzc2VzIiwiJGRlbGV0ZSIsInN0eWxlcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhZ2VYT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJSaXBwbGVNaXhpbiIsIm1vdW50ZWQiLCJyaXBwbGUiLCJiZWZvcmVEZXN0cm95IiwibWRjRGlhbG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQU8sU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEI7SUFDL0I7SUFDQSxNQUFJQyxPQUFPLElBQVg7SUFDQSxNQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7SUFDakNELFdBQU9DLE9BQU9DLEdBQWQ7SUFDRCxHQUZELE1BRU8sSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0lBQ3hDO0lBQ0FILFdBQU9HLE9BQU9ELEdBQWQ7SUFDRDtJQUNELE1BQUlGLElBQUosRUFBVTtJQUNSQSxTQUFLSSxHQUFMLENBQVNMLE1BQVQ7SUFDRDtJQUNGOztJQ1pNLFNBQVNNLFVBQVQsQ0FBb0JDLFVBQXBCLEVBQWdDO0lBQ3JDLFNBQU87SUFDTEMsYUFBUyxRQURKO0lBRUxDLGFBQVMscUJBQU07SUFDYixXQUFLLElBQUlDLEdBQVQsSUFBZ0JILFVBQWhCLEVBQTRCO0lBQzFCLFlBQUlJLFlBQVlKLFdBQVdHLEdBQVgsQ0FBaEI7SUFDQUUsV0FBR0QsU0FBSCxDQUFhQSxVQUFVRSxJQUF2QixFQUE2QkYsU0FBN0I7SUFDRDtJQUNGLEtBUEk7SUFRTEo7SUFSSyxHQUFQO0lBVUQ7O0lDWE0sSUFBTU8sZ0JBQWdCO0lBQzNCQyxjQUFZLElBRGU7SUFFM0JDLFFBRjJCLGtC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
