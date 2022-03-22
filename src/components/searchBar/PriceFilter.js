import {useState} from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import "./PriceFilter.css";


function PriceFilter(
    {
        order,
        minPrice,
        maxPrice,
        callback
    }
){

    const [priceOrder, setPriceOrder] = useState(order==null?"not set":order);
    let tmpMinPrice = minPrice;
    let tmpMaxPrice = maxPrice;


    const handlePriceOrderFilterClick = ()=>{
        if(priceOrder==="not set"){
            setPriceOrder("low to high");
        }
        else if (priceOrder==="low to high"){
            setPriceOrder("high to low");
        }
        else if (priceOrder==="high to low"){
            setPriceOrder("not set");
        }
    }

    const handlePriceRangeChange = (identifier, value)=>{
        if(identifier==="minPrice"){
            tmpMinPrice = value;
        }
        else {
            tmpMaxPrice = value;
        }
    }

    const handleClear = ()=>{
        callback("clear", {});

    }

    const handleDone = ()=>{
        callback("done",
            {
                order: priceOrder,
                minPrice: tmpMinPrice,
                maxPrice: tmpMaxPrice
            }
        );
    }



    return (
        <div className={"filter-menu price-filter card"}>
            <div className={"price-order-filter"} onClick={handlePriceOrderFilterClick}>
                <p>{`Order: ${priceOrder}`}</p>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.99999 4.85833L12.6417 7.5L13.8167 6.325L9.99999 2.5L6.17499 6.325L7.35832 7.5L9.99999 4.85833ZM9.99999 15.1417L7.35832 12.5L6.18332 13.675L9.99999 17.5L13.825 13.675L12.6417 12.5L9.99999 15.1417Z" fill="#595959"/>
                </svg>
            </div>
            <div className={"price-range-filter"}>
                <Input type={"price"} identifier={"minPrice"} defaultValue={minPrice} onChange={handlePriceRangeChange} inputSize={"small"}/>
                <p>-</p>
                <Input type={"price"} identifier={"maxPrice"} defaultValue={maxPrice} onChange={handlePriceRangeChange} inputSize={"small"}/>
            </div>
            <div className={"price-filter-button-row"}>
                <Button buttonStyle={"btn--primary"} text={"Done"} buttonSize={"btn--small"} onClick={handleDone}/>
                <Button buttonStyle={"btn--normal"} text={"Clear"} buttonSize={"btn--small"} onClick={handleClear}/>
            </div>
        </div>
    );
}

export default PriceFilter;