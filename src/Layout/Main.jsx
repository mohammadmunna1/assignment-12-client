import React, { useState } from 'react';
import Header from '../Pages/Shared/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';

const Main = () => {
    const [mode, setMode] = useState('day');

    const dayStyles = {
        backgroundColor: 'white',
        color: 'black',
    };

    const nightStyles = {
        backgroundColor: 'black',
        color: 'white',
    };


    return (
        <div style={mode === 'day' ? dayStyles : nightStyles}>
            <Header setMode={setMode} mode={mode}></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;