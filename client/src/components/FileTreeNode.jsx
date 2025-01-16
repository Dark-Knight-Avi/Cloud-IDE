import React, { useState } from 'react'
import FileNode from './FileNode'

const FileTreeNode = ({ fileName, nodes, path, onSelect }) => {
    const [checked, setChecked] = useState(false)

    return (
        <div className='w-full'>
            <FileNode fileName={fileName} nodes={nodes} path={path} onSelect={onSelect} checked={checked} setChecked={setChecked} />
            {nodes && checked && (
                <ul className='ml-3 select-none overflow-hidden text-sm w-full list-none peer-has-[:checked]:block'>
                    {Object.keys(nodes).map((child, index) => (
                        <FileTreeNode key={index} path={path + '/' + child} fileName={child} nodes={nodes[child]} onSelect={onSelect} />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default FileTreeNode
