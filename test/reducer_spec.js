import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../app/reducer.js';

describe('reducer', () => {
  it('handles SET_ENTRIES', () => {
    const state = Map();
    const action = { type: 'SET_ENTRIES', entries: ['Movie 1'] };
    const newState = reducer(state, action);

    expect(newState).to.equal(fromJS({
      entries: ['Movie 1']
    }));
  });

  it('handles VOTE', () => {
    const state = fromJS({
      vote: {
        pair: ['Movie 1', 'Movie 2'],
        tally: {
          'Movie 1': 1
        }
      },
      entries: []
    });
    const action = { type: 'VOTE', entry: 'Movie 2' };
    const newState = reducer(state, action);
    expect(newState).to.equal(fromJS({
      vote: {
        pair: ['Movie 1', 'Movie 2'],
        tally: {
          'Movie 1': 1,
          'Movie 2': 1
        }
      },
      entries: []
    }))
  });

  it('handles NEXT', () => {
    const state = fromJS({
      entries: ['Movie 1', 'Movie 2']
    });
    const action = { type: 'NEXT' };
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Movie 1', 'Movie 2']
      },
      entries: []
    }))
  });

  it('has an initial state', () => {
    const action = { type: 'SET_ENTRIES', entries: ['Movie 1'] };
    const state = reducer(undefined, action);
    expect(state).to.equal(fromJS({
      entries: ['Movie 1']
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'VOTE', entry: '28 Days Later'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'NEXT'}
    ];
    const state = actions.reduce(reducer, Map());
    expect(state).to.equal(fromJS({
      winner: 'Trainspotting'
    }))
  });
});
