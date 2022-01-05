import {IS_TOUCH} from "../consts";

export default function touchReducer(state = false, action) {
	if (action.type === IS_TOUCH) {
		return true;
	} else {
		return state;
	}
}
