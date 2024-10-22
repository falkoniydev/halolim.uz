import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { toast } from "react-toastify";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const ForgotPassword = () => {
	const navigate = useNavigate();
	const loaderRef = useRef<LoadingBarRef | null>(null);

	const onFinish = async (values: { email: string }) => {
		console.log("Entered Email:", values.email); // Kiritilgan emailni konsolga chiqarish
		loaderRef.current?.continuousStart();

		try {
			const response = await axios.post(
				`https://13.50.240.41/datingapp/api/v1/auth/forgot-password?email=${values.email}`
				// { email: values.email },
				// {
				// 	body: JSON.stringify({ email: values.email }), // JSON formatida yuborish
				// },
				// {
				// 	headers: { "Content-Type": "application/json" },
				// } // JSON formatida yuborish
			);

			if (response.status === 200) {
				toast.success(
					response.data.messageDetail ||
						"Email sent successfully! Please check your inbox."
				);
				navigate("/login");
			} else {
				toast.error(response.data.messageDetail || "Failed to send email.");
			}
		} catch (error: any) {
			console.error("Error details:", error.response);
			toast.error(
				error.response?.data?.messageDetail ||
					"An error occurred. Please try again."
			);
		} finally {
			loaderRef.current?.complete();
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
			className="bg-slate-900 rounded-lg shadow-lg bg-opacity-80 mx-auto flex items-center justify-center w-[400px] py-10 mt-16"
		>
			<LoadingBar
				color="#f11946"
				ref={loaderRef}
			/>

			<Form
				name="forget-password"
				style={{ maxWidth: 300, width: "100%" }}
				onFinish={onFinish}
			>
				<h2 className="text-center text-2xl mb-4 text-white">
					Forget Password
				</h2>

				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: "Please input your Email!",
						},
						{
							type: "email",
							message: "The input is not a valid E-mail!",
						},
					]}
				>
					<Input
						prefix={<MailOutlined />}
						placeholder="email"
					/>
				</Form.Item>

				<Form.Item>
					<Checkbox className="text-white">Remember me</Checkbox>
					<a
						href="/login"
						className="text-white float-right"
					>
						Back to Login
					</a>
				</Form.Item>

				<Form.Item>
					<Button
						block
						type="primary"
						htmlType="submit"
					>
						Send Reset Link
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

export default ForgotPassword;
