import React, {useState} from "react"

export const ModalContext = React.createContext()

export const ModalContextProvider = (props) => {
    const [modals, setModals] = useState([])

    return(
        <ModalContext.Provider
            value={{
                modals, setModals
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}
