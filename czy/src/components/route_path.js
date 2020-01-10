export const routePath=[
  {
    closable: true,
    tagName: '小说',
    tagRouter: '/novel',
    breadcrumb: '小说',
    childrens: [
      {
        closable: true,
        tagName: '搜索',
        tagRouter: '/novel/search',
        breadcrumb: '搜索',
      },
      {
        closable: true,
        tagName: '小说详情',
        tagRouter: '/novel/detail',
        breadcrumb: '小说详情',
      },
      {
        closable: true,
        tagName: '小说阅读',
        tagRouter: '/novel/read',
        breadcrumb: '小说阅读',
      },
      {
        closable: true,
        tagName: '书架',
        tagRouter: '/novel/bookrack',
        breadcrumb: '书架',
      }
    ]
  },
  {
    closable: true,
    tagName: 'CANVAS',
    //tagRouter: '/flappybird',
    breadcrumb: '像素鸟',
    childrens: [
      {
        closable: true,
        tagName: '像素鸟',
        tagRouter: '/flappybird',
        breadcrumb: '像素鸟',
      }
    ]
  },
  {
    closable: true,
    tagName: '博文',
    //tagRouter: '/blog',
    breadcrumb: '博文',
    childrens: [
      {
        closable: true,
        tagName: '博文统计',
        tagRouter: '/blogtable',
        breadcrumb: '博文统计'
      },
      {
        closable: true,
        tagName: '博文编辑',
        tagRouter: '/blogdetail',
        breadcrumb: '博文编辑',
      }
    ]
  },
  {
    closable: true,
    tagName: 'ECHARTS',
    //tagRouter: '/echarts',
    breadcrumb: 'ECHARTS',
    childrens: [
      {
        closable: true,
        tagName: '折线图',
        tagRouter: '/echarts/line',
        breadcrumb: '折线图'
      },
      {
        closable: true,
        tagName: '柱状图',
        tagRouter: '/echarts/barchart',
        breadcrumb: '柱状图'
      },
      {
        closable: true,
        tagName: '极坐标',
        tagRouter: '/echarts/polardiagram',
        breadcrumb: '极坐标'
      },
      {
        closable: true,
        tagName: '饼状图',
        tagRouter: '/echarts/piechart',
        breadcrumb: '饼状图'
      },
      {
        closable: true,
        tagName: '散点图',
        tagRouter: '/echarts/scatterplot',
        breadcrumb: '散点图'
      },
      {
        closable: true,
        tagName: '地图',
        tagRouter: '/echarts/map',
        breadcrumb: '地图'
      },
      {
        closable: true,
        tagName: '能力图',
        tagRouter: '/echarts/radar',
        breadcrumb: '能力图'
      }
    ]
  },
]
