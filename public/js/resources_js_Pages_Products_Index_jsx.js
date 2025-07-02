"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Products_Index_jsx"],{

/***/ "./resources/js/Pages/Products/Index.jsx":
/*!***********************************************!*\
  !*** ./resources/js/Pages/Products/Index.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _inertiajs_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/react */ "./node_modules/@inertiajs/react/dist/index.esm.js");
/* harmony import */ var _layouts_products_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/layouts/products-layout */ "./resources/js/layouts/products-layout.jsx");
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}



function Products(_ref) {
  var _this = this,
    _products$prev_page,
    _products$next_page;
  var products = _ref.products,
    filters = _ref.filters;
  var searchInputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    search = _useState2[0],
    setSearch = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    statusFilter = _useState4[0],
    setStatusFilter = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showTrashed = _useState6[0],
    setShowTrashed = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isToggling = _useState8[0],
    setIsToggling = _useState8[1];
  var isUnmountedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  var handleSearchInput = function handleSearchInput(e) {
    var value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };
  var debounce = function debounce(func) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    var timer;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      clearTimeout(timer);
      timer = setTimeout(function () {
        func.apply(_this, args);
      }, delay);
    };
  };
  var debouncedSearch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(debounce(function (value) {
    var params = {
      search: value || undefined,
      status: statusFilter || undefined,
      trashed: showTrashed ? 'only' : undefined
    };
    _inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.router.get('/products', {
      search: value || undefined,
      status: statusFilter || undefined,
      trashed: showTrashed ? 'only' : undefined
    }, {
      preserveScroll: true,
      preserveState: true,
      only: ['products', 'filters'],
      replace: true,
      onFinish: function onFinish() {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    });
  }, 500)).current;
  var deleteProduct = function deleteProduct(productId) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      _inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.router["delete"]("/products/".concat(productId), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: function onSuccess() {
          window.alert('Product deleted successfully');
        }
      });
    }
  };
  var restoreProduct = function restoreProduct(productId) {
    if (window.confirm('Are you sure you want to restore this product?')) {
      _inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.router.put("/products/".concat(productId, "/restore"), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: function onSuccess() {
          window.alert('Product restored successfully');
        }
      });
    }
  };

  // Function to toggle product status
  var toggleStatus = function toggleStatus(productId) {
    _inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.router.put("/products/".concat(productId, "/toggle-status"), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: function onSuccess() {
        window.alert('Product status toggled successfully');
      }
    });
  };

  // Function to toggle between trashed and untrashed states
  var toggleTrashedState = function toggleTrashedState() {
    if (isToggling) return;
    setIsToggling(true);
    var newState = !showTrashed;
    setShowTrashed(newState);

    // Prepare query params
    var params = {
      preserveScroll: true,
      preserveState: true
    };

    // Conditionally add the `trashed` param
    if (newState) {
      params.trashed = 'only';
    }

    // Preserve current filters
    if (search) {
      params.search = search;
    }
    if (statusFilter) {
      params.status = statusFilter;
    }

    // Update the URL and reload
    _inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.router.get('/products', params, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: function onSuccess() {
        if (!isUnmountedRef.current) {
          setIsToggling(false);
        }
      }
    });
  };

  // Track component mount state
  // useEffect(() => {
  //     return () => {
  //         isUnmountedRef.current = true;
  //     };
  // }, []);

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setShowTrashed(filters.trashed === 'only');
    setStatusFilter(filters.status || '');
    setSearch(filters.search || '');
  }, []); // Run only once on mount
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_layouts_products_layout__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex justify-between items-center mb-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    ref: searchInputRef,
    type: "text",
    placeholder: "Search products...",
    value: search,
    onChange: handleSearchInput,
    className: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex items-center space-x-2"
  }, search && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    onClick: function onClick() {
      setSearch('');
      _inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.router.get('/products', {
        search: '',
        preserveScroll: true,
        preserveState: true
      });
    },
    className: "inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  }, "Clear")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("select", {
    value: statusFilter,
    onChange: function onChange(e) {
      var selectedStatus = e.target.value;
      setStatusFilter(selectedStatus);
      var params = {
        preserveScroll: true,
        preserveState: true
      };

      // Only include status if it's not empty
      if (selectedStatus) {
        params.status = selectedStatus;
      }

      // Preserve current filters
      if (search) {
        params.search = search;
      }
      if (showTrashed) {
        params.trashed = 'only';
      }
      _inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.router.get('/products', params);
    },
    className: "block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: ""
  }, "All Status"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "active"
  }, "Active"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "inactive"
  }, "Inactive"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    onClick: toggleTrashedState,
    className: "inline-flex items-center w-48 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ".concat(showTrashed ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'text-gray-700 hover:bg-gray-50')
  }, showTrashed ? 'Show Active' : 'Show Trashed'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
    href: "/products/create",
    className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  }, "Add Product")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("table", {
    className: "min-w-full divide-y divide-gray-200"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("thead", {
    className: "bg-gray-50"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Item Code"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Title"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Sub Category"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Status"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Fixed Assets Count"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "EKUEP Selling Price"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Times Quoted"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Actions"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tbody", {
    className: "bg-white divide-y divide-gray-200"
  }, products.data.map(function (product) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tr", {
      key: product.id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, product.item_code), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, product.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, product.sub_category), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      onClick: function onClick() {
        return toggleStatus(product.id);
      },
      className: "px-3 py-1.5 text-sm font-medium rounded-full ".concat(product.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200')
    }, product.status === 'active' ? 'Active' : 'Inactive')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, product.fixed_assets_count), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, product.ekuep_selling_price), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, product.times_quoted), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap text-sm font-medium"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "flex space-x-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
      href: "/products/".concat(product.id, "/edit"),
      className: "text-indigo-600 hover:text-indigo-900"
    }, "Edit"), !showTrashed && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      onClick: function onClick() {
        return deleteProduct(product.id);
      },
      className: "text-red-600 hover:text-red-900"
    }, "Trash"), showTrashed && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      onClick: function onClick() {
        return restoreProduct(product.id);
      },
      className: "text-green-600 hover:text-green-900"
    }, "Restore"))));
  }))), products.total > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex justify-between items-center mb-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "text-sm text-gray-700"
  }, "Showing ", products.from, " to ", products.to, " of ", products.total, " products"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex justify-center space-x-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
    href: "/products?page=".concat((_products$prev_page = products.prev_page) !== null && _products$prev_page !== void 0 ? _products$prev_page : 1),
    className: "px-4 py-2 rounded-md ".concat(products.prev_page ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'),
    disabled: !products.prev_page
  }, "Previous"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
    href: "/products?page=".concat((_products$next_page = products.next_page) !== null && _products$next_page !== void 0 ? _products$next_page : products.last_page),
    className: "px-4 py-2 rounded-md ".concat(products.next_page ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'),
    disabled: !products.next_page
  }, "Next")))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Products);

/***/ }),

/***/ "./resources/js/layouts/products-layout.jsx":
/*!**************************************************!*\
  !*** ./resources/js/layouts/products-layout.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductsLayout)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

function ProductsLayout(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "min-h-screen bg-gray-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "py-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "max-w-7xl mx-auto sm:px-6 lg:px-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "bg-white overflow-hidden shadow-sm sm:rounded-lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "p-6 bg-white border-b border-gray-200"
  }, children)))));
}

/***/ })

}]);