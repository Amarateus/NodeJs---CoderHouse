const generateRandomString = async (num) => {
    let result = Math.random().toString(36).substring(0, num);

    return result;
}

export { generateRandomString }