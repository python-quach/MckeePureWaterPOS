import React, { useState, useEffect } from 'react';
import { channels } from '../shared/constants';
const { ipcRenderer } = window;

const App = () => {
    const [rows, setRows] = useState('');

    useEffect(() => {
        ipcRenderer.send(channels.APP_INFO);
        ipcRenderer.on(channels.APP_INFO, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.APP_INFO);
            const { rows } = arg;
            console.table(rows);
            setRows(rows);
        });
    }, []);

    return <pre>{JSON.stringify(rows, null, 2)}</pre>;
};
export default App;
