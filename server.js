const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const userDetails = {
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123"
};


app.get('/bfhl', (req, res) => {
    res.status(200).json({ "operation_code": 1 });
});


app.post('/bfhl', (req, res) => {
    const inputData = req.body.data;
    if (!inputData) {
        return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const numbers = inputData.filter(item => !isNaN(item));
    const alphabets = inputData.filter(item => isNaN(item));
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());

    let highestLowercaseAlphabet = lowercaseAlphabets.sort().pop() || '';

    res.json({
        is_success: true,
        ...userDetails,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
