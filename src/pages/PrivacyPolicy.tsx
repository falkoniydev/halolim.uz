import { motion } from "framer-motion";

const PrivacyPolicy = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			className="container mx-auto p-8 bg-white shadow-lg rounded-lg"
		>
			<h1 className="text-4xl font-bold mb-6 text-center text-green-600">
				Privacy Policy
			</h1>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 1 }}
				className="space-y-4 text-gray-700"
			>
				<p>
					This Privacy Policy outlines how we collect, use, and protect your
					information when you use our services. Your privacy is of utmost
					importance to us.
				</p>

				<h2 className="text-2xl font-bold mt-6">1. Information Collection</h2>
				<p>
					We collect personal information such as your name, email address, and
					payment details when you register for an account, make a purchase, or
					use our services.
				</p>

				<h2 className="text-2xl font-bold mt-6">2. Information Usage</h2>
				<p>
					The information we collect is used to personalize your experience,
					process transactions, improve customer service, and send periodic
					emails regarding updates or promotions.
				</p>

				<h2 className="text-2xl font-bold mt-6">3. Data Security</h2>
				<p>
					We implement various security measures to protect your personal
					information. However, we cannot guarantee absolute security due to
					potential cyber threats.
				</p>

				<h2 className="text-2xl font-bold mt-6">
					4. Changes to Privacy Policy
				</h2>
				<p>
					We reserve the right to update this Privacy Policy at any time. Your
					continued use of our services after changes are made will signify your
					acceptance of the updated policy.
				</p>
			</motion.div>
		</motion.div>
	);
};

export default PrivacyPolicy;
