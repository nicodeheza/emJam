import {CREATE_AUDIO_CONTEXT, CREATE_MAIN_GAIN} from "../consts";
const AudioContext = window.AudioContext || window.webkitAudioContext;

export const createAudioContext = () => (dispatch) => {
	const audioCtx = new AudioContext();
	console.log(audioCtx);
	dispatch({
		type: CREATE_AUDIO_CONTEXT,
		payload: audioCtx
	});
};

export const createMainGain = () => (dispatch, getState) => {
	const {audioCtx} = getState().audioCtx;
	console.log(audioCtx);
	const masterGain = audioCtx.createGain();
	masterGain.connect(audioCtx.destination);
	dispatch({
		type: CREATE_MAIN_GAIN,
		payload: masterGain
	});
};

export const updateMasterGain = (vol) => (dispatch, getState) => {
	const {masterGain} = getState().audioCtx;
	masterGain.gain.setValueAtTime(vol, 0);
};
