"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListField = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _nanoid = _interopRequireDefault(require("nanoid"));

var _Buttons = require("../Buttons");

var _Locales = require("../Locales");

var _helper = require("../helper");

var _array = require("../array");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ListField = (0, _react.forwardRef)(function (props, ref) {
  var _props$addText = props.addText,
      addText = _props$addText === void 0 ? (0, _Locales.useL10n)().Form.addNewField : _props$addText,
      label = props.label,
      onChange = props.onChange,
      _props$value = props.value,
      value = _props$value === void 0 ? [] : _props$value;
  var initialState = value.map(function (v) {
    return {
      key: (0, _nanoid["default"])(10),
      value: v
    };
  });

  var _useState = (0, _react.useState)(initialState),
      _useState2 = _slicedToArray(_useState, 2),
      store = _useState2[0],
      setStore = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      lastKey = _useState4[0],
      setLastKey = _useState4[1];

  var inputRefs = {};
  (0, _react.useEffect)(function () {
    onChange(_toConsumableArray(store.map(function (rec) {
      return rec.value;
    })));
  }, [store]);
  (0, _react.useEffect)(function () {
    lastKey && inputRefs[lastKey].focus();
  }, [lastKey]);

  var onInputChange = function onInputChange(key, e) {
    var value = e.target.value;
    setStore(function (prevStore) {
      return _array.PureArray.update(prevStore, ['key', key], {
        key: key,
        value: value
      });
    });
  };

  var add = function add(key) {
    var newKey = (0, _nanoid["default"])(10);
    setStore(function (prevStore) {
      var index = prevStore.findIndex(function (el) {
        return el.key === key;
      });
      return _array.PureArray.insert(prevStore, {
        key: newKey,
        value: ''
      }, index);
    });
    setLastKey(newKey);
  };

  var remove = function remove(key) {
    setStore(function (prevStore) {
      return _array.PureArray.remove(prevStore, ['key', key]);
    });
  };

  var handleKeyPress = function handleKeyPress(key, e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      add(key);
    }
  };

  var formItems = store.map(function (_ref, index) {
    var key = _ref.key,
        value = _ref.value;
    return _react["default"].createElement(_antd.Form.Item, {
      label: index === 0 ? label : '',
      required: false,
      key: key
    }, _react["default"].createElement("div", {
      style: {
        display: 'flex'
      }
    }, _react["default"].createElement(_antd.Input, {
      ref: function ref(input) {
        return inputRefs[key] = input;
      },
      value: value,
      onChange: onInputChange.bind(null, key),
      onKeyPress: handleKeyPress.bind(null, key)
    }), store.length > 1 ? _react["default"].createElement(_Buttons.IconButton, {
      type: "minus-circle-o",
      onClick: function onClick() {
        return remove(key);
      }
    }) : null));
  });
  return _react["default"].createElement("div", {
    ref: ref
  }, formItems, _react["default"].createElement(_antd.Form.Item, null, _react["default"].createElement(_Buttons.AddButton, {
    style: {
      width: '100%'
    },
    type: "dashed",
    onClick: add
  }, addText)));
});
exports.ListField = ListField;
ListField.defaultProps = {
  onChange: _helper.emptyFn
};
ListField.propTypes = {
  addText: _propTypes["default"].string
};