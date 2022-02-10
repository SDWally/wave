import request from '@/utils/request'

export function getFactor(table, code, start, end) {
    return request({
      url: '/factor/' + table,
      method: 'get',
      params: {
          "code": code,
          "start": start,
          "end": end
      }
    })
  }
  
  export function getData(table, code, start, end, fields) {
    return request({
      url: '/data/' + table,
      method: 'get',
      params: {
        "code": code,
        "start": start,
        "end": end,
        "fields": fields
    }
    })
  }