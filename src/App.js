import {  Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import LiveStream from "./components/LiveStream";
import Search from "./components/Search";
import Statistics from "./components/Statistics";
import SyslogInput from "./components/SyslogInputForward";
import NotFound from "./components/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => (
    <div>
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Dashboard/>} />
            <Route path="/livestream" element={<LiveStream/>} />
            <Route path="/search" element={<Search/>} />
            <Route path="/statistics" element={<Statistics/>}/>
            <Route path="/syslog-input" element={<SyslogInput/>}/>
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
    </div>
       

);

export default App;
