import {useState} from "react";
import PriceFilter from "./PriceFilter";
import FilterButton from "./FilterButton";
import "./SearchBar.css"


function SearchBar(){

    const [showFilter, setShowFilter] = useState(true);
    const [adType, setAdType] = useState("textbook");
    const [priceOrder, setPriceOrder] = useState("not set");
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    const handlePriceFilter = ()=>{

    }

    const priceFilterMenu = <PriceFilter maxPrice={maxPrice} minPrice={minPrice} order={priceOrder} callback={handlePriceFilter}/>

    const handleAdTypeChange = (event)=>{
        console.log(event.target.value);
        setAdType(event.target.value);
    }




    return (
        <div className={"search-bar-container card"}>
            <div className={"search-bar"}>
                <select className={"ad-type-selector"} onChange={handleAdTypeChange}>
                    <option value={"textbook"}>Textbook</option>
                    <option value={"other"}>Other</option>
                </select>
                <input className={"search-bar-input"}/>
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_838_6)">
                        <path d="M24.1913 18.7233H22.9282L22.4805 18.3373C24.0474 16.7078 24.9908 14.5923 24.9908 12.291C24.9908 7.15952 20.338 3 14.5979 3C8.85779 3 4.20496 7.15952 4.20496 12.291C4.20496 17.4225 8.85779 21.582 14.5979 21.582C17.1721 21.582 19.5385 20.7387 21.3613 19.3379L21.793 19.7381V20.8674L29.7875 28L32.1699 25.8702L24.1913 18.7233V18.7233ZM14.5979 18.7233C10.6166 18.7233 7.40278 15.8502 7.40278 12.291C7.40278 8.73185 10.6166 5.85878 14.5979 5.85878C18.5792 5.85878 21.793 8.73185 21.793 12.291C21.793 15.8502 18.5792 18.7233 14.5979 18.7233Z" fill="#595959"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_838_6">
                            <rect width="26.8464" height="24" fill="white" transform="translate(0.849121)"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            {
                showFilter &&
                <div className={"filter-row"}>
                    <div className={"filter-prompt"}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.83333 2.00004H11.1667L6.99166 7.25004L2.83333 2.00004ZM0.541662 1.67504C2.225 3.83337 5.33333 7.83337 5.33333 7.83337V12.8334C5.33333 13.2917 5.70833 13.6667 6.16666 13.6667H7.83333C8.29166 13.6667 8.66666 13.2917 8.66666 12.8334V7.83337C8.66666 7.83337 11.7667 3.83337 13.45 1.67504C13.875 1.12504 13.4833 0.333374 12.7917 0.333374H1.2C0.508329 0.333374 0.116662 1.12504 0.541662 1.67504Z" fill="black"/>
                        </svg>
                        <p>Filter</p>
                    </div>
                    <div className={"filter-btns"}>
                        <FilterButton buttonText={"price"} dropDownMenu={priceFilterMenu} />
                        <FilterButton buttonText={"tag"} dropDownMenu={priceFilterMenu} />

                    </div>
                </div>
            }

        </div>
    );


}

export default SearchBar;