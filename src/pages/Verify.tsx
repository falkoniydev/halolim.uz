import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar"; // LoadingBar import

const Verify: React.FC = () => {
	const navigate = useNavigate();
	const { token } = useParams<{ token: string }>(); // URL'dan tokenni oling
	const loaderRef = useRef<LoadingBarRef | null>(null); // Loader uchun ref

	useEffect(() => {
		const verifyEmail = async () => {
			loaderRef.current?.continuousStart(); // Loaderni boshlash
			try {
				const response = await axios.post(
					"https://13.50.240.41/datingapp/api/v1/auth/verify",
					{ token } // Tokenni serverga yuborish
				);

				if (response.status === 200) {
					toast.success("Email verified successfully! You can now log in.");
					navigate("/login"); // Successful verification, redirect to login
				} else {
					toast.error(response.data.message || "Verification failed.");
				}
			} catch (error: any) {
				toast.error(
					error.response?.data?.message ||
						"An error occurred. Please try again."
				);
			} finally {
				loaderRef.current?.complete(); // Loaderni to'xtatish
			}
		};

		if (token) {
			verifyEmail();
		} else {
			toast.error("Invalid token.");
		}
	}, [token, navigate]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
			className="bg-slate-900 rounded-lg shadow-lg bg-opacity-80 mx-auto flex items-center justify-center min-h-[400px] w-[900px] py-10 mt-16"
		>
			{/* Top-loader */}
			<LoadingBar
				color="#f11946"
				ref={loaderRef}
			/>
			<h2 className="text-3xl text-white">Verifying your email...</h2>
		</motion.div>
	);
};

export default Verify;
