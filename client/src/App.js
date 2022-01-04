import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Chat from "./chat/Chat";
import Home from "./home/Home";
import {Provider} from "react-redux";
import generateStore from "./redux/store";

function App() {
	const store = generateStore();

	return (
		<Router>
			<Switch>
				<Route path="/chat">
					<Provider store={store}>
						<Chat />
					</Provider>
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
