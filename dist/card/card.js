/**
* @module vue-mdc-adaptercard 0.18.2
* @exports VueMDCCard
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCCard = factory());
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

    var CustomLink = {
      name: 'custom-link',
      functional: true,
      props: {
        tag: { type: String, default: 'a' },
        link: Object
      },
      render: function render(h, context) {
        var element = void 0;
        var data = _extends({}, context.data);

        if (context.props.link && context.parent.$router) {
          // router-link case
          element = context.parent.$root.$options.components['router-link'];
          data.props = _extends({ tag: context.props.tag }, context.props.link);
          if (data.on.click) {
            data.nativeOn = { click: data.on.click };
          }
        } else {
          // element fallback
          element = context.props.tag;
        }

        return h(element, data, context.children);
      }
    };

    var CustomLinkMixin = {
      props: {
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
        CustomLink: CustomLink
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

    //
    //
    //
    //
    //
    //
    //
    //

    var script = {
      name: 'mdc-card',
      props: {
        outlined: Boolean
      }
    };

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "mdc-card", class: { "mdc-card--outlined": _vm.outlined } }, [_vm._t("default")], 2);
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
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/card/mdc-card.vue";

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

    var mdcCard = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

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

    var cssClasses = {
      // Ripple is a special case where the "root" component is really a "mixin" of sorts,
      // given that it's an 'upgrade' to an existing component. That being said it is the root
      // CSS class that all other CSS classes derive from.
      ROOT: 'mdc-ripple-upgraded',
      UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
      BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
      FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
      FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
    };

    var strings = {
      VAR_LEFT: '--mdc-ripple-left',
      VAR_TOP: '--mdc-ripple-top',
      VAR_FG_SIZE: '--mdc-ripple-fg-size',
      VAR_FG_SCALE: '--mdc-ripple-fg-scale',
      VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
      VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
    };

    var numbers = {
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

          var strings$$1 = MDCRippleFoundation.strings;

          Object.keys(strings$$1).forEach(function (k) {
            if (k.indexOf('VAR_') === 0) {
              _this8.adapter_.updateCssVariable(strings$$1[k], null);
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
            }, numbers.FG_DEACTIVATION_MS);
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

    var script$1 = {
      name: 'mdc-ripple',
      mixins: [CustomElementMixin, RippleMixin],
      props: {
        tag: String
      }
    };

    /* script */
    var __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("custom-element", {
        staticClass: "mdc-ripple",
        attrs: { tag: _vm.tag, classes: _vm.classes, styles: _vm.styles }
      }, [_vm._t("default")], 2);
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

    __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

    //
    var script$2 = {
      name: 'mdc-card-primary-action',
      mixins: [DispatchEventMixin, CustomLinkMixin, RippleMixin],
      data: function data() {
        return {
          classes: {},
          styles: {}
        };
      }
    };

    /* script */
    var __vue_script__$2 = script$2;

    /* template */
    var __vue_render__$2 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("custom-link", _vm._g({
        staticClass: "mdc-card-primary-action mdc-card__primary-action",
        class: _vm.classes,
        style: _vm.styles,
        attrs: { link: _vm.link }
      }, _vm.listeners), [_vm._t("default")], 2);
    };
    var __vue_staticRenderFns__$2 = [];
    __vue_render__$2._withStripped = true;

    /* style */
    var __vue_inject_styles__$2 = undefined;
    /* scoped */
    var __vue_scope_id__$2 = undefined;
    /* module identifier */
    var __vue_module_identifier__$2 = undefined;
    /* functional template */
    var __vue_is_functional_template__$2 = false;
    /* component normalizer */
    function __vue_normalize__$2(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/card/mdc-card-primary-action.vue";

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

    var mdcCardPrimaryAction = __vue_normalize__$2({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, __vue_create_injector__$2, undefined);

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script$3 = {
      name: 'mdc-card-media',
      props: {
        src: String,
        square: Boolean
      },
      computed: {
        styles: function styles() {
          var styles = {
            backgroundImage: 'url(' + this.src + ')'
          };

          return styles;
        },
        classes: function classes() {
          return this.square ? 'mdc-card__media--square' : 'mdc-card__media--16-9';
        }
      }
    };

    /* script */
    var __vue_script__$3 = script$3;

    /* template */
    var __vue_render__$3 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("section", {
        staticClass: "mdc-card-media mdc-card__media",
        class: _vm.classes,
        style: _vm.styles
      }, [_vm.$slots.default ? _c("div", { staticClass: "mdc-card__media-content" }, [_vm._t("default")], 2) : _vm._e()]);
    };
    var __vue_staticRenderFns__$3 = [];
    __vue_render__$3._withStripped = true;

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
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/card/mdc-card-media.vue";

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

    var mdcCardMedia = __vue_normalize__$3({ render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, __vue_create_injector__$3, undefined);

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script$4 = {
      name: 'mdc-card-header',
      props: {
        title: String,
        subtitle: String,
        'large-title': { type: Boolean, default: true }
      }
    };

    /* script */
    var __vue_script__$4 = script$4;

    /* template */
    var __vue_render__$4 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("section", { staticClass: "mdc-card-header mdc-card__primary" }, [_vm._t("default", [_vm.title ? _c("h1", {
        staticClass: "mdc-card__title",
        class: { "mdc-card__title--large": _vm.largeTitle }
      }, [_vm._v("\n      " + _vm._s(_vm.title) + "\n    ")]) : _vm._e(), _vm._v(" "), _vm.subtitle ? _c("h2", { staticClass: "mdc-card__subtitle" }, [_vm._v("\n      " + _vm._s(_vm.subtitle) + " \n    ")]) : _vm._e()])], 2);
    };
    var __vue_staticRenderFns__$4 = [];
    __vue_render__$4._withStripped = true;

    /* style */
    var __vue_inject_styles__$4 = undefined;
    /* scoped */
    var __vue_scope_id__$4 = undefined;
    /* module identifier */
    var __vue_module_identifier__$4 = undefined;
    /* functional template */
    var __vue_is_functional_template__$4 = false;
    /* component normalizer */
    function __vue_normalize__$4(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/card/mdc-card-header.vue";

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
    function __vue_create_injector__$4() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$4.styles || (__vue_create_injector__$4.styles = {});
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

    var mdcCardHeader = __vue_normalize__$4({ render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, __vue_create_injector__$4, undefined);

    //
    //
    //
    //
    //
    //
    //
    //

    var script$5 = {
      name: 'mdc-card-title',
      props: {
        large: Boolean
      }
    };

    /* script */
    var __vue_script__$5 = script$5;

    /* template */
    var __vue_render__$5 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("h1", {
        staticClass: "mdc-card-title mdc-card__title",
        class: { "mdc-card__title--large": _vm.large }
      }, [_vm._t("default")], 2);
    };
    var __vue_staticRenderFns__$5 = [];
    __vue_render__$5._withStripped = true;

    /* style */
    var __vue_inject_styles__$5 = undefined;
    /* scoped */
    var __vue_scope_id__$5 = undefined;
    /* module identifier */
    var __vue_module_identifier__$5 = undefined;
    /* functional template */
    var __vue_is_functional_template__$5 = false;
    /* component normalizer */
    function __vue_normalize__$5(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/card/mdc-card-title.vue";

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
    function __vue_create_injector__$5() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$5.styles || (__vue_create_injector__$5.styles = {});
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

    var mdcCardTitle = __vue_normalize__$5({ render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 }, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, __vue_create_injector__$5, undefined);

    //
    //
    //
    //
    //
    //
    //
    //

    var script$6 = {
      name: 'mdc-card-subtitle'
    };

    /* script */
    var __vue_script__$6 = script$6;

    /* template */
    var __vue_render__$6 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("h2", { staticClass: "mdc-card-subtitle mdc-card__subtitle" }, [_vm._t("default")], 2);
    };
    var __vue_staticRenderFns__$6 = [];
    __vue_render__$6._withStripped = true;

    /* style */
    var __vue_inject_styles__$6 = undefined;
    /* scoped */
    var __vue_scope_id__$6 = undefined;
    /* module identifier */
    var __vue_module_identifier__$6 = undefined;
    /* functional template */
    var __vue_is_functional_template__$6 = false;
    /* component normalizer */
    function __vue_normalize__$6(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/card/mdc-card-subtitle.vue";

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
    function __vue_create_injector__$6() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$6.styles || (__vue_create_injector__$6.styles = {});
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

    var mdcCardSubtitle = __vue_normalize__$6({ render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 }, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, __vue_create_injector__$6, undefined);

    //
    //
    //
    //
    //
    //

    var script$7 = {
      name: 'mdc-card-text'
    };

    /* script */
    var __vue_script__$7 = script$7;

    /* template */
    var __vue_render__$7 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("section", { staticClass: "mdc-card-text mdc-card__supporting-text" }, [_vm._t("default")], 2);
    };
    var __vue_staticRenderFns__$7 = [];
    __vue_render__$7._withStripped = true;

    /* style */
    var __vue_inject_styles__$7 = undefined;
    /* scoped */
    var __vue_scope_id__$7 = undefined;
    /* module identifier */
    var __vue_module_identifier__$7 = undefined;
    /* functional template */
    var __vue_is_functional_template__$7 = false;
    /* component normalizer */
    function __vue_normalize__$7(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/card/mdc-card-text.vue";

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
    function __vue_create_injector__$7() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$7.styles || (__vue_create_injector__$7.styles = {});
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

    var mdcCardText = __vue_normalize__$7({ render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 }, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, __vue_create_injector__$7, undefined);

    //
    //
    //
    //
    //
    //
    //
    //

    var script$8 = {
      name: 'mdc-card-actions',
      props: {
        fullBleed: Boolean
      },
      computed: {
        classes: function classes() {
          return {
            'mdc-card__actions--full-bleed': this.fullBleed
          };
        }
      }
    };

    /* script */
    var __vue_script__$8 = script$8;

    /* template */
    var __vue_render__$8 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("section", { staticClass: "mdc-card-actions mdc-card__actions", class: _vm.classes }, [_vm._t("default")], 2);
    };
    var __vue_staticRenderFns__$8 = [];
    __vue_render__$8._withStripped = true;

    /* style */
    var __vue_inject_styles__$8 = undefined;
    /* scoped */
    var __vue_scope_id__$8 = undefined;
    /* module identifier */
    var __vue_module_identifier__$8 = undefined;
    /* functional template */
    var __vue_is_functional_template__$8 = false;
    /* component normalizer */
    function __vue_normalize__$8(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/card/mdc-card-actions.vue";

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
    function __vue_create_injector__$8() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$8.styles || (__vue_create_injector__$8.styles = {});
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

    var mdcCardActions = __vue_normalize__$8({ render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 }, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, __vue_create_injector__$8, undefined);

    //
    //
    //
    //
    //
    //

    var script$9 = {
      name: 'mdc-card-action-buttons'
    };

    /* script */
    var __vue_script__$9 = script$9;

    /* template */
    var __vue_render__$9 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "mdc-card-action-buttons mdc-card__action-buttons" }, [_vm._t("default")], 2);
    };
    var __vue_staticRenderFns__$9 = [];
    __vue_render__$9._withStripped = true;

    /* style */
    var __vue_inject_styles__$9 = undefined;
    /* scoped */
    var __vue_scope_id__$9 = undefined;
    /* module identifier */
    var __vue_module_identifier__$9 = undefined;
    /* functional template */
    var __vue_is_functional_template__$9 = false;
    /* component normalizer */
    function __vue_normalize__$9(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/card/mdc-card-action-buttons.vue";

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
    function __vue_create_injector__$9() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$9.styles || (__vue_create_injector__$9.styles = {});
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

    var mdcCardActionButtons = __vue_normalize__$9({ render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 }, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, __vue_create_injector__$9, undefined);

    //

    var script$a = {
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
    var __vue_script__$a = script$a;

    /* template */
    var __vue_render__$a = function __vue_render__() {
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
    var __vue_staticRenderFns__$a = [];
    __vue_render__$a._withStripped = true;

    /* style */
    var __vue_inject_styles__$a = undefined;
    /* scoped */
    var __vue_scope_id__$a = undefined;
    /* module identifier */
    var __vue_module_identifier__$a = undefined;
    /* functional template */
    var __vue_is_functional_template__$a = false;
    /* component normalizer */
    function __vue_normalize__$a(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
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
    function __vue_create_injector__$a() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$a.styles || (__vue_create_injector__$a.styles = {});
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

    var mdcButtonBase = __vue_normalize__$a({ render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a }, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, __vue_create_injector__$a, undefined);

    var script$b = {
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
    var __vue_script__$b = script$b;

    /* template */

    /* style */
    var __vue_inject_styles__$b = undefined;
    /* scoped */
    var __vue_scope_id__$b = undefined;
    /* module identifier */
    var __vue_module_identifier__$b = undefined;
    /* functional template */
    var __vue_is_functional_template__$b = undefined;
    /* component normalizer */
    function __vue_normalize__$b(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
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
    function __vue_create_injector__$b() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$b.styles || (__vue_create_injector__$b.styles = {});
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

    __vue_normalize__$b({}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, __vue_create_injector__$b, undefined);

    var script$c = {
      name: 'mdc-card-action-button',
      extends: mdcButtonBase,
      data: function data() {
        return {
          classes: {
            'mdc-button': true,
            'mdc-card__action': true,
            'mdc-card-action-button': true
          }
        };
      }
    };

    /* script */
    var __vue_script__$c = script$c;

    /* template */

    /* style */
    var __vue_inject_styles__$c = undefined;
    /* scoped */
    var __vue_scope_id__$c = undefined;
    /* module identifier */
    var __vue_module_identifier__$c = undefined;
    /* functional template */
    var __vue_is_functional_template__$c = undefined;
    /* component normalizer */
    function __vue_normalize__$c(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/card/mdc-card-action-button.vue";

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
    function __vue_create_injector__$c() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$c.styles || (__vue_create_injector__$c.styles = {});
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

    var mdcCardActionButton = __vue_normalize__$c({}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, __vue_create_injector__$c, undefined);

    //
    //
    //
    //
    //
    //

    var script$d = {
      name: 'mdc-card-action-icons'
    };

    /* script */
    var __vue_script__$d = script$d;

    /* template */
    var __vue_render__$b = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "mdc-card-action-icons mdc-card__action-icons" }, [_vm._t("default")], 2);
    };
    var __vue_staticRenderFns__$b = [];
    __vue_render__$b._withStripped = true;

    /* style */
    var __vue_inject_styles__$d = undefined;
    /* scoped */
    var __vue_scope_id__$d = undefined;
    /* module identifier */
    var __vue_module_identifier__$d = undefined;
    /* functional template */
    var __vue_is_functional_template__$d = false;
    /* component normalizer */
    function __vue_normalize__$d(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/card/mdc-card-action-icons.vue";

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
    function __vue_create_injector__$d() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$d.styles || (__vue_create_injector__$d.styles = {});
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

    var mdcCardActionIcons = __vue_normalize__$d({ render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b }, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, __vue_create_injector__$d, undefined);

    //

    var script$e = {
      name: 'mdc-card-action-icon',
      mixins: [DispatchEventMixin],
      props: {
        icon: String
      },
      data: function data() {
        return {
          classes: {
            'mdc-card-action-icon': true,
            'material-icons': !!this.icon,
            'mdc-card__action': true,
            'mdc-card__action--icon': true,
            'mdc-icon-toggle': true
          },
          styles: {}
        };
      },

      watch: {
        icon: function icon() {
          this.$set(this.classes, 'material-icons', !!this.icon);
        }
      },
      mounted: function mounted() {
        this.ripple = new RippleBase(this, {
          isUnbounded: function isUnbounded() {
            return true;
          }
        });
        this.ripple.init();
      },
      beforeDestroy: function beforeDestroy() {
        this.ripple.destroy();
      }
    };

    /* script */
    var __vue_script__$e = script$e;

    /* template */
    var __vue_render__$c = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("span", _vm._g({ class: _vm.classes, style: _vm.styles }, _vm.listeners), [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
    };
    var __vue_staticRenderFns__$c = [];
    __vue_render__$c._withStripped = true;

    /* style */
    var __vue_inject_styles__$e = undefined;
    /* scoped */
    var __vue_scope_id__$e = undefined;
    /* module identifier */
    var __vue_module_identifier__$e = undefined;
    /* functional template */
    var __vue_is_functional_template__$e = false;
    /* component normalizer */
    function __vue_normalize__$e(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/card/mdc-card-action-icon.vue";

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
    function __vue_create_injector__$e() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$e.styles || (__vue_create_injector__$e.styles = {});
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

    var mdcCardActionIcon = __vue_normalize__$e({ render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c }, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, __vue_create_injector__$e, undefined);

    var plugin = BasePlugin({
      mdcCard: mdcCard,
      mdcCardPrimaryAction: mdcCardPrimaryAction,
      mdcCardMedia: mdcCardMedia,
      mdcCardHeader: mdcCardHeader,
      mdcCardTitle: mdcCardTitle,
      mdcCardSubtitle: mdcCardSubtitle,
      mdcCardText: mdcCardText,
      mdcCardActions: mdcCardActions,
      mdcCardActionButtons: mdcCardActionButtons,
      mdcCardActionButton: mdcCardActionButton,
      mdcCardActionIcons: mdcCardActionIcons,
      mdcCardActionIcon: mdcCardActionIcon
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZWxlbWVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tbGluay5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWJ1dHRvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9kaXNwYXRjaC1ldmVudC1taXhpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS91bmlxdWVpZC1taXhpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvY2FyZC9tZGMtY2FyZC52dWUiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS91dGlsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmlwcGxlL21kYy1yaXBwbGUtYmFzZS5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmlwcGxlL21kYy1yaXBwbGUudnVlIiwiLi4vLi4vY29tcG9uZW50cy9jYXJkL21kYy1jYXJkLXByaW1hcnktYWN0aW9uLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvY2FyZC9tZGMtY2FyZC1tZWRpYS52dWUiLCIuLi8uLi9jb21wb25lbnRzL2NhcmQvbWRjLWNhcmQtaGVhZGVyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvY2FyZC9tZGMtY2FyZC10aXRsZS52dWUiLCIuLi8uLi9jb21wb25lbnRzL2NhcmQvbWRjLWNhcmQtc3VidGl0bGUudnVlIiwiLi4vLi4vY29tcG9uZW50cy9jYXJkL21kYy1jYXJkLXRleHQudnVlIiwiLi4vLi4vY29tcG9uZW50cy9jYXJkL21kYy1jYXJkLWFjdGlvbnMudnVlIiwiLi4vLi4vY29tcG9uZW50cy9jYXJkL21kYy1jYXJkLWFjdGlvbi1idXR0b25zLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL21kYy1idXR0b24tYmFzZS52dWUiLCIuLi8uLi9jb21wb25lbnRzL2J1dHRvbi9tZGMtYnV0dG9uLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvY2FyZC9tZGMtY2FyZC1hY3Rpb24tYnV0dG9uLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvY2FyZC9tZGMtY2FyZC1hY3Rpb24taWNvbnMudnVlIiwiLi4vLi4vY29tcG9uZW50cy9jYXJkL21kYy1jYXJkLWFjdGlvbi1pY29uLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvY2FyZC9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvY2FyZC9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4oY29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXG4gICAgaW5zdGFsbDogdm0gPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHNcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IEN1c3RvbUVsZW1lbnQgPSB7XG4gIGZ1bmN0aW9uYWw6IHRydWUsXG4gIHJlbmRlcihjcmVhdGVFbGVtZW50LCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoXG4gICAgICBjb250ZXh0LnByb3BzLmlzIHx8IGNvbnRleHQucHJvcHMudGFnIHx8ICdkaXYnLFxuICAgICAgY29udGV4dC5kYXRhLFxuICAgICAgY29udGV4dC5jaGlsZHJlblxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQ3VzdG9tRWxlbWVudE1peGluID0ge1xuICBjb21wb25lbnRzOiB7XG4gICAgQ3VzdG9tRWxlbWVudFxuICB9XG59XG4iLCJleHBvcnQgY29uc3QgQ3VzdG9tTGluayA9IHtcbiAgbmFtZTogJ2N1c3RvbS1saW5rJyxcbiAgZnVuY3Rpb25hbDogdHJ1ZSxcbiAgcHJvcHM6IHtcbiAgICB0YWc6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnYScgfSxcbiAgICBsaW5rOiBPYmplY3RcbiAgfSxcbiAgcmVuZGVyKGgsIGNvbnRleHQpIHtcbiAgICBsZXQgZWxlbWVudFxuICAgIGxldCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGV4dC5kYXRhKVxuXG4gICAgaWYgKGNvbnRleHQucHJvcHMubGluayAmJiBjb250ZXh0LnBhcmVudC4kcm91dGVyKSB7XG4gICAgICAvLyByb3V0ZXItbGluayBjYXNlXG4gICAgICBlbGVtZW50ID0gY29udGV4dC5wYXJlbnQuJHJvb3QuJG9wdGlvbnMuY29tcG9uZW50c1sncm91dGVyLWxpbmsnXVxuICAgICAgZGF0YS5wcm9wcyA9IE9iamVjdC5hc3NpZ24oeyB0YWc6IGNvbnRleHQucHJvcHMudGFnIH0sIGNvbnRleHQucHJvcHMubGluaylcbiAgICAgIGlmIChkYXRhLm9uLmNsaWNrKSB7XG4gICAgICAgIGRhdGEubmF0aXZlT24gPSB7IGNsaWNrOiBkYXRhLm9uLmNsaWNrIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZWxlbWVudCBmYWxsYmFja1xuICAgICAgZWxlbWVudCA9IGNvbnRleHQucHJvcHMudGFnXG4gICAgfVxuXG4gICAgcmV0dXJuIGgoZWxlbWVudCwgZGF0YSwgY29udGV4dC5jaGlsZHJlbilcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQ3VzdG9tTGlua01peGluID0ge1xuICBwcm9wczoge1xuICAgIHRvOiBbU3RyaW5nLCBPYmplY3RdLFxuICAgIGV4YWN0OiBCb29sZWFuLFxuICAgIGFwcGVuZDogQm9vbGVhbixcbiAgICByZXBsYWNlOiBCb29sZWFuLFxuICAgIGFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gICAgZXhhY3RBY3RpdmVDbGFzczogU3RyaW5nXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgbGluaygpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMudG8gJiYge1xuICAgICAgICAgIHRvOiB0aGlzLnRvLFxuICAgICAgICAgIGV4YWN0OiB0aGlzLmV4YWN0LFxuICAgICAgICAgIGFwcGVuZDogdGhpcy5hcHBlbmQsXG4gICAgICAgICAgcmVwbGFjZTogdGhpcy5yZXBsYWNlLFxuICAgICAgICAgIGFjdGl2ZUNsYXNzOiB0aGlzLmFjdGl2ZUNsYXNzLFxuICAgICAgICAgIGV4YWN0QWN0aXZlQ2xhc3M6IHRoaXMuZXhhY3RBY3RpdmVDbGFzc1xuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgQ3VzdG9tTGlua1xuICB9XG59XG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgbGV0IGV2dFxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXG4gIH1cbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXG59XG4iLCJleHBvcnQgY29uc3QgQ3VzdG9tQnV0dG9uID0ge1xuICBuYW1lOiAnY3VzdG9tLWJ1dHRvbicsXG4gIGZ1bmN0aW9uYWw6IHRydWUsXG4gIHByb3BzOiB7XG4gICAgbGluazogT2JqZWN0XG4gIH0sXG4gIHJlbmRlcihoLCBjb250ZXh0KSB7XG4gICAgbGV0IGVsZW1lbnRcbiAgICBsZXQgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGNvbnRleHQuZGF0YSlcblxuICAgIGlmIChjb250ZXh0LnByb3BzLmxpbmsgJiYgY29udGV4dC5wYXJlbnQuJHJvdXRlcikge1xuICAgICAgLy8gcm91dGVyLWxpbmsgY2FzZVxuICAgICAgZWxlbWVudCA9IGNvbnRleHQucGFyZW50LiRyb290LiRvcHRpb25zLmNvbXBvbmVudHNbJ3JvdXRlci1saW5rJ11cbiAgICAgIGRhdGEucHJvcHMgPSBPYmplY3QuYXNzaWduKHsgdGFnOiBjb250ZXh0LnByb3BzLnRhZyB9LCBjb250ZXh0LnByb3BzLmxpbmspXG4gICAgICBkYXRhLmF0dHJzLnJvbGUgPSAnYnV0dG9uJ1xuICAgICAgaWYgKGRhdGEub24uY2xpY2spIHtcbiAgICAgICAgZGF0YS5uYXRpdmVPbiA9IHsgY2xpY2s6IGRhdGEub24uY2xpY2sgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGF0YS5hdHRycyAmJiBkYXRhLmF0dHJzLmhyZWYpIHtcbiAgICAgIC8vIGhyZWYgY2FzZVxuICAgICAgZWxlbWVudCA9ICdhJ1xuICAgICAgZGF0YS5hdHRycy5yb2xlID0gJ2J1dHRvbidcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYnV0dG9uIGZhbGxiYWNrXG4gICAgICBlbGVtZW50ID0gJ2J1dHRvbidcbiAgICB9XG5cbiAgICByZXR1cm4gaChlbGVtZW50LCBkYXRhLCBjb250ZXh0LmNoaWxkcmVuKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBDdXN0b21CdXR0b25NaXhpbiA9IHtcbiAgcHJvcHM6IHtcbiAgICBocmVmOiBTdHJpbmcsXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgdG86IFtTdHJpbmcsIE9iamVjdF0sXG4gICAgZXhhY3Q6IEJvb2xlYW4sXG4gICAgYXBwZW5kOiBCb29sZWFuLFxuICAgIHJlcGxhY2U6IEJvb2xlYW4sXG4gICAgYWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgICBleGFjdEFjdGl2ZUNsYXNzOiBTdHJpbmdcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBsaW5rKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy50byAmJiB7XG4gICAgICAgICAgdG86IHRoaXMudG8sXG4gICAgICAgICAgZXhhY3Q6IHRoaXMuZXhhY3QsXG4gICAgICAgICAgYXBwZW5kOiB0aGlzLmFwcGVuZCxcbiAgICAgICAgICByZXBsYWNlOiB0aGlzLnJlcGxhY2UsXG4gICAgICAgICAgYWN0aXZlQ2xhc3M6IHRoaXMuYWN0aXZlQ2xhc3MsXG4gICAgICAgICAgZXhhY3RBY3RpdmVDbGFzczogdGhpcy5leGFjdEFjdGl2ZUNsYXNzXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIH0sXG4gIGNvbXBvbmVudHM6IHtcbiAgICBDdXN0b21CdXR0b25cbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IERpc3BhdGNoRXZlbnRNaXhpbiA9IHtcbiAgcHJvcHM6IHtcbiAgICBldmVudDogU3RyaW5nLFxuICAgICdldmVudC10YXJnZXQnOiBPYmplY3QsXG4gICAgJ2V2ZW50LWFyZ3MnOiBBcnJheVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgZGlzcGF0Y2hFdmVudChldnQpIHtcbiAgICAgIGV2dCAmJiB0aGlzLiRlbWl0KGV2dC50eXBlLCBldnQpXG4gICAgICBpZiAodGhpcy5ldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5ldmVudFRhcmdldCB8fCB0aGlzLiRyb290XG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5ldmVudEFyZ3MgfHwgW11cbiAgICAgICAgdGFyZ2V0LiRlbWl0KHRoaXMuZXZlbnQsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGxpc3RlbmVycygpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnRoaXMuJGxpc3RlbmVycyxcbiAgICAgICAgY2xpY2s6IGUgPT4gdGhpcy5kaXNwYXRjaEV2ZW50KGUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJjb25zdCBzY29wZSA9XG4gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMHgxMDAwMDAwMCkpLnRvU3RyaW5nKCkgKyAnLSdcblxuZXhwb3J0IGNvbnN0IFZNQVVuaXF1ZUlkTWl4aW4gPSB7XG4gIGJlZm9yZUNyZWF0ZSgpIHtcbiAgICB0aGlzLnZtYV91aWRfID0gc2NvcGUgKyB0aGlzLl91aWRcbiAgfVxufVxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2XG4gICAgOmNsYXNzPVwieydtZGMtY2FyZC0tb3V0bGluZWQnOiBvdXRsaW5lZH1cIlxuICAgIGNsYXNzPVwibWRjLWNhcmRcIj5cbiAgICA8c2xvdC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1jYXJkJyxcbiAgcHJvcHM6IHtcbiAgICBvdXRsaW5lZDogQm9vbGVhblxuICB9XG59XG48L3NjcmlwdD5cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFJpcHBsZS4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBjbGFzc2VzXG4gKiAtIGRvbVxuICogLSBDU1MgdmFyaWFibGVzXG4gKiAtIHBvc2l0aW9uXG4gKiAtIGRpbWVuc2lvbnNcbiAqIC0gc2Nyb2xsIHBvc2l0aW9uXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKiAtIHVuYm91bmRlZCwgYWN0aXZlIGFuZCBkaXNhYmxlZCBzdGF0ZXNcbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUFkYXB0ZXIge1xuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzVW5ib3VuZGVkKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlQWN0aXZlKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlRGlzYWJsZWQoKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50VGFyZ2V0fSB0YXJnZXQgKi9cbiAgY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YXJOYW1lXG4gICAqIEBwYXJhbSB7P251bWJlcnxzdHJpbmd9IHZhbHVlXG4gICAqL1xuICB1cGRhdGVDc3NWYXJpYWJsZSh2YXJOYW1lLCB2YWx1ZSkge31cblxuICAvKiogQHJldHVybiB7IUNsaWVudFJlY3R9ICovXG4gIGNvbXB1dGVCb3VuZGluZ1JlY3QoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSAqL1xuICBnZXRXaW5kb3dQYWdlT2Zmc2V0KCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICAvLyBSaXBwbGUgaXMgYSBzcGVjaWFsIGNhc2Ugd2hlcmUgdGhlIFwicm9vdFwiIGNvbXBvbmVudCBpcyByZWFsbHkgYSBcIm1peGluXCIgb2Ygc29ydHMsXG4gIC8vIGdpdmVuIHRoYXQgaXQncyBhbiAndXBncmFkZScgdG8gYW4gZXhpc3RpbmcgY29tcG9uZW50LiBUaGF0IGJlaW5nIHNhaWQgaXQgaXMgdGhlIHJvb3RcbiAgLy8gQ1NTIGNsYXNzIHRoYXQgYWxsIG90aGVyIENTUyBjbGFzc2VzIGRlcml2ZSBmcm9tLlxuICBST09UOiAnbWRjLXJpcHBsZS11cGdyYWRlZCcsXG4gIFVOQk9VTkRFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLXVuYm91bmRlZCcsXG4gIEJHX0ZPQ1VTRUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1iYWNrZ3JvdW5kLWZvY3VzZWQnLFxuICBGR19BQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1hY3RpdmF0aW9uJyxcbiAgRkdfREVBQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1kZWFjdGl2YXRpb24nLFxufTtcblxuY29uc3Qgc3RyaW5ncyA9IHtcbiAgVkFSX0xFRlQ6ICctLW1kYy1yaXBwbGUtbGVmdCcsXG4gIFZBUl9UT1A6ICctLW1kYy1yaXBwbGUtdG9wJyxcbiAgVkFSX0ZHX1NJWkU6ICctLW1kYy1yaXBwbGUtZmctc2l6ZScsXG4gIFZBUl9GR19TQ0FMRTogJy0tbWRjLXJpcHBsZS1mZy1zY2FsZScsXG4gIFZBUl9GR19UUkFOU0xBVEVfU1RBUlQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLXN0YXJ0JyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9FTkQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLWVuZCcsXG59O1xuXG5jb25zdCBudW1iZXJzID0ge1xuICBQQURESU5HOiAxMCxcbiAgSU5JVElBTF9PUklHSU5fU0NBTEU6IDAuNixcbiAgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVM6IDIyNSwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtdHJhbnNsYXRlLWR1cmF0aW9uIChpLmUuIGFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBGR19ERUFDVElWQVRJT05fTVM6IDE1MCwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtZmFkZS1vdXQtZHVyYXRpb24gKGkuZS4gZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgVEFQX0RFTEFZX01TOiAzMDAsIC8vIERlbGF5IGJldHdlZW4gdG91Y2ggYW5kIHNpbXVsYXRlZCBtb3VzZSBldmVudHMgb24gdG91Y2ggZGV2aWNlc1xufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgQ1NTIGN1c3RvbSB2YXJpYWJsZSBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBhcHBseVBhc3NpdmUgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzUGFzc2l2ZV87XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKSB7XG4gIC8vIERldGVjdCB2ZXJzaW9ucyBvZiBFZGdlIHdpdGggYnVnZ3kgdmFyKCkgc3VwcG9ydFxuICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzExNDk1NDQ4L1xuICBjb25zdCBkb2N1bWVudCA9IHdpbmRvd09iai5kb2N1bWVudDtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBub2RlLmNsYXNzTmFtZSA9ICdtZGMtcmlwcGxlLXN1cmZhY2UtLXRlc3QtZWRnZS12YXItYnVnJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAvLyBUaGUgYnVnIGV4aXN0cyBpZiA6OmJlZm9yZSBzdHlsZSBlbmRzIHVwIHByb3BhZ2F0aW5nIHRvIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgLy8gQWRkaXRpb25hbGx5LCBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgbnVsbCBpbiBpZnJhbWVzIHdpdGggZGlzcGxheTogXCJub25lXCIgaW4gRmlyZWZveCxcbiAgLy8gYnV0IEZpcmVmb3ggaXMga25vd24gdG8gc3VwcG9ydCBDU1MgY3VzdG9tIHByb3BlcnRpZXMgY29ycmVjdGx5LlxuICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93T2JqLmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGNvbnN0IGhhc1BzZXVkb1ZhckJ1ZyA9IGNvbXB1dGVkU3R5bGUgIT09IG51bGwgJiYgY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BTdHlsZSA9PT0gJ3NvbGlkJztcbiAgbm9kZS5yZW1vdmUoKTtcbiAgcmV0dXJuIGhhc1BzZXVkb1ZhckJ1Zztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3dPYmosIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPT09ICdib29sZWFuJyAmJiAhZm9yY2VSZWZyZXNoKSB7XG4gICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG5cbiAgY29uc3Qgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSB3aW5kb3dPYmouQ1NTICYmIHR5cGVvZiB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIXN1cHBvcnRzRnVuY3Rpb25QcmVzZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJy0tY3NzLXZhcnMnLCAneWVzJyk7XG4gIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxuICAvLyBTZWU6IFJFQURNRSBzZWN0aW9uIG9uIFNhZmFyaVxuICBjb25zdCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnKC0tY3NzLXZhcnM6IHllcyknKSAmJlxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJ2NvbG9yJywgJyMwMDAwMDAwMCcpXG4gICk7XG5cbiAgaWYgKGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgfHwgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSAhZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopO1xuICB9IGVsc2Uge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gZmFsc2U7XG4gIH1cblxuICBpZiAoIWZvcmNlUmVmcmVzaCkge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG4gIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbn1cblxuLy9cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cbiAqL1xuZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSBIVE1MRWxlbWVudFByb3RvdHlwZVxuICogQHJldHVybiB7IUFycmF5PHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudFByb3RvdHlwZSkge1xuICByZXR1cm4gW1xuICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLCAnbXNNYXRjaGVzU2VsZWN0b3InLCAnbWF0Y2hlcycsXG4gIF0uZmlsdGVyKChwKSA9PiBwIGluIEhUTUxFbGVtZW50UHJvdG90eXBlKS5wb3AoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFFdmVudH0gZXZcbiAqIEBwYXJhbSB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gcGFnZU9mZnNldFxuICogQHBhcmFtIHshQ2xpZW50UmVjdH0gY2xpZW50UmVjdFxuICogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKGV2LCBwYWdlT2Zmc2V0LCBjbGllbnRSZWN0KSB7XG4gIGNvbnN0IHt4LCB5fSA9IHBhZ2VPZmZzZXQ7XG4gIGNvbnN0IGRvY3VtZW50WCA9IHggKyBjbGllbnRSZWN0LmxlZnQ7XG4gIGNvbnN0IGRvY3VtZW50WSA9IHkgKyBjbGllbnRSZWN0LnRvcDtcblxuICBsZXQgbm9ybWFsaXplZFg7XG4gIGxldCBub3JtYWxpemVkWTtcbiAgLy8gRGV0ZXJtaW5lIHRvdWNoIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByaXBwbGUgY29udGFpbmVyLlxuICBpZiAoZXYudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9IGVsc2Uge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfVxuXG4gIHJldHVybiB7eDogbm9ybWFsaXplZFgsIHk6IG5vcm1hbGl6ZWRZfTtcbn1cblxuZXhwb3J0IHtzdXBwb3J0c0Nzc1ZhcmlhYmxlcywgYXBwbHlQYXNzaXZlLCBnZXRNYXRjaGVzUHJvcGVydHksIGdldE5vcm1hbGl6ZWRFdmVudENvb3Jkc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge2dldE5vcm1hbGl6ZWRFdmVudENvb3Jkc30gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBpc0FjdGl2YXRlZDogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGFjdGl2YXRpb25FdmVudDogRXZlbnQsXG4gKiAgIGlzUHJvZ3JhbW1hdGljOiAoYm9vbGVhbnx1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgQWN0aXZhdGlvblN0YXRlVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBkZWFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGZvY3VzOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGJsdXI6IChzdHJpbmd8dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVySW5mb1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGZvY3VzOiBmdW5jdGlvbigpLFxuICogICBibHVyOiBmdW5jdGlvbigpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJzVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB4OiBudW1iZXIsXG4gKiAgIHk6IG51bWJlclxuICogfX1cbiAqL1xubGV0IFBvaW50VHlwZTtcblxuLy8gQWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiB0aGUgcm9vdCBlbGVtZW50IG9mIGVhY2ggaW5zdGFuY2UgZm9yIGFjdGl2YXRpb25cbmNvbnN0IEFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJywgJ2tleWRvd24nXTtcblxuLy8gRGVhY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIGRvY3VtZW50RWxlbWVudCB3aGVuIGEgcG9pbnRlci1yZWxhdGVkIGRvd24gZXZlbnQgb2NjdXJzXG5jb25zdCBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hlbmQnLCAncG9pbnRlcnVwJywgJ21vdXNldXAnXTtcblxuLy8gVHJhY2tzIGFjdGl2YXRpb25zIHRoYXQgaGF2ZSBvY2N1cnJlZCBvbiB0aGUgY3VycmVudCBmcmFtZSwgdG8gYXZvaWQgc2ltdWx0YW5lb3VzIG5lc3RlZCBhY3RpdmF0aW9uc1xuLyoqIEB0eXBlIHshQXJyYXk8IUV2ZW50VGFyZ2V0Pn0gKi9cbmxldCBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1JpcHBsZUFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IC8qIGJvb2xlYW4gLSBjYWNoZWQgKi8ge30sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICgvKiB0YXJnZXQ6ICFFdmVudFRhcmdldCAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAoLyogdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IC8qIENsaWVudFJlY3QgKi8ge30sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAvKiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9ICovIHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENSaXBwbGVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUgeyFDbGllbnRSZWN0fSAqL1xuICAgIHRoaXMuZnJhbWVfID0gLyoqIEB0eXBlIHshQ2xpZW50UmVjdH0gKi8gKHt3aWR0aDogMCwgaGVpZ2h0OiAwfSk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubWF4UmFkaXVzXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuZGVhY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlRm9jdXMoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUJsdXIoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuXG4gICAgLyoqIEBwcml2YXRlIHt7bGVmdDogbnVtYmVyLCB0b3A6bnVtYmVyfX0gKi9cbiAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnU2NhbGVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IHRydWU7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUgez9FdmVudH0gKi9cbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogV2UgY29tcHV0ZSB0aGlzIHByb3BlcnR5IHNvIHRoYXQgd2UgYXJlIG5vdCBxdWVyeWluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY2xpZW50XG4gICAqIHVudGlsIHRoZSBwb2ludCBpbiB0aW1lIHdoZXJlIHRoZSBmb3VuZGF0aW9uIHJlcXVlc3RzIGl0LiBUaGlzIHByZXZlbnRzIHNjZW5hcmlvcyB3aGVyZVxuICAgKiBjbGllbnQtc2lkZSBmZWF0dXJlLWRldGVjdGlvbiBtYXkgaGFwcGVuIHRvbyBlYXJseSwgc3VjaCBhcyB3aGVuIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXJcbiAgICogYW5kIHRoZW4gaW5pdGlhbGl6ZWQgYXQgbW91bnQgdGltZSBvbiB0aGUgY2xpZW50LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNTdXBwb3J0ZWRfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshQWN0aXZhdGlvblN0YXRlVHlwZX1cbiAgICovXG4gIGRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2YXRlZDogZmFsc2UsXG4gICAgICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogZmFsc2UsXG4gICAgICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IGZhbHNlLFxuICAgICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IGZhbHNlLFxuICAgICAgYWN0aXZhdGlvbkV2ZW50OiBudWxsLFxuICAgICAgaXNQcm9ncmFtbWF0aWM6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UKTtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgICAvLyBVbmJvdW5kZWQgcmlwcGxlcyBuZWVkIGxheW91dCBsb2dpYyBhcHBsaWVkIGltbWVkaWF0ZWx5IHRvIHNldCBjb29yZGluYXRlcyBmb3IgYm90aCBzaGFkZSBhbmQgcmlwcGxlXG4gICAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWN0aXZhdGlvblRpbWVyXykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuICAgICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG4gICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhST09UKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgIHRoaXMucmVtb3ZlQ3NzVmFyc18oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbW92ZUNzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtzdHJpbmdzfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4gICAgT2JqZWN0LmtleXMoc3RyaW5ncykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignVkFSXycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoc3RyaW5nc1trXSwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjdGl2YXRlXyhlKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcmVhY3RpbmcgdG8gZm9sbG93LW9uIGV2ZW50cyBmaXJlZCBieSB0b3VjaCBkZXZpY2UgYWZ0ZXIgYW4gYWxyZWFkeS1wcm9jZXNzZWQgdXNlciBpbnRlcmFjdGlvblxuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gICAgY29uc3QgaXNTYW1lSW50ZXJhY3Rpb24gPSBwcmV2aW91c0FjdGl2YXRpb25FdmVudCAmJiBlICYmIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50LnR5cGUgIT09IGUudHlwZTtcbiAgICBpZiAoaXNTYW1lSW50ZXJhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA9IGUgPT09IG51bGw7XG4gICAgYWN0aXZhdGlvblN0YXRlLmFjdGl2YXRpb25FdmVudCA9IGU7XG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0FjdGl2YXRlZEJ5UG9pbnRlciA9IGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA/IGZhbHNlIDogKFxuICAgICAgZS50eXBlID09PSAnbW91c2Vkb3duJyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICdwb2ludGVyZG93bidcbiAgICApO1xuXG4gICAgY29uc3QgaGFzQWN0aXZhdGVkQ2hpbGQgPVxuICAgICAgZSAmJiBhY3RpdmF0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgYWN0aXZhdGVkVGFyZ2V0cy5zb21lKCh0YXJnZXQpID0+IHRoaXMuYWRhcHRlcl8uY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpKTtcbiAgICBpZiAoaGFzQWN0aXZhdGVkQ2hpbGQpIHtcbiAgICAgIC8vIEltbWVkaWF0ZWx5IHJlc2V0IGFjdGl2YXRpb24gc3RhdGUsIHdoaWxlIHByZXNlcnZpbmcgbG9naWMgdGhhdCBwcmV2ZW50cyB0b3VjaCBmb2xsb3ctb24gZXZlbnRzXG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goLyoqIEB0eXBlIHshRXZlbnRUYXJnZXR9ICovIChlLnRhcmdldCkpO1xuICAgICAgdGhpcy5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlICYmIChlLmtleSA9PT0gJyAnIHx8IGUua2V5Q29kZSA9PT0gMzIpKSB7XG4gICAgICAgIC8vIElmIHNwYWNlIHdhcyBwcmVzc2VkLCB0cnkgYWdhaW4gd2l0aGluIGFuIHJBRiBjYWxsIHRvIGRldGVjdCA6YWN0aXZlLCBiZWNhdXNlIGRpZmZlcmVudCBVQXMgcmVwb3J0XG4gICAgICAgIC8vIGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW4gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MzU5NzFcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICAgIC8vIFdlIHRyeSBmaXJzdCBvdXRzaWRlIHJBRiB0byBzdXBwb3J0IEVkZ2UsIHdoaWNoIGRvZXMgbm90IGV4aGliaXQgdGhpcyBwcm9ibGVtLCBidXQgd2lsbCBjcmFzaCBpZiBhIENTU1xuICAgICAgICAvLyB2YXJpYWJsZSBpcyBzZXQgd2l0aGluIGEgckFGIGNhbGxiYWNrIGZvciBhIHN1Ym1pdCBidXR0b24gaW50ZXJhY3Rpb24gKCMyMjQxKS5cbiAgICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSkge1xuICAgIHJldHVybiAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGwsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXyhlKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgY29uc3QgZXZ0T2JqZWN0ID0gbnVsbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGV2dE9iamVjdCwgc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhlLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZGVhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCJpbXBvcnQgTURDUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMnXG5pbXBvcnQge1xuICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyxcbiAgZ2V0TWF0Y2hlc1Byb3BlcnR5LFxuICBhcHBseVBhc3NpdmVcbn0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS91dGlsJ1xuXG5leHBvcnQgY2xhc3MgUmlwcGxlQmFzZSBleHRlbmRzIE1EQ1JpcHBsZUZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IE1BVENIRVMoKSB7XG4gICAgLyogZ2xvYmFsIEhUTUxFbGVtZW50ICovXG4gICAgcmV0dXJuIChcbiAgICAgIFJpcHBsZUJhc2UuX21hdGNoZXMgfHxcbiAgICAgIChSaXBwbGVCYXNlLl9tYXRjaGVzID0gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSkpXG4gICAgKVxuICB9XG5cbiAgc3RhdGljIGlzU3VyZmFjZUFjdGl2ZShyZWYpIHtcbiAgICByZXR1cm4gcmVmW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICB9XG5cbiAgY29uc3RydWN0b3Iodm0sIG9wdGlvbnMpIHtcbiAgICBzdXBlcihcbiAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHtcbiAgICAgICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdm0uJGVsW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2bS5kaXNhYmxlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB2bS4kc2V0KHZtLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdm0uJGRlbGV0ZSh2bS5jbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiB0YXJnZXQgPT4gdm0uJGVsLmNvbnRhaW5zKHRhcmdldCksXG4gICAgICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgIHZtLiRlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICB2bS4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcbiAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgYXBwbHlQYXNzaXZlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICBldnRUeXBlLFxuICAgICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAgICBhcHBseVBhc3NpdmUoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdm0uJHNldCh2bS5zdHlsZXMsIHZhck5hbWUsIHZhbHVlKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZtLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgeDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXQgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKVxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUmlwcGxlTWl4aW4gPSB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgc3R5bGVzOiB7fVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGN1c3RvbS1lbGVtZW50IFxuICAgIDp0YWc9XCJ0YWdcIiBcbiAgICA6Y2xhc3Nlcz1cImNsYXNzZXNcIlxuICAgIDpzdHlsZXM9XCJzdHlsZXNcIiBcbiAgICBjbGFzcz1cIm1kYy1yaXBwbGVcIj5cbiAgICA8c2xvdCAvPlxuICA8L2N1c3RvbS1lbGVtZW50PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IEN1c3RvbUVsZW1lbnRNaXhpbiB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgeyBSaXBwbGVNaXhpbiB9IGZyb20gJy4vbWRjLXJpcHBsZS1iYXNlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtcmlwcGxlJyxcbiAgbWl4aW5zOiBbQ3VzdG9tRWxlbWVudE1peGluLCBSaXBwbGVNaXhpbl0sXG4gIHByb3BzOiB7XG4gICAgdGFnOiBTdHJpbmdcbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XHJcbiAgPGN1c3RvbS1saW5rIFxyXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiXHJcbiAgICA6c3R5bGU9XCJzdHlsZXNcIiBcbiAgICA6bGluaz1cImxpbmtcIiBcclxuICAgIGNsYXNzPVwibWRjLWNhcmQtcHJpbWFyeS1hY3Rpb24gbWRjLWNhcmRfX3ByaW1hcnktYWN0aW9uXCIgXHJcbiAgICB2LW9uPVwibGlzdGVuZXJzXCI+XHJcbiAgICA8c2xvdCAvPlxyXG4gIDwvY3VzdG9tLWxpbms+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyBEaXNwYXRjaEV2ZW50TWl4aW4sIEN1c3RvbUxpbmtNaXhpbiB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCB7IFJpcHBsZU1peGluIH0gZnJvbSAnLi4vcmlwcGxlL2luZGV4J1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1jYXJkLXByaW1hcnktYWN0aW9uJyxcclxuICBtaXhpbnM6IFtEaXNwYXRjaEV2ZW50TWl4aW4sIEN1c3RvbUxpbmtNaXhpbiwgUmlwcGxlTWl4aW5dLFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7fSxcclxuICAgICAgc3R5bGVzOiB7fVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxzZWN0aW9uIFxuICAgIDpjbGFzcz1cImNsYXNzZXNcIiBcclxuICAgIDpzdHlsZT1cInN0eWxlc1wiIFxuICAgIGNsYXNzPVwibWRjLWNhcmQtbWVkaWEgbWRjLWNhcmRfX21lZGlhXCI+XHJcbiAgICA8ZGl2IFxuICAgICAgdi1pZj1cIiRzbG90cy5kZWZhdWx0XCIgXG4gICAgICBjbGFzcz1cIm1kYy1jYXJkX19tZWRpYS1jb250ZW50XCI+XHJcbiAgICAgIDxzbG90Lz5cclxuICAgIDwvZGl2PlxyXG4gIDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLWNhcmQtbWVkaWEnLFxyXG4gIHByb3BzOiB7XHJcbiAgICBzcmM6IFN0cmluZyxcclxuICAgIHNxdWFyZTogQm9vbGVhblxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIHN0eWxlcygpIHtcclxuICAgICAgdmFyIHN0eWxlcyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHt0aGlzLnNyY30pYFxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gc3R5bGVzXHJcbiAgICB9LFxyXG4gICAgY2xhc3NlcygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc3F1YXJlID8gJ21kYy1jYXJkX19tZWRpYS0tc3F1YXJlJyA6ICdtZGMtY2FyZF9fbWVkaWEtLTE2LTknXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XG4gIDxzZWN0aW9uIGNsYXNzPVwibWRjLWNhcmQtaGVhZGVyIG1kYy1jYXJkX19wcmltYXJ5XCI+XG4gICAgPHNsb3Q+XG4gICAgICA8aDEgXG4gICAgICAgIHYtaWY9XCJ0aXRsZVwiXG4gICAgICAgIDpjbGFzcz1cInsnbWRjLWNhcmRfX3RpdGxlLS1sYXJnZSc6IGxhcmdlVGl0bGV9XCJcbiAgICAgICAgY2xhc3M9XCJtZGMtY2FyZF9fdGl0bGVcIlxuICAgICAgPlxuICAgICAgICB7eyB0aXRsZSB9fVxuICAgICAgPC9oMT5cbiAgICAgIDxoMiBcbiAgICAgICAgdi1pZj1cInN1YnRpdGxlXCJcbiAgICAgICAgY2xhc3M9XCJtZGMtY2FyZF9fc3VidGl0bGVcIlxuICAgICAgPlxuICAgICAgICB7eyBzdWJ0aXRsZSB9fSBcbiAgICAgIDwvaDI+XG4gICAgPC9zbG90PlxuICA8L3NlY3Rpb24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWNhcmQtaGVhZGVyJyxcbiAgcHJvcHM6IHtcbiAgICB0aXRsZTogU3RyaW5nLFxuICAgIHN1YnRpdGxlOiBTdHJpbmcsXG4gICAgJ2xhcmdlLXRpdGxlJzogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiB0cnVlIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxoMSBcbiAgICA6Y2xhc3M9XCJ7J21kYy1jYXJkX190aXRsZS0tbGFyZ2UnOiBsYXJnZX1cIlxuICAgIGNsYXNzPVwibWRjLWNhcmQtdGl0bGUgbWRjLWNhcmRfX3RpdGxlXCI+XG4gICAgPHNsb3QvPlxuICA8L2gxPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1jYXJkLXRpdGxlJyxcbiAgcHJvcHM6IHtcbiAgICBsYXJnZTogQm9vbGVhblxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGgyIGNsYXNzPVwibWRjLWNhcmQtc3VidGl0bGUgbWRjLWNhcmRfX3N1YnRpdGxlXCI+XG4gICAgPHNsb3QvPlxuICA8L2gyPlxuPC90ZW1wbGF0ZT5cblxuXG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtY2FyZC1zdWJ0aXRsZSdcbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8c2VjdGlvbiBjbGFzcz1cIm1kYy1jYXJkLXRleHQgbWRjLWNhcmRfX3N1cHBvcnRpbmctdGV4dFwiPlxuICAgIDxzbG90Lz5cbiAgPC9zZWN0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1jYXJkLXRleHQnXG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cclxuICA8c2VjdGlvbiBcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCIgXHJcbiAgICBjbGFzcz1cIm1kYy1jYXJkLWFjdGlvbnMgbWRjLWNhcmRfX2FjdGlvbnNcIj5cclxuICAgIDxzbG90Lz5cclxuICA8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1jYXJkLWFjdGlvbnMnLFxyXG4gIHByb3BzOiB7XHJcbiAgICBmdWxsQmxlZWQ6IEJvb2xlYW5cclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICBjbGFzc2VzKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgICdtZGMtY2FyZF9fYWN0aW9ucy0tZnVsbC1ibGVlZCc6IHRoaXMuZnVsbEJsZWVkXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwibWRjLWNhcmQtYWN0aW9uLWJ1dHRvbnMgbWRjLWNhcmRfX2FjdGlvbi1idXR0b25zXCI+XHJcbiAgICA8c2xvdC8+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1jYXJkLWFjdGlvbi1idXR0b25zJ1xyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XG4gIDxjdXN0b20tYnV0dG9uIFxuICAgIHJlZj1cInJvb3RcIlxuICAgIDpjbGFzcz1cImNsYXNzZXNcIiBcbiAgICA6c3R5bGU9XCJzdHlsZXNcIlxuICAgIDpocmVmPVwiaHJlZlwiIFxuICAgIDpsaW5rPVwibGlua1wiIFxuICAgIDpkaXNhYmxlZD1cImRpc2FibGVkXCJcbiAgICB2LW9uPVwibGlzdGVuZXJzXCI+XG4gICAgPHNsb3QgLz5cbiAgPC9jdXN0b20tYnV0dG9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IERpc3BhdGNoRXZlbnRNaXhpbiwgQ3VzdG9tQnV0dG9uTWl4aW4gfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHsgUmlwcGxlTWl4aW4gfSBmcm9tICcuLi9yaXBwbGUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1idXR0b24tYmFzZScsXG4gIG1peGluczogW0Rpc3BhdGNoRXZlbnRNaXhpbiwgQ3VzdG9tQnV0dG9uTWl4aW4sIFJpcHBsZU1peGluXSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge30sXG4gICAgICBzdHlsZXM6IHt9XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsIjxzY3JpcHQ+XG5pbXBvcnQgbWRjQnV0dG9uQmFzZSBmcm9tICcuL21kYy1idXR0b24tYmFzZS52dWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1idXR0b24nLFxuICBleHRlbmRzOiBtZGNCdXR0b25CYXNlLFxuICBwcm9wczoge1xuICAgIHJhaXNlZDogQm9vbGVhbixcbiAgICB1bmVsZXZhdGVkOiBCb29sZWFuLFxuICAgIG91dGxpbmVkOiBCb29sZWFuLFxuICAgIGRlbnNlOiBCb29sZWFuXG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgJ21kYy1idXR0b24nOiB0cnVlLFxuICAgICAgICAnbWRjLWJ1dHRvbi0tcmFpc2VkJzogdGhpcy5yYWlzZWQsXG4gICAgICAgICdtZGMtYnV0dG9uLS11bmVsZXZhdGVkJzogdGhpcy51bmVsZXZhdGVkLFxuICAgICAgICAnbWRjLWJ1dHRvbi0tb3V0bGluZWQnOiB0aGlzLm91dGxpbmVkLFxuICAgICAgICAnbWRjLWJ1dHRvbi0tZGVuc2UnOiB0aGlzLmRlbnNlXG4gICAgICB9XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIHJhaXNlZCgpIHtcbiAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsICdtZGMtYnV0dG9uLS1yYWlzZWQnLCB0aGlzLnJhaXNlZClcbiAgICB9LFxuICAgIHVuZWxldmF0ZWQoKSB7XG4gICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWRjLWJ1dHRvbi0tdW5lbGV2YXRlZCcsIHRoaXMudW5lbGV2YXRlZClcbiAgICB9LFxuICAgIG91dGxpbmVkKCkge1xuICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgJ21kYy1idXR0b24tLW91dGxpbmVkJywgdGhpcy5vdXRsaW5lZClcbiAgICB9LFxuICAgIGRlbnNlKCkge1xuICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgJ21kYy1idXR0b24tLWRlbnNlJywgdGhpcy5kZW5zZSlcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHNjcmlwdD5cclxuaW1wb3J0IHsgbWRjQnV0dG9uQmFzZSB9IGZyb20gJy4uL2J1dHRvbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLWNhcmQtYWN0aW9uLWJ1dHRvbicsXHJcbiAgZXh0ZW5kczogbWRjQnV0dG9uQmFzZSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2xhc3Nlczoge1xyXG4gICAgICAgICdtZGMtYnV0dG9uJzogdHJ1ZSxcclxuICAgICAgICAnbWRjLWNhcmRfX2FjdGlvbic6IHRydWUsXHJcbiAgICAgICAgJ21kYy1jYXJkLWFjdGlvbi1idXR0b24nOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwibWRjLWNhcmQtYWN0aW9uLWljb25zIG1kYy1jYXJkX19hY3Rpb24taWNvbnNcIj5cclxuICAgIDxzbG90Lz5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLWNhcmQtYWN0aW9uLWljb25zJ1xyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPHNwYW4gXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiIFxuICAgIDpzdHlsZT1cInN0eWxlc1wiIFxyXG4gICAgdi1vbj1cImxpc3RlbmVyc1wiPlxyXG4gICAgPHNsb3Q+e3sgaWNvbiB9fTwvc2xvdD5cclxuICA8L3NwYW4+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyBEaXNwYXRjaEV2ZW50TWl4aW4gfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgeyBSaXBwbGVCYXNlIH0gZnJvbSAnLi4vcmlwcGxlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtY2FyZC1hY3Rpb24taWNvbicsXHJcbiAgbWl4aW5zOiBbRGlzcGF0Y2hFdmVudE1peGluXSxcclxuICBwcm9wczoge1xyXG4gICAgaWNvbjogU3RyaW5nXHJcbiAgfSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2xhc3Nlczoge1xyXG4gICAgICAgICdtZGMtY2FyZC1hY3Rpb24taWNvbic6IHRydWUsXHJcbiAgICAgICAgJ21hdGVyaWFsLWljb25zJzogISF0aGlzLmljb24sXHJcbiAgICAgICAgJ21kYy1jYXJkX19hY3Rpb24nOiB0cnVlLFxyXG4gICAgICAgICdtZGMtY2FyZF9fYWN0aW9uLS1pY29uJzogdHJ1ZSxcclxuICAgICAgICAnbWRjLWljb24tdG9nZ2xlJzogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICBzdHlsZXM6IHt9XHJcbiAgICB9XHJcbiAgfSxcclxuICB3YXRjaDoge1xyXG4gICAgaWNvbigpIHtcclxuICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgJ21hdGVyaWFsLWljb25zJywgISF0aGlzLmljb24pXHJcbiAgICB9XHJcbiAgfSxcclxuICBtb3VudGVkKCkge1xyXG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzLCB7XHJcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiB0cnVlXHJcbiAgICB9KVxyXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXHJcbiAgfSxcclxuICBiZWZvcmVEZXN0cm95KCkge1xyXG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCJpbXBvcnQgeyBCYXNlUGx1Z2luIH0gZnJvbSAnLi4vYmFzZSdcclxuaW1wb3J0IG1kY0NhcmQgZnJvbSAnLi9tZGMtY2FyZC52dWUnXHJcbmltcG9ydCBtZGNDYXJkUHJpbWFyeUFjdGlvbiBmcm9tICcuL21kYy1jYXJkLXByaW1hcnktYWN0aW9uLnZ1ZSdcclxuaW1wb3J0IG1kY0NhcmRNZWRpYSBmcm9tICcuL21kYy1jYXJkLW1lZGlhLnZ1ZSdcclxuaW1wb3J0IG1kY0NhcmRIZWFkZXIgZnJvbSAnLi9tZGMtY2FyZC1oZWFkZXIudnVlJ1xyXG5pbXBvcnQgbWRjQ2FyZFRpdGxlIGZyb20gJy4vbWRjLWNhcmQtdGl0bGUudnVlJ1xyXG5pbXBvcnQgbWRjQ2FyZFN1YnRpdGxlIGZyb20gJy4vbWRjLWNhcmQtc3VidGl0bGUudnVlJ1xyXG5pbXBvcnQgbWRjQ2FyZFRleHQgZnJvbSAnLi9tZGMtY2FyZC10ZXh0LnZ1ZSdcclxuaW1wb3J0IG1kY0NhcmRBY3Rpb25zIGZyb20gJy4vbWRjLWNhcmQtYWN0aW9ucy52dWUnXHJcbmltcG9ydCBtZGNDYXJkQWN0aW9uQnV0dG9ucyBmcm9tICcuL21kYy1jYXJkLWFjdGlvbi1idXR0b25zLnZ1ZSdcclxuaW1wb3J0IG1kY0NhcmRBY3Rpb25CdXR0b24gZnJvbSAnLi9tZGMtY2FyZC1hY3Rpb24tYnV0dG9uLnZ1ZSdcclxuaW1wb3J0IG1kY0NhcmRBY3Rpb25JY29ucyBmcm9tICcuL21kYy1jYXJkLWFjdGlvbi1pY29ucy52dWUnXHJcbmltcG9ydCBtZGNDYXJkQWN0aW9uSWNvbiBmcm9tICcuL21kYy1jYXJkLWFjdGlvbi1pY29uLnZ1ZSdcclxuXHJcbmV4cG9ydCB7XHJcbiAgbWRjQ2FyZCxcclxuICBtZGNDYXJkUHJpbWFyeUFjdGlvbixcclxuICBtZGNDYXJkTWVkaWEsXHJcbiAgbWRjQ2FyZEhlYWRlcixcclxuICBtZGNDYXJkVGl0bGUsXHJcbiAgbWRjQ2FyZFN1YnRpdGxlLFxyXG4gIG1kY0NhcmRUZXh0LFxyXG4gIG1kY0NhcmRBY3Rpb25zLFxyXG4gIG1kY0NhcmRBY3Rpb25CdXR0b25zLFxyXG4gIG1kY0NhcmRBY3Rpb25CdXR0b24sXHJcbiAgbWRjQ2FyZEFjdGlvbkljb25zLFxyXG4gIG1kY0NhcmRBY3Rpb25JY29uXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xyXG4gIG1kY0NhcmQsXHJcbiAgbWRjQ2FyZFByaW1hcnlBY3Rpb24sXHJcbiAgbWRjQ2FyZE1lZGlhLFxyXG4gIG1kY0NhcmRIZWFkZXIsXHJcbiAgbWRjQ2FyZFRpdGxlLFxyXG4gIG1kY0NhcmRTdWJ0aXRsZSxcclxuICBtZGNDYXJkVGV4dCxcclxuICBtZGNDYXJkQWN0aW9ucyxcclxuICBtZGNDYXJkQWN0aW9uQnV0dG9ucyxcclxuICBtZGNDYXJkQWN0aW9uQnV0dG9uLFxyXG4gIG1kY0NhcmRBY3Rpb25JY29ucyxcclxuICBtZGNDYXJkQWN0aW9uSWNvblxyXG59KVxyXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQgeyBhdXRvSW5pdCB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cblxuYXV0b0luaXQocGx1Z2luKVxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJrZXkiLCJjb21wb25lbnQiLCJ2bSIsIm5hbWUiLCJDdXN0b21FbGVtZW50IiwiZnVuY3Rpb25hbCIsInJlbmRlciIsImNyZWF0ZUVsZW1lbnQiLCJjb250ZXh0IiwicHJvcHMiLCJpcyIsInRhZyIsImRhdGEiLCJjaGlsZHJlbiIsIkN1c3RvbUVsZW1lbnRNaXhpbiIsIkN1c3RvbUxpbmsiLCJ0eXBlIiwiU3RyaW5nIiwiZGVmYXVsdCIsImxpbmsiLCJPYmplY3QiLCJoIiwiZWxlbWVudCIsImJhYmVsSGVscGVycy5leHRlbmRzIiwicGFyZW50IiwiJHJvdXRlciIsIiRyb290IiwiJG9wdGlvbnMiLCJvbiIsImNsaWNrIiwibmF0aXZlT24iLCJDdXN0b21MaW5rTWl4aW4iLCJ0byIsImV4YWN0IiwiQm9vbGVhbiIsImFwcGVuZCIsInJlcGxhY2UiLCJhY3RpdmVDbGFzcyIsImV4YWN0QWN0aXZlQ2xhc3MiLCJjb21wdXRlZCIsIkN1c3RvbUJ1dHRvbiIsImF0dHJzIiwicm9sZSIsImhyZWYiLCJDdXN0b21CdXR0b25NaXhpbiIsImRpc2FibGVkIiwiRGlzcGF0Y2hFdmVudE1peGluIiwiZXZlbnQiLCJBcnJheSIsIm1ldGhvZHMiLCJkaXNwYXRjaEV2ZW50IiwiZXZ0IiwiJGVtaXQiLCJ0YXJnZXQiLCJldmVudFRhcmdldCIsImFyZ3MiLCJldmVudEFyZ3MiLCJsaXN0ZW5lcnMiLCIkbGlzdGVuZXJzIiwiZSIsInNjb3BlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJNRENGb3VuZGF0aW9uIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiTURDUmlwcGxlQWRhcHRlciIsImNsYXNzTmFtZSIsImV2dFR5cGUiLCJoYW5kbGVyIiwidmFyTmFtZSIsInZhbHVlIiwiY3NzQ2xhc3NlcyIsIlJPT1QiLCJVTkJPVU5ERUQiLCJCR19GT0NVU0VEIiwiRkdfQUNUSVZBVElPTiIsIkZHX0RFQUNUSVZBVElPTiIsInN0cmluZ3MiLCJWQVJfTEVGVCIsIlZBUl9UT1AiLCJWQVJfRkdfU0laRSIsIlZBUl9GR19TQ0FMRSIsIlZBUl9GR19UUkFOU0xBVEVfU1RBUlQiLCJWQVJfRkdfVFJBTlNMQVRFX0VORCIsIm51bWJlcnMiLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJERUFDVElWQVRJT05fVElNRU9VVF9NUyIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsInN1cHBvcnRzUGFzc2l2ZV8iLCJkZXRlY3RFZGdlUHNldWRvVmFyQnVnIiwid2luZG93T2JqIiwiZG9jdW1lbnQiLCJub2RlIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY29tcHV0ZWRTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJoYXNQc2V1ZG9WYXJCdWciLCJib3JkZXJUb3BTdHlsZSIsInJlbW92ZSIsInN1cHBvcnRzQ3NzVmFyaWFibGVzIiwiZm9yY2VSZWZyZXNoIiwic3VwcG9ydHNGdW5jdGlvblByZXNlbnQiLCJDU1MiLCJzdXBwb3J0cyIsImV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMiLCJ3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMiLCJhcHBseVBhc3NpdmUiLCJnbG9iYWxPYmoiLCJ1bmRlZmluZWQiLCJpc1N1cHBvcnRlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwiZ2V0TWF0Y2hlc1Byb3BlcnR5IiwiSFRNTEVsZW1lbnRQcm90b3R5cGUiLCJmaWx0ZXIiLCJwIiwicG9wIiwiZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzIiwiZXYiLCJwYWdlT2Zmc2V0IiwiY2xpZW50UmVjdCIsIngiLCJ5IiwiZG9jdW1lbnRYIiwibGVmdCIsImRvY3VtZW50WSIsInRvcCIsIm5vcm1hbGl6ZWRYIiwibm9ybWFsaXplZFkiLCJjaGFuZ2VkVG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJhY3RpdmF0ZWRUYXJnZXRzIiwiTURDUmlwcGxlRm91bmRhdGlvbiIsImJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMiLCJpc1VuYm91bmRlZCIsImlzU3VyZmFjZUFjdGl2ZSIsImlzU3VyZmFjZURpc2FibGVkIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImNvbnRhaW5zRXZlbnRUYXJnZXQiLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJ1cGRhdGVDc3NWYXJpYWJsZSIsImNvbXB1dGVCb3VuZGluZ1JlY3QiLCJnZXRXaW5kb3dQYWdlT2Zmc2V0IiwiZGVmYXVsdEFkYXB0ZXIiLCJsYXlvdXRGcmFtZV8iLCJmcmFtZV8iLCJ3aWR0aCIsImhlaWdodCIsImFjdGl2YXRpb25TdGF0ZV8iLCJkZWZhdWx0QWN0aXZhdGlvblN0YXRlXyIsImluaXRpYWxTaXplXyIsIm1heFJhZGl1c18iLCJhY3RpdmF0ZUhhbmRsZXJfIiwiYWN0aXZhdGVfIiwiZGVhY3RpdmF0ZUhhbmRsZXJfIiwiZGVhY3RpdmF0ZV8iLCJmb2N1c0hhbmRsZXJfIiwiaGFuZGxlRm9jdXMiLCJibHVySGFuZGxlcl8iLCJoYW5kbGVCbHVyIiwicmVzaXplSGFuZGxlcl8iLCJsYXlvdXQiLCJ1bmJvdW5kZWRDb29yZHNfIiwiZmdTY2FsZV8iLCJhY3RpdmF0aW9uVGltZXJfIiwiZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfIiwiYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyIsImFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyIsInJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XyIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyIsImlzQWN0aXZhdGVkIiwiaGFzRGVhY3RpdmF0aW9uVVhSdW4iLCJ3YXNBY3RpdmF0ZWRCeVBvaW50ZXIiLCJ3YXNFbGVtZW50TWFkZUFjdGl2ZSIsImFjdGl2YXRpb25FdmVudCIsImlzUHJvZ3JhbW1hdGljIiwiaXNTdXBwb3J0ZWRfIiwicmVnaXN0ZXJSb290SGFuZGxlcnNfIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibGF5b3V0SW50ZXJuYWxfIiwiY2xlYXJUaW1lb3V0IiwiZGVyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwicmVtb3ZlQ3NzVmFyc18iLCJmb3JFYWNoIiwia2V5cyIsImsiLCJpbmRleE9mIiwiYWN0aXZhdGlvblN0YXRlIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnQiLCJpc1NhbWVJbnRlcmFjdGlvbiIsImhhc0FjdGl2YXRlZENoaWxkIiwibGVuZ3RoIiwic29tZSIsInJlc2V0QWN0aXZhdGlvblN0YXRlXyIsInB1c2giLCJyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsImNoZWNrRWxlbWVudE1hZGVBY3RpdmVfIiwiYW5pbWF0ZUFjdGl2YXRpb25fIiwia2V5Q29kZSIsInRyYW5zbGF0ZVN0YXJ0IiwidHJhbnNsYXRlRW5kIiwiZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXyIsInN0YXJ0UG9pbnQiLCJlbmRQb2ludCIsInJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXyIsInNldFRpbWVvdXQiLCJhY3RpdmF0aW9uSGFzRW5kZWQiLCJzdGF0ZSIsImV2dE9iamVjdCIsImFuaW1hdGVEZWFjdGl2YXRpb25fIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJtYXhEaW0iLCJtYXgiLCJnZXRCb3VuZGVkUmFkaXVzIiwiaHlwb3RlbnVzZSIsInNxcnQiLCJwb3ciLCJ1cGRhdGVMYXlvdXRDc3NWYXJzXyIsInJvdW5kIiwidW5ib3VuZGVkIiwiUmlwcGxlQmFzZSIsInJlZiIsIk1BVENIRVMiLCJfbWF0Y2hlcyIsIkhUTUxFbGVtZW50IiwicHJvdG90eXBlIiwib3B0aW9ucyIsIiRlbCIsIiRzZXQiLCJjbGFzc2VzIiwiJGRlbGV0ZSIsImNvbnRhaW5zIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhZ2VYT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJSaXBwbGVNaXhpbiIsIm1vdW50ZWQiLCJyaXBwbGUiLCJpbml0IiwiYmVmb3JlRGVzdHJveSIsImRlc3Ryb3kiLCJtZGNDYXJkIiwibWRjQ2FyZFByaW1hcnlBY3Rpb24iLCJtZGNDYXJkTWVkaWEiLCJtZGNDYXJkSGVhZGVyIiwibWRjQ2FyZFRpdGxlIiwibWRjQ2FyZFN1YnRpdGxlIiwibWRjQ2FyZFRleHQiLCJtZGNDYXJkQWN0aW9ucyIsIm1kY0NhcmRBY3Rpb25CdXR0b25zIiwibWRjQ2FyZEFjdGlvbkJ1dHRvbiIsIm1kY0NhcmRBY3Rpb25JY29ucyIsIm1kY0NhcmRBY3Rpb25JY29uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQU8sU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEI7SUFDL0I7SUFDQSxNQUFJQyxPQUFPLElBQVg7SUFDQSxNQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7SUFDakNELFdBQU9DLE9BQU9DLEdBQWQ7SUFDRCxHQUZELE1BRU8sSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0lBQ3hDO0lBQ0FILFdBQU9HLE9BQU9ELEdBQWQ7SUFDRDtJQUNELE1BQUlGLElBQUosRUFBVTtJQUNSQSxTQUFLSSxHQUFMLENBQVNMLE1BQVQ7SUFDRDtJQUNGOztJQ1pNLFNBQVNNLFVBQVQsQ0FBb0JDLFVBQXBCLEVBQWdDO0lBQ3JDLFNBQU87SUFDTEMsYUFBUyxRQURKO0lBRUxDLGFBQVMscUJBQU07SUFDYixXQUFLLElBQUlDLEdBQVQsSUFBZ0JILFVBQWhCLEVBQTRCO0lBQzFCLFlBQUlJLFlBQVlKLFdBQVdHLEdBQVgsQ0FBaEI7SUFDQUUsV0FBR0QsU0FBSCxDQUFhQSxVQUFVRSxJQUF2QixFQUE2QkYsU0FBN0I7SUFDRDtJQUNGLEtBUEk7SUFRTEo7SUFSSyxHQUFQO0lBVUQ7O0lDWE0sSUFBTU8sZ0JBQWdCO0lBQzNCQyxjQUFZLElBRGU7SUFFM0JDLFFBRjJCLGtC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S0FBQTs7O0lBWFksK0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1daOzs7Ozs7Ozs7S0FBQTs7O0lBWFksK0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1daOzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FBQTs7O0lBWFksK0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2tCWjs7Ozs7OztLQUFBOzs7SUFsQlksK0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTVo7Ozs7O0tBQUE7OztJQU5ZLCtCQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ01aOztLQUFBOzs7SUFOWSwrQkFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSVo7O0tBQUE7OztJQUpZLCtCQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ01aOzs7Ozs7Ozs7Ozs7S0FBQTs7O0lBTlksK0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0laOztLQUFBOzs7SUFKWSwrQkFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2NaOzs7Ozs7Ozs7S0FBQTs7O0lBZFksK0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FBQTs7O0lBQVksK0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FaOzs7Ozs7Ozs7Ozs7S0FBQTs7O0lBQVksK0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNJWjs7S0FBQTs7O0lBSlksK0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNVWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FBQTs7O0lBVlksK0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMEJaLGlCQUFleFEsV0FBVztJQUN4QnlRLGtCQUR3QjtJQUV4QkMsNENBRndCO0lBR3hCQyw0QkFId0I7SUFJeEJDLDhCQUp3QjtJQUt4QkMsNEJBTHdCO0lBTXhCQyxrQ0FOd0I7SUFPeEJDLDBCQVB3QjtJQVF4QkMsZ0NBUndCO0lBU3hCQyw0Q0FUd0I7SUFVeEJDLDBDQVZ3QjtJQVd4QkMsd0NBWHdCO0lBWXhCQztJQVp3QixDQUFYLENBQWY7O0lDeEJBM1IsU0FBU0MsTUFBVDs7Ozs7Ozs7In0=
