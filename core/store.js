import { createStore } from 'redux';



const initialState = {
  nextId: 0,
  dlConstraints: [],
  isStartAlgorithmActive: false,
  isStopAlgorithmActive: false,
};

// Centralized application state
// For more information visit http://redux.js.org/
const store = createStore((state, action) => {
  // TODO: Add action handlers (aka "reduces")
  switch (action.type) {
    case 'ADD_CONSTRAINT':
      action.dlConstraint.id = state.nextId;
      return {
        ...state,
        dlConstraints: [...state.dlConstraints, action.dlConstraint],
        nextId: state.nextId + 1,
        isStartAlgorithmActive: true,
      };
    case 'REMOVE_CONSTRAINT':
      const cId = action.dlConstraint.id;
      const newDlConstraints = [...state.dlConstraints];
      const cIndex = newDlConstraints.findIndex(c => c.id === cId);
      if (cIndex === -1) {
        if (__DEV__) {
          console.warn(
            `failed to find constraint with id ${cId}. action: ${JSON.stringify(action)}`
          );
        }
        return state;
      }
      newDlConstraints.splice(cIndex, 1);
      return {
        ...state,
        dlConstraints: newDlConstraints,
        isStartAlgorithmActive: newDlConstraints.length > 0,
      };
    case 'REMOVE_ALL_CONSTRAINTS':
      if (state.dlConstraints.length === 0) {
        return state;
      }
      return {
        ...state,
        dlConstraints: [],
        isStartAlgorithmActive: false,
        isStopAlgorithmActive: false
      };
    case 'START_ALGORITHM':
      return {
        ...state,
        isStartAlgorithmActive: false,
        isStopAlgorithmActive: state.dlConstraints.length > 0
      };
    case 'STOP_ALGORITHM':
      return {
        ...state,
        isStartAlgorithmActive: state.dlConstraints.length > 0,
        isStopAlgorithmActive: false
      };
    default:
      return state;
  }
}, initialState);



export default store;
