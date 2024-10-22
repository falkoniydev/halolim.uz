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
import Settings from "./pages/Settings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Verify from "./pages/Verify";
import ProtectedRoute from "./components/ProtectedRoute";
import ReminderForVerification from "./pages/ReminderForVer";

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
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/activity"
						element={
							<ProtectedRoute>
								<Activity />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/matches"
						element={
							<ProtectedRoute>
								<Matches />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/message"
						element={
							<ProtectedRoute>
								<Message />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/online"
						element={
							<ProtectedRoute>
								<Online />
							</ProtectedRoute>
						}
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
						path="/verify/:token"
						element={<Verify />}
					/>
					<Route
						path="/reminder-for-verification"
						element={<ReminderForVerification />}
					/>
					<Route
						path="/forgot-password"
						element={<ForgotPassword />}
					/>
					<Route
						path="/reset_password/:token"
						element={<ResetPassword />}
					/>
					<Route
						path="/search"
						element={
							<ProtectedRoute>
								<Search />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/settings"
						element={
							<ProtectedRoute>
								<Settings />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/privacy-policy"
						element={
							<ProtectedRoute>
								<PrivacyPolicy />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/terms-and-conditions"
						element={
							<ProtectedRoute>
								<TermsAndConditions />
							</ProtectedRoute>
						}
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
