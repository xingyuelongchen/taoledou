import { validatenull } from './validate'
import website from '@/config'

const keyName = website.options.storageKey + '-'

/**
 * 
 * @param {String or Object} name 可以是所有参数的对象集合 {name:...,content:...,type:...}
 * @param {any} content 存储的数据
 * @param {Boolean} type 布尔值，true表示存储到 sessionStorage，反之存储到 localStoreage
 */
export const setStore = function (params) {
  // let name, content, type;
  if (params.constructor === Object) var { name = null, content = null, type = false } = params;
  else var [name, content, type = null] = [...arguments]
  name = keyName + name
  let obj = {
    dataType: typeof (content),
    content: content,
    type: type,
    datetime: new Date().getTime()
  }
  if (type) window.sessionStorage.setItem(name, JSON.stringify(obj))
  else window.localStorage.setItem(name, JSON.stringify(obj))
}
/**
 * 获取localStorage
 */

export const getStore = function (params) {

  if (params.constructor === Object) var { name = null, debug = null, type = false } = params;
  else var [name, debug = null] = [...arguments]
  name = keyName + name;
  let obj = {}, content = null;
  obj = window.sessionStorage.getItem(name)
  if (validatenull(obj)) obj = window.localStorage.getItem(name)
  if (validatenull(obj)) return
  try {
    obj = JSON.parse(obj)
  } catch (obj) {
    return obj
  }
  if (debug) {
    return obj
  }
  if (obj.dataType == 'string') {
    content = obj.content
  } else if (obj.dataType == 'number') {
    content = Number(obj.content)
  } else if (obj.dataType == 'boolean') {
    content = eval(obj.content)
  } else if (obj.dataType == 'object') {
    content = obj.content
  }

  return content
}
/**
 * 删除localStorage
 */
export const remove = function (params) {

  if (params.constructor === Object) var { name = null, type = null } = params;
  else var [name, type = null] = [...arguments];
  name = keyName + name;
  if (type == null) {
    window.sessionStorage.removeItem(name)
    window.localStorage.removeItem(name)
  } else if (type) {
    window.sessionStorage.removeItem(name)
  } else {
    window.localStorage.removeItem(name)
  }

}

/**
 * 获取全部localStorage
 */
export const getAllStore = (params = {}) => {
  let list = []
  let {
    type
  } = params
  if (type) {
    for (let i = 0; i <= window.sessionStorage.length; i++) {
      list.push({
        name: window.sessionStorage.key(i),
        content: getStore({
          name: window.sessionStorage.key(i),
          type: 'session'
        })
      })
    }
  } else {
    for (let i = 0; i <= window.localStorage.length; i++) {
      list.push({
        name: window.localStorage.key(i),
        content: getStore({
          name: window.localStorage.key(i),
        })
      })

    }
  }
  return list

}

/**
 * 清空全部localStorage
 */
export const clearStore = (params = {}) => {
  let { type } = params
  if (type) {
    window.sessionStorage.clear()
  } else {
    window.localStorage.clear()
  }

}

export default { clearStore, getAllStore, getStore, remove, setStore }