import styles from "./TextField.module.scss"

const TextField = ({changeHandler, changeHandlerViaKey, textFieldValue}) => 
	<textarea className={styles.textField} value={textFieldValue} placeholder="Введите сообщение..." onChange={changeHandler} onKeyDown={changeHandlerViaKey} />
	

export default TextField
