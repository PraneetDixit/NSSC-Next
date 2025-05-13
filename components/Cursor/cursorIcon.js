import React from "react";

export default function CursorIcon() {
    return (
        <svg viewBox="0 0 32 32" style={{transform: "rotateZ(-15deg)"}}>
            <polygon points="9.7,16 16,30.4 22.3,16 16,1.6 " stroke="white" fill="transparent" strokeWidth={3}></polygon>
            <circle cx="16" cy="16" r="2" fill="white"></circle>
        </svg>
    );
}
