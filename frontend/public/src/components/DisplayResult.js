import React from 'react';

const DisplayResult = ({ response, selectedOptions }) => {
    const selectedKeys = selectedOptions.map(option => option.value);
    const result = {};

    selectedKeys.forEach(key => {
        result[key] = response[key];
    });

    return (
        <div>
            <h2>Response:</h2>
            <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
    );
};

export default DisplayResult;
