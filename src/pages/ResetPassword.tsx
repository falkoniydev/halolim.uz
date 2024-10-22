import { useEffect, useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

const ResetPassword = () => {
	const navigate = useNavigate();
	const [token, setToken] = useState("");

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const tokenFromUrl = urlParams.get("token");
		if (tokenFromUrl) {
			setToken(tokenFromUrl);
		} else {
			toast.error("Invalid token. Please try again.");
			navigate("/login");
		}
	}, [navigate]);

	const onFinish = async (values: any) => {
		try {
			// Parolni yangilash uchun API chaqiruvini yuboring
			const response = await fetch("/api/reset_password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ token, newPassword: values.newPassword }),
			});

			if (response.ok) {
				toast.success("Your password has been reset successfully.");
				navigate("/login");
			} else {
				toast.error("Failed to reset password. Please try again.");
			}
		} catch (error) {
			toast.error("An error occurred. Please try again.");
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
			className="bg-slate-900 rounded-lg shadow-lg bg-opacity-80 mx-auto flex items-center justify-center w-[400px] py-10 mt-16"
		>
			<Form
				name="reset-password"
				style={{ maxWidth: 300, width: "100%" }}
				onFinish={onFinish}
			>
				<h2 className="text-center text-2xl mb-4 text-white">Reset Password</h2>

				<Form.Item
					name="newPassword"
					rules={[
						{ required: true, message: "Please input your new password!" },
					]}
				>
					<Input
						prefix={<LockOutlined />}
						type="password"
						placeholder="New Password"
					/>
				</Form.Item>

				<Form.Item
					name="confirmPassword"
					rules={[
						{ required: true, message: "Please confirm your new password!" },
					]}
				>
					<Input
						prefix={<LockOutlined />}
						type="password"
						placeholder="Confirm New Password"
					/>
				</Form.Item>

				<Form.Item>
					<Button
						block
						type="primary"
						htmlType="submit"
					>
						Reset Password
					</Button>
				</Form.Item>
			</Form>

			{/* Close Button */}
			<button
				className="absolute top-10 right-10 text-[36px] text-white"
				onClick={() => navigate("/")} // Close buttonni bosganda login sahifasiga o'tish
			>
				<AiOutlineClose />
			</button>
		</motion.div>
	);
};

export default ResetPassword;
