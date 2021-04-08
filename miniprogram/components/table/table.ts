import ScrollViewContext = WechatMiniprogram.ScrollViewContext;

const chunk = require('../../utils/lodash.chunk.js');
const sumBy = require('../../utils/lodash.sumby.js');
const maxBy = require('../../utils/lodash.maxby.js');

type HeightResult = { height: string };
type WidthResult = { width: string };
type SizeResult = { height: string; width: string };
type ScrollViewResult = { node: ScrollViewContext };

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
    columnWidths: [] as string[],
    rowHeights: [] as string[],
    headerHeight: 'auto',
    bodyWidth: 'max-content',
    extraRows: 0,
    canVerticalScroll: true,
    baseHeight: '',
    baseWidth: '',
  },
  lifetimes: {
    attached(): void {
      this.setData({
        columnWidths: Array(this.properties.columns.length).fill('auto'),
        rowHeights: Array(this.properties.rowData.length).fill('auto'),
      });
    },
    ready(): void {
      const selector = this.createSelectorQuery();
      selector.select('#static-cell').fields({ computedStyle: ['width', 'height'] });
      selector.select('.table-body-viewport').fields({ computedStyle: ['height'] });
      selector.selectAll('.table-header-container .table-cell').fields({ computedStyle: ['width', 'height'] });
      selector.selectAll('.table-body-container .table-row').fields({ computedStyle: ['height'] });
      selector.selectAll('.table-body-container .table-cell').fields({ computedStyle: ['width'] });
      selector.select('.table-body-viewport').node();
      selector.select('.table-body-horizontal-viewport').node();
      selector.exec((result: [SizeResult, HeightResult, SizeResult[], HeightResult[], WidthResult[], ScrollViewResult, ScrollViewResult]) => {
        const [
          staticCellSizeResult,
          bodyViewportHeightResult,
          headerCellSizeResults,
          rowHeightResults,
          bodyCellWidthResults,
          bodyViewport,
          bodyHorizontalViewport
        ] = result;
        const { height: baseHeight, width: baseWidth } = staticCellSizeResult;
        const columnWidths = headerCellSizeResults.map(cell => cell.width);
        chunk(bodyCellWidthResults, this.properties.columns.length).forEach((row: WidthResult[]) => {
          row.forEach(({ width }, index) => {
            if (parseFloat(width) > parseFloat(columnWidths[index])) {
              columnWidths[index] = width;
            }
          });
        });
        bodyViewport.node.bounces = false;
        bodyHorizontalViewport.node.bounces = false;
        const maxHeaderHeightRes: HeightResult = maxBy(headerCellSizeResults, (res: HeightResult) => parseFloat(res.height));
        const rowHeights = rowHeightResults.map(res => res.height);
        const rowHeightsSum: number = sumBy(rowHeights, (height: string) => parseFloat(height));
        const deltaHeight = parseFloat(bodyViewportHeightResult.height) - rowHeightsSum;
        const extraRows = deltaHeight > 0 ? Math.ceil(deltaHeight / parseFloat(baseHeight)) : 0;
        this.setData({
          baseWidth,
          baseHeight,
          headerHeight: maxHeaderHeightRes.height,
          rowHeights,
          columnWidths,
          bodyWidth: sumBy(columnWidths, (width: string) => parseFloat(width)) + 'px',
          extraRows,
          canVerticalScroll: extraRows === 0,
        });
      });
    }
  },
});
