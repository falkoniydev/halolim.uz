import { Link, useLocation } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Footer = () => {
	const location = useLocation();

	const { isAuthenticated } = useSelector((state: RootState) => state.auth);

	// Hide Footer on login, register, and forgot-password pages
	const shouldHideHeaderFooter = [
		"/login",
		"/register",
		"/forgot-password",
		"/reset_password",
		"/reminder-for-verification",
		"*",
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
									<Link
										to={isAuthenticated ? "/online" : "/login"}
										className={
											location.pathname === "/online" ? "text-red-500" : ""
										}
									>
										Online
									</Link>
								</li>
								<li>
									<Link
										to={isAuthenticated ? "/matches" : "/login"}
										className={
											location.pathname === "/matches" ? "text-red-500" : ""
										}
									>
										Matches
									</Link>
								</li>
								<li>
									<Link
										to={isAuthenticated ? "/search" : "/login"}
										className={
											location.pathname === "/search" ? "text-red-500" : ""
										}
									>
										Search
									</Link>
								</li>
								<li>
									<Link
										to={isAuthenticated ? "/message" : "/login"}
										className={
											location.pathname === "/message" ? "text-red-500" : ""
										}
									>
										Message
									</Link>
								</li>
								<li>
									<Link
										to={isAuthenticated ? "/activity" : "/login"}
										className={
											location.pathname === "/activity" ? "text-red-500" : ""
										}
									>
										Activity
									</Link>
								</li>
								<li>
									<Link
										to={isAuthenticated ? "/terms-and-conditions" : "/login"}
										className={
											location.pathname === "/terms-and-conditions"
												? "text-red-500"
												: ""
										}
									>
										Terms & Conditions
									</Link>
								</li>
								<li>
									<Link
										to={isAuthenticated ? "private-policy" : "/login"}
										className={
											location.pathname === "/privacy-policy"
												? "text-red-500"
												: ""
										}
									>
										Privacy Policy
									</Link>
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
							aria-label="Instagram"
						>
							<FaInstagram />
						</a>
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-blue-600 transition duration-300"
							aria-label="Facebook"
						>
							<FaFacebook />
						</a>
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-blue-400 transition duration-300"
							aria-label="Twitter"
						>
							<FaTwitter />
						</a>
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-blue-700 transition duration-300"
							aria-label="LinkedIn"
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
