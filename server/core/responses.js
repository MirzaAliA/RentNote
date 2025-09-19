export function sendOkResponse (res, payload = {}, message = "Success") {
    return res.status(200).json({
        success: true,
        message,
        payload
    });
}

export function sendErrorResponse (res, error, status = 500) {
    return res.status(status).json({
        success: false,
        message: error.message || "Something went wrong",
    });
}