export function axiosErrorResponse(error, customMsg) {
    if (error.response) {
        const { status } = error.response
        switch (status) {
            case 401:
            case 403:
                return `${customMsg ? customMsg + ' // ' : ''}Authorization failed. 
                Try signing out and logging-in again. If this problem continues, contact tech support.`
            case 504:
                return `${customMsg ? customMsg + ' // ' : ''}An external service didn't respond. Try again or hit REFRESH on your browser`
            default:
                return `${customMsg ? customMsg + ' // ' : ''}Something didn't go as expected.`
        }
    }
}