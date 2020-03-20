import { Dispatch } from "react";
export interface ParamConfig<T> {
    decode: (val: string | null) => T | null;
    encode: (val: T | null) => string | null;
}
export declare const StringParam: ParamConfig<string>;
export declare const NumberParam: ParamConfig<number>;
export declare const JsonParam: ParamConfig<any>;
/**
 * 在localStorage中, Date值以new Date().getTime().toString()格式存储
 */
export declare const DateParam: ParamConfig<Date>;
/**
 * boolean值由0/1表示
 * 1为true, 0为false
 * decode时严格, 不为0/1则判定为false
 * encode时宽松, if (val) { return "11" }
 */
export declare const BooleanParam: ParamConfig<boolean>;
export declare const localStorageAvailable: boolean;
export declare const getLocalStorage: (key: string) => string | null;
export declare const setLocalStorage: (key: string, val: string | null) => boolean;
/**
 * 首先应当判断localStorage是否可用
 */
export declare function useLocalStorage<T>(key: string, { decode, encode }: ParamConfig<T>, errorHandler?: (err: Error) => void): [T | null, Dispatch<T | null>];
