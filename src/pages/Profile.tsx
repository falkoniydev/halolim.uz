import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaEdit, FaCamera } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = () => {
	// const navigate = useNavigate();
	// Redux state'dan user ma'lumotlarini olish
	const { firstName, lastName } = useSelector(
		(state: RootState) => state.user.data
	);
	const { isAuthenticated, user } = useSelector(
		(state: RootState) => state.auth
	);

	// console.log(user);

	// const profilePic = useSelector((state: RootState) => state.user);
	const { data } = useSelector((state: RootState) => state.user);

	// console.log(data);

	return (
		<>
			{isAuthenticated && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					style={{
						backgroundImage: `url("./bg-hero3.avif")`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						backgroundPosition: "center",
						height: "50vh",
						display: "flex",
						justifyContent: "center",
					}}
					className="shadow-black min-h-[550px] bg-gradient-to-r from-purple-800 to-pink-600"
				>
					<div className=" bg-white bg-opacity-85 shadow-lg rounded-lg overflow-hidden animate-fade-in">
						<div className="flex">
							<div className="w-[400px]">
								<div
									className="bg-cover bg-center h-full"
									style={{
										backgroundImage: `url(${
											data?.profilePic
												? data?.profilePic
												: "/profile-card-bg.avif"
										})`,
										backgroundRepeat: "no-repeat",
										backgroundSize: "cover",
										width: "400px",
										height: "550px",
									}}
								>
									<div className="flex justify-end px-4 pt-4">
										<button className="text-white bg-black bg-opacity-60 hover:bg-opacity-90 p-2 rounded-full transition-all">
											<FaCamera />
										</button>
									</div>
								</div>
							</div>
							<div>
								<div className="text-center mt-10">
									<img
										className="h-32 w-32 rounded-full mx-auto border-4 border-white object-cover shadow-2xl"
										src={data?.profilePic || "/bg-hero1.jpg"}
										alt="Profile"
									/>
									<h2 className="text-2xl font-bold text-gray-800 mt-2">
										{firstName} {lastName}
									</h2>
									<p className="text-gray-600">{user.username}</p>
								</div>
								<div className="px-6 py-4">
									<h3 className="text-xl font-semibold text-gray-800">
										Profile Information
									</h3>
									<div className="mt-4">
										<p className="text-gray-700 font-semibold">
											Firstname:{" "}
											<span className="text-gray-500">
												{data?.data?.firstName}
											</span>
										</p>
										<p className="text-gray-700 font-semibold">
											Lastname:{" "}
											<span className="text-gray-500">
												{data?.data?.lastName}
											</span>
										</p>
										<p className="text-gray-700 font-semibold">
											Username:{" "}
											<span className="text-gray-500">{user.username}</span>
										</p>
										<p className="text-gray-700 font-semibold">
											Password: <span className="text-gray-500">********</span>
										</p>
										<p className="text-gray-700 font-semibold">
											Age:{" "}
											<span className="text-gray-500">{data?.data?.age}</span>
										</p>
										<p className="text-gray-700 font-semibold">
											Gender:{" "}
											<span className="text-gray-500">
												{data?.data?.gender}
											</span>
										</p>
										<p className="text-gray-700 font-semibold">
											Birthdate:{" "}
											<span className="text-gray-500">January 1, 1999</span>
										</p>
									</div>
								</div>
								<div className="flex justify-around py-4 border-t border-gray-300">
									<button className="text-purple-600 hover:text-purple-800 font-semibold transition-all">
										Edit Profile <FaEdit className="inline-block ml-2" />
									</button>
									{/* <button className="text-red-600 hover:text-red-800 font-semibold transition-all">
										Delete Account
									</button> */}
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</>
	);
};

export default Profile;
