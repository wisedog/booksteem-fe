/**
 * @Project booksteemkr
 * @author  jongha.kim
 *
 * Created by Jongha Kim (kim.jongha@gmail.com) on 2018. 02. 21..
 */

import Api from './'

class ReviewAPI {
  review (page, size) {
    return Api.get(`/api/post`, {params: { page: page, size: size, mode: 'created' }})
  }
  cate (page, size, category) {
    return Api.get(`/api/post`, {params: { page: page, size: size, mode: 'created', 'filter_mode': 'category', filter: category }})
  }
  author (page, size, authorID) {
    return Api.get(`/api/post`, {params: { page: page, size: size, mode: 'created', 'filter_mode': 'author', filter: authorID }})
  }
}
export default new ReviewAPI()
