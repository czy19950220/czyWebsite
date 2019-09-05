export default {
  title: {
    text: '饼图示例：擅长英雄',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['无极剑圣', '浪人亚索', '薇恩', '影流之主劫', '武器大师']
  },
  series: [
    {
      name: '擅长英雄',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 11231, name: '无极剑圣' },
        { value: 300, name: '浪人亚索' },
        { value: 100, name: '薇恩' },
        { value: 341, name: '影流之主劫' },
        { value: 451, name: '武器大师' }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
