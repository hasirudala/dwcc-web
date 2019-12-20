import { object, date, array, number, string } from 'yup'

const REQUIRED = 'Required'

const schema = object({
    id: number(),
    date: date()
        .required(REQUIRED)
        .max(new Date())
        .typeError('Invalid or NO date selected'),
    dwccId: number().required(),
    wasteItems: array().of(object({
        id: number(),
        itemId: number().required(REQUIRED),
        quantity: number()
            .required(REQUIRED)
            .min(0, 'Must be at least 0')
            .typeError('Enter valid number'),
        rate: number()
            .required(REQUIRED)
            .min(0, 'Must be at least 0')
            .typeError('Enter valid number'),
        buyerId: number().nullable().notRequired(),
    })).required(REQUIRED),
    note: string().nullable()
})

export default schema

export const emptyWasteItem = {
    itemId: '',
    quantity: '',
    rate: '',
    buyerId: ''
}
