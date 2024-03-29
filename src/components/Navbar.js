import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import './Navbar.css';
import {dataFetch} from "./common/common";

const pathnameMapper = {
  home: 'home',
  myPosts: 'my-posts',
  favorite: 'favorite',
  notification: 'notification',
  admin: 'admin'
};

function Navbar({isAdmin}) {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const LAST_MOD = process.env.REACT_APP_API_LAST_MOD;
  const NEW_NOTI = process.env.REACT_APP_API_NEW_NOTIFICATION;
  const INTERVAL = process.env.REACT_APP_DEFAULT_REFRESH_INTERVAL * 1000;  // sec * 1000ms
  const [click, setClick] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [lastModHome, setLastModHome] = useState(0);
  const [showDotHome, setShowDotHome] = useState(false);
  const [showDotNoti, setShowDotNoti] = useState(false);
  const homeLink = useRef(null);
  const myPostsLink = useRef(null);
  const favoriteLink = useRef(null);
  const notificationLink = useRef(null);
  const adminLink = useRef(null);

  useEffect(() => {
    let currPath = window.location.pathname.slice(1,);
    setActiveTab(currPath in pathnameMapper ? pathnameMapper[currPath] : 'home');
    dataFetch(
      `${ROOT}${LAST_MOD}`,
      {method: 'GET'},
      (res) => {
        let temp = Date.parse(res);
        setLastModHome(temp);
      },
      null
    );
  }, []);

  // todo if click search button in SearchBar: also update red dot?
  useEffect(() => {
    let intervalID = setInterval(() => {
      updateRedDotHome();
    }, INTERVAL);
    return () => {
      clearInterval(intervalID)
    }
  }, [lastModHome, showDotHome]);

  useEffect(() => {
    let intervalID = setInterval(() => {
      updateRedDotNoti();
    }, INTERVAL);
    return () => {
      clearInterval(intervalID)
    }
  }, [showDotNoti]);

  const updateRedDotHome = () => {
    dataFetch(
      `${ROOT}${LAST_MOD}`,
      {method: 'GET'},
      (res) => {
        let temp = Date.parse(res);
        if (temp > lastModHome) {
          setShowDotHome(true);
        } else {
          setShowDotHome(false);
        }
        setLastModHome(temp);
      },
      null
    );
  };

  const updateRedDotNoti = () => {
    dataFetch(
      `${ROOT}${NEW_NOTI}`,
      {method: 'GET'},
      (res) => {
        if (res) {
          setShowDotNoti(true);
        } else {
          setShowDotNoti(false);
        }
      },
      null
    );
  };

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => {
    setClick(!click);
  };

  const getClickHandler = (tabName) => {
    return (e) => {
      if (tabName === activeTab) {  // already on this page --> refresh this page
        window.location.reload();
        return;
      }
      setActiveTab(tabName);
      if (tabName === "home") {
        setShowDotHome(false);
        homeLink.current.click();
      } else if (tabName === "my-posts") {
        myPostsLink.current.click();
      } else if (tabName === "favorite") {
        favoriteLink.current.click();
      } else if (tabName === "notification") {
        setShowDotNoti(false);
        notificationLink.current.click();
      } else if (tabName === "admin") {
        adminLink.current.click();
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          {/*<img className="navbar-logo-icon" src="./logo-icon.svg" alt=""/>*/}
          &nbsp;  Arrietty
        </Link>
        <Link to="/home" className="navbar-logo navbar-logo-thumbnail">
          &nbsp;  A
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>

          <li className={`nav-item${activeTab === "home" ? "-clicked" : ""}`} onClick={getClickHandler("home")}>
            <svg className={'nav-icon'} xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48">
              <path
                d="M8 42V18L24.1 6L40 18V42H28.3V27.75H19.65V42ZM11 39H16.65V24.75H31.3V39H37V19.5L24.1 9.75L11 19.5ZM24 24.35Z"
                fill={activeTab === "home" ? "#191919" : "#595959"}
              />
              {showDotHome && <circle cx="38" cy="15" r="5" stroke="none" fill="red"/>}
            </svg>

            <Link ref={homeLink} to="/home" className={`nav-links${activeTab === "home" ? "-clicked" : ""}`}
                  onClick={closeMobileMenu}>
              Home
            </Link>
          </li>

          <li className={`nav-item${activeTab === "my-posts" ? "-clicked" : ""}`} onClick={getClickHandler("my-posts")}>
            <svg className={"nav-icon"} width="50" height="50" viewBox="0 0 50 50"
                 fill={activeTab === "my-posts" ? "#191919" : "#595959"} xmlns="http://www.w3.org/2000/svg">
              <path
                d="M39.5833 10.4167V39.5833H10.4167V10.4167H39.5833ZM39.5833 6.25H10.4167C8.125 6.25 6.25 8.125 6.25 10.4167V39.5833C6.25 41.875 8.125 43.75 10.4167 43.75H39.5833C41.875 43.75 43.75 41.875 43.75 39.5833V10.4167C43.75 8.125 41.875 6.25 39.5833 6.25Z"
                fill={activeTab === "my-posts" ? "#191919" : "#595959"}/>
              <path
                d="M29.1668 35.4166H14.5835V31.2499H29.1668V35.4166ZM35.4168 27.0833H14.5835V22.9166H35.4168V27.0833ZM35.4168 18.7499H14.5835V14.5833H35.4168V18.7499Z"
                fill={activeTab === "my-posts" ? "#191919" : "#595959"}/>
            </svg>
            <Link ref={myPostsLink} to="/myPosts" className={`nav-links${activeTab === "my-posts" ? "-clicked" : ""}`}
                  onClick={closeMobileMenu}>
              My posts
            </Link>
          </li>

          <li className={`nav-item${activeTab === "favorite" ? "-clicked" : ""}`} onClick={getClickHandler("favorite")}>
            <svg className={"nav-icon"} width="50" height="50" viewBox="0 0 50 50"
                 fill={activeTab === "favorite" ? "#191919" : "#595959"} xmlns="http://www.w3.org/2000/svg">
              <path
                d="M45.8332 19.2501L30.854 17.9584L24.9998 4.16675L19.1457 17.9792L4.1665 19.2501L15.5415 29.1042L12.1248 43.7501L24.9998 35.9792L37.8748 43.7501L34.479 29.1042L45.8332 19.2501ZM24.9998 32.0834L17.1665 36.8126L19.2498 27.8959L12.3332 21.8959L21.4582 21.1042L24.9998 12.7084L28.5623 21.1251L37.6873 21.9167L30.7707 27.9167L32.854 36.8334L24.9998 32.0834Z"
                fill={activeTab === "favorite" ? "#191919" : "#595959"}/>
            </svg>

            <Link ref={favoriteLink} to="/favorite" className={`nav-links${activeTab === "favorite" ? "-clicked" : ""}`}
                  onClick={closeMobileMenu}>
              Favorite
            </Link>
          </li>

          <li className={`nav-item${activeTab === "notification" ? "-clicked" : ""}`}
              onClick={getClickHandler("notification")}>
            <svg className={"nav-icon"} width="50" height="50" viewBox="0 0 50 50" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M25.0002 45.8333C27.2918 45.8333 29.1668 43.9583 29.1668 41.6666H20.8335C20.8335 43.9583 22.7085 45.8333 25.0002 45.8333ZM37.5002 33.3333V22.9166C37.5002 16.5208 34.1043 11.1666 28.1252 9.74992V8.33325C28.1252 6.60409 26.7293 5.20825 25.0002 5.20825C23.271 5.20825 21.8752 6.60409 21.8752 8.33325V9.74992C15.9168 11.1666 12.5002 16.4999 12.5002 22.9166V33.3333L8.3335 37.4999V39.5833H41.6668V37.4999L37.5002 33.3333ZM33.3335 35.4166H16.6668V22.9166C16.6668 17.7499 19.8127 13.5416 25.0002 13.5416C30.1877 13.5416 33.3335 17.7499 33.3335 22.9166V35.4166Z"
                fill={activeTab === "notification" ? "#191919" : "#595959"}/>
              {showDotNoti && <circle cx="38" cy="15" r="5" stroke="none" fill="red"/>}
            </svg>

            <Link ref={notificationLink} to="/notification"
                  className={`nav-links${activeTab === "notification" ? "-clicked" : ""}`} onClick={closeMobileMenu}>
              Notification
            </Link>
          </li>

          {isAdmin &&
            <li className={`nav-item${activeTab === "admin" ? "-clicked" : ""}`} onClick={getClickHandler("admin")}>
              <svg className={"nav-icon"} width="50" height="50" viewBox="0 0 50 50" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M35.4168 34.6249C36.7055 34.6249 37.7502 33.5803 37.7502 32.2916C37.7502 31.0029 36.7055 29.9583 35.4168 29.9583C34.1282 29.9583 33.0835 31.0029 33.0835 32.2916C33.0835 33.5803 34.1282 34.6249 35.4168 34.6249Z"
                  fill={activeTab === "admin" ? "#191919" : "#595959"}/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M35.4167 36.4583C33.8958 36.4583 30.8542 37.2083 30.75 38.7083C31.7917 40.1874 33.5 41.1458 35.4167 41.1458C37.3333 41.1458 39.0417 40.1874 40.0833 38.7083C39.9792 37.2083 36.9375 36.4583 35.4167 36.4583Z"
                      fill={activeTab === "admin" ? "#191919" : "#595959"}/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M37.5 23.1042V13.0625L21.875 6.25L6.25 13.0625V23.2917C6.25 32.75 12.9167 41.6042 21.875 43.75C23.0208 43.4792 24.125 43.0833 25.2083 42.6042C27.4583 45.8125 31.1875 47.9167 35.4167 47.9167C42.3125 47.9167 47.9167 42.3125 47.9167 35.4167C47.9167 29.2292 43.4167 24.1042 37.5 23.1042ZM22.9167 35.4167C22.9167 36.5833 23.0833 37.7292 23.3958 38.7917C22.8958 39.0208 22.3958 39.25 21.875 39.4167C15.2708 37.3333 10.4167 30.5833 10.4167 23.2917V15.7917L21.875 10.7917L33.3333 15.7917V23.1042C27.4167 24.1042 22.9167 29.2292 22.9167 35.4167ZM35.4167 43.75C30.8125 43.75 27.0833 40.0208 27.0833 35.4167C27.0833 30.8125 30.8125 27.0833 35.4167 27.0833C40.0208 27.0833 43.75 30.8125 43.75 35.4167C43.75 40.0208 40.0208 43.75 35.4167 43.75Z"
                      fill={activeTab === "admin" ? "#191919" : "#595959"}/>
              </svg>

              <Link ref={adminLink} to="/admin" className={`nav-links${activeTab === "admin" ? "-clicked" : ""}`}
                    onClick={closeMobileMenu}>
                Admin
              </Link>
            </li>
          }

        </ul>
      </div>
    </nav>


  )

}

export default Navbar;

