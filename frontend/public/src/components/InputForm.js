import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import DisplayResult from './DisplayResult';

const InputForm = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'numbers', label: 'Numbers' },
        { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedInput = JSON.parse(input);
            const result = await axios.post('https://your-backend-url/bfhl', parsedInput);
            setResponse(result.data);
        } catch (error) {
            console.error('Error:', error);
            alert('Invalid JSON input or server error.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows="4"
                    cols="50"
                    placeholder='Enter JSON input here...'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <Select
                options={options}
                isMulti
                onChange={setSelectedOptions}
            />
            {response && <DisplayResult response={response} selectedOptions={selectedOptions} />}
        </div>
    );
};

export default InputForm;
