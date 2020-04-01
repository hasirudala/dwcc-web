import { object, date, array, number, string } from 'yup'

const REQUIRED = 'Required'

const schema = object({
    id: number(),
    fromDate: date()
        .required(REQUIRED)
        .max(new Date())
        .typeError('Invalid or NO date selected'),
    toDate: date()
        .required(REQUIRED)
        .max(new Date())
        .typeError('Invalid or NO date selected'),
    dwccId: number().required(),
    rejectQuantity: number()
        .min(0, 'Must be at least 0')
        .nullable(true)
        .typeError('Enter valid number'),
    sanitaryQuantity: number()
        .min(0, 'Must be at least 0')
        .nullable(true)
        .typeError('Enter valid number'),
    entries: array().of(object({
        id: number(),
        itemIds: array(number())
            .required(REQUIRED)
            .typeError('At least one item must be selected'),
        quantity: number()
            .required(REQUIRED)
            .min(0, 'Must be at least 0')
            .typeError('Enter valid number'),
        stockInHand: number()
            .min(0, 'Must be at least 0')
            .nullable(true)
            .typeError('Enter valid number'),
        rate: number()
            .min(0, 'Must be at least 0')
            .nullable(true)
            .typeError('Enter valid number'),
        buyerId: number().nullable().notRequired(),
    })).required(REQUIRED),
    note: string().nullable()
})

export default schema

export const emptyEntry = {
    itemIds: [],
    quantity: '',
    rejectQuantity: '',
    stockInHand: '',
    rate: ''
}
