import StartIcon from "../svg/StartIcon";
import "./home.css";
import {useDispatch} from "react-redux";
import {createAudioContext} from "../redux/actions/audioContex";

export default function Home() {
	const dispatch = useDispatch();

	function click() {
		dispatch(createAudioContext());
		//setStart(true);
	}
	return (
		<div className="HomeMainContainer">
			<header className="homeHeader">
				<img src="/img/logo.svg" alt="e.m. jam"></img>
				<h2>Real Time Musical Chat</h2>
			</header>
			<main className="homeMain">
				<ul>
					<li>Drums and multi wave synthesizer</li>
					<li>Five users per room</li>
					<li>
						You can play with the interactive piano of the app or with your keyboard
					</li>
					<li>Enjoy with the interactive visuals</li>
				</ul>
				<button
					onClick={() => click()}
					onTouchEnd={() => click()}
					onTouchStart={() => click()}
				>
					<div className="startContainer">
						<StartIcon classN={"startIcon"} />
					</div>
					<span>START</span>
				</button>
				<p className="homeMessage">
					Please put your device in landscape position for a better experience
				</p>
			</main>
		</div>
	);
}
