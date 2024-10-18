import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaHeart, FaRegHeart, FaComment, FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchUserData } from "../redux/User/userSlice";

const UserCards = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { data } = useSelector((state: RootState) => state.user);
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const [liked, setLiked] = useState(false);
	const [showPhotos, setShowPhotos] = useState(false);
	const [comments, setComments] = useState<string[]>([]);
	const [comment, setComment] = useState("");
	const [showCommentsModal, setShowCommentsModal] = useState(false);

	const photos = [
		"/images/photo1.jpg",
		"/images/photo2.jpg",
		"/images/photo3.jpg",
		"/images/photo4.jpg",
		"/images/photo5.jpg",
	];

	const toggleLike = () => {
		setLiked(!liked);
	};

	const handlePhotos = () => {
		setShowPhotos(true);
	};

	const closePhotos = () => {
		setShowPhotos(false);
	};

	const handleSubmitComment = () => {
		if (comment.trim()) {
			setComments([...comments, comment]);
			setComment("");
		}
	};

	const handleKeyPress = (e: any) => {
		if (e.key === "Enter") {
			handleSubmitComment();
		}
	};

	const toggleCommentsModal = () => {
		setShowCommentsModal(!showCommentsModal);
	};

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(fetchUserData()); // Redux orqali user ma'lumotlarini olish
		}
	}, [dispatch, isAuthenticated]);

	return (
		<div
			className="max-w-sm mx-auto bg-opacity-90 bg-slate-900 rounded-lg shadow-lg overflow-hidden"
			style={{ width: "250px", height: "440px" }}
		>
			{/* Cover image */}
			<div className="h-60">
				<img
					src="./couple.jpg"
					alt="Cover"
					className="w-full h-full object-cover"
				/>
				<div>{}</div>
			</div>

			{/* User section */}
			<div className=" p-4">
				<div className="flex items-center gap-2">
					<img
						src="/couple.jpg"
						alt="User"
						className="w-12 h-12 rounded-full object-cover"
					/>
					{isAuthenticated ? (
						<h3 className="text-lg font-bold text-yellow-600">
							{`${data?.data?.firstName} ${data?.data?.lastName}`}
						</h3>
					) : (
						<span className="text-white font-bold">Login to see username</span>
					)}
				</div>

				<div className=" mt-3">
					<p className="text-white">
						This is a short description about the user.
					</p>
				</div>
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
				<button onClick={toggleCommentsModal}>
					<FaComment className="text-white text-2xl hover:text-yellow-500 transition-all" />
				</button>
				<button onClick={handlePhotos}>
					<FaCamera className="text-white text-2xl hover:text-yellow-500 transition-all" />
				</button>
			</div>

			{/* Photos Modal */}
			{showPhotos && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
					onClick={closePhotos}
				>
					<div
						className="relative bg-white w-4/5 h-4/5 rounded-lg overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						<Swiper
							modules={[Navigation, Pagination]}
							spaceBetween={30}
							slidesPerView={1}
							navigation
							pagination={{ clickable: true }}
							className="h-full"
						>
							{photos.map((photo, index) => (
								<SwiperSlide key={index}>
									<img
										src={photo}
										alt={`Slide ${index + 1}`}
										className="w-full h-full object-cover"
									/>
								</SwiperSlide>
							))}
						</Swiper>
						<button
							className="absolute top-2 right-2 text-white text-2xl"
							onClick={closePhotos}
						>
							✖
						</button>
					</div>
				</div>
			)}

			{/* Comments Modal */}
			{showCommentsModal && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
					onClick={toggleCommentsModal}
				>
					<div
						className="bg-white rounded-lg p-4 w-4/5 max-w-lg overflow-y-auto"
						style={{ maxHeight: "70%" }}
						onClick={(e) => e.stopPropagation()}
					>
						<h4 className="text-lg font-semibold mb-4">Comments:</h4>
						<ul>
							{comments.map((com, index) => (
								<li
									key={index}
									className="border-b py-2"
								>
									{com}
								</li>
							))}
						</ul>
						<textarea
							className="w-full p-2 mt-4 border rounded-lg"
							placeholder="Write a comment..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
						<button
							onClick={handleSubmitComment}
							className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
						>
							Submit
						</button>
						<button
							onClick={toggleCommentsModal}
							className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserCards;
