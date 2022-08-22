import { IDialogControlPanel } from "../../models/DialogControlPanelModel";
import Button from "../Button/Button";
import {ReactComponent as ResetIcon} from '../../assets/icon_reset.svg';

import styles from "./DialogControlPanel.module.scss";
import TextField from "../TextField/TextField";
import { useContext, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { getCuid } from "../../helpers/storage.helper";
import DialogWindowContext from "../DialogWindow/DialogWindow.context";

const hostname = 'https://biz.nanosemantics.ru';
const host = `${hostname}/api/2.1/json/Chat`;

const DialogControlPanel = ({ title, paragraph }: IDialogControlPanel) => {
    const isCuidExist = getCuid('cuid');
    
    const { loading, request, setLoading } = useHttp();
    const [messageContent, setMessageContent] = useState({});
    const { chatHistory, setChatHistory } = useContext(DialogWindowContext);

    const chatReq = async(e) => {
        e.preventDefault();
		try {
            setLoading(true)
			const data = await request(`${host}.request`, "POST", 
            {"cuid": `${JSON.parse(localStorage.getItem('chat_bot_cuid'))}`, "text": `${messageContent}`})
            setChatHistory([...chatHistory, { text: messageContent, who: 'you' }, { text: data.result.text.value, who: 'bot' }]);
            setLoading(false)
		} catch (e) {
			setLoading(false)
		}
	}

    return (
        <div className={styles.dialogControlPanel}>
            <form
                className={styles.dialogControlPanel__form}
                onSubmit={(e) => {
                    chatReq(e);
                }}>
                <TextField changeHandler={(e) => setMessageContent(e.target.value)} changeHandlerViaKey={(e) => {
                    if (e.key === "Enter" && e.target.value) {
                        e.preventDefault()
                        chatReq(e)
                    }
                }} />
                <Button type="submit" content="Отправить" className={styles.dialogControlPanel__button} chatHadler={(e) => {
                    chatReq(e)
                }}/>
            </form>
            <div className={styles.dialogControlPanel__actions}>
                <Button type="button" className={styles.dialogControlPanel__button_reset}>
                    <ResetIcon />
                </Button>
            </div>
        </div>
)};

export default DialogControlPanel;