import { createStore } from 'redux';

import DlConstraint from './logic/DlConstraint';



const initialState = {
  nextId: 0,
  dlConstraints: [],
  isStartAlgorithmActive: false,
  isStopAlgorithmActive: false,
};

const formulas = [
  {
    ...initialState,
    nextId: 6,
    dlConstraints: [
      new DlConstraint('u', 'v', true, 1, 0),
      new DlConstraint('v', 'w', true, 5, 1),
      new DlConstraint('w', 'x', false, -3, 2),
      new DlConstraint('x', 'y', true, 1, 3),
      new DlConstraint('y', 'z', false, -5, 4),
      new DlConstraint('y', 'v', false, 0, 5),
    ],
    isStartAlgorithmActive: true,
  },
  {
    ...initialState,
    nextId: 6,
    dlConstraints: [
      new DlConstraint('u', 'v', true, 1, 0),
      new DlConstraint('v', 'w', true, 5, 1),
      new DlConstraint('w', 'x', false, -3, 2),
      new DlConstraint('x', 'y', true, -3, 3),
      new DlConstraint('y', 'z', false, -5, 4),
      new DlConstraint('y', 'w', false, 4, 5),
    ],
    isStartAlgorithmActive: true,
  },
];

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
        isStopAlgorithmActive: false,
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
    case 'LOAD_FORMULA':
      return formulas[action.formulaId];
    default:
      return state;
  }
}, initialState);



export default store;
