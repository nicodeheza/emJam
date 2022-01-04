import {addUser, deleteUser, setRoom} from "../redux/actions/chatActions";
import {deleteDrum, playDrum, playNotes, stopNote} from "../redux/actions/noteActions";
import {createWave, deleteWave} from "../redux/actions/wavesActions";

export default function onMessage(message, dispatch) {
	const data = JSON.parse(message.data);
	switch (data.status) {
		case "connected":
			dispatch(setRoom(data.room));
			data.users.forEach((user) => {
				dispatch(addUser(user));
				dispatch(createWave(user));
			});
			break;
		case "newUser":
			dispatch(addUser(data.user));
			dispatch(createWave(data.user));
			break;
		case "userExit":
			dispatch(deleteUser(data.user));
			dispatch(deleteWave(data.user));
			break;
		case "message":
			if (data.message.hasOwnProperty("freq")) {
				const {
					freq,
					sine,
					square,
					sawtooth,
					triangle,
					vibratoGain,
					vibratoFrequency,
					instrumentVolume,
					isPlaying
				} = data.message;
				//console.log(data.message);
				const noteId = data.user + freq;
				if (isPlaying) {
					dispatch(
						playNotes(
							noteId,
							freq,
							sine,
							square,
							sawtooth,
							triangle,
							vibratoGain,
							vibratoFrequency,
							instrumentVolume,
							data.user
						)
					);
				} else {
					dispatch(stopNote(noteId));
				}
			} else {
				const {drumpBuffersIndex, instrumentVolume, isPlaying} = data.message;
				const drumId = data.user + drumpBuffersIndex;
				if (isPlaying) {
					dispatch(playDrum(drumId, drumpBuffersIndex, instrumentVolume, data.user));
				} else {
					dispatch(deleteDrum(drumId));
				}
			}
			break;
		default:
			break;
	}
}
