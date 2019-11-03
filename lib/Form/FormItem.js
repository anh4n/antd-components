"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormItem = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * @return {React.Component}
 *
 * @constructor
 */
var FormItem = function FormItem(props) {
  var title = props.title,
      dataIndex = props.dataIndex,
      form = props.form,
      valuePropName = props.valuePropName,
      required = props.required,
      initialValue = props.initialValue,
      children = props.children,
      restProps = _objectWithoutProperties(props, ["title", "dataIndex", "form", "valuePropName", "required", "initialValue", "children"]);

  var getFieldDecorator = form.getFieldDecorator;
  var rules = [{
    required: required
  }].concat(_toConsumableArray(props.rules));
  return _react["default"].createElement(_antd.Form.Item, _extends({
    label: title
  }, restProps), getFieldDecorator(dataIndex, {
    initialValue: initialValue,
    valuePropName: valuePropName,
    rules: rules
  })(children));
};

exports.FormItem = FormItem;
FormItem.defaultProps = {
  valuePropName: 'value',
  required: false,
  rules: []
};
FormItem.propTypes = {
  title: _propTypes["default"].string,
  dataIndex: _propTypes["default"].string,
  initialValue: _propTypes["default"].any,
  form: _propTypes["default"].object,
  required: _propTypes["default"].bool,
  rules: _propTypes["default"].array
};