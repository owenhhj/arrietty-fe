import "./Input.css"
import SelectSearch, {fuzzySearch} from "react-select-search";
import "./select-search.css"
export default function Input(
    {

        identifier = null,
        placeholder,
        type,
        onChange,
        inputSize = "medium",
        prompt,
        options,
        children,
        defaultValue
    }
){
    // 公共输入组件

    const allowedTypes = ["text","select-search","price","select"]
    const inputSizes = ["large", "medium", "small"];

    const handleNormalInputChange = (event)=>{
        onChange(identifier, event.target.value);
    };

    const handleSelectSearchInputChange = (...args)=>{
        console.log("handleSelectSearchInputChange");
        console.log(args);
        onChange(identifier, args[0]);
    }


    if(type==="select-search"){

        return (
            <div className="custom-input">
                <div className={"input-prompt"}>{prompt}</div>
                <SelectSearch
                    options={options}
                    search
                    filterOptions={fuzzySearch}
                    placeholder={placeholder}
                    onChange={handleSelectSearchInputChange}
                />
            </div>
        );
    }

    if (type==="text"){
        return (
            <div className="custom-input">
                <div className={"input-prompt"}>{prompt}</div>
                <input className={`input-bracket input-bracket--${inputSize}`} type={type} placeholder={placeholder} onChange={handleNormalInputChange}/>
            </div>

        );

    }

    if (type==="price"){
        return (
        <div className="custom-input">
        <div className={"input-prompt"}>{prompt}</div>
            <input className={`input-bracket input-bracket--${inputSize}`} type="number"  min="0" placeholder={placeholder} onInput="validity.valid||(value='');" onChange={handleNormalInputChange} />
        </div>

        );

    }


    if (type==="select"){
        return (
            <div className="custom-input">
                <div className={"input-prompt"}>{prompt}</div>
                <select className={`input-bracket input-bracket--${inputSize}`}  placeholder={placeholder} onChange={handleNormalInputChange} defaultValue={defaultValue}>
                    {children}
                </select>
            </div>

        );

    }






}