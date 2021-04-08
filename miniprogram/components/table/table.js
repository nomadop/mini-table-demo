"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../utils/util");
var chunk = require('../../utils/lodash/chunk.js');
var maxBy = require('../../utils/lodash/maxby.js');
Component({
    properties: {
        height: {
            type: Number,
            value: 300,
        },
        columns: {
            type: Array,
            value: [],
        },
        rowData: {
            type: Array,
            value: [],
        },
    },
    data: {
        visibility: 'hidden',
        columnWidths: [],
        rowHeights: [],
        headerHeight: 'auto',
        bodyHeight: 'auto',
        bodyWidth: 'max-content',
        extraRows: 0,
        extraColumns: 0,
        canVerticalScroll: true,
        canHorizontalScroll: true,
        baseHeight: 'auto',
        baseWidth: 'auto',
    },
    lifetimes: {
        attached: function () {
            this.setData({
                columnWidths: Array(this.properties.columns.length).fill('auto'),
                rowHeights: Array(this.properties.rowData.length).fill('auto'),
                bodyHeight: this.properties.height - 40 + "rpx",
            });
        },
        ready: function () {
            var _this = this;
            var selector = this.createSelectorQuery();
            selector.select('.table-container').fields({ computedStyle: ['height'] });
            selector.select('#static-cell').fields({ computedStyle: ['width', 'height'] });
            selector.select('.table-body-viewport').fields({ computedStyle: ['width', 'height'] });
            selector.selectAll('.table-header-container .table-cell').fields({ computedStyle: ['width', 'height'] });
            selector.selectAll('.table-body-container .table-row').fields({ computedStyle: ['height'] });
            selector.selectAll('.table-body-container .table-cell').fields({ computedStyle: ['width'] });
            selector.select('.table-body-viewport').node();
            selector.select('.table-body-horizontal-viewport').node();
            selector.exec(function (result) {
                var containerHeightResult = result[0], staticCellSizeResult = result[1], bodyViewportSizeResult = result[2], headerCellSizeResults = result[3], rowHeightResults = result[4], bodyCellWidthResults = result[5], bodyViewport = result[6], bodyHorizontalViewport = result[7];
                var baseHeight = staticCellSizeResult.height, baseWidth = staticCellSizeResult.width;
                var columnWidths = _this.getColumnWidth(headerCellSizeResults, bodyCellWidthResults);
                var maxHeaderHeightRes = maxBy(headerCellSizeResults, function (res) { return parseFloat(res.height); });
                var rowHeights = rowHeightResults.map(function (res) { return res.height; });
                var extraRows = _this.getExtraCells(bodyViewportSizeResult.height, rowHeights, baseHeight);
                var extraColumns = _this.getExtraCells(bodyViewportSizeResult.width, columnWidths, baseWidth);
                var bodyWidth = util_1.sumSize(columnWidths) + extraColumns * parseFloat(baseWidth) + "px";
                var bodyHeight = parseFloat(containerHeightResult.height) - parseFloat(maxHeaderHeightRes.height) + "px";
                _this.setViewportBounces(bodyViewport, bodyHorizontalViewport);
                _this.setData({
                    visibility: 'visible',
                    baseWidth: baseWidth,
                    baseHeight: baseHeight,
                    headerHeight: maxHeaderHeightRes.height,
                    bodyHeight: bodyHeight,
                    rowHeights: rowHeights,
                    columnWidths: columnWidths,
                    bodyWidth: bodyWidth,
                    extraRows: extraRows,
                    extraColumns: extraColumns,
                    canVerticalScroll: extraRows === 0,
                    canHorizontalScroll: extraColumns === 0,
                });
            });
        }
    },
    methods: {
        getColumnWidth: function (headerCellSizeResults, bodyCellWidthResults) {
            var columnWidths = headerCellSizeResults.map(function (cell) { return cell.width; });
            chunk(bodyCellWidthResults, this.properties.columns.length).forEach(function (row) {
                row.forEach(function (_a, index) {
                    var width = _a.width;
                    if (parseFloat(width) > parseFloat(columnWidths[index])) {
                        columnWidths[index] = width;
                    }
                });
            });
            return columnWidths;
        },
        getExtraCells: function (bodyViewportSize, sizes, baseSize) {
            var rowHeightsSum = util_1.sumSize(sizes);
            var deltaHeight = parseFloat(bodyViewportSize) - rowHeightsSum;
            return deltaHeight > 0 ? Math.ceil(deltaHeight / parseFloat(baseSize)) : 0;
        },
        setViewportBounces: function () {
            var viewports = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                viewports[_i] = arguments[_i];
            }
            viewports.forEach(function (viewport) { return viewport.node.bounces = false; });
        },
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUEyQztBQUUzQyxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUNyRCxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQU9yRCxTQUFTLENBQUM7SUFDUixVQUFVLEVBQUU7UUFDVixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxHQUFHO1NBQ1g7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxFQUFFO1NBQ1Y7S0FDRjtJQUNELElBQUksRUFBRTtRQUNKLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLFlBQVksRUFBRSxFQUFjO1FBQzVCLFVBQVUsRUFBRSxFQUFjO1FBQzFCLFlBQVksRUFBRSxNQUFNO1FBQ3BCLFVBQVUsRUFBRSxNQUFNO1FBQ2xCLFNBQVMsRUFBRSxhQUFhO1FBQ3hCLFNBQVMsRUFBRSxDQUFDO1FBQ1osWUFBWSxFQUFFLENBQUM7UUFDZixpQkFBaUIsRUFBRSxJQUFJO1FBQ3ZCLG1CQUFtQixFQUFFLElBQUk7UUFDekIsVUFBVSxFQUFFLE1BQU07UUFDbEIsU0FBUyxFQUFFLE1BQU07S0FDbEI7SUFDRCxTQUFTLEVBQUU7UUFDVCxRQUFRLEVBQVI7WUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFlBQVksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDaEUsVUFBVSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUM5RCxVQUFVLEVBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxRQUFLO2FBQ2hELENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxLQUFLLEVBQUw7WUFBQSxpQkE2Q0M7WUE1Q0MsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDNUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxRSxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLGFBQWEsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDL0UsUUFBUSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLGFBQWEsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkYsUUFBUSxDQUFDLFNBQVMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLGFBQWEsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDekcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3RixRQUFRLENBQUMsU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdGLFFBQVEsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvQyxRQUFRLENBQUMsTUFBTSxDQUFDLGlDQUFpQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDMUQsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQStIO2dCQUUxSSxJQUFBLHFCQUFxQixHQVFuQixNQUFNLEdBUmEsRUFDckIsb0JBQW9CLEdBT2xCLE1BQU0sR0FQWSxFQUNwQixzQkFBc0IsR0FNcEIsTUFBTSxHQU5jLEVBQ3RCLHFCQUFxQixHQUtuQixNQUFNLEdBTGEsRUFDckIsZ0JBQWdCLEdBSWQsTUFBTSxHQUpRLEVBQ2hCLG9CQUFvQixHQUdsQixNQUFNLEdBSFksRUFDcEIsWUFBWSxHQUVWLE1BQU0sR0FGSSxFQUNaLHNCQUFzQixHQUNwQixNQUFNLEdBRGMsQ0FDYjtnQkFDSCxJQUFRLFVBQVUsR0FBdUIsb0JBQW9CLE9BQTNDLEVBQVMsU0FBUyxHQUFLLG9CQUFvQixNQUF6QixDQUEwQjtnQkFDdEUsSUFBTSxZQUFZLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO2dCQUN0RixJQUFNLGtCQUFrQixHQUFpQixLQUFLLENBQUMscUJBQXFCLEVBQUUsVUFBQyxHQUFpQixJQUFLLE9BQUEsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO2dCQUNySCxJQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsTUFBTSxFQUFWLENBQVUsQ0FBQyxDQUFDO2dCQUMzRCxJQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzVGLElBQU0sWUFBWSxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDL0YsSUFBTSxTQUFTLEdBQU0sY0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLFlBQVksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQUksQ0FBQztnQkFDdEYsSUFBTSxVQUFVLEdBQU0sVUFBVSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsT0FBSSxDQUFDO2dCQUMzRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLHNCQUFzQixDQUFDLENBQUM7Z0JBQzlELEtBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsVUFBVSxFQUFFLFNBQVM7b0JBQ3JCLFNBQVMsV0FBQTtvQkFDVCxVQUFVLFlBQUE7b0JBQ1YsWUFBWSxFQUFFLGtCQUFrQixDQUFDLE1BQU07b0JBQ3ZDLFVBQVUsWUFBQTtvQkFDVixVQUFVLFlBQUE7b0JBQ1YsWUFBWSxjQUFBO29CQUNaLFNBQVMsV0FBQTtvQkFDVCxTQUFTLFdBQUE7b0JBQ1QsWUFBWSxjQUFBO29CQUNaLGlCQUFpQixFQUFFLFNBQVMsS0FBSyxDQUFDO29CQUNsQyxtQkFBbUIsRUFBRSxZQUFZLEtBQUssQ0FBQztpQkFDeEMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQ0Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxjQUFjLEVBQWQsVUFBZSxxQkFBbUMsRUFBRSxvQkFBbUM7WUFDckYsSUFBTSxZQUFZLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEtBQUssRUFBVixDQUFVLENBQUMsQ0FBQztZQUNuRSxLQUFLLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBa0I7Z0JBQ3JGLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFTLEVBQUUsS0FBSzt3QkFBZCxLQUFLLFdBQUE7b0JBQ2xCLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDdkQsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztxQkFDN0I7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sWUFBWSxDQUFDO1FBQ3RCLENBQUM7UUFDRCxhQUFhLEVBQWIsVUFBYyxnQkFBd0IsRUFBRSxLQUFlLEVBQUUsUUFBZ0I7WUFDdkUsSUFBTSxhQUFhLEdBQVcsY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLGFBQWEsQ0FBQztZQUNqRSxPQUFPLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUNELGtCQUFrQixFQUFsQjtZQUFtQixtQkFBZ0M7aUJBQWhDLFVBQWdDLEVBQWhDLHFCQUFnQyxFQUFoQyxJQUFnQztnQkFBaEMsOEJBQWdDOztZQUNqRCxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUE3QixDQUE2QixDQUFDLENBQUM7UUFDL0QsQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNjcm9sbFZpZXdDb250ZXh0ID0gV2VjaGF0TWluaXByb2dyYW0uU2Nyb2xsVmlld0NvbnRleHQ7XG5pbXBvcnQgeyBzdW1TaXplIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbCc7XG5cbmNvbnN0IGNodW5rID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvbG9kYXNoL2NodW5rLmpzJyk7XG5jb25zdCBtYXhCeSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2xvZGFzaC9tYXhieS5qcycpO1xuXG50eXBlIEhlaWdodFJlc3VsdCA9IHsgaGVpZ2h0OiBzdHJpbmcgfTtcbnR5cGUgV2lkdGhSZXN1bHQgPSB7IHdpZHRoOiBzdHJpbmcgfTtcbnR5cGUgU2l6ZVJlc3VsdCA9IHsgaGVpZ2h0OiBzdHJpbmc7IHdpZHRoOiBzdHJpbmcgfTtcbnR5cGUgU2Nyb2xsVmlld1Jlc3VsdCA9IHsgbm9kZTogU2Nyb2xsVmlld0NvbnRleHQgfTtcblxuQ29tcG9uZW50KHtcbiAgcHJvcGVydGllczoge1xuICAgIGhlaWdodDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgdmFsdWU6IDMwMCxcbiAgICB9LFxuICAgIGNvbHVtbnM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgdmFsdWU6IFtdLFxuICAgIH0sXG4gICAgcm93RGF0YToge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICB2YWx1ZTogW10sXG4gICAgfSxcbiAgfSxcbiAgZGF0YToge1xuICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICAgIGNvbHVtbldpZHRoczogW10gYXMgc3RyaW5nW10sXG4gICAgcm93SGVpZ2h0czogW10gYXMgc3RyaW5nW10sXG4gICAgaGVhZGVySGVpZ2h0OiAnYXV0bycsXG4gICAgYm9keUhlaWdodDogJ2F1dG8nLFxuICAgIGJvZHlXaWR0aDogJ21heC1jb250ZW50JyxcbiAgICBleHRyYVJvd3M6IDAsXG4gICAgZXh0cmFDb2x1bW5zOiAwLFxuICAgIGNhblZlcnRpY2FsU2Nyb2xsOiB0cnVlLFxuICAgIGNhbkhvcml6b250YWxTY3JvbGw6IHRydWUsXG4gICAgYmFzZUhlaWdodDogJ2F1dG8nLFxuICAgIGJhc2VXaWR0aDogJ2F1dG8nLFxuICB9LFxuICBsaWZldGltZXM6IHtcbiAgICBhdHRhY2hlZCgpOiB2b2lkIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGNvbHVtbldpZHRoczogQXJyYXkodGhpcy5wcm9wZXJ0aWVzLmNvbHVtbnMubGVuZ3RoKS5maWxsKCdhdXRvJyksXG4gICAgICAgIHJvd0hlaWdodHM6IEFycmF5KHRoaXMucHJvcGVydGllcy5yb3dEYXRhLmxlbmd0aCkuZmlsbCgnYXV0bycpLFxuICAgICAgICBib2R5SGVpZ2h0OiBgJHt0aGlzLnByb3BlcnRpZXMuaGVpZ2h0IC0gNDB9cnB4YCxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVhZHkoKTogdm9pZCB7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuY3JlYXRlU2VsZWN0b3JRdWVyeSgpO1xuICAgICAgc2VsZWN0b3Iuc2VsZWN0KCcudGFibGUtY29udGFpbmVyJykuZmllbGRzKHsgY29tcHV0ZWRTdHlsZTogWydoZWlnaHQnXSB9KTtcbiAgICAgIHNlbGVjdG9yLnNlbGVjdCgnI3N0YXRpYy1jZWxsJykuZmllbGRzKHsgY29tcHV0ZWRTdHlsZTogWyd3aWR0aCcsICdoZWlnaHQnXSB9KTtcbiAgICAgIHNlbGVjdG9yLnNlbGVjdCgnLnRhYmxlLWJvZHktdmlld3BvcnQnKS5maWVsZHMoeyBjb21wdXRlZFN0eWxlOiBbJ3dpZHRoJywgJ2hlaWdodCddIH0pO1xuICAgICAgc2VsZWN0b3Iuc2VsZWN0QWxsKCcudGFibGUtaGVhZGVyLWNvbnRhaW5lciAudGFibGUtY2VsbCcpLmZpZWxkcyh7IGNvbXB1dGVkU3R5bGU6IFsnd2lkdGgnLCAnaGVpZ2h0J10gfSk7XG4gICAgICBzZWxlY3Rvci5zZWxlY3RBbGwoJy50YWJsZS1ib2R5LWNvbnRhaW5lciAudGFibGUtcm93JykuZmllbGRzKHsgY29tcHV0ZWRTdHlsZTogWydoZWlnaHQnXSB9KTtcbiAgICAgIHNlbGVjdG9yLnNlbGVjdEFsbCgnLnRhYmxlLWJvZHktY29udGFpbmVyIC50YWJsZS1jZWxsJykuZmllbGRzKHsgY29tcHV0ZWRTdHlsZTogWyd3aWR0aCddIH0pO1xuICAgICAgc2VsZWN0b3Iuc2VsZWN0KCcudGFibGUtYm9keS12aWV3cG9ydCcpLm5vZGUoKTtcbiAgICAgIHNlbGVjdG9yLnNlbGVjdCgnLnRhYmxlLWJvZHktaG9yaXpvbnRhbC12aWV3cG9ydCcpLm5vZGUoKTtcbiAgICAgIHNlbGVjdG9yLmV4ZWMoKHJlc3VsdDogW0hlaWdodFJlc3VsdCwgU2l6ZVJlc3VsdCwgU2l6ZVJlc3VsdCwgU2l6ZVJlc3VsdFtdLCBIZWlnaHRSZXN1bHRbXSwgV2lkdGhSZXN1bHRbXSwgU2Nyb2xsVmlld1Jlc3VsdCwgU2Nyb2xsVmlld1Jlc3VsdF0pID0+IHtcbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgIGNvbnRhaW5lckhlaWdodFJlc3VsdCxcbiAgICAgICAgICBzdGF0aWNDZWxsU2l6ZVJlc3VsdCxcbiAgICAgICAgICBib2R5Vmlld3BvcnRTaXplUmVzdWx0LFxuICAgICAgICAgIGhlYWRlckNlbGxTaXplUmVzdWx0cyxcbiAgICAgICAgICByb3dIZWlnaHRSZXN1bHRzLFxuICAgICAgICAgIGJvZHlDZWxsV2lkdGhSZXN1bHRzLFxuICAgICAgICAgIGJvZHlWaWV3cG9ydCxcbiAgICAgICAgICBib2R5SG9yaXpvbnRhbFZpZXdwb3J0XG4gICAgICAgIF0gPSByZXN1bHQ7XG4gICAgICAgIGNvbnN0IHsgaGVpZ2h0OiBiYXNlSGVpZ2h0LCB3aWR0aDogYmFzZVdpZHRoIH0gPSBzdGF0aWNDZWxsU2l6ZVJlc3VsdDtcbiAgICAgICAgY29uc3QgY29sdW1uV2lkdGhzID0gdGhpcy5nZXRDb2x1bW5XaWR0aChoZWFkZXJDZWxsU2l6ZVJlc3VsdHMsIGJvZHlDZWxsV2lkdGhSZXN1bHRzKTtcbiAgICAgICAgY29uc3QgbWF4SGVhZGVySGVpZ2h0UmVzOiBIZWlnaHRSZXN1bHQgPSBtYXhCeShoZWFkZXJDZWxsU2l6ZVJlc3VsdHMsIChyZXM6IEhlaWdodFJlc3VsdCkgPT4gcGFyc2VGbG9hdChyZXMuaGVpZ2h0KSk7XG4gICAgICAgIGNvbnN0IHJvd0hlaWdodHMgPSByb3dIZWlnaHRSZXN1bHRzLm1hcChyZXMgPT4gcmVzLmhlaWdodCk7XG4gICAgICAgIGNvbnN0IGV4dHJhUm93cyA9IHRoaXMuZ2V0RXh0cmFDZWxscyhib2R5Vmlld3BvcnRTaXplUmVzdWx0LmhlaWdodCwgcm93SGVpZ2h0cywgYmFzZUhlaWdodCk7XG4gICAgICAgIGNvbnN0IGV4dHJhQ29sdW1ucyA9IHRoaXMuZ2V0RXh0cmFDZWxscyhib2R5Vmlld3BvcnRTaXplUmVzdWx0LndpZHRoLCBjb2x1bW5XaWR0aHMsIGJhc2VXaWR0aCk7XG4gICAgICAgIGNvbnN0IGJvZHlXaWR0aCA9IGAke3N1bVNpemUoY29sdW1uV2lkdGhzKSArIGV4dHJhQ29sdW1ucyAqIHBhcnNlRmxvYXQoYmFzZVdpZHRoKX1weGA7XG4gICAgICAgIGNvbnN0IGJvZHlIZWlnaHQgPSBgJHtwYXJzZUZsb2F0KGNvbnRhaW5lckhlaWdodFJlc3VsdC5oZWlnaHQpIC0gcGFyc2VGbG9hdChtYXhIZWFkZXJIZWlnaHRSZXMuaGVpZ2h0KX1weGA7XG4gICAgICAgIHRoaXMuc2V0Vmlld3BvcnRCb3VuY2VzKGJvZHlWaWV3cG9ydCwgYm9keUhvcml6b250YWxWaWV3cG9ydCk7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICAgICAgICAgIGJhc2VXaWR0aCxcbiAgICAgICAgICBiYXNlSGVpZ2h0LFxuICAgICAgICAgIGhlYWRlckhlaWdodDogbWF4SGVhZGVySGVpZ2h0UmVzLmhlaWdodCxcbiAgICAgICAgICBib2R5SGVpZ2h0LFxuICAgICAgICAgIHJvd0hlaWdodHMsXG4gICAgICAgICAgY29sdW1uV2lkdGhzLFxuICAgICAgICAgIGJvZHlXaWR0aCxcbiAgICAgICAgICBleHRyYVJvd3MsXG4gICAgICAgICAgZXh0cmFDb2x1bW5zLFxuICAgICAgICAgIGNhblZlcnRpY2FsU2Nyb2xsOiBleHRyYVJvd3MgPT09IDAsXG4gICAgICAgICAgY2FuSG9yaXpvbnRhbFNjcm9sbDogZXh0cmFDb2x1bW5zID09PSAwLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGdldENvbHVtbldpZHRoKGhlYWRlckNlbGxTaXplUmVzdWx0czogU2l6ZVJlc3VsdFtdLCBib2R5Q2VsbFdpZHRoUmVzdWx0czogV2lkdGhSZXN1bHRbXSkge1xuICAgICAgY29uc3QgY29sdW1uV2lkdGhzID0gaGVhZGVyQ2VsbFNpemVSZXN1bHRzLm1hcChjZWxsID0+IGNlbGwud2lkdGgpO1xuICAgICAgY2h1bmsoYm9keUNlbGxXaWR0aFJlc3VsdHMsIHRoaXMucHJvcGVydGllcy5jb2x1bW5zLmxlbmd0aCkuZm9yRWFjaCgocm93OiBXaWR0aFJlc3VsdFtdKSA9PiB7XG4gICAgICAgIHJvdy5mb3JFYWNoKCh7IHdpZHRoIH0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKHBhcnNlRmxvYXQod2lkdGgpID4gcGFyc2VGbG9hdChjb2x1bW5XaWR0aHNbaW5kZXhdKSkge1xuICAgICAgICAgICAgY29sdW1uV2lkdGhzW2luZGV4XSA9IHdpZHRoO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjb2x1bW5XaWR0aHM7XG4gICAgfSxcbiAgICBnZXRFeHRyYUNlbGxzKGJvZHlWaWV3cG9ydFNpemU6IHN0cmluZywgc2l6ZXM6IHN0cmluZ1tdLCBiYXNlU2l6ZTogc3RyaW5nKSB7XG4gICAgICBjb25zdCByb3dIZWlnaHRzU3VtOiBudW1iZXIgPSBzdW1TaXplKHNpemVzKTtcbiAgICAgIGNvbnN0IGRlbHRhSGVpZ2h0ID0gcGFyc2VGbG9hdChib2R5Vmlld3BvcnRTaXplKSAtIHJvd0hlaWdodHNTdW07XG4gICAgICByZXR1cm4gZGVsdGFIZWlnaHQgPiAwID8gTWF0aC5jZWlsKGRlbHRhSGVpZ2h0IC8gcGFyc2VGbG9hdChiYXNlU2l6ZSkpIDogMDtcbiAgICB9LFxuICAgIHNldFZpZXdwb3J0Qm91bmNlcyguLi52aWV3cG9ydHM6IFNjcm9sbFZpZXdSZXN1bHRbXSkge1xuICAgICAgdmlld3BvcnRzLmZvckVhY2godmlld3BvcnQgPT4gdmlld3BvcnQubm9kZS5ib3VuY2VzID0gZmFsc2UpO1xuICAgIH0sXG4gIH0sXG59KTtcbiJdfQ==