import { v4 } from "uuid";
import { readDB, writeDB } from "../dbController.js";

const getMessages = () => readDB("messages");
const setMessages = (data) => writeDB("messages", data);

const MessagesRoute = [
  {
    method: "get",
    route: "/messages",
    handler: (req, res) => {
      const messages = getMessages();
      res.status(200).json(messages);
    },
  },
  {
    method: "get",
    route: "/messages/:id",
    handler: ({ params: { id } }, res) => {
      try {
        const messages = getMessages();
        const find = messages.find(message => message.id === id); 
        if (!find) { throw Error("not found") }

        res.status(200).json(find);
      } catch (err) {
        res.status(404).send({ status: 'error', error: err.toString() });
      }
    },
  },
  {
    method: "post",
    route: "/messages",
    handler: (req, res) => {
      const messages = getMessages();
      const newMessages = {
        id: v4(),
        text: body.text,
        userId: body.userId,
        timeStamp: Date.now(),
      };
      messages.unshift(newMessages);
      setMessages(messages);

      res.status(200).json(newMessages);
    },
  },
  {
    method: "put",
    route: "/messages/:id",
    handler: ({ body, params: { id } }, res) => {
      try {
        const messages = getMessages();
        const targetIndex = messages.findIndex((message) => message.id === id);
        if (targetIndex < 0) { throw "메세지가 없습니다"; }
        if (messages[targetIndex].userId !== body.userId) { throw "사용자가 다릅니다."; }

        const newMessage = { ...messages[targetIndex], text: body.text }
        messages.splice(targetIndex, 1, newMessage);
        setMessages(messages);

        res.status(200).json(newMessage);
      } catch (err) {
        res.status(500).json({ status: 'error', error: err.toString() });
      }
    },
  },
  {
    method: "delete",
    route: "/messages/:id",
    handler: ({ body, params: { id } }, res) => {
      try {
        const messages = getMessages();
        const targetIndex = messages.findIndex((message) => message.id === id);
        if (targetIndex < 0) { throw "메세지가 없습니다"; }
        if (messages[targetIndex].userId !== body.userId) { throw "사용자가 다릅니다."; }

        messages.splice(targetIndex, 1);
        setMessages(messages);

        res.status(200).json(id);
      } catch (err) {
        res.status(500).json({ status: 'error', error: err.toString() });
      }
    },
  },
];

export default MessagesRoute;
