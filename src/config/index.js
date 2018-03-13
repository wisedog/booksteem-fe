/**
 * @Project booksteem-fe
 * @author  jongha.kim
 *
 * Created by Jongha Kim (kim.jongha@gmail.com) on 2017. 10. 24..
 */

import production from './production'
import development from './development'

export const ENVIRONMENT = process.env.NODE_ENV

export default Object.assign({
  timezone: 'Asia/Seoul'
}, { production, development }[ENVIRONMENT])
