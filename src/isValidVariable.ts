export const isNull = (value: any): boolean => value === null;

export const isUndefined = (value: any): boolean => typeof value === 'undefined';

export const isValidArray = (array: any): boolean => !isNull(array) && !isUndefined(array) && array.constructor === Array && array.length > 0;

export const isValidString = (string: any): boolean => !isNull(string) && !isUndefined(string) && string.constructor === String && string !== '' && string !== 'null' && string !== 'undefined';

export const isBoolean = (value: any): boolean => typeof value === 'boolean';

export const isValidObject = (value: any): boolean => !isNull(value) && !isUndefined(value) && value.constructor === Object && typeof value === 'object';

export const isValidNumber = (value: any): boolean => !isNull(value) && !isUndefined(value) && !isNaN(value) && typeof value === 'number';
