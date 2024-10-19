import { Link, useLocation } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
	const location = useLocation();

	// Hide Footer on login, register, and forgot-password pages
	const shouldHideHeaderFooter = [
		"/login",
		"/register",
		"/forgot-password",
	].includes(location.pathname);

	if (shouldHideHeaderFooter) {
		return null; // Don't render Footer
	}

	return (
		<footer className="bg-slate-800 text-white py-10">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center gap-8">
					{/* Logo and Branding */}
					<div className="flex items-center gap-2">
						<img
							src="/logo192.png"
							alt="Logo"
							className="w-[45px] h-[45px]"
						/>
						<Link
							to={"/"}
							className="text-[20px] font-black text-red-500"
						>
							Halolim.uz
						</Link>
					</div>

					{/* Footer Navigation Links */}
					<div className="flex flex-col md:flex-row items-center gap-5">
						<nav className="text-[16px] font-medium">
							<ul className="flex flex-col md:flex-row items-center gap-5">
								<li>
									<Link to={"/online"}>Online</Link>
								</li>
								<li>
									<Link to={"/matches"}>Matches</Link>
								</li>
								<li>
									<Link to={"/search"}>Search</Link>
								</li>
								<li>
									<Link to={"/message"}>Message</Link>
								</li>
								<li>
									<Link to={"/activity"}>Activity</Link>
								</li>
								<li>
									<Link to={"/terms-and-conditions"}>Terms & Conditions</Link>
								</li>
								<li>
									<Link to={"/privacy-policy"}>Privacy Policy</Link>
								</li>
							</ul>
						</nav>
					</div>

					{/* Social Media Icons */}
					<div className="flex items-center gap-4 text-[24px]">
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-pink-500 transition duration-300"
						>
							<FaInstagram />
						</a>
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-blue-600 transition duration-300"
						>
							<FaFacebook />
						</a>
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-blue-400 transition duration-300"
						>
							<FaTwitter />
						</a>
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-blue-700 transition duration-300"
						>
							<FaLinkedin />
						</a>
					</div>
				</div>

				{/* Footer Bottom Section */}
				<div className="mt-10 text-center text-[14px] text-gray-400">
					&copy; {new Date().getFullYear()} Halolim. All rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
