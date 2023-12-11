const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ hello: "world!" })
})
app.post('/run', (req, res) => {
    console.log('-------------------------------------')
    console.log(req.body);
    console.log('-------------------------------------')
    return req.json(req.body);
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})