import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";

import "primereact/resources/themes/saga-blue/theme.css"; // Tema
import "primereact/resources/primereact.min.css"; // Core CSS

//Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Activity from "./pages/Activity";
import Matches from "./pages/Matches";
import Message from "./pages/Message";
import Online from "./pages/Online";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";

const App = () => {
	return (
		<>
			<Layout>
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/profile"
						element={<Profile />}
					/>
					<Route
						path="/activity"
						element={<Activity />}
					/>
					<Route
						path="/matches"
						element={<Matches />}
					/>
					<Route
						path="/message"
						element={<Message />}
					/>
					<Route
						path="/online"
						element={<Online />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/register"
						element={<Register />}
					/>
					<Route
						path="/forgot-password"
						element={<ForgetPassword />}
					/>
					<Route
						path="/search"
						element={<Search />}
					/>
					<Route
						path="*"
						element={<NotFound />}
					/>
				</Routes>
			</Layout>
		</>
	);
};

export default App;
