const getCuid = (key, prefix = 'chat_bot') => {
    JSON.parse(localStorage.getItem(`${prefix}_${key}`));
}

const setCuid = (key, value, prefix = 'chat_bot') => {
    if (value) {
        localStorage.setItem(`${prefix}_${key}`, JSON.stringify(value));
    }
}

const setHistory = (key, value, prefix = 'chat_bot') => {
    if (value) {
        localStorage.setItem(`${prefix}_${key}`, JSON.stringify(value));
    }
}

export { getCuid, setCuid, setHistory };
