import { Dispatch } from "react";
export interface ParamConfig<T> {
    decode: (val: string | null) => T | null;
    encode: (val: T | null) => string | null;
}
export declare const StringParam: ParamConfig<string>;
export declare const NumberParam: ParamConfig<number>;
export declare const JsonParam: ParamConfig<any>;
export declare const DateParam: ParamConfig<Date>;
export declare const BooleanParam: ParamConfig<boolean>;
export declare const localStorageAvailable: boolean;
export declare const getLocalStorage: (key: string) => string | null;
export declare const setLocalStorage: (key: string, val: string | null) => boolean;
/**
 * 首先应当判断localStorage是否可用
 */
export declare function useLocalStorage<T>(key: string, { decode, encode }: ParamConfig<T>, errorHandler?: (err: Error) => void): [T | null, Dispatch<T | null>];
