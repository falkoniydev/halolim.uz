import React, { useRef } from "react";
import { motion } from "framer-motion";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

const ReminderForVerification: React.FC = () => {
	const loaderRef = useRef<LoadingBarRef | null>(null);

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
			<h2 className="text-3xl text-white text-center">
				Please check your email to verify your account <br />
				Verification link has been sent to your email address.
			</h2>
		</motion.div>
	);
};

export default ReminderForVerification;
