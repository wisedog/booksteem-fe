/**
 * @Project booksteemkr
 * @author  jongha.kim
 *
 * Created by Jongha Kim (kim.jongha@gmail.com) on 2018. 02. 21..
 */

import axios from 'axios'
import config from '@/config'

// Init
const Api = axios.create({
  baseURL: config.api_server,
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
})

export default Api
