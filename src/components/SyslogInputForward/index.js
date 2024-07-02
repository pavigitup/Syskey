import SideBar from "../SideBar";
import LogForm from "../LogsForm";
import "./index.css"

const SyslogInputForward = () => (
    <div>
        <SideBar />
        <div className="d-flex flex-column justify-content-center align-items-center syslog-con">
        <h1>SyslogInputForward</h1>
        <div>
            <LogForm />
        </div>
        </div>
        
        
    </div>
)

export default SyslogInputForward