import {IS_TOUCH} from "../consts";

export const isTouch = () => (dispatch, getState) => {
	dispatch({
		type: IS_TOUCH
	});
};
