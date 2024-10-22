import { Link, useLocation } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { Fragment, useState, useEffect, useRef } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { logout, loadUserFromSession } from "../redux/Auth/authSlice";
import { FaUserCircle } from "react-icons/fa";
import { RootState } from "../redux/store";
import { Dropdown, Space, MenuProps } from "antd";
import LoadingBar from "react-top-loading-bar"; // Top-loader import
import { Spin } from "antd"; // Spinner import

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const location = useLocation();
	const dispatch = useDispatch();
	const loaderRef = useRef(null); // Top-loader uchun ref

	// Redux'dan user va isAuthenticated holatini olish
	const { isAuthenticated, user, loading } = useSelector(
		(state: RootState) => state.auth
	);

	const { data } = useSelector((state: RootState) => state.user);

	// Sahifa yangilanganida token va userni sessionStorage'dan yuklash
	useEffect(() => {
		const token = sessionStorage.getItem("token");
		const username = sessionStorage.getItem("username");
		const profilePic = sessionStorage.getItem("profilePic");

		if (token && username) {
			dispatch(
				loadUserFromSession({
					username,
					profilePic,
				})
			);
		}

		// Loaderni boshlash - ma'lumot yuklanayotganini ko'rsatish
		if (loaderRef.current) {
			if (loading) {
				(loaderRef.current as any).continuousStart();
			} else {
				(loaderRef.current as any).complete();
			}
		}
	}, [dispatch, loading]);

	const handleLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("username");
		sessionStorage.removeItem("profilePic");
	};

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
		"/reset_password",
		"/reminder-for-verification",
		"*",
	].includes(location.pathname);

	if (shouldHideHeaderFooter) {
		return null; // Don't render Header
	}

	// Profile menu items
	const items: MenuProps["items"] = [
		{
			label: (
				<Link
					to={"/profile"}
					className="flex items-center gap-2"
				>
					<FaUserCircle className="w-6 h-6 text-black" />
					<span>
						{data?.data?.firstName}{" "}
						{data?.data?.lastName ? data?.data?.lastName : ""}
					</span>
				</Link>
			),
			key: "0",
		},
		{
			type: "divider",
		},
		{
			label: <Link to="/profile">My profile</Link>,
			key: "1",
		},
		{
			label: <Link to="/settings">Settings</Link>,
			key: "2",
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
		<header
			className={`Header fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
				isScrolled ? "bg-opacity-90 bg-slate-900" : "bg-opacity-80 bg-slate-900"
			}`}
		>
			{/* Top Loader */}
			<LoadingBar
				color="#f11946"
				ref={loaderRef}
			/>

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
						<span className="text-[20px] font-black text-red-500 p-1">
							Halolim.uz
						</span>
					</Link>

					{/* Desktop Navigation */}
					{isAuthenticated && (
						<nav className="hidden md:flex items-center gap-5 text-[18px] font-black">
							<ul
								className={`flex items-center gap-5 ${
									isScrolled ? "text-white" : "text-yellow-500"
								}`}
							>
								<li>
									<Link
										to="/online"
										className={
											location.pathname === "/online" ? "text-red-500" : ""
										}
									>
										Online
									</Link>
								</li>
								<li>
									<Link
										to="/matches"
										className={
											location.pathname === "/matches" ? "text-red-500" : ""
										}
									>
										Matches
									</Link>
								</li>
								<li>
									<Link
										to="/search"
										className={
											location.pathname === "/search" ? "text-red-500" : ""
										}
									>
										Search
									</Link>
								</li>
								<li>
									<Link
										to="/message"
										className={
											location.pathname === "/message" ? "text-red-500" : ""
										}
									>
										Message
									</Link>
								</li>
								<li>
									<Link
										to="/activity"
										className={
											location.pathname === "/activity" ? "text-red-500" : ""
										}
									>
										Activity
									</Link>
								</li>
							</ul>
						</nav>
					)}

					{/* Profile or Login/Register on Desktop */}
					{isAuthenticated ? (
						<Dropdown menu={{ items }}>
							<a
								onClick={(e) => e.preventDefault()}
								className="cursor-pointer"
							>
								<Space>
									<div className="hidden md:flex items-center gap-2">
										{loading ? (
											<Spin size="large" />
										) : user.profilePic ? (
											<img
												src={user?.profilePic}
												alt="Profile"
												className="w-[45px] h-[45px] rounded-full"
											/>
										) : (
											<FaUserCircle
												className={`text-[38px] ${
													isScrolled ? "text-white" : "text-yellow-500"
												}`}
											/>
										)}
										<span
											className={`text-[18px] font-bold ${
												isScrolled ? "text-white" : "text-yellow-500"
											}`}
										>
											{loading ? "Loading..." : data?.data?.firstName}
										</span>
									</div>
								</Space>
							</a>
						</Dropdown>
					) : (
						<div className="hidden md:flex gap-6">
							<Link
								to="/login"
								className="text-[18px] text-white font-bold hover:text-red-500 transition-all"
							>
								Login
							</Link>
							<Link
								to="/register"
								className="text-[18px] text-white font-bold hover:text-red-500 transition-all"
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
											{loading ? (
												<Spin size="large" />
											) : user.profilePic ? (
												<img
													src={user?.profilePic}
													alt="Profile"
													className="w-[45px] h-[45px] rounded-full"
												/>
											) : (
												<FaUserCircle className="text-[38px]" />
											)}
											<span
												className={`text-[18px] font-bold ${
													isScrolled ? "text-white" : ""
												}`}
											>
												{loading
													? "Loading..."
													: data?.data?.firstName || "firstName"}
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
							<li>
								<Link
									to="/online"
									onClick={() => setIsOpen(false)}
									className={
										location.pathname === "/online" ? "text-red-500" : ""
									}
								>
									Online
								</Link>
							</li>
							<li>
								<Link
									to="/matches"
									onClick={() => setIsOpen(false)}
									className={
										location.pathname === "/matches" ? "text-red-500" : ""
									}
								>
									Matches
								</Link>
							</li>
							<li>
								<Link
									to="/search"
									onClick={() => setIsOpen(false)}
									className={
										location.pathname === "/search" ? "text-red-500" : ""
									}
								>
									Search
								</Link>
							</li>
							<li>
								<Link
									to="/message"
									onClick={() => setIsOpen(false)}
									className={
										location.pathname === "/message" ? "text-red-500" : ""
									}
								>
									Message
								</Link>
							</li>
							<li>
								<Link
									to="/activity"
									onClick={() => setIsOpen(false)}
									className={
										location.pathname === "/activity" ? "text-red-500" : ""
									}
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
		</header>
	);
};

export default Header;
