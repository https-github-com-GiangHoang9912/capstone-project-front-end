export const BASE_URL = 'http://localhost:3001/api'
export const GOOGLE_CLIENT_ID =
  '827399353225-mcijnq4m11fumgle6f14o8jfre24t9e7.apps.googleusercontent.com'
export const GOOGLE_CLIENT_ID_LOCAL =
  '827399353225-oj56ie731f6jba41j2uupaqr21o4g1sj.apps.googleusercontent.com'

export const HISTORY_TYPE = {
  GENERATE: 1,
  DUPLICATE: 2,
  UPDATE_PROFILE: 3,
  CHANGE_PASSWORD: 4,
}

export const MESSAGE = (props?:any)=> {
  const message = {
  ADD_SUCCESS: "Add Successfully !!",
  DELETE_SUCCESS: `${props} Deleted Successfully !!`,
  UPDATE_SUCCESS: "Update Successfully !!",
  CHECK_SUCCESS: "Question Checked Successfully !!",
  TRAIN_SUCCESS: "Training Data Successfully !!",
  CREATE_SUCCESS: "Create Successfully !!",
  CHANGE_SUCCESS: `${props}Role Changed Successfully !!`,
  FAIL: `Fail to ${props}`,
  
  } 
  return message
}
