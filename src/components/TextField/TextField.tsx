import { useState } from "react"
import styles from "./TextField.module.scss"

const TextField = ({changeHandler, changeHandlerViaKey}) => 
	<textarea className={styles.textField} placeholder="Введите сообщение..." onChange={changeHandler} onKeyDown={changeHandlerViaKey} />
	

export default TextField
