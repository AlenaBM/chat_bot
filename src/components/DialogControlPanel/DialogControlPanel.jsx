import Button from "../Button/Button"
import { useMediaQuery } from "react-responsive"
import adaptiveOptions from "../../helpers/adaptiveOptions"
import { ReactComponent as ResetIcon } from "../../assets/icon_reset.svg"
import { ReactComponent as Sendcon } from "../../assets/icon_send_message.svg"

import TextField from "../TextField/TextField"
import { useContext, useState } from "react"
import { removeValueFromLocalStore } from "../../helpers/storage.helper"
import DialogWindowContext from "../DialogWindow/DialogWindow.context"

import host from "../../core/config"
import { sendMessageRquest } from "../../helpers/sendMessageRquest"
import { useHttp } from "../../hooks/http.hook"

import styles from "./DialogControlPanel.module.scss"

const DialogControlPanel = () => {
	const { request } = useHttp();
	const [messageContent, setMessageContent] = useState("")
	const { chatHistory, setChatHistory, chatId, setLoading, chatWindowRef } =
		useContext(DialogWindowContext)

	const isMobile = useMediaQuery(adaptiveOptions.isMobile)

	const resetChat = () => {
		removeValueFromLocalStore("history")
		setChatHistory([])
	}

	return (
		<div className={styles.dialogControlPanel}>
			<form className={styles.dialogControlPanel__form}>
				<TextField
					textFieldValue={messageContent}
					changeHandler={(e) =>
						setMessageContent(e.target.value)
					}
					changeHandlerViaKey={async(e) => {
						if (e.key === "Enter" && messageContent) {
							e.preventDefault()
							await sendMessageRquest(
								host,
								chatId,
								messageContent,
								chatHistory,
								setLoading,
								setChatHistory,
                                chatWindowRef,
								request
							)
							setMessageContent('')
						}
					}}
				/>
				<Button
					type='button'
					className={styles.dialogControlPanel__button}
					actionHadler={async() => {
						await sendMessageRquest(
							host,
							chatId,
							messageContent,
							chatHistory,
							setLoading,
							setChatHistory,
                            chatWindowRef,
							request
						)
						setMessageContent('')
						}
					}
				>
					{isMobile ? <Sendcon /> : <span>Отправить</span>}
				</Button>
			</form>
			<Button
				type='button'
				className={styles.dialogControlPanel__button_reset}
				actionHadler={resetChat}
			>
				<ResetIcon />
			</Button>
		</div>
	)
}

export default DialogControlPanel
