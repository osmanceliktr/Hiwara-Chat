import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github.css'; // Kod vurgulaması için CSS
import { formatTime } from '../../helper/formatTime';

const MessageItem = ({ message }) => {
  const isUser = message.sender === 'user';
  


  return (
    <div className={`message-item ${isUser ? 'user-message' : 'other-message'}`}>
      <div className="message-bubble">
        <div className="message-content">
        <ReactMarkdown
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {message.content}
          </ReactMarkdown>
          </div>
        <div className="message-time">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  );
};

export default MessageItem; 