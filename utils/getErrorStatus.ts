function getErrorStatus(errorMessage: string) {
    const startIndex = errorMessage.indexOf("{");
    const endIndex = errorMessage.lastIndexOf("}");
    const error = JSON.parse(
        errorMessage.substring(startIndex, endIndex + 1),
    ).error;
    return error.status;
}

export default getErrorStatus;
