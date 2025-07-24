import React from 'react'
import { useUIStore } from 'src/store/FormEntryStore';


export const ButtonCloseForm = () => {
    const closeForm = useUIStore((state) => state.closeForm);

    return (
        <button onClick={closeForm}>ButtonCloseForm</button>
    )
}
