import React from 'react';
import { useState } from 'react';

function Color({color}) {
     let [background,setbackground]=useState("green")
    return ( 
        <button onClick={()=>{setbackground({color})}} style={{backgroundColor: color,margin:4}}>{color}</button>
     );
}

export default Color;
