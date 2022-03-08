import {CREATE_DRUMS_BUFFERS} from "../consts";

export const createDrumsBuffer =
	(drumsFilesNames, keyMapLength) => async (dispatch, getState) => {
		const audioCtx = getState().audioCtx.audioCtx;

		if (audioCtx) {
			const buffers = [];
			for (let i = 0; i < keyMapLength; i++) {
				const name = drumsFilesNames[i % drumsFilesNames.length];
				const fileDir = `drumsSamples/${name}.wav`;
				const res = await fetch(fileDir);
				const soundBuffer = await res.arrayBuffer();
				// const dBuffer = await audioCtx.decodeAudioData(soundBuffer);
				audioCtx.decodeAudioData(
					soundBuffer,
					(b) => {
						buffers.push(b);
					},
					(err) => {
						console.log(err);
					}
				);
				//buffers.push(dBuffer);
			}

			dispatch({
				type: CREATE_DRUMS_BUFFERS,
				payload: buffers
			});
		}
	};
