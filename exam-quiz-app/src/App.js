import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import QuizApp from './pages/QuizApp';
import SummaryViewer from './pages/SummaryViewer';
import LNB from './componets/LNB';

export default function App() {
    return (
        <BrowserRouter>
            <div style={{display: 'flex', height: '100vh', fontFamily: 'sans-serif'}}>
                <LNB/>
                <div style={{flex: 1, padding: '20px', overflowY: 'auto'}}>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/quiz/:quizId" element={<QuizApp/>}/>
                        <Route path="/summary/:id" element={<SummaryViewer/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}
