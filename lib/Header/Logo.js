"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logo = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Logo = function Logo(props) {
  var children = props.children,
      to = props.to,
      image = props.image,
      version = props.version,
      restProps = _objectWithoutProperties(props, ["children", "to", "image", "version"]);

  return _react["default"].createElement("div", _extends({
    className: 'logo'
  }, restProps), _react["default"].createElement(_reactRouterDom.Link, {
    to: to
  }, image ? _react["default"].createElement("div", {
    className: 'image'
  }, _react["default"].createElement("img", {
    src: image
  })) : null, _react["default"].createElement("div", {
    className: 'text'
  }, children, version ? _react["default"].createElement(_antd.Badge, {
    className: 'version-badge',
    count: version
  }) : null)));
};

exports.Logo = Logo;
Logo.defaultProps = {
  to: '/'
};
Logo.propTypes = {
  children: _propTypes["default"].string,
  to: _propTypes["default"].string,
  image: _propTypes["default"].string,
  version: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].string])
};
Logo.displayName = 'Logo';