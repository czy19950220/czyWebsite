export const isAuthenicated = state => state.isAuthenicated;
export const user = state => state.user;
export const chapters = state => state.chapters;
export const sourceId = state => state.sourceId;
export const users = state => state.users;
export const isCollapse = state => state.isCollapse;
export const tagMenu = state => state.tagMenu;
export const blogNum = state => state.blogNum;
export const novelUrl = state => state.novelUrl;
export const scoreRadar = ({ scores }) => {
  return {
    title: {
      text: '能力图'
    },
    tooltip: {},
    radar: {
      indicator: scores.map(({ name, max }) => {
        return { name, max }
      })
    },
    series: [
      {
        name: '能力值',
        type: 'radar',
        data: [{ value: scores.map(({ value }) => value) }]
      }
    ]
  }
}
