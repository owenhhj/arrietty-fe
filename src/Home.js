import MyProfile from "./components/MyProfile";
import AdDisplayColumn from "./components/AdDisplayColumn";
import "./components/common/common.css"

function Home(){
    return (
        <div className={"home-page page"}>
            <MyProfile/>
            <AdDisplayColumn/>
        </div>
    );
}

export default Home;