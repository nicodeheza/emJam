//import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Provider} from "react-redux";
import generateStore from "./redux/store";
import Handler from "./Handler";

function App() {
	const store = generateStore();

	return (
		<Provider store={store}>
			<Handler />
		</Provider>
	);
}

export default App;
