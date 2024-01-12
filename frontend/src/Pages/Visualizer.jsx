import React, { useState } from 'react';
import '../App.css'
import { Button, Box } from '@mui/material';
import TreeCanvas from './TreeCanvas';


function Visualizer() {
  const [code, setCode] = useState([]);
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    //convert to Json object
    const formJson = Object.fromEntries(formData.entries());

    console.log(formJson.code);
    
    // call on parseStringtoTree
    console.log(parseStringtoTree(formJson));
    setCode(parseStringtoTree(formJson));
    
  }

  return (
    <>
    <Box sx={{ display:'flex', gap:'2rem' }}>
    <form method="post" onSubmit={handleSubmit}>
        <p>
          Paste in your data structure definition.
        </p>
        <p className='light'>
          Ex: <em>(define-struct (node) (left right key))</em>
        </p>
        <input type="text" className="input-box" id="type-struct" name="type-struct"></input>
        <br></br>
        <br></br>
        <label>
            Write your code here.
            <br></br>
            <br></br>
       <textarea 
        className='text-field'
        name="code"
        defaultValue="(make-node (make-node (make-node '() '() 1) (make-node '() '() 6) 5) (make-node '() '() 15) 10)"/>
       </label>
        <br></br>
        <br></br>
        <Button type="submit" variant="outlined">Generate</Button>
    </form>
    <TreeCanvas nestedArray={code}/>
   </Box>
    </>
  )
}

let dataStruct = { 
    LEFT: 0,
    RIGHT: 2,
    KEY: 1,
}

//implement a function that takes in the struct 
function parseStringtoTree(inputData){
    // parse data structure from form above
    let inputStr = inputData.code
    const stack = [];
    const result = [];
    let currentNum = '';
    
    for (const char of inputStr) {
        if (char === '(') {
        stack.push([]);
        } else if (char === ')') {
        if (currentNum) {
            stack[stack.length - 1].push(parseInt(currentNum, 10));
            currentNum = '';
        }
        const current = stack.pop();
        if (stack.length) {
            stack[stack.length - 1].push(current);
        } else {
            result.push(current);
        }
        } else if (char.match(/\d/)) {
        currentNum += char;
        } else if (char === ' ' && currentNum) {
        stack[stack.length - 1].push(parseInt(currentNum, 10));
        currentNum = '';
        }
    }
    
    return result;
}

export default Visualizer
