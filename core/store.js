import { createStore } from 'redux';
import { Map, List } from 'immutable';

import DlConstraint from './logic/DlConstraint';
import ConstraintGraph from './logic/ConstraintGraph';



const initialState = {
  nextId: 0,
  dlConstraints: List(),
  isStartAlgorithmActive: false,
  isStopAlgorithmActive: false,
  constraintGraph: ConstraintGraph.create(),
};

const exampleDlConstraints = [
  [
    DlConstraint.create('u', 'v', true, 1, 0),
    DlConstraint.create('v', 'w', true, 5, 1),
    DlConstraint.create('w', 'x', false, -3, 2),
    DlConstraint.create('x', 'y', true, 1, 3),
    DlConstraint.create('y', 'z', false, -5, 4),
    DlConstraint.create('y', 'v', false, 0, 5),
  ],
  [
    DlConstraint.create('u', 'v', true, 1, 0),
    DlConstraint.create('v', 'w', true, 5, 1),
    DlConstraint.create('w', 'x', false, -3, 2),
    DlConstraint.create('x', 'y', true, -3, 3),
    DlConstraint.create('y', 'z', false, -5, 4),
    DlConstraint.create('y', 'w', false, 4, 5),
  ],
];
const formulas = [
  {
    ...initialState,
    nextId: 6,
    dlConstraints: List(exampleDlConstraints[0]),
    isStartAlgorithmActive: true,
    constraintGraph: ConstraintGraph.create(...exampleDlConstraints[0]),
  },
  {
    ...initialState,
    nextId: 6,
    dlConstraints: List(exampleDlConstraints[1]),
    isStartAlgorithmActive: true,
    constraintGraph: ConstraintGraph.create(...exampleDlConstraints[1]),
  },
];

// Centralized application state
// For more information visit http://redux.js.org/
const store = createStore((state, action) => {
  // TODO: Add action handlers (aka "reduces")
  switch (action.type) {
    case 'ADD_CONSTRAINT': {
      const newDlConstraint = action.dlConstraint.set('id', state.nextId);
      const newConstraints = state.dlConstraints.push(newDlConstraint);
      let newConstraintGraph = ConstraintGraph.addEdgeFromDlConstraint(state.constraintGraph, newDlConstraint);
      newConstraintGraph = ConstraintGraph.initSingleSource(newConstraintGraph);
      return {
        ...state,
        dlConstraints: newConstraints,
        constraintGraph: newConstraintGraph,
        nextId: state.nextId + 1,
        isStartAlgorithmActive: true,
      };
    }
    case 'REMOVE_CONSTRAINT': {
      const cId = action.dlConstraint.get('id');
      const currentDlConstraints = state.dlConstraints;
      const cIndex = currentDlConstraints.findIndex(c => c.get('id') === cId);
      if (cIndex === -1) {
        if (__DEV__) {
          console.warn(
            `failed to find constraint with id ${cId}`
          );
        }
        return state;
      }
      let newConstraintGraph = ConstraintGraph.removeEdgeFromDlConstraint(
        state.constraintGraph,
        currentDlConstraints.get(cIndex)
      );
      newConstraintGraph = ConstraintGraph.initSingleSource(newConstraintGraph);
      const newDlConstraints = state.dlConstraints.delete(cIndex);
      return {
        ...state,
        dlConstraints: newDlConstraints,
        constraintGraph: newConstraintGraph,
        isStartAlgorithmActive: newDlConstraints.size > 0,
        isStopAlgorithmActive: false,
      };
    }
    case 'REMOVE_ALL_CONSTRAINTS': {
      return initialState;
    }
    case 'START_ALGORITHM': {
      return {
        ...state,
        isStartAlgorithmActive: false,
        isStopAlgorithmActive: state.dlConstraints.size > 0
      };
    }
    case 'STOP_ALGORITHM': {
      return {
        ...state,
        isStartAlgorithmActive: state.dlConstraints.size > 0,
        isStopAlgorithmActive: false
      };
    }
    case 'LOAD_FORMULA': {
      return formulas[action.formulaId];
    }
    default: {
      return state;
    }
  }
}, initialState);



export default store;
