import React, { useEffect, useRef } from 'react';
import { MessageCircle, Send, Crown, Shield, Trash2 } from 'lucide-react';
import websocketService from '../services/websocket';

const ChatMessage = ({ message, currentUser, onDeleteMessage, onBanUser }) => {
  const [showOptions, setShowOptions] = React.useState(false);
  
  return (
    <div 
      className="flex items-start space-x-2 p-2 hover:bg-gray-800 rounded group"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <img src={message.user.avatar} alt={message.user.username} className="w-6 h-6 rounded-full flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${message.user.role === 'streamer' ? 'text-purple-400' : 'text-blue-400'}`}>
            {message.user.username}
            {message.user.role === 'streamer' && <Crown className="w-3 h-3 inline ml-1" />}
          </span>
          <span className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</span>
        </div>
        <p className="text-white text-sm break-words">{message.text}</p>
      </div>
      
      {showOptions && currentUser?.role === 'streamer' && currentUser.id !== message.user.id && (
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onDeleteMessage(message.id)}
            className="p-1 text-gray-400 hover:text-red-400"
            title="Delete message"
          >
            <Trash2 className="w-3 h-3" />
          </button>
          <button
            onClick={() => onBanUser(message.user.id)}
            className="p-1 text-gray-400 hover:text-red-400"
            title="Ban user"
          >
            <Shield className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) { // Less than 1 minute
    return 'just now';
  } else if (diff < 3600000) { // Less than 1 hour
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m ago`;
  } else if (diff < 86400000) { // Less than 1 day
    const hours = Math.floor(diff / 3600000);
    return `${hours}h ago`;
  } else {
    return date.toLocaleDateString();
  }
};

const LiveChat = ({ streamId, currentUser }) => {
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Connect to WebSocket when component mounts
    websocketService.connect(streamId);

    // Add message handler
    const handleMessage = (message) => {
      if (message.type === 'chat') {
        setMessages(prev => [...prev, message.data]);
      }
    };

    websocketService.addMessageHandler(handleMessage);

    // Cleanup on unmount
    return () => {
      websocketService.removeMessageHandler(handleMessage);
      websocketService.disconnect();
    };
  }, [streamId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !currentUser) return;
    
    const message = {
      id: Date.now(),
      user: currentUser,
      text: newMessage,
      timestamp: new Date().toISOString()
    };
    
    websocketService.sendMessage(message);
    setNewMessage('');
  };

  const deleteMessage = (messageId) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
  };

  const banUser = (userId) => {
    setMessages(prev => prev.filter(m => m.user.id !== userId));
    alert(`User banned from chat`);
  };

  return (
    <div className="bg-gray-900 h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-white font-semibold flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Stream Chat
        </h3>
      </div>
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-2 space-y-1"
      >
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            currentUser={currentUser}
            onDeleteMessage={deleteMessage}
            onBanUser={banUser}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {currentUser && (
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat; 