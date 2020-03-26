import { object, date, array, number, string } from 'yup'

const REQUIRED = 'Required'

const schema = object({
    id: number(),
    date: date()
        .required(REQUIRED)
        .max(new Date())
        .typeError('Invalid or NO date selected'),
    dwccId: number().required(),
    dtdCollection: array().of(object({
        id: number(),
        vehicleNumber: string().required(REQUIRED),
        vehicleTypeId: number().required(REQUIRED),
        quantity: number()
            .required(REQUIRED)
            .min(0, 'Must be at least 0')
            .typeError('Enter valid number'),
        rejectQty: number()
            .nullable(true)
            .min(0, 'Must be at least 0')
            .typeError('Enter valid number'),
        sanitaryQty: number()
            .nullable(true)
            .min(0, 'Must be at least 0')
            .typeError('Enter valid number')

    })),
    mixedWaste: array().of(object({
        id: number(),
        itemIds: array(number())
            .required(REQUIRED)
            .typeError('At least one item must be selected'),
        quantity: number()
            .required(REQUIRED)
            .min(0, 'Must be at least 0')
            .typeError('Enter valid number'),
        rejectQty: number()
            .nullable(true)
            .min(0, 'Must be at least 0')
            .typeError('Enter valid number'),
        rate: number()
            .nullable(true)
            .min(0, 'Must be at least 0')
            .typeError('Enter valid number'),
    })),
    note: string().nullable()
})

export default schema

export const emptyDtdWaste = {
    vehicleNumber: '',
    vehicleTypeId: '',
    quantity: '',
    rejectQty: '',
    sanitaryQty: ''
}

export const emptyWasteItem = {
    itemId: '',
    quantity: '',
    rejectQuantity: '',
}

export const emptyMixedWaste = {
    itemIds: [],
    quantity: '',
    rejectQty: '',
    rate: ''
}
