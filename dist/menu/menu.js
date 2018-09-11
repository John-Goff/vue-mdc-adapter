/**
* @module vue-mdc-adaptermenu 0.18.2
* @exports VueMDCMenu
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCMenu = factory());
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

    function emitCustomEvent(el, evtType, evtData) {
      var shouldBubble = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

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
      el.dispatchEvent(evt);
    }

    var scope = Math.floor(Math.random() * Math.floor(0x10000000)).toString() + '-';

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
     * Adapter for MDC Menu. Provides an interface for managing
     * - classes
     * - dom
     * - focus
     * - position
     * - dimensions
     * - event handlers
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
    var MDCMenuAdapter = function () {
      function MDCMenuAdapter() {
        classCallCheck(this, MDCMenuAdapter);
      }

      createClass(MDCMenuAdapter, [{
        key: "addClass",

        /** @param {string} className */
        value: function addClass(className) {}

        /** @param {string} className */

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

        /** @return {boolean} */

      }, {
        key: "hasNecessaryDom",
        value: function hasNecessaryDom() {}

        /**
         * @param {EventTarget} target
         * @param {string} attributeName
         * @return {string}
         */

      }, {
        key: "getAttributeForEventTarget",
        value: function getAttributeForEventTarget(target, attributeName) {}

        /** @return {{ width: number, height: number }} */

      }, {
        key: "getInnerDimensions",
        value: function getInnerDimensions() {}

        /** @return {boolean} */

      }, {
        key: "hasAnchor",
        value: function hasAnchor() {}

        /** @return {{width: number, height: number, top: number, right: number, bottom: number, left: number}} */

      }, {
        key: "getAnchorDimensions",
        value: function getAnchorDimensions() {}

        /** @return {{ width: number, height: number }} */

      }, {
        key: "getWindowDimensions",
        value: function getWindowDimensions() {}

        /** @return {number} */

      }, {
        key: "getNumberOfItems",
        value: function getNumberOfItems() {}

        /**
         * @param {string} type
         * @param {function(!Event)} handler
         */

      }, {
        key: "registerInteractionHandler",
        value: function registerInteractionHandler(type, handler) {}

        /**
         * @param {string} type
         * @param {function(!Event)} handler
         */

      }, {
        key: "deregisterInteractionHandler",
        value: function deregisterInteractionHandler(type, handler) {}

        /** @param {function(!Event)} handler */

      }, {
        key: "registerBodyClickHandler",
        value: function registerBodyClickHandler(handler) {}

        /** @param {function(!Event)} handler */

      }, {
        key: "deregisterBodyClickHandler",
        value: function deregisterBodyClickHandler(handler) {}

        /**
         * @param {EventTarget} target
         * @return {number}
         */

      }, {
        key: "getIndexForEventTarget",
        value: function getIndexForEventTarget(target) {}

        /** @param {{index: number}} evtData */

      }, {
        key: "notifySelected",
        value: function notifySelected(evtData) {}
      }, {
        key: "notifyCancel",
        value: function notifyCancel() {}
      }, {
        key: "saveFocus",
        value: function saveFocus() {}
      }, {
        key: "restoreFocus",
        value: function restoreFocus() {}

        /** @return {boolean} */

      }, {
        key: "isFocused",
        value: function isFocused() {}
      }, {
        key: "focus",
        value: function focus() {}

        /** @return {number} */

      }, {
        key: "getFocusedItemIndex",
        value: function getFocusedItemIndex() /* number */{}

        /** @param {number} index */

      }, {
        key: "focusItemAtIndex",
        value: function focusItemAtIndex(index) {}

        /** @return {boolean} */

      }, {
        key: "isRtl",
        value: function isRtl() {}

        /** @param {string} origin */

      }, {
        key: "setTransformOrigin",
        value: function setTransformOrigin(origin) {}

        /** @param {{
        *   top: (string|undefined),
        *   right: (string|undefined),
        *   bottom: (string|undefined),
        *   left: (string|undefined)
        * }} position */

      }, {
        key: "setPosition",
        value: function setPosition(position) {}

        /** @param {string} height */

      }, {
        key: "setMaxHeight",
        value: function setMaxHeight(height) {}

        /**
         * @param {number} index
         * @param {string} attr
         * @param {string} value
         */

      }, {
        key: "setAttrForOptionAtIndex",
        value: function setAttrForOptionAtIndex(index, attr, value) {}

        /**
         * @param {number} index
         * @param {string} attr
         */

      }, {
        key: "rmAttrForOptionAtIndex",
        value: function rmAttrForOptionAtIndex(index, attr) {}

        /**
         * @param {number} index
         * @param {string} className
         */

      }, {
        key: "addClassForOptionAtIndex",
        value: function addClassForOptionAtIndex(index, className) {}

        /**
         * @param {number} index
         * @param {string} className
         */

      }, {
        key: "rmClassForOptionAtIndex",
        value: function rmClassForOptionAtIndex(index, className) {}
      }]);
      return MDCMenuAdapter;
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
    var cssClasses = {
      ROOT: 'mdc-menu',
      OPEN: 'mdc-menu--open',
      ANIMATING_OPEN: 'mdc-menu--animating-open',
      ANIMATING_CLOSED: 'mdc-menu--animating-closed',
      SELECTED_LIST_ITEM: 'mdc-list-item--selected'
    };

    /** @enum {string} */
    var strings = {
      ITEMS_SELECTOR: '.mdc-menu__items',
      SELECTED_EVENT: 'MDCMenu:selected',
      CANCEL_EVENT: 'MDCMenu:cancel',
      ARIA_DISABLED_ATTR: 'aria-disabled'
    };

    /** @enum {number} */
    var numbers = {
      // Amount of time to wait before triggering a selected event on the menu. Note that this time
      // will most likely be bumped up once interactive lists are supported to allow for the ripple to
      // animate before closing the menu
      SELECTED_TRIGGER_DELAY: 50,
      // Total duration of menu open animation.
      TRANSITION_OPEN_DURATION: 120,
      // Total duration of menu close animation.
      TRANSITION_CLOSE_DURATION: 75,
      // Margin left to the edge of the viewport when menu is at maximum possible height.
      MARGIN_TO_EDGE: 32,
      // Ratio of anchor width to menu width for switching from corner positioning to center positioning.
      ANCHOR_TO_MENU_WIDTH_RATIO: 0.67,
      // Ratio of vertical offset to menu height for switching from corner to mid-way origin positioning.
      OFFSET_TO_MENU_HEIGHT_RATIO: 0.1
    };

    /**
     * Enum for bits in the {@see Corner) bitmap.
     * @enum {number}
     */
    var CornerBit = {
      BOTTOM: 1,
      CENTER: 2,
      RIGHT: 4,
      FLIP_RTL: 8
    };

    /**
     * Enum for representing an element corner for positioning the menu.
     *
     * The START constants map to LEFT if element directionality is left
     * to right and RIGHT if the directionality is right to left.
     * Likewise END maps to RIGHT or LEFT depending on the directionality.
     *
     * @enum {number}
     */
    var Corner = {
      TOP_LEFT: 0,
      TOP_RIGHT: CornerBit.RIGHT,
      BOTTOM_LEFT: CornerBit.BOTTOM,
      BOTTOM_RIGHT: CornerBit.BOTTOM | CornerBit.RIGHT,
      TOP_START: CornerBit.FLIP_RTL,
      TOP_END: CornerBit.FLIP_RTL | CornerBit.RIGHT,
      BOTTOM_START: CornerBit.BOTTOM | CornerBit.FLIP_RTL,
      BOTTOM_END: CornerBit.BOTTOM | CornerBit.RIGHT | CornerBit.FLIP_RTL
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
     * @extends {MDCFoundation<!MDCMenuAdapter>}
     */

    var MDCMenuFoundation = function (_MDCFoundation) {
      inherits(MDCMenuFoundation, _MDCFoundation);
      createClass(MDCMenuFoundation, null, [{
        key: 'cssClasses',

        /** @return enum{cssClasses} */
        get: function get$$1() {
          return cssClasses;
        }

        /** @return enum{strings} */

      }, {
        key: 'strings',
        get: function get$$1() {
          return strings;
        }

        /** @return enum{numbers} */

      }, {
        key: 'numbers',
        get: function get$$1() {
          return numbers;
        }

        /** @return enum{number} */

      }, {
        key: 'Corner',
        get: function get$$1() {
          return Corner;
        }

        /**
         * {@see MDCMenuAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCMenuAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCMenuAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              hasClass: function hasClass() {
                return false;
              },
              hasNecessaryDom: function hasNecessaryDom() {
                return false;
              },
              getAttributeForEventTarget: function getAttributeForEventTarget() {},
              getInnerDimensions: function getInnerDimensions() {
                return {};
              },
              hasAnchor: function hasAnchor() {
                return false;
              },
              getAnchorDimensions: function getAnchorDimensions() {
                return {};
              },
              getWindowDimensions: function getWindowDimensions() {
                return {};
              },
              getNumberOfItems: function getNumberOfItems() {
                return 0;
              },
              registerInteractionHandler: function registerInteractionHandler() {},
              deregisterInteractionHandler: function deregisterInteractionHandler() {},
              registerBodyClickHandler: function registerBodyClickHandler() {},
              deregisterBodyClickHandler: function deregisterBodyClickHandler() {},
              getIndexForEventTarget: function getIndexForEventTarget() {
                return 0;
              },
              notifySelected: function notifySelected() {},
              notifyCancel: function notifyCancel() {},
              saveFocus: function saveFocus() {},
              restoreFocus: function restoreFocus() {},
              isFocused: function isFocused() {
                return false;
              },
              focus: function focus() {},
              getFocusedItemIndex: function getFocusedItemIndex() {
                return -1;
              },
              focusItemAtIndex: function focusItemAtIndex() {},
              isRtl: function isRtl() {
                return false;
              },
              setTransformOrigin: function setTransformOrigin() {},
              setPosition: function setPosition() {},
              setMaxHeight: function setMaxHeight() {},
              setAttrForOptionAtIndex: function setAttrForOptionAtIndex() {},
              rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex() {},
              addClassForOptionAtIndex: function addClassForOptionAtIndex() {},
              rmClassForOptionAtIndex: function rmClassForOptionAtIndex() {}
            }
          );
        }

        /** @param {!MDCMenuAdapter} adapter */

      }]);

      function MDCMenuFoundation(adapter) {
        classCallCheck(this, MDCMenuFoundation);

        /** @private {function(!Event)} */
        var _this = possibleConstructorReturn(this, (MDCMenuFoundation.__proto__ || Object.getPrototypeOf(MDCMenuFoundation)).call(this, _extends(MDCMenuFoundation.defaultAdapter, adapter)));

        _this.clickHandler_ = function (evt) {
          return _this.handlePossibleSelected_(evt);
        };
        /** @private {function(!Event)} */
        _this.keydownHandler_ = function (evt) {
          return _this.handleKeyboardDown_(evt);
        };
        /** @private {function(!Event)} */
        _this.keyupHandler_ = function (evt) {
          return _this.handleKeyboardUp_(evt);
        };
        /** @private {function(!Event)} */
        _this.documentClickHandler_ = function (evt) {
          return _this.handleDocumentClick_(evt);
        };
        /** @private {boolean} */
        _this.isOpen_ = false;
        /** @private {number} */
        _this.openAnimationEndTimerId_ = 0;
        /** @private {number} */
        _this.closeAnimationEndTimerId_ = 0;
        /** @private {number} */
        _this.selectedTriggerTimerId_ = 0;
        /** @private {number} */
        _this.animationRequestId_ = 0;
        /** @private {!{ width: number, height: number }} */
        _this.dimensions_;
        /** @private {number} */
        _this.itemHeight_;
        /** @private {Corner} */
        _this.anchorCorner_ = Corner.TOP_START;
        /** @private {AnchorMargin} */
        _this.anchorMargin_ = { top: 0, right: 0, bottom: 0, left: 0 };
        /** @private {?AutoLayoutMeasurements} */
        _this.measures_ = null;
        /** @private {number} */
        _this.selectedIndex_ = -1;
        /** @private {boolean} */
        _this.rememberSelection_ = false;
        /** @private {boolean} */
        _this.quickOpen_ = false;

        // A keyup event on the menu needs to have a corresponding keydown
        // event on the menu. If the user opens the menu with a keydown event on a
        // button, the menu will only get the key up event causing buggy behavior with selected elements.
        /** @private {boolean} */
        _this.keyDownWithinMenu_ = false;
        return _this;
      }

      createClass(MDCMenuFoundation, [{
        key: 'init',
        value: function init() {
          var _MDCMenuFoundation$cs = MDCMenuFoundation.cssClasses,
              ROOT = _MDCMenuFoundation$cs.ROOT,
              OPEN = _MDCMenuFoundation$cs.OPEN;


          if (!this.adapter_.hasClass(ROOT)) {
            throw new Error(ROOT + ' class required in root element.');
          }

          if (!this.adapter_.hasNecessaryDom()) {
            throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
          }

          if (this.adapter_.hasClass(OPEN)) {
            this.isOpen_ = true;
          }

          this.adapter_.registerInteractionHandler('click', this.clickHandler_);
          this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
          this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          clearTimeout(this.selectedTriggerTimerId_);
          clearTimeout(this.openAnimationEndTimerId_);
          clearTimeout(this.closeAnimationEndTimerId_);
          // Cancel any currently running animations.
          cancelAnimationFrame(this.animationRequestId_);
          this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
          this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
          this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
          this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);
        }

        /**
         * @param {!Corner} corner Default anchor corner alignment of top-left menu corner.
         */

      }, {
        key: 'setAnchorCorner',
        value: function setAnchorCorner(corner) {
          this.anchorCorner_ = corner;
        }

        /**
         * @param {!AnchorMargin} margin 4-plet of margins from anchor.
         */

      }, {
        key: 'setAnchorMargin',
        value: function setAnchorMargin(margin) {
          this.anchorMargin_.top = typeof margin.top === 'number' ? margin.top : 0;
          this.anchorMargin_.right = typeof margin.right === 'number' ? margin.right : 0;
          this.anchorMargin_.bottom = typeof margin.bottom === 'number' ? margin.bottom : 0;
          this.anchorMargin_.left = typeof margin.left === 'number' ? margin.left : 0;
        }

        /** @param {boolean} rememberSelection */

      }, {
        key: 'setRememberSelection',
        value: function setRememberSelection(rememberSelection) {
          this.rememberSelection_ = rememberSelection;
          this.setSelectedIndex(-1);
        }

        /** @param {boolean} quickOpen */

      }, {
        key: 'setQuickOpen',
        value: function setQuickOpen(quickOpen) {
          this.quickOpen_ = quickOpen;
        }

        /**
         * @param {?number} focusIndex
         * @private
         */

      }, {
        key: 'focusOnOpen_',
        value: function focusOnOpen_(focusIndex) {
          if (focusIndex === null) {
            // If this instance of MDCMenu remembers selections, and the user has
            // made a selection, then focus the last selected item
            if (this.rememberSelection_ && this.selectedIndex_ >= 0) {
              this.adapter_.focusItemAtIndex(this.selectedIndex_);
              return;
            }

            this.adapter_.focus();
            // If that doesn't work, focus first item instead.
            if (!this.adapter_.isFocused()) {
              this.adapter_.focusItemAtIndex(0);
            }
          } else {
            this.adapter_.focusItemAtIndex(focusIndex);
          }
        }

        /**
         * Handle clicks and cancel the menu if not a child list-item
         * @param {!Event} evt
         * @private
         */

      }, {
        key: 'handleDocumentClick_',
        value: function handleDocumentClick_(evt) {
          var el = evt.target;

          while (el && el !== document.documentElement) {
            if (this.adapter_.getIndexForEventTarget(el) !== -1) {
              return;
            }
            el = el.parentNode;
          }

          this.adapter_.notifyCancel();
          this.close(evt);
        }
      }, {
        key: 'handleKeyboardDown_',


        /**
         * Handle keys that we want to repeat on hold (tab and arrows).
         * @param {!Event} evt
         * @return {boolean}
         * @private
         */
        value: function handleKeyboardDown_(evt) {
          // Do nothing if Alt, Ctrl or Meta are pressed.
          if (evt.altKey || evt.ctrlKey || evt.metaKey) {
            return true;
          }

          var keyCode = evt.keyCode,
              key = evt.key,
              shiftKey = evt.shiftKey;

          var isTab = key === 'Tab' || keyCode === 9;
          var isArrowUp = key === 'ArrowUp' || keyCode === 38;
          var isArrowDown = key === 'ArrowDown' || keyCode === 40;
          var isSpace = key === 'Space' || keyCode === 32;
          var isEnter = key === 'Enter' || keyCode === 13;
          // The menu needs to know if the keydown event was triggered on the menu
          this.keyDownWithinMenu_ = isEnter || isSpace;

          var focusedItemIndex = this.adapter_.getFocusedItemIndex();
          var lastItemIndex = this.adapter_.getNumberOfItems() - 1;

          if (shiftKey && isTab && focusedItemIndex === 0) {
            this.adapter_.focusItemAtIndex(lastItemIndex);
            evt.preventDefault();
            return false;
          }

          if (!shiftKey && isTab && focusedItemIndex === lastItemIndex) {
            this.adapter_.focusItemAtIndex(0);
            evt.preventDefault();
            return false;
          }

          // Ensure Arrow{Up,Down} and space do not cause inadvertent scrolling
          if (isArrowUp || isArrowDown || isSpace) {
            evt.preventDefault();
          }

          if (isArrowUp) {
            if (focusedItemIndex === 0 || this.adapter_.isFocused()) {
              this.adapter_.focusItemAtIndex(lastItemIndex);
            } else {
              this.adapter_.focusItemAtIndex(focusedItemIndex - 1);
            }
          } else if (isArrowDown) {
            if (focusedItemIndex === lastItemIndex || this.adapter_.isFocused()) {
              this.adapter_.focusItemAtIndex(0);
            } else {
              this.adapter_.focusItemAtIndex(focusedItemIndex + 1);
            }
          }

          return true;
        }

        /**
         * Handle keys that we don't want to repeat on hold (Enter, Space, Escape).
         * @param {!Event} evt
         * @return {boolean}
         * @private
         */

      }, {
        key: 'handleKeyboardUp_',
        value: function handleKeyboardUp_(evt) {
          // Do nothing if Alt, Ctrl or Meta are pressed.
          if (evt.altKey || evt.ctrlKey || evt.metaKey) {
            return true;
          }

          var keyCode = evt.keyCode,
              key = evt.key;

          var isEnter = key === 'Enter' || keyCode === 13;
          var isSpace = key === 'Space' || keyCode === 32;
          var isEscape = key === 'Escape' || keyCode === 27;

          if (isEnter || isSpace) {
            // If the keydown event didn't occur on the menu, then it should
            // disregard the possible selected event.
            if (this.keyDownWithinMenu_) {
              this.handlePossibleSelected_(evt);
            }
            this.keyDownWithinMenu_ = false;
          }

          if (isEscape) {
            this.adapter_.notifyCancel();
            this.close();
          }

          return true;
        }

        /**
         * @param {!Event} evt
         * @private
         */

      }, {
        key: 'handlePossibleSelected_',
        value: function handlePossibleSelected_(evt) {
          var _this2 = this;

          if (this.adapter_.getAttributeForEventTarget(evt.target, strings.ARIA_DISABLED_ATTR) === 'true') {
            return;
          }
          var targetIndex = this.adapter_.getIndexForEventTarget(evt.target);
          if (targetIndex < 0) {
            return;
          }
          // Debounce multiple selections
          if (this.selectedTriggerTimerId_) {
            return;
          }
          this.selectedTriggerTimerId_ = setTimeout(function () {
            _this2.selectedTriggerTimerId_ = 0;
            _this2.close();
            if (_this2.rememberSelection_) {
              _this2.setSelectedIndex(targetIndex);
            }
            _this2.adapter_.notifySelected({ index: targetIndex });
          }, numbers.SELECTED_TRIGGER_DELAY);
        }

        /**
         * @return {AutoLayoutMeasurements} Measurements used to position menu popup.
         */

      }, {
        key: 'getAutoLayoutMeasurements_',
        value: function getAutoLayoutMeasurements_() {
          var anchorRect = this.adapter_.getAnchorDimensions();
          var viewport = this.adapter_.getWindowDimensions();

          return {
            viewport: viewport,
            viewportDistance: {
              top: anchorRect.top,
              right: viewport.width - anchorRect.right,
              left: anchorRect.left,
              bottom: viewport.height - anchorRect.bottom
            },
            anchorHeight: anchorRect.height,
            anchorWidth: anchorRect.width,
            menuHeight: this.dimensions_.height,
            menuWidth: this.dimensions_.width
          };
        }

        /**
         * Computes the corner of the anchor from which to animate and position the menu.
         * @return {Corner}
         * @private
         */

      }, {
        key: 'getOriginCorner_',
        value: function getOriginCorner_() {
          // Defaults: open from the top left.
          var corner = Corner.TOP_LEFT;

          var _measures_ = this.measures_,
              viewportDistance = _measures_.viewportDistance,
              anchorHeight = _measures_.anchorHeight,
              anchorWidth = _measures_.anchorWidth,
              menuHeight = _measures_.menuHeight,
              menuWidth = _measures_.menuWidth;

          var isBottomAligned = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
          var availableTop = isBottomAligned ? viewportDistance.top + anchorHeight + this.anchorMargin_.bottom : viewportDistance.top + this.anchorMargin_.top;
          var availableBottom = isBottomAligned ? viewportDistance.bottom - this.anchorMargin_.bottom : viewportDistance.bottom + anchorHeight - this.anchorMargin_.top;

          var topOverflow = menuHeight - availableTop;
          var bottomOverflow = menuHeight - availableBottom;
          if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
            corner |= CornerBit.BOTTOM;
          }

          var isRtl = this.adapter_.isRtl();
          var isFlipRtl = Boolean(this.anchorCorner_ & CornerBit.FLIP_RTL);
          var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
          var isAlignedRight = avoidHorizontalOverlap && !isRtl || !avoidHorizontalOverlap && isFlipRtl && isRtl;
          var availableLeft = isAlignedRight ? viewportDistance.left + anchorWidth + this.anchorMargin_.right : viewportDistance.left + this.anchorMargin_.left;
          var availableRight = isAlignedRight ? viewportDistance.right - this.anchorMargin_.right : viewportDistance.right + anchorWidth - this.anchorMargin_.left;

          var leftOverflow = menuWidth - availableLeft;
          var rightOverflow = menuWidth - availableRight;

          if (leftOverflow < 0 && isAlignedRight && isRtl || avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0 || rightOverflow > 0 && leftOverflow < rightOverflow) {
            corner |= CornerBit.RIGHT;
          }

          return corner;
        }

        /**
         * @param {Corner} corner Origin corner of the menu.
         * @return {number} Horizontal offset of menu origin corner from corresponding anchor corner.
         * @private
         */

      }, {
        key: 'getHorizontalOriginOffset_',
        value: function getHorizontalOriginOffset_(corner) {
          var anchorWidth = this.measures_.anchorWidth;

          var isRightAligned = Boolean(corner & CornerBit.RIGHT);
          var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
          var x = 0;
          if (isRightAligned) {
            var rightOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.left : this.anchorMargin_.right;
            x = rightOffset;
          } else {
            var leftOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.right : this.anchorMargin_.left;
            x = leftOffset;
          }
          return x;
        }

        /**
         * @param {Corner} corner Origin corner of the menu.
         * @return {number} Vertical offset of menu origin corner from corresponding anchor corner.
         * @private
         */

      }, {
        key: 'getVerticalOriginOffset_',
        value: function getVerticalOriginOffset_(corner) {
          var _measures_2 = this.measures_,
              viewport = _measures_2.viewport,
              viewportDistance = _measures_2.viewportDistance,
              anchorHeight = _measures_2.anchorHeight,
              menuHeight = _measures_2.menuHeight;

          var isBottomAligned = Boolean(corner & CornerBit.BOTTOM);
          var MARGIN_TO_EDGE = MDCMenuFoundation.numbers.MARGIN_TO_EDGE;

          var avoidVerticalOverlap = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
          var canOverlapVertically = !avoidVerticalOverlap;
          var y = 0;

          if (isBottomAligned) {
            y = avoidVerticalOverlap ? anchorHeight - this.anchorMargin_.top : -this.anchorMargin_.bottom;
            // adjust for when menu can overlap anchor, but too tall to be aligned to bottom
            // anchor corner. Bottom margin is ignored in such cases.
            if (canOverlapVertically && menuHeight > viewportDistance.top + anchorHeight) {
              y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.top + anchorHeight));
            }
          } else {
            y = avoidVerticalOverlap ? anchorHeight + this.anchorMargin_.bottom : this.anchorMargin_.top;
            // adjust for when menu can overlap anchor, but too tall to be aligned to top
            // anchor corners. Top margin is ignored in that case.
            if (canOverlapVertically && menuHeight > viewportDistance.bottom + anchorHeight) {
              y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.bottom + anchorHeight));
            }
          }
          return y;
        }

        /**
         * @param {Corner} corner Origin corner of the menu.
         * @return {number} Maximum height of the menu, based on available space. 0 indicates should not be set.
         * @private
         */

      }, {
        key: 'getMenuMaxHeight_',
        value: function getMenuMaxHeight_(corner) {
          var maxHeight = 0;
          var viewportDistance = this.measures_.viewportDistance;

          var isBottomAligned = Boolean(corner & CornerBit.BOTTOM);

          // When maximum height is not specified, it is handled from css.
          if (this.anchorCorner_ & CornerBit.BOTTOM) {
            if (isBottomAligned) {
              maxHeight = viewportDistance.top + this.anchorMargin_.top;
            } else {
              maxHeight = viewportDistance.bottom - this.anchorMargin_.bottom;
            }
          }

          return maxHeight;
        }

        /** @private */

      }, {
        key: 'autoPosition_',
        value: function autoPosition_() {
          var _position;

          if (!this.adapter_.hasAnchor()) {
            return;
          }

          // Compute measurements for autoposition methods reuse.
          this.measures_ = this.getAutoLayoutMeasurements_();

          var corner = this.getOriginCorner_();
          var maxMenuHeight = this.getMenuMaxHeight_(corner);
          var verticalAlignment = corner & CornerBit.BOTTOM ? 'bottom' : 'top';
          var horizontalAlignment = corner & CornerBit.RIGHT ? 'right' : 'left';
          var horizontalOffset = this.getHorizontalOriginOffset_(corner);
          var verticalOffset = this.getVerticalOriginOffset_(corner);
          var position = (_position = {}, defineProperty(_position, horizontalAlignment, horizontalOffset ? horizontalOffset + 'px' : '0'), defineProperty(_position, verticalAlignment, verticalOffset ? verticalOffset + 'px' : '0'), _position);
          var _measures_3 = this.measures_,
              anchorWidth = _measures_3.anchorWidth,
              menuHeight = _measures_3.menuHeight,
              menuWidth = _measures_3.menuWidth;
          // Center align when anchor width is comparable or greater than menu, otherwise keep corner.

          if (anchorWidth / menuWidth > numbers.ANCHOR_TO_MENU_WIDTH_RATIO) {
            horizontalAlignment = 'center';
          }

          // Adjust vertical origin when menu is positioned with significant offset from anchor. This is done so that
          // scale animation is "anchored" on the anchor.
          if (!(this.anchorCorner_ & CornerBit.BOTTOM) && Math.abs(verticalOffset / menuHeight) > numbers.OFFSET_TO_MENU_HEIGHT_RATIO) {
            var verticalOffsetPercent = Math.abs(verticalOffset / menuHeight) * 100;
            var originPercent = corner & CornerBit.BOTTOM ? 100 - verticalOffsetPercent : verticalOffsetPercent;
            verticalAlignment = Math.round(originPercent * 100) / 100 + '%';
          }

          this.adapter_.setTransformOrigin(horizontalAlignment + ' ' + verticalAlignment);
          this.adapter_.setPosition(position);
          this.adapter_.setMaxHeight(maxMenuHeight ? maxMenuHeight + 'px' : '');

          // Clear measures after positioning is complete.
          this.measures_ = null;
        }

        /**
         * Open the menu.
         * @param {{focusIndex: ?number}=} options
         */

      }, {
        key: 'open',
        value: function open() {
          var _this3 = this;

          var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              _ref$focusIndex = _ref.focusIndex,
              focusIndex = _ref$focusIndex === undefined ? null : _ref$focusIndex;

          this.adapter_.saveFocus();

          if (!this.quickOpen_) {
            this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
          }

          this.animationRequestId_ = requestAnimationFrame(function () {
            _this3.dimensions_ = _this3.adapter_.getInnerDimensions();
            _this3.autoPosition_();
            _this3.adapter_.addClass(MDCMenuFoundation.cssClasses.OPEN);
            _this3.focusOnOpen_(focusIndex);
            _this3.adapter_.registerBodyClickHandler(_this3.documentClickHandler_);
            if (!_this3.quickOpen_) {
              _this3.openAnimationEndTimerId_ = setTimeout(function () {
                _this3.openAnimationEndTimerId_ = 0;
                _this3.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
              }, numbers.TRANSITION_OPEN_DURATION);
            }
          });
          this.isOpen_ = true;
        }

        /**
         * Closes the menu.
         * @param {Event=} evt
         */

      }, {
        key: 'close',
        value: function close() {
          var _this4 = this;

          var evt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var targetIsDisabled = evt ? this.adapter_.getAttributeForEventTarget(evt.target, strings.ARIA_DISABLED_ATTR) === 'true' : false;

          if (targetIsDisabled) {
            return;
          }

          this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);

          if (!this.quickOpen_) {
            this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
          }

          requestAnimationFrame(function () {
            _this4.adapter_.removeClass(MDCMenuFoundation.cssClasses.OPEN);
            if (!_this4.quickOpen_) {
              _this4.closeAnimationEndTimerId_ = setTimeout(function () {
                _this4.closeAnimationEndTimerId_ = 0;
                _this4.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
              }, numbers.TRANSITION_CLOSE_DURATION);
            }
          });
          this.isOpen_ = false;
          this.adapter_.restoreFocus();
        }

        /** @return {boolean} */

      }, {
        key: 'isOpen',
        value: function isOpen() {
          return this.isOpen_;
        }

        /** @return {number} */

      }, {
        key: 'getSelectedIndex',
        value: function getSelectedIndex() {
          return this.selectedIndex_;
        }

        /**
         * @param {number} index Index of the item to set as selected.
         */

      }, {
        key: 'setSelectedIndex',
        value: function setSelectedIndex(index) {
          if (index === this.selectedIndex_) {
            return;
          }

          var prevSelectedIndex = this.selectedIndex_;
          if (prevSelectedIndex >= 0) {
            this.adapter_.rmAttrForOptionAtIndex(prevSelectedIndex, 'aria-selected');
            this.adapter_.rmClassForOptionAtIndex(prevSelectedIndex, cssClasses.SELECTED_LIST_ITEM);
          }

          this.selectedIndex_ = index >= 0 && index < this.adapter_.getNumberOfItems() ? index : -1;
          if (this.selectedIndex_ >= 0) {
            this.adapter_.setAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected', 'true');
            this.adapter_.addClassForOptionAtIndex(this.selectedIndex_, cssClasses.SELECTED_LIST_ITEM);
          }
        }
      }]);
      return MDCMenuFoundation;
    }(MDCFoundation);

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

    /** @type {string|undefined} */
    var storedTransformPropertyName_ = void 0;

    /**
     * Returns the name of the correct transform property to use on the current browser.
     * @param {!Window} globalObj
     * @param {boolean=} forceRefresh
     * @return {string}
     */
    function getTransformPropertyName(globalObj) {
      var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (storedTransformPropertyName_ === undefined || forceRefresh) {
        var el = globalObj.document.createElement('div');
        var transformPropertyName = 'transform' in el.style ? 'transform' : 'webkitTransform';
        storedTransformPropertyName_ = transformPropertyName;
      }

      return storedTransformPropertyName_;
    }

    //

    var script = {
      name: 'mdc-menu',
      model: {
        prop: 'open',
        event: 'change'
      },
      props: {
        open: [Boolean, Object],
        'quick-open': Boolean,
        'anchor-corner': [String, Number],
        'anchor-margin': Object
      },
      data: function data() {
        return {
          classes: {},
          styles: {},
          items: []
        };
      },

      watch: {
        open: 'onOpen_',
        quickOpen: function quickOpen(nv) {
          this.foundation.setQuickOpen(nv);
        },
        anchorCorner: function anchorCorner(nv) {
          this.foundation.setAnchorCorner(Number(nv));
        },
        anchorMargin: function anchorMargin(nv) {
          this.foundation.setAnchorMargin(nv);
        }
      },
      mounted: function mounted() {
        var _this = this;

        var refreshItems = function refreshItems() {
          _this.items = [].slice.call(_this.$refs.items.querySelectorAll('.mdc-list-item[role]'));
          _this.$emit('update');
        };
        this.slotObserver = new MutationObserver(function () {
          return refreshItems();
        });
        this.slotObserver.observe(this.$el, {
          childList: true,
          subtree: true
        });

        this._previousFocus = undefined;

        this.foundation = new MDCMenuFoundation({
          addClass: function addClass(className) {
            return _this.$set(_this.classes, className, true);
          },
          removeClass: function removeClass(className) {
            return _this.$delete(_this.classes, className);
          },
          hasClass: function hasClass(className) {
            return _this.$refs.root.classList.contains(className);
          },
          hasNecessaryDom: function hasNecessaryDom() {
            return Boolean(_this.$refs.items);
          },
          getAttributeForEventTarget: function getAttributeForEventTarget(target, attributeName) {
            return target.getAttribute(attributeName);
          },
          getInnerDimensions: function getInnerDimensions() {
            return {
              width: _this.$refs.items.offsetWidth,
              height: _this.$refs.items.offsetHeight
            };
          },
          hasAnchor: function hasAnchor() {
            return _this.$refs.root.parentElement && _this.$refs.root.parentElement.classList.contains('mdc-menu-anchor');
          },
          getAnchorDimensions: function getAnchorDimensions() {
            return _this.$refs.root.parentElement.getBoundingClientRect();
          },
          getWindowDimensions: function getWindowDimensions() {
            return {
              width: window.innerWidth,
              height: window.innerHeight
            };
          },
          getNumberOfItems: function getNumberOfItems() {
            return _this.items.length;
          },
          registerInteractionHandler: function registerInteractionHandler(type, handler) {
            return _this.$refs.root.addEventListener(type, handler);
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
            return _this.$refs.root.removeEventListener(type, handler);
          },
          registerBodyClickHandler: function registerBodyClickHandler(handler) {
            return document.body.addEventListener('click', handler);
          },
          deregisterBodyClickHandler: function deregisterBodyClickHandler(handler) {
            return document.body.removeEventListener('click', handler);
          },
          getIndexForEventTarget: function getIndexForEventTarget(target) {
            return _this.items.indexOf(target);
          },
          notifySelected: function notifySelected(evtData) {
            var evt = {
              index: evtData.index,
              item: _this.items[evtData.index]
            };
            _this.$emit('change', false);
            _this.$emit('select', evt);
            emitCustomEvent(_this.$el, MDCMenuFoundation.strings.SELECTED_EVENT, evt);
          },
          notifyCancel: function notifyCancel() {
            _this.$emit('change', false);
            _this.$emit('cancel');
            emitCustomEvent(_this.$el, MDCMenuFoundation.strings.CANCEL_EVENT, {});
          },
          saveFocus: function saveFocus() {
            _this._previousFocus = document.activeElement;
          },
          restoreFocus: function restoreFocus() {
            if (_this._previousFocus) {
              _this._previousFocus.focus();
            }
          },
          isFocused: function isFocused() {
            return document.activeElement === _this.$refs.root;
          },
          focus: function focus() {
            return _this.$refs.root.focus();
          },
          getFocusedItemIndex: function getFocusedItemIndex() {
            return _this.items.indexOf(document.activeElement);
          },
          focusItemAtIndex: function focusItemAtIndex(index) {
            return _this.items[index].focus();
          },
          isRtl: function isRtl() {
            return getComputedStyle(_this.$refs.root).getPropertyValue('direction') === 'rtl';
          },
          setTransformOrigin: function setTransformOrigin(origin) {
            _this.$set(_this.styles, getTransformPropertyName(window) + '-origin', origin);
          },
          setPosition: function setPosition(position) {
            _this.$set(_this.styles, 'left', position.left);
            _this.$set(_this.styles, 'right', position.right);
            _this.$set(_this.styles, 'top', position.top);
            _this.$set(_this.styles, 'bottom', position.bottom);
          },
          setMaxHeight: function setMaxHeight(height) {
            _this.$set(_this.styles, 'max-height', height);
          },
          setAttrForOptionAtIndex: function setAttrForOptionAtIndex(index, attr, value) {
            _this.items[index].setAttribute(attr, value);
          },
          rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex(index, attr) {
            _this.items[index].removeAttribute(attr);
          },
          addClassForOptionAtIndex: function addClassForOptionAtIndex(index, className) {
            _this.items[index].classList.add(className);
          },
          rmClassForOptionAtIndex: function rmClassForOptionAtIndex(index, className) {
            _this.items[index].classList.remove(className);
          }
        });

        refreshItems();
        this.foundation.init();
        if (this.anchorCorner !== void 0) {
          this.foundation.setAnchorCorner(Number(this.anchorCorner));
        }
        if (this.anchorMargin !== void 0) {
          this.foundation.setAnchorMargin(this.anchorMargin);
        }
      },
      beforeDestroy: function beforeDestroy() {
        this._previousFocus = null;
        this.slotObserver.disconnect();
        this.foundation.destroy();
      },


      methods: {
        onOpen_: function onOpen_(value) {
          if (value) {
            this.foundation.open((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value : void 0);
          } else {
            this.foundation.close();
          }
        },
        show: function show(options) {
          this.foundation.open(options);
        },
        hide: function hide() {
          this.foundation.close();
        },
        isOpen: function isOpen() {
          return this.foundation ? this.foundation.isOpen() : false;
        }
      }
    };

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", {
        ref: "root",
        staticClass: "mdc-menu mdc-simple-menu",
        class: _vm.classes,
        style: _vm.styles,
        attrs: { tabindex: "-1" }
      }, [_c("ul", {
        ref: "items",
        staticClass: "mdc-simple-menu__items mdc-list",
        attrs: { role: "menu", "aria-hidden": "true" }
      }, [_vm._t("default")], 2)]);
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
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/menu/mdc-menu.vue";

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

    var mdcMenu = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

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

    var script$1 = {
      name: 'mdc-menu-item',
      props: {
        disabled: Boolean
      }
    };

    /* script */
    var __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("li", {
        staticClass: "mdc-menu-item mdc-list-item",
        attrs: {
          tabindex: _vm.disabled ? "-1" : "0",
          "aria-disabled": _vm.disabled,
          role: "menuitem"
        }
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
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/menu/mdc-menu-item.vue";

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

    var mdcMenuItem = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

    //
    //
    //
    //
    //
    //

    var script$2 = {
      name: 'mdc-menu-divider'
    };

    /* script */
    var __vue_script__$2 = script$2;

    /* template */
    var __vue_render__$2 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("li", {
        staticClass: "mdc-menu-divider mdc-list-divider",
        attrs: { role: "separator" }
      });
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
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/menu/mdc-menu-divider.vue";

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

    var mdcMenuDivider = __vue_normalize__$2({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, __vue_create_injector__$2, undefined);

    //
    //
    //
    //
    //
    //

    var script$3 = {
      name: 'mdc-menu-anchor'
    };

    /* script */
    var __vue_script__$3 = script$3;

    /* template */
    var __vue_render__$3 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "mdc-menu-anchor" }, [_vm._t("default")], 2);
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
      component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/menu/mdc-menu-anchor.vue";

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

    var mdcMenuAnchor = __vue_normalize__$3({ render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, __vue_create_injector__$3, undefined);

    var plugin = BasePlugin({
      mdcMenu: mdcMenu,
      mdcMenuItem: mdcMenuItem,
      mdcMenuDivider: mdcMenuDivider,
      mdcMenuAnchor: mdcMenuAnchor
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvdW5pcXVlaWQtbWl4aW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbWVudS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9tZW51L2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbWVudS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9tZW51L3V0aWwuanMiLCIuLi8uLi9jb21wb25lbnRzL21lbnUvbWRjLW1lbnUudnVlIiwiLi4vLi4vY29tcG9uZW50cy9tZW51L21kYy1tZW51LWl0ZW0udnVlIiwiLi4vLi4vY29tcG9uZW50cy9tZW51L21kYy1tZW51LWRpdmlkZXIudnVlIiwiLi4vLi4vY29tcG9uZW50cy9tZW51L21kYy1tZW51LWFuY2hvci52dWUiLCIuLi8uLi9jb21wb25lbnRzL21lbnUvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL21lbnUvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0KHBsdWdpbikge1xuICAvLyBBdXRvLWluc3RhbGxcbiAgbGV0IF9WdWUgPSBudWxsXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIF9WdWUgPSB3aW5kb3cuVnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xuICAgIF9WdWUgPSBnbG9iYWwuVnVlXG4gIH1cbiAgaWYgKF9WdWUpIHtcbiAgICBfVnVlLnVzZShwbHVnaW4pXG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luKGNvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxuICAgIGluc3RhbGw6IHZtID0+IHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cbiAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzXG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50KGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICBsZXQgZXZ0XG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcbn1cbiIsImNvbnN0IHNjb3BlID1cbiAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcigweDEwMDAwMDAwKSkudG9TdHJpbmcoKSArICctJ1xuXG5leHBvcnQgY29uc3QgVk1BVW5pcXVlSWRNaXhpbiA9IHtcbiAgYmVmb3JlQ3JlYXRlKCkge1xuICAgIHRoaXMudm1hX3VpZF8gPSBzY29wZSArIHRoaXMuX3VpZFxuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBNZW51LiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKiAtIGZvY3VzXG4gKiAtIHBvc2l0aW9uXG4gKiAtIGRpbWVuc2lvbnNcbiAqIC0gZXZlbnQgaGFuZGxlcnNcbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ01lbnVBZGFwdGVyIHtcbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBoYXNOZWNlc3NhcnlEb20oKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZU5hbWVcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0QXR0cmlidXRlRm9yRXZlbnRUYXJnZXQodGFyZ2V0LCBhdHRyaWJ1dGVOYW1lKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7IHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH19ICovXG4gIGdldElubmVyRGltZW5zaW9ucygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGhhc0FuY2hvcigpIHt9XG5cbiAgLyoqIEByZXR1cm4ge3t3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9fSAqL1xuICBnZXRBbmNob3JEaW1lbnNpb25zKCkge31cblxuICAvKiogQHJldHVybiB7eyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9fSAqL1xuICBnZXRXaW5kb3dEaW1lbnNpb25zKCkge31cblxuICAvKiogQHJldHVybiB7bnVtYmVyfSAqL1xuICBnZXROdW1iZXJPZkl0ZW1zKCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCl9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKiogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpfSBoYW5kbGVyICovXG4gIHJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCl9IGhhbmRsZXIgKi9cbiAgZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldEluZGV4Rm9yRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKiBAcGFyYW0ge3tpbmRleDogbnVtYmVyfX0gZXZ0RGF0YSAqL1xuICBub3RpZnlTZWxlY3RlZChldnREYXRhKSB7fVxuXG4gIG5vdGlmeUNhbmNlbCgpIHt9XG5cbiAgc2F2ZUZvY3VzKCkge31cblxuICByZXN0b3JlRm9jdXMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc0ZvY3VzZWQoKSB7fVxuXG4gIGZvY3VzKCkge31cblxuICAvKiogQHJldHVybiB7bnVtYmVyfSAqL1xuICBnZXRGb2N1c2VkSXRlbUluZGV4KCkgLyogbnVtYmVyICovIHt9XG5cbiAgLyoqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAqL1xuICBmb2N1c0l0ZW1BdEluZGV4KGluZGV4KSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1J0bCgpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBvcmlnaW4gKi9cbiAgc2V0VHJhbnNmb3JtT3JpZ2luKG9yaWdpbikge31cblxuICAvKiogQHBhcmFtIHt7XG4gICogICB0b3A6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAgKiAgIHJpZ2h0OiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gICogICBib3R0b206IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAgKiAgIGxlZnQ6IChzdHJpbmd8dW5kZWZpbmVkKVxuICAqIH19IHBvc2l0aW9uICovXG4gIHNldFBvc2l0aW9uKHBvc2l0aW9uKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gaGVpZ2h0ICovXG4gIHNldE1heEhlaWdodChoZWlnaHQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0clxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldEF0dHJGb3JPcHRpb25BdEluZGV4KGluZGV4LCBhdHRyLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG4gICAqL1xuICBybUF0dHJGb3JPcHRpb25BdEluZGV4KGluZGV4LCBhdHRyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3NGb3JPcHRpb25BdEluZGV4KGluZGV4LCBjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBybUNsYXNzRm9yT3B0aW9uQXRJbmRleChpbmRleCwgY2xhc3NOYW1lKSB7fVxufVxuXG5leHBvcnQge01EQ01lbnVBZGFwdGVyfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFJPT1Q6ICdtZGMtbWVudScsXG4gIE9QRU46ICdtZGMtbWVudS0tb3BlbicsXG4gIEFOSU1BVElOR19PUEVOOiAnbWRjLW1lbnUtLWFuaW1hdGluZy1vcGVuJyxcbiAgQU5JTUFUSU5HX0NMT1NFRDogJ21kYy1tZW51LS1hbmltYXRpbmctY2xvc2VkJyxcbiAgU0VMRUNURURfTElTVF9JVEVNOiAnbWRjLWxpc3QtaXRlbS0tc2VsZWN0ZWQnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBJVEVNU19TRUxFQ1RPUjogJy5tZGMtbWVudV9faXRlbXMnLFxuICBTRUxFQ1RFRF9FVkVOVDogJ01EQ01lbnU6c2VsZWN0ZWQnLFxuICBDQU5DRUxfRVZFTlQ6ICdNRENNZW51OmNhbmNlbCcsXG4gIEFSSUFfRElTQUJMRURfQVRUUjogJ2FyaWEtZGlzYWJsZWQnLFxufTtcblxuLyoqIEBlbnVtIHtudW1iZXJ9ICovXG5jb25zdCBudW1iZXJzID0ge1xuICAvLyBBbW91bnQgb2YgdGltZSB0byB3YWl0IGJlZm9yZSB0cmlnZ2VyaW5nIGEgc2VsZWN0ZWQgZXZlbnQgb24gdGhlIG1lbnUuIE5vdGUgdGhhdCB0aGlzIHRpbWVcbiAgLy8gd2lsbCBtb3N0IGxpa2VseSBiZSBidW1wZWQgdXAgb25jZSBpbnRlcmFjdGl2ZSBsaXN0cyBhcmUgc3VwcG9ydGVkIHRvIGFsbG93IGZvciB0aGUgcmlwcGxlIHRvXG4gIC8vIGFuaW1hdGUgYmVmb3JlIGNsb3NpbmcgdGhlIG1lbnVcbiAgU0VMRUNURURfVFJJR0dFUl9ERUxBWTogNTAsXG4gIC8vIFRvdGFsIGR1cmF0aW9uIG9mIG1lbnUgb3BlbiBhbmltYXRpb24uXG4gIFRSQU5TSVRJT05fT1BFTl9EVVJBVElPTjogMTIwLFxuICAvLyBUb3RhbCBkdXJhdGlvbiBvZiBtZW51IGNsb3NlIGFuaW1hdGlvbi5cbiAgVFJBTlNJVElPTl9DTE9TRV9EVVJBVElPTjogNzUsXG4gIC8vIE1hcmdpbiBsZWZ0IHRvIHRoZSBlZGdlIG9mIHRoZSB2aWV3cG9ydCB3aGVuIG1lbnUgaXMgYXQgbWF4aW11bSBwb3NzaWJsZSBoZWlnaHQuXG4gIE1BUkdJTl9UT19FREdFOiAzMixcbiAgLy8gUmF0aW8gb2YgYW5jaG9yIHdpZHRoIHRvIG1lbnUgd2lkdGggZm9yIHN3aXRjaGluZyBmcm9tIGNvcm5lciBwb3NpdGlvbmluZyB0byBjZW50ZXIgcG9zaXRpb25pbmcuXG4gIEFOQ0hPUl9UT19NRU5VX1dJRFRIX1JBVElPOiAwLjY3LFxuICAvLyBSYXRpbyBvZiB2ZXJ0aWNhbCBvZmZzZXQgdG8gbWVudSBoZWlnaHQgZm9yIHN3aXRjaGluZyBmcm9tIGNvcm5lciB0byBtaWQtd2F5IG9yaWdpbiBwb3NpdGlvbmluZy5cbiAgT0ZGU0VUX1RPX01FTlVfSEVJR0hUX1JBVElPOiAwLjEsXG59O1xuXG4vKipcbiAqIEVudW0gZm9yIGJpdHMgaW4gdGhlIHtAc2VlIENvcm5lcikgYml0bWFwLlxuICogQGVudW0ge251bWJlcn1cbiAqL1xuY29uc3QgQ29ybmVyQml0ID0ge1xuICBCT1RUT006IDEsXG4gIENFTlRFUjogMixcbiAgUklHSFQ6IDQsXG4gIEZMSVBfUlRMOiA4LFxufTtcblxuLyoqXG4gKiBFbnVtIGZvciByZXByZXNlbnRpbmcgYW4gZWxlbWVudCBjb3JuZXIgZm9yIHBvc2l0aW9uaW5nIHRoZSBtZW51LlxuICpcbiAqIFRoZSBTVEFSVCBjb25zdGFudHMgbWFwIHRvIExFRlQgaWYgZWxlbWVudCBkaXJlY3Rpb25hbGl0eSBpcyBsZWZ0XG4gKiB0byByaWdodCBhbmQgUklHSFQgaWYgdGhlIGRpcmVjdGlvbmFsaXR5IGlzIHJpZ2h0IHRvIGxlZnQuXG4gKiBMaWtld2lzZSBFTkQgbWFwcyB0byBSSUdIVCBvciBMRUZUIGRlcGVuZGluZyBvbiB0aGUgZGlyZWN0aW9uYWxpdHkuXG4gKlxuICogQGVudW0ge251bWJlcn1cbiAqL1xuY29uc3QgQ29ybmVyID0ge1xuICBUT1BfTEVGVDogMCxcbiAgVE9QX1JJR0hUOiBDb3JuZXJCaXQuUklHSFQsXG4gIEJPVFRPTV9MRUZUOiBDb3JuZXJCaXQuQk9UVE9NLFxuICBCT1RUT01fUklHSFQ6IENvcm5lckJpdC5CT1RUT00gfCBDb3JuZXJCaXQuUklHSFQsXG4gIFRPUF9TVEFSVDogQ29ybmVyQml0LkZMSVBfUlRMLFxuICBUT1BfRU5EOiBDb3JuZXJCaXQuRkxJUF9SVEwgfCBDb3JuZXJCaXQuUklHSFQsXG4gIEJPVFRPTV9TVEFSVDogQ29ybmVyQml0LkJPVFRPTSB8IENvcm5lckJpdC5GTElQX1JUTCxcbiAgQk9UVE9NX0VORDogQ29ybmVyQml0LkJPVFRPTSB8IENvcm5lckJpdC5SSUdIVCB8IENvcm5lckJpdC5GTElQX1JUTCxcbn07XG5cblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzLCBDb3JuZXJCaXQsIENvcm5lcn07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB0b3A6IG51bWJlcixcbiAqICAgcmlnaHQ6IG51bWJlcixcbiAqICAgYm90dG9tOiBudW1iZXIsXG4gKiAgIGxlZnQ6IG51bWJlclxuICogfX1cbiAqL1xubGV0IEFuY2hvck1hcmdpbjtcblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgdmlld3BvcnQ6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfSxcbiAqICAgdmlld3BvcnREaXN0YW5jZToge3RvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlciwgbGVmdDogbnVtYmVyfSxcbiAqICAgYW5jaG9ySGVpZ2h0OiBudW1iZXIsXG4gKiAgIGFuY2hvcldpZHRoOiBudW1iZXIsXG4gKiAgIG1lbnVIZWlnaHQ6IG51bWJlcixcbiAqICAgbWVudVdpZHRoOiBudW1iZXIsXG4gKiB9fVxuICovXG5sZXQgQXV0b0xheW91dE1lYXN1cmVtZW50cztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQge01EQ01lbnVBZGFwdGVyfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzLCBDb3JuZXIsIENvcm5lckJpdH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENNZW51QWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ01lbnVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyfSAqL1xuICBzdGF0aWMgZ2V0IENvcm5lcigpIHtcbiAgICByZXR1cm4gQ29ybmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ01lbnVBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ01lbnVBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDTWVudUFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKCkgPT4ge30sXG4gICAgICBoYXNDbGFzczogKCkgPT4gZmFsc2UsXG4gICAgICBoYXNOZWNlc3NhcnlEb206ICgpID0+IGZhbHNlLFxuICAgICAgZ2V0QXR0cmlidXRlRm9yRXZlbnRUYXJnZXQ6ICgpID0+IHt9LFxuICAgICAgZ2V0SW5uZXJEaW1lbnNpb25zOiAoKSA9PiAoe30pLFxuICAgICAgaGFzQW5jaG9yOiAoKSA9PiBmYWxzZSxcbiAgICAgIGdldEFuY2hvckRpbWVuc2lvbnM6ICgpID0+ICh7fSksXG4gICAgICBnZXRXaW5kb3dEaW1lbnNpb25zOiAoKSA9PiAoe30pLFxuICAgICAgZ2V0TnVtYmVyT2ZJdGVtczogKCkgPT4gMCxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJCb2R5Q2xpY2tIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJCb2R5Q2xpY2tIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGdldEluZGV4Rm9yRXZlbnRUYXJnZXQ6ICgpID0+IDAsXG4gICAgICBub3RpZnlTZWxlY3RlZDogKCkgPT4ge30sXG4gICAgICBub3RpZnlDYW5jZWw6ICgpID0+IHt9LFxuICAgICAgc2F2ZUZvY3VzOiAoKSA9PiB7fSxcbiAgICAgIHJlc3RvcmVGb2N1czogKCkgPT4ge30sXG4gICAgICBpc0ZvY3VzZWQ6ICgpID0+IGZhbHNlLFxuICAgICAgZm9jdXM6ICgpID0+IHt9LFxuICAgICAgZ2V0Rm9jdXNlZEl0ZW1JbmRleDogKCkgPT4gLTEsXG4gICAgICBmb2N1c0l0ZW1BdEluZGV4OiAoKSA9PiB7fSxcbiAgICAgIGlzUnRsOiAoKSA9PiBmYWxzZSxcbiAgICAgIHNldFRyYW5zZm9ybU9yaWdpbjogKCkgPT4ge30sXG4gICAgICBzZXRQb3NpdGlvbjogKCkgPT4ge30sXG4gICAgICBzZXRNYXhIZWlnaHQ6ICgpID0+IHt9LFxuICAgICAgc2V0QXR0ckZvck9wdGlvbkF0SW5kZXg6ICgpID0+IHt9LFxuICAgICAgcm1BdHRyRm9yT3B0aW9uQXRJbmRleDogKCkgPT4ge30sXG4gICAgICBhZGRDbGFzc0Zvck9wdGlvbkF0SW5kZXg6ICgpID0+IHt9LFxuICAgICAgcm1DbGFzc0Zvck9wdGlvbkF0SW5kZXg6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7IU1EQ01lbnVBZGFwdGVyfSBhZGFwdGVyICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ01lbnVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5jbGlja0hhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVQb3NzaWJsZVNlbGVjdGVkXyhldnQpO1xuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmtleWRvd25IYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlS2V5Ym9hcmREb3duXyhldnQpO1xuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmtleXVwSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZUtleWJvYXJkVXBfKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZG9jdW1lbnRDbGlja0hhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVEb2N1bWVudENsaWNrXyhldnQpO1xuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmlzT3Blbl8gPSBmYWxzZTtcbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLm9wZW5BbmltYXRpb25FbmRUaW1lcklkXyA9IDA7XG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5jbG9zZUFuaW1hdGlvbkVuZFRpbWVySWRfID0gMDtcbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLnNlbGVjdGVkVHJpZ2dlclRpbWVySWRfID0gMDtcbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFuaW1hdGlvblJlcXVlc3RJZF8gPSAwO1xuICAgIC8qKiBAcHJpdmF0ZSB7IXsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfX0gKi9cbiAgICB0aGlzLmRpbWVuc2lvbnNfO1xuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaXRlbUhlaWdodF87XG4gICAgLyoqIEBwcml2YXRlIHtDb3JuZXJ9ICovXG4gICAgdGhpcy5hbmNob3JDb3JuZXJfID0gQ29ybmVyLlRPUF9TVEFSVDtcbiAgICAvKiogQHByaXZhdGUge0FuY2hvck1hcmdpbn0gKi9cbiAgICB0aGlzLmFuY2hvck1hcmdpbl8gPSB7dG9wOiAwLCByaWdodDogMCwgYm90dG9tOiAwLCBsZWZ0OiAwfTtcbiAgICAvKiogQHByaXZhdGUgez9BdXRvTGF5b3V0TWVhc3VyZW1lbnRzfSAqL1xuICAgIHRoaXMubWVhc3VyZXNfID0gbnVsbDtcbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLnNlbGVjdGVkSW5kZXhfID0gLTE7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMucmVtZW1iZXJTZWxlY3Rpb25fID0gZmFsc2U7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMucXVpY2tPcGVuXyA9IGZhbHNlO1xuXG4gICAgLy8gQSBrZXl1cCBldmVudCBvbiB0aGUgbWVudSBuZWVkcyB0byBoYXZlIGEgY29ycmVzcG9uZGluZyBrZXlkb3duXG4gICAgLy8gZXZlbnQgb24gdGhlIG1lbnUuIElmIHRoZSB1c2VyIG9wZW5zIHRoZSBtZW51IHdpdGggYSBrZXlkb3duIGV2ZW50IG9uIGFcbiAgICAvLyBidXR0b24sIHRoZSBtZW51IHdpbGwgb25seSBnZXQgdGhlIGtleSB1cCBldmVudCBjYXVzaW5nIGJ1Z2d5IGJlaGF2aW9yIHdpdGggc2VsZWN0ZWQgZWxlbWVudHMuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMua2V5RG93bldpdGhpbk1lbnVfID0gZmFsc2U7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnN0IHtST09ULCBPUEVOfSA9IE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoUk9PVCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtST09UfSBjbGFzcyByZXF1aXJlZCBpbiByb290IGVsZW1lbnQuYCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmhhc05lY2Vzc2FyeURvbSgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlcXVpcmVkIERPTSBub2RlcyBtaXNzaW5nIGluICR7Uk9PVH0gY29tcG9uZW50LmApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKE9QRU4pKSB7XG4gICAgICB0aGlzLmlzT3Blbl8gPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMua2V5dXBIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXJfKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VsZWN0ZWRUcmlnZ2VyVGltZXJJZF8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLm9wZW5BbmltYXRpb25FbmRUaW1lcklkXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuY2xvc2VBbmltYXRpb25FbmRUaW1lcklkXyk7XG4gICAgLy8gQ2FuY2VsIGFueSBjdXJyZW50bHkgcnVubmluZyBhbmltYXRpb25zLlxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uUmVxdWVzdElkXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMua2V5dXBIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXIodGhpcy5kb2N1bWVudENsaWNrSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUNvcm5lcn0gY29ybmVyIERlZmF1bHQgYW5jaG9yIGNvcm5lciBhbGlnbm1lbnQgb2YgdG9wLWxlZnQgbWVudSBjb3JuZXIuXG4gICAqL1xuICBzZXRBbmNob3JDb3JuZXIoY29ybmVyKSB7XG4gICAgdGhpcy5hbmNob3JDb3JuZXJfID0gY29ybmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUFuY2hvck1hcmdpbn0gbWFyZ2luIDQtcGxldCBvZiBtYXJnaW5zIGZyb20gYW5jaG9yLlxuICAgKi9cbiAgc2V0QW5jaG9yTWFyZ2luKG1hcmdpbikge1xuICAgIHRoaXMuYW5jaG9yTWFyZ2luXy50b3AgPSB0eXBlb2YgbWFyZ2luLnRvcCA9PT0gJ251bWJlcicgPyBtYXJnaW4udG9wIDogMDtcbiAgICB0aGlzLmFuY2hvck1hcmdpbl8ucmlnaHQgPSB0eXBlb2YgbWFyZ2luLnJpZ2h0ID09PSAnbnVtYmVyJyA/IG1hcmdpbi5yaWdodCA6IDA7XG4gICAgdGhpcy5hbmNob3JNYXJnaW5fLmJvdHRvbSA9IHR5cGVvZiBtYXJnaW4uYm90dG9tID09PSAnbnVtYmVyJyA/IG1hcmdpbi5ib3R0b20gOiAwO1xuICAgIHRoaXMuYW5jaG9yTWFyZ2luXy5sZWZ0ID0gdHlwZW9mIG1hcmdpbi5sZWZ0ID09PSAnbnVtYmVyJyA/IG1hcmdpbi5sZWZ0IDogMDtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHJlbWVtYmVyU2VsZWN0aW9uICovXG4gIHNldFJlbWVtYmVyU2VsZWN0aW9uKHJlbWVtYmVyU2VsZWN0aW9uKSB7XG4gICAgdGhpcy5yZW1lbWJlclNlbGVjdGlvbl8gPSByZW1lbWJlclNlbGVjdGlvbjtcbiAgICB0aGlzLnNldFNlbGVjdGVkSW5kZXgoLTEpO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gcXVpY2tPcGVuICovXG4gIHNldFF1aWNrT3BlbihxdWlja09wZW4pIHtcbiAgICB0aGlzLnF1aWNrT3Blbl8gPSBxdWlja09wZW47XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/bnVtYmVyfSBmb2N1c0luZGV4XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmb2N1c09uT3Blbl8oZm9jdXNJbmRleCkge1xuICAgIGlmIChmb2N1c0luZGV4ID09PSBudWxsKSB7XG4gICAgICAvLyBJZiB0aGlzIGluc3RhbmNlIG9mIE1EQ01lbnUgcmVtZW1iZXJzIHNlbGVjdGlvbnMsIGFuZCB0aGUgdXNlciBoYXNcbiAgICAgIC8vIG1hZGUgYSBzZWxlY3Rpb24sIHRoZW4gZm9jdXMgdGhlIGxhc3Qgc2VsZWN0ZWQgaXRlbVxuICAgICAgaWYgKHRoaXMucmVtZW1iZXJTZWxlY3Rpb25fICYmIHRoaXMuc2VsZWN0ZWRJbmRleF8gPj0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4Xyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1cygpO1xuICAgICAgLy8gSWYgdGhhdCBkb2Vzbid0IHdvcmssIGZvY3VzIGZpcnN0IGl0ZW0gaW5zdGVhZC5cbiAgICAgIGlmICghdGhpcy5hZGFwdGVyXy5pc0ZvY3VzZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgoMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleChmb2N1c0luZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGNsaWNrcyBhbmQgY2FuY2VsIHRoZSBtZW51IGlmIG5vdCBhIGNoaWxkIGxpc3QtaXRlbVxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVEb2N1bWVudENsaWNrXyhldnQpIHtcbiAgICBsZXQgZWwgPSBldnQudGFyZ2V0O1xuXG4gICAgd2hpbGUgKGVsICYmIGVsICE9PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmdldEluZGV4Rm9yRXZlbnRUYXJnZXQoZWwpICE9PSAtMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlDYW5jZWwoKTtcbiAgICB0aGlzLmNsb3NlKGV2dCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBrZXlzIHRoYXQgd2Ugd2FudCB0byByZXBlYXQgb24gaG9sZCAodGFiIGFuZCBhcnJvd3MpLlxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVLZXlib2FyZERvd25fKGV2dCkge1xuICAgIC8vIERvIG5vdGhpbmcgaWYgQWx0LCBDdHJsIG9yIE1ldGEgYXJlIHByZXNzZWQuXG4gICAgaWYgKGV2dC5hbHRLZXkgfHwgZXZ0LmN0cmxLZXkgfHwgZXZ0Lm1ldGFLZXkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHtrZXlDb2RlLCBrZXksIHNoaWZ0S2V5fSA9IGV2dDtcbiAgICBjb25zdCBpc1RhYiA9IGtleSA9PT0gJ1RhYicgfHwga2V5Q29kZSA9PT0gOTtcbiAgICBjb25zdCBpc0Fycm93VXAgPSBrZXkgPT09ICdBcnJvd1VwJyB8fCBrZXlDb2RlID09PSAzODtcbiAgICBjb25zdCBpc0Fycm93RG93biA9IGtleSA9PT0gJ0Fycm93RG93bicgfHwga2V5Q29kZSA9PT0gNDA7XG4gICAgY29uc3QgaXNTcGFjZSA9IGtleSA9PT0gJ1NwYWNlJyB8fCBrZXlDb2RlID09PSAzMjtcbiAgICBjb25zdCBpc0VudGVyID0ga2V5ID09PSAnRW50ZXInIHx8IGtleUNvZGUgPT09IDEzO1xuICAgIC8vIFRoZSBtZW51IG5lZWRzIHRvIGtub3cgaWYgdGhlIGtleWRvd24gZXZlbnQgd2FzIHRyaWdnZXJlZCBvbiB0aGUgbWVudVxuICAgIHRoaXMua2V5RG93bldpdGhpbk1lbnVfID0gaXNFbnRlciB8fCBpc1NwYWNlO1xuXG4gICAgY29uc3QgZm9jdXNlZEl0ZW1JbmRleCA9IHRoaXMuYWRhcHRlcl8uZ2V0Rm9jdXNlZEl0ZW1JbmRleCgpO1xuICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSB0aGlzLmFkYXB0ZXJfLmdldE51bWJlck9mSXRlbXMoKSAtIDE7XG5cbiAgICBpZiAoc2hpZnRLZXkgJiYgaXNUYWIgJiYgZm9jdXNlZEl0ZW1JbmRleCA9PT0gMCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KGxhc3RJdGVtSW5kZXgpO1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFzaGlmdEtleSAmJiBpc1RhYiAmJiBmb2N1c2VkSXRlbUluZGV4ID09PSBsYXN0SXRlbUluZGV4KSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgoMCk7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgQXJyb3d7VXAsRG93bn0gYW5kIHNwYWNlIGRvIG5vdCBjYXVzZSBpbmFkdmVydGVudCBzY3JvbGxpbmdcbiAgICBpZiAoaXNBcnJvd1VwIHx8IGlzQXJyb3dEb3duIHx8IGlzU3BhY2UpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGlmIChpc0Fycm93VXApIHtcbiAgICAgIGlmIChmb2N1c2VkSXRlbUluZGV4ID09PSAwIHx8IHRoaXMuYWRhcHRlcl8uaXNGb2N1c2VkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KGxhc3RJdGVtSW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KGZvY3VzZWRJdGVtSW5kZXggLSAxKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzQXJyb3dEb3duKSB7XG4gICAgICBpZiAoZm9jdXNlZEl0ZW1JbmRleCA9PT0gbGFzdEl0ZW1JbmRleCB8fCB0aGlzLmFkYXB0ZXJfLmlzRm9jdXNlZCgpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleCgwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleChmb2N1c2VkSXRlbUluZGV4ICsgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGtleXMgdGhhdCB3ZSBkb24ndCB3YW50IHRvIHJlcGVhdCBvbiBob2xkIChFbnRlciwgU3BhY2UsIEVzY2FwZSkuXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZUtleWJvYXJkVXBfKGV2dCkge1xuICAgIC8vIERvIG5vdGhpbmcgaWYgQWx0LCBDdHJsIG9yIE1ldGEgYXJlIHByZXNzZWQuXG4gICAgaWYgKGV2dC5hbHRLZXkgfHwgZXZ0LmN0cmxLZXkgfHwgZXZ0Lm1ldGFLZXkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHtrZXlDb2RlLCBrZXl9ID0gZXZ0O1xuICAgIGNvbnN0IGlzRW50ZXIgPSBrZXkgPT09ICdFbnRlcicgfHwga2V5Q29kZSA9PT0gMTM7XG4gICAgY29uc3QgaXNTcGFjZSA9IGtleSA9PT0gJ1NwYWNlJyB8fCBrZXlDb2RlID09PSAzMjtcbiAgICBjb25zdCBpc0VzY2FwZSA9IGtleSA9PT0gJ0VzY2FwZScgfHwga2V5Q29kZSA9PT0gMjc7XG5cbiAgICBpZiAoaXNFbnRlciB8fCBpc1NwYWNlKSB7XG4gICAgICAvLyBJZiB0aGUga2V5ZG93biBldmVudCBkaWRuJ3Qgb2NjdXIgb24gdGhlIG1lbnUsIHRoZW4gaXQgc2hvdWxkXG4gICAgICAvLyBkaXNyZWdhcmQgdGhlIHBvc3NpYmxlIHNlbGVjdGVkIGV2ZW50LlxuICAgICAgaWYgKHRoaXMua2V5RG93bldpdGhpbk1lbnVfKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUG9zc2libGVTZWxlY3RlZF8oZXZ0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMua2V5RG93bldpdGhpbk1lbnVfID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlzRXNjYXBlKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNhbmNlbCgpO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZVBvc3NpYmxlU2VsZWN0ZWRfKGV2dCkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmdldEF0dHJpYnV0ZUZvckV2ZW50VGFyZ2V0KGV2dC50YXJnZXQsIHN0cmluZ3MuQVJJQV9ESVNBQkxFRF9BVFRSKSA9PT0gJ3RydWUnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRhcmdldEluZGV4ID0gdGhpcy5hZGFwdGVyXy5nZXRJbmRleEZvckV2ZW50VGFyZ2V0KGV2dC50YXJnZXQpO1xuICAgIGlmICh0YXJnZXRJbmRleCA8IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRGVib3VuY2UgbXVsdGlwbGUgc2VsZWN0aW9uc1xuICAgIGlmICh0aGlzLnNlbGVjdGVkVHJpZ2dlclRpbWVySWRfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRUcmlnZ2VyVGltZXJJZF8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRUcmlnZ2VyVGltZXJJZF8gPSAwO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgaWYgKHRoaXMucmVtZW1iZXJTZWxlY3Rpb25fKSB7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRJbmRleCh0YXJnZXRJbmRleCk7XG4gICAgICB9XG4gICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeVNlbGVjdGVkKHtpbmRleDogdGFyZ2V0SW5kZXh9KTtcbiAgICB9LCBudW1iZXJzLlNFTEVDVEVEX1RSSUdHRVJfREVMQVkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge0F1dG9MYXlvdXRNZWFzdXJlbWVudHN9IE1lYXN1cmVtZW50cyB1c2VkIHRvIHBvc2l0aW9uIG1lbnUgcG9wdXAuXG4gICAqL1xuICBnZXRBdXRvTGF5b3V0TWVhc3VyZW1lbnRzXygpIHtcbiAgICBjb25zdCBhbmNob3JSZWN0ID0gdGhpcy5hZGFwdGVyXy5nZXRBbmNob3JEaW1lbnNpb25zKCk7XG4gICAgY29uc3Qgdmlld3BvcnQgPSB0aGlzLmFkYXB0ZXJfLmdldFdpbmRvd0RpbWVuc2lvbnMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICB2aWV3cG9ydDogdmlld3BvcnQsXG4gICAgICB2aWV3cG9ydERpc3RhbmNlOiB7XG4gICAgICAgIHRvcDogYW5jaG9yUmVjdC50b3AsXG4gICAgICAgIHJpZ2h0OiB2aWV3cG9ydC53aWR0aCAtIGFuY2hvclJlY3QucmlnaHQsXG4gICAgICAgIGxlZnQ6IGFuY2hvclJlY3QubGVmdCxcbiAgICAgICAgYm90dG9tOiB2aWV3cG9ydC5oZWlnaHQgLSBhbmNob3JSZWN0LmJvdHRvbSxcbiAgICAgIH0sXG4gICAgICBhbmNob3JIZWlnaHQ6IGFuY2hvclJlY3QuaGVpZ2h0LFxuICAgICAgYW5jaG9yV2lkdGg6IGFuY2hvclJlY3Qud2lkdGgsXG4gICAgICBtZW51SGVpZ2h0OiB0aGlzLmRpbWVuc2lvbnNfLmhlaWdodCxcbiAgICAgIG1lbnVXaWR0aDogdGhpcy5kaW1lbnNpb25zXy53aWR0aCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGVzIHRoZSBjb3JuZXIgb2YgdGhlIGFuY2hvciBmcm9tIHdoaWNoIHRvIGFuaW1hdGUgYW5kIHBvc2l0aW9uIHRoZSBtZW51LlxuICAgKiBAcmV0dXJuIHtDb3JuZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRPcmlnaW5Db3JuZXJfKCkge1xuICAgIC8vIERlZmF1bHRzOiBvcGVuIGZyb20gdGhlIHRvcCBsZWZ0LlxuICAgIGxldCBjb3JuZXIgPSBDb3JuZXIuVE9QX0xFRlQ7XG5cbiAgICBjb25zdCB7dmlld3BvcnREaXN0YW5jZSwgYW5jaG9ySGVpZ2h0LCBhbmNob3JXaWR0aCwgbWVudUhlaWdodCwgbWVudVdpZHRofSA9IHRoaXMubWVhc3VyZXNfO1xuICAgIGNvbnN0IGlzQm90dG9tQWxpZ25lZCA9IEJvb2xlYW4odGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LkJPVFRPTSk7XG4gICAgY29uc3QgYXZhaWxhYmxlVG9wID0gaXNCb3R0b21BbGlnbmVkID8gdmlld3BvcnREaXN0YW5jZS50b3AgKyBhbmNob3JIZWlnaHQgKyB0aGlzLmFuY2hvck1hcmdpbl8uYm90dG9tXG4gICAgICA6IHZpZXdwb3J0RGlzdGFuY2UudG9wICsgdGhpcy5hbmNob3JNYXJnaW5fLnRvcDtcbiAgICBjb25zdCBhdmFpbGFibGVCb3R0b20gPSBpc0JvdHRvbUFsaWduZWQgPyB2aWV3cG9ydERpc3RhbmNlLmJvdHRvbSAtIHRoaXMuYW5jaG9yTWFyZ2luXy5ib3R0b21cbiAgICAgIDogdmlld3BvcnREaXN0YW5jZS5ib3R0b20gKyBhbmNob3JIZWlnaHQgLSB0aGlzLmFuY2hvck1hcmdpbl8udG9wO1xuXG4gICAgY29uc3QgdG9wT3ZlcmZsb3cgPSBtZW51SGVpZ2h0IC0gYXZhaWxhYmxlVG9wO1xuICAgIGNvbnN0IGJvdHRvbU92ZXJmbG93ID0gbWVudUhlaWdodCAtIGF2YWlsYWJsZUJvdHRvbTtcbiAgICBpZiAoYm90dG9tT3ZlcmZsb3cgPiAwICYmIHRvcE92ZXJmbG93IDwgYm90dG9tT3ZlcmZsb3cpIHtcbiAgICAgIGNvcm5lciB8PSBDb3JuZXJCaXQuQk9UVE9NO1xuICAgIH1cblxuICAgIGNvbnN0IGlzUnRsID0gdGhpcy5hZGFwdGVyXy5pc1J0bCgpO1xuICAgIGNvbnN0IGlzRmxpcFJ0bCA9IEJvb2xlYW4odGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LkZMSVBfUlRMKTtcbiAgICBjb25zdCBhdm9pZEhvcml6b250YWxPdmVybGFwID0gQm9vbGVhbih0aGlzLmFuY2hvckNvcm5lcl8gJiBDb3JuZXJCaXQuUklHSFQpO1xuICAgIGNvbnN0IGlzQWxpZ25lZFJpZ2h0ID0gKGF2b2lkSG9yaXpvbnRhbE92ZXJsYXAgJiYgIWlzUnRsKSB8fFxuICAgICAgKCFhdm9pZEhvcml6b250YWxPdmVybGFwICYmIGlzRmxpcFJ0bCAmJiBpc1J0bCk7XG4gICAgY29uc3QgYXZhaWxhYmxlTGVmdCA9IGlzQWxpZ25lZFJpZ2h0ID8gdmlld3BvcnREaXN0YW5jZS5sZWZ0ICsgYW5jaG9yV2lkdGggKyB0aGlzLmFuY2hvck1hcmdpbl8ucmlnaHQgOlxuICAgICAgdmlld3BvcnREaXN0YW5jZS5sZWZ0ICsgdGhpcy5hbmNob3JNYXJnaW5fLmxlZnQ7XG4gICAgY29uc3QgYXZhaWxhYmxlUmlnaHQgPSBpc0FsaWduZWRSaWdodCA/IHZpZXdwb3J0RGlzdGFuY2UucmlnaHQgLSB0aGlzLmFuY2hvck1hcmdpbl8ucmlnaHQgOlxuICAgICAgdmlld3BvcnREaXN0YW5jZS5yaWdodCArIGFuY2hvcldpZHRoIC0gdGhpcy5hbmNob3JNYXJnaW5fLmxlZnQ7XG5cbiAgICBjb25zdCBsZWZ0T3ZlcmZsb3cgPSBtZW51V2lkdGggLSBhdmFpbGFibGVMZWZ0O1xuICAgIGNvbnN0IHJpZ2h0T3ZlcmZsb3cgPSBtZW51V2lkdGggLSBhdmFpbGFibGVSaWdodDtcblxuICAgIGlmICgobGVmdE92ZXJmbG93IDwgMCAmJiBpc0FsaWduZWRSaWdodCAmJiBpc1J0bCkgfHxcbiAgICAgICAgKGF2b2lkSG9yaXpvbnRhbE92ZXJsYXAgJiYgIWlzQWxpZ25lZFJpZ2h0ICYmIGxlZnRPdmVyZmxvdyA8IDApIHx8XG4gICAgICAgIChyaWdodE92ZXJmbG93ID4gMCAmJiBsZWZ0T3ZlcmZsb3cgPCByaWdodE92ZXJmbG93KSkge1xuICAgICAgY29ybmVyIHw9IENvcm5lckJpdC5SSUdIVDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29ybmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29ybmVyfSBjb3JuZXIgT3JpZ2luIGNvcm5lciBvZiB0aGUgbWVudS5cbiAgICogQHJldHVybiB7bnVtYmVyfSBIb3Jpem9udGFsIG9mZnNldCBvZiBtZW51IG9yaWdpbiBjb3JuZXIgZnJvbSBjb3JyZXNwb25kaW5nIGFuY2hvciBjb3JuZXIuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRIb3Jpem9udGFsT3JpZ2luT2Zmc2V0Xyhjb3JuZXIpIHtcbiAgICBjb25zdCB7YW5jaG9yV2lkdGh9ID0gdGhpcy5tZWFzdXJlc187XG4gICAgY29uc3QgaXNSaWdodEFsaWduZWQgPSBCb29sZWFuKGNvcm5lciAmIENvcm5lckJpdC5SSUdIVCk7XG4gICAgY29uc3QgYXZvaWRIb3Jpem9udGFsT3ZlcmxhcCA9IEJvb2xlYW4odGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LlJJR0hUKTtcbiAgICBsZXQgeCA9IDA7XG4gICAgaWYgKGlzUmlnaHRBbGlnbmVkKSB7XG4gICAgICBjb25zdCByaWdodE9mZnNldCA9IGF2b2lkSG9yaXpvbnRhbE92ZXJsYXAgPyBhbmNob3JXaWR0aCAtIHRoaXMuYW5jaG9yTWFyZ2luXy5sZWZ0IDogdGhpcy5hbmNob3JNYXJnaW5fLnJpZ2h0O1xuICAgICAgeCA9IHJpZ2h0T2Zmc2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsZWZ0T2Zmc2V0ID0gYXZvaWRIb3Jpem9udGFsT3ZlcmxhcCA/IGFuY2hvcldpZHRoIC0gdGhpcy5hbmNob3JNYXJnaW5fLnJpZ2h0IDogdGhpcy5hbmNob3JNYXJnaW5fLmxlZnQ7XG4gICAgICB4ID0gbGVmdE9mZnNldDtcbiAgICB9XG4gICAgcmV0dXJuIHg7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb3JuZXJ9IGNvcm5lciBPcmlnaW4gY29ybmVyIG9mIHRoZSBtZW51LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFZlcnRpY2FsIG9mZnNldCBvZiBtZW51IG9yaWdpbiBjb3JuZXIgZnJvbSBjb3JyZXNwb25kaW5nIGFuY2hvciBjb3JuZXIuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRWZXJ0aWNhbE9yaWdpbk9mZnNldF8oY29ybmVyKSB7XG4gICAgY29uc3Qge3ZpZXdwb3J0LCB2aWV3cG9ydERpc3RhbmNlLCBhbmNob3JIZWlnaHQsIG1lbnVIZWlnaHR9ID0gdGhpcy5tZWFzdXJlc187XG4gICAgY29uc3QgaXNCb3R0b21BbGlnbmVkID0gQm9vbGVhbihjb3JuZXIgJiBDb3JuZXJCaXQuQk9UVE9NKTtcbiAgICBjb25zdCB7TUFSR0lOX1RPX0VER0V9ID0gTURDTWVudUZvdW5kYXRpb24ubnVtYmVycztcbiAgICBjb25zdCBhdm9pZFZlcnRpY2FsT3ZlcmxhcCA9IEJvb2xlYW4odGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LkJPVFRPTSk7XG4gICAgY29uc3QgY2FuT3ZlcmxhcFZlcnRpY2FsbHkgPSAhYXZvaWRWZXJ0aWNhbE92ZXJsYXA7XG4gICAgbGV0IHkgPSAwO1xuXG4gICAgaWYgKGlzQm90dG9tQWxpZ25lZCkge1xuICAgICAgeSA9IGF2b2lkVmVydGljYWxPdmVybGFwID8gYW5jaG9ySGVpZ2h0IC0gdGhpcy5hbmNob3JNYXJnaW5fLnRvcCA6IC10aGlzLmFuY2hvck1hcmdpbl8uYm90dG9tO1xuICAgICAgLy8gYWRqdXN0IGZvciB3aGVuIG1lbnUgY2FuIG92ZXJsYXAgYW5jaG9yLCBidXQgdG9vIHRhbGwgdG8gYmUgYWxpZ25lZCB0byBib3R0b21cbiAgICAgIC8vIGFuY2hvciBjb3JuZXIuIEJvdHRvbSBtYXJnaW4gaXMgaWdub3JlZCBpbiBzdWNoIGNhc2VzLlxuICAgICAgaWYgKGNhbk92ZXJsYXBWZXJ0aWNhbGx5ICYmIG1lbnVIZWlnaHQgPiB2aWV3cG9ydERpc3RhbmNlLnRvcCArIGFuY2hvckhlaWdodCkge1xuICAgICAgICB5ID0gLShNYXRoLm1pbihtZW51SGVpZ2h0LCB2aWV3cG9ydC5oZWlnaHQgLSBNQVJHSU5fVE9fRURHRSkgLSAodmlld3BvcnREaXN0YW5jZS50b3AgKyBhbmNob3JIZWlnaHQpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgeSA9IGF2b2lkVmVydGljYWxPdmVybGFwID8gKGFuY2hvckhlaWdodCArIHRoaXMuYW5jaG9yTWFyZ2luXy5ib3R0b20pIDogdGhpcy5hbmNob3JNYXJnaW5fLnRvcDtcbiAgICAgIC8vIGFkanVzdCBmb3Igd2hlbiBtZW51IGNhbiBvdmVybGFwIGFuY2hvciwgYnV0IHRvbyB0YWxsIHRvIGJlIGFsaWduZWQgdG8gdG9wXG4gICAgICAvLyBhbmNob3IgY29ybmVycy4gVG9wIG1hcmdpbiBpcyBpZ25vcmVkIGluIHRoYXQgY2FzZS5cbiAgICAgIGlmIChjYW5PdmVybGFwVmVydGljYWxseSAmJiBtZW51SGVpZ2h0ID4gdmlld3BvcnREaXN0YW5jZS5ib3R0b20gKyBhbmNob3JIZWlnaHQpIHtcbiAgICAgICAgeSA9IC0oTWF0aC5taW4obWVudUhlaWdodCwgdmlld3BvcnQuaGVpZ2h0IC0gTUFSR0lOX1RPX0VER0UpIC0gKHZpZXdwb3J0RGlzdGFuY2UuYm90dG9tICsgYW5jaG9ySGVpZ2h0KSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB5O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29ybmVyfSBjb3JuZXIgT3JpZ2luIGNvcm5lciBvZiB0aGUgbWVudS5cbiAgICogQHJldHVybiB7bnVtYmVyfSBNYXhpbXVtIGhlaWdodCBvZiB0aGUgbWVudSwgYmFzZWQgb24gYXZhaWxhYmxlIHNwYWNlLiAwIGluZGljYXRlcyBzaG91bGQgbm90IGJlIHNldC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldE1lbnVNYXhIZWlnaHRfKGNvcm5lcikge1xuICAgIGxldCBtYXhIZWlnaHQgPSAwO1xuICAgIGNvbnN0IHt2aWV3cG9ydERpc3RhbmNlfSA9IHRoaXMubWVhc3VyZXNfO1xuICAgIGNvbnN0IGlzQm90dG9tQWxpZ25lZCA9IEJvb2xlYW4oY29ybmVyICYgQ29ybmVyQml0LkJPVFRPTSk7XG5cbiAgICAvLyBXaGVuIG1heGltdW0gaGVpZ2h0IGlzIG5vdCBzcGVjaWZpZWQsIGl0IGlzIGhhbmRsZWQgZnJvbSBjc3MuXG4gICAgaWYgKHRoaXMuYW5jaG9yQ29ybmVyXyAmIENvcm5lckJpdC5CT1RUT00pIHtcbiAgICAgIGlmIChpc0JvdHRvbUFsaWduZWQpIHtcbiAgICAgICAgbWF4SGVpZ2h0ID0gdmlld3BvcnREaXN0YW5jZS50b3AgKyB0aGlzLmFuY2hvck1hcmdpbl8udG9wO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWF4SGVpZ2h0ID0gdmlld3BvcnREaXN0YW5jZS5ib3R0b20gLSB0aGlzLmFuY2hvck1hcmdpbl8uYm90dG9tO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXhIZWlnaHQ7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYXV0b1Bvc2l0aW9uXygpIHtcbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaGFzQW5jaG9yKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDb21wdXRlIG1lYXN1cmVtZW50cyBmb3IgYXV0b3Bvc2l0aW9uIG1ldGhvZHMgcmV1c2UuXG4gICAgdGhpcy5tZWFzdXJlc18gPSB0aGlzLmdldEF1dG9MYXlvdXRNZWFzdXJlbWVudHNfKCk7XG5cbiAgICBjb25zdCBjb3JuZXIgPSB0aGlzLmdldE9yaWdpbkNvcm5lcl8oKTtcbiAgICBjb25zdCBtYXhNZW51SGVpZ2h0ID0gdGhpcy5nZXRNZW51TWF4SGVpZ2h0Xyhjb3JuZXIpO1xuICAgIGxldCB2ZXJ0aWNhbEFsaWdubWVudCA9IChjb3JuZXIgJiBDb3JuZXJCaXQuQk9UVE9NKSA/ICdib3R0b20nIDogJ3RvcCc7XG4gICAgbGV0IGhvcml6b250YWxBbGlnbm1lbnQgPSAoY29ybmVyICYgQ29ybmVyQml0LlJJR0hUKSA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgY29uc3QgaG9yaXpvbnRhbE9mZnNldCA9IHRoaXMuZ2V0SG9yaXpvbnRhbE9yaWdpbk9mZnNldF8oY29ybmVyKTtcbiAgICBjb25zdCB2ZXJ0aWNhbE9mZnNldCA9IHRoaXMuZ2V0VmVydGljYWxPcmlnaW5PZmZzZXRfKGNvcm5lcik7XG4gICAgY29uc3QgcG9zaXRpb24gPSB7XG4gICAgICBbaG9yaXpvbnRhbEFsaWdubWVudF06IGhvcml6b250YWxPZmZzZXQgPyBob3Jpem9udGFsT2Zmc2V0ICsgJ3B4JyA6ICcwJyxcbiAgICAgIFt2ZXJ0aWNhbEFsaWdubWVudF06IHZlcnRpY2FsT2Zmc2V0ID8gdmVydGljYWxPZmZzZXQgKyAncHgnIDogJzAnLFxuICAgIH07XG4gICAgY29uc3Qge2FuY2hvcldpZHRoLCBtZW51SGVpZ2h0LCBtZW51V2lkdGh9ID0gdGhpcy5tZWFzdXJlc187XG4gICAgLy8gQ2VudGVyIGFsaWduIHdoZW4gYW5jaG9yIHdpZHRoIGlzIGNvbXBhcmFibGUgb3IgZ3JlYXRlciB0aGFuIG1lbnUsIG90aGVyd2lzZSBrZWVwIGNvcm5lci5cbiAgICBpZiAoYW5jaG9yV2lkdGggLyBtZW51V2lkdGggPiBudW1iZXJzLkFOQ0hPUl9UT19NRU5VX1dJRFRIX1JBVElPKSB7XG4gICAgICBob3Jpem9udGFsQWxpZ25tZW50ID0gJ2NlbnRlcic7XG4gICAgfVxuXG4gICAgLy8gQWRqdXN0IHZlcnRpY2FsIG9yaWdpbiB3aGVuIG1lbnUgaXMgcG9zaXRpb25lZCB3aXRoIHNpZ25pZmljYW50IG9mZnNldCBmcm9tIGFuY2hvci4gVGhpcyBpcyBkb25lIHNvIHRoYXRcbiAgICAvLyBzY2FsZSBhbmltYXRpb24gaXMgXCJhbmNob3JlZFwiIG9uIHRoZSBhbmNob3IuXG4gICAgaWYgKCEodGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LkJPVFRPTSkgJiZcbiAgICAgICAgTWF0aC5hYnModmVydGljYWxPZmZzZXQgLyBtZW51SGVpZ2h0KSA+IG51bWJlcnMuT0ZGU0VUX1RPX01FTlVfSEVJR0hUX1JBVElPKSB7XG4gICAgICBjb25zdCB2ZXJ0aWNhbE9mZnNldFBlcmNlbnQgPSBNYXRoLmFicyh2ZXJ0aWNhbE9mZnNldCAvIG1lbnVIZWlnaHQpICogMTAwO1xuICAgICAgY29uc3Qgb3JpZ2luUGVyY2VudCA9IChjb3JuZXIgJiBDb3JuZXJCaXQuQk9UVE9NKSA/IDEwMCAtIHZlcnRpY2FsT2Zmc2V0UGVyY2VudCA6IHZlcnRpY2FsT2Zmc2V0UGVyY2VudDtcbiAgICAgIHZlcnRpY2FsQWxpZ25tZW50ID0gTWF0aC5yb3VuZChvcmlnaW5QZXJjZW50ICogMTAwKSAvIDEwMCArICclJztcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnNldFRyYW5zZm9ybU9yaWdpbihgJHtob3Jpem9udGFsQWxpZ25tZW50fSAke3ZlcnRpY2FsQWxpZ25tZW50fWApO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0UG9zaXRpb24ocG9zaXRpb24pO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0TWF4SGVpZ2h0KG1heE1lbnVIZWlnaHQgPyBtYXhNZW51SGVpZ2h0ICsgJ3B4JyA6ICcnKTtcblxuICAgIC8vIENsZWFyIG1lYXN1cmVzIGFmdGVyIHBvc2l0aW9uaW5nIGlzIGNvbXBsZXRlLlxuICAgIHRoaXMubWVhc3VyZXNfID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuIHRoZSBtZW51LlxuICAgKiBAcGFyYW0ge3tmb2N1c0luZGV4OiA/bnVtYmVyfT19IG9wdGlvbnNcbiAgICovXG4gIG9wZW4oe2ZvY3VzSW5kZXggPSBudWxsfSA9IHt9KSB7XG4gICAgdGhpcy5hZGFwdGVyXy5zYXZlRm9jdXMoKTtcblxuICAgIGlmICghdGhpcy5xdWlja09wZW5fKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQU5JTUFUSU5HX09QRU4pO1xuICAgIH1cblxuICAgIHRoaXMuYW5pbWF0aW9uUmVxdWVzdElkXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmRpbWVuc2lvbnNfID0gdGhpcy5hZGFwdGVyXy5nZXRJbm5lckRpbWVuc2lvbnMoKTtcbiAgICAgIHRoaXMuYXV0b1Bvc2l0aW9uXygpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENNZW51Rm91bmRhdGlvbi5jc3NDbGFzc2VzLk9QRU4pO1xuICAgICAgdGhpcy5mb2N1c09uT3Blbl8oZm9jdXNJbmRleCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcih0aGlzLmRvY3VtZW50Q2xpY2tIYW5kbGVyXyk7XG4gICAgICBpZiAoIXRoaXMucXVpY2tPcGVuXykge1xuICAgICAgICB0aGlzLm9wZW5BbmltYXRpb25FbmRUaW1lcklkXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMub3BlbkFuaW1hdGlvbkVuZFRpbWVySWRfID0gMDtcbiAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQU5JTUFUSU5HX09QRU4pO1xuICAgICAgICB9LCBudW1iZXJzLlRSQU5TSVRJT05fT1BFTl9EVVJBVElPTik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pc09wZW5fID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG1lbnUuXG4gICAqIEBwYXJhbSB7RXZlbnQ9fSBldnRcbiAgICovXG4gIGNsb3NlKGV2dCA9IG51bGwpIHtcbiAgICBjb25zdCB0YXJnZXRJc0Rpc2FibGVkID0gZXZ0ID9cbiAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0QXR0cmlidXRlRm9yRXZlbnRUYXJnZXQoZXZ0LnRhcmdldCwgc3RyaW5ncy5BUklBX0RJU0FCTEVEX0FUVFIpID09PSAndHJ1ZScgOlxuICAgICAgZmFsc2U7XG5cbiAgICBpZiAodGFyZ2V0SXNEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXIodGhpcy5kb2N1bWVudENsaWNrSGFuZGxlcl8pO1xuXG4gICAgaWYgKCF0aGlzLnF1aWNrT3Blbl8pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDTWVudUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkdfQ0xPU0VEKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENNZW51Rm91bmRhdGlvbi5jc3NDbGFzc2VzLk9QRU4pO1xuICAgICAgaWYgKCF0aGlzLnF1aWNrT3Blbl8pIHtcbiAgICAgICAgdGhpcy5jbG9zZUFuaW1hdGlvbkVuZFRpbWVySWRfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jbG9zZUFuaW1hdGlvbkVuZFRpbWVySWRfID0gMDtcbiAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQU5JTUFUSU5HX0NMT1NFRCk7XG4gICAgICAgIH0sIG51bWJlcnMuVFJBTlNJVElPTl9DTE9TRV9EVVJBVElPTik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pc09wZW5fID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5yZXN0b3JlRm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc09wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuXztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldFNlbGVjdGVkSW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJbmRleF87XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEluZGV4IG9mIHRoZSBpdGVtIHRvIHNldCBhcyBzZWxlY3RlZC5cbiAgICovXG4gIHNldFNlbGVjdGVkSW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPT09IHRoaXMuc2VsZWN0ZWRJbmRleF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2U2VsZWN0ZWRJbmRleCA9IHRoaXMuc2VsZWN0ZWRJbmRleF87XG4gICAgaWYgKHByZXZTZWxlY3RlZEluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucm1BdHRyRm9yT3B0aW9uQXRJbmRleChwcmV2U2VsZWN0ZWRJbmRleCwgJ2FyaWEtc2VsZWN0ZWQnKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucm1DbGFzc0Zvck9wdGlvbkF0SW5kZXgocHJldlNlbGVjdGVkSW5kZXgsIGNzc0NsYXNzZXMuU0VMRUNURURfTElTVF9JVEVNKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkSW5kZXhfID0gaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuYWRhcHRlcl8uZ2V0TnVtYmVyT2ZJdGVtcygpID8gaW5kZXggOiAtMTtcbiAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4XyA+PSAwKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJGb3JPcHRpb25BdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8sICdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3NGb3JPcHRpb25BdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8sIGNzc0NsYXNzZXMuU0VMRUNURURfTElTVF9JVEVNKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHtNRENNZW51Rm91bmRhdGlvbiwgQW5jaG9yTWFyZ2lufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAdHlwZSB7c3RyaW5nfHVuZGVmaW5lZH0gKi9cbmxldCBzdG9yZWRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWVfO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGNvcnJlY3QgdHJhbnNmb3JtIHByb3BlcnR5IHRvIHVzZSBvbiB0aGUgY3VycmVudCBicm93c2VyLlxuICogQHBhcmFtIHshV2luZG93fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWUoZ2xvYmFsT2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3RvcmVkVHJhbnNmb3JtUHJvcGVydHlOYW1lXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGNvbnN0IGVsID0gZ2xvYmFsT2JqLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHRyYW5zZm9ybVByb3BlcnR5TmFtZSA9ICgndHJhbnNmb3JtJyBpbiBlbC5zdHlsZSA/ICd0cmFuc2Zvcm0nIDogJ3dlYmtpdFRyYW5zZm9ybScpO1xuICAgIHN0b3JlZFRyYW5zZm9ybVByb3BlcnR5TmFtZV8gPSB0cmFuc2Zvcm1Qcm9wZXJ0eU5hbWU7XG4gIH1cblxuICByZXR1cm4gc3RvcmVkVHJhbnNmb3JtUHJvcGVydHlOYW1lXztcbn1cblxuLyoqXG4gKiBDbGFtcHMgYSB2YWx1ZSBiZXR3ZWVuIHRoZSBtaW5pbXVtIGFuZCB0aGUgbWF4aW11bSwgcmV0dXJuaW5nIHRoZSBjbGFtcGVkIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gbWluXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4XG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBtaW4gPSAwLCBtYXggPSAxKSB7XG4gIHJldHVybiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgdmFsdWUpKTtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGVhc2luZyB2YWx1ZSB0byBhcHBseSBhdCB0aW1lIHQsIGZvciBhIGdpdmVuIGN1YmljIGJlemllciBjdXJ2ZS5cbiAqIENvbnRyb2wgcG9pbnRzIFAwIGFuZCBQMyBhcmUgYXNzdW1lZCB0byBiZSAoMCwwKSBhbmQgKDEsMSksIHJlc3BlY3RpdmVseS5cbiAqIFBhcmFtZXRlcnMgYXJlIGFzIGZvbGxvd3M6XG4gKiAtIHRpbWU6IFRoZSBjdXJyZW50IHRpbWUgaW4gdGhlIGFuaW1hdGlvbiwgc2NhbGVkIGJldHdlZW4gMCBhbmQgMS5cbiAqIC0geDE6IFRoZSB4IHZhbHVlIG9mIGNvbnRyb2wgcG9pbnQgUDEuXG4gKiAtIHkxOiBUaGUgeSB2YWx1ZSBvZiBjb250cm9sIHBvaW50IFAxLlxuICogLSB4MjogVGhlIHggdmFsdWUgb2YgY29udHJvbCBwb2ludCBQMi5cbiAqIC0geTI6IFRoZSB5IHZhbHVlIG9mIGNvbnRyb2wgcG9pbnQgUDIuXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZVxuICogQHBhcmFtIHtudW1iZXJ9IHgxXG4gKiBAcGFyYW0ge251bWJlcn0geTFcbiAqIEBwYXJhbSB7bnVtYmVyfSB4MlxuICogQHBhcmFtIHtudW1iZXJ9IHkyXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGJlemllclByb2dyZXNzKHRpbWUsIHgxLCB5MSwgeDIsIHkyKSB7XG4gIHJldHVybiBnZXRCZXppZXJDb29yZGluYXRlXyhzb2x2ZVBvc2l0aW9uRnJvbVhWYWx1ZV8odGltZSwgeDEsIHgyKSwgeTEsIHkyKTtcbn1cblxuLyoqXG4gKiBDb21wdXRlIGEgc2luZ2xlIGNvb3JkaW5hdGUgYXQgYSBwb3NpdGlvbiBwb2ludCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBjMSBhbmQgYzIgYXJlIHRoZSBtYXRjaGluZyBjb29yZGluYXRlIG9uIGNvbnRyb2wgcG9pbnRzIFAxIGFuZCBQMiwgcmVzcGVjdGl2ZWx5LlxuICogQ29udHJvbCBwb2ludHMgUDAgYW5kIFAzIGFyZSBhc3N1bWVkIHRvIGJlICgwLDApIGFuZCAoMSwxKSwgcmVzcGVjdGl2ZWx5LlxuICogQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1saWJyYXJ5L2Jsb2IvbWFzdGVyL2Nsb3N1cmUvZ29vZy9tYXRoL2Jlemllci5qcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0XG4gKiBAcGFyYW0ge251bWJlcn0gYzFcbiAqIEBwYXJhbSB7bnVtYmVyfSBjMlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXRCZXppZXJDb29yZGluYXRlXyh0LCBjMSwgYzIpIHtcbiAgLy8gU3BlY2lhbCBjYXNlIHN0YXJ0IGFuZCBlbmQuXG4gIGlmICh0ID09PSAwIHx8IHQgPT09IDEpIHtcbiAgICByZXR1cm4gdDtcbiAgfVxuXG4gIC8vIFN0ZXAgb25lIC0gZnJvbSA0IHBvaW50cyB0byAzXG4gIGxldCBpYzAgPSB0ICogYzE7XG4gIGxldCBpYzEgPSBjMSArIHQgKiAoYzIgLSBjMSk7XG4gIGNvbnN0IGljMiA9IGMyICsgdCAqICgxIC0gYzIpO1xuXG4gIC8vIFN0ZXAgdHdvIC0gZnJvbSAzIHBvaW50cyB0byAyXG4gIGljMCArPSB0ICogKGljMSAtIGljMCk7XG4gIGljMSArPSB0ICogKGljMiAtIGljMSk7XG5cbiAgLy8gRmluYWwgc3RlcCAtIGxhc3QgcG9pbnRcbiAgcmV0dXJuIGljMCArIHQgKiAoaWMxIC0gaWMwKTtcbn1cblxuLyoqXG4gKiBQcm9qZWN0IGEgcG9pbnQgb250byB0aGUgQmV6aWVyIGN1cnZlLCBmcm9tIGEgZ2l2ZW4gWC4gQ2FsY3VsYXRlcyB0aGUgcG9zaXRpb24gdCBhbG9uZyB0aGUgY3VydmUuXG4gKiBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS9jbG9zdXJlLWxpYnJhcnkvYmxvYi9tYXN0ZXIvY2xvc3VyZS9nb29nL21hdGgvYmV6aWVyLmpzLlxuICogQHBhcmFtIHtudW1iZXJ9IHhWYWxcbiAqIEBwYXJhbSB7bnVtYmVyfSB4MVxuICogQHBhcmFtIHtudW1iZXJ9IHgyXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIHNvbHZlUG9zaXRpb25Gcm9tWFZhbHVlXyh4VmFsLCB4MSwgeDIpIHtcbiAgY29uc3QgRVBTSUxPTiA9IDFlLTY7XG4gIGNvbnN0IE1BWF9JVEVSQVRJT05TID0gODtcblxuICBpZiAoeFZhbCA8PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0gZWxzZSBpZiAoeFZhbCA+PSAxKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICAvLyBJbml0aWFsIGVzdGltYXRlIG9mIHQgdXNpbmcgbGluZWFyIGludGVycG9sYXRpb24uXG4gIGxldCB0ID0geFZhbDtcblxuICAvLyBUcnkgZ3JhZGllbnQgZGVzY2VudCB0byBzb2x2ZSBmb3IgdC4gSWYgaXQgd29ya3MsIGl0IGlzIHZlcnkgZmFzdC5cbiAgbGV0IHRNaW4gPSAwO1xuICBsZXQgdE1heCA9IDE7XG4gIGxldCB2YWx1ZSA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgTUFYX0lURVJBVElPTlM7IGkrKykge1xuICAgIHZhbHVlID0gZ2V0QmV6aWVyQ29vcmRpbmF0ZV8odCwgeDEsIHgyKTtcbiAgICBjb25zdCBkZXJpdmF0aXZlID0gKGdldEJlemllckNvb3JkaW5hdGVfKHQgKyBFUFNJTE9OLCB4MSwgeDIpIC0gdmFsdWUpIC8gRVBTSUxPTjtcbiAgICBpZiAoTWF0aC5hYnModmFsdWUgLSB4VmFsKSA8IEVQU0lMT04pIHtcbiAgICAgIHJldHVybiB0O1xuICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoZGVyaXZhdGl2ZSkgPCBFUFNJTE9OKSB7XG4gICAgICBicmVhaztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZhbHVlIDwgeFZhbCkge1xuICAgICAgICB0TWluID0gdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRNYXggPSB0O1xuICAgICAgfVxuICAgICAgdCAtPSAodmFsdWUgLSB4VmFsKSAvIGRlcml2YXRpdmU7XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgdGhlIGdyYWRpZW50IGRlc2NlbnQgZ290IHN0dWNrIGluIGEgbG9jYWwgbWluaW11bSwgZS5nLiBiZWNhdXNlXG4gIC8vIHRoZSBkZXJpdmF0aXZlIHdhcyBjbG9zZSB0byAwLCB1c2UgYSBEaWNob3RvbXkgcmVmaW5lbWVudCBpbnN0ZWFkLlxuICAvLyBXZSBsaW1pdCB0aGUgbnVtYmVyIG9mIGludGVyYXRpb25zIHRvIDguXG4gIGZvciAobGV0IGkgPSAwOyBNYXRoLmFicyh2YWx1ZSAtIHhWYWwpID4gRVBTSUxPTiAmJiBpIDwgTUFYX0lURVJBVElPTlM7IGkrKykge1xuICAgIGlmICh2YWx1ZSA8IHhWYWwpIHtcbiAgICAgIHRNaW4gPSB0O1xuICAgICAgdCA9ICh0ICsgdE1heCkgLyAyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0TWF4ID0gdDtcbiAgICAgIHQgPSAodCArIHRNaW4pIC8gMjtcbiAgICB9XG4gICAgdmFsdWUgPSBnZXRCZXppZXJDb29yZGluYXRlXyh0LCB4MSwgeDIpO1xuICB9XG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQge2dldFRyYW5zZm9ybVByb3BlcnR5TmFtZSwgY2xhbXAsIGJlemllclByb2dyZXNzfTtcbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBcbiAgICByZWY9XCJyb290XCIgXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiIFxuICAgIDpzdHlsZT1cInN0eWxlc1wiIFxuICAgIGNsYXNzPVwibWRjLW1lbnUgbWRjLXNpbXBsZS1tZW51XCIgXG4gICAgdGFiaW5kZXg9XCItMVwiPlxuICAgIDx1bCBcbiAgICAgIHJlZj1cIml0ZW1zXCIgXG4gICAgICBjbGFzcz1cIm1kYy1zaW1wbGUtbWVudV9faXRlbXMgbWRjLWxpc3RcIiBcbiAgICAgIHJvbGU9XCJtZW51XCIgXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgIDxzbG90Lz5cbiAgICA8L3VsPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBNRENNZW51Rm91bmRhdGlvbiB9IGZyb20gJ0BtYXRlcmlhbC9tZW51L2ZvdW5kYXRpb24nXG5pbXBvcnQgeyBnZXRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWUgfSBmcm9tICdAbWF0ZXJpYWwvbWVudS91dGlsJ1xuaW1wb3J0IHsgZW1pdEN1c3RvbUV2ZW50IH0gZnJvbSAnLi4vYmFzZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLW1lbnUnLFxuICBtb2RlbDoge1xuICAgIHByb3A6ICdvcGVuJyxcbiAgICBldmVudDogJ2NoYW5nZSdcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBvcGVuOiBbQm9vbGVhbiwgT2JqZWN0XSxcbiAgICAncXVpY2stb3Blbic6IEJvb2xlYW4sXG4gICAgJ2FuY2hvci1jb3JuZXInOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgICdhbmNob3ItbWFyZ2luJzogT2JqZWN0XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgc3R5bGVzOiB7fSxcbiAgICAgIGl0ZW1zOiBbXVxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBvcGVuOiAnb25PcGVuXycsXG4gICAgcXVpY2tPcGVuKG52KSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0UXVpY2tPcGVuKG52KVxuICAgIH0sXG4gICAgYW5jaG9yQ29ybmVyKG52KSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0QW5jaG9yQ29ybmVyKE51bWJlcihudikpXG4gICAgfSxcbiAgICBhbmNob3JNYXJnaW4obnYpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRBbmNob3JNYXJnaW4obnYpXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGNvbnN0IHJlZnJlc2hJdGVtcyA9ICgpID0+IHtcbiAgICAgIHRoaXMuaXRlbXMgPSBbXS5zbGljZS5jYWxsKFxuICAgICAgICB0aGlzLiRyZWZzLml0ZW1zLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZGMtbGlzdC1pdGVtW3JvbGVdJylcbiAgICAgIClcbiAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZScpXG4gICAgfVxuICAgIHRoaXMuc2xvdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gcmVmcmVzaEl0ZW1zKCkpXG4gICAgdGhpcy5zbG90T2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLiRlbCwge1xuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgc3VidHJlZTogdHJ1ZVxuICAgIH0pXG5cbiAgICB0aGlzLl9wcmV2aW91c0ZvY3VzID0gdW5kZWZpbmVkXG5cbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDTWVudUZvdW5kYXRpb24oe1xuICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpLFxuICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRkZWxldGUodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUpLFxuICAgICAgaGFzQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRyZWZzLnJvb3QuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSksXG4gICAgICBoYXNOZWNlc3NhcnlEb206ICgpID0+IEJvb2xlYW4odGhpcy4kcmVmcy5pdGVtcyksXG4gICAgICBnZXRBdHRyaWJ1dGVGb3JFdmVudFRhcmdldDogKHRhcmdldCwgYXR0cmlidXRlTmFtZSkgPT5cbiAgICAgICAgdGFyZ2V0LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSxcbiAgICAgIGdldElubmVyRGltZW5zaW9uczogKCkgPT4gKHtcbiAgICAgICAgd2lkdGg6IHRoaXMuJHJlZnMuaXRlbXMub2Zmc2V0V2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy4kcmVmcy5pdGVtcy5vZmZzZXRIZWlnaHRcbiAgICAgIH0pLFxuICAgICAgaGFzQW5jaG9yOiAoKSA9PlxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QucGFyZW50RWxlbWVudCAmJlxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ21kYy1tZW51LWFuY2hvcicpLFxuICAgICAgZ2V0QW5jaG9yRGltZW5zaW9uczogKCkgPT5cbiAgICAgICAgdGhpcy4kcmVmcy5yb290LnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBnZXRXaW5kb3dEaW1lbnNpb25zOiAoKSA9PiAoe1xuICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0XG4gICAgICB9KSxcbiAgICAgIGdldE51bWJlck9mSXRlbXM6ICgpID0+IHRoaXMuaXRlbXMubGVuZ3RoLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSxcbiAgICAgIHJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcjogaGFuZGxlciA9PlxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcjogaGFuZGxlciA9PlxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciksXG4gICAgICBnZXRJbmRleEZvckV2ZW50VGFyZ2V0OiB0YXJnZXQgPT4gdGhpcy5pdGVtcy5pbmRleE9mKHRhcmdldCksXG4gICAgICBub3RpZnlTZWxlY3RlZDogZXZ0RGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IGV2dCA9IHtcbiAgICAgICAgICBpbmRleDogZXZ0RGF0YS5pbmRleCxcbiAgICAgICAgICBpdGVtOiB0aGlzLml0ZW1zW2V2dERhdGEuaW5kZXhdXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgZmFsc2UpXG4gICAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdCcsIGV2dClcbiAgICAgICAgZW1pdEN1c3RvbUV2ZW50KHRoaXMuJGVsLCBNRENNZW51Rm91bmRhdGlvbi5zdHJpbmdzLlNFTEVDVEVEX0VWRU5ULCBldnQpXG4gICAgICB9LFxuICAgICAgbm90aWZ5Q2FuY2VsOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGZhbHNlKVxuICAgICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKVxuICAgICAgICBlbWl0Q3VzdG9tRXZlbnQodGhpcy4kZWwsIE1EQ01lbnVGb3VuZGF0aW9uLnN0cmluZ3MuQ0FOQ0VMX0VWRU5ULCB7fSlcbiAgICAgIH0sXG4gICAgICBzYXZlRm9jdXM6ICgpID0+IHtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNGb2N1cyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgIH0sXG4gICAgICByZXN0b3JlRm9jdXM6ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX3ByZXZpb3VzRm9jdXMpIHtcbiAgICAgICAgICB0aGlzLl9wcmV2aW91c0ZvY3VzLmZvY3VzKClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzRm9jdXNlZDogKCkgPT4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy4kcmVmcy5yb290LFxuICAgICAgZm9jdXM6ICgpID0+IHRoaXMuJHJlZnMucm9vdC5mb2N1cygpLFxuICAgICAgZ2V0Rm9jdXNlZEl0ZW1JbmRleDogKCkgPT4gdGhpcy5pdGVtcy5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLFxuICAgICAgZm9jdXNJdGVtQXRJbmRleDogaW5kZXggPT4gdGhpcy5pdGVtc1tpbmRleF0uZm9jdXMoKSxcbiAgICAgIGlzUnRsOiAoKSA9PlxuICAgICAgICBnZXRDb21wdXRlZFN0eWxlKHRoaXMuJHJlZnMucm9vdCkuZ2V0UHJvcGVydHlWYWx1ZSgnZGlyZWN0aW9uJykgPT09XG4gICAgICAgICdydGwnLFxuICAgICAgc2V0VHJhbnNmb3JtT3JpZ2luOiBvcmlnaW4gPT4ge1xuICAgICAgICB0aGlzLiRzZXQoXG4gICAgICAgICAgdGhpcy5zdHlsZXMsXG4gICAgICAgICAgYCR7Z2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lKHdpbmRvdyl9LW9yaWdpbmAsXG4gICAgICAgICAgb3JpZ2luXG4gICAgICAgIClcbiAgICAgIH0sXG4gICAgICBzZXRQb3NpdGlvbjogcG9zaXRpb24gPT4ge1xuICAgICAgICB0aGlzLiRzZXQodGhpcy5zdHlsZXMsICdsZWZ0JywgcG9zaXRpb24ubGVmdClcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuc3R5bGVzLCAncmlnaHQnLCBwb3NpdGlvbi5yaWdodClcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuc3R5bGVzLCAndG9wJywgcG9zaXRpb24udG9wKVxuICAgICAgICB0aGlzLiRzZXQodGhpcy5zdHlsZXMsICdib3R0b20nLCBwb3NpdGlvbi5ib3R0b20pXG4gICAgICB9LFxuICAgICAgc2V0TWF4SGVpZ2h0OiBoZWlnaHQgPT4ge1xuICAgICAgICB0aGlzLiRzZXQodGhpcy5zdHlsZXMsICdtYXgtaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgfSxcbiAgICAgIHNldEF0dHJGb3JPcHRpb25BdEluZGV4OiAoaW5kZXgsIGF0dHIsIHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSlcbiAgICAgIH0sXG4gICAgICBybUF0dHJGb3JPcHRpb25BdEluZGV4OiAoaW5kZXgsIGF0dHIpID0+IHtcbiAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0ucmVtb3ZlQXR0cmlidXRlKGF0dHIpXG4gICAgICB9LFxuICAgICAgYWRkQ2xhc3NGb3JPcHRpb25BdEluZGV4OiAoaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICB0aGlzLml0ZW1zW2luZGV4XS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSlcbiAgICAgIH0sXG4gICAgICBybUNsYXNzRm9yT3B0aW9uQXRJbmRleDogKGluZGV4LCBjbGFzc05hbWUpID0+IHtcbiAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJlZnJlc2hJdGVtcygpXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxuICAgIGlmICh0aGlzLmFuY2hvckNvcm5lciAhPT0gdm9pZCAwKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0QW5jaG9yQ29ybmVyKE51bWJlcih0aGlzLmFuY2hvckNvcm5lcikpXG4gICAgfVxuICAgIGlmICh0aGlzLmFuY2hvck1hcmdpbiAhPT0gdm9pZCAwKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0QW5jaG9yTWFyZ2luKHRoaXMuYW5jaG9yTWFyZ2luKVxuICAgIH1cbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLl9wcmV2aW91c0ZvY3VzID0gbnVsbFxuICAgIHRoaXMuc2xvdE9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KClcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgb25PcGVuXyh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZm91bmRhdGlvbi5vcGVuKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgPyB2YWx1ZSA6IHZvaWQgMClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZm91bmRhdGlvbi5jbG9zZSgpXG4gICAgICB9XG4gICAgfSxcbiAgICBzaG93KG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5vcGVuKG9wdGlvbnMpXG4gICAgfSxcbiAgICBoaWRlKCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLmNsb3NlKClcbiAgICB9LFxuICAgIGlzT3BlbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmZvdW5kYXRpb24gPyB0aGlzLmZvdW5kYXRpb24uaXNPcGVuKCkgOiBmYWxzZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxsaSBcbiAgICA6dGFiaW5kZXg9XCJkaXNhYmxlZD8nLTEnOicwJ1wiIFxuICAgIDphcmlhLWRpc2FibGVkPVwiZGlzYWJsZWRcIiBcbiAgICBjbGFzcz1cIm1kYy1tZW51LWl0ZW0gbWRjLWxpc3QtaXRlbVwiXG4gICAgcm9sZT1cIm1lbnVpdGVtXCJcbiAgPlxuICAgIDxzbG90Lz5cbiAgPC9saT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtbWVudS1pdGVtJyxcbiAgcHJvcHM6IHtcbiAgICBkaXNhYmxlZDogQm9vbGVhblxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGxpIFxuICAgIHJvbGU9XCJzZXBhcmF0b3JcIiBcbiAgICBjbGFzcz1cIm1kYy1tZW51LWRpdmlkZXIgbWRjLWxpc3QtZGl2aWRlclwiLz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtbWVudS1kaXZpZGVyJ1xufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJtZGMtbWVudS1hbmNob3JcIj5cbiAgICA8c2xvdC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1tZW51LWFuY2hvcidcbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHsgQmFzZVBsdWdpbiB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgbWRjTWVudSBmcm9tICcuL21kYy1tZW51LnZ1ZSdcbmltcG9ydCBtZGNNZW51SXRlbSBmcm9tICcuL21kYy1tZW51LWl0ZW0udnVlJ1xuaW1wb3J0IG1kY01lbnVEaXZpZGVyIGZyb20gJy4vbWRjLW1lbnUtZGl2aWRlci52dWUnXG5pbXBvcnQgbWRjTWVudUFuY2hvciBmcm9tICcuL21kYy1tZW51LWFuY2hvci52dWUnXG5cbmV4cG9ydCB7IG1kY01lbnUsIG1kY01lbnVJdGVtLCBtZGNNZW51RGl2aWRlciwgbWRjTWVudUFuY2hvciB9XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNNZW51LFxuICBtZGNNZW51SXRlbSxcbiAgbWRjTWVudURpdmlkZXIsXG4gIG1kY01lbnVBbmNob3Jcbn0pXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQgeyBhdXRvSW5pdCB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cblxuYXV0b0luaXQocGx1Z2luKVxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJrZXkiLCJjb21wb25lbnQiLCJ2bSIsIm5hbWUiLCJlbWl0Q3VzdG9tRXZlbnQiLCJlbCIsImV2dFR5cGUiLCJldnREYXRhIiwic2hvdWxkQnViYmxlIiwiZXZ0IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJidWJibGVzIiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJzY29wZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwiTURDRm91bmRhdGlvbiIsImFkYXB0ZXIiLCJhZGFwdGVyXyIsIk1EQ01lbnVBZGFwdGVyIiwiY2xhc3NOYW1lIiwidGFyZ2V0IiwiYXR0cmlidXRlTmFtZSIsInR5cGUiLCJoYW5kbGVyIiwiaW5kZXgiLCJvcmlnaW4iLCJwb3NpdGlvbiIsImhlaWdodCIsImF0dHIiLCJ2YWx1ZSIsImNzc0NsYXNzZXMiLCJST09UIiwiT1BFTiIsIkFOSU1BVElOR19PUEVOIiwiQU5JTUFUSU5HX0NMT1NFRCIsIlNFTEVDVEVEX0xJU1RfSVRFTSIsInN0cmluZ3MiLCJJVEVNU19TRUxFQ1RPUiIsIlNFTEVDVEVEX0VWRU5UIiwiQ0FOQ0VMX0VWRU5UIiwiQVJJQV9ESVNBQkxFRF9BVFRSIiwibnVtYmVycyIsIlNFTEVDVEVEX1RSSUdHRVJfREVMQVkiLCJUUkFOU0lUSU9OX09QRU5fRFVSQVRJT04iLCJUUkFOU0lUSU9OX0NMT1NFX0RVUkFUSU9OIiwiTUFSR0lOX1RPX0VER0UiLCJBTkNIT1JfVE9fTUVOVV9XSURUSF9SQVRJTyIsIk9GRlNFVF9UT19NRU5VX0hFSUdIVF9SQVRJTyIsIkNvcm5lckJpdCIsIkJPVFRPTSIsIkNFTlRFUiIsIlJJR0hUIiwiRkxJUF9SVEwiLCJDb3JuZXIiLCJUT1BfTEVGVCIsIlRPUF9SSUdIVCIsIkJPVFRPTV9MRUZUIiwiQk9UVE9NX1JJR0hUIiwiVE9QX1NUQVJUIiwiVE9QX0VORCIsIkJPVFRPTV9TVEFSVCIsIkJPVFRPTV9FTkQiLCJNRENNZW51Rm91bmRhdGlvbiIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJoYXNDbGFzcyIsImhhc05lY2Vzc2FyeURvbSIsImdldEF0dHJpYnV0ZUZvckV2ZW50VGFyZ2V0IiwiZ2V0SW5uZXJEaW1lbnNpb25zIiwiaGFzQW5jaG9yIiwiZ2V0QW5jaG9yRGltZW5zaW9ucyIsImdldFdpbmRvd0RpbWVuc2lvbnMiLCJnZXROdW1iZXJPZkl0ZW1zIiwicmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJCb2R5Q2xpY2tIYW5kbGVyIiwiZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXIiLCJnZXRJbmRleEZvckV2ZW50VGFyZ2V0Iiwibm90aWZ5U2VsZWN0ZWQiLCJub3RpZnlDYW5jZWwiLCJzYXZlRm9jdXMiLCJyZXN0b3JlRm9jdXMiLCJpc0ZvY3VzZWQiLCJmb2N1cyIsImdldEZvY3VzZWRJdGVtSW5kZXgiLCJmb2N1c0l0ZW1BdEluZGV4IiwiaXNSdGwiLCJzZXRUcmFuc2Zvcm1PcmlnaW4iLCJzZXRQb3NpdGlvbiIsInNldE1heEhlaWdodCIsInNldEF0dHJGb3JPcHRpb25BdEluZGV4Iiwicm1BdHRyRm9yT3B0aW9uQXRJbmRleCIsImFkZENsYXNzRm9yT3B0aW9uQXRJbmRleCIsInJtQ2xhc3NGb3JPcHRpb25BdEluZGV4IiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJkZWZhdWx0QWRhcHRlciIsImNsaWNrSGFuZGxlcl8iLCJoYW5kbGVQb3NzaWJsZVNlbGVjdGVkXyIsImtleWRvd25IYW5kbGVyXyIsImhhbmRsZUtleWJvYXJkRG93bl8iLCJrZXl1cEhhbmRsZXJfIiwiaGFuZGxlS2V5Ym9hcmRVcF8iLCJkb2N1bWVudENsaWNrSGFuZGxlcl8iLCJoYW5kbGVEb2N1bWVudENsaWNrXyIsImlzT3Blbl8iLCJvcGVuQW5pbWF0aW9uRW5kVGltZXJJZF8iLCJjbG9zZUFuaW1hdGlvbkVuZFRpbWVySWRfIiwic2VsZWN0ZWRUcmlnZ2VyVGltZXJJZF8iLCJhbmltYXRpb25SZXF1ZXN0SWRfIiwiZGltZW5zaW9uc18iLCJpdGVtSGVpZ2h0XyIsImFuY2hvckNvcm5lcl8iLCJhbmNob3JNYXJnaW5fIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwibWVhc3VyZXNfIiwic2VsZWN0ZWRJbmRleF8iLCJyZW1lbWJlclNlbGVjdGlvbl8iLCJxdWlja09wZW5fIiwia2V5RG93bldpdGhpbk1lbnVfIiwiRXJyb3IiLCJjbGVhclRpbWVvdXQiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImNvcm5lciIsIm1hcmdpbiIsInJlbWVtYmVyU2VsZWN0aW9uIiwic2V0U2VsZWN0ZWRJbmRleCIsInF1aWNrT3BlbiIsImZvY3VzSW5kZXgiLCJkb2N1bWVudEVsZW1lbnQiLCJwYXJlbnROb2RlIiwiY2xvc2UiLCJhbHRLZXkiLCJjdHJsS2V5IiwibWV0YUtleSIsImtleUNvZGUiLCJzaGlmdEtleSIsImlzVGFiIiwiaXNBcnJvd1VwIiwiaXNBcnJvd0Rvd24iLCJpc1NwYWNlIiwiaXNFbnRlciIsImZvY3VzZWRJdGVtSW5kZXgiLCJsYXN0SXRlbUluZGV4IiwicHJldmVudERlZmF1bHQiLCJpc0VzY2FwZSIsInRhcmdldEluZGV4Iiwic2V0VGltZW91dCIsImFuY2hvclJlY3QiLCJ2aWV3cG9ydCIsInZpZXdwb3J0RGlzdGFuY2UiLCJ3aWR0aCIsImFuY2hvckhlaWdodCIsImFuY2hvcldpZHRoIiwibWVudUhlaWdodCIsIm1lbnVXaWR0aCIsImlzQm90dG9tQWxpZ25lZCIsIkJvb2xlYW4iLCJhdmFpbGFibGVUb3AiLCJhdmFpbGFibGVCb3R0b20iLCJ0b3BPdmVyZmxvdyIsImJvdHRvbU92ZXJmbG93IiwiaXNGbGlwUnRsIiwiYXZvaWRIb3Jpem9udGFsT3ZlcmxhcCIsImlzQWxpZ25lZFJpZ2h0IiwiYXZhaWxhYmxlTGVmdCIsImF2YWlsYWJsZVJpZ2h0IiwibGVmdE92ZXJmbG93IiwicmlnaHRPdmVyZmxvdyIsImlzUmlnaHRBbGlnbmVkIiwieCIsInJpZ2h0T2Zmc2V0IiwibGVmdE9mZnNldCIsImF2b2lkVmVydGljYWxPdmVybGFwIiwiY2FuT3ZlcmxhcFZlcnRpY2FsbHkiLCJ5IiwibWluIiwibWF4SGVpZ2h0IiwiZ2V0QXV0b0xheW91dE1lYXN1cmVtZW50c18iLCJnZXRPcmlnaW5Db3JuZXJfIiwibWF4TWVudUhlaWdodCIsImdldE1lbnVNYXhIZWlnaHRfIiwidmVydGljYWxBbGlnbm1lbnQiLCJob3Jpem9udGFsQWxpZ25tZW50IiwiaG9yaXpvbnRhbE9mZnNldCIsImdldEhvcml6b250YWxPcmlnaW5PZmZzZXRfIiwidmVydGljYWxPZmZzZXQiLCJnZXRWZXJ0aWNhbE9yaWdpbk9mZnNldF8iLCJhYnMiLCJ2ZXJ0aWNhbE9mZnNldFBlcmNlbnQiLCJvcmlnaW5QZXJjZW50Iiwicm91bmQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhdXRvUG9zaXRpb25fIiwiZm9jdXNPbk9wZW5fIiwidGFyZ2V0SXNEaXNhYmxlZCIsInByZXZTZWxlY3RlZEluZGV4Iiwic3RvcmVkVHJhbnNmb3JtUHJvcGVydHlOYW1lXyIsImdldFRyYW5zZm9ybVByb3BlcnR5TmFtZSIsImdsb2JhbE9iaiIsImZvcmNlUmVmcmVzaCIsInVuZGVmaW5lZCIsImNyZWF0ZUVsZW1lbnQiLCJ0cmFuc2Zvcm1Qcm9wZXJ0eU5hbWUiLCJzdHlsZSIsIm1kY01lbnUiLCJtZGNNZW51SXRlbSIsIm1kY01lbnVEaXZpZGVyIiwibWRjTWVudUFuY2hvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUFPLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0lBQy9CO0lBQ0EsTUFBSUMsT0FBTyxJQUFYO0lBQ0EsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0lBQ2pDRCxXQUFPQyxPQUFPQyxHQUFkO0lBQ0QsR0FGRCxNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztJQUN4QztJQUNBSCxXQUFPRyxPQUFPRCxHQUFkO0lBQ0Q7SUFDRCxNQUFJRixJQUFKLEVBQVU7SUFDUkEsU0FBS0ksR0FBTCxDQUFTTCxNQUFUO0lBQ0Q7SUFDRjs7SUNaTSxTQUFTTSxVQUFULENBQW9CQyxVQUFwQixFQUFnQztJQUNyQyxTQUFPO0lBQ0xDLGFBQVMsUUFESjtJQUVMQyxhQUFTLHFCQUFNO0lBQ2IsV0FBSyxJQUFJQyxHQUFULElBQWdCSCxVQUFoQixFQUE0QjtJQUMxQixZQUFJSSxZQUFZSixXQUFXRyxHQUFYLENBQWhCO0lBQ0FFLFdBQUdELFNBQUgsQ0FBYUEsVUFBVUUsSUFBdkIsRUFBNkJGLFNBQTdCO0lBQ0Q7SUFDRixLQVBJO0lBUUxKO0lBUkssR0FBUDtJQVVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDWEQ7O0FBRUEsSUFBTyxTQUFTTyxlQUFULENBQXlCQyxFQUF6QixFQUE2QkMsT0FBN0IsRUFBc0NDLE9BQXRDLEVBQXFFO0lBQUEsTUFBdEJDLFlBQXNCLHVFQUFQLEtBQU87O0lBQzFFLE1BQUlDLFlBQUo7SUFD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
