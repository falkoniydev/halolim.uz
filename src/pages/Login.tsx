import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/Auth/authSlice";
import { AppDispatch, RootState } from "../redux/store";

const Login = () => {
	const navigate = useNavigate();
	const { loading, error, isAuthenticated } = useSelector(
		(state: RootState) => state.auth
	);
	const dispatch = useDispatch<AppDispatch>();; // Redux dispatch

	const onFinish = (values: any) => {
		dispatch(loginUser(values)); // Redux orqali API so'rovini chaqirish

		if (isAuthenticated) {
			navigate("/"); // Agar foydalanuvchi muvaffaqiyatli login qilgan bo'lsa, home sahifasiga o'tkazish
		}
	};

	return (
		<div className="bg-slate-900 rounded-lg shadow-lg bg-opacity-80 mx-auto flex items-center justify-center w-[400px] py-10 mt-16">
			<Form
				name="login"
				initialValues={{ remember: true }}
				style={{ maxWidth: 300, width: "100%" }}
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
						<a
							href="/forgot-password"
							className="text-white"
						>
							Forgot password?
						</a>
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
