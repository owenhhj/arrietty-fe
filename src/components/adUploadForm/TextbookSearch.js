import "./AdUploadForm.css"
import "./TextbookSearch.css"
import {useState} from "react";
import Input from "../common/Input";
import TextbookSearchShowSelected from "./TextbookSearchShowSelected";

function TextbookSearch(
  {
    textbookData,
    courseData,
    onChange,
  }
) {
  const [selectedTextbook, setSelectedTextbook] = useState(null);
  let options = [];
  let textbookDataMap = new Map();

  for (let i = 0; i < textbookData.length; i++) {
    let textbook = textbookData[i];
    options.push(
      {
        name: textbook.title,
        value: textbook.id
      }
    );
    textbookDataMap.set(textbook.id, textbook);
  }

  const handleSearchInputChange = (identifier, textbookId) => {
    setSelectedTextbook({...textbookDataMap.get(textbookId)});
    onChange(identifier, textbookId);
  }


  return (
    <>
      <Input type={"select-search"} identifier={"tagId"} options={options} inputSize={"large"}
             onChange={handleSearchInputChange}
             placeholder={selectedTextbook == null ? "Select a textbook" : selectedTextbook.title}
      />

      {selectedTextbook && <TextbookSearchShowSelected selectedTextbook={selectedTextbook}/>}
    </>
  );
}


export default TextbookSearch;

