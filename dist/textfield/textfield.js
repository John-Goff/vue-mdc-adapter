/**
* @module vue-mdc-adaptertextfield 0.18.2
* @exports VueMDCTextfield
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCTextfield = factory());
}(this, (function () { 'use strict';

    var supportsPassive_ = void 0;

    /**
     * Determine whether the current browser supports passive event listeners, and if so, use them.
     * @param {!Window=} globalObj
     * @param {boolean=} forceRefresh
     * @return {boolean|{passive: boolean}}
     */
    function applyPassive() {
      var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
      var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (supportsPassive_ === undefined || forceRefresh) {
        var isSupported = false;
        try {
          globalObj.document.addEventListener('test', null, {
            get passive() {
              isSupported = { passive: true };
            }
          });
        } catch (e) {
          //empty
        }

        supportsPassive_ = isSupported;
      }

      return supportsPassive_;
    }

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

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

    var defineProperty = function (obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    };

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

    /* global CustomEvent */

    function extractIconProp(iconProp) {
      if (typeof iconProp === 'string') {
        return {
          classes: { 'material-icons': true },
          content: iconProp
        };
      } else if (iconProp instanceof Array) {
        return {
          classes: iconProp.reduce(function (result, value) {
            return _extends(result, defineProperty({}, value, true));
          }, {})
        };
      } else if ((typeof iconProp === 'undefined' ? 'undefined' : _typeof(iconProp)) === 'object') {
        return {
          classes: iconProp.className.split(' ').reduce(function (result, value) {
            return _extends(result, defineProperty({}, value, true));
          }, {}),
          content: iconProp.textContent
        };
      }
    }

    var DispatchFocusMixin = {
      data: function data() {
        return { hasFocus: false };
      },

      methods: {
        onMouseDown: function onMouseDown() {
          this._active = true;
        },
        onMouseUp: function onMouseUp() {
          this._active = false;
        },
        onFocusEvent: function onFocusEvent() {
          var _this = this;

          // dispatch async to let time to other focus event to propagate
          setTimeout(function () {
            return _this.dispatchFocusEvent();
          }, 0);
        },
        onBlurEvent: function onBlurEvent() {
          var _this2 = this;

          // dispatch async to let time to other focus event to propagate
          // also filtur blur if mousedown
          this._active || setTimeout(function () {
            return _this2.dispatchFocusEvent();
          }, 0);
        },
        dispatchFocusEvent: function dispatchFocusEvent() {
          var hasFocus = this.$el === document.activeElement || this.$el.contains(document.activeElement);
          if (hasFocus != this.hasFocus) {
            this.$emit(hasFocus ? 'focus' : 'blur');
            this.hasFocus = hasFocus;
          }
        }
      },
      mounted: function mounted() {
        this.$el.addEventListener('focusin', this.onFocusEvent);
        this.$el.addEventListener('focusout', this.onBlurEvent);
        this.$el.addEventListener('mousedown', this.onMouseDown);
        this.$el.addEventListener('mouseup', this.onMouseUp);
      },
      beforeDestroy: function beforeDestroy() {
        this.$el.removeEventListener('focusin', this.onFocusEvent);
        this.$el.removeEventListener('focusout', this.onBlurEvent);
        this.$el.removeEventListener('mousedown', this.onMouseDown);
        this.$el.removeEventListener('mouseup', this.onMouseUp);
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

    /* eslint no-unused-vars: [2, {"args": "none"}] */

    /**
     * Adapter for MDC Text Field Helper Text.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the TextField helper text into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCTextFieldHelperTextAdapter = function () {
      function MDCTextFieldHelperTextAdapter() {
        classCallCheck(this, MDCTextFieldHelperTextAdapter);
      }

      createClass(MDCTextFieldHelperTextAdapter, [{
        key: "addClass",

        /**
         * Adds a class to the helper text element.
         * @param {string} className
         */
        value: function addClass(className) {}

        /**
         * Removes a class from the helper text element.
         * @param {string} className
         */

      }, {
        key: "removeClass",
        value: function removeClass(className) {}

        /**
         * Returns whether or not the helper text element contains the given class.
         * @param {string} className
         * @return {boolean}
         */

      }, {
        key: "hasClass",
        value: function hasClass(className) {}

        /**
         * Sets an attribute with a given value on the helper text element.
         * @param {string} attr
         * @param {string} value
         */

      }, {
        key: "setAttr",
        value: function setAttr(attr, value) {}

        /**
         * Removes an attribute from the helper text element.
         * @param {string} attr
         */

      }, {
        key: "removeAttr",
        value: function removeAttr(attr) {}

        /**
         * Sets the text content for the helper text element.
         * @param {string} content
         */

      }, {
        key: "setContent",
        value: function setContent(content) {}
      }]);
      return MDCTextFieldHelperTextAdapter;
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

    /** @enum {string} */
    var strings = {
      ARIA_HIDDEN: 'aria-hidden',
      ROLE: 'role'
    };

    /** @enum {string} */
    var cssClasses = {
      HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
      HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg'
    };

    /**
     * @license
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

    /**
     * @extends {MDCFoundation<!MDCTextFieldHelperTextAdapter>}
     * @final
     */

    var MDCTextFieldHelperTextFoundation = function (_MDCFoundation) {
      inherits(MDCTextFieldHelperTextFoundation, _MDCFoundation);
      createClass(MDCTextFieldHelperTextFoundation, null, [{
        key: 'cssClasses',

        /** @return enum {string} */
        get: function get$$1() {
          return cssClasses;
        }

        /** @return enum {string} */

      }, {
        key: 'strings',
        get: function get$$1() {
          return strings;
        }

        /**
         * {@see MDCTextFieldHelperTextAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCTextFieldHelperTextAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCTextFieldHelperTextAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              hasClass: function hasClass() {},
              setAttr: function setAttr() {},
              removeAttr: function removeAttr() {},
              setContent: function setContent() {}
            }
          );
        }

        /**
         * @param {!MDCTextFieldHelperTextAdapter} adapter
         */

      }]);

      function MDCTextFieldHelperTextFoundation(adapter) {
        classCallCheck(this, MDCTextFieldHelperTextFoundation);
        return possibleConstructorReturn(this, (MDCTextFieldHelperTextFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldHelperTextFoundation)).call(this, _extends(MDCTextFieldHelperTextFoundation.defaultAdapter, adapter)));
      }

      /**
       * Sets the content of the helper text field.
       * @param {string} content
       */


      createClass(MDCTextFieldHelperTextFoundation, [{
        key: 'setContent',
        value: function setContent(content) {
          this.adapter_.setContent(content);
        }

        /** @param {boolean} isPersistent Sets the persistency of the helper text. */

      }, {
        key: 'setPersistent',
        value: function setPersistent(isPersistent) {
          if (isPersistent) {
            this.adapter_.addClass(cssClasses.HELPER_TEXT_PERSISTENT);
          } else {
            this.adapter_.removeClass(cssClasses.HELPER_TEXT_PERSISTENT);
          }
        }

        /**
         * @param {boolean} isValidation True to make the helper text act as an
         *   error validation message.
         */

      }, {
        key: 'setValidation',
        value: function setValidation(isValidation) {
          if (isValidation) {
            this.adapter_.addClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
          } else {
            this.adapter_.removeClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
          }
        }

        /** Makes the helper text visible to the screen reader. */

      }, {
        key: 'showToScreenReader',
        value: function showToScreenReader() {
          this.adapter_.removeAttr(strings.ARIA_HIDDEN);
        }

        /**
         * Sets the validity of the helper text based on the input validity.
         * @param {boolean} inputIsValid
         */

      }, {
        key: 'setValidity',
        value: function setValidity(inputIsValid) {
          var helperTextIsPersistent = this.adapter_.hasClass(cssClasses.HELPER_TEXT_PERSISTENT);
          var helperTextIsValidationMsg = this.adapter_.hasClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
          var validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;

          if (validationMsgNeedsDisplay) {
            this.adapter_.setAttr(strings.ROLE, 'alert');
          } else {
            this.adapter_.removeAttr(strings.ROLE);
          }

          if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
            this.hide_();
          }
        }

        /**
         * Hides the help text from screen readers.
         * @private
         */

      }, {
        key: 'hide_',
        value: function hide_() {
          this.adapter_.setAttr(strings.ARIA_HIDDEN, 'true');
        }
      }]);
      return MDCTextFieldHelperTextFoundation;
    }(MDCFoundation);

    /**
     * @license
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

    /* eslint no-unused-vars: [2, {"args": "none"}] */

    /**
     * Adapter for MDC Text Field Icon.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the text field icon into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCTextFieldIconAdapter = function () {
      function MDCTextFieldIconAdapter() {
        classCallCheck(this, MDCTextFieldIconAdapter);
      }

      createClass(MDCTextFieldIconAdapter, [{
        key: "getAttr",

        /**
         * Gets the value of an attribute on the icon element.
         * @param {string} attr
         * @return {string}
         */
        value: function getAttr(attr) {}

        /**
         * Sets an attribute on the icon element.
         * @param {string} attr
         * @param {string} value
         */

      }, {
        key: "setAttr",
        value: function setAttr(attr, value) {}

        /**
         * Removes an attribute from the icon element.
         * @param {string} attr
         */

      }, {
        key: "removeAttr",
        value: function removeAttr(attr) {}

        /**
         * Sets the text content of the icon element.
         * @param {string} content
         */

      }, {
        key: "setContent",
        value: function setContent(content) {}

        /**
         * Registers an event listener on the icon element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "registerInteractionHandler",
        value: function registerInteractionHandler(evtType, handler) {}

        /**
         * Deregisters an event listener on the icon element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "deregisterInteractionHandler",
        value: function deregisterInteractionHandler(evtType, handler) {}

        /**
         * Emits a custom event "MDCTextField:icon" denoting a user has clicked the icon.
         */

      }, {
        key: "notifyIconAction",
        value: function notifyIconAction() {}
      }]);
      return MDCTextFieldIconAdapter;
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

    /** @enum {string} */
    var strings$1 = {
      ICON_EVENT: 'MDCTextField:icon',
      ICON_ROLE: 'button'
    };

    /**
     * @license
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

    /**
     * @extends {MDCFoundation<!MDCTextFieldIconAdapter>}
     * @final
     */

    var MDCTextFieldIconFoundation = function (_MDCFoundation) {
      inherits(MDCTextFieldIconFoundation, _MDCFoundation);
      createClass(MDCTextFieldIconFoundation, null, [{
        key: 'strings',

        /** @return enum {string} */
        get: function get$$1() {
          return strings$1;
        }

        /**
         * {@see MDCTextFieldIconAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCTextFieldIconAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCTextFieldIconAdapter} */{
              getAttr: function getAttr() {},
              setAttr: function setAttr() {},
              removeAttr: function removeAttr() {},
              setContent: function setContent() {},
              registerInteractionHandler: function registerInteractionHandler() {},
              deregisterInteractionHandler: function deregisterInteractionHandler() {},
              notifyIconAction: function notifyIconAction() {}
            }
          );
        }

        /**
         * @param {!MDCTextFieldIconAdapter} adapter
         */

      }]);

      function MDCTextFieldIconFoundation(adapter) {
        classCallCheck(this, MDCTextFieldIconFoundation);

        /** @private {string?} */
        var _this = possibleConstructorReturn(this, (MDCTextFieldIconFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldIconFoundation)).call(this, _extends(MDCTextFieldIconFoundation.defaultAdapter, adapter)));

        _this.savedTabIndex_ = null;

        /** @private {function(!Event): undefined} */
        _this.interactionHandler_ = function (evt) {
          return _this.handleInteraction(evt);
        };
        return _this;
      }

      createClass(MDCTextFieldIconFoundation, [{
        key: 'init',
        value: function init() {
          var _this2 = this;

          this.savedTabIndex_ = this.adapter_.getAttr('tabindex');

          ['click', 'keydown'].forEach(function (evtType) {
            _this2.adapter_.registerInteractionHandler(evtType, _this2.interactionHandler_);
          });
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          var _this3 = this;

          ['click', 'keydown'].forEach(function (evtType) {
            _this3.adapter_.deregisterInteractionHandler(evtType, _this3.interactionHandler_);
          });
        }

        /** @param {boolean} disabled */

      }, {
        key: 'setDisabled',
        value: function setDisabled(disabled) {
          if (!this.savedTabIndex_) {
            return;
          }

          if (disabled) {
            this.adapter_.setAttr('tabindex', '-1');
            this.adapter_.removeAttr('role');
          } else {
            this.adapter_.setAttr('tabindex', this.savedTabIndex_);
            this.adapter_.setAttr('role', strings$1.ICON_ROLE);
          }
        }

        /** @param {string} label */

      }, {
        key: 'setAriaLabel',
        value: function setAriaLabel(label) {
          this.adapter_.setAttr('aria-label', label);
        }

        /** @param {string} content */

      }, {
        key: 'setContent',
        value: function setContent(content) {
          this.adapter_.setContent(content);
        }

        /**
         * Handles an interaction event
         * @param {!Event} evt
         */

      }, {
        key: 'handleInteraction',
        value: function handleInteraction(evt) {
          if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
            this.adapter_.notifyIconAction();
          }
        }
      }]);
      return MDCTextFieldIconFoundation;
    }(MDCFoundation);

    /**
     * @license
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

    /**
     * Adapter for MDC Text Field.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the Text Field into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */

    var MDCTextFieldAdapter = function () {
      function MDCTextFieldAdapter() {
        classCallCheck(this, MDCTextFieldAdapter);
      }

      createClass(MDCTextFieldAdapter, [{
        key: 'addClass',

        /**
         * Adds a class to the root Element.
         * @param {string} className
         */
        value: function addClass(className) {}

        /**
         * Removes a class from the root Element.
         * @param {string} className
         */

      }, {
        key: 'removeClass',
        value: function removeClass(className) {}

        /**
         * Returns true if the root element contains the given class name.
         * @param {string} className
         * @return {boolean}
         */

      }, {
        key: 'hasClass',
        value: function hasClass(className) {}

        /**
         * Registers an event handler on the root element for a given event.
         * @param {string} type
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'registerTextFieldInteractionHandler',
        value: function registerTextFieldInteractionHandler(type, handler) {}

        /**
         * Deregisters an event handler on the root element for a given event.
         * @param {string} type
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'deregisterTextFieldInteractionHandler',
        value: function deregisterTextFieldInteractionHandler(type, handler) {}

        /**
         * Registers an event listener on the native input element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'registerInputInteractionHandler',
        value: function registerInputInteractionHandler(evtType, handler) {}

        /**
         * Deregisters an event listener on the native input element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'deregisterInputInteractionHandler',
        value: function deregisterInputInteractionHandler(evtType, handler) {}

        /**
         * Registers a validation attribute change listener on the input element.
         * Handler accepts list of attribute names.
         * @param {function(!Array<string>): undefined} handler
         * @return {!MutationObserver}
         */

      }, {
        key: 'registerValidationAttributeChangeHandler',
        value: function registerValidationAttributeChangeHandler(handler) {}

        /**
         * Disconnects a validation attribute observer on the input element.
         * @param {!MutationObserver} observer
         */

      }, {
        key: 'deregisterValidationAttributeChangeHandler',
        value: function deregisterValidationAttributeChangeHandler(observer) {}

        /**
         * Returns an object representing the native text input element, with a
         * similar API shape. The object returned should include the value, disabled
         * and badInput properties, as well as the checkValidity() function. We never
         * alter the value within our code, however we do update the disabled
         * property, so if you choose to duck-type the return value for this method
         * in your implementation it's important to keep this in mind. Also note that
         * this method can return null, which the foundation will handle gracefully.
         * @return {?Element|?NativeInputType}
         */

      }, {
        key: 'getNativeInput',
        value: function getNativeInput() {}

        /**
         * Returns true if the textfield is focused.
         * We achieve this via `document.activeElement === this.root_`.
         * @return {boolean}
         */

      }, {
        key: 'isFocused',
        value: function isFocused() {}

        /**
         * Returns true if the direction of the root element is set to RTL.
         * @return {boolean}
         */

      }, {
        key: 'isRtl',
        value: function isRtl() {}

        /**
         * Activates the line ripple.
         */

      }, {
        key: 'activateLineRipple',
        value: function activateLineRipple() {}

        /**
         * Deactivates the line ripple.
         */

      }, {
        key: 'deactivateLineRipple',
        value: function deactivateLineRipple() {}

        /**
         * Sets the transform origin of the line ripple.
         * @param {number} normalizedX
         */

      }, {
        key: 'setLineRippleTransformOrigin',
        value: function setLineRippleTransformOrigin(normalizedX) {}

        /**
         * Only implement if label exists.
         * Shakes label if shouldShake is true.
         * @param {boolean} shouldShake
         */

      }, {
        key: 'shakeLabel',
        value: function shakeLabel(shouldShake) {}

        /**
         * Only implement if label exists.
         * Floats the label above the input element if shouldFloat is true.
         * @param {boolean} shouldFloat
         */

      }, {
        key: 'floatLabel',
        value: function floatLabel(shouldFloat) {}

        /**
         * Returns true if label element exists, false if it doesn't.
         * @return {boolean}
         */

      }, {
        key: 'hasLabel',
        value: function hasLabel() {}

        /**
         * Only implement if label exists.
         * Returns width of label in pixels.
         * @return {number}
         */

      }, {
        key: 'getLabelWidth',
        value: function getLabelWidth() {}

        /**
         * Returns true if outline element exists, false if it doesn't.
         * @return {boolean}
         */

      }, {
        key: 'hasOutline',
        value: function hasOutline() {}

        /**
         * Only implement if outline element exists.
         * Updates SVG Path and outline element based on the
         * label element width and RTL context.
         * @param {number} labelWidth
         * @param {boolean=} isRtl
         */

      }, {
        key: 'notchOutline',
        value: function notchOutline(labelWidth, isRtl) {}

        /**
         * Only implement if outline element exists.
         * Closes notch in outline element.
         */

      }, {
        key: 'closeOutline',
        value: function closeOutline() {}
      }]);
      return MDCTextFieldAdapter;
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

    /** @enum {string} */
    var strings$2 = {
      ARIA_CONTROLS: 'aria-controls',
      INPUT_SELECTOR: '.mdc-text-field__input',
      LABEL_SELECTOR: '.mdc-floating-label',
      ICON_SELECTOR: '.mdc-text-field__icon',
      OUTLINE_SELECTOR: '.mdc-notched-outline',
      LINE_RIPPLE_SELECTOR: '.mdc-line-ripple'
    };

    /** @enum {string} */
    var cssClasses$1 = {
      ROOT: 'mdc-text-field',
      UPGRADED: 'mdc-text-field--upgraded',
      DISABLED: 'mdc-text-field--disabled',
      DENSE: 'mdc-text-field--dense',
      FOCUSED: 'mdc-text-field--focused',
      INVALID: 'mdc-text-field--invalid',
      BOX: 'mdc-text-field--box',
      OUTLINED: 'mdc-text-field--outlined'
    };

    /** @enum {number} */
    var numbers = {
      LABEL_SCALE: 0.75,
      DENSE_LABEL_SCALE: 0.923
    };

    // whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
    // under section: `Validation-related attributes`
    var VALIDATION_ATTR_WHITELIST = ['pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength'];

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
     * @extends {MDCFoundation<!MDCTextFieldAdapter>}
     * @final
     */

    var MDCTextFieldFoundation = function (_MDCFoundation) {
      inherits(MDCTextFieldFoundation, _MDCFoundation);
      createClass(MDCTextFieldFoundation, [{
        key: 'shouldShake',


        /** @return {boolean} */
        get: function get$$1() {
          return !this.isValid() && !this.isFocused_;
        }

        /** @return {boolean} */

      }, {
        key: 'shouldFloat',
        get: function get$$1() {
          return this.isFocused_ || !!this.getValue() || this.isBadInput_();
        }

        /**
         * {@see MDCTextFieldAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCTextFieldAdapter}
         */

      }], [{
        key: 'cssClasses',

        /** @return enum {string} */
        get: function get$$1() {
          return cssClasses$1;
        }

        /** @return enum {string} */

      }, {
        key: 'strings',
        get: function get$$1() {
          return strings$2;
        }

        /** @return enum {string} */

      }, {
        key: 'numbers',
        get: function get$$1() {
          return numbers;
        }
      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCTextFieldAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              hasClass: function hasClass() {},
              registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler() {},
              deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler() {},
              registerInputInteractionHandler: function registerInputInteractionHandler() {},
              deregisterInputInteractionHandler: function deregisterInputInteractionHandler() {},
              registerValidationAttributeChangeHandler: function registerValidationAttributeChangeHandler() {},
              deregisterValidationAttributeChangeHandler: function deregisterValidationAttributeChangeHandler() {},
              getNativeInput: function getNativeInput() {},
              isFocused: function isFocused() {},
              isRtl: function isRtl() {},
              activateLineRipple: function activateLineRipple() {},
              deactivateLineRipple: function deactivateLineRipple() {},
              setLineRippleTransformOrigin: function setLineRippleTransformOrigin() {},
              shakeLabel: function shakeLabel() {},
              floatLabel: function floatLabel() {},
              hasLabel: function hasLabel() {},
              getLabelWidth: function getLabelWidth() {},
              hasOutline: function hasOutline() {},
              notchOutline: function notchOutline() {},
              closeOutline: function closeOutline() {}
            }
          );
        }

        /**
         * @param {!MDCTextFieldAdapter} adapter
         * @param {!FoundationMapType=} foundationMap Map from subcomponent names to their subfoundations.
         */

      }]);

      function MDCTextFieldFoundation(adapter) {
        var foundationMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /** @type {!FoundationMapType} */{};
        classCallCheck(this, MDCTextFieldFoundation);

        /** @type {!MDCTextFieldHelperTextFoundation|undefined} */
        var _this = possibleConstructorReturn(this, (MDCTextFieldFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldFoundation)).call(this, _extends(MDCTextFieldFoundation.defaultAdapter, adapter)));

        _this.helperText_ = foundationMap.helperText;
        /** @type {!MDCTextFieldIconFoundation|undefined} */
        _this.icon_ = foundationMap.icon;

        /** @private {boolean} */
        _this.isFocused_ = false;
        /** @private {boolean} */
        _this.receivedUserInput_ = false;
        /** @private {boolean} */
        _this.useCustomValidityChecking_ = false;
        /** @private {boolean} */
        _this.isValid_ = true;
        /** @private {function(): undefined} */
        _this.inputFocusHandler_ = function () {
          return _this.activateFocus();
        };
        /** @private {function(): undefined} */
        _this.inputBlurHandler_ = function () {
          return _this.deactivateFocus();
        };
        /** @private {function(): undefined} */
        _this.inputInputHandler_ = function () {
          return _this.autoCompleteFocus();
        };
        /** @private {function(!Event): undefined} */
        _this.setPointerXOffset_ = function (evt) {
          return _this.setTransformOrigin(evt);
        };
        /** @private {function(!Event): undefined} */
        _this.textFieldInteractionHandler_ = function () {
          return _this.handleTextFieldInteraction();
        };
        /** @private {function(!Array): undefined} */
        _this.validationAttributeChangeHandler_ = function (attributesList) {
          return _this.handleValidationAttributeChange(attributesList);
        };

        /** @private {!MutationObserver} */
        _this.validationObserver_;
        return _this;
      }

      createClass(MDCTextFieldFoundation, [{
        key: 'init',
        value: function init() {
          var _this2 = this;

          this.adapter_.addClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
          // Ensure label does not collide with any pre-filled value.
          if (this.adapter_.hasLabel() && (this.getValue() || this.isBadInput_())) {
            this.adapter_.floatLabel(this.shouldFloat);
            this.notchOutline(this.shouldFloat);
          }

          if (this.adapter_.isFocused()) {
            this.inputFocusHandler_();
          }

          this.adapter_.registerInputInteractionHandler('focus', this.inputFocusHandler_);
          this.adapter_.registerInputInteractionHandler('blur', this.inputBlurHandler_);
          this.adapter_.registerInputInteractionHandler('input', this.inputInputHandler_);
          ['mousedown', 'touchstart'].forEach(function (evtType) {
            _this2.adapter_.registerInputInteractionHandler(evtType, _this2.setPointerXOffset_);
          });
          ['click', 'keydown'].forEach(function (evtType) {
            _this2.adapter_.registerTextFieldInteractionHandler(evtType, _this2.textFieldInteractionHandler_);
          });
          this.validationObserver_ = this.adapter_.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          var _this3 = this;

          this.adapter_.removeClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
          this.adapter_.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
          this.adapter_.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
          this.adapter_.deregisterInputInteractionHandler('input', this.inputInputHandler_);
          ['mousedown', 'touchstart'].forEach(function (evtType) {
            _this3.adapter_.deregisterInputInteractionHandler(evtType, _this3.setPointerXOffset_);
          });
          ['click', 'keydown'].forEach(function (evtType) {
            _this3.adapter_.deregisterTextFieldInteractionHandler(evtType, _this3.textFieldInteractionHandler_);
          });
          this.adapter_.deregisterValidationAttributeChangeHandler(this.validationObserver_);
        }

        /**
         * Handles user interactions with the Text Field.
         */

      }, {
        key: 'handleTextFieldInteraction',
        value: function handleTextFieldInteraction() {
          if (this.adapter_.getNativeInput().disabled) {
            return;
          }
          this.receivedUserInput_ = true;
        }

        /**
         * Handles validation attribute changes
         * @param {!Array<string>} attributesList
         */

      }, {
        key: 'handleValidationAttributeChange',
        value: function handleValidationAttributeChange(attributesList) {
          var _this4 = this;

          attributesList.some(function (attributeName) {
            if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
              _this4.styleValidity_(true);
              return true;
            }
          });
        }

        /**
         * Opens/closes the notched outline.
         * @param {boolean} openNotch
         */

      }, {
        key: 'notchOutline',
        value: function notchOutline(openNotch) {
          if (!this.adapter_.hasOutline() || !this.adapter_.hasLabel()) {
            return;
          }

          if (openNotch) {
            var isDense = this.adapter_.hasClass(cssClasses$1.DENSE);
            var labelScale = isDense ? numbers.DENSE_LABEL_SCALE : numbers.LABEL_SCALE;
            var labelWidth = this.adapter_.getLabelWidth() * labelScale;
            var isRtl = this.adapter_.isRtl();
            this.adapter_.notchOutline(labelWidth, isRtl);
          } else {
            this.adapter_.closeOutline();
          }
        }

        /**
         * Activates the text field focus state.
         */

      }, {
        key: 'activateFocus',
        value: function activateFocus() {
          this.isFocused_ = true;
          this.styleFocused_(this.isFocused_);
          this.adapter_.activateLineRipple();
          this.notchOutline(this.shouldFloat);
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
            this.adapter_.floatLabel(this.shouldFloat);
          }
          if (this.helperText_) {
            this.helperText_.showToScreenReader();
          }
        }

        /**
         * Sets the line ripple's transform origin, so that the line ripple activate
         * animation will animate out from the user's click location.
         * @param {!Event} evt
         */

      }, {
        key: 'setTransformOrigin',
        value: function setTransformOrigin(evt) {
          var targetClientRect = evt.target.getBoundingClientRect();
          var evtCoords = { x: evt.clientX, y: evt.clientY };
          var normalizedX = evtCoords.x - targetClientRect.left;
          this.adapter_.setLineRippleTransformOrigin(normalizedX);
        }

        /**
         * Activates the Text Field's focus state in cases when the input value
         * changes without user input (e.g. programatically).
         */

      }, {
        key: 'autoCompleteFocus',
        value: function autoCompleteFocus() {
          if (!this.receivedUserInput_) {
            this.activateFocus();
          }
        }

        /**
         * Deactivates the Text Field's focus state.
         */

      }, {
        key: 'deactivateFocus',
        value: function deactivateFocus() {
          this.isFocused_ = false;
          this.adapter_.deactivateLineRipple();
          var input = this.getNativeInput_();
          var shouldRemoveLabelFloat = !input.value && !this.isBadInput_();
          var isValid = this.isValid();
          this.styleValidity_(isValid);
          this.styleFocused_(this.isFocused_);
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
            this.adapter_.floatLabel(this.shouldFloat);
            this.notchOutline(this.shouldFloat);
          }
          if (shouldRemoveLabelFloat) {
            this.receivedUserInput_ = false;
          }
        }

        /**
         * @return {string} The value of the input Element.
         */

      }, {
        key: 'getValue',
        value: function getValue() {
          return this.getNativeInput_().value;
        }

        /**
         * @param {string} value The value to set on the input Element.
         */

      }, {
        key: 'setValue',
        value: function setValue(value) {
          this.getNativeInput_().value = value;
          var isValid = this.isValid();
          this.styleValidity_(isValid);
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
            this.adapter_.floatLabel(this.shouldFloat);
            this.notchOutline(this.shouldFloat);
          }
        }

        /**
         * @return {boolean} If a custom validity is set, returns that value.
         *     Otherwise, returns the result of native validity checks.
         */

      }, {
        key: 'isValid',
        value: function isValid() {
          return this.useCustomValidityChecking_ ? this.isValid_ : this.isNativeInputValid_();
        }

        /**
         * @param {boolean} isValid Sets the validity state of the Text Field.
         */

      }, {
        key: 'setValid',
        value: function setValid(isValid) {
          this.useCustomValidityChecking_ = true;
          this.isValid_ = isValid;
          // Retrieve from the getter to ensure correct logic is applied.
          isValid = this.isValid();
          this.styleValidity_(isValid);
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
          }
        }

        /**
         * @return {boolean} True if the Text Field is disabled.
         */

      }, {
        key: 'isDisabled',
        value: function isDisabled() {
          return this.getNativeInput_().disabled;
        }

        /**
         * @param {boolean} disabled Sets the text-field disabled or enabled.
         */

      }, {
        key: 'setDisabled',
        value: function setDisabled(disabled) {
          this.getNativeInput_().disabled = disabled;
          this.styleDisabled_(disabled);
        }

        /**
         * @param {string} content Sets the content of the helper text.
         */

      }, {
        key: 'setHelperTextContent',
        value: function setHelperTextContent(content) {
          if (this.helperText_) {
            this.helperText_.setContent(content);
          }
        }

        /**
         * Sets the aria label of the icon.
         * @param {string} label
         */

      }, {
        key: 'setIconAriaLabel',
        value: function setIconAriaLabel(label) {
          if (this.icon_) {
            this.icon_.setAriaLabel(label);
          }
        }

        /**
         * Sets the text content of the icon.
         * @param {string} content
         */

      }, {
        key: 'setIconContent',
        value: function setIconContent(content) {
          if (this.icon_) {
            this.icon_.setContent(content);
          }
        }

        /**
         * @return {boolean} True if the Text Field input fails in converting the
         *     user-supplied value.
         * @private
         */

      }, {
        key: 'isBadInput_',
        value: function isBadInput_() {
          return this.getNativeInput_().validity.badInput;
        }

        /**
         * @return {boolean} The result of native validity checking
         *     (ValidityState.valid).
         */

      }, {
        key: 'isNativeInputValid_',
        value: function isNativeInputValid_() {
          return this.getNativeInput_().validity.valid;
        }

        /**
         * Styles the component based on the validity state.
         * @param {boolean} isValid
         * @private
         */

      }, {
        key: 'styleValidity_',
        value: function styleValidity_(isValid) {
          var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;

          if (isValid) {
            this.adapter_.removeClass(INVALID);
          } else {
            this.adapter_.addClass(INVALID);
          }
          if (this.helperText_) {
            this.helperText_.setValidity(isValid);
          }
        }

        /**
         * Styles the component based on the focused state.
         * @param {boolean} isFocused
         * @private
         */

      }, {
        key: 'styleFocused_',
        value: function styleFocused_(isFocused) {
          var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;

          if (isFocused) {
            this.adapter_.addClass(FOCUSED);
          } else {
            this.adapter_.removeClass(FOCUSED);
          }
        }

        /**
         * Styles the component based on the disabled state.
         * @param {boolean} isDisabled
         * @private
         */

      }, {
        key: 'styleDisabled_',
        value: function styleDisabled_(isDisabled) {
          var _MDCTextFieldFoundati = MDCTextFieldFoundation.cssClasses,
              DISABLED = _MDCTextFieldFoundati.DISABLED,
              INVALID = _MDCTextFieldFoundati.INVALID;

          if (isDisabled) {
            this.adapter_.addClass(DISABLED);
            this.adapter_.removeClass(INVALID);
          } else {
            this.adapter_.removeClass(DISABLED);
          }
          if (this.icon_) {
            this.icon_.setDisabled(isDisabled);
          }
        }

        /**
         * @return {!Element|!NativeInputType} The native text input from the
         * host environment, or a dummy if none exists.
         * @private
         */

      }, {
        key: 'getNativeInput_',
        value: function getNativeInput_() {
          return this.adapter_.getNativeInput() ||
          /** @type {!NativeInputType} */{
            value: '',
            disabled: false,
            validity: {
              badInput: false,
              valid: true
            }
          };
        }
      }]);
      return MDCTextFieldFoundation;
    }(MDCFoundation);

    /**
     * @license
     * Copyright 2018 Google Inc. All Rights Reserved.
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
     * Adapter for MDC TextField Line Ripple.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the line ripple into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCLineRippleAdapter = function () {
      function MDCLineRippleAdapter() {
        classCallCheck(this, MDCLineRippleAdapter);
      }

      createClass(MDCLineRippleAdapter, [{
        key: "addClass",

        /**
         * Adds a class to the line ripple element.
         * @param {string} className
         */
        value: function addClass(className) {}

        /**
         * Removes a class from the line ripple element.
         * @param {string} className
         */

      }, {
        key: "removeClass",
        value: function removeClass(className) {}

        /**
         * @param {string} className
         * @return {boolean}
         */

      }, {
        key: "hasClass",
        value: function hasClass(className) {}

        /**
         * Sets the style property with propertyName to value on the root element.
         * @param {string} propertyName
         * @param {string} value
         */

      }, {
        key: "setStyle",
        value: function setStyle(propertyName, value) {}

        /**
         * Registers an event listener on the line ripple element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "registerEventHandler",
        value: function registerEventHandler(evtType, handler) {}

        /**
         * Deregisters an event listener on the line ripple element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "deregisterEventHandler",
        value: function deregisterEventHandler(evtType, handler) {}
      }]);
      return MDCLineRippleAdapter;
    }();

    /**
     * @license
     * Copyright 2018 Google Inc. All Rights Reserved.
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

    /** @enum {string} */
    var cssClasses$2 = {
      LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
      LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating'
    };

    /**
     * @license
     * Copyright 2018 Google Inc. All Rights Reserved.
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
     * @extends {MDCFoundation<!MDCLineRippleAdapter>}
     * @final
     */

    var MDCLineRippleFoundation = function (_MDCFoundation) {
      inherits(MDCLineRippleFoundation, _MDCFoundation);
      createClass(MDCLineRippleFoundation, null, [{
        key: 'cssClasses',

        /** @return enum {string} */
        get: function get$$1() {
          return cssClasses$2;
        }

        /**
         * {@see MDCLineRippleAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCLineRippleAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCLineRippleAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              hasClass: function hasClass() {},
              setStyle: function setStyle() {},
              registerEventHandler: function registerEventHandler() {},
              deregisterEventHandler: function deregisterEventHandler() {}
            }
          );
        }

        /**
         * @param {!MDCLineRippleAdapter=} adapter
         */

      }]);

      function MDCLineRippleFoundation() {
        var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /** @type {!MDCLineRippleAdapter} */{};
        classCallCheck(this, MDCLineRippleFoundation);

        /** @private {function(!Event): undefined} */
        var _this = possibleConstructorReturn(this, (MDCLineRippleFoundation.__proto__ || Object.getPrototypeOf(MDCLineRippleFoundation)).call(this, _extends(MDCLineRippleFoundation.defaultAdapter, adapter)));

        _this.transitionEndHandler_ = function (evt) {
          return _this.handleTransitionEnd(evt);
        };
        return _this;
      }

      createClass(MDCLineRippleFoundation, [{
        key: 'init',
        value: function init() {
          this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
        }

        /**
         * Activates the line ripple
         */

      }, {
        key: 'activate',
        value: function activate() {
          this.adapter_.removeClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
          this.adapter_.addClass(cssClasses$2.LINE_RIPPLE_ACTIVE);
        }

        /**
         * Sets the center of the ripple animation to the given X coordinate.
         * @param {number} xCoordinate
         */

      }, {
        key: 'setRippleCenter',
        value: function setRippleCenter(xCoordinate) {
          this.adapter_.setStyle('transform-origin', xCoordinate + 'px center');
        }

        /**
         * Deactivates the line ripple
         */

      }, {
        key: 'deactivate',
        value: function deactivate() {
          this.adapter_.addClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
        }

        /**
         * Handles a transition end event
         * @param {!Event} evt
         */

      }, {
        key: 'handleTransitionEnd',
        value: function handleTransitionEnd(evt) {
          // Wait for the line ripple to be either transparent or opaque
          // before emitting the animation end event
          var isDeactivating = this.adapter_.hasClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);

          if (evt.propertyName === 'opacity') {
            if (isDeactivating) {
              this.adapter_.removeClass(cssClasses$2.LINE_RIPPLE_ACTIVE);
              this.adapter_.removeClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
            }
          }
        }
      }]);
      return MDCLineRippleFoundation;
    }(MDCFoundation);

    /**
     * @license
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

    /* eslint no-unused-vars: [2, {"args": "none"}] */

    /**
     * Adapter for MDC Floating Label.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the floating label into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCFloatingLabelAdapter = function () {
      function MDCFloatingLabelAdapter() {
        classCallCheck(this, MDCFloatingLabelAdapter);
      }

      createClass(MDCFloatingLabelAdapter, [{
        key: "addClass",

        /**
         * Adds a class to the label element.
         * @param {string} className
         */
        value: function addClass(className) {}

        /**
         * Removes a class from the label element.
         * @param {string} className
         */

      }, {
        key: "removeClass",
        value: function removeClass(className) {}

        /**
         * Returns the width of the label element.
         * @return {number}
         */

      }, {
        key: "getWidth",
        value: function getWidth() {}

        /**
         * Registers an event listener on the root element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "registerInteractionHandler",
        value: function registerInteractionHandler(evtType, handler) {}

        /**
         * Deregisters an event listener on the root element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "deregisterInteractionHandler",
        value: function deregisterInteractionHandler(evtType, handler) {}
      }]);
      return MDCFloatingLabelAdapter;
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

    /** @enum {string} */
    var cssClasses$3 = {
      LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
      LABEL_SHAKE: 'mdc-floating-label--shake'
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
     * @extends {MDCFoundation<!MDCFloatingLabelAdapter>}
     * @final
     */

    var MDCFloatingLabelFoundation = function (_MDCFoundation) {
      inherits(MDCFloatingLabelFoundation, _MDCFoundation);
      createClass(MDCFloatingLabelFoundation, null, [{
        key: 'cssClasses',

        /** @return enum {string} */
        get: function get$$1() {
          return cssClasses$3;
        }

        /**
         * {@see MDCFloatingLabelAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCFloatingLabelAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCFloatingLabelAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              getWidth: function getWidth() {},
              registerInteractionHandler: function registerInteractionHandler() {},
              deregisterInteractionHandler: function deregisterInteractionHandler() {}
            }
          );
        }

        /**
         * @param {!MDCFloatingLabelAdapter} adapter
         */

      }]);

      function MDCFloatingLabelFoundation(adapter) {
        classCallCheck(this, MDCFloatingLabelFoundation);

        /** @private {function(!Event): undefined} */
        var _this = possibleConstructorReturn(this, (MDCFloatingLabelFoundation.__proto__ || Object.getPrototypeOf(MDCFloatingLabelFoundation)).call(this, _extends(MDCFloatingLabelFoundation.defaultAdapter, adapter)));

        _this.shakeAnimationEndHandler_ = function () {
          return _this.handleShakeAnimationEnd_();
        };
        return _this;
      }

      createClass(MDCFloatingLabelFoundation, [{
        key: 'init',
        value: function init() {
          this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
        }

        /**
         * Returns the width of the label element.
         * @return {number}
         */

      }, {
        key: 'getWidth',
        value: function getWidth() {
          return this.adapter_.getWidth();
        }

        /**
         * Styles the label to produce the label shake for errors.
         * @param {boolean} shouldShake adds shake class if true,
         * otherwise removes shake class.
         */

      }, {
        key: 'shake',
        value: function shake(shouldShake) {
          var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

          if (shouldShake) {
            this.adapter_.addClass(LABEL_SHAKE);
          } else {
            this.adapter_.removeClass(LABEL_SHAKE);
          }
        }

        /**
         * Styles the label to float or dock.
         * @param {boolean} shouldFloat adds float class if true, otherwise remove
         * float and shake class to dock label.
         */

      }, {
        key: 'float',
        value: function float(shouldFloat) {
          var _MDCFloatingLabelFoun = MDCFloatingLabelFoundation.cssClasses,
              LABEL_FLOAT_ABOVE = _MDCFloatingLabelFoun.LABEL_FLOAT_ABOVE,
              LABEL_SHAKE = _MDCFloatingLabelFoun.LABEL_SHAKE;

          if (shouldFloat) {
            this.adapter_.addClass(LABEL_FLOAT_ABOVE);
          } else {
            this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
            this.adapter_.removeClass(LABEL_SHAKE);
          }
        }

        /**
         * Handles an interaction event on the root element.
         */

      }, {
        key: 'handleShakeAnimationEnd_',
        value: function handleShakeAnimationEnd_() {
          var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

          this.adapter_.removeClass(LABEL_SHAKE);
        }
      }]);
      return MDCFloatingLabelFoundation;
    }(MDCFoundation);

    /**
     * @license
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

    /* eslint no-unused-vars: [2, {"args": "none"}] */

    /**
     * Adapter for MDC Notched Outline.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the Notched Outline into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCNotchedOutlineAdapter = function () {
      function MDCNotchedOutlineAdapter() {
        classCallCheck(this, MDCNotchedOutlineAdapter);
      }

      createClass(MDCNotchedOutlineAdapter, [{
        key: "getWidth",

        /**
         * Returns the width of the root element.
         * @return {number}
         */
        value: function getWidth() {}

        /**
         * Returns the height of the root element.
         * @return {number}
         */

      }, {
        key: "getHeight",
        value: function getHeight() {}

        /**
         * Adds a class to the root element.
         * @param {string} className
         */

      }, {
        key: "addClass",
        value: function addClass(className) {}

        /**
         * Removes a class from the root element.
         * @param {string} className
         */

      }, {
        key: "removeClass",
        value: function removeClass(className) {}

        /**
         * Sets the "d" attribute of the outline element's SVG path.
         * @param {string} value
         */

      }, {
        key: "setOutlinePathAttr",
        value: function setOutlinePathAttr(value) {}

        /**
         * Returns the idle outline element's computed style value of the given css property `propertyName`.
         * We achieve this via `getComputedStyle(...).getPropertyValue(propertyName)`.
         * @param {string} propertyName
         * @return {string}
         */

      }, {
        key: "getIdleOutlineStyleValue",
        value: function getIdleOutlineStyleValue(propertyName) {}
      }]);
      return MDCNotchedOutlineAdapter;
    }();

    /**
     * @license
     * Copyright 2018 Google Inc. All Rights Reserved.
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

    /** @enum {string} */
    var strings$3 = {
      PATH_SELECTOR: '.mdc-notched-outline__path',
      IDLE_OUTLINE_SELECTOR: '.mdc-notched-outline__idle'
    };

    /** @enum {string} */
    var cssClasses$4 = {
      OUTLINE_NOTCHED: 'mdc-notched-outline--notched'
    };

    /**
     * @license
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

    /**
     * @extends {MDCFoundation<!MDCNotchedOutlineAdapter>}
     * @final
     */

    var MDCNotchedOutlineFoundation = function (_MDCFoundation) {
      inherits(MDCNotchedOutlineFoundation, _MDCFoundation);
      createClass(MDCNotchedOutlineFoundation, null, [{
        key: 'strings',

        /** @return enum {string} */
        get: function get$$1() {
          return strings$3;
        }

        /** @return enum {string} */

      }, {
        key: 'cssClasses',
        get: function get$$1() {
          return cssClasses$4;
        }

        /**
         * {@see MDCNotchedOutlineAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCNotchedOutlineAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCNotchedOutlineAdapter} */{
              getWidth: function getWidth() {},
              getHeight: function getHeight() {},
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              setOutlinePathAttr: function setOutlinePathAttr() {},
              getIdleOutlineStyleValue: function getIdleOutlineStyleValue() {}
            }
          );
        }

        /**
         * @param {!MDCNotchedOutlineAdapter} adapter
         */

      }]);

      function MDCNotchedOutlineFoundation(adapter) {
        classCallCheck(this, MDCNotchedOutlineFoundation);
        return possibleConstructorReturn(this, (MDCNotchedOutlineFoundation.__proto__ || Object.getPrototypeOf(MDCNotchedOutlineFoundation)).call(this, _extends(MDCNotchedOutlineFoundation.defaultAdapter, adapter)));
      }

      /**
       * Adds the outline notched selector and updates the notch width
       * calculated based off of notchWidth and isRtl.
       * @param {number} notchWidth
       * @param {boolean=} isRtl
       */


      createClass(MDCNotchedOutlineFoundation, [{
        key: 'notch',
        value: function notch(notchWidth) {
          var isRtl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

          this.adapter_.addClass(OUTLINE_NOTCHED);
          this.updateSvgPath_(notchWidth, isRtl);
        }

        /**
         * Removes notched outline selector to close the notch in the outline.
         */

      }, {
        key: 'closeNotch',
        value: function closeNotch() {
          var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

          this.adapter_.removeClass(OUTLINE_NOTCHED);
        }

        /**
         * Updates the SVG path of the focus outline element based on the notchWidth
         * and the RTL context.
         * @param {number} notchWidth
         * @param {boolean=} isRtl
         * @private
         */

      }, {
        key: 'updateSvgPath_',
        value: function updateSvgPath_(notchWidth, isRtl) {
          // Fall back to reading a specific corner's style because Firefox doesn't report the style on border-radius.
          var radiusStyleValue = this.adapter_.getIdleOutlineStyleValue('border-radius') || this.adapter_.getIdleOutlineStyleValue('border-top-left-radius');
          var radius = parseFloat(radiusStyleValue);
          var width = this.adapter_.getWidth();
          var height = this.adapter_.getHeight();
          var cornerWidth = radius + 1.2;
          var leadingStrokeLength = Math.abs(11 - cornerWidth);
          var paddedNotchWidth = notchWidth + 8;

          // The right, bottom, and left sides of the outline follow the same SVG path.
          var pathMiddle = 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius + 'v' + (height - 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius + 'h' + (-width + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + 'v' + (-height + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius;

          var path = void 0;
          if (!isRtl) {
            path = 'M' + (cornerWidth + leadingStrokeLength + paddedNotchWidth) + ',' + 1 + 'h' + (width - 2 * cornerWidth - paddedNotchWidth - leadingStrokeLength) + pathMiddle + 'h' + leadingStrokeLength;
          } else {
            path = 'M' + (width - cornerWidth - leadingStrokeLength) + ',' + 1 + 'h' + leadingStrokeLength + pathMiddle + 'h' + (width - 2 * cornerWidth - paddedNotchWidth - leadingStrokeLength);
          }

          this.adapter_.setOutlinePathAttr(path);
        }
      }]);
      return MDCNotchedOutlineFoundation;
    }(MDCFoundation);

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

    var cssClasses$5 = {
      // Ripple is a special case where the "root" component is really a "mixin" of sorts,
      // given that it's an 'upgrade' to an existing component. That being said it is the root
      // CSS class that all other CSS classes derive from.
      ROOT: 'mdc-ripple-upgraded',
      UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
      BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
      FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
      FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
    };

    var strings$4 = {
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
          return cssClasses$5;
        }
      }, {
        key: 'strings',
        get: function get$$1() {
          return strings$4;
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
      name: 'mdc-textfield',
      mixins: [CustomElementMixin, DispatchFocusMixin, VMAUniqueIdMixin],
      inheritAttrs: false,
      model: {
        prop: 'value',
        event: 'model'
      },
      props: {
        value: String,
        type: {
          type: String,
          default: 'text',
          validator: function validator(value) {
            return ['text', 'email', 'search', 'password', 'tel', 'url', 'number'].indexOf(value) !== -1;
          }
        },
        dense: Boolean,
        label: String,
        helptext: String,
        helptextPersistent: Boolean,
        helptextValidation: Boolean,
        box: Boolean,
        outline: Boolean,
        disabled: Boolean,
        required: Boolean,
        valid: { type: Boolean, default: undefined },
        fullwidth: Boolean,
        multiline: Boolean,
        leadingIcon: [String, Array, Object],
        trailingIcon: [String, Array, Object],
        size: { type: [Number, String], default: 20 },
        minlength: { type: [Number, String], default: undefined },
        maxlength: { type: [Number, String], default: undefined },
        rows: { type: [Number, String], default: 8 },
        cols: { type: [Number, String], default: 40 },
        id: { type: String }
      },
      data: function data() {
        return {
          text: this.value,
          rootClasses: {
            'mdc-textfield': true,
            'mdc-text-field': true,
            'mdc-text-field--upgraded': true,
            'mdc-text-field--disabled': this.disabled,
            'mdc-text-field--dense': this.dense,
            'mdc-text-field--fullwidth': this.fullwidth,
            'mdc-text-field--textarea': this.multiline,
            'mdc-text-field--box': !this.fullwidth && this.box,
            'mdc-text-field--outlined': !this.fullwidth && this.outline
          },
          inputClasses: {
            'mdc-text-field__input': true
          },
          labelClasses: {
            'mdc-floating-label': true
          },
          lineRippleClasses: {
            'mdc-line-ripple': true
          },
          lineRippleStyles: {},
          helpClasses: {
            'mdc-text-field-helper-text': true,
            'mdc-text-field-helper-text--persistent': this.helptextPersistent,
            'mdc-text-field-helper-text--validation-msg': this.helptextValidation
          },
          outlineClasses: {},
          outlinePathAttr: undefined
        };
      },
      computed: {
        inputPlaceHolder: function inputPlaceHolder() {
          return this.fullwidth ? this.label : undefined;
        },
        inputAriaControls: function inputAriaControls() {
          return this.help ? 'help-' + this.vma_uid_ : undefined;
        },
        hasLabel: function hasLabel() {
          return !this.fullwidth && this.label;
        },
        hasOutline: function hasOutline() {
          return !this.fullwidth && this.outline;
        },
        hasLineRipple: function hasLineRipple() {
          return !this.hasOutline && !this.multiline;
        },
        hasLeadingIcon: function hasLeadingIcon() {
          if ((this.leadingIcon || this.$slots['leading-icon']) && !(this.trailingIcon || this.$slots['trailing-icon'])) {
            return this.leadingIcon ? extractIconProp(this.leadingIcon) : {};
          }
          return false;
        },
        hasTrailingIcon: function hasTrailingIcon() {
          if (this.trailingIcon || this.$slots['trailing-icon']) {
            return this.trailingIcon ? extractIconProp(this.trailingIcon) : {};
          }
          return false;
        },
        labelClassesUpgraded: function labelClassesUpgraded() {
          return _extends(this.labelClasses, {
            'mdc-floating-label--float-above': this.value
          });
        }
      },
      watch: {
        disabled: function disabled() {
          this.foundation && this.foundation.setDisabled(this.disabled);
        },
        required: function required() {
          this.$refs.input && (this.$refs.input.required = this.required);
        },
        valid: function valid() {
          if (typeof this.valid !== 'undefined') {
            this.foundation && this.foundation.setValid(this.valid);
          }
        },
        dense: function dense() {
          this.$set(this.rootClasses, 'mdc-text-field--dense', this.dense);
        },
        helptextPersistent: function helptextPersistent() {
          this.helperTextFoundation && this.helperTextFoundation.setPersistent(this.helptextPersistent);
        },
        helptextValidation: function helptextValidation() {
          this.helperTextFoundation && this.helperTextFoundation.setValidation(this.helptextValidation);
        },
        value: function value(_value) {
          if (this.foundation) {
            if (_value !== this.foundation.getValue()) {
              this.foundation.setValue(_value);
            }
          }
        }
      },
      mounted: function mounted() {
        var _this = this;

        if (this.$refs.lineRipple) {
          this.lineRippleFoundation = new MDCLineRippleFoundation({
            addClass: function addClass(className) {
              _this.$set(_this.lineRippleClasses, className, true);
            },
            removeClass: function removeClass(className) {
              _this.$delete(_this.lineRippleClasses, className);
            },
            hasClass: function hasClass(className) {
              _this.$refs.lineRipple.classList.contains(className);
            },
            setStyle: function setStyle(name, value) {
              _this.$set(_this.lineRippleStyles, name, value);
            },
            registerEventHandler: function registerEventHandler(evtType, handler) {
              _this.$refs.lineRipple.addEventListener(evtType, handler);
            },
            deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
              _this.$refs.lineRipple.removeEventListener(evtType, handler);
            }
          });
          this.lineRippleFoundation.init();
        }

        if (this.$refs.help) {
          this.helperTextFoundation = new MDCTextFieldHelperTextFoundation({
            addClass: function addClass(className) {
              _this.$set(_this.helpClasses, className, true);
            },
            removeClass: function removeClass(className) {
              _this.$delete(_this.helpClasses, className);
            },
            hasClass: function hasClass(className) {
              return _this.$refs.help.classList.contains(className);
            },
            setAttr: function setAttr(name, value) {
              _this.$refs.help.setAttribute(name, value);
            },
            removeAttr: function removeAttr(name) {
              _this.$refs.help.removeAttribute(name);
            },
            setContent: function setContent() /*content*/{
              // help text get's updated from {{helptext}}
              // this.$refs.help.textContent = content;
            }
          });
          this.helperTextFoundation.init();
        }

        if (this.$refs.icon) {
          if (this.hasLeadingIcon) {
            this.$set(this.rootClasses, 'mdc-text-field--with-leading-icon', true);
          } else if (this.hasTrailingIcon) {
            this.$set(this.rootClasses, 'mdc-text-field--with-trailing-icon', true);
          }

          this.iconFoundation = new MDCTextFieldIconFoundation({
            setAttr: function setAttr(attr, value) {
              return _this.$refs.icon.setAttribute(attr, value);
            },
            getAttr: function getAttr(attr) {
              return _this.$refs.icon.getAttribute(attr);
            },
            removeAttr: function removeAttr(attr) {
              return _this.$refs.icon.removeAttribute(attr);
            },
            setContent: function setContent() /*content*/{
              // icon text get's updated from {{{{ hasTrailingIcon.content }}}}
              // this.$refs.icon.textContent = content;
            },
            registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
              _this.$refs.icon.addEventListener(evtType, handler);
            },
            deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
              _this.$refs.icon.removeEventListener(evtType, handler);
            },
            notifyIconAction: function notifyIconAction() {
              return _this.$emit('icon-action');
            }
          });
          this.iconFoundation.init();
        }

        if (this.$refs.label) {
          this.labelFoundation = new MDCFloatingLabelFoundation({
            addClass: function addClass(className) {
              _this.$set(_this.labelClasses, className, true);
            },
            removeClass: function removeClass(className) {
              _this.$delete(_this.labelClasses, className);
            },
            getWidth: function getWidth() {
              return _this.$refs.label.offsetWidth;
            },
            registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
              _this.$refs.label.addEventListener(evtType, handler);
            },
            deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
              _this.$refs.label.removeEventListener(evtType, handler);
            }
          });
          this.labelFoundation.init();
        }

        if (this.$refs.outline) {
          this.outlineFoundation = new MDCNotchedOutlineFoundation({
            getWidth: function getWidth() {
              return _this.$refs.outline.offsetWidth;
            },
            getHeight: function getHeight() {
              return _this.$refs.outline.offsetHeight;
            },
            addClass: function addClass(className) {
              _this.$set(_this.outlineClasses, className, true);
            },
            removeClass: function removeClass(className) {
              _this.$delete(_this.outlineClasses, className);
            },
            setOutlinePathAttr: function setOutlinePathAttr(value) {
              _this.outlinePathAttr = value;
            },
            getIdleOutlineStyleValue: function getIdleOutlineStyleValue(propertyName) {
              var idleOutlineElement = _this.$refs.outlineIdle;
              if (idleOutlineElement) {
                return window.getComputedStyle(idleOutlineElement).getPropertyValue(propertyName);
              }
            }
          });
          this.outlineFoundation.init();
        }

        this.foundation = new MDCTextFieldFoundation({
          addClass: function addClass(className) {
            _this.$set(_this.rootClasses, className, true);
          },
          removeClass: function removeClass(className) {
            _this.$delete(_this.rootClasses, className);
          },
          hasClass: function hasClass(className) {
            _this.$refs.root.classList.contains(className);
          },
          registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler(evtType, handler) {
            _this.$refs.root.addEventListener(evtType, handler);
          },
          deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler(evtType, handler) {
            _this.$refs.root.removeEventListener(evtType, handler);
          },
          isFocused: function isFocused() {
            return document.activeElement === _this.$refs.input;
          },
          isRtl: function isRtl() {
            return window.getComputedStyle(_this.$refs.root).getPropertyValue('direction') === 'rtl';
          },
          deactivateLineRipple: function deactivateLineRipple() {
            if (_this.lineRippleFoundation) {
              _this.lineRippleFoundation.deactivate();
            }
          },
          activateLineRipple: function activateLineRipple() {
            if (_this.lineRippleFoundation) {
              _this.lineRippleFoundation.activate();
            }
          },
          setLineRippleTransformOrigin: function setLineRippleTransformOrigin(normalizedX) {
            if (_this.lineRippleFoundation) {
              _this.lineRippleFoundation.setRippleCenter(normalizedX);
            }
          },
          registerInputInteractionHandler: function registerInputInteractionHandler(evtType, handler) {
            _this.$refs.input.addEventListener(evtType, handler, applyPassive());
          },
          deregisterInputInteractionHandler: function deregisterInputInteractionHandler(evtType, handler) {
            _this.$refs.input.removeEventListener(evtType, handler, applyPassive());
          },
          registerValidationAttributeChangeHandler: function registerValidationAttributeChangeHandler(handler) {
            var getAttributesList = function getAttributesList(mutationsList) {
              return mutationsList.map(function (mutation) {
                return mutation.attributeName;
              });
            };
            var observer = new MutationObserver(function (mutationsList) {
              return handler(getAttributesList(mutationsList));
            });
            var targetNode = _this.$refs.input;
            var config = { attributes: true };
            observer.observe(targetNode, config);
            return observer;
          },
          deregisterValidationAttributeChangeHandler: function deregisterValidationAttributeChangeHandler(observer) {
            observer.disconnect();
          },
          shakeLabel: function shakeLabel(shouldShake) {
            _this.labelFoundation.shake(shouldShake);
          },
          floatLabel: function floatLabel(shouldFloat) {
            _this.labelFoundation.float(shouldFloat);
          },
          hasLabel: function hasLabel() {
            return !!_this.$refs.label;
          },
          getLabelWidth: function getLabelWidth() {
            return _this.labelFoundation.getWidth();
          },
          getNativeInput: function getNativeInput() {
            return _this.$refs.input;
          },
          hasOutline: function hasOutline() {
            return !!_this.hasOutline;
          },
          notchOutline: function notchOutline(notchWidth, isRtl) {
            return _this.outlineFoundation.notch(notchWidth, isRtl);
          },
          closeOutline: function closeOutline() {
            return _this.outlineFoundation.closeNotch();
          }
        }, {
          helperText: this.helperTextFoundation,
          icon: this.iconFoundation
        });

        this.foundation.init();
        this.foundation.setValue(this.value);
        this.foundation.setDisabled(this.disabled);
        this.$refs.input && (this.$refs.input.required = this.required);
        if (typeof this.valid !== 'undefined') {
          this.foundation.setValid(this.valid);
        }

        if (this.textbox) {
          this.ripple = new RippleBase(this);
          this.ripple.init();
        }
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation && this.foundation.destroy();
        this.lineRippleFoundation && this.lineRippleFoundation.destroy();
        this.helperTextFoundation && this.helperTextFoundation.destroy();
        this.iconFoundation && this.iconFoundation.destroy();
        this.labelFoundation && this.labelFoundation.destroy();
        this.outlineFoundation && this.outlineFoundation.destroy();
        this.ripple && this.ripple.destroy();
      },

      methods: {
        updateValue: function updateValue(value) {
          this.$emit('model', value);
        },
        focus: function focus() {
          this.$refs.input && this.$refs.input.focus();
        },
        blur: function blur() {
          this.$refs.input && this.$refs.input.blur();
        }
      }
    };

    /* script */
    var __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", {
        staticClass: "mdc-textfield-wrapper",
        style: { width: _vm.fullwidth ? "100%" : undefined },
        attrs: { id: _vm.id }
      }, [_c("div", { ref: "root", class: _vm.rootClasses }, [!!_vm.hasLeadingIcon ? _c("i", {
        ref: "icon",
        staticClass: "mdc-text-field__icon",
        class: _vm.hasLeadingIcon.classes,
        attrs: { tabindex: "0" }
      }, [_vm._t("leading-icon", [_vm._v(_vm._s(_vm.hasLeadingIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.multiline ? _c("textarea", _vm._g(_vm._b({
        ref: "input",
        class: _vm.inputClasses,
        attrs: {
          id: _vm.vma_uid_,
          minlength: _vm.minlength,
          maxlength: _vm.maxlength,
          placeholder: _vm.inputPlaceHolder,
          "aria-label": _vm.inputPlaceHolder,
          "aria-controls": _vm.inputAriaControls,
          rows: _vm.rows,
          cols: _vm.cols
        },
        on: {
          input: function input($event) {
            _vm.updateValue($event.target.value);
          }
        }
      }, "textarea", _vm.$attrs, false), _vm.$listeners)) : _c("input", _vm._g(_vm._b({
        ref: "input",
        class: _vm.inputClasses,
        attrs: {
          id: _vm.vma_uid_,
          type: _vm.type,
          minlength: _vm.minlength,
          maxlength: _vm.maxlength,
          placeholder: _vm.inputPlaceHolder,
          "aria-label": _vm.inputPlaceHolder,
          "aria-controls": _vm.inputAriaControls
        },
        on: {
          input: function input($event) {
            _vm.updateValue($event.target.value);
          }
        }
      }, "input", _vm.$attrs, false), _vm.$listeners)), _vm._v(" "), _vm.hasLabel ? _c("label", {
        ref: "label",
        class: _vm.labelClassesUpgraded,
        attrs: { for: _vm.vma_uid_ }
      }, [_vm._v("\n      " + _vm._s(_vm.label) + "\n    ")]) : _vm._e(), _vm._v(" "), !!_vm.hasTrailingIcon ? _c("i", {
        ref: "icon",
        staticClass: "mdc-text-field__icon",
        class: _vm.hasTrailingIcon.classes,
        attrs: { tabindex: "0" }
      }, [_vm._t("trailing-icon", [_vm._v(_vm._s(_vm.hasTrailingIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.hasOutline ? _c("div", {
        ref: "outline",
        staticClass: "mdc-notched-outline",
        class: _vm.outlineClasses
      }, [_c("svg", [_c("path", {
        staticClass: "mdc-notched-outline__path",
        attrs: { d: _vm.outlinePathAttr }
      })])]) : _vm._e(), _vm._v(" "), _vm.hasOutline ? _c("div", {
        ref: "outlineIdle",
        staticClass: "mdc-notched-outline__idle"
      }) : _vm._e(), _vm._v(" "), _vm.hasLineRipple ? _c("div", {
        ref: "lineRipple",
        class: _vm.lineRippleClasses,
        style: _vm.lineRippleStyles
      }) : _vm._e()]), _vm._v(" "), _vm.helptext ? _c("p", {
        ref: "help",
        class: _vm.helpClasses,
        attrs: { id: "help-" + _vm.vma_uid_, "aria-hidden": "true" }
      }, [_vm._v("\n    " + _vm._s(_vm.helptext) + "\n  ")]) : _vm._e()]);
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
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/textfield/mdc-textfield.vue";

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

    var mdcTextField = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

    var plugin = BasePlugin({
      mdcTextField: mdcTextField
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXBwbHktcGFzc2l2ZS5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWVsZW1lbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1pY29uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Rpc3BhdGNoLWZvY3VzLW1peGluLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RleHRmaWVsZC9oZWxwZXItdGV4dC9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvaGVscGVyLXRleHQvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvaGVscGVyLXRleHQvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2ljb24vYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2ljb24vY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvaWNvbi9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpbmUtcmlwcGxlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpbmUtcmlwcGxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbGluZS1yaXBwbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9mbG9hdGluZy1sYWJlbC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9ub3RjaGVkLW91dGxpbmUvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL3JpcHBsZS9tZGMtcmlwcGxlLWJhc2UuanMiLCIuLi8uLi9jb21wb25lbnRzL3JpcHBsZS9tZGMtcmlwcGxlLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvdGV4dGZpZWxkL21kYy10ZXh0ZmllbGQudnVlIiwiLi4vLi4vY29tcG9uZW50cy90ZXh0ZmllbGQvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL3RleHRmaWVsZC9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgc3VwcG9ydHNQYXNzaXZlX1xuXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG4gKiBAcGFyYW0geyFXaW5kb3c9fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx7cGFzc2l2ZTogYm9vbGVhbn19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVBhc3NpdmUoZ2xvYmFsT2JqID0gd2luZG93LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3VwcG9ydHNQYXNzaXZlXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlXG4gICAgdHJ5IHtcbiAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge1xuICAgICAgICBnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgICBpc1N1cHBvcnRlZCA9IHsgcGFzc2l2ZTogdHJ1ZSB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy9lbXB0eVxuICAgIH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZFxuICB9XG5cbiAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZV9cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdChwbHVnaW4pIHtcbiAgLy8gQXV0by1pbnN0YWxsXG4gIGxldCBfVnVlID0gbnVsbFxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxuICB9XG4gIGlmIChfVnVlKSB7XG4gICAgX1Z1ZS51c2UocGx1Z2luKVxuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbihjb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiB2bSA9PiB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXG4gICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSwgY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgQ3VzdG9tRWxlbWVudCA9IHtcbiAgZnVuY3Rpb25hbDogdHJ1ZSxcbiAgcmVuZGVyKGNyZWF0ZUVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudChcbiAgICAgIGNvbnRleHQucHJvcHMuaXMgfHwgY29udGV4dC5wcm9wcy50YWcgfHwgJ2RpdicsXG4gICAgICBjb250ZXh0LmRhdGEsXG4gICAgICBjb250ZXh0LmNoaWxkcmVuXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBDdXN0b21FbGVtZW50TWl4aW4gPSB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBDdXN0b21FbGVtZW50XG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50KGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICBsZXQgZXZ0XG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBleHRyYWN0SWNvblByb3AoaWNvblByb3ApIHtcbiAgaWYgKHR5cGVvZiBpY29uUHJvcCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3NlczogeyAnbWF0ZXJpYWwtaWNvbnMnOiB0cnVlIH0sXG4gICAgICBjb250ZW50OiBpY29uUHJvcFxuICAgIH1cbiAgfSBlbHNlIGlmIChpY29uUHJvcCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IGljb25Qcm9wLnJlZHVjZShcbiAgICAgICAgKHJlc3VsdCwgdmFsdWUpID0+IE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7IFt2YWx1ZV06IHRydWUgfSksXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBpY29uUHJvcCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3NlczogaWNvblByb3AuY2xhc3NOYW1lXG4gICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgIC5yZWR1Y2UoXG4gICAgICAgICAgKHJlc3VsdCwgdmFsdWUpID0+IE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7IFt2YWx1ZV06IHRydWUgfSksXG4gICAgICAgICAge31cbiAgICAgICAgKSxcbiAgICAgIGNvbnRlbnQ6IGljb25Qcm9wLnRleHRDb250ZW50XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY29uc3QgRGlzcGF0Y2hGb2N1c01peGluID0ge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7IGhhc0ZvY3VzOiBmYWxzZSB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbk1vdXNlRG93bigpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IHRydWVcbiAgICB9LFxuICAgIG9uTW91c2VVcCgpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlXG4gICAgfSxcbiAgICBvbkZvY3VzRXZlbnQoKSB7XG4gICAgICAvLyBkaXNwYXRjaCBhc3luYyB0byBsZXQgdGltZSB0byBvdGhlciBmb2N1cyBldmVudCB0byBwcm9wYWdhdGVcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNwYXRjaEZvY3VzRXZlbnQoKSwgMClcbiAgICB9LFxuICAgIG9uQmx1ckV2ZW50KCkge1xuICAgICAgLy8gZGlzcGF0Y2ggYXN5bmMgdG8gbGV0IHRpbWUgdG8gb3RoZXIgZm9jdXMgZXZlbnQgdG8gcHJvcGFnYXRlXG4gICAgICAvLyBhbHNvIGZpbHR1ciBibHVyIGlmIG1vdXNlZG93blxuICAgICAgdGhpcy5fYWN0aXZlIHx8IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNwYXRjaEZvY3VzRXZlbnQoKSwgMClcbiAgICB9LFxuICAgIGRpc3BhdGNoRm9jdXNFdmVudCgpIHtcbiAgICAgIGxldCBoYXNGb2N1cyA9XG4gICAgICAgIHRoaXMuJGVsID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8XG4gICAgICAgIHRoaXMuJGVsLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpXG4gICAgICBpZiAoaGFzRm9jdXMgIT0gdGhpcy5oYXNGb2N1cykge1xuICAgICAgICB0aGlzLiRlbWl0KGhhc0ZvY3VzID8gJ2ZvY3VzJyA6ICdibHVyJylcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGhhc0ZvY3VzXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLm9uRm9jdXNFdmVudClcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25CbHVyRXZlbnQpXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bilcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXApXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0V2ZW50KVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkJsdXJFdmVudClcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcClcbiAgfVxufVxuIiwiY29uc3Qgc2NvcGUgPVxuICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDB4MTAwMDAwMDApKS50b1N0cmluZygpICsgJy0nXG5cbmV4cG9ydCBjb25zdCBWTUFVbmlxdWVJZE1peGluID0ge1xuICBiZWZvcmVDcmVhdGUoKSB7XG4gICAgdGhpcy52bWFfdWlkXyA9IHNjb3BlICsgdGhpcy5fdWlkXG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFRleHQgRmllbGQgSGVscGVyIFRleHQuXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgVGV4dEZpZWxkIGhlbHBlciB0ZXh0IGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlciB7XG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdG8gdGhlIGhlbHBlciB0ZXh0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIGhlbHBlciB0ZXh0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgaGVscGVyIHRleHQgZWxlbWVudCBjb250YWlucyB0aGUgZ2l2ZW4gY2xhc3MuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc0NsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogU2V0cyBhbiBhdHRyaWJ1dGUgd2l0aCBhIGdpdmVuIHZhbHVlIG9uIHRoZSBoZWxwZXIgdGV4dCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0clxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldEF0dHIoYXR0ciwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gYXR0cmlidXRlIGZyb20gdGhlIGhlbHBlciB0ZXh0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG4gICAqL1xuICByZW1vdmVBdHRyKGF0dHIpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRleHQgY29udGVudCBmb3IgdGhlIGhlbHBlciB0ZXh0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG4gICAqL1xuICBzZXRDb250ZW50KGNvbnRlbnQpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RleHRGaWVsZEhlbHBlclRleHRBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3Qgc3RyaW5ncyA9IHtcbiAgQVJJQV9ISURERU46ICdhcmlhLWhpZGRlbicsXG4gIFJPTEU6ICdyb2xlJyxcbn07XG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgSEVMUEVSX1RFWFRfUEVSU0lTVEVOVDogJ21kYy10ZXh0LWZpZWxkLWhlbHBlci10ZXh0LS1wZXJzaXN0ZW50JyxcbiAgSEVMUEVSX1RFWFRfVkFMSURBVElPTl9NU0c6ICdtZGMtdGV4dC1maWVsZC1oZWxwZXItdGV4dC0tdmFsaWRhdGlvbi1tc2cnLFxufTtcblxuZXhwb3J0IHtzdHJpbmdzLCBjc3NDbGFzc2VzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKipcbiAgICoge0BzZWUgTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlcn0gKi8gKHtcbiAgICAgIGFkZENsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoKSA9PiB7fSxcbiAgICAgIGhhc0NsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHNldEF0dHI6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQXR0cjogKCkgPT4ge30sXG4gICAgICBzZXRDb250ZW50OiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjb250ZW50IG9mIHRoZSBoZWxwZXIgdGV4dCBmaWVsZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcbiAgICovXG4gIHNldENvbnRlbnQoY29udGVudCkge1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0Q29udGVudChjb250ZW50KTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGlzUGVyc2lzdGVudCBTZXRzIHRoZSBwZXJzaXN0ZW5jeSBvZiB0aGUgaGVscGVyIHRleHQuICovXG4gIHNldFBlcnNpc3RlbnQoaXNQZXJzaXN0ZW50KSB7XG4gICAgaWYgKGlzUGVyc2lzdGVudCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1BFUlNJU1RFTlQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuSEVMUEVSX1RFWFRfUEVSU0lTVEVOVCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNWYWxpZGF0aW9uIFRydWUgdG8gbWFrZSB0aGUgaGVscGVyIHRleHQgYWN0IGFzIGFuXG4gICAqICAgZXJyb3IgdmFsaWRhdGlvbiBtZXNzYWdlLlxuICAgKi9cbiAgc2V0VmFsaWRhdGlvbihpc1ZhbGlkYXRpb24pIHtcbiAgICBpZiAoaXNWYWxpZGF0aW9uKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuSEVMUEVSX1RFWFRfVkFMSURBVElPTl9NU0cpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuSEVMUEVSX1RFWFRfVkFMSURBVElPTl9NU0cpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBNYWtlcyB0aGUgaGVscGVyIHRleHQgdmlzaWJsZSB0byB0aGUgc2NyZWVuIHJlYWRlci4gKi9cbiAgc2hvd1RvU2NyZWVuUmVhZGVyKCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQXR0cihzdHJpbmdzLkFSSUFfSElEREVOKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWxpZGl0eSBvZiB0aGUgaGVscGVyIHRleHQgYmFzZWQgb24gdGhlIGlucHV0IHZhbGlkaXR5LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlucHV0SXNWYWxpZFxuICAgKi9cbiAgc2V0VmFsaWRpdHkoaW5wdXRJc1ZhbGlkKSB7XG4gICAgY29uc3QgaGVscGVyVGV4dElzUGVyc2lzdGVudCA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5IRUxQRVJfVEVYVF9QRVJTSVNURU5UKTtcbiAgICBjb25zdCBoZWxwZXJUZXh0SXNWYWxpZGF0aW9uTXNnID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1ZBTElEQVRJT05fTVNHKTtcbiAgICBjb25zdCB2YWxpZGF0aW9uTXNnTmVlZHNEaXNwbGF5ID0gaGVscGVyVGV4dElzVmFsaWRhdGlvbk1zZyAmJiAhaW5wdXRJc1ZhbGlkO1xuXG4gICAgaWYgKHZhbGlkYXRpb25Nc2dOZWVkc0Rpc3BsYXkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cihzdHJpbmdzLlJPTEUsICdhbGVydCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUF0dHIoc3RyaW5ncy5ST0xFKTtcbiAgICB9XG5cbiAgICBpZiAoIWhlbHBlclRleHRJc1BlcnNpc3RlbnQgJiYgIXZhbGlkYXRpb25Nc2dOZWVkc0Rpc3BsYXkpIHtcbiAgICAgIHRoaXMuaGlkZV8oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIGhlbHAgdGV4dCBmcm9tIHNjcmVlbiByZWFkZXJzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGlkZV8oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyKHN0cmluZ3MuQVJJQV9ISURERU4sICd0cnVlJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFRleHQgRmllbGQgSWNvbi5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSB0ZXh0IGZpZWxkIGljb24gaW50byB5b3VyIGZyYW1ld29yay4gU2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2F1dGhvcmluZy1jb21wb25lbnRzLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1RleHRGaWVsZEljb25BZGFwdGVyIHtcbiAgLyoqXG4gICAqIEdldHMgdGhlIHZhbHVlIG9mIGFuIGF0dHJpYnV0ZSBvbiB0aGUgaWNvbiBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0clxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBnZXRBdHRyKGF0dHIpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgYW4gYXR0cmlidXRlIG9uIHRoZSBpY29uIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0QXR0cihhdHRyLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBhdHRyaWJ1dGUgZnJvbSB0aGUgaWNvbiBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0clxuICAgKi9cbiAgcmVtb3ZlQXR0cihhdHRyKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0ZXh0IGNvbnRlbnQgb2YgdGhlIGljb24gZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcbiAgICovXG4gIHNldENvbnRlbnQoY29udGVudCkge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBpY29uIGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgaWNvbiBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhIGN1c3RvbSBldmVudCBcIk1EQ1RleHRGaWVsZDppY29uXCIgZGVub3RpbmcgYSB1c2VyIGhhcyBjbGlja2VkIHRoZSBpY29uLlxuICAgKi9cbiAgbm90aWZ5SWNvbkFjdGlvbigpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RleHRGaWVsZEljb25BZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3Qgc3RyaW5ncyA9IHtcbiAgSUNPTl9FVkVOVDogJ01EQ1RleHRGaWVsZDppY29uJyxcbiAgSUNPTl9ST0xFOiAnYnV0dG9uJyxcbn07XG5cbmV4cG9ydCB7c3RyaW5nc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDVGV4dEZpZWxkSWNvbkFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7c3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1RleHRGaWVsZEljb25BZGFwdGVyPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENUZXh0RmllbGRJY29uQWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm5cbiAgICogdHlwZXMuXG4gICAqIEByZXR1cm4geyFNRENUZXh0RmllbGRJY29uQWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ1RleHRGaWVsZEljb25BZGFwdGVyfSAqLyAoe1xuICAgICAgZ2V0QXR0cjogKCkgPT4ge30sXG4gICAgICBzZXRBdHRyOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUF0dHI6ICgpID0+IHt9LFxuICAgICAgc2V0Q29udGVudDogKCkgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeUljb25BY3Rpb246ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ1RleHRGaWVsZEljb25BZGFwdGVyfSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtzdHJpbmc/fSAqL1xuICAgIHRoaXMuc2F2ZWRUYWJJbmRleF8gPSBudWxsO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy5pbnRlcmFjdGlvbkhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVJbnRlcmFjdGlvbihldnQpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnNhdmVkVGFiSW5kZXhfID0gdGhpcy5hZGFwdGVyXy5nZXRBdHRyKCd0YWJpbmRleCcpO1xuXG4gICAgWydjbGljaycsICdrZXlkb3duJ10uZm9yRWFjaCgoZXZ0VHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCB0aGlzLmludGVyYWN0aW9uSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBbJ2NsaWNrJywgJ2tleWRvd24nXS5mb3JFYWNoKChldnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgdGhpcy5pbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVkICovXG4gIHNldERpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgaWYgKCF0aGlzLnNhdmVkVGFiSW5kZXhfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUF0dHIoJ3JvbGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyKCd0YWJpbmRleCcsIHRoaXMuc2F2ZWRUYWJJbmRleF8pO1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyKCdyb2xlJywgc3RyaW5ncy5JQ09OX1JPTEUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgKi9cbiAgc2V0QXJpYUxhYmVsKGxhYmVsKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyKCdhcmlhLWxhYmVsJywgbGFiZWwpO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50ICovXG4gIHNldENvbnRlbnQoY29udGVudCkge1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0Q29udGVudChjb250ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFuIGludGVyYWN0aW9uIGV2ZW50XG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICovXG4gIGhhbmRsZUludGVyYWN0aW9uKGV2dCkge1xuICAgIGlmIChldnQudHlwZSA9PT0gJ2NsaWNrJyB8fCBldnQua2V5ID09PSAnRW50ZXInIHx8IGV2dC5rZXlDb2RlID09PSAxMykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlJY29uQWN0aW9uKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24gZnJvbSAnLi9oZWxwZXItdGV4dC9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbiBmcm9tICcuL2ljb24vZm91bmRhdGlvbic7XG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIHZhbHVlOiBzdHJpbmcsXG4gKiAgIGRpc2FibGVkOiBib29sZWFuLFxuICogICBiYWRJbnB1dDogYm9vbGVhbixcbiAqICAgdmFsaWRpdHk6IHtcbiAqICAgICBiYWRJbnB1dDogYm9vbGVhbixcbiAqICAgICB2YWxpZDogYm9vbGVhbixcbiAqICAgfSxcbiAqIH19XG4gKi9cbmxldCBOYXRpdmVJbnB1dFR5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgaGVscGVyVGV4dDogKCFNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbnx1bmRlZmluZWQpLFxuICogICBpY29uOiAoIU1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9ufHVuZGVmaW5lZCksXG4gKiB9fVxuICovXG5sZXQgRm91bmRhdGlvbk1hcFR5cGU7XG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFRleHQgRmllbGQuXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgVGV4dCBGaWVsZCBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDVGV4dEZpZWxkQWRhcHRlciB7XG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdG8gdGhlIHJvb3QgRWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2xhc3MgZnJvbSB0aGUgcm9vdCBFbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcm9vdCBlbGVtZW50IGNvbnRhaW5zIHRoZSBnaXZlbiBjbGFzcyBuYW1lLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSByb290IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSByb290IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgbmF0aXZlIGlucHV0IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSB2YWxpZGF0aW9uIGF0dHJpYnV0ZSBjaGFuZ2UgbGlzdGVuZXIgb24gdGhlIGlucHV0IGVsZW1lbnQuXG4gICAqIEhhbmRsZXIgYWNjZXB0cyBsaXN0IG9mIGF0dHJpYnV0ZSBuYW1lcy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbighQXJyYXk8c3RyaW5nPik6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKiBAcmV0dXJuIHshTXV0YXRpb25PYnNlcnZlcn1cbiAgICovXG4gIHJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgYSB2YWxpZGF0aW9uIGF0dHJpYnV0ZSBvYnNlcnZlciBvbiB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICogQHBhcmFtIHshTXV0YXRpb25PYnNlcnZlcn0gb2JzZXJ2ZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcihvYnNlcnZlcikge31cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuYXRpdmUgdGV4dCBpbnB1dCBlbGVtZW50LCB3aXRoIGFcbiAgICogc2ltaWxhciBBUEkgc2hhcGUuIFRoZSBvYmplY3QgcmV0dXJuZWQgc2hvdWxkIGluY2x1ZGUgdGhlIHZhbHVlLCBkaXNhYmxlZFxuICAgKiBhbmQgYmFkSW5wdXQgcHJvcGVydGllcywgYXMgd2VsbCBhcyB0aGUgY2hlY2tWYWxpZGl0eSgpIGZ1bmN0aW9uLiBXZSBuZXZlclxuICAgKiBhbHRlciB0aGUgdmFsdWUgd2l0aGluIG91ciBjb2RlLCBob3dldmVyIHdlIGRvIHVwZGF0ZSB0aGUgZGlzYWJsZWRcbiAgICogcHJvcGVydHksIHNvIGlmIHlvdSBjaG9vc2UgdG8gZHVjay10eXBlIHRoZSByZXR1cm4gdmFsdWUgZm9yIHRoaXMgbWV0aG9kXG4gICAqIGluIHlvdXIgaW1wbGVtZW50YXRpb24gaXQncyBpbXBvcnRhbnQgdG8ga2VlcCB0aGlzIGluIG1pbmQuIEFsc28gbm90ZSB0aGF0XG4gICAqIHRoaXMgbWV0aG9kIGNhbiByZXR1cm4gbnVsbCwgd2hpY2ggdGhlIGZvdW5kYXRpb24gd2lsbCBoYW5kbGUgZ3JhY2VmdWxseS5cbiAgICogQHJldHVybiB7P0VsZW1lbnR8P05hdGl2ZUlucHV0VHlwZX1cbiAgICovXG4gIGdldE5hdGl2ZUlucHV0KCkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB0ZXh0ZmllbGQgaXMgZm9jdXNlZC5cbiAgICogV2UgYWNoaWV2ZSB0aGlzIHZpYSBgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5yb290X2AuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBpc0ZvY3VzZWQoKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGRpcmVjdGlvbiBvZiB0aGUgcm9vdCBlbGVtZW50IGlzIHNldCB0byBSVEwuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBpc1J0bCgpIHt9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlcyB0aGUgbGluZSByaXBwbGUuXG4gICAqL1xuICBhY3RpdmF0ZUxpbmVSaXBwbGUoKSB7fVxuXG4gIC8qKlxuICAgKiBEZWFjdGl2YXRlcyB0aGUgbGluZSByaXBwbGUuXG4gICAqL1xuICBkZWFjdGl2YXRlTGluZVJpcHBsZSgpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRyYW5zZm9ybSBvcmlnaW4gb2YgdGhlIGxpbmUgcmlwcGxlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbm9ybWFsaXplZFhcbiAgICovXG4gIHNldExpbmVSaXBwbGVUcmFuc2Zvcm1PcmlnaW4obm9ybWFsaXplZFgpIHt9XG5cbiAgLyoqXG4gICAqIE9ubHkgaW1wbGVtZW50IGlmIGxhYmVsIGV4aXN0cy5cbiAgICogU2hha2VzIGxhYmVsIGlmIHNob3VsZFNoYWtlIGlzIHRydWUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkU2hha2VcbiAgICovXG4gIHNoYWtlTGFiZWwoc2hvdWxkU2hha2UpIHt9XG5cbiAgLyoqXG4gICAqIE9ubHkgaW1wbGVtZW50IGlmIGxhYmVsIGV4aXN0cy5cbiAgICogRmxvYXRzIHRoZSBsYWJlbCBhYm92ZSB0aGUgaW5wdXQgZWxlbWVudCBpZiBzaG91bGRGbG9hdCBpcyB0cnVlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNob3VsZEZsb2F0XG4gICAqL1xuICBmbG9hdExhYmVsKHNob3VsZEZsb2F0KSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgbGFiZWwgZWxlbWVudCBleGlzdHMsIGZhbHNlIGlmIGl0IGRvZXNuJ3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNMYWJlbCgpIHt9XG5cbiAgLyoqXG4gICAqIE9ubHkgaW1wbGVtZW50IGlmIGxhYmVsIGV4aXN0cy5cbiAgICogUmV0dXJucyB3aWR0aCBvZiBsYWJlbCBpbiBwaXhlbHMuXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldExhYmVsV2lkdGgoKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgb3V0bGluZSBlbGVtZW50IGV4aXN0cywgZmFsc2UgaWYgaXQgZG9lc24ndC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc091dGxpbmUoKSB7fVxuXG4gIC8qKlxuICAgKiBPbmx5IGltcGxlbWVudCBpZiBvdXRsaW5lIGVsZW1lbnQgZXhpc3RzLlxuICAgKiBVcGRhdGVzIFNWRyBQYXRoIGFuZCBvdXRsaW5lIGVsZW1lbnQgYmFzZWQgb24gdGhlXG4gICAqIGxhYmVsIGVsZW1lbnQgd2lkdGggYW5kIFJUTCBjb250ZXh0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGFiZWxXaWR0aFxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBpc1J0bFxuICAgKi9cbiAgbm90Y2hPdXRsaW5lKGxhYmVsV2lkdGgsIGlzUnRsKSB7fVxuXG4gIC8qKlxuICAgKiBPbmx5IGltcGxlbWVudCBpZiBvdXRsaW5lIGVsZW1lbnQgZXhpc3RzLlxuICAgKiBDbG9zZXMgbm90Y2ggaW4gb3V0bGluZSBlbGVtZW50LlxuICAgKi9cbiAgY2xvc2VPdXRsaW5lKCkge31cbn1cblxuZXhwb3J0IHtNRENUZXh0RmllbGRBZGFwdGVyLCBOYXRpdmVJbnB1dFR5cGUsIEZvdW5kYXRpb25NYXBUeXBlfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIEFSSUFfQ09OVFJPTFM6ICdhcmlhLWNvbnRyb2xzJyxcbiAgSU5QVVRfU0VMRUNUT1I6ICcubWRjLXRleHQtZmllbGRfX2lucHV0JyxcbiAgTEFCRUxfU0VMRUNUT1I6ICcubWRjLWZsb2F0aW5nLWxhYmVsJyxcbiAgSUNPTl9TRUxFQ1RPUjogJy5tZGMtdGV4dC1maWVsZF9faWNvbicsXG4gIE9VVExJTkVfU0VMRUNUT1I6ICcubWRjLW5vdGNoZWQtb3V0bGluZScsXG4gIExJTkVfUklQUExFX1NFTEVDVE9SOiAnLm1kYy1saW5lLXJpcHBsZScsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFJPT1Q6ICdtZGMtdGV4dC1maWVsZCcsXG4gIFVQR1JBREVEOiAnbWRjLXRleHQtZmllbGQtLXVwZ3JhZGVkJyxcbiAgRElTQUJMRUQ6ICdtZGMtdGV4dC1maWVsZC0tZGlzYWJsZWQnLFxuICBERU5TRTogJ21kYy10ZXh0LWZpZWxkLS1kZW5zZScsXG4gIEZPQ1VTRUQ6ICdtZGMtdGV4dC1maWVsZC0tZm9jdXNlZCcsXG4gIElOVkFMSUQ6ICdtZGMtdGV4dC1maWVsZC0taW52YWxpZCcsXG4gIEJPWDogJ21kYy10ZXh0LWZpZWxkLS1ib3gnLFxuICBPVVRMSU5FRDogJ21kYy10ZXh0LWZpZWxkLS1vdXRsaW5lZCcsXG59O1xuXG4vKiogQGVudW0ge251bWJlcn0gKi9cbmNvbnN0IG51bWJlcnMgPSB7XG4gIExBQkVMX1NDQUxFOiAwLjc1LFxuICBERU5TRV9MQUJFTF9TQ0FMRTogMC45MjMsXG59O1xuXG4vLyB3aGl0ZWxpc3QgYmFzZWQgb2ZmIG9mIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0d1aWRlL0hUTUwvSFRNTDUvQ29uc3RyYWludF92YWxpZGF0aW9uXG4vLyB1bmRlciBzZWN0aW9uOiBgVmFsaWRhdGlvbi1yZWxhdGVkIGF0dHJpYnV0ZXNgXG5jb25zdCBWQUxJREFUSU9OX0FUVFJfV0hJVEVMSVNUID0gW1xuICAncGF0dGVybicsICdtaW4nLCAnbWF4JywgJ3JlcXVpcmVkJywgJ3N0ZXAnLCAnbWlubGVuZ3RoJywgJ21heGxlbmd0aCcsXG5dO1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnMsIFZBTElEQVRJT05fQVRUUl9XSElURUxJU1R9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbiBmcm9tICcuL2hlbHBlci10ZXh0L2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9uIGZyb20gJy4vaWNvbi9mb3VuZGF0aW9uJztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7TURDVGV4dEZpZWxkQWRhcHRlciwgTmF0aXZlSW5wdXRUeXBlLCBGb3VuZGF0aW9uTWFwVHlwZX0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVycywgVkFMSURBVElPTl9BVFRSX1dISVRFTElTVH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1RleHRGaWVsZEFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGdldCBzaG91bGRTaGFrZSgpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNWYWxpZCgpICYmICF0aGlzLmlzRm9jdXNlZF87XG4gIH1cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgZ2V0IHNob3VsZEZsb2F0KCkge1xuICAgIHJldHVybiB0aGlzLmlzRm9jdXNlZF8gfHwgISF0aGlzLmdldFZhbHVlKCkgfHwgdGhpcy5pc0JhZElucHV0XygpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ1RleHRGaWVsZEFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDVGV4dEZpZWxkQWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ1RleHRGaWVsZEFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKCkgPT4ge30sXG4gICAgICBoYXNDbGFzczogKCkgPT4ge30sXG4gICAgICByZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGdldE5hdGl2ZUlucHV0OiAoKSA9PiB7fSxcbiAgICAgIGlzRm9jdXNlZDogKCkgPT4ge30sXG4gICAgICBpc1J0bDogKCkgPT4ge30sXG4gICAgICBhY3RpdmF0ZUxpbmVSaXBwbGU6ICgpID0+IHt9LFxuICAgICAgZGVhY3RpdmF0ZUxpbmVSaXBwbGU6ICgpID0+IHt9LFxuICAgICAgc2V0TGluZVJpcHBsZVRyYW5zZm9ybU9yaWdpbjogKCkgPT4ge30sXG4gICAgICBzaGFrZUxhYmVsOiAoKSA9PiB7fSxcbiAgICAgIGZsb2F0TGFiZWw6ICgpID0+IHt9LFxuICAgICAgaGFzTGFiZWw6ICgpID0+IHt9LFxuICAgICAgZ2V0TGFiZWxXaWR0aDogKCkgPT4ge30sXG4gICAgICBoYXNPdXRsaW5lOiAoKSA9PiB7fSxcbiAgICAgIG5vdGNoT3V0bGluZTogKCkgPT4ge30sXG4gICAgICBjbG9zZU91dGxpbmU6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ1RleHRGaWVsZEFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICogQHBhcmFtIHshRm91bmRhdGlvbk1hcFR5cGU9fSBmb3VuZGF0aW9uTWFwIE1hcCBmcm9tIHN1YmNvbXBvbmVudCBuYW1lcyB0byB0aGVpciBzdWJmb3VuZGF0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIsIGZvdW5kYXRpb25NYXAgPSAvKiogQHR5cGUgeyFGb3VuZGF0aW9uTWFwVHlwZX0gKi8gKHt9KSkge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDVGV4dEZpZWxkRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEB0eXBlIHshTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb258dW5kZWZpbmVkfSAqL1xuICAgIHRoaXMuaGVscGVyVGV4dF8gPSBmb3VuZGF0aW9uTWFwLmhlbHBlclRleHQ7XG4gICAgLyoqIEB0eXBlIHshTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb258dW5kZWZpbmVkfSAqL1xuICAgIHRoaXMuaWNvbl8gPSBmb3VuZGF0aW9uTWFwLmljb247XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5pc0ZvY3VzZWRfID0gZmFsc2U7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMucmVjZWl2ZWRVc2VySW5wdXRfID0gZmFsc2U7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMudXNlQ3VzdG9tVmFsaWRpdHlDaGVja2luZ18gPSBmYWxzZTtcbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5pc1ZhbGlkXyA9IHRydWU7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbigpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy5pbnB1dEZvY3VzSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmFjdGl2YXRlRm9jdXMoKTtcbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLmlucHV0Qmx1ckhhbmRsZXJfID0gKCkgPT4gdGhpcy5kZWFjdGl2YXRlRm9jdXMoKTtcbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLmlucHV0SW5wdXRIYW5kbGVyXyA9ICgpID0+IHRoaXMuYXV0b0NvbXBsZXRlRm9jdXMoKTtcbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLnNldFBvaW50ZXJYT2Zmc2V0XyA9IChldnQpID0+IHRoaXMuc2V0VHJhbnNmb3JtT3JpZ2luKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy50ZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVUZXh0RmllbGRJbnRlcmFjdGlvbigpO1xuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUFycmF5KTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMudmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXJfID0gKGF0dHJpYnV0ZXNMaXN0KSA9PiB0aGlzLmhhbmRsZVZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2UoYXR0cmlidXRlc0xpc3QpO1xuXG4gICAgLyoqIEBwcml2YXRlIHshTXV0YXRpb25PYnNlcnZlcn0gKi9cbiAgICB0aGlzLnZhbGlkYXRpb25PYnNlcnZlcl87XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDVGV4dEZpZWxkRm91bmRhdGlvbi5jc3NDbGFzc2VzLlVQR1JBREVEKTtcbiAgICAvLyBFbnN1cmUgbGFiZWwgZG9lcyBub3QgY29sbGlkZSB3aXRoIGFueSBwcmUtZmlsbGVkIHZhbHVlLlxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmhhc0xhYmVsKCkgJiYgKHRoaXMuZ2V0VmFsdWUoKSB8fCB0aGlzLmlzQmFkSW5wdXRfKCkpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmZsb2F0TGFiZWwodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgICB0aGlzLm5vdGNoT3V0bGluZSh0aGlzLnNob3VsZEZsb2F0KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc0ZvY3VzZWQoKSkge1xuICAgICAgdGhpcy5pbnB1dEZvY3VzSGFuZGxlcl8oKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5pbnB1dEZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuaW5wdXRCbHVySGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcignaW5wdXQnLCB0aGlzLmlucHV0SW5wdXRIYW5kbGVyXyk7XG4gICAgWydtb3VzZWRvd24nLCAndG91Y2hzdGFydCddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCB0aGlzLnNldFBvaW50ZXJYT2Zmc2V0Xyk7XG4gICAgfSk7XG4gICAgWydjbGljaycsICdrZXlkb3duJ10uZm9yRWFjaCgoZXZ0VHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCB0aGlzLnRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMudmFsaWRhdGlvbk9ic2VydmVyXyA9XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcih0aGlzLnZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDVGV4dEZpZWxkRm91bmRhdGlvbi5jc3NDbGFzc2VzLlVQR1JBREVEKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmlucHV0Rm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmlucHV0Qmx1ckhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcignaW5wdXQnLCB0aGlzLmlucHV0SW5wdXRIYW5kbGVyXyk7XG4gICAgWydtb3VzZWRvd24nLCAndG91Y2hzdGFydCddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIHRoaXMuc2V0UG9pbnRlclhPZmZzZXRfKTtcbiAgICB9KTtcbiAgICBbJ2NsaWNrJywgJ2tleWRvd24nXS5mb3JFYWNoKChldnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgdGhpcy50ZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcih0aGlzLnZhbGlkYXRpb25PYnNlcnZlcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdXNlciBpbnRlcmFjdGlvbnMgd2l0aCB0aGUgVGV4dCBGaWVsZC5cbiAgICovXG4gIGhhbmRsZVRleHRGaWVsZEludGVyYWN0aW9uKCkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmdldE5hdGl2ZUlucHV0KCkuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZWNlaXZlZFVzZXJJbnB1dF8gPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdmFsaWRhdGlvbiBhdHRyaWJ1dGUgY2hhbmdlc1xuICAgKiBAcGFyYW0geyFBcnJheTxzdHJpbmc+fSBhdHRyaWJ1dGVzTGlzdFxuICAgKi9cbiAgaGFuZGxlVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZShhdHRyaWJ1dGVzTGlzdCkge1xuICAgIGF0dHJpYnV0ZXNMaXN0LnNvbWUoKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgIGlmIChWQUxJREFUSU9OX0FUVFJfV0hJVEVMSVNULmluZGV4T2YoYXR0cmlidXRlTmFtZSkgPiAtMSkge1xuICAgICAgICB0aGlzLnN0eWxlVmFsaWRpdHlfKHRydWUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucy9jbG9zZXMgdGhlIG5vdGNoZWQgb3V0bGluZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcGVuTm90Y2hcbiAgICovXG4gIG5vdGNoT3V0bGluZShvcGVuTm90Y2gpIHtcbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaGFzT3V0bGluZSgpIHx8ICF0aGlzLmFkYXB0ZXJfLmhhc0xhYmVsKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAob3Blbk5vdGNoKSB7XG4gICAgICBjb25zdCBpc0RlbnNlID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLkRFTlNFKTtcbiAgICAgIGNvbnN0IGxhYmVsU2NhbGUgPSBpc0RlbnNlID8gbnVtYmVycy5ERU5TRV9MQUJFTF9TQ0FMRSA6IG51bWJlcnMuTEFCRUxfU0NBTEU7XG4gICAgICBjb25zdCBsYWJlbFdpZHRoID0gdGhpcy5hZGFwdGVyXy5nZXRMYWJlbFdpZHRoKCkgKiBsYWJlbFNjYWxlO1xuICAgICAgY29uc3QgaXNSdGwgPSB0aGlzLmFkYXB0ZXJfLmlzUnRsKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLm5vdGNoT3V0bGluZShsYWJlbFdpZHRoLCBpc1J0bCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uY2xvc2VPdXRsaW5lKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlcyB0aGUgdGV4dCBmaWVsZCBmb2N1cyBzdGF0ZS5cbiAgICovXG4gIGFjdGl2YXRlRm9jdXMoKSB7XG4gICAgdGhpcy5pc0ZvY3VzZWRfID0gdHJ1ZTtcbiAgICB0aGlzLnN0eWxlRm9jdXNlZF8odGhpcy5pc0ZvY3VzZWRfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFjdGl2YXRlTGluZVJpcHBsZSgpO1xuICAgIHRoaXMubm90Y2hPdXRsaW5lKHRoaXMuc2hvdWxkRmxvYXQpO1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmhhc0xhYmVsKCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2hha2VMYWJlbCh0aGlzLnNob3VsZFNoYWtlKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZmxvYXRMYWJlbCh0aGlzLnNob3VsZEZsb2F0KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaGVscGVyVGV4dF8pIHtcbiAgICAgIHRoaXMuaGVscGVyVGV4dF8uc2hvd1RvU2NyZWVuUmVhZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxpbmUgcmlwcGxlJ3MgdHJhbnNmb3JtIG9yaWdpbiwgc28gdGhhdCB0aGUgbGluZSByaXBwbGUgYWN0aXZhdGVcbiAgICogYW5pbWF0aW9uIHdpbGwgYW5pbWF0ZSBvdXQgZnJvbSB0aGUgdXNlcidzIGNsaWNrIGxvY2F0aW9uLlxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqL1xuICBzZXRUcmFuc2Zvcm1PcmlnaW4oZXZ0KSB7XG4gICAgY29uc3QgdGFyZ2V0Q2xpZW50UmVjdCA9IGV2dC50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgZXZ0Q29vcmRzID0ge3g6IGV2dC5jbGllbnRYLCB5OiBldnQuY2xpZW50WX07XG4gICAgY29uc3Qgbm9ybWFsaXplZFggPSBldnRDb29yZHMueCAtIHRhcmdldENsaWVudFJlY3QubGVmdDtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldExpbmVSaXBwbGVUcmFuc2Zvcm1PcmlnaW4obm9ybWFsaXplZFgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlcyB0aGUgVGV4dCBGaWVsZCdzIGZvY3VzIHN0YXRlIGluIGNhc2VzIHdoZW4gdGhlIGlucHV0IHZhbHVlXG4gICAqIGNoYW5nZXMgd2l0aG91dCB1c2VyIGlucHV0IChlLmcuIHByb2dyYW1hdGljYWxseSkuXG4gICAqL1xuICBhdXRvQ29tcGxldGVGb2N1cygpIHtcbiAgICBpZiAoIXRoaXMucmVjZWl2ZWRVc2VySW5wdXRfKSB7XG4gICAgICB0aGlzLmFjdGl2YXRlRm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVhY3RpdmF0ZXMgdGhlIFRleHQgRmllbGQncyBmb2N1cyBzdGF0ZS5cbiAgICovXG4gIGRlYWN0aXZhdGVGb2N1cygpIHtcbiAgICB0aGlzLmlzRm9jdXNlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlYWN0aXZhdGVMaW5lUmlwcGxlKCk7XG4gICAgY29uc3QgaW5wdXQgPSB0aGlzLmdldE5hdGl2ZUlucHV0XygpO1xuICAgIGNvbnN0IHNob3VsZFJlbW92ZUxhYmVsRmxvYXQgPSAhaW5wdXQudmFsdWUgJiYgIXRoaXMuaXNCYWRJbnB1dF8oKTtcbiAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy5pc1ZhbGlkKCk7XG4gICAgdGhpcy5zdHlsZVZhbGlkaXR5Xyhpc1ZhbGlkKTtcbiAgICB0aGlzLnN0eWxlRm9jdXNlZF8odGhpcy5pc0ZvY3VzZWRfKTtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5oYXNMYWJlbCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNoYWtlTGFiZWwodGhpcy5zaG91bGRTaGFrZSk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmZsb2F0TGFiZWwodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgICB0aGlzLm5vdGNoT3V0bGluZSh0aGlzLnNob3VsZEZsb2F0KTtcbiAgICB9XG4gICAgaWYgKHNob3VsZFJlbW92ZUxhYmVsRmxvYXQpIHtcbiAgICAgIHRoaXMucmVjZWl2ZWRVc2VySW5wdXRfID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHZhbHVlIG9mIHRoZSBpbnB1dCBFbGVtZW50LlxuICAgKi9cbiAgZ2V0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlSW5wdXRfKCkudmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQgb24gdGhlIGlucHV0IEVsZW1lbnQuXG4gICAqL1xuICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuZ2V0TmF0aXZlSW5wdXRfKCkudmFsdWUgPSB2YWx1ZTtcbiAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy5pc1ZhbGlkKCk7XG4gICAgdGhpcy5zdHlsZVZhbGlkaXR5Xyhpc1ZhbGlkKTtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5oYXNMYWJlbCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNoYWtlTGFiZWwodGhpcy5zaG91bGRTaGFrZSk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmZsb2F0TGFiZWwodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgICB0aGlzLm5vdGNoT3V0bGluZSh0aGlzLnNob3VsZEZsb2F0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gSWYgYSBjdXN0b20gdmFsaWRpdHkgaXMgc2V0LCByZXR1cm5zIHRoYXQgdmFsdWUuXG4gICAqICAgICBPdGhlcndpc2UsIHJldHVybnMgdGhlIHJlc3VsdCBvZiBuYXRpdmUgdmFsaWRpdHkgY2hlY2tzLlxuICAgKi9cbiAgaXNWYWxpZCgpIHtcbiAgICByZXR1cm4gdGhpcy51c2VDdXN0b21WYWxpZGl0eUNoZWNraW5nX1xuICAgICAgPyB0aGlzLmlzVmFsaWRfIDogdGhpcy5pc05hdGl2ZUlucHV0VmFsaWRfKCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFufSBpc1ZhbGlkIFNldHMgdGhlIHZhbGlkaXR5IHN0YXRlIG9mIHRoZSBUZXh0IEZpZWxkLlxuICAgKi9cbiAgc2V0VmFsaWQoaXNWYWxpZCkge1xuICAgIHRoaXMudXNlQ3VzdG9tVmFsaWRpdHlDaGVja2luZ18gPSB0cnVlO1xuICAgIHRoaXMuaXNWYWxpZF8gPSBpc1ZhbGlkO1xuICAgIC8vIFJldHJpZXZlIGZyb20gdGhlIGdldHRlciB0byBlbnN1cmUgY29ycmVjdCBsb2dpYyBpcyBhcHBsaWVkLlxuICAgIGlzVmFsaWQgPSB0aGlzLmlzVmFsaWQoKTtcbiAgICB0aGlzLnN0eWxlVmFsaWRpdHlfKGlzVmFsaWQpO1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmhhc0xhYmVsKCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2hha2VMYWJlbCh0aGlzLnNob3VsZFNoYWtlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgVGV4dCBGaWVsZCBpcyBkaXNhYmxlZC5cbiAgICovXG4gIGlzRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlSW5wdXRfKCkuZGlzYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlZCBTZXRzIHRoZSB0ZXh0LWZpZWxkIGRpc2FibGVkIG9yIGVuYWJsZWQuXG4gICAqL1xuICBzZXREaXNhYmxlZChkaXNhYmxlZCkge1xuICAgIHRoaXMuZ2V0TmF0aXZlSW5wdXRfKCkuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICB0aGlzLnN0eWxlRGlzYWJsZWRfKGRpc2FibGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCBTZXRzIHRoZSBjb250ZW50IG9mIHRoZSBoZWxwZXIgdGV4dC5cbiAgICovXG4gIHNldEhlbHBlclRleHRDb250ZW50KGNvbnRlbnQpIHtcbiAgICBpZiAodGhpcy5oZWxwZXJUZXh0Xykge1xuICAgICAgdGhpcy5oZWxwZXJUZXh0Xy5zZXRDb250ZW50KGNvbnRlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBhcmlhIGxhYmVsIG9mIHRoZSBpY29uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxcbiAgICovXG4gIHNldEljb25BcmlhTGFiZWwobGFiZWwpIHtcbiAgICBpZiAodGhpcy5pY29uXykge1xuICAgICAgdGhpcy5pY29uXy5zZXRBcmlhTGFiZWwobGFiZWwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0ZXh0IGNvbnRlbnQgb2YgdGhlIGljb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG4gICAqL1xuICBzZXRJY29uQ29udGVudChjb250ZW50KSB7XG4gICAgaWYgKHRoaXMuaWNvbl8pIHtcbiAgICAgIHRoaXMuaWNvbl8uc2V0Q29udGVudChjb250ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgVGV4dCBGaWVsZCBpbnB1dCBmYWlscyBpbiBjb252ZXJ0aW5nIHRoZVxuICAgKiAgICAgdXNlci1zdXBwbGllZCB2YWx1ZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzQmFkSW5wdXRfKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnZhbGlkaXR5LmJhZElucHV0O1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRoZSByZXN1bHQgb2YgbmF0aXZlIHZhbGlkaXR5IGNoZWNraW5nXG4gICAqICAgICAoVmFsaWRpdHlTdGF0ZS52YWxpZCkuXG4gICAqL1xuICBpc05hdGl2ZUlucHV0VmFsaWRfKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnZhbGlkaXR5LnZhbGlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0eWxlcyB0aGUgY29tcG9uZW50IGJhc2VkIG9uIHRoZSB2YWxpZGl0eSBzdGF0ZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBpc1ZhbGlkXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdHlsZVZhbGlkaXR5Xyhpc1ZhbGlkKSB7XG4gICAgY29uc3Qge0lOVkFMSUR9ID0gTURDVGV4dEZpZWxkRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKElOVkFMSUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKElOVkFMSUQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5oZWxwZXJUZXh0Xykge1xuICAgICAgdGhpcy5oZWxwZXJUZXh0Xy5zZXRWYWxpZGl0eShpc1ZhbGlkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3R5bGVzIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIGZvY3VzZWQgc3RhdGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNGb2N1c2VkXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdHlsZUZvY3VzZWRfKGlzRm9jdXNlZCkge1xuICAgIGNvbnN0IHtGT0NVU0VEfSA9IE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAoaXNGb2N1c2VkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZPQ1VTRUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZPQ1VTRUQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdHlsZXMgdGhlIGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgZGlzYWJsZWQgc3RhdGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNEaXNhYmxlZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3R5bGVEaXNhYmxlZF8oaXNEaXNhYmxlZCkge1xuICAgIGNvbnN0IHtESVNBQkxFRCwgSU5WQUxJRH0gPSBNRENUZXh0RmllbGRGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKGlzRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRElTQUJMRUQpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhJTlZBTElEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhESVNBQkxFRCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmljb25fKSB7XG4gICAgICB0aGlzLmljb25fLnNldERpc2FibGVkKGlzRGlzYWJsZWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshRWxlbWVudHwhTmF0aXZlSW5wdXRUeXBlfSBUaGUgbmF0aXZlIHRleHQgaW5wdXQgZnJvbSB0aGVcbiAgICogaG9zdCBlbnZpcm9ubWVudCwgb3IgYSBkdW1teSBpZiBub25lIGV4aXN0cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldE5hdGl2ZUlucHV0XygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5nZXROYXRpdmVJbnB1dCgpIHx8XG4gICAgLyoqIEB0eXBlIHshTmF0aXZlSW5wdXRUeXBlfSAqLyAoe1xuICAgICAgdmFsdWU6ICcnLFxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgdmFsaWRpdHk6IHtcbiAgICAgICAgYmFkSW5wdXQ6IGZhbHNlLFxuICAgICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDVGV4dEZpZWxkRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgVGV4dEZpZWxkIExpbmUgUmlwcGxlLlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIGxpbmUgcmlwcGxlIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENMaW5lUmlwcGxlQWRhcHRlciB7XG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdG8gdGhlIGxpbmUgcmlwcGxlIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIGxpbmUgcmlwcGxlIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzdHlsZSBwcm9wZXJ0eSB3aXRoIHByb3BlcnR5TmFtZSB0byB2YWx1ZSBvbiB0aGUgcm9vdCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0U3R5bGUocHJvcGVydHlOYW1lLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJFdmVudEhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIGxpbmUgcmlwcGxlIGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0xpbmVSaXBwbGVBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgTElORV9SSVBQTEVfQUNUSVZFOiAnbWRjLWxpbmUtcmlwcGxlLS1hY3RpdmUnLFxuICBMSU5FX1JJUFBMRV9ERUFDVElWQVRJTkc6ICdtZGMtbGluZS1yaXBwbGUtLWRlYWN0aXZhdGluZycsXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0xpbmVSaXBwbGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENMaW5lUmlwcGxlQWRhcHRlcj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDTGluZVJpcHBsZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKipcbiAgICoge0BzZWUgTURDTGluZVJpcHBsZUFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDTGluZVJpcHBsZUFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENMaW5lUmlwcGxlQWRhcHRlcn0gKi8gKHtcbiAgICAgIGFkZENsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoKSA9PiB7fSxcbiAgICAgIGhhc0NsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHNldFN0eWxlOiAoKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJFdmVudEhhbmRsZXI6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ0xpbmVSaXBwbGVBZGFwdGVyPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IC8qKiBAdHlwZSB7IU1EQ0xpbmVSaXBwbGVBZGFwdGVyfSAqLyAoe30pKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENMaW5lUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZVRyYW5zaXRpb25FbmQoZXZ0KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckV2ZW50SGFuZGxlcigndHJhbnNpdGlvbmVuZCcsIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRXZlbnRIYW5kbGVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlcyB0aGUgbGluZSByaXBwbGVcbiAgICovXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9ERUFDVElWQVRJTkcpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9BQ1RJVkUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGNlbnRlciBvZiB0aGUgcmlwcGxlIGFuaW1hdGlvbiB0byB0aGUgZ2l2ZW4gWCBjb29yZGluYXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0geENvb3JkaW5hdGVcbiAgICovXG4gIHNldFJpcHBsZUNlbnRlcih4Q29vcmRpbmF0ZSkge1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0U3R5bGUoJ3RyYW5zZm9ybS1vcmlnaW4nLCBgJHt4Q29vcmRpbmF0ZX1weCBjZW50ZXJgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWFjdGl2YXRlcyB0aGUgbGluZSByaXBwbGVcbiAgICovXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLkxJTkVfUklQUExFX0RFQUNUSVZBVElORyk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIHRyYW5zaXRpb24gZW5kIGV2ZW50XG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICovXG4gIGhhbmRsZVRyYW5zaXRpb25FbmQoZXZ0KSB7XG4gICAgLy8gV2FpdCBmb3IgdGhlIGxpbmUgcmlwcGxlIHRvIGJlIGVpdGhlciB0cmFuc3BhcmVudCBvciBvcGFxdWVcbiAgICAvLyBiZWZvcmUgZW1pdHRpbmcgdGhlIGFuaW1hdGlvbiBlbmQgZXZlbnRcbiAgICBjb25zdCBpc0RlYWN0aXZhdGluZyA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9ERUFDVElWQVRJTkcpO1xuXG4gICAgaWYgKGV2dC5wcm9wZXJ0eU5hbWUgPT09ICdvcGFjaXR5Jykge1xuICAgICAgaWYgKGlzRGVhY3RpdmF0aW5nKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9BQ1RJVkUpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDTGluZVJpcHBsZUZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIEZsb2F0aW5nIExhYmVsLlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIGZsb2F0aW5nIGxhYmVsIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENGbG9hdGluZ0xhYmVsQWRhcHRlciB7XG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdG8gdGhlIGxhYmVsIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIGxhYmVsIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIGxhYmVsIGVsZW1lbnQuXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldFdpZHRoKCkge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSByb290IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGbG9hdGluZ0xhYmVsQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIExBQkVMX0ZMT0FUX0FCT1ZFOiAnbWRjLWZsb2F0aW5nLWxhYmVsLS1mbG9hdC1hYm92ZScsXG4gIExBQkVMX1NIQUtFOiAnbWRjLWZsb2F0aW5nLWxhYmVsLS1zaGFrZScsXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKCkgPT4ge30sXG4gICAgICBnZXRXaWR0aDogKCkgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENGbG9hdGluZ0xhYmVsQWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMuc2hha2VBbmltYXRpb25FbmRIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlU2hha2VBbmltYXRpb25FbmRfKCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2FuaW1hdGlvbmVuZCcsIHRoaXMuc2hha2VBbmltYXRpb25FbmRIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYW5pbWF0aW9uZW5kJywgdGhpcy5zaGFrZUFuaW1hdGlvbkVuZEhhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3aWR0aCBvZiB0aGUgbGFiZWwgZWxlbWVudC5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0V2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uZ2V0V2lkdGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHlsZXMgdGhlIGxhYmVsIHRvIHByb2R1Y2UgdGhlIGxhYmVsIHNoYWtlIGZvciBlcnJvcnMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkU2hha2UgYWRkcyBzaGFrZSBjbGFzcyBpZiB0cnVlLFxuICAgKiBvdGhlcndpc2UgcmVtb3ZlcyBzaGFrZSBjbGFzcy5cbiAgICovXG4gIHNoYWtlKHNob3VsZFNoYWtlKSB7XG4gICAgY29uc3Qge0xBQkVMX1NIQUtFfSA9IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHNob3VsZFNoYWtlKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKExBQkVMX1NIQUtFKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhMQUJFTF9TSEFLRSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0eWxlcyB0aGUgbGFiZWwgdG8gZmxvYXQgb3IgZG9jay5cbiAgICogQHBhcmFtIHtib29sZWFufSBzaG91bGRGbG9hdCBhZGRzIGZsb2F0IGNsYXNzIGlmIHRydWUsIG90aGVyd2lzZSByZW1vdmVcbiAgICogZmxvYXQgYW5kIHNoYWtlIGNsYXNzIHRvIGRvY2sgbGFiZWwuXG4gICAqL1xuICBmbG9hdChzaG91bGRGbG9hdCkge1xuICAgIGNvbnN0IHtMQUJFTF9GTE9BVF9BQk9WRSwgTEFCRUxfU0hBS0V9ID0gTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAoc2hvdWxkRmxvYXQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTEFCRUxfRkxPQVRfQUJPVkUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKExBQkVMX0ZMT0FUX0FCT1ZFKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTEFCRUxfU0hBS0UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFuIGludGVyYWN0aW9uIGV2ZW50IG9uIHRoZSByb290IGVsZW1lbnQuXG4gICAqL1xuICBoYW5kbGVTaGFrZUFuaW1hdGlvbkVuZF8oKSB7XG4gICAgY29uc3Qge0xBQkVMX1NIQUtFfSA9IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhMQUJFTF9TSEFLRSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIE5vdGNoZWQgT3V0bGluZS5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBOb3RjaGVkIE91dGxpbmUgaW50byB5b3VyIGZyYW1ld29yay4gU2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2F1dGhvcmluZy1jb21wb25lbnRzLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlciB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3aWR0aCBvZiB0aGUgcm9vdCBlbGVtZW50LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRXaWR0aCgpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGhlaWdodCBvZiB0aGUgcm9vdCBlbGVtZW50LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRIZWlnaHQoKSB7fVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdG8gdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2xhc3MgZnJvbSB0aGUgcm9vdCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIFwiZFwiIGF0dHJpYnV0ZSBvZiB0aGUgb3V0bGluZSBlbGVtZW50J3MgU1ZHIHBhdGguXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0T3V0bGluZVBhdGhBdHRyKHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpZGxlIG91dGxpbmUgZWxlbWVudCdzIGNvbXB1dGVkIHN0eWxlIHZhbHVlIG9mIHRoZSBnaXZlbiBjc3MgcHJvcGVydHkgYHByb3BlcnR5TmFtZWAuXG4gICAqIFdlIGFjaGlldmUgdGhpcyB2aWEgYGdldENvbXB1dGVkU3R5bGUoLi4uKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5TmFtZSlgLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZShwcm9wZXJ0eU5hbWUpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFBBVEhfU0VMRUNUT1I6ICcubWRjLW5vdGNoZWQtb3V0bGluZV9fcGF0aCcsXG4gIElETEVfT1VUTElORV9TRUxFQ1RPUjogJy5tZGMtbm90Y2hlZC1vdXRsaW5lX19pZGxlJyxcbn07XG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgT1VUTElORV9OT1RDSEVEOiAnbWRjLW5vdGNoZWQtb3V0bGluZS0tbm90Y2hlZCcsXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3N9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlcj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKipcbiAgICoge0BzZWUgTURDTm90Y2hlZE91dGxpbmVBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlcn0gKi8gKHtcbiAgICAgIGdldFdpZHRoOiAoKSA9PiB7fSxcbiAgICAgIGdldEhlaWdodDogKCkgPT4ge30sXG4gICAgICBhZGRDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKCkgPT4ge30sXG4gICAgICBzZXRPdXRsaW5lUGF0aEF0dHI6ICgpID0+IHt9LFxuICAgICAgZ2V0SWRsZU91dGxpbmVTdHlsZVZhbHVlOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIG91dGxpbmUgbm90Y2hlZCBzZWxlY3RvciBhbmQgdXBkYXRlcyB0aGUgbm90Y2ggd2lkdGhcbiAgICogY2FsY3VsYXRlZCBiYXNlZCBvZmYgb2Ygbm90Y2hXaWR0aCBhbmQgaXNSdGwuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RjaFdpZHRoXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IGlzUnRsXG4gICAqL1xuICBub3RjaChub3RjaFdpZHRoLCBpc1J0bCA9IGZhbHNlKSB7XG4gICAgY29uc3Qge09VVExJTkVfTk9UQ0hFRH0gPSBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE9VVExJTkVfTk9UQ0hFRCk7XG4gICAgdGhpcy51cGRhdGVTdmdQYXRoXyhub3RjaFdpZHRoLCBpc1J0bCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBub3RjaGVkIG91dGxpbmUgc2VsZWN0b3IgdG8gY2xvc2UgdGhlIG5vdGNoIGluIHRoZSBvdXRsaW5lLlxuICAgKi9cbiAgY2xvc2VOb3RjaCgpIHtcbiAgICBjb25zdCB7T1VUTElORV9OT1RDSEVEfSA9IE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoT1VUTElORV9OT1RDSEVEKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBTVkcgcGF0aCBvZiB0aGUgZm9jdXMgb3V0bGluZSBlbGVtZW50IGJhc2VkIG9uIHRoZSBub3RjaFdpZHRoXG4gICAqIGFuZCB0aGUgUlRMIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RjaFdpZHRoXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IGlzUnRsXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB1cGRhdGVTdmdQYXRoXyhub3RjaFdpZHRoLCBpc1J0bCkge1xuICAgIC8vIEZhbGwgYmFjayB0byByZWFkaW5nIGEgc3BlY2lmaWMgY29ybmVyJ3Mgc3R5bGUgYmVjYXVzZSBGaXJlZm94IGRvZXNuJ3QgcmVwb3J0IHRoZSBzdHlsZSBvbiBib3JkZXItcmFkaXVzLlxuICAgIGNvbnN0IHJhZGl1c1N0eWxlVmFsdWUgPSB0aGlzLmFkYXB0ZXJfLmdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZSgnYm9yZGVyLXJhZGl1cycpIHx8XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0SWRsZU91dGxpbmVTdHlsZVZhbHVlKCdib3JkZXItdG9wLWxlZnQtcmFkaXVzJyk7XG4gICAgY29uc3QgcmFkaXVzID0gcGFyc2VGbG9hdChyYWRpdXNTdHlsZVZhbHVlKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuYWRhcHRlcl8uZ2V0V2lkdGgoKTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmFkYXB0ZXJfLmdldEhlaWdodCgpO1xuICAgIGNvbnN0IGNvcm5lcldpZHRoID0gcmFkaXVzICsgMS4yO1xuICAgIGNvbnN0IGxlYWRpbmdTdHJva2VMZW5ndGggPSBNYXRoLmFicygxMSAtIGNvcm5lcldpZHRoKTtcbiAgICBjb25zdCBwYWRkZWROb3RjaFdpZHRoID0gbm90Y2hXaWR0aCArIDg7XG5cbiAgICAvLyBUaGUgcmlnaHQsIGJvdHRvbSwgYW5kIGxlZnQgc2lkZXMgb2YgdGhlIG91dGxpbmUgZm9sbG93IHRoZSBzYW1lIFNWRyBwYXRoLlxuICAgIGNvbnN0IHBhdGhNaWRkbGUgPSAnYScgKyByYWRpdXMgKyAnLCcgKyByYWRpdXMgKyAnIDAgMCAxICcgKyByYWRpdXMgKyAnLCcgKyByYWRpdXNcbiAgICAgICsgJ3YnICsgKGhlaWdodCAtICgyICogY29ybmVyV2lkdGgpKVxuICAgICAgKyAnYScgKyByYWRpdXMgKyAnLCcgKyByYWRpdXMgKyAnIDAgMCAxICcgKyAtcmFkaXVzICsgJywnICsgcmFkaXVzXG4gICAgICArICdoJyArICgtd2lkdGggKyAoMiAqIGNvcm5lcldpZHRoKSlcbiAgICAgICsgJ2EnICsgcmFkaXVzICsgJywnICsgcmFkaXVzICsgJyAwIDAgMSAnICsgLXJhZGl1cyArICcsJyArIC1yYWRpdXNcbiAgICAgICsgJ3YnICsgKC1oZWlnaHQgKyAoMiAqIGNvcm5lcldpZHRoKSlcbiAgICAgICsgJ2EnICsgcmFkaXVzICsgJywnICsgcmFkaXVzICsgJyAwIDAgMSAnICsgcmFkaXVzICsgJywnICsgLXJhZGl1cztcblxuICAgIGxldCBwYXRoO1xuICAgIGlmICghaXNSdGwpIHtcbiAgICAgIHBhdGggPSAnTScgKyAoY29ybmVyV2lkdGggKyBsZWFkaW5nU3Ryb2tlTGVuZ3RoICsgcGFkZGVkTm90Y2hXaWR0aCkgKyAnLCcgKyAxXG4gICAgICAgICsgJ2gnICsgKHdpZHRoIC0gKDIgKiBjb3JuZXJXaWR0aCkgLSBwYWRkZWROb3RjaFdpZHRoIC0gbGVhZGluZ1N0cm9rZUxlbmd0aClcbiAgICAgICAgKyBwYXRoTWlkZGxlXG4gICAgICAgICsgJ2gnICsgbGVhZGluZ1N0cm9rZUxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGF0aCA9ICdNJyArICh3aWR0aCAtIGNvcm5lcldpZHRoIC0gbGVhZGluZ1N0cm9rZUxlbmd0aCkgKyAnLCcgKyAxXG4gICAgICAgICsgJ2gnICsgbGVhZGluZ1N0cm9rZUxlbmd0aFxuICAgICAgICArIHBhdGhNaWRkbGVcbiAgICAgICAgKyAnaCcgKyAod2lkdGggLSAoMiAqIGNvcm5lcldpZHRoKSAtIHBhZGRlZE5vdGNoV2lkdGggLSBsZWFkaW5nU3Ryb2tlTGVuZ3RoKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnNldE91dGxpbmVQYXRoQXR0cihwYXRoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFJpcHBsZS4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBjbGFzc2VzXG4gKiAtIGRvbVxuICogLSBDU1MgdmFyaWFibGVzXG4gKiAtIHBvc2l0aW9uXG4gKiAtIGRpbWVuc2lvbnNcbiAqIC0gc2Nyb2xsIHBvc2l0aW9uXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKiAtIHVuYm91bmRlZCwgYWN0aXZlIGFuZCBkaXNhYmxlZCBzdGF0ZXNcbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUFkYXB0ZXIge1xuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzVW5ib3VuZGVkKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlQWN0aXZlKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlRGlzYWJsZWQoKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50VGFyZ2V0fSB0YXJnZXQgKi9cbiAgY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YXJOYW1lXG4gICAqIEBwYXJhbSB7P251bWJlcnxzdHJpbmd9IHZhbHVlXG4gICAqL1xuICB1cGRhdGVDc3NWYXJpYWJsZSh2YXJOYW1lLCB2YWx1ZSkge31cblxuICAvKiogQHJldHVybiB7IUNsaWVudFJlY3R9ICovXG4gIGNvbXB1dGVCb3VuZGluZ1JlY3QoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSAqL1xuICBnZXRXaW5kb3dQYWdlT2Zmc2V0KCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICAvLyBSaXBwbGUgaXMgYSBzcGVjaWFsIGNhc2Ugd2hlcmUgdGhlIFwicm9vdFwiIGNvbXBvbmVudCBpcyByZWFsbHkgYSBcIm1peGluXCIgb2Ygc29ydHMsXG4gIC8vIGdpdmVuIHRoYXQgaXQncyBhbiAndXBncmFkZScgdG8gYW4gZXhpc3RpbmcgY29tcG9uZW50LiBUaGF0IGJlaW5nIHNhaWQgaXQgaXMgdGhlIHJvb3RcbiAgLy8gQ1NTIGNsYXNzIHRoYXQgYWxsIG90aGVyIENTUyBjbGFzc2VzIGRlcml2ZSBmcm9tLlxuICBST09UOiAnbWRjLXJpcHBsZS11cGdyYWRlZCcsXG4gIFVOQk9VTkRFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLXVuYm91bmRlZCcsXG4gIEJHX0ZPQ1VTRUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1iYWNrZ3JvdW5kLWZvY3VzZWQnLFxuICBGR19BQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1hY3RpdmF0aW9uJyxcbiAgRkdfREVBQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1kZWFjdGl2YXRpb24nLFxufTtcblxuY29uc3Qgc3RyaW5ncyA9IHtcbiAgVkFSX0xFRlQ6ICctLW1kYy1yaXBwbGUtbGVmdCcsXG4gIFZBUl9UT1A6ICctLW1kYy1yaXBwbGUtdG9wJyxcbiAgVkFSX0ZHX1NJWkU6ICctLW1kYy1yaXBwbGUtZmctc2l6ZScsXG4gIFZBUl9GR19TQ0FMRTogJy0tbWRjLXJpcHBsZS1mZy1zY2FsZScsXG4gIFZBUl9GR19UUkFOU0xBVEVfU1RBUlQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLXN0YXJ0JyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9FTkQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLWVuZCcsXG59O1xuXG5jb25zdCBudW1iZXJzID0ge1xuICBQQURESU5HOiAxMCxcbiAgSU5JVElBTF9PUklHSU5fU0NBTEU6IDAuNixcbiAgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVM6IDIyNSwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtdHJhbnNsYXRlLWR1cmF0aW9uIChpLmUuIGFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBGR19ERUFDVElWQVRJT05fTVM6IDE1MCwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtZmFkZS1vdXQtZHVyYXRpb24gKGkuZS4gZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgVEFQX0RFTEFZX01TOiAzMDAsIC8vIERlbGF5IGJldHdlZW4gdG91Y2ggYW5kIHNpbXVsYXRlZCBtb3VzZSBldmVudHMgb24gdG91Y2ggZGV2aWNlc1xufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgQ1NTIGN1c3RvbSB2YXJpYWJsZSBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBhcHBseVBhc3NpdmUgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzUGFzc2l2ZV87XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKSB7XG4gIC8vIERldGVjdCB2ZXJzaW9ucyBvZiBFZGdlIHdpdGggYnVnZ3kgdmFyKCkgc3VwcG9ydFxuICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzExNDk1NDQ4L1xuICBjb25zdCBkb2N1bWVudCA9IHdpbmRvd09iai5kb2N1bWVudDtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBub2RlLmNsYXNzTmFtZSA9ICdtZGMtcmlwcGxlLXN1cmZhY2UtLXRlc3QtZWRnZS12YXItYnVnJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAvLyBUaGUgYnVnIGV4aXN0cyBpZiA6OmJlZm9yZSBzdHlsZSBlbmRzIHVwIHByb3BhZ2F0aW5nIHRvIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgLy8gQWRkaXRpb25hbGx5LCBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgbnVsbCBpbiBpZnJhbWVzIHdpdGggZGlzcGxheTogXCJub25lXCIgaW4gRmlyZWZveCxcbiAgLy8gYnV0IEZpcmVmb3ggaXMga25vd24gdG8gc3VwcG9ydCBDU1MgY3VzdG9tIHByb3BlcnRpZXMgY29ycmVjdGx5LlxuICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93T2JqLmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGNvbnN0IGhhc1BzZXVkb1ZhckJ1ZyA9IGNvbXB1dGVkU3R5bGUgIT09IG51bGwgJiYgY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BTdHlsZSA9PT0gJ3NvbGlkJztcbiAgbm9kZS5yZW1vdmUoKTtcbiAgcmV0dXJuIGhhc1BzZXVkb1ZhckJ1Zztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3dPYmosIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPT09ICdib29sZWFuJyAmJiAhZm9yY2VSZWZyZXNoKSB7XG4gICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG5cbiAgY29uc3Qgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSB3aW5kb3dPYmouQ1NTICYmIHR5cGVvZiB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIXN1cHBvcnRzRnVuY3Rpb25QcmVzZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJy0tY3NzLXZhcnMnLCAneWVzJyk7XG4gIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxuICAvLyBTZWU6IFJFQURNRSBzZWN0aW9uIG9uIFNhZmFyaVxuICBjb25zdCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnKC0tY3NzLXZhcnM6IHllcyknKSAmJlxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJ2NvbG9yJywgJyMwMDAwMDAwMCcpXG4gICk7XG5cbiAgaWYgKGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgfHwgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSAhZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopO1xuICB9IGVsc2Uge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gZmFsc2U7XG4gIH1cblxuICBpZiAoIWZvcmNlUmVmcmVzaCkge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG4gIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbn1cblxuLy9cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cbiAqL1xuZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSBIVE1MRWxlbWVudFByb3RvdHlwZVxuICogQHJldHVybiB7IUFycmF5PHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudFByb3RvdHlwZSkge1xuICByZXR1cm4gW1xuICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLCAnbXNNYXRjaGVzU2VsZWN0b3InLCAnbWF0Y2hlcycsXG4gIF0uZmlsdGVyKChwKSA9PiBwIGluIEhUTUxFbGVtZW50UHJvdG90eXBlKS5wb3AoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFFdmVudH0gZXZcbiAqIEBwYXJhbSB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gcGFnZU9mZnNldFxuICogQHBhcmFtIHshQ2xpZW50UmVjdH0gY2xpZW50UmVjdFxuICogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKGV2LCBwYWdlT2Zmc2V0LCBjbGllbnRSZWN0KSB7XG4gIGNvbnN0IHt4LCB5fSA9IHBhZ2VPZmZzZXQ7XG4gIGNvbnN0IGRvY3VtZW50WCA9IHggKyBjbGllbnRSZWN0LmxlZnQ7XG4gIGNvbnN0IGRvY3VtZW50WSA9IHkgKyBjbGllbnRSZWN0LnRvcDtcblxuICBsZXQgbm9ybWFsaXplZFg7XG4gIGxldCBub3JtYWxpemVkWTtcbiAgLy8gRGV0ZXJtaW5lIHRvdWNoIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByaXBwbGUgY29udGFpbmVyLlxuICBpZiAoZXYudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9IGVsc2Uge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfVxuXG4gIHJldHVybiB7eDogbm9ybWFsaXplZFgsIHk6IG5vcm1hbGl6ZWRZfTtcbn1cblxuZXhwb3J0IHtzdXBwb3J0c0Nzc1ZhcmlhYmxlcywgYXBwbHlQYXNzaXZlLCBnZXRNYXRjaGVzUHJvcGVydHksIGdldE5vcm1hbGl6ZWRFdmVudENvb3Jkc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge2dldE5vcm1hbGl6ZWRFdmVudENvb3Jkc30gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBpc0FjdGl2YXRlZDogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGFjdGl2YXRpb25FdmVudDogRXZlbnQsXG4gKiAgIGlzUHJvZ3JhbW1hdGljOiAoYm9vbGVhbnx1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgQWN0aXZhdGlvblN0YXRlVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBkZWFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGZvY3VzOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGJsdXI6IChzdHJpbmd8dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVySW5mb1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGZvY3VzOiBmdW5jdGlvbigpLFxuICogICBibHVyOiBmdW5jdGlvbigpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJzVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB4OiBudW1iZXIsXG4gKiAgIHk6IG51bWJlclxuICogfX1cbiAqL1xubGV0IFBvaW50VHlwZTtcblxuLy8gQWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiB0aGUgcm9vdCBlbGVtZW50IG9mIGVhY2ggaW5zdGFuY2UgZm9yIGFjdGl2YXRpb25cbmNvbnN0IEFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJywgJ2tleWRvd24nXTtcblxuLy8gRGVhY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIGRvY3VtZW50RWxlbWVudCB3aGVuIGEgcG9pbnRlci1yZWxhdGVkIGRvd24gZXZlbnQgb2NjdXJzXG5jb25zdCBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hlbmQnLCAncG9pbnRlcnVwJywgJ21vdXNldXAnXTtcblxuLy8gVHJhY2tzIGFjdGl2YXRpb25zIHRoYXQgaGF2ZSBvY2N1cnJlZCBvbiB0aGUgY3VycmVudCBmcmFtZSwgdG8gYXZvaWQgc2ltdWx0YW5lb3VzIG5lc3RlZCBhY3RpdmF0aW9uc1xuLyoqIEB0eXBlIHshQXJyYXk8IUV2ZW50VGFyZ2V0Pn0gKi9cbmxldCBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1JpcHBsZUFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IC8qIGJvb2xlYW4gLSBjYWNoZWQgKi8ge30sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICgvKiB0YXJnZXQ6ICFFdmVudFRhcmdldCAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAoLyogdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IC8qIENsaWVudFJlY3QgKi8ge30sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAvKiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9ICovIHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENSaXBwbGVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUgeyFDbGllbnRSZWN0fSAqL1xuICAgIHRoaXMuZnJhbWVfID0gLyoqIEB0eXBlIHshQ2xpZW50UmVjdH0gKi8gKHt3aWR0aDogMCwgaGVpZ2h0OiAwfSk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubWF4UmFkaXVzXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuZGVhY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlRm9jdXMoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUJsdXIoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuXG4gICAgLyoqIEBwcml2YXRlIHt7bGVmdDogbnVtYmVyLCB0b3A6bnVtYmVyfX0gKi9cbiAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnU2NhbGVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IHRydWU7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUgez9FdmVudH0gKi9cbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogV2UgY29tcHV0ZSB0aGlzIHByb3BlcnR5IHNvIHRoYXQgd2UgYXJlIG5vdCBxdWVyeWluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY2xpZW50XG4gICAqIHVudGlsIHRoZSBwb2ludCBpbiB0aW1lIHdoZXJlIHRoZSBmb3VuZGF0aW9uIHJlcXVlc3RzIGl0LiBUaGlzIHByZXZlbnRzIHNjZW5hcmlvcyB3aGVyZVxuICAgKiBjbGllbnQtc2lkZSBmZWF0dXJlLWRldGVjdGlvbiBtYXkgaGFwcGVuIHRvbyBlYXJseSwgc3VjaCBhcyB3aGVuIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXJcbiAgICogYW5kIHRoZW4gaW5pdGlhbGl6ZWQgYXQgbW91bnQgdGltZSBvbiB0aGUgY2xpZW50LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNTdXBwb3J0ZWRfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshQWN0aXZhdGlvblN0YXRlVHlwZX1cbiAgICovXG4gIGRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2YXRlZDogZmFsc2UsXG4gICAgICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogZmFsc2UsXG4gICAgICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IGZhbHNlLFxuICAgICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IGZhbHNlLFxuICAgICAgYWN0aXZhdGlvbkV2ZW50OiBudWxsLFxuICAgICAgaXNQcm9ncmFtbWF0aWM6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UKTtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgICAvLyBVbmJvdW5kZWQgcmlwcGxlcyBuZWVkIGxheW91dCBsb2dpYyBhcHBsaWVkIGltbWVkaWF0ZWx5IHRvIHNldCBjb29yZGluYXRlcyBmb3IgYm90aCBzaGFkZSBhbmQgcmlwcGxlXG4gICAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWN0aXZhdGlvblRpbWVyXykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuICAgICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG4gICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhST09UKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgIHRoaXMucmVtb3ZlQ3NzVmFyc18oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbW92ZUNzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtzdHJpbmdzfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4gICAgT2JqZWN0LmtleXMoc3RyaW5ncykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignVkFSXycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoc3RyaW5nc1trXSwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjdGl2YXRlXyhlKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcmVhY3RpbmcgdG8gZm9sbG93LW9uIGV2ZW50cyBmaXJlZCBieSB0b3VjaCBkZXZpY2UgYWZ0ZXIgYW4gYWxyZWFkeS1wcm9jZXNzZWQgdXNlciBpbnRlcmFjdGlvblxuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gICAgY29uc3QgaXNTYW1lSW50ZXJhY3Rpb24gPSBwcmV2aW91c0FjdGl2YXRpb25FdmVudCAmJiBlICYmIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50LnR5cGUgIT09IGUudHlwZTtcbiAgICBpZiAoaXNTYW1lSW50ZXJhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA9IGUgPT09IG51bGw7XG4gICAgYWN0aXZhdGlvblN0YXRlLmFjdGl2YXRpb25FdmVudCA9IGU7XG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0FjdGl2YXRlZEJ5UG9pbnRlciA9IGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA/IGZhbHNlIDogKFxuICAgICAgZS50eXBlID09PSAnbW91c2Vkb3duJyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICdwb2ludGVyZG93bidcbiAgICApO1xuXG4gICAgY29uc3QgaGFzQWN0aXZhdGVkQ2hpbGQgPVxuICAgICAgZSAmJiBhY3RpdmF0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgYWN0aXZhdGVkVGFyZ2V0cy5zb21lKCh0YXJnZXQpID0+IHRoaXMuYWRhcHRlcl8uY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpKTtcbiAgICBpZiAoaGFzQWN0aXZhdGVkQ2hpbGQpIHtcbiAgICAgIC8vIEltbWVkaWF0ZWx5IHJlc2V0IGFjdGl2YXRpb24gc3RhdGUsIHdoaWxlIHByZXNlcnZpbmcgbG9naWMgdGhhdCBwcmV2ZW50cyB0b3VjaCBmb2xsb3ctb24gZXZlbnRzXG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goLyoqIEB0eXBlIHshRXZlbnRUYXJnZXR9ICovIChlLnRhcmdldCkpO1xuICAgICAgdGhpcy5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlICYmIChlLmtleSA9PT0gJyAnIHx8IGUua2V5Q29kZSA9PT0gMzIpKSB7XG4gICAgICAgIC8vIElmIHNwYWNlIHdhcyBwcmVzc2VkLCB0cnkgYWdhaW4gd2l0aGluIGFuIHJBRiBjYWxsIHRvIGRldGVjdCA6YWN0aXZlLCBiZWNhdXNlIGRpZmZlcmVudCBVQXMgcmVwb3J0XG4gICAgICAgIC8vIGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW4gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MzU5NzFcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICAgIC8vIFdlIHRyeSBmaXJzdCBvdXRzaWRlIHJBRiB0byBzdXBwb3J0IEVkZ2UsIHdoaWNoIGRvZXMgbm90IGV4aGliaXQgdGhpcyBwcm9ibGVtLCBidXQgd2lsbCBjcmFzaCBpZiBhIENTU1xuICAgICAgICAvLyB2YXJpYWJsZSBpcyBzZXQgd2l0aGluIGEgckFGIGNhbGxiYWNrIGZvciBhIHN1Ym1pdCBidXR0b24gaW50ZXJhY3Rpb24gKCMyMjQxKS5cbiAgICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSkge1xuICAgIHJldHVybiAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGwsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXyhlKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgY29uc3QgZXZ0T2JqZWN0ID0gbnVsbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGV2dE9iamVjdCwgc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhlLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZGVhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCJpbXBvcnQgTURDUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMnXG5pbXBvcnQge1xuICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyxcbiAgZ2V0TWF0Y2hlc1Byb3BlcnR5LFxuICBhcHBseVBhc3NpdmVcbn0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS91dGlsJ1xuXG5leHBvcnQgY2xhc3MgUmlwcGxlQmFzZSBleHRlbmRzIE1EQ1JpcHBsZUZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IE1BVENIRVMoKSB7XG4gICAgLyogZ2xvYmFsIEhUTUxFbGVtZW50ICovXG4gICAgcmV0dXJuIChcbiAgICAgIFJpcHBsZUJhc2UuX21hdGNoZXMgfHxcbiAgICAgIChSaXBwbGVCYXNlLl9tYXRjaGVzID0gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSkpXG4gICAgKVxuICB9XG5cbiAgc3RhdGljIGlzU3VyZmFjZUFjdGl2ZShyZWYpIHtcbiAgICByZXR1cm4gcmVmW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICB9XG5cbiAgY29uc3RydWN0b3Iodm0sIG9wdGlvbnMpIHtcbiAgICBzdXBlcihcbiAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHtcbiAgICAgICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdm0uJGVsW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2bS5kaXNhYmxlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB2bS4kc2V0KHZtLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdm0uJGRlbGV0ZSh2bS5jbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiB0YXJnZXQgPT4gdm0uJGVsLmNvbnRhaW5zKHRhcmdldCksXG4gICAgICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgIHZtLiRlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICB2bS4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcbiAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgYXBwbHlQYXNzaXZlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICBldnRUeXBlLFxuICAgICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAgICBhcHBseVBhc3NpdmUoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdm0uJHNldCh2bS5zdHlsZXMsIHZhck5hbWUsIHZhbHVlKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZtLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgeDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXQgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKVxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUmlwcGxlTWl4aW4gPSB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgc3R5bGVzOiB7fVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGN1c3RvbS1lbGVtZW50IFxuICAgIDp0YWc9XCJ0YWdcIiBcbiAgICA6Y2xhc3Nlcz1cImNsYXNzZXNcIlxuICAgIDpzdHlsZXM9XCJzdHlsZXNcIiBcbiAgICBjbGFzcz1cIm1kYy1yaXBwbGVcIj5cbiAgICA8c2xvdCAvPlxuICA8L2N1c3RvbS1lbGVtZW50PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IEN1c3RvbUVsZW1lbnRNaXhpbiB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgeyBSaXBwbGVNaXhpbiB9IGZyb20gJy4vbWRjLXJpcHBsZS1iYXNlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtcmlwcGxlJyxcbiAgbWl4aW5zOiBbQ3VzdG9tRWxlbWVudE1peGluLCBSaXBwbGVNaXhpbl0sXG4gIHByb3BzOiB7XG4gICAgdGFnOiBTdHJpbmdcbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXZcbiAgICA6c3R5bGU9XCJ7d2lkdGg6ZnVsbHdpZHRoPycxMDAlJzp1bmRlZmluZWR9XCJcbiAgICA6aWQ9XCJpZFwiXG4gICAgY2xhc3M9XCJtZGMtdGV4dGZpZWxkLXdyYXBwZXJcIj5cblxuICAgIDxkaXZcbiAgICAgIHJlZj1cInJvb3RcIlxuICAgICAgOmNsYXNzPVwicm9vdENsYXNzZXNcIj5cblxuICAgICAgPGlcbiAgICAgICAgdi1pZj1cIiEhaGFzTGVhZGluZ0ljb25cIlxuICAgICAgICByZWY9XCJpY29uXCJcbiAgICAgICAgOmNsYXNzPVwiaGFzTGVhZGluZ0ljb24uY2xhc3Nlc1wiXG4gICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgIGNsYXNzPVwibWRjLXRleHQtZmllbGRfX2ljb25cIj5cbiAgICAgICAgPHNsb3QgbmFtZT1cImxlYWRpbmctaWNvblwiPnt7IGhhc0xlYWRpbmdJY29uLmNvbnRlbnQgfX08L3Nsb3Q+XG4gICAgICA8L2k+XG5cbiAgICAgIDwhLS0gd29ya2Fycm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy9yb2xsdXAtcGx1Z2luLXZ1ZS9pc3N1ZXMvMTc0IC0tPlxuICAgICAgPCEtLSBlc2xpbnQtZGlzYWJsZSB2dWUvaHRtbC1zZWxmLWNsb3NpbmcgLS0+XG4gICAgICA8dGV4dGFyZWFcbiAgICAgICAgdi1pZj1cIm11bHRpbGluZVwiXG4gICAgICAgIHJlZj1cImlucHV0XCJcbiAgICAgICAgdi1iaW5kPVwiJGF0dHJzXCJcbiAgICAgICAgOmlkPVwidm1hX3VpZF9cIlxuICAgICAgICA6Y2xhc3M9XCJpbnB1dENsYXNzZXNcIlxuICAgICAgICA6bWlubGVuZ3RoPVwibWlubGVuZ3RoXCJcbiAgICAgICAgOm1heGxlbmd0aD1cIm1heGxlbmd0aFwiXG4gICAgICAgIDpwbGFjZWhvbGRlcj1cImlucHV0UGxhY2VIb2xkZXJcIlxuICAgICAgICA6YXJpYS1sYWJlbD1cImlucHV0UGxhY2VIb2xkZXJcIlxuICAgICAgICA6YXJpYS1jb250cm9scz1cImlucHV0QXJpYUNvbnRyb2xzXCJcbiAgICAgICAgOnJvd3M9XCJyb3dzXCJcbiAgICAgICAgOmNvbHM9XCJjb2xzXCJcbiAgICAgICAgdi1vbj1cIiRsaXN0ZW5lcnNcIlxuICAgICAgICBAaW5wdXQ9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICA+PC90ZXh0YXJlYT5cblxuICAgICAgPGlucHV0XG4gICAgICAgIHYtZWxzZVxuICAgICAgICByZWY9XCJpbnB1dFwiXG4gICAgICAgIHYtYmluZD1cIiRhdHRyc1wiXG4gICAgICAgIDppZD1cInZtYV91aWRfXCJcbiAgICAgICAgOmNsYXNzPVwiaW5wdXRDbGFzc2VzXCJcbiAgICAgICAgOnR5cGU9XCJ0eXBlXCJcbiAgICAgICAgOm1pbmxlbmd0aD1cIm1pbmxlbmd0aFwiXG4gICAgICAgIDptYXhsZW5ndGg9XCJtYXhsZW5ndGhcIlxuICAgICAgICA6cGxhY2Vob2xkZXI9XCJpbnB1dFBsYWNlSG9sZGVyXCJcbiAgICAgICAgOmFyaWEtbGFiZWw9XCJpbnB1dFBsYWNlSG9sZGVyXCJcbiAgICAgICAgOmFyaWEtY29udHJvbHM9XCJpbnB1dEFyaWFDb250cm9sc1wiXG4gICAgICAgIHYtb249XCIkbGlzdGVuZXJzXCJcbiAgICAgICAgQGlucHV0PVwidXBkYXRlVmFsdWUoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAgICAgPlxuXG4gICAgICA8bGFiZWxcbiAgICAgICAgdi1pZj1cImhhc0xhYmVsXCJcbiAgICAgICAgcmVmPVwibGFiZWxcIlxuICAgICAgICA6Y2xhc3M9XCJsYWJlbENsYXNzZXNVcGdyYWRlZFwiXG4gICAgICAgIDpmb3I9XCJ2bWFfdWlkX1wiPlxuICAgICAgICB7eyBsYWJlbCB9fVxuICAgICAgPC9sYWJlbD5cblxuICAgICAgPGlcbiAgICAgICAgdi1pZj1cIiEhaGFzVHJhaWxpbmdJY29uXCJcbiAgICAgICAgcmVmPVwiaWNvblwiXG4gICAgICAgIDpjbGFzcz1cImhhc1RyYWlsaW5nSWNvbi5jbGFzc2VzXCJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgY2xhc3M9XCJtZGMtdGV4dC1maWVsZF9faWNvblwiPlxuICAgICAgICA8c2xvdCBuYW1lPVwidHJhaWxpbmctaWNvblwiPnt7IGhhc1RyYWlsaW5nSWNvbi5jb250ZW50IH19PC9zbG90PlxuICAgICAgPC9pPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIHYtaWY9XCJoYXNPdXRsaW5lXCJcbiAgICAgICAgcmVmPVwib3V0bGluZVwiXG4gICAgICAgIDpjbGFzcz1cIm91dGxpbmVDbGFzc2VzXCJcbiAgICAgICAgY2xhc3M9XCJtZGMtbm90Y2hlZC1vdXRsaW5lXCI+XG4gICAgICAgIDxzdmc+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgIDpkPVwib3V0bGluZVBhdGhBdHRyXCJcbiAgICAgICAgICAgIGNsYXNzPVwibWRjLW5vdGNoZWQtb3V0bGluZV9fcGF0aFwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIHYtaWY9XCJoYXNPdXRsaW5lXCJcbiAgICAgICAgcmVmPVwib3V0bGluZUlkbGVcIlxuICAgICAgICBjbGFzcz1cIm1kYy1ub3RjaGVkLW91dGxpbmVfX2lkbGVcIi8+XG4gICAgICA8ZGl2XG4gICAgICAgIHYtaWY9XCJoYXNMaW5lUmlwcGxlXCJcbiAgICAgICAgcmVmPVwibGluZVJpcHBsZVwiXG4gICAgICAgIDpjbGFzcz1cImxpbmVSaXBwbGVDbGFzc2VzXCJcbiAgICAgICAgOnN0eWxlPVwibGluZVJpcHBsZVN0eWxlc1wiLz5cblxuICAgIDwvZGl2PlxuXG4gICAgPHBcbiAgICAgIHYtaWY9XCJoZWxwdGV4dFwiXG4gICAgICByZWY9XCJoZWxwXCJcbiAgICAgIDppZD1cIidoZWxwLScrdm1hX3VpZF9cIlxuICAgICAgOmNsYXNzPVwiaGVscENsYXNzZXNcIlxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICB7eyBoZWxwdGV4dCB9fVxuICAgIDwvcD5cblxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTURDVGV4dGZpZWxkRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvdGV4dGZpZWxkL2ZvdW5kYXRpb24nXG5pbXBvcnQgTURDTGluZVJpcHBsZUZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2xpbmUtcmlwcGxlL2ZvdW5kYXRpb24nXG5pbXBvcnQgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3RleHRmaWVsZC9oZWxwZXItdGV4dC9mb3VuZGF0aW9uJ1xuaW1wb3J0IE1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC90ZXh0ZmllbGQvaWNvbi9mb3VuZGF0aW9uJ1xuaW1wb3J0IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9mbG9hdGluZy1sYWJlbC9mb3VuZGF0aW9uJ1xuaW1wb3J0IE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lL2ZvdW5kYXRpb24nXG5cbmltcG9ydCB7XG4gIGV4dHJhY3RJY29uUHJvcCxcbiAgRGlzcGF0Y2hGb2N1c01peGluLFxuICBDdXN0b21FbGVtZW50TWl4aW4sXG4gIFZNQVVuaXF1ZUlkTWl4aW4sXG4gIGFwcGx5UGFzc2l2ZVxufSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHsgUmlwcGxlQmFzZSB9IGZyb20gJy4uL3JpcHBsZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLXRleHRmaWVsZCcsXG4gIG1peGluczogW0N1c3RvbUVsZW1lbnRNaXhpbiwgRGlzcGF0Y2hGb2N1c01peGluLCBWTUFVbmlxdWVJZE1peGluXSxcbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcbiAgbW9kZWw6IHtcbiAgICBwcm9wOiAndmFsdWUnLFxuICAgIGV2ZW50OiAnbW9kZWwnXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IFN0cmluZyxcbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAndGV4dCcsXG4gICAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgW1xuICAgICAgICAgICAgJ3RleHQnLFxuICAgICAgICAgICAgJ2VtYWlsJyxcbiAgICAgICAgICAgICdzZWFyY2gnLFxuICAgICAgICAgICAgJ3Bhc3N3b3JkJyxcbiAgICAgICAgICAgICd0ZWwnLFxuICAgICAgICAgICAgJ3VybCcsXG4gICAgICAgICAgICAnbnVtYmVyJ1xuICAgICAgICAgIF0uaW5kZXhPZih2YWx1ZSkgIT09IC0xXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlbnNlOiBCb29sZWFuLFxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgaGVscHRleHQ6IFN0cmluZyxcbiAgICBoZWxwdGV4dFBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgaGVscHRleHRWYWxpZGF0aW9uOiBCb29sZWFuLFxuICAgIGJveDogQm9vbGVhbixcbiAgICBvdXRsaW5lOiBCb29sZWFuLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIHJlcXVpcmVkOiBCb29sZWFuLFxuICAgIHZhbGlkOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IHVuZGVmaW5lZCB9LFxuICAgIGZ1bGx3aWR0aDogQm9vbGVhbixcbiAgICBtdWx0aWxpbmU6IEJvb2xlYW4sXG4gICAgbGVhZGluZ0ljb246IFtTdHJpbmcsIEFycmF5LCBPYmplY3RdLFxuICAgIHRyYWlsaW5nSWNvbjogW1N0cmluZywgQXJyYXksIE9iamVjdF0sXG4gICAgc2l6ZTogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCBkZWZhdWx0OiAyMCB9LFxuICAgIG1pbmxlbmd0aDogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCBkZWZhdWx0OiB1bmRlZmluZWQgfSxcbiAgICBtYXhsZW5ndGg6IHsgdHlwZTogW051bWJlciwgU3RyaW5nXSwgZGVmYXVsdDogdW5kZWZpbmVkIH0sXG4gICAgcm93czogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCBkZWZhdWx0OiA4IH0sXG4gICAgY29sczogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCBkZWZhdWx0OiA0MCB9LFxuICAgIGlkOiB7IHR5cGU6IFN0cmluZyB9XG4gIH0sXG4gIGRhdGE6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0ZXh0OiB0aGlzLnZhbHVlLFxuICAgICAgcm9vdENsYXNzZXM6IHtcbiAgICAgICAgJ21kYy10ZXh0ZmllbGQnOiB0cnVlLFxuICAgICAgICAnbWRjLXRleHQtZmllbGQnOiB0cnVlLFxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLXVwZ3JhZGVkJzogdHJ1ZSxcbiAgICAgICAgJ21kYy10ZXh0LWZpZWxkLS1kaXNhYmxlZCc6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC0tZGVuc2UnOiB0aGlzLmRlbnNlLFxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLWZ1bGx3aWR0aCc6IHRoaXMuZnVsbHdpZHRoLFxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLXRleHRhcmVhJzogdGhpcy5tdWx0aWxpbmUsXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC0tYm94JzogIXRoaXMuZnVsbHdpZHRoICYmIHRoaXMuYm94LFxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLW91dGxpbmVkJzogIXRoaXMuZnVsbHdpZHRoICYmIHRoaXMub3V0bGluZVxuICAgICAgfSxcbiAgICAgIGlucHV0Q2xhc3Nlczoge1xuICAgICAgICAnbWRjLXRleHQtZmllbGRfX2lucHV0JzogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGxhYmVsQ2xhc3Nlczoge1xuICAgICAgICAnbWRjLWZsb2F0aW5nLWxhYmVsJzogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGxpbmVSaXBwbGVDbGFzc2VzOiB7XG4gICAgICAgICdtZGMtbGluZS1yaXBwbGUnOiB0cnVlXG4gICAgICB9LFxuICAgICAgbGluZVJpcHBsZVN0eWxlczoge30sXG4gICAgICBoZWxwQ2xhc3Nlczoge1xuICAgICAgICAnbWRjLXRleHQtZmllbGQtaGVscGVyLXRleHQnOiB0cnVlLFxuICAgICAgICAnbWRjLXRleHQtZmllbGQtaGVscGVyLXRleHQtLXBlcnNpc3RlbnQnOiB0aGlzLmhlbHB0ZXh0UGVyc2lzdGVudCxcbiAgICAgICAgJ21kYy10ZXh0LWZpZWxkLWhlbHBlci10ZXh0LS12YWxpZGF0aW9uLW1zZyc6IHRoaXMuaGVscHRleHRWYWxpZGF0aW9uXG4gICAgICB9LFxuICAgICAgb3V0bGluZUNsYXNzZXM6IHt9LFxuICAgICAgb3V0bGluZVBhdGhBdHRyOiB1bmRlZmluZWRcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgaW5wdXRQbGFjZUhvbGRlcigpIHtcbiAgICAgIHJldHVybiB0aGlzLmZ1bGx3aWR0aCA/IHRoaXMubGFiZWwgOiB1bmRlZmluZWRcbiAgICB9LFxuICAgIGlucHV0QXJpYUNvbnRyb2xzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGVscCA/ICdoZWxwLScgKyB0aGlzLnZtYV91aWRfIDogdW5kZWZpbmVkXG4gICAgfSxcbiAgICBoYXNMYWJlbCgpIHtcbiAgICAgIHJldHVybiAhdGhpcy5mdWxsd2lkdGggJiYgdGhpcy5sYWJlbFxuICAgIH0sXG4gICAgaGFzT3V0bGluZSgpIHtcbiAgICAgIHJldHVybiAhdGhpcy5mdWxsd2lkdGggJiYgdGhpcy5vdXRsaW5lXG4gICAgfSxcbiAgICBoYXNMaW5lUmlwcGxlKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmhhc091dGxpbmUgJiYgIXRoaXMubXVsdGlsaW5lXG4gICAgfSxcbiAgICBoYXNMZWFkaW5nSWNvbigpIHtcbiAgICAgIGlmIChcbiAgICAgICAgKHRoaXMubGVhZGluZ0ljb24gfHwgdGhpcy4kc2xvdHNbJ2xlYWRpbmctaWNvbiddKSAmJlxuICAgICAgICAhKHRoaXMudHJhaWxpbmdJY29uIHx8IHRoaXMuJHNsb3RzWyd0cmFpbGluZy1pY29uJ10pXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGVhZGluZ0ljb24gPyBleHRyYWN0SWNvblByb3AodGhpcy5sZWFkaW5nSWNvbikgOiB7fVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcbiAgICBoYXNUcmFpbGluZ0ljb24oKSB7XG4gICAgICBpZiAodGhpcy50cmFpbGluZ0ljb24gfHwgdGhpcy4kc2xvdHNbJ3RyYWlsaW5nLWljb24nXSkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFpbGluZ0ljb24gPyBleHRyYWN0SWNvblByb3AodGhpcy50cmFpbGluZ0ljb24pIDoge31cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0sXG4gICAgbGFiZWxDbGFzc2VzVXBncmFkZWQoKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLmxhYmVsQ2xhc3Nlcywge1xuICAgICAgICAnbWRjLWZsb2F0aW5nLWxhYmVsLS1mbG9hdC1hYm92ZSc6IHRoaXMudmFsdWVcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGRpc2FibGVkKCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLmRpc2FibGVkKVxuICAgIH0sXG4gICAgcmVxdWlyZWQoKSB7XG4gICAgICB0aGlzLiRyZWZzLmlucHV0ICYmICh0aGlzLiRyZWZzLmlucHV0LnJlcXVpcmVkID0gdGhpcy5yZXF1aXJlZClcbiAgICB9LFxuICAgIHZhbGlkKCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnZhbGlkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLnNldFZhbGlkKHRoaXMudmFsaWQpXG4gICAgICB9XG4gICAgfSxcbiAgICBkZW5zZSgpIHtcbiAgICAgIHRoaXMuJHNldCh0aGlzLnJvb3RDbGFzc2VzLCAnbWRjLXRleHQtZmllbGQtLWRlbnNlJywgdGhpcy5kZW5zZSlcbiAgICB9LFxuICAgIGhlbHB0ZXh0UGVyc2lzdGVudCgpIHtcbiAgICAgIHRoaXMuaGVscGVyVGV4dEZvdW5kYXRpb24gJiZcbiAgICAgICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbi5zZXRQZXJzaXN0ZW50KHRoaXMuaGVscHRleHRQZXJzaXN0ZW50KVxuICAgIH0sXG4gICAgaGVscHRleHRWYWxpZGF0aW9uKCkge1xuICAgICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbiAmJlxuICAgICAgICB0aGlzLmhlbHBlclRleHRGb3VuZGF0aW9uLnNldFZhbGlkYXRpb24odGhpcy5oZWxwdGV4dFZhbGlkYXRpb24pXG4gICAgfSxcbiAgICB2YWx1ZSh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMuZm91bmRhdGlvbikge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuZm91bmRhdGlvbi5nZXRWYWx1ZSgpKSB7XG4gICAgICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldFZhbHVlKHZhbHVlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGlmICh0aGlzLiRyZWZzLmxpbmVSaXBwbGUpIHtcbiAgICAgIHRoaXMubGluZVJpcHBsZUZvdW5kYXRpb24gPSBuZXcgTURDTGluZVJpcHBsZUZvdW5kYXRpb24oe1xuICAgICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICB0aGlzLiRzZXQodGhpcy5saW5lUmlwcGxlQ2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxuICAgICAgICB9LFxuICAgICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICB0aGlzLiRkZWxldGUodGhpcy5saW5lUmlwcGxlQ2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgICB9LFxuICAgICAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICB0aGlzLiRyZWZzLmxpbmVSaXBwbGUuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0U3R5bGU6IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMuJHNldCh0aGlzLmxpbmVSaXBwbGVTdHlsZXMsIG5hbWUsIHZhbHVlKVxuICAgICAgICB9LFxuICAgICAgICByZWdpc3RlckV2ZW50SGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICB0aGlzLiRyZWZzLmxpbmVSaXBwbGUuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKVxuICAgICAgICB9LFxuICAgICAgICBkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgIHRoaXMuJHJlZnMubGluZVJpcHBsZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLmxpbmVSaXBwbGVGb3VuZGF0aW9uLmluaXQoKVxuICAgIH1cblxuICAgIGlmICh0aGlzLiRyZWZzLmhlbHApIHtcbiAgICAgIHRoaXMuaGVscGVyVGV4dEZvdW5kYXRpb24gPSBuZXcgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24oe1xuICAgICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICB0aGlzLiRzZXQodGhpcy5oZWxwQ2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxuICAgICAgICB9LFxuICAgICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICB0aGlzLiRkZWxldGUodGhpcy5oZWxwQ2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgICB9LFxuICAgICAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy4kcmVmcy5oZWxwLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpXG4gICAgICAgIH0sXG4gICAgICAgIHNldEF0dHI6IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMuJHJlZnMuaGVscC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUF0dHI6IG5hbWUgPT4ge1xuICAgICAgICAgIHRoaXMuJHJlZnMuaGVscC5yZW1vdmVBdHRyaWJ1dGUobmFtZSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0Q29udGVudDogKC8qY29udGVudCovKSA9PiB7XG4gICAgICAgICAgLy8gaGVscCB0ZXh0IGdldCdzIHVwZGF0ZWQgZnJvbSB7e2hlbHB0ZXh0fX1cbiAgICAgICAgICAvLyB0aGlzLiRyZWZzLmhlbHAudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbi5pbml0KClcbiAgICB9XG5cbiAgICBpZiAodGhpcy4kcmVmcy5pY29uKSB7XG4gICAgICBpZiAodGhpcy5oYXNMZWFkaW5nSWNvbikge1xuICAgICAgICB0aGlzLiRzZXQodGhpcy5yb290Q2xhc3NlcywgJ21kYy10ZXh0LWZpZWxkLS13aXRoLWxlYWRpbmctaWNvbicsIHRydWUpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaGFzVHJhaWxpbmdJY29uKSB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnJvb3RDbGFzc2VzLCAnbWRjLXRleHQtZmllbGQtLXdpdGgtdHJhaWxpbmctaWNvbicsIHRydWUpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuaWNvbkZvdW5kYXRpb24gPSBuZXcgTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb24oe1xuICAgICAgICBzZXRBdHRyOiAoYXR0ciwgdmFsdWUpID0+IHRoaXMuJHJlZnMuaWNvbi5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpLFxuICAgICAgICBnZXRBdHRyOiBhdHRyID0+IHRoaXMuJHJlZnMuaWNvbi5nZXRBdHRyaWJ1dGUoYXR0ciksXG4gICAgICAgIHJlbW92ZUF0dHI6IGF0dHIgPT4gdGhpcy4kcmVmcy5pY29uLnJlbW92ZUF0dHJpYnV0ZShhdHRyKSxcbiAgICAgICAgc2V0Q29udGVudDogKC8qY29udGVudCovKSA9PiB7XG4gICAgICAgICAgLy8gaWNvbiB0ZXh0IGdldCdzIHVwZGF0ZWQgZnJvbSB7e3t7IGhhc1RyYWlsaW5nSWNvbi5jb250ZW50IH19fX1cbiAgICAgICAgICAvLyB0aGlzLiRyZWZzLmljb24udGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB9LFxuICAgICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICB0aGlzLiRyZWZzLmljb24uYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKVxuICAgICAgICB9LFxuICAgICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgIHRoaXMuJHJlZnMuaWNvbi5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXG4gICAgICAgIH0sXG4gICAgICAgIG5vdGlmeUljb25BY3Rpb246ICgpID0+IHRoaXMuJGVtaXQoJ2ljb24tYWN0aW9uJylcbiAgICAgIH0pXG4gICAgICB0aGlzLmljb25Gb3VuZGF0aW9uLmluaXQoKVxuICAgIH1cblxuICAgIGlmICh0aGlzLiRyZWZzLmxhYmVsKSB7XG4gICAgICB0aGlzLmxhYmVsRm91bmRhdGlvbiA9IG5ldyBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbih7XG4gICAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIHRoaXMuJHNldCh0aGlzLmxhYmVsQ2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxuICAgICAgICB9LFxuICAgICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICB0aGlzLiRkZWxldGUodGhpcy5sYWJlbENsYXNzZXMsIGNsYXNzTmFtZSlcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0V2lkdGg6ICgpID0+IHRoaXMuJHJlZnMubGFiZWwub2Zmc2V0V2lkdGgsXG4gICAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgIHRoaXMuJHJlZnMubGFiZWwuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKVxuICAgICAgICB9LFxuICAgICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgIHRoaXMuJHJlZnMubGFiZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy5sYWJlbEZvdW5kYXRpb24uaW5pdCgpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuJHJlZnMub3V0bGluZSkge1xuICAgICAgdGhpcy5vdXRsaW5lRm91bmRhdGlvbiA9IG5ldyBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24oe1xuICAgICAgICBnZXRXaWR0aDogKCkgPT4gdGhpcy4kcmVmcy5vdXRsaW5lLm9mZnNldFdpZHRoLFxuICAgICAgICBnZXRIZWlnaHQ6ICgpID0+IHRoaXMuJHJlZnMub3V0bGluZS5vZmZzZXRIZWlnaHQsXG4gICAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIHRoaXMuJHNldCh0aGlzLm91dGxpbmVDbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLm91dGxpbmVDbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICAgIH0sXG4gICAgICAgIHNldE91dGxpbmVQYXRoQXR0cjogdmFsdWUgPT4ge1xuICAgICAgICAgIHRoaXMub3V0bGluZVBhdGhBdHRyID0gdmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0SWRsZU91dGxpbmVTdHlsZVZhbHVlOiBwcm9wZXJ0eU5hbWUgPT4ge1xuICAgICAgICAgIGNvbnN0IGlkbGVPdXRsaW5lRWxlbWVudCA9IHRoaXMuJHJlZnMub3V0bGluZUlkbGVcbiAgICAgICAgICBpZiAoaWRsZU91dGxpbmVFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93XG4gICAgICAgICAgICAgIC5nZXRDb21wdXRlZFN0eWxlKGlkbGVPdXRsaW5lRWxlbWVudClcbiAgICAgICAgICAgICAgLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHlOYW1lKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMub3V0bGluZUZvdW5kYXRpb24uaW5pdCgpXG4gICAgfVxuXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ1RleHRmaWVsZEZvdW5kYXRpb24oXG4gICAgICB7XG4gICAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIHRoaXMuJHNldCh0aGlzLnJvb3RDbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLnJvb3RDbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICAgIH0sXG4gICAgICAgIGhhc0NsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIHRoaXMuJHJlZnMucm9vdC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKVxuICAgICAgICB9LFxuICAgICAgICByZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICB0aGlzLiRyZWZzLnJvb3QuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKVxuICAgICAgICB9LFxuICAgICAgICBkZXJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgIHRoaXMuJHJlZnMucm9vdC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXG4gICAgICAgIH0sXG4gICAgICAgIGlzRm9jdXNlZDogKCkgPT4ge1xuICAgICAgICAgIHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLiRyZWZzLmlucHV0XG4gICAgICAgIH0sXG4gICAgICAgIGlzUnRsOiAoKSA9PlxuICAgICAgICAgIHdpbmRvd1xuICAgICAgICAgICAgLmdldENvbXB1dGVkU3R5bGUodGhpcy4kcmVmcy5yb290KVxuICAgICAgICAgICAgLmdldFByb3BlcnR5VmFsdWUoJ2RpcmVjdGlvbicpID09PSAncnRsJyxcbiAgICAgICAgZGVhY3RpdmF0ZUxpbmVSaXBwbGU6ICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5saW5lUmlwcGxlRm91bmRhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5saW5lUmlwcGxlRm91bmRhdGlvbi5kZWFjdGl2YXRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFjdGl2YXRlTGluZVJpcHBsZTogKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmxpbmVSaXBwbGVGb3VuZGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmVSaXBwbGVGb3VuZGF0aW9uLmFjdGl2YXRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNldExpbmVSaXBwbGVUcmFuc2Zvcm1PcmlnaW46IG5vcm1hbGl6ZWRYID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5saW5lUmlwcGxlRm91bmRhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5saW5lUmlwcGxlRm91bmRhdGlvbi5zZXRSaXBwbGVDZW50ZXIobm9ybWFsaXplZFgpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgIHRoaXMuJHJlZnMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcbiAgICAgICAgfSxcbiAgICAgICAgZGVyZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgIHRoaXMuJHJlZnMuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcbiAgICAgICAgfSxcbiAgICAgICAgcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcjogaGFuZGxlciA9PiB7XG4gICAgICAgICAgY29uc3QgZ2V0QXR0cmlidXRlc0xpc3QgPSBtdXRhdGlvbnNMaXN0ID0+XG4gICAgICAgICAgICBtdXRhdGlvbnNMaXN0Lm1hcChtdXRhdGlvbiA9PiBtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lKVxuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25zTGlzdCA9PlxuICAgICAgICAgICAgaGFuZGxlcihnZXRBdHRyaWJ1dGVzTGlzdChtdXRhdGlvbnNMaXN0KSlcbiAgICAgICAgICApXG4gICAgICAgICAgY29uc3QgdGFyZ2V0Tm9kZSA9IHRoaXMuJHJlZnMuaW5wdXRcbiAgICAgICAgICBjb25zdCBjb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUgfVxuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0Tm9kZSwgY29uZmlnKVxuICAgICAgICAgIHJldHVybiBvYnNlcnZlclxuICAgICAgICB9LFxuICAgICAgICBkZXJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXI6IG9ic2VydmVyID0+IHtcbiAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgICAgfSxcbiAgICAgICAgc2hha2VMYWJlbDogc2hvdWxkU2hha2UgPT4ge1xuICAgICAgICAgIHRoaXMubGFiZWxGb3VuZGF0aW9uLnNoYWtlKHNob3VsZFNoYWtlKVxuICAgICAgICB9LFxuICAgICAgICBmbG9hdExhYmVsOiBzaG91bGRGbG9hdCA9PiB7XG4gICAgICAgICAgdGhpcy5sYWJlbEZvdW5kYXRpb24uZmxvYXQoc2hvdWxkRmxvYXQpXG4gICAgICAgIH0sXG4gICAgICAgIGhhc0xhYmVsOiAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICEhdGhpcy4kcmVmcy5sYWJlbFxuICAgICAgICB9LFxuICAgICAgICBnZXRMYWJlbFdpZHRoOiAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxGb3VuZGF0aW9uLmdldFdpZHRoKClcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0TmF0aXZlSW5wdXQ6ICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy4kcmVmcy5pbnB1dFxuICAgICAgICB9LFxuICAgICAgICBoYXNPdXRsaW5lOiAoKSA9PiAhIXRoaXMuaGFzT3V0bGluZSxcbiAgICAgICAgbm90Y2hPdXRsaW5lOiAobm90Y2hXaWR0aCwgaXNSdGwpID0+XG4gICAgICAgICAgdGhpcy5vdXRsaW5lRm91bmRhdGlvbi5ub3RjaChub3RjaFdpZHRoLCBpc1J0bCksXG4gICAgICAgIGNsb3NlT3V0bGluZTogKCkgPT4gdGhpcy5vdXRsaW5lRm91bmRhdGlvbi5jbG9zZU5vdGNoKClcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGhlbHBlclRleHQ6IHRoaXMuaGVscGVyVGV4dEZvdW5kYXRpb24sXG4gICAgICAgIGljb246IHRoaXMuaWNvbkZvdW5kYXRpb25cbiAgICAgIH1cbiAgICApXG5cbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXG4gICAgdGhpcy5mb3VuZGF0aW9uLnNldFZhbHVlKHRoaXMudmFsdWUpXG4gICAgdGhpcy5mb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQpXG4gICAgdGhpcy4kcmVmcy5pbnB1dCAmJiAodGhpcy4kcmVmcy5pbnB1dC5yZXF1aXJlZCA9IHRoaXMucmVxdWlyZWQpXG4gICAgaWYgKHR5cGVvZiB0aGlzLnZhbGlkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldFZhbGlkKHRoaXMudmFsaWQpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGV4dGJveCkge1xuICAgICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzKVxuICAgICAgdGhpcy5yaXBwbGUuaW5pdCgpXG4gICAgfVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24uZGVzdHJveSgpXG4gICAgdGhpcy5saW5lUmlwcGxlRm91bmRhdGlvbiAmJiB0aGlzLmxpbmVSaXBwbGVGb3VuZGF0aW9uLmRlc3Ryb3koKVxuICAgIHRoaXMuaGVscGVyVGV4dEZvdW5kYXRpb24gJiYgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbi5kZXN0cm95KClcbiAgICB0aGlzLmljb25Gb3VuZGF0aW9uICYmIHRoaXMuaWNvbkZvdW5kYXRpb24uZGVzdHJveSgpXG4gICAgdGhpcy5sYWJlbEZvdW5kYXRpb24gJiYgdGhpcy5sYWJlbEZvdW5kYXRpb24uZGVzdHJveSgpXG4gICAgdGhpcy5vdXRsaW5lRm91bmRhdGlvbiAmJiB0aGlzLm91dGxpbmVGb3VuZGF0aW9uLmRlc3Ryb3koKVxuICAgIHRoaXMucmlwcGxlICYmIHRoaXMucmlwcGxlLmRlc3Ryb3koKVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgdXBkYXRlVmFsdWUodmFsdWUpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ21vZGVsJywgdmFsdWUpXG4gICAgfSxcbiAgICBmb2N1cygpIHtcbiAgICAgIHRoaXMuJHJlZnMuaW5wdXQgJiYgdGhpcy4kcmVmcy5pbnB1dC5mb2N1cygpXG4gICAgfSxcbiAgICBibHVyKCkge1xuICAgICAgdGhpcy4kcmVmcy5pbnB1dCAmJiB0aGlzLiRyZWZzLmlucHV0LmJsdXIoKVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgeyBCYXNlUGx1Z2luIH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBtZGNUZXh0RmllbGQgZnJvbSAnLi9tZGMtdGV4dGZpZWxkLnZ1ZSdcblxuZXhwb3J0IHsgbWRjVGV4dEZpZWxkIH1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XG4gIG1kY1RleHRGaWVsZFxufSlcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7IGF1dG9Jbml0IH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG5hdXRvSW5pdChwbHVnaW4pXG4iXSwibmFtZXMiOlsic3VwcG9ydHNQYXNzaXZlXyIsImFwcGx5UGFzc2l2ZSIsImdsb2JhbE9iaiIsIndpbmRvdyIsImZvcmNlUmVmcmVzaCIsInVuZGVmaW5lZCIsImlzU3VwcG9ydGVkIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsImUiLCJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwia2V5IiwiY29tcG9uZW50Iiwidm0iLCJuYW1lIiwiQ3VzdG9tRWxlbWVudCIsImZ1bmN0aW9uYWwiLCJyZW5kZXIiLCJjcmVhdGVFbGVtZW50IiwiY29udGV4dCIsInByb3BzIiwiaXMiLCJ0YWciLCJkYXRhIiwiY2hpbGRyZW4iLCJDdXN0b21FbGVtZW50TWl4aW4iLCJleHRyYWN0SWNvblByb3AiLCJpY29uUHJvcCIsImNsYXNzZXMiLCJjb250ZW50IiwiQXJyYXkiLCJyZWR1Y2UiLCJyZXN1bHQiLCJ2YWx1ZSIsImJhYmVsSGVscGVycy5leHRlbmRzIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJ0ZXh0Q29udGVudCIsIkRpc3BhdGNoRm9jdXNNaXhpbiIsImhhc0ZvY3VzIiwibWV0aG9kcyIsIm9uTW91c2VEb3duIiwiX2FjdGl2ZSIsIm9uTW91c2VVcCIsIm9uRm9jdXNFdmVudCIsInNldFRpbWVvdXQiLCJkaXNwYXRjaEZvY3VzRXZlbnQiLCJvbkJsdXJFdmVudCIsIiRlbCIsImFjdGl2ZUVsZW1lbnQiLCJjb250YWlucyIsIiRlbWl0IiwibW91bnRlZCIsImJlZm9yZURlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2NvcGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsIlZNQVVuaXF1ZUlkTWl4aW4iLCJiZWZvcmVDcmVhdGUiLCJ2bWFfdWlkXyIsIl91aWQiLCJNRENGb3VuZGF0aW9uIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXIiLCJhdHRyIiwic3RyaW5ncyIsIkFSSUFfSElEREVOIiwiUk9MRSIsImNzc0NsYXNzZXMiLCJIRUxQRVJfVEVYVF9QRVJTSVNURU5UIiwiSEVMUEVSX1RFWFRfVkFMSURBVElPTl9NU0ciLCJNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbiIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJoYXNDbGFzcyIsInNldEF0dHIiLCJyZW1vdmVBdHRyIiwic2V0Q29udGVudCIsImRlZmF1bHRBZGFwdGVyIiwiaXNQZXJzaXN0ZW50IiwiaXNWYWxpZGF0aW9uIiwiaW5wdXRJc1ZhbGlkIiwiaGVscGVyVGV4dElzUGVyc2lzdGVudCIsImhlbHBlclRleHRJc1ZhbGlkYXRpb25Nc2ciLCJ2YWxpZGF0aW9uTXNnTmVlZHNEaXNwbGF5IiwiaGlkZV8iLCJNRENUZXh0RmllbGRJY29uQWRhcHRlciIsImV2dFR5cGUiLCJoYW5kbGVyIiwiSUNPTl9FVkVOVCIsIklDT05fUk9MRSIsIk1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9uIiwiZ2V0QXR0ciIsInJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsIm5vdGlmeUljb25BY3Rpb24iLCJzYXZlZFRhYkluZGV4XyIsImludGVyYWN0aW9uSGFuZGxlcl8iLCJldnQiLCJoYW5kbGVJbnRlcmFjdGlvbiIsImZvckVhY2giLCJkaXNhYmxlZCIsImxhYmVsIiwidHlwZSIsImtleUNvZGUiLCJNRENUZXh0RmllbGRBZGFwdGVyIiwib2JzZXJ2ZXIiLCJub3JtYWxpemVkWCIsInNob3VsZFNoYWtlIiwic2hvdWxkRmxvYXQiLCJsYWJlbFdpZHRoIiwiaXNSdGwiLCJBUklBX0NPTlRST0xTIiwiSU5QVVRfU0VMRUNUT1IiLCJMQUJFTF9TRUxFQ1RPUiIsIklDT05fU0VMRUNUT1IiLCJPVVRMSU5FX1NFTEVDVE9SIiwiTElORV9SSVBQTEVfU0VMRUNUT1IiLCJST09UIiwiVVBHUkFERUQiLCJESVNBQkxFRCIsIkRFTlNFIiwiRk9DVVNFRCIsIklOVkFMSUQiLCJCT1giLCJPVVRMSU5FRCIsIm51bWJlcnMiLCJMQUJFTF9TQ0FMRSIsIkRFTlNFX0xBQkVMX1NDQUxFIiwiVkFMSURBVElPTl9BVFRSX1dISVRFTElTVCIsIk1EQ1RleHRGaWVsZEZvdW5kYXRpb24iLCJpc1ZhbGlkIiwiaXNGb2N1c2VkXyIsImdldFZhbHVlIiwiaXNCYWRJbnB1dF8iLCJyZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlciIsImRlcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlciIsImdldE5hdGl2ZUlucHV0IiwiaXNGb2N1c2VkIiwiYWN0aXZhdGVMaW5lUmlwcGxlIiwiZGVhY3RpdmF0ZUxpbmVSaXBwbGUiLCJzZXRMaW5lUmlwcGxlVHJhbnNmb3JtT3JpZ2luIiwic2hha2VMYWJlbCIsImZsb2F0TGFiZWwiLCJoYXNMYWJlbCIsImdldExhYmVsV2lkdGgiLCJoYXNPdXRsaW5lIiwibm90Y2hPdXRsaW5lIiwiY2xvc2VPdXRsaW5lIiwiZm91bmRhdGlvbk1hcCIsImhlbHBlclRleHRfIiwiaGVscGVyVGV4dCIsImljb25fIiwiaWNvbiIsInJlY2VpdmVkVXNlcklucHV0XyIsInVzZUN1c3RvbVZhbGlkaXR5Q2hlY2tpbmdfIiwiaXNWYWxpZF8iLCJpbnB1dEZvY3VzSGFuZGxlcl8iLCJhY3RpdmF0ZUZvY3VzIiwiaW5wdXRCbHVySGFuZGxlcl8iLCJkZWFjdGl2YXRlRm9jdXMiLCJpbnB1dElucHV0SGFuZGxlcl8iLCJhdXRvQ29tcGxldGVGb2N1cyIsInNldFBvaW50ZXJYT2Zmc2V0XyIsInNldFRyYW5zZm9ybU9yaWdpbiIsInRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcl8iLCJoYW5kbGVUZXh0RmllbGRJbnRlcmFjdGlvbiIsInZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyXyIsImF0dHJpYnV0ZXNMaXN0IiwiaGFuZGxlVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZSIsInZhbGlkYXRpb25PYnNlcnZlcl8iLCJzb21lIiwiYXR0cmlidXRlTmFtZSIsImluZGV4T2YiLCJzdHlsZVZhbGlkaXR5XyIsIm9wZW5Ob3RjaCIsImlzRGVuc2UiLCJsYWJlbFNjYWxlIiwic3R5bGVGb2N1c2VkXyIsInNob3dUb1NjcmVlblJlYWRlciIsInRhcmdldENsaWVudFJlY3QiLCJ0YXJnZXQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJldnRDb29yZHMiLCJ4IiwiY2xpZW50WCIsInkiLCJjbGllbnRZIiwibGVmdCIsImlucHV0IiwiZ2V0TmF0aXZlSW5wdXRfIiwic2hvdWxkUmVtb3ZlTGFiZWxGbG9hdCIsImlzTmF0aXZlSW5wdXRWYWxpZF8iLCJzdHlsZURpc2FibGVkXyIsInNldEFyaWFMYWJlbCIsInZhbGlkaXR5IiwiYmFkSW5wdXQiLCJ2YWxpZCIsInNldFZhbGlkaXR5IiwiaXNEaXNhYmxlZCIsInNldERpc2FibGVkIiwiTURDTGluZVJpcHBsZUFkYXB0ZXIiLCJwcm9wZXJ0eU5hbWUiLCJMSU5FX1JJUFBMRV9BQ1RJVkUiLCJMSU5FX1JJUFBMRV9ERUFDVElWQVRJTkciLCJNRENMaW5lUmlwcGxlRm91bmRhdGlvbiIsInNldFN0eWxlIiwicmVnaXN0ZXJFdmVudEhhbmRsZXIiLCJkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyIiwidHJhbnNpdGlvbkVuZEhhbmRsZXJfIiwiaGFuZGxlVHJhbnNpdGlvbkVuZCIsInhDb29yZGluYXRlIiwiaXNEZWFjdGl2YXRpbmciLCJNRENGbG9hdGluZ0xhYmVsQWRhcHRlciIsIkxBQkVMX0ZMT0FUX0FCT1ZFIiwiTEFCRUxfU0hBS0UiLCJNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbiIsImdldFdpZHRoIiwic2hha2VBbmltYXRpb25FbmRIYW5kbGVyXyIsImhhbmRsZVNoYWtlQW5pbWF0aW9uRW5kXyIsIk1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlciIsIlBBVEhfU0VMRUNUT1IiLCJJRExFX09VVExJTkVfU0VMRUNUT1IiLCJPVVRMSU5FX05PVENIRUQiLCJNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24iLCJnZXRIZWlnaHQiLCJzZXRPdXRsaW5lUGF0aEF0dHIiLCJnZXRJZGxlT3V0bGluZVN0eWxlVmFsdWUiLCJub3RjaFdpZHRoIiwidXBkYXRlU3ZnUGF0aF8iLCJyYWRpdXNTdHlsZVZhbHVlIiwicmFkaXVzIiwicGFyc2VGbG9hdCIsIndpZHRoIiwiaGVpZ2h0IiwiY29ybmVyV2lkdGgiLCJsZWFkaW5nU3Ryb2tlTGVuZ3RoIiwiYWJzIiwicGFkZGVkTm90Y2hXaWR0aCIsInBhdGhNaWRkbGUiLCJwYXRoIiwiTURDUmlwcGxlQWRhcHRlciIsInZhck5hbWUiLCJVTkJPVU5ERUQiLCJCR19GT0NVU0VEIiwiRkdfQUNUSVZBVElPTiIsIkZHX0RFQUNUSVZBVElPTiIsIlZBUl9MRUZUIiwiVkFSX1RPUCIsIlZBUl9GR19TSVpFIiwiVkFSX0ZHX1NDQUxFIiwiVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCIsIlZBUl9GR19UUkFOU0xBVEVfRU5EIiwiUEFERElORyIsIklOSVRJQUxfT1JJR0lOX1NDQUxFIiwiREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMiLCJGR19ERUFDVElWQVRJT05fTVMiLCJUQVBfREVMQVlfTVMiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlc18iLCJkZXRlY3RFZGdlUHNldWRvVmFyQnVnIiwid2luZG93T2JqIiwibm9kZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNvbXB1dGVkU3R5bGUiLCJnZXRDb21wdXRlZFN0eWxlIiwiaGFzUHNldWRvVmFyQnVnIiwiYm9yZGVyVG9wU3R5bGUiLCJyZW1vdmUiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlcyIsInN1cHBvcnRzRnVuY3Rpb25QcmVzZW50IiwiQ1NTIiwic3VwcG9ydHMiLCJleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIiwid2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzIiwiZ2V0TWF0Y2hlc1Byb3BlcnR5IiwiSFRNTEVsZW1lbnRQcm90b3R5cGUiLCJmaWx0ZXIiLCJwIiwicG9wIiwiZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzIiwiZXYiLCJwYWdlT2Zmc2V0IiwiY2xpZW50UmVjdCIsImRvY3VtZW50WCIsImRvY3VtZW50WSIsInRvcCIsIm5vcm1hbGl6ZWRZIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsIlBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiYWN0aXZhdGVkVGFyZ2V0cyIsIk1EQ1JpcHBsZUZvdW5kYXRpb24iLCJicm93c2VyU3VwcG9ydHNDc3NWYXJzIiwiaXNVbmJvdW5kZWQiLCJpc1N1cmZhY2VBY3RpdmUiLCJpc1N1cmZhY2VEaXNhYmxlZCIsImNvbnRhaW5zRXZlbnRUYXJnZXQiLCJyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJ1cGRhdGVDc3NWYXJpYWJsZSIsImNvbXB1dGVCb3VuZGluZ1JlY3QiLCJnZXRXaW5kb3dQYWdlT2Zmc2V0IiwibGF5b3V0RnJhbWVfIiwiZnJhbWVfIiwiYWN0aXZhdGlvblN0YXRlXyIsImRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfIiwiaW5pdGlhbFNpemVfIiwibWF4UmFkaXVzXyIsImFjdGl2YXRlSGFuZGxlcl8iLCJhY3RpdmF0ZV8iLCJkZWFjdGl2YXRlSGFuZGxlcl8iLCJkZWFjdGl2YXRlXyIsImZvY3VzSGFuZGxlcl8iLCJoYW5kbGVGb2N1cyIsImJsdXJIYW5kbGVyXyIsImhhbmRsZUJsdXIiLCJyZXNpemVIYW5kbGVyXyIsImxheW91dCIsInVuYm91bmRlZENvb3Jkc18iLCJmZ1NjYWxlXyIsImFjdGl2YXRpb25UaW1lcl8iLCJmZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8iLCJhY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfIiwiYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfIiwicnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfIiwiaXNBY3RpdmF0ZWQiLCJoYXNEZWFjdGl2YXRpb25VWFJ1biIsIndhc0FjdGl2YXRlZEJ5UG9pbnRlciIsIndhc0VsZW1lbnRNYWRlQWN0aXZlIiwiYWN0aXZhdGlvbkV2ZW50IiwiaXNQcm9ncmFtbWF0aWMiLCJpc1N1cHBvcnRlZF8iLCJyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJsYXlvdXRJbnRlcm5hbF8iLCJjbGVhclRpbWVvdXQiLCJkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsImRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJyZW1vdmVDc3NWYXJzXyIsIk9iamVjdCIsImtleXMiLCJrIiwiYWN0aXZhdGlvblN0YXRlIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnQiLCJpc1NhbWVJbnRlcmFjdGlvbiIsImhhc0FjdGl2YXRlZENoaWxkIiwibGVuZ3RoIiwicmVzZXRBY3RpdmF0aW9uU3RhdGVfIiwicHVzaCIsInJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwiY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8iLCJhbmltYXRlQWN0aXZhdGlvbl8iLCJldmVudCIsInRyYW5zbGF0ZVN0YXJ0IiwidHJhbnNsYXRlRW5kIiwiZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXyIsInN0YXJ0UG9pbnQiLCJlbmRQb2ludCIsInJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXyIsImFjdGl2YXRpb25IYXNFbmRlZCIsInN0YXRlIiwiZXZ0T2JqZWN0IiwiYW5pbWF0ZURlYWN0aXZhdGlvbl8iLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIm1heERpbSIsIm1heCIsImdldEJvdW5kZWRSYWRpdXMiLCJoeXBvdGVudXNlIiwic3FydCIsInBvdyIsInVwZGF0ZUxheW91dENzc1ZhcnNfIiwicm91bmQiLCJ1bmJvdW5kZWQiLCJSaXBwbGVCYXNlIiwicmVmIiwiTUFUQ0hFUyIsIl9tYXRjaGVzIiwiSFRNTEVsZW1lbnQiLCJwcm90b3R5cGUiLCJvcHRpb25zIiwiJHNldCIsIiRkZWxldGUiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZXMiLCJwYWdlWE9mZnNldCIsInBhZ2VZT2Zmc2V0IiwiUmlwcGxlTWl4aW4iLCJyaXBwbGUiLCJpbml0IiwiZGVzdHJveSIsIm1kY1RleHRGaWVsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLElBQUlBLHlCQUFKOztJQUVBOzs7Ozs7QUFNQSxJQUFPLFNBQVNDLFlBQVQsR0FBZ0U7SUFBQSxNQUExQ0MsU0FBMEMsdUVBQTlCQyxNQUE4QjtJQUFBLE1BQXRCQyxZQUFzQix1RUFBUCxLQUFPOztJQUNyRSxNQUFJSixxQkFBcUJLLFNBQXJCLElBQWtDRCxZQUF0QyxFQUFvRDtJQUNsRCxRQUFJRSxjQUFjLEtBQWxCO0lBQ0EsUUFBSTtJQUNGSixnQkFBVUssUUFBVixDQUFtQkMsZ0JBQW5CLENBQW9DLE1BQXBDLEVBQTRDLElBQTVDLEVBQWtEO0lBQ2hELFlBQUlDLE9BQUosR0FBYztJQUNaSCx3QkFBYyxFQUFFRyxTQUFTLElBQVgsRUFBZDtJQUNEO0lBSCtDLE9BQWxEO0lBS0QsS0FORCxDQU1FLE9BQU9DLENBQVAsRUFBVTtJQUNWO0lBQ0Q7O0lBRURWLHVCQUFtQk0sV0FBbkI7SUFDRDs7SUFFRCxTQUFPTixnQkFBUDtJQUNEOztJQ3pCTSxTQUFTVyxRQUFULENBQWtCQyxNQUFsQixFQUEwQjtJQUMvQjtJQUNBLE1BQUlDLE9BQU8sSUFBWDtJQUNBLE1BQUksT0FBT1YsTUFBUCxLQUFrQixXQUF0QixFQUFtQztJQUNqQ1UsV0FBT1YsT0FBT1csR0FBZDtJQUNELEdBRkQsTUFFTyxJQUFJLE9BQU9DLE1BQVAsS0FB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
