import styles from "./Question.module.scss";

const Question = ({ text, chatHandler }) => (
    <div className={styles.question} onClick={chatHandler}>
        {text}
    </div>
);

export default Question;