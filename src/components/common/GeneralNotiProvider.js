import GeneralNoti from "./GeneralNoti";
import {createContext, useContext, useReducer} from "react";

// >>>>>>>>>>>>>>>>>>>> HOW TO USE
// import {showGeneralNoti} from "./components/common/GeneralNotiProvider";
//
//   const dispatch = showGeneralNoti();
//   const handleShowNoti = (msg, good) => {
//     dispatch({action: "add", body: {msg: msg, good: good}});
//   };
//
// >>>>>>>>>>>>>>>>>>>> HOW TO USE

const GeneralNotiContext = createContext();

function GeneralNotiProvider({children}) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.action) {
      case "add":
        return [{...action.body.body}];
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






