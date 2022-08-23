const getValueFromLocalStore = (key, prefix = 'chat_bot') => {
    if (localStorage.getItem(`${prefix}_${key}`)) {
        return JSON.parse(localStorage.getItem(`${prefix}_${key}`))
    }
    return false;
};

const setValueToLocalStore = (key, value, prefix = 'chat_bot') => {
    if (value) {
        localStorage.setItem(`${prefix}_${key}`, JSON.stringify(value));
    }
}

const removeValueFromLocalStore = (key, prefix = 'chat_bot') => localStorage.removeItem(`${prefix}_${key}`);

export { getValueFromLocalStore, setValueToLocalStore, removeValueFromLocalStore };
