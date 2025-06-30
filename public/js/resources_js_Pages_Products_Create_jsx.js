"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Products_Create_jsx"],{

/***/ "./resources/js/Pages/Products/Create.jsx":
/*!************************************************!*\
  !*** ./resources/js/Pages/Products/Create.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Create)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _layouts_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/layouts/layout */ "./resources/js/layouts/layout.jsx");
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


function Create() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      name: '',
      description: '',
      daily_rate: '',
      weekly_rate: '',
      monthly_rate: '',
      category: '',
      image_url: '',
      is_available: true
    }),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('daily_rate', data.daily_rate);
    formData.append('weekly_rate', data.weekly_rate);
    formData.append('monthly_rate', data.monthly_rate);
    formData.append('category', data.category);
    formData.append('image_url', data.image_url);
    formData.append('is_available', data.is_available);
    fetch('/products', {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.success) {
        window.location.href = '/products';
      } else {
        // Handle errors
      }
    })["catch"](function (error) {
      console.error('Error:', error);
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_layouts_layout__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "py-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "max-w-7xl mx-auto sm:px-6 lg:px-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "bg-white overflow-hidden shadow-sm sm:rounded-lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "p-6 bg-white border-b border-gray-200"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
    className: "text-2xl font-bold mb-6"
  }, "Add New Product"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "block text-sm font-medium text-gray-700"
  }, "Product Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "text",
    name: "name",
    value: data.name,
    onChange: function onChange(e) {
      return setData('name', e.target.value);
    },
    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  }), errors.name && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "mt-1 text-sm text-red-600"
  }, errors.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "block text-sm font-medium text-gray-700"
  }, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", {
    name: "description",
    value: data.description,
    onChange: function onChange(e) {
      return setData('description', e.target.value);
    },
    rows: "3",
    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  }), errors.description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "mt-1 text-sm text-red-600"
  }, errors.description)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "block text-sm font-medium text-gray-700"
  }, "Daily Rate"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "number",
    step: "0.01",
    name: "daily_rate",
    value: data.daily_rate,
    onChange: function onChange(e) {
      return setData('daily_rate', e.target.value);
    },
    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  }), errors.daily_rate && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "mt-1 text-sm text-red-600"
  }, errors.daily_rate)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "block text-sm font-medium text-gray-700"
  }, "Weekly Rate"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "number",
    step: "0.01",
    name: "weekly_rate",
    value: data.weekly_rate,
    onChange: function onChange(e) {
      return setData('weekly_rate', e.target.value);
    },
    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  }), errors.weekly_rate && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "mt-1 text-sm text-red-600"
  }, errors.weekly_rate)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "block text-sm font-medium text-gray-700"
  }, "Monthly Rate"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "number",
    step: "0.01",
    name: "monthly_rate",
    value: data.monthly_rate,
    onChange: function onChange(e) {
      return setData('monthly_rate', e.target.value);
    },
    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  }), errors.monthly_rate && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "mt-1 text-sm text-red-600"
  }, errors.monthly_rate))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "block text-sm font-medium text-gray-700"
  }, "Category"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "text",
    name: "category",
    value: data.category,
    onChange: function onChange(e) {
      return setData('category', e.target.value);
    },
    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  }), errors.category && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "mt-1 text-sm text-red-600"
  }, errors.category)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "block text-sm font-medium text-gray-700"
  }, "Image URL"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "url",
    name: "image_url",
    value: data.image_url,
    onChange: function onChange(e) {
      return setData('image_url', e.target.value);
    },
    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  }), errors.image_url && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "mt-1 text-sm text-red-600"
  }, errors.image_url)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "block text-sm font-medium text-gray-700"
  }, "Available for Rent"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("select", {
    name: "is_available",
    value: data.is_available,
    onChange: function onChange(e) {
      return setData('is_available', e.target.value === 'true');
    },
    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "true"
  }, "Yes"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "false"
  }, "No"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex justify-end space-x-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "/products",
    className: "inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "submit",
    disabled: processing,
    className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
  }, processing ? 'Creating...' : 'Create Product'))))))));
}

/***/ }),

/***/ "./resources/js/layouts/layout.jsx":
/*!*****************************************!*\
  !*** ./resources/js/layouts/layout.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _inertiajs_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/react */ "./node_modules/@inertiajs/react/dist/index.esm.js");
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


function Layout(_ref) {
  var children = _ref.children;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    menuOpen = _useState2[0],
    setMenuOpen = _useState2[1];
  var _useForm = (0,_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.useForm)({}),
    data = _useForm.data,
    setData = _useForm.setData,
    post = _useForm.post;
  var auth = (0,_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.usePage)().props.value.auth;
  var isAuthenticated = auth && auth.user && auth.user.id;
  var userName = isAuthenticated ? auth.user.name || 'User' : 'Login';
  var userEmail = isAuthenticated ? auth.user.email || '' : '';
  var isActive = function isActive(path) {
    return window.location.pathname === path || path === '/dashboard' && window.location.pathname === '/';
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var handleClickOutside = function handleClickOutside(event) {
      if (menuOpen && !event.target.closest('#user-menu')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return function () {
      return document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);
  var handleLogout = function handleLogout() {
    if (!isAuthenticated) return;
    post(route('logout'), {
      preserveScroll: true,
      onSuccess: function onSuccess() {
        setMenuOpen(false);
      }
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "min-h-screen bg-gray-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("nav", {
    className: "bg-white shadow"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex justify-between h-16"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex-shrink-0 flex items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
    href: "/",
    className: "text-xl font-bold text-gray-800"
  }, "Rental System"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "hidden sm:ml-6 sm:flex sm:space-x-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
    href: "/dashboard",
    className: "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700 ".concat(isActive('/dashboard') ? 'border-indigo-500' : 'border-transparent text-gray-500')
  }, "Dashboard"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
    href: "/users",
    className: "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700 ".concat(isActive('/users') ? 'border-indigo-500' : 'border-transparent text-gray-500')
  }, "Users"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
    href: "/products",
    className: "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700 ".concat(isActive('/products') ? 'border-indigo-500' : 'border-transparent text-gray-500')
  }, "Products"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
    href: "/clients",
    className: "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700 ".concat(isActive('/clients') ? 'border-indigo-500' : 'border-transparent text-gray-500')
  }, "Clients"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
    href: "/quotations",
    className: "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700 ".concat(isActive('/quotations') ? 'border-indigo-500' : 'border-transparent text-gray-500')
  }, "Quotations"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
    href: "/settings",
    className: "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700 ".concat(isActive('/settings') ? 'border-indigo-500' : 'border-transparent text-gray-500')
  }, "Settings")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "hidden sm:ml-6 sm:flex sm:items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "ml-3 relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    className: "bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
    id: "user-menu",
    "aria-expanded": menuOpen,
    "aria-haspopup": "true",
    onClick: function onClick() {
      return setMenuOpen(!menuOpen);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "sr-only"
  }, "Open user menu"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    className: "h-8 w-8 rounded-full",
    src: "https://ui-avatars.com/api/?name=".concat(userName),
    alt: "Profile"
  }))), menuOpen && isAuthenticated && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none",
    role: "menu",
    "aria-orientation": "vertical",
    "aria-labelledby": "user-menu",
    tabIndex: "-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "px-4 py-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "text-sm font-medium text-gray-900"
  }, userName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "text-sm text-gray-500 truncate"
  }, userEmail)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "py-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
    href: "/profile",
    className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
    role: "menuitem",
    tabIndex: "-1",
    id: "user-menu-item-0"
  }, "Profile"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: handleLogout,
    className: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
    role: "menuitem",
    tabIndex: "-1",
    id: "user-menu-item-1"
  }, "Logout")))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("main", null, children));
}

/***/ })

}]);