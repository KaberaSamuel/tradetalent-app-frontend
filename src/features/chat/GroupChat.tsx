import { authSelector } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useEffect, useState } from "react";

interface Message {
  username: string;
  message: string;
  timestamp: string;
}

function ChatPage() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const auth = useAppSelector(authSelector)

  useEffect(() => {
    // Connect to the WebSocket server with the username as a query parameter
    const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/personal/`);
    setSocket(newSocket);

    newSocket.onopen = () => console.log("WebSocket connected");
    newSocket.onclose = () => console.log("WebSocket disconnected");

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event: MessageEvent) => {
        const data: Message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };
    }
  }, [socket]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message && socket) {
      const data = {
        message: message,
        username: auth.user.first_name,
      };
      socket.send(JSON.stringify(data));
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="">Chat</div>
      <div className="flex flex-col gap-5">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <div className="">{msg.username}:</div>
            <div className="">{msg.message}</div>
            <div className="">{msg.timestamp}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="fixed p-3 bg-white bottom-5 flex gap-3 border-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatPage;