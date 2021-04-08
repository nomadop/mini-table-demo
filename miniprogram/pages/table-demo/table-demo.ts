type CellData = number | string;
interface Table {
  title: string;
  columns: CellData[];
  data: CellData[][];
}

const getTable1: () => Table = () => ({
  title: 'Table 1',
  columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', '测试测试测试', 'I', 'J', 'K', 'L', 'M', 'N', '测试\n测试'],
  data: [
    ['测试测试测试测试测试测试测试测试测试测试测试测试测', 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    [11, 12, 13, '测试测试测\n试测试测试', 15, 16, 17, 18, 19, 110, 111, 112, 113, 114, 115],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 210, 211, 212, 213, 214, 215],
    [31, 32, 33, 34, 35, 36, 37, 38, 39, 310, 311, 312, 313, 314, 315],
    [41, 42, 43, 44, 45, 46, 47, 48, 49, 410, 411, 412, 413, 414, 415],
    [51, 52, 53, 54, 55, 56, 57, 58, 59, 510, 511, 512, 513, 514, 515],
    [61, 62, 63, 64, 65, 66, 67, 68, 69, 610, 611, 612, 613, 614, 615],
    [71, 72, 73, 74, 75, 76, 77, 78, 79, 710, 711, 712, 713, 714, 715],
    [81, 82, 83, 84, 85, 86, 87, 88, 89, 810, 811, 812, 813, 814, 815],
    [91, 92, 93, 94, 95, 96, 97, 98, 99, 910, 911, 912, 913, 914, 915],
  ],
});

const getTable2: () => Table = () => ({
  title: 'Table 2',
  columns: ['A', 'B', 'C', 'D', 'E'],
  data: [
    [1, 2, 3, 4, 5],
    ['测试测试测试\n测试', 22, 23, 24, 25],
  ],
});

const getTable3: () => Table = () => ({
  title: 'Table 3',
  columns: ['A', 'B', 'C'],
  data: [
    ['A1', 'B1', 'C1', 'D1', 'E1'],
    ['A2', 'B2', 'C2'],
    ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3', 'J3', 'K3', 'L3', 'M3', 'N3', 'O3', 'P3', 'Q3', 'R3', 'S3', 'T3', 'U3', 'V3', 'W3', 'X3', 'Y3', 'Z3'],
    ['A4'],
    ['A5'],
    ['A6'],
    ['A7'],
    ['A8'],
    ['A9'],
    ['A10'],
    ['A11'],
    ['A12'],
    ['A13'],
    ['A14'],
    ['A15'],
    ['A16'],
    ['A17'],
    ['A18'],
    ['A19'],
    ['A20'],
    ['A21'],
    ['A22'],
    ['A23'],
    ['A24'],
    ['A25'],
    ['A26'],
    ['A27'],
    ['A28'],
    ['A29'],
    ['A30'],
  ],
});

Page({
  data: {
    tableTitle: 'No Table',
    tableColumns: [] as Table['columns'],
    tableData: [] as Table['data'],
  },
  showTable(table: Table): void {
    this.setData({
      tableTitle: table.title,
      tableColumns: table.columns,
      tableData: table.data,
    });
  },
  showTable1(): void {
    this.showTable(getTable1());
  },
  showTable2(): void {
    this.showTable(getTable2());
  },
  showTable3(): void {
    this.showTable(getTable3());
  },
  setTableData(): void {
    const data = this.data.tableData;
    if (data.length > 0) {
      data[0][0] = '修改';
      this.setData({
        tableData: data,
      });
    }
  },
});
