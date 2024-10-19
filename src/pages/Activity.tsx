import { FaHeart, FaComment, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const activities = [
	{
		id: 1,
		type: "like",
		user: "Alice Johnson",
		time: "2 hours ago",
		message: "liked your photo",
	},
	{
		id: 2,
		type: "comment",
		user: "Bob Smith",
		time: "1 day ago",
		message: "commented on your post",
	},
	{
		id: 3,
		type: "friend-request",
		user: "Charlie Brown",
		time: "3 days ago",
		message: "sent you a friend request",
	},
	{
		id: 4,
		type: "like",
		user: "Diana Prince",
		time: "5 days ago",
		message: "liked your profile picture",
	},
];

const activityIcon = (type: string) => {
	switch (type) {
		case "like":
			return <FaHeart className="text-red-500 text-2xl" />;
		case "comment":
			return <FaComment className="text-blue-500 text-2xl" />;
		case "friend-request":
			return <FaUserPlus className="text-green-500 text-2xl" />;
		default:
			return null;
	}
};

const Activity = () => {
	return (
		<motion.div
			className="min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-10"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
		>
			<h1 className="text-4xl font-bold text-white text-center mb-10">
				Recent Activities 🔥
			</h1>
			<div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
				{/* Activity List */}
				<motion.div
					className="space-y-6"
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.6, staggerChildren: 0.2 }}
				>
					{activities.map((activity) => (
						<motion.div
							key={activity.id}
							className="flex items-center space-x-4 bg-slate-900 text-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
							whileHover={{ scale: 1.05 }}
						>
							<div className="flex-shrink-0">{activityIcon(activity.type)}</div>
							<div className="flex-grow">
								<h3 className="text-xl font-semibold">{activity.user}</h3>
								<p className="text-gray-400">{activity.message}</p>
								<p className="text-sm text-gray-400">{activity.time}</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Activity;
