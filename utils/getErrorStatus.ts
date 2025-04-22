function getErrorStatus(errorMessage: string) {
    const startIndex = errorMessage.indexOf(`status":"`) + 9;
    const endIndex = errorMessage
        .substring(startIndex, errorMessage.length)
        .indexOf(`"`);

    return errorMessage.substr(startIndex, endIndex);
}

export default getErrorStatus;
