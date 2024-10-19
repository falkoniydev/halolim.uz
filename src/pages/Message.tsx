import { useState } from "react";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import { motion } from "framer-motion";

// Fake users list for sidebar
const users = [
	{
		id: 1,
		name: "Alice",
		lastMessage: "How are you?",
		profilePic: "/bg-hero1.jpg",
	},
	{
		id: 2,
		name: "Bob",
		lastMessage: "Let's meet tomorrow!",
		profilePic: "/bg-hero2.png",
	},
	{
		id: 3,
		name: "Charlie",
		lastMessage: "Check out this cool thing.",
		profilePic: "/bg-hero3.avif",
	},
];

const Message = () => {
	const [selectedUser, setSelectedUser] = useState<number | null>(null);
	const [messageInput, setMessageInput] = useState("");
	const [chatHistory, setChatHistory] = useState<{ [key: number]: string[] }>({
		1: ["Hello Alice!", "How's it going?"],
		2: ["Hey Bob!", "Let's meet tomorrow!"],
		3: ["Hi Charlie!"],
	});

	// Handle message sending
	const handleSendMessage = () => {
		if (messageInput && selectedUser) {
			setChatHistory((prev) => ({
				...prev,
				[selectedUser]: [...(prev[selectedUser] || []), messageInput],
			}));
			setMessageInput("");
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
			className="flex min-h-[600px]"
		>
			{/* Sidebar - User List */}
			<div className="w-1/3 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-4">
				<h2 className="text-3xl font-bold text-white mb-4">Chats</h2>
				<div className="space-y-4">
					{users.map((user) => (
						<motion.div
							key={user.id}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={`p-4 flex items-center cursor-pointer rounded-lg transition-all bg-opacity-80 shadow-md ${
								selectedUser === user.id
									? "bg-blue-500 text-white"
									: "bg-white hover:bg-gray-100"
							}`}
							onClick={() => setSelectedUser(user.id)}
						>
							<img
								src={user.profilePic}
								alt={user.name}
								className="w-10 h-10 rounded-full object-cover mr-4"
							/>
							<div>
								<h3 className="font-semibold">{user.name}</h3>
								<p className="text-sm text-gray-600">{user.lastMessage}</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{/* Chat Window */}
			<div className="w-2/3 flex flex-col bg-gray-100">
				{/* Chat Header */}
				<div className="h-16 bg-purple-600 text-white flex items-center px-6 shadow-md">
					{selectedUser ? (
						<h2 className="text-xl font-bold">
							Chat with {users.find((user) => user.id === selectedUser)?.name}
						</h2>
					) : (
						<h2 className="text-xl font-bold">
							Select a chat to start messaging
						</h2>
					)}
				</div>

				{/* Chat Messages */}
				<div className="flex-1 overflow-y-auto bg-gradient-to-r from-gray-50 to-gray-200 p-6">
					{selectedUser ? (
						<div className="space-y-4">
							{chatHistory[selectedUser]?.map((message, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, ease: "easeInOut" }}
									className={`p-3 rounded-lg shadow-md w-fit ${
										index % 2 === 0
											? "bg-blue-500 text-white"
											: "bg-gray-400 text-gray-900"
									}`}
								>
									{message}
								</motion.div>
							))}
						</div>
					) : (
						<div className="flex justify-center items-center h-full">
							<p className="text-gray-400 text-lg italic">
								Start a chat by selecting a user
							</p>
						</div>
					)}
				</div>

				{/* Message Input */}
				{selectedUser && (
					<div className="h-16 bg-gray-200 flex items-center px-4 shadow-inner">
						<input
							type="text"
							value={messageInput}
							onChange={(e) => setMessageInput(e.target.value)}
							placeholder="Type your message..."
							className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
						/>
						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={handleSendMessage}
							className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
						>
							<FaPaperPlane />
						</motion.button>
						<motion.button
							whileTap={{ scale: 0.9 }}
							className="ml-2 p-2 text-gray-500 hover:text-blue-500 transition-all"
						>
							<FaSmile />
						</motion.button>
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default Message;
