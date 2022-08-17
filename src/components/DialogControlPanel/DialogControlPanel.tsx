import { IDialogControlPanel } from "../../models/DialogControlPanelModel";
import Button from "../Button/Button";
import {ReactComponent as ResetIcon} from '../../assets/icon_reset.svg';

import styles from "./DialogControlPanel.module.scss";
import TextInput from "../TextField/TextField";
import { useContext } from "react";
import TextFieldContext from "../TextField/TextField.context";

const DialogControlPanel = ({ title, paragraph }: IDialogControlPanel) => {
    const textAreaValue = useContext(TextFieldContext);

    return (
        <div className={styles.dialogControlPanel}>
            <TextInput />
            <div className={styles.dialogControlPanel__actions}>
                <Button type="button" content="Отправить" className={styles.dialogControlPanel__button} chatHadler={() => console.log(textAreaValue)}/>
                <Button type="button" className={styles.dialogControlPanel__button_reset}>
                    <ResetIcon />
                </Button>
            </div>
        </div>
)};

export default DialogControlPanel;