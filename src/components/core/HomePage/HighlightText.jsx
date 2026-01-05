import React from 'react';

const HighlightText = ({text}) =>{
    return (
        <span className="font-bold" 
         style={{
            background: "linear-gradient(118.19deg, #1FA2FF 3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)",
            WebkitBackgroundClip: "text",
            color: "transparent"
         }}
        >
            {" "}
            {text}
        </span>
    )
}

export default HighlightText;