import PropTypes from "prop-types";
import style from "./Message.module.css";

function Message({ text, type }) {
  const getMessageClass = () => {
    if (type === "success") {
      return style["message-success"];
    } else if (type === "error") {
      return style["message-error"];
    } else {
      return style["message-default"];
    }
  };

  const messageClass = getMessageClass();

  return <div className={`${style.message} ${messageClass}`}>{text}</div>;
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["default", "success", "error"]),
};

export default Message;
