import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// import { refreshToken } from "../redux/Auth/authSlice"; // refreshToken action'ini import qiling

interface ProtectedRouteProps {
	children: React.ReactNode; // Children sifatida komponent
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	// const dispatch = useDispatch();
	// const navigate = useNavigate();
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	// useEffect(() => {
	// 	// Agar foydalanuvchi authentikatsiya qilinmagan bo'lsa, refresh token chaqirish
	// 	if (!isAuthenticated) {
	// 		dispatch(refreshToken() as any); // Tokenni yangilash
	// 	}
	// }, [isAuthenticated, dispatch]);

	// useEffect(() => {
	// 	if (!isAuthenticated) {
	// 		dispatch(refreshToken() as any)
	// 			.unwrap()
	// 			.catch(() => {
	// 				// Agar token yangilash muvaffaqiyatsiz bo'lsa, foydalanuvchini login sahifasiga yo'naltiring
	// 				navigate("/login");
	// 			});
	// 	}
	// }, [isAuthenticated, dispatch]);

	// Agar foydalanuvchi authentikatsiya qilingan bo'lsa, children ni qaytaramiz
	return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
