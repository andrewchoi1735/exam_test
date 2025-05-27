import React from 'react';
import {Link, useLocation} from 'react-router-dom';

export default function LNB() {
    const location = useLocation();

    const navItems = [
        {path: '/', label: '📋 대시보드'},
        {path: '/summary/GEN-AI_Note', label: '📝 공부 (요약정리)'},
        {path: '/quiz/GEN-AI_EXAM', label: '📘 문제풀이'},

    ];

    return (
        <aside style={{
            width: '200px',
            backgroundColor: '#f4f4f4',
            padding: '20px',
            borderRight: '1px solid #ddd',
            height: '100vh',
            boxSizing: 'border-box'
        }}>
            <h2 style={{fontSize: '20px', marginBottom: '20px'}}>📚 메뉴</h2>
            <ul style={{listStyle: 'none', padding: 0}}>
                {navItems.map((item) => (
                    <li key={item.path} style={{marginBottom: '12px'}}>
                        <Link
                            to={item.path}
                            style={{
                                textDecoration: 'none',
                                color: location.pathname === item.path ? '#007bff' : '#333',
                                fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                            }}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
