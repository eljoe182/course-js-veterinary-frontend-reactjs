import React from "react";

const MessageComponent = ({ message: { text, type } }) => {
  let messageClass =
    " text-center p-3 rounded-xl text-gray-50 uppercase font-bold text-sm mb-10 bg-gradient-to-br ";
  if (type === "error") {
    messageClass += " from-red-400 to-red-600 ";
  } else if (type === "success") {
    messageClass += " from-green-400 to-green-600 ";
  } else if (type === "info") {
    messageClass += " from-cyan-400 to-cyan-600 ";
  } else if (type === "warning") {
    messageClass += " from-yellow-400 to-yellow-600 ";
  } else {
    messageClass += " from-indigo-400 to-indigo-600 ";
  }

  return <div className={messageClass}>{text}</div>;
};

export default MessageComponent;
