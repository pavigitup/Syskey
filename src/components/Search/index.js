import SearchViewer from "../SearchViewer";
import SideBar from "../SideBar";
import "./index.css"

const Search = () => (
    <div>
        <SideBar />
        <div className="d-flex flex-column justify-content-center align-items-center w-100 live-stream">
        <h1>Search</h1>
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
        <SearchViewer/>
        </div>
        </div>
        
    </div>
)

export default Search