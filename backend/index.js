const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const { generateFile } = require('./generateFile');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ hello: "world!" })
})
app.post('/run', async (req, res) => {

    const { language = "cpp", code } = req.body;
    if (code === undefined) {
        return res.status(400).json({
            success: false, error: "Empty code body!"
        })
    }

    const filepath = await generateFile(language, code);

    return res.json({ filepath });
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})