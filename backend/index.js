const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const app = express();
dotenv.config();
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { executePy } = require('./executePy');

const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ hello: "world!" })
})

app.post('/run', async (req, res) => {
    const { language = "cpp", code } = req.body;
    console.log(language, code.length);
    if (code === undefined) {
        return res.status(400).json({
            success: false, error: "Empty code body!"
        })
    }

    try {
        const filepath = await generateFile(language, code);
        let output;
        if (language === "cpp") {
            output = await executeCpp(filepath);
        } else if (language === "python") {
            output = await executePy(filepath);
        }
        return res.json({ filepath, output });
    } catch (error) {
        return res.status(500).json({ error });
    }

})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})