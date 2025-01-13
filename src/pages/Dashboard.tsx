import { useState, useEffect, useRef } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { 
  Search,
  Send, 
  ChevronLeft,
  Paperclip,
  Mic
} from "lucide-react";
import { cn } from "../lib/utils";
import { EmojiPicker } from "../components/EmojiPicker";
import { toast } from "../hooks/use-toast";
import { Link } from "react-router-dom";

interface Attachment {
  type: 'image' | 'file';
  url: string;
  name: string;
  size?: number;
}

interface Message {
  id: string;
  text: string;
  sender: string;
  receiver: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: Attachment[];
  isRecording?: boolean;
}

interface User {
  username: string;
  email: string;
  status?: 'online' | 'offline';
  lastSeen?: Date;
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
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showAttachmentDialog, setShowAttachmentDialog] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  console.log(showAttachmentDialog);
  console.log(uploadProgress);
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
      },
      {
        username: "System Admin2",
        email: "sysadmin2@yopmail.com"
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
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent, attachment?: Attachment) => {
    e?.preventDefault();
    if ((!newMessage.trim() && !attachment) || !currentUser || !selectedUser) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: currentUser.username,
      receiver: selectedUser.username,
      timestamp: new Date(),
      status: 'sent',
      attachments: attachment ? [attachment] : undefined
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

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  const handleFileAttachment = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate file upload with progress
    setShowAttachmentDialog(true);
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Create attachment message
    const attachment: Attachment = {
      type: file.type.startsWith('image/') ? 'image' : 'file',
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    };

    handleSendMessage(undefined, attachment);
    setShowAttachmentDialog(false);
    setUploadProgress(0);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const attachment: Attachment = {
          type: 'file',
          url: audioUrl,
          name: 'Voice Message',
        };

        handleSendMessage(undefined, attachment);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Update recording time
      const startTime = Date.now();
      const timeInterval = setInterval(() => {
        setRecordingTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      // Stop recording after 1 minute
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          stopRecording();
          clearInterval(timeInterval);
        }
      }, 60000);

    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingTime(0);
    }
  };

  const renderMessage = (message: Message) => {
    return (
      <>
        {message.text && <div>{message.text}</div>}
        {message.attachments?.map((attachment, index) => (
          <div key={index} className="mt-2">
            {attachment.type === 'image' ? (
              <img 
                src={attachment.url} 
                alt={attachment.name}
                className="max-w-[200px] rounded-md"
              />
            ) : (
              <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <div className="flex-1 truncate">{attachment.name}</div>
                {attachment.name === 'Voice Message' ? (
                  <audio controls className="h-8">
                    <source src={attachment.url} type="audio/wav" />
                  </audio>
                ) : (
                  <Link
                    to={attachment.url} 
                    download={attachment.name}
                    className="text-primary hover:underline"
                  >
                    Download
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="h-[calc(100vh-2rem)] mx-auto py-4 container">
      <Card className="h-full grid md:grid-cols-[350px,1fr] overflow-hidden">
        {/* Contacts Panel */}
        <div 
          className={cn(
            "flex flex-col h-full border-r",
            isMobileView && showChat ? 'hidden' : 'block'
          )}
        >
          {/* Header */}
          <div className="p-4 border-b bg-card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                {currentUser?.username?.[0].toUpperCase()}
              </div>
              <span className="font-semibold">{currentUser?.username}</span>
            </div>
            {/* <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button> */}
          </div>

          {/* Search */}
          <div className="sticky top-0 z-10 p-2 border-b bg-card">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search or start new chat"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Contacts List */}
          <div 
            className="flex-1 overflow-y-auto scrollbar-thin"
            style={{ 
              maxHeight: 'calc(100vh - 13rem)'
            }}
          >
            {getFilteredUsers().map((user) => {
              const lastMessage = getLastMessage(user);
              return (
                <div
                  key={user.email}
                  className={cn(
                    "p-3 flex items-center gap-3 cursor-pointer hover:bg-muted transition-colors",
                    selectedUser?.email === user.email && 'bg-muted'
                  )}
                  onClick={() => handleUserSelect(user)}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {user.username[0].toUpperCase()}
                    </div>
                    {user.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
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
                        {lastMessage.sender === currentUser?.username ? '✓ ' : ''}{lastMessage.text}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Panel */}
        <div 
          className={cn(
            "flex flex-col h-full bg-muted/30",
            isMobileView && !showChat ? 'hidden' : 'block'
          )}
        >
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-3 border-b bg-card flex items-center gap-3 sticky top-0 z-10">
                {isMobileView && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowChat(false)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                )}
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {selectedUser.username[0].toUpperCase()}
                    </div>
                    {selectedUser.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-medium">{selectedUser.username}</h2>
                    <p className="text-xs text-muted-foreground">
                      {selectedUser.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                {/* <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div> */}
              </div>

              {/* Messages Area */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"
                style={{ 
                  maxHeight: 'calc(100vh - 13rem)'
                }}
              >
                {getCurrentChat().length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  getCurrentChat().map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex flex-col max-w-[85%]",
                        message.sender === currentUser?.username ? "ml-auto" : "mr-auto"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-lg p-3 break-words",
                          message.sender === currentUser?.username
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-card rounded-bl-none"
                        )}
                      >
                        {renderMessage(message)}
                        <div className="text-xs opacity-70 mt-1 flex items-center justify-end gap-1">
                          {formatTime(message.timestamp)}
                          {message.sender === currentUser?.username && (
                            <span>✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-3 bg-card border-t">
                <form 
                  onSubmit={handleSendMessage} 
                  className="flex items-center gap-2"
                >
                  <EmojiPicker onChange={handleEmojiSelect} />
                  <input
                    type="file"
                    id="file-attachment"
                    className="hidden"
                    onChange={handleFileAttachment}
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => document.getElementById('file-attachment')?.click()}
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1"
                  />
                  {newMessage.trim() ? (
                    <Button type="submit" size="icon">
                      <Send className="h-5 w-5" />
                    </Button>
                  ) : (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={isRecording ? stopRecording : startRecording}
                      className={isRecording ? "animate-pulse text-red-500" : ""}
                    >
                      <Mic className="h-5 w-5" />
                    </Button>
                  )}
                </form>
                {isRecording && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Recording: {recordingTime}s
                  </div>
                )}
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