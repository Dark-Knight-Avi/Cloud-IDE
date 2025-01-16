const emptyState = {
    fileTree: null,
    path: "",
    fileContent: "",
    openedFiles: [],
    activeFile: {
        name: "",
        index: null,
        language: "",
        content: ""
    },
    checked: false
}

let initialState;

if (JSON.parse(localStorage.getItem("cloude_ide_local_state")))
    initialState = JSON.parse(localStorage.getItem("cloude_ide_local_state"))
else
    initialState = emptyState;

export default initialState