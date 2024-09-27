// @flow

  export const initialState = {
    count: 0,
  };
  
  export const INCREASE_COUNT = 'AppState/INCREASE_COUNT';
  export const DECREASE_COUNT = 'AppState/DECREASE_COUNT';
  
  export function increaseCOunt(data) {
    return {
      type: INCREASE_COUNT,
      payload: data
    };
  }
  export function decreaseCOunt(data) {
    return {
      type: DECREASE_COUNT,
      payload: data
    };
  }
  
  export default function counterReducer(
    state = initialState,
    action,
  ) {
    switch (action.type) {
      case INCREASE_COUNT:
        return {
          ...state,
          count: state.count + action.num,
        };
      case DECREASE_COUNT:
        return {
          ...state,
          count: state.count - action.num,
        };
      default:
        return state;
    }
  }
  