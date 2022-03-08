import {useSelector} from "react-redux";
import Chat from "./chat/Chat";
import Home from "./home/Home";

export default function Handler() {
	const audioCtx = useSelector((s) => s.audioCtx.audioCtx);
	return <>{audioCtx ? <Chat /> : <Home />}</>;
}
