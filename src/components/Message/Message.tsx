import classNames from "classnames";
import { IMessage } from "../../models/MessageModel";
import styles from "./Message.module.scss";

const Message = ({ text, className }: IMessage) => (
        <div className={classNames(styles.message, className)}>{text}</div>
);

export default Message;