import React from 'react'
import FileTreeNode from './FileTreeNode'

const Tree = ({tree, setPath}) => {
  return (
    <div className='w-full'>
      <FileTreeNode fileName={"Cloude IDE"} nodes={tree['tree']} onSelect={setPath} path={''}/>
    </div>
  )
}

export default Tree
