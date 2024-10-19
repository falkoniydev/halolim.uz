import { FaHeart, FaComment, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import UserCards from "../components/UserCards";

const matchedUsers = [
	{
		id: 1,
		firstName: "Lily",
		lastName: "Evans",
		profilePic: "/images/photo1.jpg",
		isMatched: true,
	},
	{
		id: 2,
		firstName: "James",
		lastName: "Potter",
		profilePic: "/images/photo2.jpg",
		isMatched: true,
	},
	{
		id: 3,
		firstName: "Hermione",
		lastName: "Granger",
		profilePic: "/images/photo3.jpg",
		isMatched: true,
	},
	{
		id: 4,
		firstName: "Harry",
		lastName: "Potter",
		profilePic: "/images/photo4.jpg",
		isMatched: true,
	},
];

const Matches = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
			className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-10"
		>
			<h1 className="text-4xl font-bold text-white text-center mb-10">
				Your Matches 💕
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{matchedUsers.map((user) => (
					<motion.div
						key={user.id}
						className="bg-slate-900 rounded-lg shadow-lg p-6 overflow-hidden relative"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: user.id * 0.2 }}
					>
						{/* Match Icon */}
						<motion.div
							className="absolute top-4 left-4 bg-pink-500 text-white p-2 rounded-full"
							initial={{ scale: 0 }}
							animate={{ scale: 1.1 }}
							transition={{ type: "spring", stiffness: 100 }}
						>
							<FaHeart />
						</motion.div>

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
						<p className="text-center text-gray-400">It's a match!</p>

						{/* Interaction Buttons */}
						<div className="flex justify-around mt-6">
							<button>
								<FaHeart className="text-red-500 text-2xl hover:scale-125 transition-transform" />
							</button>
							<button>
								<FaComment className="text-blue-500 text-2xl hover:scale-125 transition-transform" />
							</button>
							<button>
								<FaTimes className="text-gray-500 text-2xl hover:text-red-500 hover:scale-125 transition-transform" />
							</button>
						</div>

						<UserCards />
						<UserCards />
						<UserCards />
						<UserCards />
						<UserCards />
					</motion.div>
				))}
			</div>
			<div className="cards flex items-center flex-wrap gap-5 mt-5"></div>
		</motion.div>
	);
};

export default Matches;
