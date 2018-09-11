/**
* @module vue-mdc-adapterlayout-grid 0.18.2
* @exports VueMDCLayoutGrid
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCLayoutGrid = factory());
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

  /* global CustomEvent */

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
    name: 'mdc-layout-grid',
    props: {
      'fixed-column-width': Boolean,
      'align-left': Boolean,
      'align-right': Boolean
    },
    computed: {
      classes: function classes() {
        return {
          'mdc-layout-grid': true,
          'mdc-layout-grid--fixed-column-width': this.fixedColumnWidth,
          'mdc-layout-grid--align-left': this.alignLeft,
          'mdc-layout-grid--align-right': this.alignRight
        };
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
    return _c("div", { class: _vm.classes }, [_c("div", { staticClass: "mdc-layout-grid__inner" }, [_vm._t("default")], 2)]);
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
    component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/layout-grid/mdc-layout-grid.vue";

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

  var mdcLayoutGrid = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

  //
  //
  //
  //
  //
  //
  //
  //

  var spanOptions = {
    type: [String, Number],
    default: null,
    validator: function validator(value) {
      var num = Number(value);
      return isFinite(num) && num <= 12 && num > 0;
    }
  };

  var script$1 = {
    name: 'mdc-layout-cell',
    props: {
      span: spanOptions,
      order: spanOptions,
      phone: spanOptions,
      tablet: spanOptions,
      desktop: spanOptions,
      align: {
        type: String,
        validator: function validator(value) {
          return ['top', 'bottom', 'middle'].indexOf(value) !== -1;
        }
      }
    },
    computed: {
      classes: function classes() {
        var classes = [];

        if (this.span) {
          classes.push('mdc-layout-grid__cell--span-' + this.span);
        }

        if (this.order) {
          classes.push('mdc-layout-grid__cell--order-' + this.order);
        }

        if (this.phone) {
          classes.push('mdc-layout-grid__cell--span-' + this.phone + '-phone');
        }

        if (this.tablet) {
          classes.push('mdc-layout-grid__cell--span-' + this.tablet + '-tablet');
        }

        if (this.desktop) {
          classes.push('mdc-layout-grid__cell--span-' + this.desktop + '-desktop');
        }

        if (this.align) {
          classes.push('mdc-layout-grid__cell--align-' + this.align);
        }

        return classes;
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
      staticClass: "mdc-layout-cell mdc-layout-grid__cell",
      class: _vm.classes
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
    component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/layout-grid/mdc-layout-cell.vue";

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

  var mdcLayoutCell = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

  //
  //
  //
  //
  //
  //

  var script$2 = {
    name: 'mdc-layout-inner-grid'
  };

  /* script */
  var __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function __vue_render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "mdc-layout-inner-grid mdc-layout-grid__inner" }, [_vm._t("default")], 2);
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
    component.__file = "/home/johngoff/Repos/vue-mdc-adapter/components/layout-grid/mdc-layout-inner-grid.vue";

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

  var mdcLayoutInnerGrid = __vue_normalize__$2({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, __vue_create_injector__$2, undefined);

  var plugin = BasePlugin({
    mdcLayoutGrid: mdcLayoutGrid,
    mdcLayoutCell: mdcLayoutCell,
    mdcLayoutInnerGrid: mdcLayoutInnerGrid
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWdyaWQuanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtZ3JpZC9tZGMtbGF5b3V0LWdyaWQudnVlIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtZ3JpZC9tZGMtbGF5b3V0LWNlbGwudnVlIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtZ3JpZC9tZGMtbGF5b3V0LWlubmVyLWdyaWQudnVlIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtZ3JpZC9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvbGF5b3V0LWdyaWQvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0KHBsdWdpbikge1xuICAvLyBBdXRvLWluc3RhbGxcbiAgbGV0IF9WdWUgPSBudWxsXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIF9WdWUgPSB3aW5kb3cuVnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xuICAgIF9WdWUgPSBnbG9iYWwuVnVlXG4gIH1cbiAgaWYgKF9WdWUpIHtcbiAgICBfVnVlLnVzZShwbHVnaW4pXG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luKGNvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxuICAgIGluc3RhbGw6IHZtID0+IHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cbiAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzXG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50KGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICBsZXQgZXZ0XG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcbn1cbiIsImNvbnN0IHNjb3BlID1cbiAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcigweDEwMDAwMDAwKSkudG9TdHJpbmcoKSArICctJ1xuXG5leHBvcnQgY29uc3QgVk1BVW5pcXVlSWRNaXhpbiA9IHtcbiAgYmVmb3JlQ3JlYXRlKCkge1xuICAgIHRoaXMudm1hX3VpZF8gPSBzY29wZSArIHRoaXMuX3VpZFxuICB9XG59XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiY2xhc3Nlc1wiPlxuICAgIDxkaXYgY2xhc3M9XCJtZGMtbGF5b3V0LWdyaWRfX2lubmVyXCI+XG4gICAgICA8c2xvdC8+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1sYXlvdXQtZ3JpZCcsXG4gIHByb3BzOiB7XG4gICAgJ2ZpeGVkLWNvbHVtbi13aWR0aCc6IEJvb2xlYW4sXG4gICAgJ2FsaWduLWxlZnQnOiBCb29sZWFuLFxuICAgICdhbGlnbi1yaWdodCc6IEJvb2xlYW5cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ21kYy1sYXlvdXQtZ3JpZCc6IHRydWUsXG4gICAgICAgICdtZGMtbGF5b3V0LWdyaWQtLWZpeGVkLWNvbHVtbi13aWR0aCc6IHRoaXMuZml4ZWRDb2x1bW5XaWR0aCxcbiAgICAgICAgJ21kYy1sYXlvdXQtZ3JpZC0tYWxpZ24tbGVmdCc6IHRoaXMuYWxpZ25MZWZ0LFxuICAgICAgICAnbWRjLWxheW91dC1ncmlkLS1hbGlnbi1yaWdodCc6IHRoaXMuYWxpZ25SaWdodFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiIFxuICAgIGNsYXNzPVwibWRjLWxheW91dC1jZWxsIG1kYy1sYXlvdXQtZ3JpZF9fY2VsbFwiPlxuICAgIDxzbG90Lz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuY29uc3Qgc3Bhbk9wdGlvbnMgPSB7XG4gIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXG4gIGRlZmF1bHQ6IG51bGwsXG4gIHZhbGlkYXRvcjogZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgbnVtID0gTnVtYmVyKHZhbHVlKVxuICAgIHJldHVybiBpc0Zpbml0ZShudW0pICYmIG51bSA8PSAxMiAmJiBudW0gPiAwXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWxheW91dC1jZWxsJyxcbiAgcHJvcHM6IHtcbiAgICBzcGFuOiBzcGFuT3B0aW9ucyxcbiAgICBvcmRlcjogc3Bhbk9wdGlvbnMsXG4gICAgcGhvbmU6IHNwYW5PcHRpb25zLFxuICAgIHRhYmxldDogc3Bhbk9wdGlvbnMsXG4gICAgZGVza3RvcDogc3Bhbk9wdGlvbnMsXG4gICAgYWxpZ246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIFsndG9wJywgJ2JvdHRvbScsICdtaWRkbGUnXS5pbmRleE9mKHZhbHVlKSAhPT0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcygpIHtcbiAgICAgIGxldCBjbGFzc2VzID0gW11cblxuICAgICAgaWYgKHRoaXMuc3Bhbikge1xuICAgICAgICBjbGFzc2VzLnB1c2goYG1kYy1sYXlvdXQtZ3JpZF9fY2VsbC0tc3Bhbi0ke3RoaXMuc3Bhbn1gKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcmRlcikge1xuICAgICAgICBjbGFzc2VzLnB1c2goYG1kYy1sYXlvdXQtZ3JpZF9fY2VsbC0tb3JkZXItJHt0aGlzLm9yZGVyfWApXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnBob25lKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChgbWRjLWxheW91dC1ncmlkX19jZWxsLS1zcGFuLSR7dGhpcy5waG9uZX0tcGhvbmVgKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy50YWJsZXQpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKGBtZGMtbGF5b3V0LWdyaWRfX2NlbGwtLXNwYW4tJHt0aGlzLnRhYmxldH0tdGFibGV0YClcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZGVza3RvcCkge1xuICAgICAgICBjbGFzc2VzLnB1c2goYG1kYy1sYXlvdXQtZ3JpZF9fY2VsbC0tc3Bhbi0ke3RoaXMuZGVza3RvcH0tZGVza3RvcGApXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmFsaWduKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChgbWRjLWxheW91dC1ncmlkX19jZWxsLS1hbGlnbi0ke3RoaXMuYWxpZ259YClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNsYXNzZXNcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwibWRjLWxheW91dC1pbm5lci1ncmlkIG1kYy1sYXlvdXQtZ3JpZF9faW5uZXJcIj5cbiAgICA8c2xvdC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1sYXlvdXQtaW5uZXItZ3JpZCdcbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHsgQmFzZVBsdWdpbiB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgbWRjTGF5b3V0R3JpZCBmcm9tICcuL21kYy1sYXlvdXQtZ3JpZC52dWUnXG5pbXBvcnQgbWRjTGF5b3V0Q2VsbCBmcm9tICcuL21kYy1sYXlvdXQtY2VsbC52dWUnXG5pbXBvcnQgbWRjTGF5b3V0SW5uZXJHcmlkIGZyb20gJy4vbWRjLWxheW91dC1pbm5lci1ncmlkLnZ1ZSdcblxuZXhwb3J0IHsgbWRjTGF5b3V0R3JpZCwgbWRjTGF5b3V0Q2VsbCwgbWRjTGF5b3V0SW5uZXJHcmlkIH1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XG4gIG1kY0xheW91dEdyaWQsXG4gIG1kY0xheW91dENlbGwsXG4gIG1kY0xheW91dElubmVyR3JpZFxufSlcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7IGF1dG9Jbml0IH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG5hdXRvSW5pdChwbHVnaW4pXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2ZXJzaW9uIiwiaW5zdGFsbCIsImtleSIsImNvbXBvbmVudCIsInZtIiwibmFtZSIsInNjb3BlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJtZGNMYXlvdXRHcmlkIiwibWRjTGF5b3V0Q2VsbCIsIm1kY0xheW91dElubmVyR3JpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztFQUFPLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0VBQy9CO0VBQ0EsTUFBSUMsT0FBTyxJQUFYO0VBQ0EsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0VBQ2pDRCxXQUFPQyxPQUFPQyxHQUFkO0VBQ0QsR0FGRCxNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztFQUN4QztFQUNBSCxXQUFPRyxPQUFPRCxHQUFkO0VBQ0Q7RUFDRCxNQUFJRixJQUFKLEVBQVU7RUFDUkEsU0FBS0ksR0FBTCxDQUFTTCxNQUFUO0VBQ0Q7RUFDRjs7RUNaTSxTQUFTTSxVQUFULENBQW9CQyxVQUFwQixFQUFnQztFQUNyQyxTQUFPO0VBQ0xDLGFBQVMsUUFESjtFQUVMQyxhQUFTLHFCQUFNO0VBQ2IsV0FBSyxJQUFJQyxHQUFULElBQWdCSCxVQUFoQixFQUE0QjtFQUMxQixZQUFJSSxZQUFZSixXQUFXRyxHQUFYLENBQWhCO0VBQ0FFLFdBQUdELFNBQUgsQ0FBYUEsVUFBVUUsSUFBdkIsRUFBNkJGLFNBQTdCO0VBQ0Q7RUFDRixLQVBJO0VBUUxKO0VBUkssR0FBUDtFQVVEOztFQ1hEOztFQ0FBLElBQU1PLFFBQ0pDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQkYsS0FBS0MsS0FBTCxDQUFXLFVBQVgsQ0FBM0IsRUFBbURFLFFBQW5ELEtBQWdFLEdBRGxFOzs7Ozs7Ozs7OztBQ1NBOzs7Ozs7Ozs7Ozs7Ozs7OztHQUFBOzs7RUFOWSwyQkFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUNNWjs7Ozs7OztHQUFBOztBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBQUE7OztFQWZZLCtCQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNJWjs7R0FBQTs7O0VBSlksK0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSVosZUFBZVosV0FBVztFQUN4QmEsOEJBRHdCO0VBRXhCQyw4QkFGd0I7RUFHeEJDO0VBSHdCLENBQVgsQ0FBZjs7RUNGQXRCLFNBQVNDLE1BQVQ7Ozs7Ozs7OyJ9
