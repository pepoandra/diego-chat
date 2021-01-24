import logo from './logo.svg';
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
                <img src={logo} className="App-logo" alt="logo" />
                <input type="text" name="name" onChange={(event) => setMsg(event.target.value) }/>
                <button onClick={click} >Diegoo3o</button>
                <p>{response}</p>
            </header>
        </div>
    );
}

export default App;