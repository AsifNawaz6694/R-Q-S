"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Auth_UserManagementEdit_jsx"],{

/***/ "./resources/js/Components/Button.jsx":
/*!********************************************!*\
  !*** ./resources/js/Components/Button.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _inertiajs_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/react */ "./node_modules/@inertiajs/react/dist/index.esm.js");


function Button(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'submit' : _ref$type,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    processing = _ref.processing,
    children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: type,
    className: "inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ".concat(processing && 'opacity-25', " ") + className,
    disabled: processing
  }, children);
}

/***/ }),

/***/ "./resources/js/Components/Input.jsx":
/*!*******************************************!*\
  !*** ./resources/js/Components/Input.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

function Input(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'text' : _ref$type,
    name = _ref.name,
    value = _ref.value,
    className = _ref.className,
    autoComplete = _ref.autoComplete,
    required = _ref.required,
    isFocused = _ref.isFocused,
    handleChange = _ref.handleChange;
  var input = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (isFocused) {
      input.current.focus();
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex flex-col items-start"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: type,
    name: name,
    value: value,
    className: "border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm " + className,
    ref: input,
    autoComplete: autoComplete,
    required: required,
    onChange: function onChange(e) {
      return handleChange(e);
    }
  }));
}

/***/ }),

/***/ "./resources/js/Components/Label.jsx":
/*!*******************************************!*\
  !*** ./resources/js/Components/Label.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Label)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

function Label(_ref) {
  var forInput = _ref.forInput,
    value = _ref.value,
    className = _ref.className,
    children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: forInput,
    className: "block font-medium text-sm text-gray-700 " + className
  }, value ? value : children);
}

/***/ }),

/***/ "./resources/js/Pages/Auth/UserManagementEdit.jsx":
/*!********************************************************!*\
  !*** ./resources/js/Pages/Auth/UserManagementEdit.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserManagementEdit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _inertiajs_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/react */ "./node_modules/@inertiajs/react/dist/index.esm.js");
/* harmony import */ var _Components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Components/Button */ "./resources/js/Components/Button.jsx");
/* harmony import */ var _Components_Input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/Input */ "./resources/js/Components/Input.jsx");
/* harmony import */ var _Components_Label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/Label */ "./resources/js/Components/Label.jsx");
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





function UserManagementEdit(_ref) {
  var _user$profile, _user$profile2, _user$profile3, _user$profile4, _user$profile5;
  var user = _ref.user;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState({}),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    errorMessages = _React$useState2[0],
    setErrorMessages = _React$useState2[1];
  var _useForm = (0,_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.useForm)({
      name: user.name || '',
      email: user.email || '',
      password: '',
      password_confirmation: '',
      company_name: ((_user$profile = user.profile) === null || _user$profile === void 0 ? void 0 : _user$profile.company_name) || '',
      contact_name: ((_user$profile2 = user.profile) === null || _user$profile2 === void 0 ? void 0 : _user$profile2.contact_name) || '',
      contact_number: ((_user$profile3 = user.profile) === null || _user$profile3 === void 0 ? void 0 : _user$profile3.contact_number) || '',
      contact_email: ((_user$profile4 = user.profile) === null || _user$profile4 === void 0 ? void 0 : _user$profile4.contact_email) || '',
      vat_number: ((_user$profile5 = user.profile) === null || _user$profile5 === void 0 ? void 0 : _user$profile5.vat_number) || ''
    }),
    data = _useForm.data,
    setData = _useForm.setData,
    put = _useForm.put,
    reset = _useForm.reset,
    errors = _useForm.errors,
    processing = _useForm.processing;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return function () {
      // Reset password fields when component unmounts
      setData('password', '');
      setData('password_confirmation', '');
    };
  }, []);
  var handleChange = function handleChange(event) {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    put("/users/".concat(user.id), {
      preserveScroll: true,
      onSuccess: function onSuccess() {
        // Reset form data after successful update
        reset();
        // Navigate back to users list
        window.location.href = '/users';
      },
      onError: function onError() {
        // Handle validation errors
        console.error('Update failed:', errors);
        // Show error messages
        // Error messages are automatically handled by Inertia's errors state
      }
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Head, {
    title: "Edit User"
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", {
    className: "text-2xl font-bold"
  }, "Edit User"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex space-x-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
    href: "/users",
    className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  }, "Back to Users"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    onSubmit: handleSubmit,
    className: "mb-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
    forInput: "name",
    value: "Name"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Input__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "text",
    name: "name",
    value: data.name,
    className: "mt-1 block w-full",
    handleChange: handleChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
    forInput: "email",
    value: "Email"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Input__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "email",
    name: "email",
    value: data.email,
    className: "mt-1 block w-full",
    handleChange: handleChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
    forInput: "password",
    value: "Password"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Input__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "password",
    name: "password",
    value: data.password,
    className: "mt-1 block w-full",
    handleChange: handleChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
    forInput: "password_confirmation",
    value: "Confirm Password"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Input__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "password",
    name: "password_confirmation",
    value: data.password_confirmation,
    className: "mt-1 block w-full",
    handleChange: handleChange
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
    className: "text-lg font-semibold mb-4"
  }, "Profile Information"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
    forInput: "company_name",
    value: "Company Name"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Input__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "text",
    name: "company_name",
    value: data.company_name,
    className: "mt-1 block w-full",
    handleChange: handleChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
    forInput: "vat_number",
    value: "VAT Number"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Input__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "text",
    name: "vat_number",
    value: data.vat_number,
    className: "mt-1 block w-full",
    handleChange: handleChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
    forInput: "contact_name",
    value: "Contact Name"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Input__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "text",
    name: "contact_name",
    value: data.contact_name,
    className: "mt-1 block w-full",
    handleChange: handleChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
    forInput: "contact_number",
    value: "Contact Number"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Input__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "text",
    name: "contact_number",
    value: data.contact_number,
    className: "mt-1 block w-full",
    handleChange: handleChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "col-span-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
    forInput: "contact_email",
    value: "Contact Email"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Input__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "email",
    name: "contact_email",
    value: data.contact_email,
    className: "mt-1 block w-full",
    handleChange: handleChange
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-4 flex justify-end"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    processing: processing
  }, processing ? 'Updating...' : 'Update User')), errors && Object.keys(errors).length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", null, Object.entries(errorMessages).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      field = _ref3[0],
      message = _ref3[1];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
      key: field,
      className: "text-sm"
    }, message);
  }))))))))));
}

/***/ })

}]);