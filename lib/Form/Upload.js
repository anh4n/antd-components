"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Upload = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = require("../index");

var _Upload = _interopRequireDefault(require("antd/lib/upload/Upload"));

var _message = _interopRequireDefault(require("antd/lib/message"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./Upload.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var getListType = function getListType(type) {
  if (_typeof(type) === 'object' && type.image || typeof type === 'string' && type === 'image') {
    return 'picture';
  }
};

var getFileTypes = function getFileTypes(type) {
  if (_typeof(type) === 'object') {
    if (type.image) {
      return type.image;
    } else if (type.file) {
      return type.file;
    } else {
      _message["default"].error('invalid type. see property description in docs. ');
    }
  }

  return false;
};

var validate = function validate(type) {
  var fileTypes = getFileTypes(type);

  if (fileTypes && fileTypes.length > 0) {
    return function (file) {
      var needle = file.type.replace('image/', '').replace('file/', '');

      if (!fileTypes.includes(needle)) {
        _message["default"].error('You can only upload "' + fileTypes + '" files!', 8);

        return false;
      }

      return true;
    };
  }

  return function () {
    return true;
  };
};

var Upload = function Upload(props) {
  var onUploaded = props.onUploaded,
      onChange = props.onChange,
      defaultFileList = props.defaultFileList,
      customRequestData = props.customRequestData,
      listType = props.listType,
      action = props.action,
      type = props.type,
      children = props.children,
      restProps = _objectWithoutProperties(props, ["onUploaded", "onChange", "defaultFileList", "customRequestData", "listType", "action", "type", "children"]);

  if (defaultFileList) {
    defaultFileList.map(function (rec, idx) {
      return rec.uid = idx;
    });
  }

  listType = getListType(type);

  var onChangeData = function onChangeData(info) {
    onChange(info);

    if (info.file.status === 'uploading') {
      return;
    }

    if (info.file.status === 'done') {
      onUploaded(info.file.response);
    }
  };

  return _react["default"].createElement(_Upload["default"], _extends({
    className: "hangar-upload",
    defaultFileList: _toConsumableArray(defaultFileList),
    action: action,
    listType: listType,
    beforeUpload: validate(type),
    onChange: onChangeData,
    data: customRequestData
  }, restProps), _react["default"].createElement(_index.UploadButton, null, " ", children, " "));
};

exports.Upload = Upload;
Upload.defaultProps = {
  children: 'Upload',
  defaultFileList: [],
  onChange: function onChange() {},
  onUploaded: function onUploaded() {}
};
Upload.propTypes = {
  listType: _propTypes["default"].string,
  children: _propTypes["default"].string,
  type: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  action: _propTypes["default"].string,
  customRequestData: _propTypes["default"].object,
  defaultFileList: _propTypes["default"].arrayOf(_propTypes["default"].object),
  onUploaded: _propTypes["default"].func,
  onChange: _propTypes["default"].func
};