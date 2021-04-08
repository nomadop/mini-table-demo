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
        columnLength: 0,
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
            var columnLength = Math.max(this.properties.columns.length, maxBy(this.properties.rowData, 'length').length);
            this.setData({
                columnLength: columnLength,
                columnWidths: Array(columnLength).fill('auto'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUEyQztBQUUzQyxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUNyRCxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQU9yRCxTQUFTLENBQUM7SUFDUixVQUFVLEVBQUU7UUFDVixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxHQUFHO1NBQ1g7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxFQUFFO1NBQ1Y7S0FDRjtJQUNELElBQUksRUFBRTtRQUNKLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLFlBQVksRUFBRSxDQUFDO1FBQ2YsWUFBWSxFQUFFLEVBQWM7UUFDNUIsVUFBVSxFQUFFLEVBQWM7UUFDMUIsWUFBWSxFQUFFLE1BQU07UUFDcEIsVUFBVSxFQUFFLE1BQU07UUFDbEIsU0FBUyxFQUFFLGFBQWE7UUFDeEIsU0FBUyxFQUFFLENBQUM7UUFDWixZQUFZLEVBQUUsQ0FBQztRQUNmLGlCQUFpQixFQUFFLElBQUk7UUFDdkIsbUJBQW1CLEVBQUUsSUFBSTtRQUN6QixVQUFVLEVBQUUsTUFBTTtRQUNsQixTQUFTLEVBQUUsTUFBTTtLQUNsQjtJQUNELFNBQVMsRUFBRTtRQUNULFFBQVEsRUFBUjtZQUNFLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvRyxJ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QUFDLEdBQWtCO2dCQUNyRixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBUyxFQUFFLEtBQUs7d0JBQWQsS0FBSyxXQUFBO29CQUNsQixJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7d0JBQ3ZELFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7cUJBQzdCO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLFlBQVksQ0FBQztRQUN0QixDQUFDO1FBQ0QsYUFBYSxFQUFiLFVBQWMsZ0JBQXdCLEVBQUUsS0FBZSxFQUFFLFFBQWdCO1lBQ3ZFLElBQU0sYUFBYSxHQUFXLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QyxJQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxhQUFhLENBQUM7WUFDakUsT0FBTyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFDRCxrQkFBa0IsRUFBbEI7WUFBbUIsbUJBQWdDO2lCQUFoQyxVQUFnQyxFQUFoQyxxQkFBZ0MsRUFBaEMsSUFBZ0M7Z0JBQWhDLDhCQUFnQzs7WUFDakQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO1FBQy9ELENBQUM7S0FDRjtDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTY3JvbGxWaWV3Q29udGV4dCA9IFdlY2hhdE1pbmlwcm9ncmFtLlNjcm9sbFZpZXdDb250ZXh0O1xuaW1wb3J0IHsgc3VtU2l6ZSB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnO1xuXG5jb25zdCBjaHVuayA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2xvZGFzaC9jaHVuay5qcycpO1xuY29uc3QgbWF4QnkgPSByZXF1aXJlKCcuLi8uLi91dGlscy9sb2Rhc2gvbWF4YnkuanMnKTtcblxudHlwZSBIZWlnaHRSZXN1bHQgPSB7IGhlaWdodDogc3RyaW5nIH07XG50eXBlIFdpZHRoUmVzdWx0ID0geyB3aWR0aDogc3RyaW5nIH07XG50eXBlIFNpemVSZXN1bHQgPSB7IGhlaWdodDogc3RyaW5nOyB3aWR0aDogc3RyaW5nIH07XG50eXBlIFNjcm9sbFZpZXdSZXN1bHQgPSB7IG5vZGU6IFNjcm9sbFZpZXdDb250ZXh0IH07XG5cbkNvbXBvbmVudCh7XG4gIHByb3BlcnRpZXM6IHtcbiAgICBoZWlnaHQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHZhbHVlOiAzMDAsXG4gICAgfSxcbiAgICBjb2x1bW5zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHZhbHVlOiBbXSxcbiAgICB9LFxuICAgIHJvd0RhdGE6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgdmFsdWU6IFtdLFxuICAgIH0sXG4gIH0sXG4gIGRhdGE6IHtcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICBjb2x1bW5MZW5ndGg6IDAsXG4gICAgY29sdW1uV2lkdGhzOiBbXSBhcyBzdHJpbmdbXSxcbiAgICByb3dIZWlnaHRzOiBbXSBhcyBzdHJpbmdbXSxcbiAgICBoZWFkZXJIZWlnaHQ6ICdhdXRvJyxcbiAgICBib2R5SGVpZ2h0OiAnYXV0bycsXG4gICAgYm9keVdpZHRoOiAnbWF4LWNvbnRlbnQnLFxuICAgIGV4dHJhUm93czogMCxcbiAgICBleHRyYUNvbHVtbnM6IDAsXG4gICAgY2FuVmVydGljYWxTY3JvbGw6IHRydWUsXG4gICAgY2FuSG9yaXpvbnRhbFNjcm9sbDogdHJ1ZSxcbiAgICBiYXNlSGVpZ2h0OiAnYXV0bycsXG4gICAgYmFzZVdpZHRoOiAnYXV0bycsXG4gIH0sXG4gIGxpZmV0aW1lczoge1xuICAgIGF0dGFjaGVkKCk6IHZvaWQge1xuICAgICAgY29uc3QgY29sdW1uTGVuZ3RoID0gTWF0aC5tYXgodGhpcy5wcm9wZXJ0aWVzLmNvbHVtbnMubGVuZ3RoLCBtYXhCeSh0aGlzLnByb3BlcnRpZXMucm93RGF0YSwgJ2xlbmd0aCcpLmxlbmd0aCk7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBjb2x1bW5MZW5ndGgsXG4gICAgICAgIGNvbHVtbldpZHRoczogQXJyYXkoY29sdW1uTGVuZ3RoKS5maWxsKCdhdXRvJyksXG4gICAgICAgIHJvd0hlaWdodHM6IEFycmF5KHRoaXMucHJvcGVydGllcy5yb3dEYXRhLmxlbmd0aCkuZmlsbCgnYXV0bycpLFxuICAgICAgICBib2R5SGVpZ2h0OiBgJHt0aGlzLnByb3BlcnRpZXMuaGVpZ2h0IC0gNDB9cnB4YCxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVhZHkoKTogdm9pZCB7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuY3JlYXRlU2VsZWN0b3JRdWVyeSgpO1xuICAgICAgc2VsZWN0b3Iuc2VsZWN0KCcudGFibGUtY29udGFpbmVyJykuZmllbGRzKHsgY29tcHV0ZWRTdHlsZTogWydoZWlnaHQnXSB9KTtcbiAgICAgIHNlbGVjdG9yLnNlbGVjdCgnI3N0YXRpYy1jZWxsJykuZmllbGRzKHsgY29tcHV0ZWRTdHlsZTogWyd3aWR0aCcsICdoZWlnaHQnXSB9KTtcbiAgICAgIHNlbGVjdG9yLnNlbGVjdCgnLnRhYmxlLWJvZHktdmlld3BvcnQnKS5maWVsZHMoeyBjb21wdXRlZFN0eWxlOiBbJ3dpZHRoJywgJ2hlaWdodCddIH0pO1xuICAgICAgc2VsZWN0b3Iuc2VsZWN0QWxsKCcudGFibGUtaGVhZGVyLWNvbnRhaW5lciAudGFibGUtY2VsbCcpLmZpZWxkcyh7IGNvbXB1dGVkU3R5bGU6IFsnd2lkdGgnLCAnaGVpZ2h0J10gfSk7XG4gICAgICBzZWxlY3Rvci5zZWxlY3RBbGwoJy50YWJsZS1ib2R5LWNvbnRhaW5lciAudGFibGUtcm93JykuZmllbGRzKHsgY29tcHV0ZWRTdHlsZTogWydoZWlnaHQnXSB9KTtcbiAgICAgIHNlbGVjdG9yLnNlbGVjdEFsbCgnLnRhYmxlLWJvZHktY29udGFpbmVyIC50YWJsZS1jZWxsJykuZmllbGRzKHsgY29tcHV0ZWRTdHlsZTogWyd3aWR0aCddIH0pO1xuICAgICAgc2VsZWN0b3Iuc2VsZWN0KCcudGFibGUtYm9keS12aWV3cG9ydCcpLm5vZGUoKTtcbiAgICAgIHNlbGVjdG9yLnNlbGVjdCgnLnRhYmxlLWJvZHktaG9yaXpvbnRhbC12aWV3cG9ydCcpLm5vZGUoKTtcbiAgICAgIHNlbGVjdG9yLmV4ZWMoKHJlc3VsdDogW0hlaWdodFJlc3VsdCwgU2l6ZVJlc3VsdCwgU2l6ZVJlc3VsdCwgU2l6ZVJlc3VsdFtdLCBIZWlnaHRSZXN1bHRbXSwgV2lkdGhSZXN1bHRbXSwgU2Nyb2xsVmlld1Jlc3VsdCwgU2Nyb2xsVmlld1Jlc3VsdF0pID0+IHtcbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgIGNvbnRhaW5lckhlaWdodFJlc3VsdCxcbiAgICAgICAgICBzdGF0aWNDZWxsU2l6ZVJlc3VsdCxcbiAgICAgICAgICBib2R5Vmlld3BvcnRTaXplUmVzdWx0LFxuICAgICAgICAgIGhlYWRlckNlbGxTaXplUmVzdWx0cyxcbiAgICAgICAgICByb3dIZWlnaHRSZXN1bHRzLFxuICAgICAgICAgIGJvZHlDZWxsV2lkdGhSZXN1bHRzLFxuICAgICAgICAgIGJvZHlWaWV3cG9ydCxcbiAgICAgICAgICBib2R5SG9yaXpvbnRhbFZpZXdwb3J0XG4gICAgICAgIF0gPSByZXN1bHQ7XG4gICAgICAgIGNvbnN0IHsgaGVpZ2h0OiBiYXNlSGVpZ2h0LCB3aWR0aDogYmFzZVdpZHRoIH0gPSBzdGF0aWNDZWxsU2l6ZVJlc3VsdDtcbiAgICAgICAgY29uc3QgY29sdW1uV2lkdGhzID0gdGhpcy5nZXRDb2x1bW5XaWR0aChoZWFkZXJDZWxsU2l6ZVJlc3VsdHMsIGJvZHlDZWxsV2lkdGhSZXN1bHRzKTtcbiAgICAgICAgY29uc3QgbWF4SGVhZGVySGVpZ2h0UmVzOiBIZWlnaHRSZXN1bHQgPSBtYXhCeShoZWFkZXJDZWxsU2l6ZVJlc3VsdHMsIChyZXM6IEhlaWdodFJlc3VsdCkgPT4gcGFyc2VGbG9hdChyZXMuaGVpZ2h0KSk7XG4gICAgICAgIGNvbnN0IHJvd0hlaWdodHMgPSByb3dIZWlnaHRSZXN1bHRzLm1hcChyZXMgPT4gcmVzLmhlaWdodCk7XG4gICAgICAgIGNvbnN0IGV4dHJhUm93cyA9IHRoaXMuZ2V0RXh0cmFDZWxscyhib2R5Vmlld3BvcnRTaXplUmVzdWx0LmhlaWdodCwgcm93SGVpZ2h0cywgYmFzZUhlaWdodCk7XG4gICAgICAgIGNvbnN0IGV4dHJhQ29sdW1ucyA9IHRoaXMuZ2V0RXh0cmFDZWxscyhib2R5Vmlld3BvcnRTaXplUmVzdWx0LndpZHRoLCBjb2x1bW5XaWR0aHMsIGJhc2VXaWR0aCk7XG4gICAgICAgIGNvbnN0IGJvZHlXaWR0aCA9IGAke3N1bVNpemUoY29sdW1uV2lkdGhzKSArIGV4dHJhQ29sdW1ucyAqIHBhcnNlRmxvYXQoYmFzZVdpZHRoKX1weGA7XG4gICAgICAgIGNvbnN0IGJvZHlIZWlnaHQgPSBgJHtwYXJzZUZsb2F0KGNvbnRhaW5lckhlaWdodFJlc3VsdC5oZWlnaHQpIC0gcGFyc2VGbG9hdChtYXhIZWFkZXJIZWlnaHRSZXMuaGVpZ2h0KX1weGA7XG4gICAgICAgIHRoaXMuc2V0Vmlld3BvcnRCb3VuY2VzKGJvZHlWaWV3cG9ydCwgYm9keUhvcml6b250YWxWaWV3cG9ydCk7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICAgICAgICAgIGJhc2VXaWR0aCxcbiAgICAgICAgICBiYXNlSGVpZ2h0LFxuICAgICAgICAgIGhlYWRlckhlaWdodDogbWF4SGVhZGVySGVpZ2h0UmVzLmhlaWdodCxcbiAgICAgICAgICBib2R5SGVpZ2h0LFxuICAgICAgICAgIHJvd0hlaWdodHMsXG4gICAgICAgICAgY29sdW1uV2lkdGhzLFxuICAgICAgICAgIGJvZHlXaWR0aCxcbiAgICAgICAgICBleHRyYVJvd3MsXG4gICAgICAgICAgZXh0cmFDb2x1bW5zLFxuICAgICAgICAgIGNhblZlcnRpY2FsU2Nyb2xsOiBleHRyYVJvd3MgPT09IDAsXG4gICAgICAgICAgY2FuSG9yaXpvbnRhbFNjcm9sbDogZXh0cmFDb2x1bW5zID09PSAwLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGdldENvbHVtbldpZHRoKGhlYWRlckNlbGxTaXplUmVzdWx0czogU2l6ZVJlc3VsdFtdLCBib2R5Q2VsbFdpZHRoUmVzdWx0czogV2lkdGhSZXN1bHRbXSkge1xuICAgICAgY29uc3QgY29sdW1uV2lkdGhzID0gaGVhZGVyQ2VsbFNpemVSZXN1bHRzLm1hcChjZWxsID0+IGNlbGwud2lkdGgpO1xuICAgICAgY2h1bmsoYm9keUNlbGxXaWR0aFJlc3VsdHMsIHRoaXMucHJvcGVydGllcy5jb2x1bW5zLmxlbmd0aCkuZm9yRWFjaCgocm93OiBXaWR0aFJlc3VsdFtdKSA9PiB7XG4gICAgICAgIHJvdy5mb3JFYWNoKCh7IHdpZHRoIH0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKHBhcnNlRmxvYXQod2lkdGgpID4gcGFyc2VGbG9hdChjb2x1bW5XaWR0aHNbaW5kZXhdKSkge1xuICAgICAgICAgICAgY29sdW1uV2lkdGhzW2luZGV4XSA9IHdpZHRoO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjb2x1bW5XaWR0aHM7XG4gICAgfSxcbiAgICBnZXRFeHRyYUNlbGxzKGJvZHlWaWV3cG9ydFNpemU6IHN0cmluZywgc2l6ZXM6IHN0cmluZ1tdLCBiYXNlU2l6ZTogc3RyaW5nKSB7XG4gICAgICBjb25zdCByb3dIZWlnaHRzU3VtOiBudW1iZXIgPSBzdW1TaXplKHNpemVzKTtcbiAgICAgIGNvbnN0IGRlbHRhSGVpZ2h0ID0gcGFyc2VGbG9hdChib2R5Vmlld3BvcnRTaXplKSAtIHJvd0hlaWdodHNTdW07XG4gICAgICByZXR1cm4gZGVsdGFIZWlnaHQgPiAwID8gTWF0aC5jZWlsKGRlbHRhSGVpZ2h0IC8gcGFyc2VGbG9hdChiYXNlU2l6ZSkpIDogMDtcbiAgICB9LFxuICAgIHNldFZpZXdwb3J0Qm91bmNlcyguLi52aWV3cG9ydHM6IFNjcm9sbFZpZXdSZXN1bHRbXSkge1xuICAgICAgdmlld3BvcnRzLmZvckVhY2godmlld3BvcnQgPT4gdmlld3BvcnQubm9kZS5ib3VuY2VzID0gZmFsc2UpO1xuICAgIH0sXG4gIH0sXG59KTtcbiJdfQ==