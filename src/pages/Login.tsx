import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Axios import qilindi
import { toast } from "react-toastify";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const onFinish = async (values: any) => {
		console.log("Received values of form: ", values);
		setLoading(true);
		setError(""); // Xato xabarni o'chirish

		try {
			// API ga POST so'rovni axios bilan jo'natish
			const response = await axios.post(
				"http://13.50.240.41:8080/datingapp/api/v1/auth/authenticate",
				{
					username: values.username,
					password: values.password,
				}
			);

			console.log(response);

			if (response.status === 200) {
				const data = response.data;
				console.log("Server Response:", data);

				// Tokenni localStorage ga saqlash
				localStorage.setItem("token", data.data.token);
				localStorage.setItem("username", data.data.username);

				// Home sahifasiga o'tkazish
				navigate("/");
			}
		} catch (error: any) {
			if (error.response && error.response.status === 403) {
				setError(
					"Forbidden: You do not have permission to access this resource."
				);
			} else {
				setError("Invalid credentials. Please try again.");
			}
		} finally {
			setLoading(false); // Yuklanishni to'xtatish
			toast.success("Successfully logged in!")
		}
	};

	return (
		<div className="bg-slate-900 rounded-lg shadow-lg bg-opacity-80 mx-auto flex items-center justify-center w-[400px] py-10 mt-16">
			<Form
				name="login"
				initialValues={{ remember: true }}
				style={{ maxWidth: 300, width:"100%" }}
				onFinish={onFinish}
			>
				<h2 className="text-center text-2xl mb-4 text-white">Login</h2>
				{error && <p className="text-red-500 text-center">{error}</p>}

				<Form.Item
					name="username"
					rules={[{ required: true, message: "Please input your Username!" }]}
				>
					<Input
						prefix={<UserOutlined />}
						placeholder="Username"
					/>
				</Form.Item>

				<Form.Item
					name="password"
					rules={[{ required: true, message: "Please input your Password!" }]}
				>
					<Input
						prefix={<LockOutlined />}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>

				<Form.Item>
					<Flex
						justify="space-between"
						align="center"
					>
						<Form.Item
							name="remember"
							valuePropName="checked"
							noStyle
						>
							<Checkbox className="text-white">Remember me</Checkbox>
						</Form.Item>
						<a href="/forgot-password" className="text-white">Forgot password?</a>
					</Flex>
				</Form.Item>

				<Form.Item>
					<Button
						block
						type="primary"
						htmlType="submit"
						loading={loading}
					>
						Log in
					</Button>
					<div className="text-center mt-2 text-white">
						or <a href="/register">Register now!</a>
					</div>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
