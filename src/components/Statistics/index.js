import LogTable from "../LogTable";
import SideBar from "../SideBar";
import "./index.css"

const Statistics = () => (
    <div>
        <SideBar />
        <div className="d-flex justify-content-center align-items-center">
        <h1>Statistics</h1>
        </div>
        <div className="logTable">
            <LogTable />
        </div>
        
    </div>
)

export default Statistics