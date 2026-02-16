import React, { useContext, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MessagesContext } from '../context/MessagesContext';
import { AuthContext } from '../context/AuthContext';

const MessageDropdown = ({ isOpen }) => {
  const { conversations, messages, markMessageAsRead, sendMessage } = useContext(MessagesContext);
  const { user } = useContext(AuthContext);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');

  if (!isOpen) return null;

  const unreadCount = messages.filter(m => !m.isRead && m.toUser === user.name).length;
  const userConversations = conversations.filter(conv => 
    conv.participants.some(p => p === user.name || p === user.role)
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedConversation) return;

    const otherParticipant = selectedConversation.participants.find(p => p !== user.name);
    
    sendMessage({
      fromUser: user.name,
      toUser: otherParticipant,
      toRole: user.role === 'ADMIN' ? 'TECHNICIAN' : user.role === 'TECHNICIAN' ? 'USER' : 'TECHNICIAN',
      subject: selectedConversation.lastMessage.split('\n')[0],
      content: messageText,
      thread: selectedConversation.id,
    });

    setMessageText('');
  };

  const getConversationMessages = (convId) => {
    return messages.filter(m => m.thread === convId);
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-surface dark:bg-gray-800 rounded-lg shadow-xl z-30 max-h-96 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-surface dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-bold text-body dark:text-gray-200">Messages</h3>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Conversations list */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          {userConversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-xs">
              No conversations
            </div>
          ) : (
            userConversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-3 text-left border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                  selectedConversation?.id === conv.id ? 'bg-blue-50 dark:bg-blue-900' : ''
                }`}
              >
                <p className="text-xs font-semibold text-body dark:text-gray-200 truncate">
                  {conv.participants.find(p => p !== user.name)}
                </p>
                {conv.unreadCount > 0 && (
                  <span className="text-xs bg-red-500 text-white px-1 rounded inline-block mt-1">
                    {conv.unreadCount}
                  </span>
                )}
              </button>
            ))
          )}
        </div>

        {/* Message thread */}
        {selectedConversation ? (
          <div className="w-2/3 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900">
              {getConversationMessages(selectedConversation.id).map(msg => (
                <div
                  key={msg.id}
                  className={`mb-3 flex ${msg.fromUser === user.name ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg max-w-xs text-xs ${
                      msg.fromUser === user.name
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-body dark:text-gray-200'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 dark:border-gray-700 p-2 flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type message..."
                className="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-body dark:text-gray-200 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Send
              </button>
            </form>
          </div>
        ) : (
          <div className="w-2/3 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageDropdown;
