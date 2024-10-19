import React, { useState } from "react";
import {
	FaSave,
	FaRegEdit,
	FaUser,
	FaLock,
	FaBell,
	FaTrash,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Settings = () => {
	const [formData, setFormData] = useState({
		username: "john_doe",
		email: "johndoe@gmail.com",
		password: "",
		notifications: true,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setFormData((prev) => ({ ...prev, [name]: checked }));
	};

	const handleSave = () => {
		// Save changes logic here
		toast.success("Successfully saved!");
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
			className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 py-10"
		>
			<div className="max-w-xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
				<div className="bg-gray-800 text-white py-4 px-6 text-center font-bold text-2xl animate-fade-in">
					Settings
				</div>

				<div className="p-6 space-y-6">
					{/* Username Section */}
					<div className="flex items-center space-x-4">
						<FaUser className="text-2xl text-blue-600" />
						<div className="w-full">
							<label className="text-gray-600 font-semibold">Username</label>
							<input
								type="text"
								name="username"
								value={formData.username}
								onChange={handleChange}
								className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
							/>
						</div>
					</div>

					{/* Email Section */}
					<div className="flex items-center space-x-4">
						<FaRegEdit className="text-2xl text-yellow-500" />
						<div className="w-full">
							<label className="text-gray-600 font-semibold">Email</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 transition-all"
							/>
						</div>
					</div>

					{/* Password Section */}
					<div className="flex items-center space-x-4">
						<FaLock className="text-2xl text-red-500" />
						<div className="w-full">
							<label className="text-gray-600 font-semibold">
								New Password
							</label>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 transition-all"
							/>
						</div>
					</div>

					{/* Notifications Toggle */}
					<div className="flex items-center space-x-4">
						<FaBell className="text-2xl text-green-500" />
						<div className="w-full flex justify-between items-center">
							<span className="text-gray-600 font-semibold">Notifications</span>
							<input
								type="checkbox"
								name="notifications"
								checked={formData.notifications}
								onChange={handleToggle}
								className="h-6 w-6 text-green-500 border-gray-300 rounded focus:ring-2 focus:ring-green-500 transition-all"
							/>
						</div>
					</div>

					{/* Save and Delete Buttons */}
					<div className="flex justify-between items-center">
						<button
							onClick={handleSave}
							className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-all"
						>
							<FaSave className="mr-2" /> Save Changes
						</button>
						<button className="bg-transparent border hover:border-red-700 text-red-700 font-bold py-2 px-4 rounded-lg flex items-center transition-all">
							<FaTrash className="mr-2" /> Delete Account
						</button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Settings;
