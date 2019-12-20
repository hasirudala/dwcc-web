import React from 'react'
import Button from 'react-bootstrap/Button'
import { AuthContext } from '../../common/AuthContext'


export default function DataEntryButtonPanel({edit, existingRecord, addNextFn, deleteFn}) {
    const { userInfo } = React.useContext(AuthContext)
    return (
        <>
            <Button type="submit" variant={edit ? 'primary' : 'secondary'}>
                Save
            </Button>
            {
                !edit &&
                <Button type="submit" onClick={() => addNextFn(true)} className="ml-3">
                    Save and add next
                </Button>
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
