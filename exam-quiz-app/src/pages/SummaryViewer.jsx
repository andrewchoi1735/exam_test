import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {summaryTitleMap} from "../utils/filenameMap";

export default function SummaryViewer() {
    const {id} = useParams(); // 예: GEN-AI_Note
    const [sections, setSections] = useState([]);

    useEffect(() => {
        fetch(`/summaries/${id}.json`)
            .then((res) => res.json())
            .then(setSections)
            .catch((err) => {
                console.error("요약 데이터를 불러오지 못했습니다:", err);
            });
    }, [id]);

    const cardStyle = {
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)"
    };

    return (
        <div style={{padding: "24px", maxWidth: "800px", margin: "0 auto"}}>
            <h2 style={{marginBottom: "24px"}}>📚 {summaryTitleMap["GEN-AI_Note.json"]}요약 정리</h2>
            {sections.map((item, idx) => (
                <div key={idx} style={cardStyle}>
                    <h3>{item.section}</h3>
                    <p>{item.summary}</p>
                    {item.evidence && (
                        <>
                            <h4 style={{marginTop: "12px"}}>📌 근거</h4>
                            <ul>
                                {item.evidence.map((ev, i) => (
                                    <li key={i}>{ev}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
