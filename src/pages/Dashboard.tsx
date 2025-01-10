import { useState, useEffect, useRef } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: string;
  receiver: string;
  timestamp: Date;
}

interface User {
  username: string;
  email: string;
}

export function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    const allUsers = JSON.parse(sessionStorage.getItem('users') || '[]');
    setCurrentUser(userData);
    
    const otherUsers = allUsers.filter((user: User) => 
      user.email !== userData.email
    );
    
    const defaultContacts = [
      {
        username: "Support Team",
        email: "support@yopmail.com"
      },
      {
        username: "Help Desk",
        email: "help@yopmail.com"
      },
      {
        username: "System Admin",
        email: "sysadmin@yopmail.com"
      },
      {
        username: "Support Team1",
        email: "support1@yopmail.com"
      },
      {
        username: "Help Desk1",
        email: "help1@yopmail.com"
      },
      {
        username: "System Admin1",
        email: "sysadmin1@yopmail.com"
      },
      {
        username: "Support Team2",
        email: "support2@yopmail.com"
      },
      {
        username: "Help Desk2",
        email: "help2@yopmail.com"
      }
    ];

    // Combine other users with default contacts, avoiding duplicates
    const combinedUsers = [...otherUsers];
    defaultContacts.forEach(contact => {
      if (!combinedUsers.some(user => user.email === contact.email)) {
        combinedUsers.push(contact);
      }
    });

    setUsers(combinedUsers);

    // Load existing messages
    const savedMessages = JSON.parse(sessionStorage.getItem('chatMessages') || '[]');
    setMessages(savedMessages.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    })));
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser || !selectedUser) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: currentUser.username,
      receiver: selectedUser.username,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    sessionStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    setNewMessage("");
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getFilteredUsers = () => {
    return users.filter(user => 
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getLastMessage = (user: User) => {
    const userMessages = messages.filter(m => 
      (m.sender === user.username && m.receiver === currentUser?.username) ||
      (m.sender === currentUser?.username && m.receiver === user.username)
    );
    return userMessages[userMessages.length - 1];
  };

  const getCurrentChat = () => {
    if (!selectedUser) return [];
    return messages.filter(m => 
      (m.sender === selectedUser.username && m.receiver === currentUser?.username) ||
      (m.sender === currentUser?.username && m.receiver === selectedUser.username)
    );
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setShowChat(true);
  };

  return (
    <div className="container h-[calc(100vh-2rem)] mx-auto py-4">
      <Card className="h-full grid md:grid-cols-[350px,1fr] overflow-hidden">
        <div className={`${isMobileView && showChat ? 'hidden' : 'block'} border-r flex flex-col`}>
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1">
            {getFilteredUsers().map((user) => {
              const lastMessage = getLastMessage(user);
              return (
                <div
                  key={user.email}
                  className={`p-4 border-b cursor-pointer hover:bg-muted transition-colors ${
                    selectedUser?.email === user.email ? 'bg-muted' : ''
                  }`}
                  onClick={() => handleUserSelect(user)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium truncate">{user.username}</h3>
                        {lastMessage && (
                          <span className="text-xs text-muted-foreground">
                            {formatTime(lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                      {lastMessage && (
                        <p className="text-sm text-muted-foreground truncate">
                          {lastMessage.text}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${isMobileView && !showChat ? 'hidden' : 'block'} flex flex-col h-full`}>
          {selectedUser ? (
            <>
              <div className="p-4 border-b flex items-center gap-3 sticky top-0 bg-background z-10">
                {isMobileView && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowChat(false)}
                  >
                    Back
                  </Button>
                )}
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {selectedUser.username[0].toUpperCase()}
                </div>
                <h2 className="font-medium">{selectedUser.username}</h2>
              </div>

              <div className="flex-1 overflow-y-auto h-[calc(100vh-15rem)]">
                <div className="space-y-4 p-4 min-h-full">
                  {getCurrentChat().length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      No messages yet. Start the conversation!
                    </div>
                  ) : (
                    getCurrentChat().map((message) => (
                      <div
                        key={message.id}
                        className={`flex flex-col ${
                          message.sender === currentUser?.username
                            ? "items-end"
                            : "items-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === currentUser?.username
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <div className="break-words">{message.text}</div>
                          <div className="text-xs opacity-70 mt-1">
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="p-4 border-t sticky bottom-0 bg-background z-10">
                <form 
                  onSubmit={handleSendMessage} 
                  className="flex gap-2"
                >
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </Card>
    </div>
  );
} 