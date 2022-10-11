const sendErrorResponse = (res, headers, responseCode, errorCode, message) => {
    if (headers) {
        res.set({
            ...headers
        })
    }
    res.status(responseCode).json({
        status: false,
        error: {
            errorCode,
            message
        }
    })
}

const sendSuccessResponse = (res, headers, responseCode, data ) => {
    if (headers) {
        res.set({
            ...headers
        })
    }
    res.status(responseCode).json({
        status: true,
        data
    })
}

module.exports = {
    sendErrorResponse,
    sendSuccessResponse
}