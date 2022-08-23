import classNames from "classnames";
import styles from "./Button.module.scss";

const Button = ({ type, content, children, className, actionHadler }) => (
    <button type={type} className={classNames(styles.button, className)} onClick={actionHadler}>
        {content}
        {children}
    </button>
);

export default Button;