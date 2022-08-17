import { IQuestion } from "../../models/QuestionModel";
import styles from "./Question.module.scss";

const Question = ({ text }: IQuestion) => (
    <div className={styles.question}>
        {text}
    </div>
);

export default Question;