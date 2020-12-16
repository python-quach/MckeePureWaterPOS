export const getCurrentTime = () => {
    const time = new Date();
    return time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });
};

export const currentDate = () => {
    const currentdate = new Date();
    const datetime =
        currentdate.getMonth() +
        1 +
        '/' +
        currentdate.getDate() +
        '/' +
        currentdate.getFullYear();

    return datetime;
};
