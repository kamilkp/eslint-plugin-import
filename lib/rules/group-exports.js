'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const meta = {
  docs: {
    url: (0, _docsUrl2.default)('group-exports')
  }
  /* eslint-disable max-len */
};const errors = {
  ExportNamedDeclaration: 'Multiple named export declarations; consolidate all named exports into a single export declaration',
  AssignmentExpression: 'Multiple CommonJS exports; consolidate all exports into a single assignment to `module.exports`'
  /* eslint-enable max-len */

  /**
   * Returns an array with names of the properties in the accessor chain for MemberExpression nodes
   *
   * Example:
   *
   * `module.exports = {}` => ['module', 'exports']
   * `module.exports.property = true` => ['module', 'exports', 'property']
   *
   * @param     {Node}    node    AST Node (MemberExpression)
   * @return    {Array}           Array with the property names in the chain
   * @private
   */
};function accessorChain(node) {
  const chain = [];

  do {
    chain.unshift(node.property.name);

    if (node.object.type === 'Identifier') {
      chain.unshift(node.object.name);
      break;
    }

    node = node.object;
  } while (node.type === 'MemberExpression');

  return chain;
}

function create(context) {
  const nodes = {
    modules: new Set(),
    commonjs: new Set()
  };

  return {
    ExportNamedDeclaration(node) {
      nodes.modules.add(node);
    },

    AssignmentExpression(node) {
      if (node.left.type !== 'MemberExpression') {
        return;
      }

      const chain = accessorChain(node.left);

      // Assignments to module.exports
      // Deeper assignments are ignored since they just modify what's already being exported
      // (ie. module.exports.exported.prop = true is ignored)
      if (chain[0] === 'module' && chain[1] === 'exports' && chain.length <= 3) {
        nodes.commonjs.add(node);
        return;
      }

      // Assignments to exports (exports.* = *)
      if (chain[0] === 'exports' && chain.length === 2) {
        nodes.commonjs.add(node);
        return;
      }
    },

    'Program:exit': function onExit() {
      // Report multiple `export` declarations (ES2015 modules)
      if (nodes.modules.size > 1) {
        nodes.modules.forEach(node => {
          context.report({
            node,
            message: errors[node.type]
          });
        });
      }

      // Report multiple `module.exports` assignments (CommonJS)
      if (nodes.commonjs.size > 1) {
        nodes.commonjs.forEach(node => {
          context.report({
            node,
            message: errors[node.type]
          });
        });
      }
    }
  };
}

exports.default = {
  meta,
  create
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2dyb3VwLWV4cG9ydHMuanMiXSwibmFtZXMiOlsibWV0YSIsImRvY3MiLCJ1cmwiLCJlcnJvcnMiLCJFeHBvcnROYW1lZERlY2xhcmF0aW9uIiwiQXNzaWdubWVudEV4cHJlc3Npb24iLCJhY2Nlc3NvckNoYWluIiwibm9kZSIsImNoYWluIiwidW5zaGlmdCIsInByb3BlcnR5IiwibmFtZSIsIm9iamVjdCIsInR5cGUiLCJjcmVhdGUiLCJjb250ZXh0Iiwibm9kZXMiLCJtb2R1bGVzIiwiU2V0IiwiY29tbW9uanMiLCJhZGQiLCJsZWZ0IiwibGVuZ3RoIiwib25FeGl0Iiwic2l6ZSIsImZvckVhY2giLCJyZXBvcnQiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUEsTUFBTUEsT0FBTztBQUNYQyxRQUFNO0FBQ0pDLFNBQUssdUJBQVEsZUFBUjtBQUREO0FBSVI7QUFMYSxDQUFiLENBTUEsTUFBTUMsU0FBUztBQUNiQywwQkFBd0Isb0dBRFg7QUFFYkMsd0JBQXNCO0FBRXhCOztBQUVBOzs7Ozs7Ozs7Ozs7QUFOZSxDQUFmLENBa0JBLFNBQVNDLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCO0FBQzNCLFFBQU1DLFFBQVEsRUFBZDs7QUFFQSxLQUFHO0FBQ0RBLFVBQU1DLE9BQU4sQ0FBY0YsS0FBS0csUUFBTCxDQUFjQyxJQUE1Qjs7QUFFQSxRQUFJSixLQUFLSyxNQUFMLENBQVlDLElBQVosS0FBcUIsWUFBekIsRUFBdUM7QUFDckNMLFlBQU1DLE9BQU4sQ0FBY0YsS0FBS0ssTUFBTCxDQUFZRCxJQUExQjtBQUNBO0FBQ0Q7O0FBRURKLFdBQU9BLEtBQUtLLE1BQVo7QUFDRCxHQVRELFFBU1NMLEtBQUtNLElBQUwsS0FBYyxrQkFUdkI7O0FBV0EsU0FBT0wsS0FBUDtBQUNEOztBQUVELFNBQVNNLE1BQVQsQ0FBZ0JDLE9BQWhCLEVBQXlCO0FBQ3ZCLFFBQU1DLFFBQVE7QUFDWkMsYUFBUyxJQUFJQyxHQUFKLEVBREc7QUFFWkMsY0FBVSxJQUFJRCxHQUFKO0FBRkUsR0FBZDs7QUFLQSxTQUFPO0FBQ0xkLDJCQUF1QkcsSUFBdkIsRUFBNkI7QUFDM0JTLFlBQU1DLE9BQU4sQ0FBY0csR0FBZCxDQUFrQmIsSUFBbEI7QUFDRCxLQUhJOztBQUtMRix5QkFBcUJFLElBQXJCLEVBQTJCO0FBQ3pCLFVBQUlBLEtBQUtjLElBQUwsQ0FBVVIsSUFBVixLQUFtQixrQkFBdkIsRUFBMkM7QUFDekM7QUFDRDs7QUFFRCxZQUFNTCxRQUFRRixjQUFjQyxLQUFLYyxJQUFuQixDQUFkOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQUliLE1BQU0sQ0FBTixNQUFhLFFBQWIsSUFBeUJBLE1BQU0sQ0FBTixNQUFhLFNBQXRDLElBQW1EQSxNQUFNYyxNQUFOLElBQWdCLENBQXZFLEVBQTBFO0FBQ3hFTixjQUFNRyxRQUFOLENBQWVDLEdBQWYsQ0FBbUJiLElBQW5CO0FBQ0E7QUFDRDs7QUFFRDtBQUNBLFVBQUlDLE1BQU0sQ0FBTixNQUFhLFNBQWIsSUFBMEJBLE1BQU1jLE1BQU4sS0FBaUIsQ0FBL0MsRUFBa0Q7QUFDaEROLGNBQU1HLFFBQU4sQ0FBZUMsR0FBZixDQUFtQmIsSUFBbkI7QUFDQTtBQUNEO0FBQ0YsS0F6Qkk7O0FBMkJMLG9CQUFnQixTQUFTZ0IsTUFBVCxHQUFrQjtBQUNoQztBQUNBLFVBQUlQLE1BQU1DLE9BQU4sQ0FBY08sSUFBZCxHQUFxQixDQUF6QixFQUE0QjtBQUMxQlIsY0FBTUMsT0FBTixDQUFjUSxPQUFkLENBQXNCbEIsUUFBUTtBQUM1QlEsa0JBQVFXLE1BQVIsQ0FBZTtBQUNibkIsZ0JBRGE7QUFFYm9CLHFCQUFTeEIsT0FBT0ksS0FBS00sSUFBWjtBQUZJLFdBQWY7QUFJRCxTQUxEO0FBTUQ7O0FBRUQ7QUFDQSxVQUFJRyxNQUFNRyxRQUFOLENBQWVLLElBQWYsR0FBc0IsQ0FBMUIsRUFBNkI7QUFDM0JSLGNBQU1HLFFBQU4sQ0FBZU0sT0FBZixDQUF1QmxCLFFBQVE7QUFDN0JRLGtCQUFRVyxNQUFSLENBQWU7QUFDYm5CLGdCQURhO0FBRWJvQixxQkFBU3hCLE9BQU9JLEtBQUtNLElBQVo7QUFGSSxXQUFmO0FBSUQsU0FMRDtBQU1EO0FBQ0Y7QUEvQ0ksR0FBUDtBQWlERDs7a0JBRWM7QUFDYmIsTUFEYTtBQUViYztBQUZhLEMiLCJmaWxlIjoicnVsZXMvZ3JvdXAtZXhwb3J0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbmNvbnN0IG1ldGEgPSB7XG4gIGRvY3M6IHtcbiAgICB1cmw6IGRvY3NVcmwoJ2dyb3VwLWV4cG9ydHMnKSxcbiAgfSxcbn1cbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmNvbnN0IGVycm9ycyA9IHtcbiAgRXhwb3J0TmFtZWREZWNsYXJhdGlvbjogJ011bHRpcGxlIG5hbWVkIGV4cG9ydCBkZWNsYXJhdGlvbnM7IGNvbnNvbGlkYXRlIGFsbCBuYW1lZCBleHBvcnRzIGludG8gYSBzaW5nbGUgZXhwb3J0IGRlY2xhcmF0aW9uJyxcbiAgQXNzaWdubWVudEV4cHJlc3Npb246ICdNdWx0aXBsZSBDb21tb25KUyBleHBvcnRzOyBjb25zb2xpZGF0ZSBhbGwgZXhwb3J0cyBpbnRvIGEgc2luZ2xlIGFzc2lnbm1lbnQgdG8gYG1vZHVsZS5leHBvcnRzYCcsXG59XG4vKiBlc2xpbnQtZW5hYmxlIG1heC1sZW4gKi9cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IHdpdGggbmFtZXMgb2YgdGhlIHByb3BlcnRpZXMgaW4gdGhlIGFjY2Vzc29yIGNoYWluIGZvciBNZW1iZXJFeHByZXNzaW9uIG5vZGVzXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgbW9kdWxlLmV4cG9ydHMgPSB7fWAgPT4gWydtb2R1bGUnLCAnZXhwb3J0cyddXG4gKiBgbW9kdWxlLmV4cG9ydHMucHJvcGVydHkgPSB0cnVlYCA9PiBbJ21vZHVsZScsICdleHBvcnRzJywgJ3Byb3BlcnR5J11cbiAqXG4gKiBAcGFyYW0gICAgIHtOb2RlfSAgICBub2RlICAgIEFTVCBOb2RlIChNZW1iZXJFeHByZXNzaW9uKVxuICogQHJldHVybiAgICB7QXJyYXl9ICAgICAgICAgICBBcnJheSB3aXRoIHRoZSBwcm9wZXJ0eSBuYW1lcyBpbiB0aGUgY2hhaW5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFjY2Vzc29yQ2hhaW4obm9kZSkge1xuICBjb25zdCBjaGFpbiA9IFtdXG5cbiAgZG8ge1xuICAgIGNoYWluLnVuc2hpZnQobm9kZS5wcm9wZXJ0eS5uYW1lKVxuXG4gICAgaWYgKG5vZGUub2JqZWN0LnR5cGUgPT09ICdJZGVudGlmaWVyJykge1xuICAgICAgY2hhaW4udW5zaGlmdChub2RlLm9iamVjdC5uYW1lKVxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBub2RlID0gbm9kZS5vYmplY3RcbiAgfSB3aGlsZSAobm9kZS50eXBlID09PSAnTWVtYmVyRXhwcmVzc2lvbicpXG5cbiAgcmV0dXJuIGNoYWluXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZShjb250ZXh0KSB7XG4gIGNvbnN0IG5vZGVzID0ge1xuICAgIG1vZHVsZXM6IG5ldyBTZXQoKSxcbiAgICBjb21tb25qczogbmV3IFNldCgpLFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBFeHBvcnROYW1lZERlY2xhcmF0aW9uKG5vZGUpIHtcbiAgICAgIG5vZGVzLm1vZHVsZXMuYWRkKG5vZGUpXG4gICAgfSxcblxuICAgIEFzc2lnbm1lbnRFeHByZXNzaW9uKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLmxlZnQudHlwZSAhPT0gJ01lbWJlckV4cHJlc3Npb24nKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGFpbiA9IGFjY2Vzc29yQ2hhaW4obm9kZS5sZWZ0KVxuXG4gICAgICAvLyBBc3NpZ25tZW50cyB0byBtb2R1bGUuZXhwb3J0c1xuICAgICAgLy8gRGVlcGVyIGFzc2lnbm1lbnRzIGFyZSBpZ25vcmVkIHNpbmNlIHRoZXkganVzdCBtb2RpZnkgd2hhdCdzIGFscmVhZHkgYmVpbmcgZXhwb3J0ZWRcbiAgICAgIC8vIChpZS4gbW9kdWxlLmV4cG9ydHMuZXhwb3J0ZWQucHJvcCA9IHRydWUgaXMgaWdub3JlZClcbiAgICAgIGlmIChjaGFpblswXSA9PT0gJ21vZHVsZScgJiYgY2hhaW5bMV0gPT09ICdleHBvcnRzJyAmJiBjaGFpbi5sZW5ndGggPD0gMykge1xuICAgICAgICBub2Rlcy5jb21tb25qcy5hZGQobm9kZSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIEFzc2lnbm1lbnRzIHRvIGV4cG9ydHMgKGV4cG9ydHMuKiA9ICopXG4gICAgICBpZiAoY2hhaW5bMF0gPT09ICdleHBvcnRzJyAmJiBjaGFpbi5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgbm9kZXMuY29tbW9uanMuYWRkKG5vZGUpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH0sXG5cbiAgICAnUHJvZ3JhbTpleGl0JzogZnVuY3Rpb24gb25FeGl0KCkge1xuICAgICAgLy8gUmVwb3J0IG11bHRpcGxlIGBleHBvcnRgIGRlY2xhcmF0aW9ucyAoRVMyMDE1IG1vZHVsZXMpXG4gICAgICBpZiAobm9kZXMubW9kdWxlcy5zaXplID4gMSkge1xuICAgICAgICBub2Rlcy5tb2R1bGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yc1tub2RlLnR5cGVdLFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIC8vIFJlcG9ydCBtdWx0aXBsZSBgbW9kdWxlLmV4cG9ydHNgIGFzc2lnbm1lbnRzIChDb21tb25KUylcbiAgICAgIGlmIChub2Rlcy5jb21tb25qcy5zaXplID4gMSkge1xuICAgICAgICBub2Rlcy5jb21tb25qcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvcnNbbm9kZS50eXBlXSxcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBtZXRhLFxuICBjcmVhdGUsXG59XG4iXX0=