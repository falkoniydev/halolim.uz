import { Link, useLocation } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux"; // Redux hooks
import { logout } from "../redux/authSlice"; // Redux logout action
import { RootState } from "../redux/store";
import { Dropdown, Space, type MenuProps } from "antd";
// import { FaUserCircle } from "react-icons/fa";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const location = useLocation();
	const dispatch = useDispatch();

	// Redux state for authentication and user info
	const { isAuthenticated, user } = useSelector(
		(state: RootState) => state.auth
	);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	// Handle scroll event
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		// Cleanup on unmount
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Check if current path is login, register, or forgot-password
	const shouldHideHeaderFooter = [
		"/login",
		"/register",
		"/forgot-password",
	].includes(location.pathname);

	if (shouldHideHeaderFooter) {
		return null; // Don't render Header
	}

	// Handle logout
	const handleLogout = () => {
		dispatch(logout()); // Dispatch the logout action
		localStorage.removeItem("token"); // Clear token from local storage
	};

	// Profile menu items
	const items: MenuProps["items"] = [
		{
			label: <Link to="/profile">My profile</Link>,
			key: "0",
		},
		{
			label: <Link to="/">Settings</Link>,
			key: "1",
		},
		{
			type: "divider",
		},
		{
			label: <span onClick={handleLogout}>Log out</span>,
			key: "3",
		},
	];

	return (
		<div
			className={`Header fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
				isScrolled ? "bg-opacity-90 bg-slate-900" : "bg-opacity-40 bg-slate-400"
			}`}
		>
			<div className="container mx-auto p-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link
						to="/"
						className="flex items-center"
					>
						<img
							src="/logo192.png"
							alt="Logo"
							className="w-[45px] h-[45px]"
						/>
						<span className="text-[20px] font-black text-yellow-900 p-1">
							Halolim
						</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-5 text-[18px] font-black">
						<ul
							className={`flex items-center gap-5 ${
								isScrolled ? "text-white" : ""
							}`}
						>
							<li>
								<Link to="/online">Online</Link>
							</li>
							<li>
								<Link to="/matches">Matches</Link>
							</li>
							<li>
								<Link to="/search">Search</Link>
							</li>
							<li>
								<Link to="/message">Message</Link>
							</li>
							<li>
								<Link to="/activity">Activity</Link>
							</li>
						</ul>
					</nav>

					{/* Profile or Login/Register on Desktop */}
					{isAuthenticated ? (
						<Dropdown menu={{ items }}>
							<a
								onClick={(e) => e.preventDefault()}
								className="cursor-pointer"
							>
								<Space>
									<div className="hidden md:flex items-center gap-2">
										<img
											src={user.profilePic || "/couple.jpg"}
											alt="Profile"
											className="w-[45px] h-[45px] rounded-full"
										/>
										{/* <FaUserCircle className="text-[42px]" /> */}
										<span
											className={`text-[18px] font-bold ${
												isScrolled ? "text-white" : ""
											}`}
										>
											{user.username}
										</span>
									</div>
								</Space>
							</a>
						</Dropdown>
					) : (
						<div className="hidden md:flex gap-2">
							<Link
								to="/login"
								className="text-[18px] font-bold"
							>
								Login
							</Link>
							<Link
								to="/register"
								className="text-[18px] font-bold"
							>
								Register
							</Link>
						</div>
					)}

					{/* Burger Menu Icon */}
					<div className="md:hidden">
						<button
							onClick={toggleMenu}
							className="text-gray-700"
						>
							{isOpen ? (
								<XMarkIcon className="w-8 h-8" />
							) : (
								<Bars3Icon className="w-8 h-8" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Drawer */}
			<Transition
				show={isOpen}
				as={Fragment}
				enter="transition ease-out duration-300"
				enterFrom="transform -translate-x-full"
				enterTo="transform translate-x-0"
				leave="transition ease-in duration-200"
				leaveFrom="transform translate-x-0"
				leaveTo="transform -translate-x-full"
			>
				<div className="fixed inset-y-0 left-0 w-64 bg-orange-300 bg-opacity-90 shadow-lg z-50">
					<div className="p-5">
						{/* Profile in Burger Menu */}
						{isAuthenticated ? (
							<Dropdown menu={{ items }}>
								<a
									onClick={(e) => e.preventDefault()}
									className="cursor-pointer"
								>
									<Space>
										<div className="hidden md:flex items-center gap-2">
											<img
												src={user.profilePic || "/couple.jpg"}
												alt="Profile"
												className="w-[45px] h-[45px] rounded-full"
											/>
											<span
												className={`text-[18px] font-bold ${
													isScrolled ? "text-white" : ""
												}`}
											>
												{user.username}
											</span>
										</div>
									</Space>
								</a>
							</Dropdown>
						) : (
							<div className="flex flex-col gap-2 my-5">
								<Link
									to="/login"
									onClick={() => setIsOpen(false)}
									className="text-[18px] font-bold"
								>
									Login
								</Link>
								<Link
									to="/register"
									onClick={() => setIsOpen(false)}
									className="text-[18px] font-bold"
								>
									Register
								</Link>
							</div>
						)}

						<ul className="flex flex-col gap-4 text-[18px] font-black">
							<li className="flex items-center gap-2">
								<img
									src={user.profilePic || "/couple.jpg"}
									alt="Profile"
									className="w-[45px] h-[45px] rounded-full"
								/>
								<span
									className={`text-[18px] font-bold ${
										isScrolled ? "text-white" : ""
									}`}
								>
									{user.username || "Username"}
								</span>
							</li>
							<li>
								<Link
									to="/online"
									onClick={() => setIsOpen(false)}
								>
									Online
								</Link>
							</li>
							<li>
								<Link
									to="/matches"
									onClick={() => setIsOpen(false)}
								>
									Matches
								</Link>
							</li>
							<li>
								<Link
									to="/search"
									onClick={() => setIsOpen(false)}
								>
									Search
								</Link>
							</li>
							<li>
								<Link
									to="/message"
									onClick={() => setIsOpen(false)}
								>
									Message
								</Link>
							</li>
							<li>
								<Link
									to="/activity"
									onClick={() => setIsOpen(false)}
								>
									Activity
								</Link>
							</li>
							<li>
								<button
									onClick={handleLogout}
									className="text-[18px] font-bold"
								>
									Log out
								</button>
							</li>
						</ul>
					</div>
				</div>
			</Transition>
		</div>
	);
};

export default Header;
