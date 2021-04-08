import ScrollViewContext = WechatMiniprogram.ScrollViewContext;
import { sumSize } from '../../utils/util';

const chunk = require('../../utils/lodash/chunk.js');
const maxBy = require('../../utils/lodash/maxby.js');

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
    visibility: 'hidden',
    columnWidths: [] as string[],
    rowHeights: [] as string[],
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
    attached(): void {
      this.setData({
        columnWidths: Array(this.properties.columns.length).fill('auto'),
        rowHeights: Array(this.properties.rowData.length).fill('auto'),
        bodyHeight: `${this.properties.height - 40}rpx`,
      });
    },
    ready(): void {
      const selector = this.createSelectorQuery();
      selector.select('.table-container').fields({ computedStyle: ['height'] });
      selector.select('#static-cell').fields({ computedStyle: ['width', 'height'] });
      selector.select('.table-body-viewport').fields({ computedStyle: ['width', 'height'] });
      selector.selectAll('.table-header-container .table-cell').fields({ computedStyle: ['width', 'height'] });
      selector.selectAll('.table-body-container .table-row').fields({ computedStyle: ['height'] });
      selector.selectAll('.table-body-container .table-cell').fields({ computedStyle: ['width'] });
      selector.select('.table-body-viewport').node();
      selector.select('.table-body-horizontal-viewport').node();
      selector.exec((result: [HeightResult, SizeResult, SizeResult, SizeResult[], HeightResult[], WidthResult[], ScrollViewResult, ScrollViewResult]) => {
        const [
          containerHeightResult,
          staticCellSizeResult,
          bodyViewportSizeResult,
          headerCellSizeResults,
          rowHeightResults,
          bodyCellWidthResults,
          bodyViewport,
          bodyHorizontalViewport
        ] = result;
        const { height: baseHeight, width: baseWidth } = staticCellSizeResult;
        const columnWidths = this.getColumnWidth(headerCellSizeResults, bodyCellWidthResults);
        const maxHeaderHeightRes: HeightResult = maxBy(headerCellSizeResults, (res: HeightResult) => parseFloat(res.height));
        const rowHeights = rowHeightResults.map(res => res.height);
        const extraRows = this.getExtraCells(bodyViewportSizeResult.height, rowHeights, baseHeight);
        const extraColumns = this.getExtraCells(bodyViewportSizeResult.width, columnWidths, baseWidth);
        const bodyWidth = `${sumSize(columnWidths) + extraColumns * parseFloat(baseWidth)}px`;
        const bodyHeight = `${parseFloat(containerHeightResult.height) - parseFloat(maxHeaderHeightRes.height)}px`;
        this.setViewportBounces(bodyViewport, bodyHorizontalViewport);
        this.setData({
          visibility: 'visible',
          baseWidth,
          baseHeight,
          headerHeight: maxHeaderHeightRes.height,
          bodyHeight,
          rowHeights,
          columnWidths,
          bodyWidth,
          extraRows,
          extraColumns,
          canVerticalScroll: extraRows === 0,
          canHorizontalScroll: extraColumns === 0,
        });
      });
    }
  },
  methods: {
    getColumnWidth(headerCellSizeResults: SizeResult[], bodyCellWidthResults: WidthResult[]) {
      const columnWidths = headerCellSizeResults.map(cell => cell.width);
      chunk(bodyCellWidthResults, this.properties.columns.length).forEach((row: WidthResult[]) => {
        row.forEach(({ width }, index) => {
          if (parseFloat(width) > parseFloat(columnWidths[index])) {
            columnWidths[index] = width;
          }
        });
      });
      return columnWidths;
    },
    getExtraCells(bodyViewportSize: string, sizes: string[], baseSize: string) {
      const rowHeightsSum: number = sumSize(sizes);
      const deltaHeight = parseFloat(bodyViewportSize) - rowHeightsSum;
      return deltaHeight > 0 ? Math.ceil(deltaHeight / parseFloat(baseSize)) : 0;
    },
    setViewportBounces(...viewports: ScrollViewResult[]) {
      viewports.forEach(viewport => viewport.node.bounces = false);
    },
  },
});
