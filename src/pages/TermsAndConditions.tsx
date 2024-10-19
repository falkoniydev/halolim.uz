import { motion } from "framer-motion";

const TermsAndConditions = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			className="container mx-auto p-8 bg-white shadow-lg rounded-lg"
		>
			<h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
				Terms & Conditions
			</h1>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 1 }}
				className="space-y-4 text-gray-700"
			>
				<p>
					Welcome to our application. By accessing or using our service, you
					agree to the following terms and conditions. Please read these terms
					carefully before using the service.
				</p>

				<h2 className="text-2xl font-bold mt-6">1. General Conditions</h2>
				<p>
					By agreeing to these Terms, you represent that you are at least the
					age of majority in your state or province of residence. You may not
					use our products for any illegal or unauthorized purpose.
				</p>

				<h2 className="text-2xl font-bold mt-6">2. Modifications to Service</h2>
				<p>
					We reserve the right to modify or terminate the service for any
					reason, without notice at any time. We also reserve the right to
					refuse service to anyone for any reason at any time.
				</p>

				<h2 className="text-2xl font-bold mt-6">3. Limitation of Liability</h2>
				<p>
					In no case shall we, our directors, employees, or service providers be
					liable for any direct, indirect, incidental, punitive, or
					consequential damages arising from your use of any of the service or
					products.
				</p>

				<h2 className="text-2xl font-bold mt-6">
					4. Changes to Terms & Conditions
				</h2>
				<p>
					We reserve the right to update or modify these Terms at any time,
					without prior notice. Your continued use of the service constitutes
					your agreement to these updated Terms.
				</p>
			</motion.div>
		</motion.div>
	);
};

export default TermsAndConditions;
