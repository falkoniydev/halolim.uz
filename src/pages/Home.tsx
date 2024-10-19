import { motion } from "framer-motion";
import { FaShieldAlt, FaSearch, FaUsers } from "react-icons/fa";

// Animatsiya sozlamalari
const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Home = () => {
	return (
		<div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 min-h-screen text-white">
			{/* Hero Section */}
			<div
				style={{
					backgroundImage: "url('/profile-card-bg.avif')",
					backgroundSize: "cover",
					backgroundPosition: "center",
					height: "60vh",
					filter: "brightness(0.8)",
				}}
				className="h-screen flex flex-col justify-center items-center text-center px-4"
			>
				<motion.h1
					className="text-5xl font-bold mb-6 shadow-2xl border-spacing-20 border-transparent shadow-slate-900 bg-clip-border bg-black bg-opacity-15"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
				>
					Find Your Perfect Match ❤️
				</motion.h1>
				<motion.p
					className="text-lg mb-8"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 1 }}
				>
					Join us and start discovering meaningful connections today.
				</motion.p>
				<motion.button
					className="bg-white text-pink-500 px-6 py-3 rounded-full font-bold hover:bg-pink-600 hover:text-white transition-all"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					Join Now
				</motion.button>
			</div>

			{/* Key Features */}
			<motion.div
				className="py-20 text-center"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
			>
				<h2 className="text-4xl font-bold mb-12">Why Choose Us?</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
					{/* Safe & Secure */}
					<motion.div
						className="bg-white text-gray-900 p-8 rounded-lg shadow-lg"
						variants={fadeInUp}
					>
						<FaShieldAlt className="text-6xl text-pink-500 mx-auto mb-6" />
						<h3 className="text-2xl font-bold mb-4">Safe & Secure</h3>
						<p>
							We protect your privacy and ensure your safety on our platform.
						</p>
					</motion.div>

					{/* Smart Search */}
					<motion.div
						className="bg-white text-gray-900 p-8 rounded-lg shadow-lg"
						variants={fadeInUp}
					>
						<FaSearch className="text-6xl text-pink-500 mx-auto mb-6" />
						<h3 className="text-2xl font-bold mb-4">Smart Search</h3>
						<p>Find the perfect match with our advanced search filters.</p>
					</motion.div>

					{/* Thousands of Matches */}
					<motion.div
						className="bg-white text-gray-900 p-8 rounded-lg shadow-lg"
						variants={fadeInUp}
					>
						<FaUsers className="text-6xl text-pink-500 mx-auto mb-6" />
						<h3 className="text-2xl font-bold mb-4">Thousands of Matches</h3>
						<p>
							Join a community where thousands of meaningful connections happen.
						</p>
					</motion.div>
				</div>
			</motion.div>

			{/* Testimonials Carousel */}
			<div className="py-20 bg-gray-100 text-gray-900">
				<h2 className="text-4xl font-bold text-center mb-12">Happy Members</h2>
				<div className="flex justify-center space-x-4 px-4 ">
					<motion.div
						className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm"
						whileHover={{ scale: 1.05 }}
					>
						<p className="text-lg italic">
							"I found the love of my life here. Thank you!"
						</p>
						<h4 className="mt-4 font-bold">- Alice</h4>
					</motion.div>
					<motion.div
						className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm"
						whileHover={{ scale: 1.05 }}
					>
						<p className="text-lg italic">
							"This app changed my life forever. I'm so grateful!"
						</p>
						<h4 className="mt-4 font-bold">- Bob</h4>
					</motion.div>
					<motion.div
						className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm"
						whileHover={{ scale: 1.05 }}
					>
						<p className="text-lg italic">
							"A fantastic platform where I found meaningful connections."
						</p>
						<h4 className="mt-4 font-bold">- Charlie</h4>
					</motion.div>
				</div>
			</div>

			{/* Call to Action */}
			<motion.div
				className="text-center py-20 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className="text-4xl font-bold mb-6 text-white">
					Ready to Join Us?
				</h2>
				<p className="text-lg mb-8 text-white">
					Sign up now and start your journey to find your perfect match!
				</p>
				<button className="bg-white text-pink-500 px-6 py-3 rounded-full font-bold hover:bg-pink-600 hover:text-white transition-all">
					Sign Up Now
				</button>
			</motion.div>
		</div>
	);
};

export default Home;
