export const scrollToBottom = (ref) => {
    ref?.current.scrollTo(0, ref?.current.scrollHeight);
}