const chatService = require('../services/chatService');

const chatController = {
    getStatus: (req, res) => {
        res.send("Chat service is running");
    },
    getMessages: (req, res) => {
        const messages = chatService.getMessages();
        res.json(messages);
    },
    addMessage: (req, res) => {
        const { userId, content } = req.body;
        if (!userId || !content) {
            return res.status(400).json({ error: 'User ID and content are required' });
        }
        const message = chatService.addMessage(userId, content);
        res.status(201).json(message);
    },
    deleteMessage: (req, res) => {
        const { id } = req.params;
        const messageIndex = chatService.messages.findIndex(msg => msg.id === id);
        if (messageIndex === -1) {
            return res.status(404).json({ error: 'Message not found' });
        }
        chatService.messages.splice(messageIndex, 1);
        res.status(204).send();
    },
    updateMessage: (req, res) => {
        const { id } = req.params;
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }
        const message = chatService.messages.find(msg => msg.id === id);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        message.content = content;
        res.json(message);
    }
};
module.exports = chatController;
// This controller handles incoming requests related to chat messages. It uses the chatService to manage the messages.