import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

const ENDPOINT = import.meta.env.VITE_ENDPOINT
  || 'http://localhost:5000';

function App() {

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState('');
  const handleSubmit = async () => {
    const payload = {
      language, code
    };
    try {
      const { data } = await axios.post(`${ENDPOINT}/run`, payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      if (error.response) {
        const errMsg = error.response.data.error.stderr;
        setOutput(errMsg);
      } else {
        setOutput("Error connecting to sever!");
      }
    }
  }

  return (<>
    <h1>Online Code Compiler</h1>
    <div>
      <label>Language: </label>
      <select value={language}
        onChange={(e) => setLanguage(e.target.value)}>
        <option value="cpp">C++</option>
        <option value="python">Python</option>
      </select>
    </div>
    <hr />
    <textarea onChange={(e) => setCode(e.target.value)}
      cols="75" rows="20">
    </textarea>
    <br />
    <button onClick={handleSubmit}
    >Submit</button>
    <hr />
    <h3>Output : </h3>
    <p>{output}</p>
  </>
  )
}

export default App
