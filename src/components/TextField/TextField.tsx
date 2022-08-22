import { useState } from "react"
import styles from "./TextField.module.scss"

const TextField = ({changeHandler, changeHandlerViaKey}) => <textarea cols={30} rows={1} onChange={changeHandler} onKeyDown={changeHandlerViaKey}></textarea>
	

export default TextField
