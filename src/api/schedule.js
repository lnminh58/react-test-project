import http from '@/services/http';

export default class Schedule {
  static saveSchedule(data, config) {
    return http.post('http://www.mocky.io/v2/5e8844b331000026303f48ae', data, config);
  }
}
