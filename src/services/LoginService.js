import {Service} from './Service'

export default{
    async post (params) {
    return await Service.__post('login',params)
  }
}
