import { FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react';

const FileNode = ({ fileName, nodes, checked, setChecked, onSelect, path }) => {
    const nodeId = `{${fileName}-${Math.floor(Math.random() * 9999)}`
    return (
        <li className='list-none relative before:absolute before:top-9 before:bottom-3 before:left-5 before:w-px before:bg-gray-800'>
            {nodes ?
                (
                    <label htmlFor={nodeId} className="flex peer group justify-between items-center gap-2 px-3 py-2 rounded hover:text-blue-700 cursor-pointer">
                        <div className="flex justify-start items-center gap-3">
                            <FolderIcon className="size-4 text-amber-500 group-has-[:checked]:hidden" />
                            <FolderOpenIcon className="size-4 text-amber-500 hidden group-has-[:checked]:inline-block" />
                            <span className='text-[#CCCCCC] font-bold'>{fileName}</span>
                        </div>
                        <input
                            defaultChecked={checked}
                            type="checkbox"
                            name={nodeId}
                            id={nodeId}
                            onClick={() => setChecked(!checked)}
                            hidden
                        />
                    </label>
                ) : (
                    <div onClick={() => {
                        onSelect(path)
                    }} className="flex items-center gap-3 px-3 py-2 rounded">
                        <FileIcon className="size-4 text-sky-300" />
                        <span className='text-[#CCCCCC] font-medium'>{fileName}</span>
                    </div>
                )
            }
        </li>
    );
}

export default FileNode