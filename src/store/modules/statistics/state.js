export default {
  statistics: {
    schemasBar: {
      data: {
        labels: [],
        series: [[], []]
      },
      options: {
        seriesBarDistance: 15,
        low: 0,
        high: 50,
        height: '300px',
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      updateDate: new Date()
    },
    connectionsPie: {
      data: {
        labels: [],
        series: []
      },
      options: {
        height: '300px'
      },
      updateDate: new Date()
    },
    generatedHBar: {
      data: {
        labels: [],
        series: [[]]
      },
      options: {
        height: '300px',
        seriesBarDistance: 15,
        low: 0,
        high: 100000,
        reverseData: true,
        horizontalBars: true,
        axisY: {
          offset: 70
        },
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      updateDate: new Date()
    },
    generatedRows: { value: '0' },
    errors: { value: '0' },
    fieldsPerTable: { value: '0' },
    generatedDatabase: { value: '0' }
  }
};
