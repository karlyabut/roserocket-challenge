const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_TASK_DATA = 'SET_TASK_DATA';

function reducer(state, action) {
  switch(action.type) {
    case SET_APPLICATION_DATA:
      return {
        ...state,
        drivers: action.value
      }
    default:
      throw new Error(
        `error: unsupported action type ${action.type}`
      )
      
  }
}
export {reducer, SET_APPLICATION_DATA }