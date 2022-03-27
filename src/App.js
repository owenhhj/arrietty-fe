// import logo from './logo.svg';
import './App.css';
import MyProfile from "./components/MyProfile";
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminTagInputWidget from "./components/admin/AdminTagInputWidget";
import SelectSearch, {fuzzySearch} from "react-select-search";
import "./components/common/select-search.css"
import FilterButton from "./components/searchBar/FilterButton";
import PriceFilter from "./components/searchBar/PriceFilter";
import SearchBar from "./components/searchBar/SearchBar";
import AdListing from "./components/adDisplay/AdListing";
import AdDisplayCard from "./components/adDisplay/AdDisplayCard";
import AdvertisementUploadForm from "./components/advertisementUploadForm/AdvertisementUploadForm";

function App() {
    const options = [
        {
            name: "Annie Cruz",
            value: "annie.cruz",
            photo: "https://randomuser.me/api/portraits/women/60.jpg"
        },
        {
            name: "Eli Shelton",
            disabled: true,
            value: "eli.shelton",
            photo: "https://randomuser.me/api/portraits/men/7.jpg"
        },
        {
            name: "Loretta Rogers",
            value: "loretta.rogers",
            photo: "https://randomuser.me/api/portraits/women/51.jpg"
        },
        {
            name: "Lloyd Fisher",
            value: "lloyd.fisher",
            photo: "https://randomuser.me/api/portraits/men/34.jpg"
        },
        {
            name: "Tiffany Gonzales",
            value: "tiffany.gonzales",
            photo: "https://randomuser.me/api/portraits/women/71.jpg"
        }
    ];
    const ads = [
        {id: 0, username: 'user1', userNetId: 'aa1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling This!!!', textbookTitle: 'Calculus', isbn: '123-4564033823', author: 'Owen', publisher: 'Owens Pub', edition: '3', originalPrice: '998', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:50, comment:'nothing to tell really', createdTime: null},
        {id: 1, username: 'user2', userNetId: 'bb1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Buying This!!!', textbookTitle: 'sdrfg', isbn: '123-4564033823', author: 'Robert', publisher: 'Owens Pub', edition: '3', originalPrice: '3456', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_ad_preview_image.jpg', price:234, comment:'nothing to tell really', createdTime: null},
        {id: 2, username: 'user3', userNetId: 'cc1111', userAvatarImageId: './avatar.jpg', adType: 'textbook', adTitle: 'Selling Buying!!!', textbookTitle: 'Calargculus', isbn: '123-4564033823', author: 'Haha', publisher: 'Owens Pub', edition: '3', originalPrice: '23', relatedCourse: 'CSCISHU 101', otherTag: null, imageIds: './default_cover.jpg', price:34, comment:'nothing to tell really', createdTime: null}
    ]
  return (
    <div className="App">

        {/*<BrowserRouter>*/}
        {/*    <Navbar/>*/}
        {/*    <Routes>*/}
        {/*        <Route  path="/" exact/>*/}
        {/*    </Routes>*/}
        {/*</BrowserRouter>*/}

        <SearchBar/>
        {/*<AdListing />*/}

        {ads.map((ad)=>(<AdDisplayCard key={ad.id} adData={{...ad}} contactInfo={{...ad}}/>))}
        {/*<AdDisplayCard/>*/}
        {/*<AdDisplayCard/>*/}
        {/*<AdDisplayCard/>*/}

        {/*<MyProfile/>*/}
        {/*<AdminTagInputWidget/>*/}
        {/*<AdvertisementUploadForm/>*/}
    </div>
  );
}

export default App;
