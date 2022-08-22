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

    useEffect(() => {
        if (!isCuidExist) {
            chatInit()
            setCuid('cuid', chatId)
        }
        // иначе - при отправке нового сообщения cuid беру из localStorage
    }, [])

    useEffect(() => {
        console.log(chatHistory);
        
    }, [chatHistory]);

   return (
        <div className={styles.dialogWindow}>
            <DialogWindowContext.Provider value={{chatHistory, setChatHistory}}>
            <div className={styles.dialogWindow__frame}>
                <p>{chatId}</p>
                <div className={styles.dialogWindow__chat}>
                    {loading ? <Loader /> : (
                        <>
                        {!isCuidExist && <Message text='Здарова' />}
                        {chatHistory.length && chatHistory.map((mes) => (
                            <Message text={mes} />
                        ))}
                        </>
                    )}
                    <div className={styles.dialogWindow__questions}>
                        <Question text='3G' />
                        <Question text='Lte' />
                    </div>
                </div>
                <DialogControlPanel />
            </div>
            </DialogWindowContext.Provider>
        </div>
   )
};

export default DialogWindow ;