import { email, required, regex } from "react-admin"
import { allowedHostedDomain } from "../../common/constants"


export const isRequired = required("This field is required")

const emailPattern = new RegExp('^[\\d\\w._+-]+@' + allowedHostedDomain + '$')
export const validateEmail = [
    isRequired,
    email("Please enter a valid email address"),
    regex(emailPattern, `Only @${allowedHostedDomain} addresses allowed`)
]

export const dateNotInFuture = (message="Date cannot be in the future") =>
    value => new Date(value) > new Date() ? message : undefined
