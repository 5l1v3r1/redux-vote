import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../app/index.js';

describe('application logic', () => {
 describe('vote', () => {
   it('creates a counter for the voted entry', () => {
     const state = Map({
       vote: Map({
         pair: List.of('Movie 1', 'Movie 2')
       }),
       entries: List.of('Movie 3')
     })
     const newState = vote(state, 'Movie 1');
     expect(newState).to.equal(Map({
        vote: Map({
          pair: List.of('Movie 1', 'Movie 2'),
          tally: Map({
            'Movie 1' : 1
          })
        }),
        entries: List.of('Movie 3')
     }));
   });
   it('increments the counter', () => {
     const state = Map({
       vote: Map({
         pair: List.of('Movie 1', 'Movie 2'),
         tally: Map({
           'Movie 1' : 2,
           'Movie 2': 3
         })
       }),
       entries: List.of('Movie 3')
     })
     const newState = vote(state, 'Movie 1');
     expect(newState).to.equal(Map({
        vote: Map({
          pair: List.of('Movie 1', 'Movie 2'),
          tally: Map({
            'Movie 1' : 3,
            'Movie 2' : 3
          })
        }),
        entries: List.of('Movie 3')
     }));
   });
 });

 describe('next', () => {
   it('marks winner when there is just one user left', () => {
     const state = Map({
       vote:Map({
         pair: List.of('Movie 1', 'Movie 2'),
         tally: Map({
           'Movie 1': 10,
           'Movie 2': 1
         })
       }),
       entries: List()
     })
     const nextState = next(state);
     expect(nextState).to.equal(Map({
       winner: 'Movie 1'
     }));
   });
   it('puts the winner of the vote back to the entries', () => {
     const state = Map({
       vote: Map({
         pair: List.of('Movie 1', 'Movie 2'),
         tally: Map({
           'Movie 1' : 4,
           'Movie 2' : 3
         })
       }),
       entries: List.of('Movie 3', 'Movie 4')
     });
     var nextState = next(state);
     expect(nextState).to.equal(Map({
       vote: Map({
         pair: List.of('Movie 3', 'Movie 4')
       }),
       entries: List.of('Movie 1')
     }));
   });
   it('puts both from tied votes back to entries', () => {
     const state = Map({
       vote: Map({
         pair: List.of('Movie 1', 'Movie 2'),
         tally: Map({
           'Movie 1' : 3,
           'Movie 2' : 3
         })
       }),
       entries: List.of('Movie 3', 'Movie 4')
     });
     var nextState = next(state);
     expect(nextState).to.equal(Map({
       vote: Map({
         pair: List.of('Movie 3', 'Movie 4')
       }),
       entries: List.of('Movie 1', 'Movie 2')
     }));
   });
   it('opens a vote on the next pair', () => {
     const state = Map({
       entries: List.of('Movie 1', 'Movie 2', 'Movie 3')
     });
     const nextState = next(state);
     expect(nextState).to.equal(Map({
       vote: Map({
         pair: List.of('Movie 1', 'Movie 2')
       }),
       entries: List.of('Movie 3')
     }));
   });
 });

 describe('setEntries', () => {
   it('adds entries to the state', () => {
     const state = Map();
     let entries = List.of('Movie 1', 'Movie 2', 'Movie 3');
     const newState = setEntries(state, entries);
     expect(newState).to.equal(Map({
       entries: List.of('Movie 1', 'Movie 2', 'Movie 3')
     }));
   });
   it('converts to immutable', () => {
     const state = Map();
     let entries = ['Movie 1', 'Movie 2', 'Movie 3'];
     const newState = setEntries(state, entries);
     expect(newState).to.equal(Map({
       entries: List.of('Movie 1', 'Movie 2', 'Movie 3')
     }));
   });
 });
});
