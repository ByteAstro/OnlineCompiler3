import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

const ENDPOINT = import.meta.env.VITE_ENDPOINT
  || 'http://localhost:5000';

function App() {

  const [code, setCode] = useState('');
  const handleSubmit = async () => {
    console.log(code);
    const payload = {
      language: "cpp", code
    };
    const output = await axios.post(`${ENDPOINT}/run`, payload);
    console.log(output);
  }

  return (<>
    <h1>Online Code Compiler</h1>
    <hr />
    <textarea onChange={(e) => setCode(e.target.value)}
      cols="75" rows="20">
    </textarea>
    <br />
    <button onClick={handleSubmit}
    >Submit</button>
  </>
  )
}

export default App
