import Footer from "../components/Footer";
import Header from "../components/Header";
import { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div
			className="min-h-screen overflow-hidden bg-cover bg-center bg-fixed"
			style={{
				backgroundImage: `url("./bg-hero3.avif")`,
				backgroundBlendMode: "multiply",
			}}
			role="main"
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
