Component({
  options: {
    virtualHost: true,
    pureDataPattern: /^_/,
  },
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
    _isAttached: false,
    renderState: 0,
  },
  observers: {
    'height, columns.**, rowData.**': function () {
      if (this.data._isAttached) {
        this.setData({
          renderState: this.data.renderState ^ 1,
        });
      }
    },
  },
  lifetimes: {
    attached(): void {
      this.setData({ _isAttached: true });
    }
  }
});
