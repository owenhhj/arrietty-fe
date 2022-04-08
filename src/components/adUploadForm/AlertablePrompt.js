import "./AlertablePrompt.css"

function AlertablePrompt(
    {
        promptText,
        alertText,
        required,
        alerted
    }
){
    return (
        <div className={"alertable-prompt"}>
            {promptText && <p className={"form-prompt"}>{promptText}</p>}
            {required && <p className={"asterisk"}>*</p>}
            {alerted && <p className={"alert"}>{alertText}</p>}
        </div>
    );

}

export default AlertablePrompt;