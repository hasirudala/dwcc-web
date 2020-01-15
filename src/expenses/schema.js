import { object, date, array, number } from 'yup'

const REQUIRED = 'Required'

const schema = object({
    id: number(),
    date: date()
        .required(REQUIRED)
        .max(new Date())
        .typeError('Invalid or NO date selected'),
    dwccId: number().required(),
    entries: array().of(object({
        id: number(),
        expenseItemId: number().required(REQUIRED),
        numItems: number()
            .nullable(true)
            .min(1, 'Must be at least 1')
            .typeError('Enter valid number'),
        amount: number()
            .nullable(true)
            .min(0, 'Must be at least 0')
            .typeError('Enter valid number')
    })),
    purchaseEntries: array().of(object({
        id: number(),
        wasteItemId: number().required(REQUIRED),
        amount: number()
            .required(REQUIRED)
            .min(0, 'Must be at least 0')
            .typeError('Enter valid number')
    })),
})

export default schema

export const emptyPurchaseEntry = {
    wasteItemId: undefined,
    amount: undefined
}
