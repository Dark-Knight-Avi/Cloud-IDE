import React, { useEffect, useRef } from 'react'
import { Terminal as XTerminal } from '@xterm/xterm'
import socket from '../utils/socket'
import '@xterm/xterm/css/xterm.css'

const Terminal = () => {
  const terminalRef = useRef()
  const isRendered = useRef(false)
  useEffect(() => {
    if (isRendered.current) return
    isRendered.current = true
    const term = new XTerminal({
      rows: 15
    })
    term.open((terminalRef.current))
    term.onData((data) => {
      socket.emit('terminal:write', data)
    })

    socket.on('terminal:data', (data) => {
      term.write(data)
    })
    socket.emit('terminal:write', '\r')
  }, [])


  return (
    <div id='terminal' className='h-full' ref={terminalRef} />
  )

}

export default Terminal
