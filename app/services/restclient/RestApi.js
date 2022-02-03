import axios from 'axios';
import I18n from 'react-native-i18n';

export default class RestApi {
  instance = null;
  instance2 = null;
  instance3 = null;

  constructor() {
    this.instance = axios.create({
      baseURL: `https://e1e7-39-50-139-227.ngrok.io/`,
      timeout: 50000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    this.instance2 = axios.create({
      baseURL: `https://e1e7-39-50-139-227.ngrok.io/`,
      timeout: 50000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  static getInstance() {
    if (this.instance == null) {
      this.instance = axios.create({
        baseURL: `https://e1e7-39-50-139-227.ngrok.io/`,
        timeout: 50000,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }
    return this.instance;
  }
  static getInstance2(token) {
    return axios.create({
      baseURL: `https://e1e7-39-50-139-227.ngrok.io/`,
      timeout: 50000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
