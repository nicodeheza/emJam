import {useCallback, useEffect, useState} from "react";
import {
	createAudioContext,
	createMainGain,
	updateMasterGain
} from "../redux/actions/audioContex";
import {createWave, resetWaves} from "../redux/actions/wavesActions";
import {useDispatch, useSelector} from "react-redux";
import Toolbar from "./Toolbar";
import Keyboard from "./Keyboard";
import Settings from "./Settings";
import keyMap from "./keyMap";
import Reconnect from "./Reconnect";

import "./chat.css";
import {connect, resetChat, updateConnectionState} from "../redux/actions/chatActions";
import {CONNECTED, FAIL} from "../connectionConst";
import onMessage from "./onMessage";
import {createDrumsBuffer} from "../redux/actions/drumsBufferAction";
import Canvas from "./Canvas";

const drumsFilesNames = [
	"f1",
	"h1",
	"k1",
	"n1",
	"o1",
	"off1",
	"p1",
	"r1",
	"s1",
	"f2",
	"h2",
	"k2",
	"n2",
	"o2",
	"off2",
	"p2",
	"r2",
	"s2",
	"f3",
	"h3",
	"k3",
	"n3",
	"o3",
	"off3",
	"p3",
	"r3",
	"s3"
];

export default function Chat() {
	const dispatch = useDispatch();
	const [mainVolumen, setMainVolumen] = useState(50);
	const [drumsSelected, setDrumsSelected] = useState(false);
	const [keysPressed, setKeysPressed] = useState([]);
	const [showSettings, setShowSettings] = useState(false);
	const [instrumentSettings, setInstrumentSettings] = useState({
		sine: 100,
		square: 0,
		triangle: 0,
		sawtooth: 0,
		vibratoGain: 0,
		vibratoFreq: 0,
		volume: 50
	});

	//get keys
	const keyDown = useCallback((e) => {
		setKeysPressed((prev) => {
			if (prev.includes(e.key.toLocaleLowerCase())) {
				return [...prev];
			} else {
				return [...prev, e.key.toLocaleLowerCase()];
			}
		});
	}, []);
	const keyUp = useCallback((e) => {
		setKeysPressed((prev) => prev.filter((ele) => ele !== e.key.toLocaleLowerCase()));
	}, []);

	useEffect(() => {
		window.addEventListener("keydown", keyDown);
		window.addEventListener("keyup", keyUp);

		return () => {
			window.removeEventListener("keydown", keyDown);
			window.removeEventListener("keyup", keyUp);
		};
	}, [keyDown, keyUp]);

	// useEffect(()=>{
	//     console.log(keysPressed)
	// },[keysPressed]);

	useEffect(() => {
		dispatch(createAudioContext());
		dispatch(createMainGain());
		dispatch(createWave("local"));
		dispatch(createDrumsBuffer(drumsFilesNames, keyMap.length));
		dispatch(connect());
	}, [dispatch]);
	useEffect(() => {
		dispatch(updateMasterGain(mainVolumen / 100));
	}, [mainVolumen, dispatch]);

	//chat
	const connectionState = useSelector((s) => s.chat.connectionState);
	const ws = useSelector((s) => s.chat.ws);

	useEffect(() => {
		if (ws) {
			let err = false;
			ws.onerror = (e) => {
				console.log("ws error");
				dispatch(updateConnectionState(FAIL));
				err = true;
			};
			ws.onopen = (e) => {
				console.log("connected");
				dispatch(updateConnectionState(CONNECTED));
			};
			ws.onmessage = (message) => onMessage(message, dispatch);

			ws.onclose = (e) => {
				if (!err) {
					dispatch(updateConnectionState(FAIL));
					dispatch(resetChat());
					dispatch(resetWaves());
					console.log("close");
				}
			};
		}

		return () => {
			if (ws) {
				ws.close();
			}
		};
	}, [ws, dispatch]);

	return (
		<div className="chatMainContainer">
			{connectionState !== CONNECTED ? (
				<Reconnect connectionState={connectionState} />
			) : null}
			<div className="viewControlsContainer" id="viewCon">
				<Canvas />
				<Toolbar
					mainVolumen={mainVolumen}
					setMainVolumen={setMainVolumen}
					drumsSelected={drumsSelected}
					setDrumsSelected={setDrumsSelected}
					setShowSettings={setShowSettings}
				/>
				<Settings
					instrumentSettings={instrumentSettings}
					setInstrumentSettings={setInstrumentSettings}
					showSettings={showSettings}
					drumsSelected={drumsSelected}
				/>
			</div>
			<Keyboard
				keysPressed={keysPressed}
				drumsSelected={drumsSelected}
				instrumentSettings={instrumentSettings}
			/>
		</div>
	);
}
