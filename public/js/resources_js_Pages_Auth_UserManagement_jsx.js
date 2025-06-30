"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Auth_UserManagement_jsx"],{

/***/ "./resources/js/Pages/Auth/UserManagement.jsx":
/*!****************************************************!*\
  !*** ./resources/js/Pages/Auth/UserManagement.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserManagement)
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


function UserManagement(_ref) {
  var users = _ref.users,
    filters = _ref.filters;
  var _useForm = (0,_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.useForm)(),
    post = _useForm.post,
    inertiaDelete = _useForm["delete"];
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(filters.search || ''),
    _useState2 = _slicedToArray(_useState, 2),
    search = _useState2[0],
    setSearch = _useState2[1];
  var handleSearch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    var value = e.target.value;
    setSearch(value);
    if (value === '') {
      Inertia.get('/users', {
        preserveState: true,
        preserveScroll: true,
        only: ['users']
      });
      return;
    }
    Inertia.get('/users', {
      search: value,
      preserveState: true,
      preserveScroll: true,
      only: ['users']
    });
  }, []);
  var handleDelete = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (userId) {
    if (confirm('Are you sure you want to delete this user?')) {
      inertiaDelete("/users/".concat(userId));
    }
  }, []);

  // Handle pagination
  var handlePagination = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (direction) {
    var currentPage = users.current_page;
    var nextPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (direction === 'next' && users.next_page_url) {
      Inertia.get('/users', {
        page: nextPage,
        search: search,
        preserveState: true,
        preserveScroll: true,
        only: ['users']
      });
    } else if (direction === 'prev' && users.prev_page_url) {
      Inertia.get('/users', {
        page: nextPage,
        search: search,
        preserveState: true,
        preserveScroll: true,
        only: ['users']
      });
    }
  }, [users, search]);

  // Handle clear search
  var clearSearch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setSearch('');
    Inertia.get('/users', {
      search: '',
      page: 1,
      preserveState: true,
      preserveScroll: true,
      only: ['users']
    });
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Head, {
    title: "Users"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "py-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "max-w-7xl mx-auto sm:px-6 lg:px-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "bg-white overflow-hidden shadow-sm sm:rounded-lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "p-6 text-gray-900"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex justify-between items-center mb-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", {
    className: "text-2xl font-bold"
  }, "Users"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "text",
    value: search,
    onChange: handleSearch,
    placeholder: "Search users...",
    className: "block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  }), search && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: clearSearch,
    className: "absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M6 18L18 6M6 6l12 12"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
    href: "/users/create",
    className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  }, "Add New User")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("table", {
    className: "min-w-full divide-y divide-gray-200"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("thead", {
    className: "bg-gray-50"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Email"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Company"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Contact"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Actions"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tbody", {
    className: "bg-white divide-y divide-gray-200"
  }, users.data.map(function (user) {
    var _user$profile, _user$profile2;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tr", {
      key: user.id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, user.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, user.email), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, ((_user$profile = user.profile) === null || _user$profile === void 0 ? void 0 : _user$profile.company_name) || 'N/A'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, ((_user$profile2 = user.profile) === null || _user$profile2 === void 0 ? void 0 : _user$profile2.contact_name) || 'N/A'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
      href: "/users/".concat(user.id, "/edit"),
      className: "text-indigo-600 hover:text-indigo-900 mr-2"
    }, "Edit"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      onClick: function onClick() {
        return deleteUser(user.id);
      },
      className: "text-red-600 hover:text-red-900"
    }, "Delete")));
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex justify-between items-center mt-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-sm text-gray-500"
  }, "Showing ", users.from, " to ", users.to, " of ", users.total, " results"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: function onClick() {
      return handlePagination('prev');
    },
    disabled: !users.prev_page_url,
    className: "px-4 py-2 border rounded-md ".concat(users.prev_page_url ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-gray-200 text-gray-400 cursor-not-allowed')
  }, "Previous"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: function onClick() {
      return handlePagination('next');
    },
    disabled: !users.next_page_url,
    className: "px-4 py-2 border rounded-md ".concat(users.next_page_url ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-gray-200 text-gray-400 cursor-not-allowed')
  }, "Next"))))))));
}

/***/ })

}]);