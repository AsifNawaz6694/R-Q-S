"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Auth_UserManagementCreate_jsx"],{

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

/***/ "./resources/js/Pages/Auth/UserManagementCreate.jsx":
/*!**********************************************************!*\
  !*** ./resources/js/Pages/Auth/UserManagementCreate.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserManagementCreate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _inertiajs_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/react */ "./node_modules/@inertiajs/react/dist/index.esm.js");
/* harmony import */ var _Components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Components/Button */ "./resources/js/Components/Button.jsx");
/* harmony import */ var _Components_Input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/Input */ "./resources/js/Components/Input.jsx");
/* harmony import */ var _Components_Label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/Label */ "./resources/js/Components/Label.jsx");





function UserManagementCreate() {
  var _data$errors, _data$errors2, _data$errors3;
  var _useForm = (0,_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.useForm)({
      errors: {},
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      company_name: '',
      contact_name: '',
      contact_number: '',
      contact_email: '',
      vat_number: ''
    }),
    data = _useForm.data,
    setData = _useForm.setData,
    post = _useForm.post,
    processing = _useForm.processing;
  var handleChange = function handleChange(event) {
    setData(event.target.name, event.target.value);
  };
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    post('/users', {
      preserveScroll: true,
      onSuccess: function onSuccess() {
        window.location.href = '/users';
      },
      onError: function onError(errors) {
        console.error('Create failed:', errors);
      }
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "py-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "max-w-7xl mx-auto sm:px-6 lg:px-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "bg-white overflow-hidden shadow-sm sm:rounded-lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "p-6 bg-white border-b border-gray-200"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex justify-between items-center mb-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", {
    className: "text-2xl font-bold"
  }, "Create User"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_inertiajs_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
    href: "/users",
    className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
  }, "Back to Users")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
    forInput: "name",
    value: "Name"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Input__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "text",
    name: "name",
    value: data.name,
    className: "mt-1 block w-full",
    handleChange: handleChange,
    required: true
  }), ((_data$errors = data.errors) === null || _data$errors === void 0 ? void 0 : _data$errors.name) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "mt-1 text-sm text-red-600"
  }, data.errors.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
    forInput: "email",
    value: "Email"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Input__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "email",
    name: "email",
    value: data.email,
    className: "mt-1 block w-full",
    handleChange: handleChange,
    required: true
  }), ((_data$errors2 = data.errors) === null || _data$errors2 === void 0 ? void 0 : _data$errors2.email) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "mt-1 text-sm text-red-600"
  }, data.errors.email)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
    forInput: "password",
    value: "Password"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Input__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "password",
    name: "password",
    value: data.password,
    className: "mt-1 block w-full",
    handleChange: handleChange,
    required: true
  }), ((_data$errors3 = data.errors) === null || _data$errors3 === void 0 ? void 0 : _data$errors3.password) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "mt-1 text-sm text-red-600"
  }, data.errors.password)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Label__WEBPACK_IMPORTED_MODULE_4__["default"], {
    forInput: "password_confirmation",
    value: "Confirm Password"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Input__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "password",
    name: "password_confirmation",
    value: data.password_confirmation,
    className: "mt-1 block w-full",
    handleChange: handleChange,
    required: true
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
  }, "Create User"))))))));
}

/***/ })

}]);