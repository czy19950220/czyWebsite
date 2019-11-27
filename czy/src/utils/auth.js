import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCurrentAuthority() {
  return ['user'];
}

export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item=>authority.includes(item))
}

export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== 'guest'
}
