import { useEffect, useRef, useState } from "react";
import host from "../../core/config";
import { scrollToBottom } from "../../helpers/scrollToBottom";
import { sendMessageRquest } from "../../helpers/sendMessageRquest";
import { getValueFromLocalStore, setValueToLocalStore } from "../../helpers/storage.helper";
import { useHttp } from "../../hooks/http.hook";
import DialogControlPanel from "../DialogControlPanel/DialogControlPanel";
import { Loader } from "../Loader/Loader";
import Message from "../Message/Message";
import Question from "../Question/Question";
import { ThemeSwitcher } from "../ThemeSwither/ThemeSwitcher";
import DialogWindowContext from "./DialogWindow.context";
import styles from "./DialogWindow.module.scss";

const isCuidExist = getValueFromLocalStore('cuid');

const DialogWindow = () => {
    const { loading, request, setLoading } = useHttp();
    const [chatId, setChatId] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const chatWindowRef = useRef(null);

    const chatInit = async() => {
		try {
			const data = await request(`${host}.init`, "POST", 
            {"uuid": "772c9859-4dd3-4a0d-b87d-d76b9f43cfa4"})
            setChatId(data.result.cuid);
            scrollToBottom(chatWindowRef);
		} catch (e) {
			setLoading(false)
		}
	}

    useEffect(() => {
        if (!isCuidExist) {
            chatInit()
            setValueToLocalStore('cuid', chatId)
        } else {
            setChatId(isCuidExist);
        }
        if (getValueFromLocalStore('history')?.length) {
            setChatHistory(getValueFromLocalStore('history'));
        }
    }, [])

   return (
        <div className={styles.dialogWindow}>
            <DialogWindowContext.Provider value={{chatHistory, setChatHistory, chatId, setLoading, chatWindowRef}}>
            <div className={styles.dialogWindow__frame}>
                <div className={styles.dialogWindow__chat}>
                   <div className={styles.dialogWindow__chatView} ref={chatWindowRef}>
                        <Message text='Здравствуйте!' />
                        {chatHistory.length > 0 && chatHistory.map((mes, i) => (
                            <Message className={mes.role === 'user' && styles.dialogWindow__message_your} text={mes.text} key={i+'_'+mes.text} />
                        ))}
                   </div>
                   {loading && <Loader />}
                    <div className={styles.dialogWindow__questions}>
                        <Question text='3G'  chatHandler={() => sendMessageRquest(
								host,
								chatId,
								'3G',
								chatHistory,
								setLoading,
								setChatHistory,
                                chatWindowRef,
                                request
							)}/>
                        <Question text='Lte' chatHandler={() => sendMessageRquest(
								host,
								chatId,
								'Lte',
								chatHistory,
								setLoading,
								setChatHistory,
                                chatWindowRef,
                                request
							)}/>
                    </div>
                </div>
                <DialogControlPanel />
            </div>
            </DialogWindowContext.Provider>
            <ThemeSwitcher />
        </div>
   )
};

export default DialogWindow ;