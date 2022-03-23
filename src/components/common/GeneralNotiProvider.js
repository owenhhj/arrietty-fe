import GeneralNoti from "./GeneralNoti";
import {createContext, useContext, useReducer} from "react";

const GeneralNotiContext = createContext();

function GeneralNotiProvider({children}) {
  const[state, dispatch] = useReducer((state, action) => {
    switch (action.action) {
      case "add":
        return [{...action.body.body}];  // why body.body
      default:
        return [];
    }
  }, []);  // useReducer needs 3rd arg, this works without 3rd arg

  return (
    <GeneralNotiContext.Provider value={dispatch}>

      {state.map((noti, index) => {return (<GeneralNoti {...noti} dispatch={dispatch} key={index}/>)})}
      {children}
    </GeneralNotiContext.Provider>
  );
}

export const showGeneralNoti = () => {
  // TODO why eslint prohibits this
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useContext(GeneralNotiContext);
  return (noti) => {
    dispatch({
      action: "add",
      body: {...noti}
    })
  }
}

export default GeneralNotiProvider;






