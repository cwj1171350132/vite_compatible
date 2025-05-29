// 引入所有必要的polyfills - 必须在最前面
import "core-js/stable";
import "regenerator-runtime/runtime";
import "whatwg-fetch";
import "es6-promise/auto";

// 手动添加一些关键的polyfills以确保兼容性
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement, fromIndex) {
    if (this == null) {
      throw new TypeError(
        "Array.prototype.includes called on null or undefined"
      );
    }
    var o = Object(this);
    var len = parseInt(o.length) || 0;
    if (len === 0) return false;
    var n = parseInt(fromIndex) || 0;
    var k = n >= 0 ? n : Math.max(len + n, 0);

    function sameValueZero(x, y) {
      return (
        x === y ||
        (typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y))
      );
    }

    for (; k < len; k++) {
      if (sameValueZero(o[k], searchElement)) {
        return true;
      }
    }
    return false;
  };
}

if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    if (typeof start !== "number") {
      start = 0;
    }
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

// 确保Object.assign存在
if (typeof Object.assign !== "function") {
  Object.assign = function (target) {
    if (target == null) {
      throw new TypeError("Cannot convert undefined or null to object");
    }
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];
      if (nextSource != null) {
        for (var nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

// 确保Array.from存在
if (!Array.from) {
  Array.from = function (arrayLike, mapFn, thisArg) {
    var C = this;
    var items = Object(arrayLike);
    if (arrayLike == null) {
      throw new TypeError(
        "Array.from requires an array-like object - not null or undefined"
      );
    }
    var len = parseInt(items.length) || 0;
    var A = typeof C === "function" ? Object(new C(len)) : new Array(len);
    var k = 0;
    var kValue;
    while (k < len) {
      kValue = items[k];
      if (mapFn) {
        A[k] =
          typeof thisArg === "undefined"
            ? mapFn(kValue, k)
            : mapFn.call(thisArg, kValue, k);
      } else {
        A[k] = kValue;
      }
      k += 1;
    }
    A.length = len;
    return A;
  };
}

import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";

console.log("Vue version:", createApp.version || "Unknown");
console.log("Element Plus loaded successfully");

const app = createApp(App);

// 注册所有Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 配置Element Plus
app.use(ElementPlus, {
  // Element Plus配置
  size: "default",
  zIndex: 3000,
});

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error("Vue Error:", err);
  console.error("Component:", vm);
  console.error("Info:", info);
};

// 性能标记
if (window.performance && window.performance.mark) {
  window.performance.mark("vue-mount-start");
}

app.mount("#app");

// 挂载完成后的性能标记
if (window.performance && window.performance.mark) {
  setTimeout(() => {
    window.performance.mark("vue-mount-end");
    if (window.performance.measure) {
      window.performance.measure(
        "vue-mount-time",
        "vue-mount-start",
        "vue-mount-end"
      );
    }
  }, 0);
}

console.log("Vue app mounted successfully");
