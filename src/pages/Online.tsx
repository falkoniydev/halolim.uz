import { FaHeart, FaComment, FaCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const users = [
	{
		id: 1,
		firstName: "Alice",
		lastName: "Johnson",
		isOnline: true,
		profilePic: "/images/photo1.jpg",
	},
	{
		id: 2,
		firstName: "Bob",
		lastName: "Smith",
		isOnline: false,
		profilePic: "/images/photo2.jpg",
	},
	{
		id: 3,
		firstName: "Charlie",
		lastName: "Brown",
		isOnline: true,
		profilePic: "/images/photo3.jpg",
	},
	{
		id: 4,
		firstName: "Diana",
		lastName: "Prince",
		isOnline: false,
		profilePic: "/images/photo4.jpg",
	},
];

const Online = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
			className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-10"
		>
			<h1 className="text-4xl font-bold text-white text-center mb-10">
				Who's Online 🔥
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{users.map((user) => (
					<motion.div
						key={user.id}
						className="bg-slate-900 rounded-lg shadow-lg p-6 overflow-hidden relative"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: user.id * 0.2 }}
					>
						{/* Online/Offline Indicator */}
						<span className="absolute top-4 right-4">
							{user.isOnline ? (
								<FaCircle className="text-green-500 text-lg animate-pulse" />
							) : (
								<FaCircle className="text-gray-500 text-lg" />
							)}
						</span>

						{/* User Profile Picture */}
						<div className="flex justify-center mb-4">
							<img
								src={user.profilePic}
								alt="Profile"
								className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-white"
							/>
						</div>

						{/* User Information */}
						<h2 className="text-center text-xl font-bold text-white">
							{user.firstName} {user.lastName}
						</h2>
						<p className="text-center text-gray-400">
							{user.isOnline ? "Online" : "Last seen recently"}
						</p>

						{/* Interaction Buttons */}
						<div className="flex justify-around mt-6">
							<button>
								<FaHeart className="text-red-500 text-2xl hover:scale-125 transition-transform" />
							</button>
							<button>
								<FaComment className="text-blue-500 text-2xl hover:scale-125 transition-transform" />
							</button>
						</div>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};

export default Online;
