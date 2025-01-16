import React, { useEffect, useRef, useContext, useState, act } from 'react'
import './App.css'
import Terminal from './components/Terminal'
import Tree from './components/Tree'
import socket from './utils/socket'
import { X } from "lucide-react"
// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-javascript";
// import "ace-builds/src-noconflict/theme-github";
// import "ace-builds/src-noconflict/ext-language_tools";
import Editor from '@monaco-editor/react'
import { StateContext } from './contexts/StateContext'

const App = () => {
  const isInitialRender = useRef(true);
  const { state, getFileTree, setPath, setOpenedFiles, setActiveFile } = useContext(StateContext)
  const { path, fileContent, fileTree, openedFiles, activeFile } = state


  useEffect(() => {
    localStorage.setItem("cloude_ide_local_state", JSON.stringify(state))
  }, [state])

  useEffect(() => {
    getFileTree()
    socket.on('file:refresh', getFileTree)
    return () => {
      socket.off('file:refresh', getFileTree)
    }
  }, [])


  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    const fileName = path?.split('/').at(-1);
    if (openedFiles.length === 0 && path !== "") {
      setActiveFile(fileName, 0, fileContent);
      setOpenedFiles([{ path, fileName, content: fileContent }]);
    } else {
      const updated_file_paths = openedFiles.map(file => file.path);
      if (!updated_file_paths.includes(path) && path !== "") {
        setActiveFile(fileName, openedFiles.length, fileContent);
        setOpenedFiles([...openedFiles, { path, fileName, content: fileContent }]);
      }
    }
  }, [path, openedFiles]);



  useEffect(() => {
    if (activeFile.content) {
      const timer = setTimeout(() => {
        socket.emit('file:update', {
          path: path,
          content: fileContent
        })
      }, 0)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [activeFile])


  return (
    <div className='flex justify-between items-center flex-col w-screen min-h-screen bg-[#181818]'>
      <div className="editor_container flex justify-start items-start w-full h-full ">
        <div className="files min-w-[20vw] h-full ">
          {fileTree && (<Tree tree={fileTree} setPath={setPath} />)}
        </div>
        <div className="editor flex-1 h-full">
          {path && (
            <div className="flex justify-start items-start flex-col w-full">
              <div className="flex justify-start items-center w-full bg-[#181818]">
                {openedFiles.length > 0 && (
                  openedFiles.map((file, index) => file.fileName !== "" && (
                    <div
                      key={file.path}
                      onClick={() => {
                        setPath(file.path)
                        setActiveFile(file.fileName, index, file.content)
                      }}
                      className={`px-2 py-1 min-w-20 hover:cursor-pointer h-full flex justify-between items-center mr-1 ${path === file.path ? "bg-[#1E1E1E] border-t-2 border-blue-700" : "bg-[#181818]"
                        }`}
                    >
                      <p className='text-white text-md mx-2'>{file.fileName}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const new_openedFiles = openedFiles.filter((cur_file) => cur_file.path !== file.path);
                          setOpenedFiles(new_openedFiles);
                          if (new_openedFiles.length > 0) {
                            if (activeFile.index === openedFiles.length - 1 || file.path === path) {
                              setPath(openedFiles.at(index - 1).path);
                              setActiveFile(openedFiles[index - 1].fileName, index - 1, openedFiles[index - 1].content)
                            } else if (activeFile.index === 0 && openedFiles.length >= 1 && index === 0) {
                              setPath(openedFiles.at(0).path);
                              setActiveFile(openedFiles[0].fileName, 0, openedFiles[0].content)
                            }
                          } else {
                            setOpenedFiles([])
                            setPath("")
                            setActiveFile("", null, "")
                          }
                        }}
                        className="hover:cursor-pointer"
                      >
                        <X className='h-4 w-4 text-white' />
                      </button>
                    </div>
                  ))
                )}

              </div>
              {/* <AceEditor className='w-full' width='100%'/> */}
              {openedFiles.length > 0 && (<Editor
                height="59vh"
                language={activeFile.language}
                value={activeFile.content}
                theme='vs-dark'
                onChange={(value, event) => {
                  setActiveFile(activeFile.name, activeFile.index, value)
                  const new_openedFiles = openedFiles.map((file) => {
                    if (file.path === path) {
                      return { ...file, content: value }
                    }
                    return file
                  })
                  setOpenedFiles(new_openedFiles)
                }}
              />)}
            </div>
          )}

        </div>
      </div>
      <div className="terminal_container w-full cursor-row-resize resize-y">
        <Terminal fileTree={fileTree} setFileTree={getFileTree} />
      </div>
    </div>
  )
}

export default App
