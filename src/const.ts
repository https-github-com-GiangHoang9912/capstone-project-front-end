export const BASE_URL = 'https://ddsgq.xyz/api'
export const GOOGLE_CLIENT_ID =
  '827399353225-mcijnq4m11fumgle6f14o8jfre24t9e7.apps.googleusercontent.com'
export const GOOGLE_CLIENT_ID_LOCAL =
  '827399353225-oj56ie731f6jba41j2uupaqr21o4g1sj.apps.googleusercontent.com'

export const HISTORY_TYPE = {
  GENERATE: 2,
  DUPLICATE: 1,
  UPDATE_PROFILE: 3,
  CHANGE_PASSWORD: 4,
}

export const MESSAGE = (props?: any) => {
  const message = {
    ADD_SUCCESS: 'Add Successfully !!',
    DELETE_SUCCESS: `${props} Deleted Successfully !!`,
    UPDATE_SUCCESS: 'Update Successfully !!',
    CHECK_SUCCESS: 'Question Checked Successfully !!',
    CHANGE_PASSWORD_SUCCESS: 'Change Passsword Successfully !!',
    TRAIN_SUCCESS: 'Training Data Successfully !!',
    CREATE_SUCCESS: 'Create Successfully !!',
    CHANGE_SUCCESS: `${props}Role Changed Successfully !!`,
    FAIL: `Fail to ${props}`,
    BLANK_INPUT: "Input is empty !!!",
    GEN_SUCCESS: "Generate question successfully",
    SEARCH_NOT_FOUND: `Not found ${props}`,
    NO_QUESTION_SELECTED: `Add fail, No questions selected !!`,
    NO_ANSWER: `Update fail, you must add answer to update`,
  }
  return message
}
export const CONFIDENT = {
  point: 0.6,
}
