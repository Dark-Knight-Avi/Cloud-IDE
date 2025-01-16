import { createContext, useReducer } from "react";
import { languages } from "monaco-editor"

import initialState from "./initialState";
import StateReducer from "./StateReducer";

export const StateContext = createContext(initialState)

const StateContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(StateReducer, initialState)

    const getFileTree = async () => {
        const response = await fetch('/api/files').then(resp => resp.json())
        dispatch({
            type: "UPDATE_FILE_TREE",
            payload: response
        })
    }

    const setPath = async (path) => {
        const openedPathContent = state.openedFiles.find(file => file.path === path)
        let fileContent = null
        if (path !== "" && !openedPathContent) {
            const response = await fetch(`/api/files/content?path=${path}`).then(resp => resp.json())
            fileContent = response.content
        } else if (path !== "" && openedPathContent){
            fileContent = openedPathContent.content
        }
        dispatch({
            type: "UPDATE_PATH",
            payload: {
                path,
                content: fileContent
            }
        })
    }

    const setOpenedFiles = (openedFiles) => {
        dispatch({
            type: "UPDATE_OPENED_FILES",
            payload: openedFiles
        })
    }

    const setActiveFile = (fileName, index, fileContent="") => {
        const extension = `.${fileName?.split('.').pop()}`;

        const language = languages.getLanguages().find((lang) => {
            if (lang.extensions) {
                return lang.extensions.includes(extension);
            }
            return false;
        });

        dispatch({
            type: "UPDATE_ACTIVE_FILE",
            payload: {
                name: fileName,
                index,
                language: language.id,
                content: fileContent
            }
        })
    }

    const toggleCheck = () => {
        dispatch({
            type: "TOGGLE_CHECK",
        })
    }


    return (
        <StateContext.Provider value={{ state, getFileTree, setPath, setOpenedFiles, setActiveFile, toggleCheck }}>
            {children}
        </StateContext.Provider>
    )
}

export default StateContextProvider