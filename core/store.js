import { createStore } from 'redux';
import { Map, List } from 'immutable';

import DlConstraint from './logic/DlConstraint';
import ConstraintGraph from './logic/ConstraintGraph';



const initialState = Map({
  nextId: 0,
  dlConstraints: List(),
  isStartAlgorithmActive: false,
  isStopAlgorithmActive: false,
  constraintGraph: ConstraintGraph.create(),
});

const exampleDlConstraints = [
  List([
    DlConstraint.create('u', 'v', true, 1, 0),
    DlConstraint.create('v', 'w', true, 5, 1),
    DlConstraint.create('w', 'x', false, -3, 2),
    DlConstraint.create('x', 'y', true, 1, 3),
    DlConstraint.create('y', 'z', false, -5, 4),
    DlConstraint.create('y', 'v', false, 0, 5),
  ]),
  List([
    DlConstraint.create('u', 'v', true, 1, 0),
    DlConstraint.create('v', 'w', true, 5, 1),
    DlConstraint.create('w', 'x', false, -3, 2),
    DlConstraint.create('x', 'y', true, -3, 3),
    DlConstraint.create('y', 'z', false, -5, 4),
    DlConstraint.create('y', 'w', false, 4, 5),
  ]),
];

const exampleFormulasStates = [
  initialState.set('nextId', 6)
    .set('dlConstraints', List(exampleDlConstraints[0]))
    .set('isStartAlgorithmActive', true)
    .set('constraintGraph', ConstraintGraph.create(...exampleDlConstraints[0])),
  initialState.set('nextId', 6)
    .set('dlConstraints', List(exampleDlConstraints[1]))
    .set('isStartAlgorithmActive', true)
    .set('constraintGraph', ConstraintGraph.create(...exampleDlConstraints[1])),
];

// Centralized application state
// For more information visit http://redux.js.org/
const store = createStore((state, action) => {
  // TODO: Add action handlers (aka "reduces")
  switch (action.type) {
    case 'ADD_CONSTRAINT': {
      const newDlConstraint = action.dlConstraint.set('id', state.get('nextId'));
      const newDlConstraints = state.get('dlConstraints').push(newDlConstraint);
      const newConstraintGraph = ConstraintGraph.create(...(newDlConstraints.toArray()));
      const newState = state.set('dlConstraints', newDlConstraints)
        .set('constraintGraph', newConstraintGraph)
        .set('nextId', state.get('nextId') + 1)
        .set('isStartAlgorithmActive', true);
      return newState;
    }
    case 'REMOVE_CONSTRAINT': {
      const cId = action.dlConstraint.get('id');
      const currentDlConstraints = state.get('dlConstraints');
      const cIndex = currentDlConstraints.findIndex(c => c.get('id') === cId);
      if (cIndex === -1) {
        if (__DEV__) {
          console.warn(
            `failed to find constraint with id ${cId}`
          );
        }
        return state;
      }
      const newDlConstraints = currentDlConstraints.delete(cIndex);
      const newConstraintGraph = ConstraintGraph.create(...(newDlConstraints.toArray()));
      const newState = state.set('dlConstraints', newDlConstraints)
        .set('constraintGraph', newConstraintGraph)
        .set('isStartAlgorithmActive', newDlConstraints.size > 0)
        .set('isStopAlgorithmActive', false);
      return newState;
    }
    case 'REMOVE_ALL_CONSTRAINTS': {
      return initialState;
    }
    case 'START_ALGORITHM': {
      const newState = state.set('isStartAlgorithmActive', false)
        .set('isStopAlgorithmActive', true);
      return newState;
    }
    case 'STOP_ALGORITHM': {
      const newState = state.set('isStartAlgorithmActive', true)
        .set('isStopAlgorithmActive', false);
      return newState;
    }
    case 'LOAD_FORMULA': {
      return exampleFormulasStates[action.formulaId];
    }
    default: {
      return state;
    }
  }
}, initialState);



export default store;
