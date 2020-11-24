import React, { Component, useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { channels } from "../shared/constants";
const { ipcRenderer } = window;

// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             appName: "",
//             appVersion: "",
//             rows: "",
//         };
//         ipcRenderer.send(channels.APP_INFO);
//         ipcRenderer.on(channels.APP_INFO, (event, arg) => {
//             ipcRenderer.removeAllListeners(channels.APP_INFO);
//             const { appName, appVersion, rows } = arg;
//             this.setState({ appName, appVersion, rows });
//         });
//     }

//     render() {
//         const { appName, appVersion, rows } = this.state;
//         return (
//             <div className='App'>
//                 <header className='App-header'>
//                     <img src={logo} className='App-logo' alt='logo' />
//                     <p>
//                         {appName} version {appVersion}
//                     </p>
//                     <pre>{JSON.stringify(rows, null, 2)}</pre>
//                 </header>
//             </div>
//         );
//     }
// }

const App = () => {
    const [appName, setAppName] = useState("");
    const [appVersion, setAppVersion] = useState("");
    const [rows, setRows] = useState("");

    useEffect(() => {
        ipcRenderer.send(channels.APP_INFO);
        ipcRenderer.on(channels.APP_INFO, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.APP_INFO);
            const { appName, appVersion, rows } = arg;
            setAppName(appName);
            setAppVersion(appVersion);
            setRows(rows);
        });
    }, []);
    // }, [appName, appVersion, rows]);

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>
                    {appName} version {appVersion}
                </p>
                <pre>{JSON.stringify(rows, null, 2)}</pre>
            </header>
        </div>
    );
};
export default App;
