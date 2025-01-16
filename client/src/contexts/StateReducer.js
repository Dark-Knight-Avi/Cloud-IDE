const StateReducer = (state, action) => {
    switch(action.type) {
        case "UPDATE_FILE_TREE":
            return {
                ...state,
                fileTree: action.payload
            }
        case "UPDATE_PATH":
            return {
                ...state,
                path: action.payload.path,
                fileContent: action.payload.content
            }
        case "UPDATE_OPENED_FILES":
            return {
                ...state,
                openedFiles: action.payload
            }
        case "UPDATE_ACTIVE_FILE":
            return {
                ...state,
                activeFile: action.payload
            }
        case "TOGGLE_CHECK":
            return {
                ...state,
                checked: !state.checked
            }

        default:
            return state
    }
}

export default StateReducer