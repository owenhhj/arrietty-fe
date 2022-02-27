import React from "react";
import "./Button.css"

export default function Button(
    {
        text,
        buttonStyle,
        buttonSize,
        onClick
    }
){

    const buttonStyles = ["btn--primary", "btn--normal", "btn--warning"];
    const buttonSizes = ["btn--large", "btn--medium", "btn--small"];

    const getButtonStyle = ()=>{
        return buttonStyles.includes(buttonStyle)?buttonStyle:buttonStyles[0];
    };

    const getButtonSize = ()=>{
        return buttonSizes.includes(buttonSize)?buttonSize:buttonSizes[0];
    };


    return (
        <button className={`btn ${getButtonStyle()} ${getButtonSize()}`} onClick={onClick}>{text}</button>
    );

}