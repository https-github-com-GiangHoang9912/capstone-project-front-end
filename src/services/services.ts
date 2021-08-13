import axios from 'axios'

import * as CONSTANTS from '../const'


const REFRESH_JWT_TOKEN = `${CONSTANTS.BASE_URL}/refresh-token`

export const refreshToken = async (userId: number) => {
  await axios.post(REFRESH_JWT_TOKEN, {
    id: userId,
  })
}
