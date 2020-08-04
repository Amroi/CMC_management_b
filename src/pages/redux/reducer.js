import { READ_MSG } from './action-types';

export default function reduceCount(state = 4, action) {
	console.log('reduceCount()', state, action);
	switch (action.type) {
		case READ_MSG:
			return state - action.data
		default:
			return state
	}
}