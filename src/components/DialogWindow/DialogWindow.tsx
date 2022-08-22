import { useCallback, useEffect, useState } from "react";
import { getCuid, setCuid } from "../../helpers/storage.helper";
import { useHttp } from "../../hooks/http.hook";
import { IDialogWindow } from "../../models/DialogWindowModel";
import DialogControlPanel from "../DialogControlPanel/DialogControlPanel";
import { Loader } from "../Loader/Loader";
import Message from "../Message/Message";
import Question from "../Question/Question";
import DialogWindowContext from "./DialogWindow.context";
import styles from "./DialogWindow.module.scss";

const hostname = 'https://biz.nanosemantics.ru';
const host = `${hostname}/api/2.1/json/Chat`;

const isCuidExist = getCuid('cuid');

const DialogWindow = () => {
    const { loading, request, setLoading } = useHttp();
    const [chatId, setChatId] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const chatInit = async() => {
		try {
			const data = await request(`${host}.init`, "POST", 
            {"uuid": "772c9859-4dd3-4a0d-b87d-d76b9f43cfa4"})
            setChatId(data.result.cuid);
		} catch (e) {
			setLoading(false)
		}
	}

    const chatReq = async(text) => {
		try {
            setLoading(true)
			const data = await request(`${host}.request`, "POST", 
            {"cuid": `${JSON.parse(localStorage.getItem('chat_bot_cuid'))}`, "text": `${text}`})
            setChatHistory([...chatHistory, { text: text, who: 'you' }, { text: data.result.text.value, who: 'bot' }]);
            setLoading(false)
		} catch (e) {
			setLoading(false)
		}
	}

    useEffect(() => {
        if (!isCuidExist) {
            chatInit()
            setCuid('cuid', chatId)
        }
        // иначе - при отправке нового сообщения cuid беру из localStorage
    }, [])

   return (
        <div className={styles.dialogWindow}>
            <DialogWindowContext.Provider value={{chatHistory, setChatHistory}}>
            <div className={styles.dialogWindow__frame}>
                <p>{chatId}</p>
                <div className={styles.dialogWindow__chat}>
                   <div className={styles.dialogWindow__chatView}>
                    {loading ? <Loader /> : (
                            <>
                            {!isCuidExist && <Message text='Здравствуйте!' />}
                            {chatHistory.length && chatHistory.map((mes, i) => (
                                <Message className={mes.who === 'you' && styles.dialogWindow__message_your} text={mes.text} key={i+'_'+mes} />
                            ))}
                            </>
                        )}
                   </div>
                    <div className={styles.dialogWindow__questions}>
                        <Question text='3G'  chatHandler={() => chatReq('3G')}/>
                        <Question text='Lte' chatHandler={() => chatReq('Lte')}/>
                    </div>
                </div>
                <DialogControlPanel />
            </div>
            </DialogWindowContext.Provider>
        </div>
   )
};

export default DialogWindow ;