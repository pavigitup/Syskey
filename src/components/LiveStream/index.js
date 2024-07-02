import LogViewer from "../LogViewer";
import SideBar from "../SideBar";
import "./index.css"

const LiveStream = () => (
    <div>
        <SideBar />
        <div className="d-flex flex-column justify-content-center align-items-center w-100 live-stream">
        <h1>LiveStream</h1>
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
        <LogViewer/>
        </div>
        </div>
        
    </div>
)

export default LiveStream