/**
 * @Project booksteemkr
 * @author  jongha.kim
 *
 * Created by Jongha Kim (kim.jongha@gmail.com) on 2018. 02. 21..
 */

import Api from './'

class CategoryStatAPI {
  stat (order) {
    return Api.get(`/api/stat/category`, {params: {order: order}})
  }
}
export default new CategoryStatAPI()
