/******/ var __webpack_modules__ = ({

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _utils_isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/isObject.js */ "./src/utils/isObject.js");

const createSimpleDOMElement = (tag, value = '', classNameOrOptions) => {
  const element = document.createElement(tag);
  element.innerHTML = value;
  if ((0,_utils_isObject_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(classNameOrOptions)) {
    for (let param in classNameOrOptions) {
      element[param] = classNameOrOptions[param];
    }
  } else {
    const classNames = Array.isArray(classNameOrOptions) ? classNameOrOptions.join(' ') : classNameOrOptions;
    element.className = classNames;
  }
  return element;
};
const renderSimpleValue = (key, value) => {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createSimpleDOMElement('span', key, 'key'));
  fragment.appendChild(createSimpleDOMElement('span', ': ', 'value'));
  fragment.appendChild(createSimpleDOMElement('span', value, 'value'));
  return fragment;
};
const render = (convertedData, rootElement) => {
  const mainElement = createSimpleDOMElement('div', null, {
    className: 'main'
  });
  for (const key in convertedData) {
    const value = convertedData[key];
    const objectElement = createSimpleDOMElement('div', null, ['field', typeof value]);
    objectElement.appendChild(renderSimpleValue(key, value));
    mainElement.appendChild(objectElement);
  }
  rootElement.appendChild(mainElement);
};

/***/ }),

/***/ "./src/transform.js":
/*!**************************!*\
  !*** ./src/transform.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transform": () => (/* binding */ transform)
/* harmony export */ });
/* harmony import */ var _utils_converting_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/converting.js */ "./src/utils/converting.js");
/* harmony import */ var _utils_appearence_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/appearence.js */ "./src/utils/appearence.js");
/* harmony import */ var _utils_formatKeys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/formatKeys.js */ "./src/utils/formatKeys.js");



const transform = (data, settings) => {
  if (!settings || !Object.keys(settings).length) return data;
  const transformed = Array.isArray(data) ? [] : {};
  const {
    isFormatKeys
  } = settings;
  for (const key in data) {
    const newKey = isFormatKeys ? (0,_utils_formatKeys_js__WEBPACK_IMPORTED_MODULE_2__.convertKey)(key) : key;
    if ((0,_utils_converting_js__WEBPACK_IMPORTED_MODULE_0__.isFieldShouldBeVisible)(key, data[key], settings)) {
      if (data[key] && typeof data[key] === 'object') {
        transformed[newKey] = transform(data[key], settings);
      } else {
        transformed[newKey] = (0,_utils_appearence_js__WEBPACK_IMPORTED_MODULE_1__.valueAppearence)(data[key], settings);
      }
    }
  }
  return transformed;
};

/***/ }),

/***/ "./src/utils/appearence.js":
/*!*********************************!*\
  !*** ./src/utils/appearence.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "valueAppearence": () => (/* binding */ valueAppearence)
/* harmony export */ });
const valueAppearence = (value, {
  nullAppearence,
  boolAppearence
}) => {
  if (boolAppearence && typeof value === 'boolean') {
    return boolAppearence[+value];
  }
  if (nullAppearence && value === null) {
    return nullAppearence;
  }
  return value;
};

/***/ }),

/***/ "./src/utils/converting.js":
/*!*********************************!*\
  !*** ./src/utils/converting.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isFieldShouldBeVisible": () => (/* binding */ isFieldShouldBeVisible)
/* harmony export */ });
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ "./src/utils/isObject.js");

const isFieldShouldBeVisible = (key, value, settings) => {
  const {
    hidePropertiesByValue,
    hidePropertiesByKey
  } = settings;
  if (!hidePropertiesByKey && !hidePropertiesByValue) return true;
  if (!(0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(value) && hidePropertiesByValue && hidePropertiesByValue.includes(value)) {
    return false;
  }
  if (hidePropertiesByKey && hidePropertiesByKey.includes(key)) {
    return false;
  }
  return true;
};

/***/ }),

/***/ "./src/utils/formatKeys.js":
/*!*********************************!*\
  !*** ./src/utils/formatKeys.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertKey": () => (/* binding */ convertKey)
/* harmony export */ });
const removeAbbrFromBegin = word => {
  const count = (word.match(/[A-Z]/g) || []).length;
  const isAbbr = /^[A-Z]+$/.test(word);
  if (count > 1 && !isAbbr) {
    return word.slice(0, count - 1) + ' ' + word.slice(count - 1);
  }
  return word;
};
const convertKey = key => {
  if (typeof key !== 'string') return null;
  const words = key.split(/[\s_\-]/);
  const nonEmptyWords = words.filter(word => word);
  const wordPattern = /([A-Z]+$)|(\d+[a-z]+)|(\d+)|(((^[a-z])|[A-Z]+)[a-z]*)/g;
  let parts = [];
  for (let word of nonEmptyWords) {
    const newParts = word.match(wordPattern) || [word];
    parts = parts.concat(newParts);
  }
  return parts ? parts.map(word => removeAbbrFromBegin(word)).join(' ') : key;
};

// const convertByMask = (value, mask) => {
//   const partPattern = /\{(\w|\.)+?\}/g;
//   const key = mask.replace(partPattern, function (part) {
//     const path = part.slice(1, -1).split('.');

//     let convertedKey = value[path[0]];

//     for (let i = 1; i < path.length; i++) {
//       if (convertedKey && convertedKey[path[i]]) {
//         convertedKey = convertedKey[path[i]];
//       } else {
//         convertedKey = '-';
//         break;
//       }
//     }

//     return convertedKey || '-';
//   });

//   return key;
// };



/***/ }),

/***/ "./src/utils/isObject.js":
/*!*******************************!*\
  !*** ./src/utils/isObject.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isObject": () => (/* binding */ isObject)
/* harmony export */ });
const isObject = data => typeof data === 'object' && !Array.isArray(data) && data !== null;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convert": () => (/* binding */ convert),
/* harmony export */   "generate": () => (/* binding */ generate)
/* harmony export */ });
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transform.js */ "./src/transform.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ "./src/render.js");


const convert = (data, settings = {}) => {
  try {
    const parsed = JSON.parse(data);
    const converted = (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__.transform)(parsed, settings);
    return converted;
  } catch (error) {
    // console.error && console.error(error.message);
    return 'Invalid JSON';
  }
};
const generate = (data, settings, nodeElement) => {
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(convert(data, settings), nodeElement);
};
})();

var __webpack_exports__convert = __webpack_exports__.convert;
var __webpack_exports__generate = __webpack_exports__.generate;
export { __webpack_exports__convert as convert, __webpack_exports__generate as generate };

//# sourceMappingURL=api.js.map