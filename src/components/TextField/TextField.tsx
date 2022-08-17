import { useState } from "react"
import TextFieldContext from "./TextField.context"
import styles from "./TextField.module.scss"

const TextField = () => {
        const [messageContent, setMessageContent] = useState('');

        const changeHandler = (event) => {
		setMessageContent(event.target?.value)
		console.log('messageContent', messageContent);
		
	}

	return (
		<TextFieldContext.Provider value={{ messageContent }}>
			<textarea cols={30} rows={1} onChange={changeHandler}></textarea>
		</TextFieldContext.Provider>
	)
}

export default TextField
