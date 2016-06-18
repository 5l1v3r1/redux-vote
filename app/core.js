import {List, Map} from 'immutable';
var exports = module.exports;

function getWinners(vote) {
  if(!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if(aVotes > bVotes) return [a];
  else if(bVotes > aVotes) return [b];
  else return[a, b];
}

exports.initialState = Map();

exports.vote = function(voteState, entry) {
  return voteState.updateIn(['tally', entry], 0, tally => tally + 1);
}

exports.next = function(state) {
  let entries = state.get('entries').concat(getWinners(state.get('vote')));
  if(entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  }
  return Map({
    vote: Map({
      pair: entries.take(2)
    }),
    entries: entries.skip(2)
  });
}

exports.setEntries = function(state, entries) {
  return state.set('entries', List(entries));
}
