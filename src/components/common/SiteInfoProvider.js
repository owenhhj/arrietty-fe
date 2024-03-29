import {createContext, useContext, useEffect, useState} from "react";
import {dataFetch} from "./common";

////////// HOW TO USE
// import {getSiteInfo};
// const MY_NETID = getSiteInfo().netId;
////////// Caution: if called somewhere before `SiteInfoProvider` is rendered, may not get real data...
////////// pending improvements

const SiteInfoContext = createContext();  // `getSiteInfo` to get the object
const SetSiteInfoContext = createContext();  // `setSiteInfo` to set the object

const defaultSiteInfo = {
  isAdmin: false,
  netId: '',
  username: '',
};

// `children` --> all components wrapped in this provider, in `index.js`
function SiteInfoProvider({children}) {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const [siteInfo, setSiteInfo] = useState(defaultSiteInfo);

  useEffect(() => {
    dataFetch(
      ROOT+"profile?userId=",
      {method: 'GET'},
      (res) => {
        setSiteInfo({...siteInfo, ...res});
      },
      null
    );
  }, []);

  return (
    <SiteInfoContext.Provider value={siteInfo}>
      <SetSiteInfoContext.Provider value={setSiteInfo}>
        {children}
      </SetSiteInfoContext.Provider>
    </SiteInfoContext.Provider>
  );
}

export default SiteInfoProvider;

// custom hooks to be used anywhere wrapped in `index.js`
export const getSiteInfo = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContext(SiteInfoContext);  // returns an object
}

export const setSiteInfo = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContext(SetSiteInfoContext);  // returns a setState function
}

