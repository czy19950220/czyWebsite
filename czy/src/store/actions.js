export const setisAuthenicated = ({commit}, data) => {
  commit('setisAuthenicated', data);
};
export const setUser = ({commit}, data) => {
  commit('setUser', data);
};
export const setChapters = ({commit}, data) => {
  commit('setChapters', data);
};
export const setSourceId = ({commit}, data) => {
  commit('setSourceId', data);
};
export const LoginByUsername = ({ commit }, userInfo)=> {
  const username = userInfo.username.trim()
  return new Promise((resolve, reject) => {
    loginByUsername(username, userInfo.password).then(response => {
      const data = response.data
      Cookies.set('Token', response.data.token) //登录成功后将token存储在cookie之中
      commit('SET_TOKEN', data.token)
      resolve()
    }).catch(error => {
      reject(error)
    });
  });
}
