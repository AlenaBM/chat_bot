import classNames from "classnames";
import styles from "./Message.module.scss";

const Message = ({ text, className }) => (
        <div className={classNames(styles.message, className)}>{text}</div>
);

export default Message;