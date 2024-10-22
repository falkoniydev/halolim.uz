import React, { useRef } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import type { InputProps } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "axios";
import { LoadingBarRef } from "react-top-loading-bar";
import { AiOutlineClose } from "react-icons/ai";

const onChange: InputProps["onChange"] = (value) => {
	console.log("changed", value);
};

const { Option } = Select;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

const Register: React.FC = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const loaderRef = useRef<LoadingBarRef | null>(null);

	const onFinish = async (values: any) => {
		console.log(values);
		loaderRef.current?.continuousStart();

		try {
			const response = await axios.post(
				"https://13.50.240.41/datingapp/api/v1/auth/register",
				{
					email: values.email,
					password: values.password,
					confirmPassword: values.confirmPassword,
					registerUserInfoDTO: {
						firstName: values.firstName,
						lastName: values.lastName,
						gender: values.gender,
						lookingGender: values.lookingGender,
						age: values.age,
					},
				},
				{ headers: { "Content-Type": "application/json" } } // JSON formatida yuborish
			);

			if (response.status === 200) {
				toast.success(
					"You have successfully registered. Please check your email to verify your account."
				);
				navigate("/reminder-for-verification");
			} else {
				toast.error(response.data.messageDetail || "Registration failed.");
			}
		} catch (error: any) {
			console.log(error.response);
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
			style={{
				marginTop: "-50px",
			}}
			className="bg-slate-900 rounded-lg shadow-lg bg-opacity-80 mx-auto flex items-center justify-center w-[500px] px-10"
		>
			<Form
				{...formItemLayout}
				form={form}
				name="register"
				onFinish={onFinish}
				initialValues={{
					residence: ["zhejiang", "hangzhou", "xihu"],
					prefix: "86",
				}}
				style={{
					maxWidth: "700px",
					width: "100%",
					padding: "10px",
				}}
				scrollToFirstError
			>
				<h1 className="text-center text-[28px] mb-3 text-white">
					Registration
				</h1>
				<Form.Item
					name="email"
					label={
						<span
							style={{
								color: "white",
							}}
						>
							Email
						</span>
					}
					rules={[
						{
							type: "email",
							message: "The input is not valid E-mail!",
						},
						{
							required: true,
							message: "Please input your E-mail!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="password"
					label={<span style={{ color: "white" }}>Password</span>}
					tooltip="Password must have at least one uppercase letter, one lowercase letter, one digit and one special character"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
						{
							validator(_, value) {
								// Regex pattern for the password requirements
								const passwordRegex =
									/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
								if (!value || passwordRegex.test(value)) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error(
										"Password must have at least one uppercase letter, one lowercase letter, one digit and one special character"
									)
								);
							},
						},
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="confirmPassword"
					label={<span style={{ color: "white" }}>Confirm password</span>}
					tooltip="Letters, numbers and at least one special characters must be entered"
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please confirm your password!",
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error("The passwords do not match!"));
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="firstName"
					label={<span style={{ color: "white" }}>Firstname</span>}
					rules={[
						{
							required: true,
							message: "Please input your nickname!",
							whitespace: true,
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="lastName"
					label={<span style={{ color: "white" }}>Lastname</span>}
					rules={[
						{
							required: true,
							message: "Please input your nickname!",
							whitespace: true,
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="age"
					label={<span style={{ color: "white" }}>Age</span>}
					rules={[
						{
							required: true,
							validator(_, value) {
								if (!value || value < 16 || value > 150) {
									if (value > 150) {
										return Promise.reject(
											new Error("Please input less than 150 years old!")
										);
									} else if (value < 16) {
										return Promise.reject(
											new Error("Please input more than 16 years old!")
										);
									}
								}
								return Promise.resolve();
							},
						},
					]}
				>
					<Input
						type="number"
						placeholder="18 years old"
						// defaultValue={16} // Default qiymat 16
						min={16} // 16 dan past son kiritish mumkin emas
						max={150}
						onChange={onChange} // Agar onChange metodini qo'shmoqchi bo'lsangiz
					/>
				</Form.Item>

				<Form.Item
					name="gender"
					label={<span style={{ color: "white" }}>Gender</span>}
					rules={[{ required: true, message: "Please select gender!" }]}
					style={{ color: "red" }}
				>
					<Select placeholder="select your gender">
						<Option value="MALE">MALE</Option>
						<Option value="FEMALE">FEMALE</Option>
						<Option value="OTHER">OTHER</Option>
					</Select>
				</Form.Item>

				<Form.Item
					name="lookingGender"
					label={<span style={{ color: "white" }}>Gender you seek</span>}
					rules={[{ required: true, message: "Please select gender!" }]}
					style={{ color: "red" }}
				>
					<Select placeholder="select gender you look for">
						<Option value="MALE">MALE</Option>
						<Option value="FEMALE">FEMALE</Option>
						<Option value="OTHER">OTHER</Option>
					</Select>
				</Form.Item>

				<Form.Item
					name="agreement"
					valuePropName="checked"
					rules={[
						{
							validator: (_, value) =>
								value
									? Promise.resolve()
									: Promise.reject(new Error("Should accept agreement")),
						},
					]}
					{...tailFormItemLayout}
				>
					<Checkbox style={{ color: "white" }}>
						I have read the <a href="">agreement</a>
					</Checkbox>
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<Button
						type="primary"
						htmlType="submit"
					>
						Register
					</Button>
				</Form.Item>
				<Button
					className="mx-auto flex"
					type="link"
					onClick={() => navigate("/login")}
				>
					if you have already registered, go to Login
				</Button>
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

export default Register;
