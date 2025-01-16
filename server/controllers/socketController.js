const fs = require('fs').promises;
const os = require('os');
const pty = require('node-pty');
const path = require('path');
const chokidar = require('chokidar');

const initCwd = process.env.INIT_CWD || process.cwd();
const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: path.join(initCwd, 'user'),
    env: process.env,
});

const socketController = (io) => {
    chokidar.watch('./user').on('all', (event, path) => {
        io.emit('file:refresh', path);
    });

    ptyProcess.onData((data) => {
        io.emit('terminal:data', data);
    });

    io.on('connection', (socket) => {
        console.log('Socket connected', socket.id);

        socket.emit('file:refresh');

        socket.on('file:update', async ({ path, content }) => {
            await fs.writeFile(`./user${path}`, content);
        });

        socket.on('terminal:write', (data) => {
            ptyProcess.write(data);
        });
    });
};

module.exports = socketController;
