export function axiosErrorResponse(error, customMsg) {
    if (error.response) {
        const { status } = error.response
        switch (status) {
            case 401:
            case 403:
                return `${customMsg + ' // '} Authorization failed. Try again or contact administrator if this happens repeatedly.`
            case 504:
                return `${customMsg + ' // '} An external service didn't respond. Try again or hit REFRESH on your browser`
            default:
                return `${customMsg + ' // '} Something didn't go as expected.`
        }
    }
}