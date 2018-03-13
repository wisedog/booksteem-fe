/**
 * @Project booksteemkr
 * @author  jongha.kim
 *
 * Created by Jongha Kim (kim.jongha@gmail.com) on 2018. 02. 21..
 */

import Api from './'

class AuthorAPI {
  authors (page, size, mode) {
    return Api.get(`/api/author`, {params: { page: page, size: size, mode: mode }})
  }
}
export default new AuthorAPI()
