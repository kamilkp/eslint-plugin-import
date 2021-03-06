'use strict';

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _importDeclaration = require('../importDeclaration');

var _importDeclaration2 = _interopRequireDefault(_importDeclaration);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  meta: {
    docs: {
      url: (0, _docsUrl2.default)('no-named-as-default')
    }
  },

  create: function (context) {
    function checkDefault(nameKey, defaultSpecifier) {
      // #566: default is a valid specifier
      if (defaultSpecifier[nameKey].name === 'default') return;

      var declaration = (0, _importDeclaration2.default)(context);

      var imports = _ExportMap2.default.get(declaration.source.value, context);
      if (imports == null) return;

      if (imports.errors.length) {
        imports.reportErrors(context, declaration);
        return;
      }

      if (imports.has('default') && imports.has(defaultSpecifier[nameKey].name)) {

        context.report(defaultSpecifier, 'Using exported name \'' + defaultSpecifier[nameKey].name + '\' as identifier for default export.');
      }
    }
    return {
      'ImportDefaultSpecifier': checkDefault.bind(null, 'local'),
      'ExportDefaultSpecifier': checkDefault.bind(null, 'exported')
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLW5hbWVkLWFzLWRlZmF1bHQuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJkb2NzIiwidXJsIiwiY3JlYXRlIiwiY29udGV4dCIsImNoZWNrRGVmYXVsdCIsIm5hbWVLZXkiLCJkZWZhdWx0U3BlY2lmaWVyIiwibmFtZSIsImRlY2xhcmF0aW9uIiwiaW1wb3J0cyIsImdldCIsInNvdXJjZSIsInZhbHVlIiwiZXJyb3JzIiwibGVuZ3RoIiwicmVwb3J0RXJyb3JzIiwiaGFzIiwicmVwb3J0IiwiYmluZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkMsVUFBTTtBQUNKQyxXQUFLLHVCQUFRLHFCQUFSO0FBREQ7QUFERixHQURTOztBQU9mQyxVQUFRLFVBQVVDLE9BQVYsRUFBbUI7QUFDekIsYUFBU0MsWUFBVCxDQUFzQkMsT0FBdEIsRUFBK0JDLGdCQUEvQixFQUFpRDtBQUMvQztBQUNBLFVBQUlBLGlCQUFpQkQsT0FBakIsRUFBMEJFLElBQTFCLEtBQW1DLFNBQXZDLEVBQWtEOztBQUVsRCxVQUFJQyxjQUFjLGlDQUFrQkwsT0FBbEIsQ0FBbEI7O0FBRUEsVUFBSU0sVUFBVSxvQkFBUUMsR0FBUixDQUFZRixZQUFZRyxNQUFaLENBQW1CQyxLQUEvQixFQUFzQ1QsT0FBdEMsQ0FBZDtBQUNBLFVBQUlNLFdBQVcsSUFBZixFQUFxQjs7QUFFckIsVUFBSUEsUUFBUUksTUFBUixDQUFlQyxNQUFuQixFQUEyQjtBQUN6QkwsZ0JBQVFNLFlBQVIsQ0FBcUJaLE9BQXJCLEVBQThCSyxXQUE5QjtBQUNBO0FBQ0Q7O0FBRUQsVUFBSUMsUUFBUU8sR0FBUixDQUFZLFNBQVosS0FDQVAsUUFBUU8sR0FBUixDQUFZVixpQkFBaUJELE9BQWpCLEVBQTBCRSxJQUF0QyxDQURKLEVBQ2lEOztBQUUvQ0osZ0JBQVFjLE1BQVIsQ0FBZVgsZ0JBQWYsRUFDRSwyQkFBMkJBLGlCQUFpQkQsT0FBakIsRUFBMEJFLElBQXJELEdBQ0Esc0NBRkY7QUFJRDtBQUNGO0FBQ0QsV0FBTztBQUNMLGdDQUEwQkgsYUFBYWMsSUFBYixDQUFrQixJQUFsQixFQUF3QixPQUF4QixDQURyQjtBQUVMLGdDQUEwQmQsYUFBYWMsSUFBYixDQUFrQixJQUFsQixFQUF3QixVQUF4QjtBQUZyQixLQUFQO0FBSUQ7QUFuQ2MsQ0FBakIiLCJmaWxlIjoicnVsZXMvbm8tbmFtZWQtYXMtZGVmYXVsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeHBvcnRzIGZyb20gJy4uL0V4cG9ydE1hcCdcbmltcG9ydCBpbXBvcnREZWNsYXJhdGlvbiBmcm9tICcuLi9pbXBvcnREZWNsYXJhdGlvbidcbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgZG9jczoge1xuICAgICAgdXJsOiBkb2NzVXJsKCduby1uYW1lZC1hcy1kZWZhdWx0JyksXG4gICAgfSxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgZnVuY3Rpb24gY2hlY2tEZWZhdWx0KG5hbWVLZXksIGRlZmF1bHRTcGVjaWZpZXIpIHtcbiAgICAgIC8vICM1NjY6IGRlZmF1bHQgaXMgYSB2YWxpZCBzcGVjaWZpZXJcbiAgICAgIGlmIChkZWZhdWx0U3BlY2lmaWVyW25hbWVLZXldLm5hbWUgPT09ICdkZWZhdWx0JykgcmV0dXJuXG5cbiAgICAgIHZhciBkZWNsYXJhdGlvbiA9IGltcG9ydERlY2xhcmF0aW9uKGNvbnRleHQpXG5cbiAgICAgIHZhciBpbXBvcnRzID0gRXhwb3J0cy5nZXQoZGVjbGFyYXRpb24uc291cmNlLnZhbHVlLCBjb250ZXh0KVxuICAgICAgaWYgKGltcG9ydHMgPT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGlmIChpbXBvcnRzLmVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgaW1wb3J0cy5yZXBvcnRFcnJvcnMoY29udGV4dCwgZGVjbGFyYXRpb24pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoaW1wb3J0cy5oYXMoJ2RlZmF1bHQnKSAmJlxuICAgICAgICAgIGltcG9ydHMuaGFzKGRlZmF1bHRTcGVjaWZpZXJbbmFtZUtleV0ubmFtZSkpIHtcblxuICAgICAgICBjb250ZXh0LnJlcG9ydChkZWZhdWx0U3BlY2lmaWVyLFxuICAgICAgICAgICdVc2luZyBleHBvcnRlZCBuYW1lIFxcJycgKyBkZWZhdWx0U3BlY2lmaWVyW25hbWVLZXldLm5hbWUgK1xuICAgICAgICAgICdcXCcgYXMgaWRlbnRpZmllciBmb3IgZGVmYXVsdCBleHBvcnQuJylcblxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgJ0ltcG9ydERlZmF1bHRTcGVjaWZpZXInOiBjaGVja0RlZmF1bHQuYmluZChudWxsLCAnbG9jYWwnKSxcbiAgICAgICdFeHBvcnREZWZhdWx0U3BlY2lmaWVyJzogY2hlY2tEZWZhdWx0LmJpbmQobnVsbCwgJ2V4cG9ydGVkJyksXG4gICAgfVxuICB9LFxufVxuIl19