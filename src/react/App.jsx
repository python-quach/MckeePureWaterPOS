import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { channels } from '../shared/constants';
const { ipcRenderer } = window;

const App = () => {
    const [appName, setAppName] = useState('');
    const [appVersion, setAppVersion] = useState('');
    const [rows, setRows] = useState('');

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
