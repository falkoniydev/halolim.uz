import { Link } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa";

const NotFound = () => {
	return (
		<div className="min-h-screen bg-pink-50 flex flex-col justify-center items-center text-center px-4">
			{/* Broken Heart Icon */}
			<FaHeartBroken className="text-pink-500 text-[120px] animate-pulse" />

			{/* Error Message */}
			<h1 className="text-[40px] md:text-[60px] font-black text-pink-600 mt-6">
				Oh no! This page is lonely!
			</h1>
			<p className="text-[18px] md:text-[24px] text-gray-600 mt-4">
				Looks like the page you're looking for is still searching for a match...
			</p>

			{/* CTA to go back home */}
			<Link
				to="/"
				className="mt-10 inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
			>
				Go back to find love
			</Link>

			{/* Additional Fun Message */}
			<p className="text-[16px] text-gray-500 mt-6">
				Maybe try searching for love instead of broken links?
			</p>
		</div>
	);
};

export default NotFound;
