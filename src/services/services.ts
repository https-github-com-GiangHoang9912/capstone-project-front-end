import axios from 'axios'
import Cookies from 'universal-cookie/es6'
import * as CONSTANTS from '../const'

const cookies = new Cookies()
const REFRESH_JWT_TOKEN = `${CONSTANTS.BASE_URL}/refresh-token`

export const refreshToken = async (error: any, userId: number) => {
  if (error.response && error.response.status === 401) {
    await axios.post(REFRESH_JWT_TOKEN, {
      id: userId,
    })
  }
}
