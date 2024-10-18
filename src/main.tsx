import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
	<Router>
		<PrimeReactProvider>
			<Provider store={store}>
				<App />
				<ToastContainer />
			</Provider>
		</PrimeReactProvider>
	</Router>
);
