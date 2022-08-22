import { IQuestion } from "../../models/QuestionModel";
import styles from "./Question.module.scss";

const Question = ({ text, chatHandler }: IQuestion) => (
    <div className={styles.question} onClick={chatHandler}>
        {text}
    </div>
);

export default Question;