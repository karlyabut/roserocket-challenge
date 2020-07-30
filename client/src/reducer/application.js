const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';

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