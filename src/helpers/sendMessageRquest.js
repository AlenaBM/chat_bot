import { setValueToLocalStore } from "./storage.helper"
import { scrollToBottom } from "./scrollToBottom"

export const sendMessageRquest = async (
    host,
    chatId,
    messageContent,
    chatHistory,
    setLoading,
    setChatHistory,
    chatWindowRef,
    request
) => {

    try {
        setLoading(true)
        const data = await request(`${host}.request`, "POST", {
            cuid: chatId,
            text: `${messageContent}`,
        })
        setChatHistory([
            ...chatHistory,
            { text: messageContent, role: "user" },
            { text: data.result.text.value, role: "bot" },
        ])
        setValueToLocalStore("history", [
            ...chatHistory,
            { text: messageContent, role: "user" },
            { text: data.result.text.value, role: "bot" },
        ])
        scrollToBottom(chatWindowRef);
        setLoading(false)
    } catch (e) {
        setLoading(false)
    }
}