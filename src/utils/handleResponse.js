export const handleResponse = (res, statusCode, key, message, data) => {
    res.status(statusCode).json({message: message, [key]: data});
}