import React, { useState } from "react";
import {
	FaSearch,
	FaHeart,
	FaRegHeart,
	FaCamera,
	FaComment,
} from "react-icons/fa";
import { motion } from "framer-motion";

// Dummy user data
const users = [
	{
		id: 1,
		firstName: "Alice",
		lastName: "Johnson",
		age: 25,
		gender: "Female",
		location: "New York",
		profilePic: "/images/photo1.jpg",
	},
	{
		id: 2,
		firstName: "Bob",
		lastName: "Smith",
		age: 30,
		gender: "Male",
		location: "San Francisco",
		profilePic: "/images/photo2.jpg",
	},
	{
		id: 3,
		firstName: "Charlie",
		lastName: "Brown",
		age: 28,
		gender: "Male",
		location: "Chicago",
		profilePic: "/images/photo3.jpg",
	},
	{
		id: 4,
		firstName: "Diana",
		lastName: "Prince",
		age: 22,
		gender: "Female",
		location: "Los Angeles",
		profilePic: "/images/photo4.jpg",
	},
];

const Search = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [ageRange, setAgeRange] = useState<[number, number]>([18, 50]);
	const [gender, setGender] = useState<string>("All");

	const [liked, setLiked] = useState(false);

	const toggleLike = () => {
		setLiked(!liked);
	};

	const filteredUsers = users.filter((user) => {
		const matchesSearch =
			user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesAge = user.age >= ageRange[0] && user.age <= ageRange[1];
		const matchesGender = gender === "All" || user.gender === gender;

		return matchesSearch && matchesAge && matchesGender;
	});

	return (
		<motion.div
			className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-700 text-white p-10"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
		>
			<h1 className="text-4xl font-bold text-center mb-10">
				Find Your Match 🔎
			</h1>
			<div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg text-gray-800">
				{/* Search Filters */}
				<div className="flex items-center justify-between space-x-4 mb-6">
					<div className="flex-grow">
						<label className="block text-lg font-semibold mb-2">Search</label>
						<div className="relative">
							<input
								type="text"
								placeholder="Search by name..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 transition-all"
							/>
							<FaSearch className="absolute top-3 right-3 text-gray-400" />
						</div>
					</div>

					<div className="flex-shrink-0">
						<label className="block text-lg font-semibold mb-2">Gender</label>
						<select
							value={gender}
							onChange={(e) => setGender(e.target.value)}
							className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 transition-all"
						>
							<option value="All">All</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</div>

					<div className="flex-shrink-0">
						<label className="block text-lg font-semibold mb-2">Age</label>
						<input
							type="range"
							min={18}
							max={50}
							value={ageRange[1]}
							onChange={(e) =>
								setAgeRange([ageRange[0], Number(e.target.value)])
							}
							className="w-32 focus:ring-2 focus:ring-purple-500"
						/>
						<p className="mt-1 text-sm text-gray-500">
							{ageRange[0]} - {ageRange[1]} years
						</p>
					</div>
				</div>

				{/* Filtered Users List */}
				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{filteredUsers.length > 0 ? (
						filteredUsers.map((user) => (
							<motion.div
								key={user.id}
								className="bg-slate-900 rounded-lg shadow-lg overflow-hidden transition-all"
								whileHover={{ scale: 1.05 }}
							>
								<div className="h-40">
									<img
										src={user.profilePic}
										alt="User"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="p-4">
									<div className="flex items-center gap-2">
										<img
											src={user.profilePic}
											alt="User Avatar"
											className="w-12 h-12 rounded-full object-cover"
										/>
										<h3 className="text-lg font-bold text-yellow-600">
											{`${user.firstName} ${user.lastName}`}
										</h3>
									</div>
									<p className="text-white mt-2">Age: {user.age}</p>
									<p className="text-white">Location: {user.location}</p>
								</div>

								{/* Buttons with icons */}
								<div className="flex justify-around border-t p-4">
									<button onClick={toggleLike}>
										{liked ? (
											<FaHeart className="text-red-500 text-2xl" />
										) : (
											<FaRegHeart className="text-white text-2xl hover:text-yellow-500 transition-all" />
										)}
									</button>
									<button>
										<FaComment className="text-white text-2xl hover:text-yellow-500 transition-all" />
									</button>
									<button>
										<FaCamera className="text-white text-2xl hover:text-yellow-500 transition-all" />
									</button>
								</div>
							</motion.div>
						))
					) : (
						<p className="col-span-full text-center text-gray-400">
							No users found
						</p>
					)}
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Search;
