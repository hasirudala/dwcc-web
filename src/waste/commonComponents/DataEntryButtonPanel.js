import React from 'react'
import Button from 'react-bootstrap/Button'
import LoaderButton from 'react-bootstrap-button-loader'
import { useFormikContext } from 'formik'

import { AuthContext } from '../../common/AuthContext'


export default function DataEntryButtonPanel({edit, existingRecord, addNextFn, deleteFn}) {
    const { userInfo } = React.useContext(AuthContext)
    const { isSubmitting } = useFormikContext()
    return (
        <>
            <LoaderButton type="submit"
                          loading={isSubmitting}
                          variant={edit ? 'primary' : 'secondary'}
            >
                Save
            </LoaderButton>
            {
                !edit &&
                <LoaderButton type="submit"
                              onClick={() => addNextFn(true)}
                              loading={isSubmitting}
                              className="ml-3"
                >
                    Save and add next
                </LoaderButton>
            }
            {
                !edit &&
                <Button type="reset" variant="secondary" className="ml-auto">Reset</Button>
            }
            {
                edit && userInfo.isAdmin &&
                <Button onClick={() => deleteFn(existingRecord)} variant="danger"
                        className="ml-auto"
                >
                    Delete
                </Button>
            }
        </>
    )
}
