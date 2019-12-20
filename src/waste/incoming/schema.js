import { object, date, array, number, string, boolean } from 'yup'

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
            .typeError('Enter valid number')
    })),
    wasteItems: array().of(object({
        id: number(),
        itemId: number().required(REQUIRED),
        quantity: number()
            .required(REQUIRED)
            .min(0, 'Must be at least 0')
            .typeError('Enter valid number'),
        rejectQuantity: number()
        //.required(REQUIRED)
            .nullable()
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
        rate: number()
            .min(0, 'Must be at least 0')
            .nullable()
            .typeError('Enter valid number'),
    })),
    errorsIgnored: boolean().default(false),
    approvedByAdmin: boolean().default(false),
    note: string().nullable()
})

export default schema

export const emptyDtdWaste = {
    vehicleNumber: '',
    vehicleTypeId: '',
    quantity: ''
}

export const emptyWasteItem = {
    itemId: '',
    quantity: '',
    rejectQuantity: '',
}

export const emptyMixedWaste = {
    itemIds: [],
    quantity: '',
    rate: ''
}
