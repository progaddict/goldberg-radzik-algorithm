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
    default:
      return state;
  }
}, initialState);



export default store;
