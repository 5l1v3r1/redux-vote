import {next, setEntries, vote, initialState} from './core.js';

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case 'NEXT': return next(state);
    case 'SET_ENTRIES': return setEntries(state, action.entries);
    case 'VOTE': return state.update('vote', voteState => vote(voteState, action.entry));
  }
  return state;
}
