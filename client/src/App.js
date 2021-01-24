import pelota from './pelota.png'
import diegote from './diegote.png'

import './App.css';
import { useState } from 'react';

function App() {
    const [msg, setMsg] = useState('');
    const [response, setResponse] = useState('');

    const sendMsg = (msg) => {
        fetch(`http://localhost:8000?msg=${msg}`,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
              },
            },
        ).then(res => {
            if (res.ok) {
                res.json().then(json => {
                    setResponse(json.response);
                });
            }
        }).catch(() => {
            setResponse('El Diego esta de gira.');
        })
    };

    const click = () => {
        sendMsg(msg);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={pelota} className="App-logo"/>
                <img src={diegote} className="diegote" />

                <input type="text" name="name" onChange={(event) => setMsg(event.target.value) }/>
                <button onClick={click} >Hablale al Diegote</button>
                <p>{response}</p>
            </header>
        </div>
    );
}

export default App;
