import {useRef, useState} from "react";
import "./keyboard.css";
import PianoKey from "./PianoKey";
import keyMap from "./keyMap";

export default function Keyboard({keysPressed, drumsSelected, instrumentSettings}) {
	const [drag, setDrag] = useState({
		isScrolling: false,
		clientX: 0,
		scrollX: 0
	});

	const keyboard = useRef(null);

	function mouseDown(e) {
		setDrag({
			isScrolling: true,
			clientX: e.clientX,
			scrollX: keyboard.current.scrollLeft
		});
	}
	function mouseUp(e) {
		setDrag({...drag, isScrolling: false});
	}
	function mouseMove(e) {
		const {clientX, scrollX} = drag;
		if (drag.isScrolling) {
			const scroll = scrollX + -1 * (e.clientX - clientX);
			keyboard.current.scrollLeft = scroll;
			setDrag({...drag, scrollX: scroll, clientX: e.clientX});
		}
	}

	return (
		<div
			className="mainKeyboardContainer"
			onMouseDown={(e) => mouseDown(e)}
			onMouseUp={(e) => mouseUp(e)}
			onMouseMove={(e) => mouseMove(e)}
			ref={keyboard}
		>
			<div className="keyboardContainer">
				{keyMap.map((ele, i) => (
					<PianoKey
						i={i}
						char={ele}
						key={i}
						keysPressed={keysPressed}
						drumsSelected={drumsSelected}
						instrumentSettings={instrumentSettings}
					/>
				))}
			</div>
		</div>
	);
}
