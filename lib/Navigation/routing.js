"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllSubmenuRoutes = exports.getActiveRoutes = exports.renderRoutes = void 0;

var _reactRouter = require("react-router");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var renderRoutes = function renderRoutes(routes) {
  var parentPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return routes.map(function (route) {
    var submenu = route.submenu,
        path = route.path;
    var currentPath = parentPath + path;

    if (submenu) {
      return renderRoutes(submenu, currentPath);
    }

    return _react["default"].createElement(_reactRouter.Route, _extends({}, route, {
      path: currentPath
    }));
  });
};

exports.renderRoutes = renderRoutes;

var getActiveRoutes = function getActiveRoutes(routes, location) {
  var parentPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var activeRoutes = [];
  routes.forEach(function (route) {
    var currentPath = parentPath + route.path;
    var match = (0, _reactRouter.matchPath)(location.pathname, {
      path: currentPath,
      exact: route.exact || false,
      strict: route.strict || false
    });

    if (match) {
      activeRoutes.push(route.key);
    }

    var subitem = route.submenu || route.group;

    if (subitem) {
      activeRoutes = [].concat(_toConsumableArray(activeRoutes), _toConsumableArray(getActiveRoutes(subitem, location, route.group ? parentPath : currentPath)));
    }
  });
  return activeRoutes;
};

exports.getActiveRoutes = getActiveRoutes;

var getAllSubmenuRoutes = function getAllSubmenuRoutes(routes) {
  var activeRoutes = [];
  routes.forEach(function (route) {
    var subitem = route.submenu || route.group;

    if (subitem) {
      if (route.submenu) {
        activeRoutes.push(route.key);
      }

      activeRoutes = [].concat(_toConsumableArray(activeRoutes), _toConsumableArray(getAllSubmenuRoutes(subitem)));
    }
  });
  return activeRoutes;
};

exports.getAllSubmenuRoutes = getAllSubmenuRoutes;