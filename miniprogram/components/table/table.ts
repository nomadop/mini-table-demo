import ScrollViewContext = WechatMiniprogram.ScrollViewContext;

const chunk = require('../../utils/lodash.chunk.js');
const sumBy = require('../../utils/lodash.sumby.js');

type HeightResults = { height: string }[];
type WidthResults = { width: string }[];
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
    bodyWidth: 'max-content',
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
      selector.selectAll('.table-body-container .table-row').fields({ computedStyle: ['height'] });
      selector.selectAll('.table-header-container .table-cell').fields({ computedStyle: ['width'] });
      selector.selectAll('.table-body-container .table-cell').fields({ computedStyle: ['width'] });
      selector.select('.table-body-viewport').node();
      selector.select('.table-body-horizontal-viewport').node();
      selector.exec((result: [HeightResults, WidthResults, WidthResults, ScrollViewResult, ScrollViewResult]) => {
        const [rowHeightsResult, headerCellWidthsResult, bodyCellWidthsResult, bodyViewport, bodyHorizontalViewport] = result;
        const columnWidths = headerCellWidthsResult.map(cell => cell.width);
        chunk(bodyCellWidthsResult, this.properties.columns.length).forEach((row: WidthResults) => {
          row.forEach(({ width }, index) => {
            if (parseFloat(width) > parseFloat(columnWidths[index])) {
              columnWidths[index] = width;
            }
          });
        });
        bodyViewport.node.bounces = false;
        bodyHorizontalViewport.node.bounces = false;
        this.setData({
          rowHeights: rowHeightsResult.map(res => res.height),
          columnWidths,
          bodyWidth: sumBy(columnWidths, (width: string) => parseFloat(width)) + 'px',
        });
      });
    }
  },
});
