'use strict'

const setResponse = (res, answer, statusCode) => {
    console.log(answer)
    res.headers = {
        'Content-type': 'application/json'
    }
    res.status(statusCode).send(answer)
}

module.exports = {

    setResponse,

    fetchDataAndSetResponse: async (res, getDataFunc, parseDataToFinalJSON) => {

        try {
            const data = await getDataFunc()
            const parsedData = parseDataToFinalJSON(data)

            setResponse(res, {
                success: true,
                message: "",
                data: parsedData
            }, data.status || 200)

        } catch (error) {
            setResponse(res,
                {
                    success: false,
                    message: error.message,
                    data: []
                },
                400)
        }
    }

}

