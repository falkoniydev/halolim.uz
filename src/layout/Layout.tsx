import Footer from "../components/Footer";
import Header from "../components/Header";
import { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div
			style={{
				backgroundImage: `url("./bg-hero3.avif")`,
				backgroundRepeat: "no-repeat",
				backgroundBlendMode: "multiply",
				backgroundAttachment: "fixed",
				backgroundClip: "border-box",
				overflow: "hidden",
				backgroundSize: "cover",
				backgroundPosition: "center",
				minHeight: "100vh",
			}}
		>
			<Header />
			<main
				className="pt-[85px]"
				id="bg-hero"
			>
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
