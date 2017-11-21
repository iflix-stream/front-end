import { Service } from './Service'

export default {
  async getById (id) {
    return await Service._get('usuario/id/' + id)
  }
}
