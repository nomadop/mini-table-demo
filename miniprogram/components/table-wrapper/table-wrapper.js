"use strict";
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
        attached: function () {
            this.setData({ _isAttached: true });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtd3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYmxlLXdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsQ0FBQztJQUNSLE9BQU8sRUFBRTtRQUNQLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLGVBQWUsRUFBRSxJQUFJO0tBQ3RCO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsR0FBRztTQUNYO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsRUFBRTtTQUNWO0tBQ0Y7SUFDRCxJQUFJLEVBQUU7UUFDSixXQUFXLEVBQUUsS0FBSztRQUNsQixXQUFXLEVBQUUsQ0FBQztLQUNmO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsZ0NBQWdDLEVBQUU7WUFDaEMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQztpQkFDdkMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDO0tBQ0Y7SUFDRCxTQUFTLEVBQUU7UUFDVCxRQUFRLEVBQVI7WUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdEMsQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiQ29tcG9uZW50KHtcbiAgb3B0aW9uczoge1xuICAgIHZpcnR1YWxIb3N0OiB0cnVlLFxuICAgIHB1cmVEYXRhUGF0dGVybjogL15fLyxcbiAgfSxcbiAgcHJvcGVydGllczoge1xuICAgIGhlaWdodDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgdmFsdWU6IDMwMCxcbiAgICB9LFxuICAgIGNvbHVtbnM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgdmFsdWU6IFtdLFxuICAgIH0sXG4gICAgcm93RGF0YToge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICB2YWx1ZTogW10sXG4gICAgfSxcbiAgfSxcbiAgZGF0YToge1xuICAgIF9pc0F0dGFjaGVkOiBmYWxzZSxcbiAgICByZW5kZXJTdGF0ZTogMCxcbiAgfSxcbiAgb2JzZXJ2ZXJzOiB7XG4gICAgJ2hlaWdodCwgY29sdW1ucy4qKiwgcm93RGF0YS4qKic6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmRhdGEuX2lzQXR0YWNoZWQpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICByZW5kZXJTdGF0ZTogdGhpcy5kYXRhLnJlbmRlclN0YXRlIF4gMSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbiAgbGlmZXRpbWVzOiB7XG4gICAgYXR0YWNoZWQoKTogdm9pZCB7XG4gICAgICB0aGlzLnNldERhdGEoeyBfaXNBdHRhY2hlZDogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cbn0pO1xuIl19