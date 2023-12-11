const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const dirCodes = path.join(__dirname, "codes");
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: trues });
}

const generateFile = async (format, content) => {
    const joibId = uuidv4();
    const filename = `${joibId}.${format}`;
    const filepath = path.join(dirCodes, filename);
    await fs.writeFileSync(filepath, content);
    return filepath;
};

module.exports = { generateFile };