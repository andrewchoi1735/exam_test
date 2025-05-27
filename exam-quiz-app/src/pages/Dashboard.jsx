import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {summaryTitleMap, quizTitleMap} from "../utils/filenameMap";
import {FaBookOpen, FaPenFancy} from "react-icons/fa"; // 아이콘

export default function Dashboard() {
    const [summaries, setSummaries] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 실제 파일명 기반 목록
        const summaryFiles = ["GEN-AI_Note.json"];
        const quizFiles = ["GEN-AI_EXAM.json"];

        setSummaries(
            summaryFiles.map((file) => ({
                id: file.replace(".json", ""),
                title: summaryTitleMap[file] || file,
                icon: <FaBookOpen size={24} color="#4A90E2"/>
            }))
        );

        setQuizzes(
            quizFiles.map((file) => ({
                id: file.replace(".json", ""),
                title: quizTitleMap[file] || file,
                icon: <FaPenFancy size={24} color="#D96C4E"/>
            }))
        );
    }, []);

    const cardStyle = {
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
        cursor: "pointer",
        transition: "transform 0.2s",
    };

    const cardHover = {
        transform: "scale(1.015)",
    };

    const sectionTitle = {
        fontSize: "20px",
        margin: "24px 0 16px",
    };

    const [hoveredCard, setHoveredCard] = useState(null);

    return (
        <div style={{padding: "20px", maxWidth: "700px", margin: "0 auto"}}>
            <h2 style={sectionTitle}>📚 요약 목록</h2>
            {summaries.map((item, idx) => (
                <div
                    key={item.id}
                    style={{
                        ...cardStyle,
                        ...(hoveredCard === `summary-${idx}` ? cardHover : {}),
                    }}
                    onMouseEnter={() => setHoveredCard(`summary-${idx}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => navigate(`/summary/${item.id}`, "_blank")}
                >
                    {item.icon}
                    <strong>{item.title}</strong>
                </div>
            ))}

            <h2 style={sectionTitle}>📝 문제 목록</h2>
            {quizzes.map((item, idx) => (
                <div
                    key={item.id}
                    style={{
                        ...cardStyle,
                        ...(hoveredCard === `quiz-${idx}` ? cardHover : {}),
                    }}
                    onMouseEnter={() => setHoveredCard(`quiz-${idx}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => navigate(`/quiz/${item.id}`)}
                >
                    {item.icon}
                    <strong>{item.title}</strong>
                </div>
            ))}
        </div>
    );
}
