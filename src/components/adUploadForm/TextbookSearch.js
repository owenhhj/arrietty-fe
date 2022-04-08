import "./AdUploadForm.css"
import "./TextbookSearch.css"
import {useState} from "react";
import Input from "../common/Input";

function TextbookSearch(
    {
        textbookData,
        courseData,
        onChange,
    }
){
    const [selectedTextbook, setSelectedTextbook] = useState(null);
    let options = [];
    let textbookDataMap = new Map();

    for(let i=0; i<textbookData.length; i++){
        let textbook = textbookData[i];
        options.push(
            {
                name:textbook.title,
                value: textbook.id
            }
        );
        textbookDataMap.set(textbook.id,textbook);
    }

    const handleSearchInputChange = (identifier,textbookId)=>{
        setSelectedTextbook({...textbookDataMap.get(textbookId)});
        onChange(identifier,textbookId);
    }



    return (
        <>
            <Input type={"select-search"} identifier={"tagId"} options={options} inputSize={"large"} onChange={handleSearchInputChange}
                placeholder={selectedTextbook==null?"Select a textbook":selectedTextbook.title}
            />
            {selectedTextbook &&
            <div className={"textbook-info"}>
                <div className={"textbook-info-row"}>
                    <p className={"info-prompt"}>ISBN:</p>
                    <p className={"info-value"}>{selectedTextbook.isbn}</p>
                </div>
                <div className={"textbook-info-row"}>
                    <p className={"info-prompt"}>Author:</p>
                    <p className={"info-value"}>{selectedTextbook.author}</p>
                </div>
                <div className={"textbook-info-row"}>
                    <p className={"info-prompt"}>Edition:</p>
                    <p className={"info-value"}>{selectedTextbook.edition}</p>
                </div>
                <div className={"textbook-info-row"}>
                    <p className={"info-prompt"}>Publisher:</p>
                    <p className={"info-value"}>{selectedTextbook.publisher}</p>
                </div>
                <div className={"textbook-info-row"}>
                    <p className={"info-prompt"}>Related course:</p>
                    <p className={"info-value"}>{selectedTextbook.relatedCourse}</p>
                </div>
                <div className={"textbook-info-row"}>
                    <p className={"info-prompt"}>Original price:</p>
                    <p className={"info-value"}>{selectedTextbook.originalPrice}</p>
                </div>
            </div>
            }
        </>
    );
}


export default TextbookSearch;