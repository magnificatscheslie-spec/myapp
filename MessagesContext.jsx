import React, { createContext, useState, useCallback } from 'react';

export const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      fromUser: 'Admin',
      toUser: 'John Doe',
      toRole: 'TECHNICIAN',
      subject: 'Welcome!',
      content: 'Welcome to the incident management system. Please check your assigned incidents.',
      timestamp: new Date(Date.now() - 3600000),
      isRead: false,
      thread: 1,
    },
  ]);

  const [conversations, setConversations] = useState([
    {
      id: 1,
      participants: ['Admin', 'John Doe'],
      lastMessage: 'Welcome to the incident management system. Please check your assigned incidents.',
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 1,
    },
  ]);

  const sendMessage = useCallback((message) => {
    const newMessage = {
      id: Date.now(),
      timestamp: new Date(),
      isRead: false,
      ...message,
    };
    setMessages(prev => [newMessage, ...prev]);

    // Update or create conversation
    const existingConversation = conversations.find(
      conv => conv.participants.includes(message.fromUser) && conv.participants.includes(message.toUser)
    );

    if (existingConversation) {
      setConversations(prev => 
        prev.map(conv => 
          conv.id === existingConversation.id 
            ? { ...conv, lastMessage: message.content, lastMessageTime: new Date(), unreadCount: conv.unreadCount + 1 }
            : conv
        )
      );
    } else {
      const newConversation = {
        id: Date.now(),
        participants: [message.fromUser, message.toUser],
        lastMessage: message.content,
        lastMessageTime: new Date(),
        unreadCount: 1,
      };
      setConversations(prev => [newConversation, ...prev]);
    }

    return newMessage.id;
  }, [conversations]);

  const markMessageAsRead = useCallback((id) => {
    setMessages(prev => 
      prev.map(msg => msg.id === id ? { ...msg, isRead: true } : msg)
    );
  }, []);

  const getUnreadCount = (userName) => {
    return messages.filter(m => !m.isRead && m.toUser === userName).length;
  };

  const getConversation = (userId1, userId2) => {
    return messages.filter(msg => 
      (msg.fromUser === userId1 && msg.toUser === userId2) || 
      (msg.fromUser === userId2 && msg.toUser === userId1)
    );
  };

  return (
    <MessagesContext.Provider 
      value={{
        messages,
        conversations,
        sendMessage,
        markMessageAsRead,
        getUnreadCount,
        getConversation,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContext;
