import fetch, { OptionsWithUri } from 'request-promise';
import { stringify } from 'qs';
import logger from './logger';

const API_HOST = process.env.REACT_APP_API_HOST;

const timeout = 5 * 1000; // 5s timeout

const setParams = params => (typeof params !== 'undefined' ? `?${stringify(params)}` : '');

const getOptions = (
  route: string,
  method: 'GET'|'POST'|'PUT'|'DELETE',
  params: any,
  data: any = {},
  authToken?: string,
): OptionsWithUri => {
  const opts: OptionsWithUri = {
    method,
    uri: `${API_HOST}${route}${setParams(params)}`,
    json: true,
    timeout,
  };

  if (Object.keys(data).length > 0 && (method !== 'GET' && method !== 'DELETE')) {
    opts.body = { ...data };
  }

  if (authToken) {
    opts.headers = {
      ...opts.headers,
      Authorization: `JWT ${authToken}`
    };
  }

  return opts;
}

class Request {
  static async get(route: string, params?: any, authToken?: string) {
    try {
      const opts = getOptions(route, 'GET', params, {}, authToken);
      const response = await fetch(opts);
      logger.success('GET', `${API_HOST}${route}${setParams(params)}`);
      return response;
    } catch (error) {
      logger.error('GET', `${API_HOST}${route}${setParams(params)} - ${error.message}`);
      throw error;
    }
  }

  static async post(route: string, data: any, params?: any, authToken?: string) {
    try {
      const opts = getOptions(route, 'POST', params, data, authToken);
      const response = await fetch(opts);
      logger.success('POST', `${API_HOST}${route}${setParams(params)}`);
      return response;
    } catch (error) {
      logger.error('POST', `${API_HOST}${route}${setParams(params)} - ${error.message}`);
      throw error;
    }
  }

  static async put(route: string, data: any, params?: any, authToken?: string) {
    try {
      const opts = getOptions(route, 'PUT', params, data, authToken);
      const response = await fetch(opts);
      logger.success('PUT', `${API_HOST}${route}${setParams(params)}`);
      return response;
    } catch (error) {
      logger.error('PUT', `${API_HOST}${route}${setParams(params)} - ${error.message}`);
      throw error;
    }
  }

  static async delete(route: string, params?: any, authToken?: string) {
    try {
      const opts = getOptions(route, 'DELETE', params, {}, authToken);
      const response = await fetch(opts);
      logger.success('DELETE', `${API_HOST}${route}${setParams(params)}`);
      return response;
    } catch (error) {
      logger.error('DELETE', `${API_HOST}${route}${setParams(params)} - ${error.message}`);
      throw error;
    }
  }
}

export default Request;
