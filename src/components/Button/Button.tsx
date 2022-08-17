import classNames from "classnames";
import { IButton } from "../../models/ButtonModel";
import styles from "./Button.module.scss";

const Button = ({ type, content, children, className, chatHadler }: IButton) => (
    <button type={type} className={classNames(styles.button, className)} onClick={chatHadler}>
        {content}
        {children}
    </button>
);

export default Button;