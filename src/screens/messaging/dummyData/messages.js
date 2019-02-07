import uuidv4 from 'uuid/v4';

var messages = [
  {
    text: "Hey man what are you doing today?",
    senderId: 0,
    receiverId: 1,
    id: uuidv4()
  },
  {
    text: "Nothing much just chillin at home",
    senderId: 1,
    receiverId: 0,
    id: uuidv4()
  },
  {
    text: "Why is Gordon the GOAT 🐐? ",
    senderId: 1,
    receiverId: 0,
    id: uuidv4()
  },
  {
    text: "He just is",
    senderId: 0,
    receiverId: 1,
    id: uuidv4()
  },
  {
    text: "Makes sense.",
    senderId: 1,
    receiverId: 0,
    id: uuidv4()
  }
];

export default messages.reverse();