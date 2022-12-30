import React, { useState } from 'react';

const App = props => {
    const [name, setName] = useState('');
    const [serverResponse, setServerResponse] = useState('');

   const getServerResponse = name => {
        fetch('http://localhost:5000//api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name
            })
        })
        .then(response => response.json())
        .then(data => {
            setServerResponse(data['server response'])
        })
        .catch(err => console.log('Network error occured'));
    }

    return(
        <main>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={() => getServerResponse(name)}>Send to server</button>
            <h2>{serverResponse}</h2>
        </main>
    )
}

export default App;