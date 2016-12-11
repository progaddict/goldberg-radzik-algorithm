import { createStore } from 'redux';



const initialState = {
  nextId: 0,
  dlConstraints: []
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
        nextId: state.nextId + 1
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
        dlConstraints: newDlConstraints
      };
    default:
      return state;
  }
}, initialState);



export default store;
