const fs = require('fs').promises;
const path = require('path');

const initCwd = process.env.INIT_CWD || process.cwd();

const buildTree = async (currentDir, currentTree = {}) => {
    const files = await fs.readdir(currentDir);

    for (const file of files) {
        const filePath = path.join(currentDir, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            currentTree[file] = {};
            await buildTree(filePath, currentTree[file]);
        } else {
            currentTree[file] = null;
        }
    }

    return currentTree;
};

const getFileTree = async (req, res) => {
    try {
        const fileTree = await buildTree(path.join(initCwd, 'user'));
        return res.json({ tree: fileTree });
    } catch (error) {
        console.error('Error generating file tree:', error);
        return res.status(500).json({ error: 'Unable to generate file tree' });
    }
};

const getFileContent = async (req, res) => {
    try {
        const filePath = req.query.path;
        const content = await fs.readFile(`./user${filePath}`, 'utf-8');

        return res.json({ content });
    } catch (error) {
        console.error('Error reading file:', error);
        return res.status(500).json({ error: 'Unable to read the file' });
    }
};

module.exports = {
    getFileTree,
    getFileContent,
};
