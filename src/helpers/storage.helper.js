const getCuid = (key, prefix = 'chat_bot') => {
    JSON.parse(localStorage.getItem(`${prefix}_${key}`));
}

const setCuid = (key, value, prefix = 'chat_bot') => {
    if (value) {
        localStorage.setItem(`${prefix}_${key}`, JSON.stringify(value));
    } 
    // else {
    //     localStorage.removeItem(`${prefix}_${key}`);
    // }
}

export { getCuid, setCuid };
