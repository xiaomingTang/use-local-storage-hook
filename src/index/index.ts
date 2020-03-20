import { useState, Dispatch, useEffect } from "react"

export interface ParamConfig<T> {
  decode: (val: string | null) => T | null;
  encode: (val: T | null) => string | null;
}

export const StringParam: ParamConfig<string> = {
  decode: (val) => val,
  encode: (val) => val,
}

export const NumberParam: ParamConfig<number> = {
  decode: (val) => {
    if (val === null) { return null }
    return Number(val)
  },
  encode: (val) => {
    if (val === null) { return null }
    return `${val}`
  },
}

export const JsonParam: ParamConfig<any> = {
  decode: (val) => {
    if (val === null) { return null }
    try {
      return JSON.parse(val)
    } catch (err) {
      return null
    }
  },
  encode: (val) => {
    if (val === null) { return null }
    return JSON.stringify(val)
  },
}

/**
 * 在localStorage中, Date值以new Date().getTime().toString()格式存储
 */
export const DateParam: ParamConfig<Date> = {
  decode: (val) => {
    if (val === null) { return null }
    return new Date(Number(val))
  },
  encode: (val) => {
    if (val === null) { return null }
    return val.getTime().toString()
  },
}

/**
 * boolean值由0/1表示
 * 1为true, 0为false
 * decode时严格, 不为0/1则判定为false
 * encode时宽松, if (val) { return "11" }
 */
export const BooleanParam: ParamConfig<boolean> = {
  decode: (val) => { // 严格
    if (val === "1") { return true }
    if (val === "0") { return false }
    return null
  },
  encode: (val) => { // 宽松
    if (val) { return "1" }
    return "0"
  },
}

const checkLocalStorageAvailable = () => {
  try {
    window.localStorage.setItem("__@xiaomingtang/use-local-storage/test__", "yes")
    window.localStorage.removeItem("__@xiaomingtang/use-local-storage/test__")
    return true
  } catch (err) {
    return false
  }
}

export const localStorageAvailable = checkLocalStorageAvailable()

export const getLocalStorage = (key: string): string | null => {
  if (!localStorageAvailable) { return null }
  return window.localStorage.getItem(key)
}

export const setLocalStorage = (key: string, val: string | null): boolean => {
  if (!localStorageAvailable) { return false }
  if (val === null) {
    window.localStorage.removeItem(key)
    return true
  }
  try {
    window.localStorage.setItem(key, val)
  } catch (err) {
    return false
  }
  return true
}

/**
 * 首先应当判断localStorage是否可用
 */
export function useLocalStorage<T>(key: string, { decode, encode }: ParamConfig<T>, errorHandler?: (err: Error) => void): [T | null, Dispatch<T | null>] {
  const defaultVal = getLocalStorage(key)
  const [result, setResult] = useState(decode(defaultVal))

  useEffect(() => {
    const status = setLocalStorage(key, encode(result))
    if (!status && typeof errorHandler === "function") {
      errorHandler(new Error(`Fail to set localStorage: localStorage is not available or Setting the value of '${key}' exceeded the quota.`))
    }
  }, [key, encode, result, errorHandler])

  return [result, setResult]
}
