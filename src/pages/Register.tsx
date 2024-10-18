import React from "react";
// import type { CascaderProps } from "antd";
import {
	// AutoComplete,
	Button,
	// Cascader,
	Checkbox,
	// Col,
	Form,
	Input,
	InputNumber,
	// Row,
	Select,
} from "antd";
import type { InputNumberProps } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const onChange: InputNumberProps["onChange"] = (value) => {
	console.log("changed", value);
};

const { Option } = Select;

// interface DataNodeType {
// 	value: string;
// 	label: string;
// 	children?: DataNodeType[];
// }

// const residences: CascaderProps<DataNodeType>["options"] = [
// 	{
// 		value: "zhejiang",
// 		label: "Zhejiang",
// 		children: [
// 			{
// 				value: "hangzhou",
// 				label: "Hangzhou",
// 				children: [
// 					{
// 						value: "xihu",
// 						label: "West Lake",
// 					},
// 				],
// 			},
// 		],
// 	},
// 	{
// 		value: "jiangsu",
// 		label: "Jiangsu",
// 		children: [
// 			{
// 				value: "nanjing",
// 				label: "Nanjing",
// 				children: [
// 					{
// 						value: "zhonghuamen",
// 						label: "Zhong Hua Men",
// 					},
// 				],
// 			},
// 		],
// 	},
// ];

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

	const onFinish = (values: any) => {
		console.log("Received values of form: ", values);
		navigate("/login");
		form.resetFields();
		toast.success("Congratulations, you have successfully registered!");
	};

	return (
		<div className="bg-slate-900 rounded-lg shadow-lg bg-opacity-80 mx-auto flex items-center justify-center w-[500px] px-10 ">
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
					label={<span style={{ color: "white" }}>Email</span>}
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
					name="confirm"
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
					name="firstname"
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
					name="lastname"
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
								if (!value) {
									return Promise.reject(new Error("Please input your age!"));
								}
								return Promise.resolve();
							},
						},
					]}
				>
					<InputNumber
						min={16}
						max={100}
						placeholder="18 years old"
						onChange={onChange}
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
		</div>
	);
};

export default Register;
