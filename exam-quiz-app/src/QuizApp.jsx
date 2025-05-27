import React, {useState, useEffect} from 'react';

export default function QuizApp() {
    const [quizData, setQuizData] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        fetch("/kstqb_quiz_dataset_cleaned.json")
            .then((res) => res.json())
            .then((data) => setQuizData(data));
    }, []);

    useEffect(() => {
        if (!isFinished) {
            const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
            return () => clearInterval(timer);
        }
    }, [isFinished]);

    if (!quizData.length) return <p>문제를 불러오는 중...</p>;

    const quiz = quizData[currentIndex];
    const selected = answers[quiz.id] || (quiz.question_type === "multiple" ? [] : null);

    const toggleMultiSelect = (choice) => {
        const current = answers[quiz.id] || [];
        const updated = current.includes(choice)
            ? current.filter((v) => v !== choice)
            : [...current, choice];
        setAnswers({...answers, [quiz.id]: updated});
    };

    const selectAnswer = (choice) => {
        if (quiz.question_type === "multiple") {
            toggleMultiSelect(choice);
        } else {
            setAnswers({...answers, [quiz.id]: choice});
        }
    };

    const goNext = () => {
        if (currentIndex < quizData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setIsFinished(true);
        }
    };

    const goPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}분 ${sec}초`;
    };

    const getResults = () => {
        return quizData.map((q) => {
            const correct = Array.isArray(q.answer) ? q.answer.sort().join(",") : q.answer;
            const selected = Array.isArray(answers[q.id]) ? answers[q.id].sort().join(",") : answers[q.id];
            return {
                id: q.id,
                question: q.question,
                correct,
                selected,
                isCorrect: correct === selected
            };
        });
    };

    if (isFinished) {
        const results = getResults();
        const correctCount = results.filter((r) => r.isCorrect).length;

        return (
            <div style={{padding: 20, maxWidth: 600, margin: "auto"}}>
                <h2>결과 요약</h2>
                <p>
                    총 {results.length}문제 중 {correctCount}개 정답 ({Math.round((correctCount / results.length) * 100)}%)
                </p>
                <p><strong>총 소요 시간:</strong> {formatTime(seconds)}</p>
                <ul>
                    {results.map((r) => (
                        <li key={r.id} style={{marginTop: 10}}>
                            <strong>문제 {r.id}</strong>: {r.isCorrect ? "✅ 정답" : `❌ 오답 (선택: ${r.selected || "없음"}, 정답: ${r.correct})`}
                        </li>
                    ))}
                </ul>
                <button onClick={() => {
                    setIsFinished(false);
                    setCurrentIndex(0);
                    setAnswers({});
                    setSeconds(0);
                }}>처음부터 다시
                </button>
            </div>
        );
    }

    return (
        <div style={{display: "flex", padding: 20, maxWidth: 1000, margin: "auto"}}>
            <div style={{flex: 3, border: "1px solid #ccc", padding: 20, borderRadius: 10, marginRight: 20}}>
                <h2>문제 {quiz.id}</h2>
                <p style={{
                    color: '#555',
                    backgroundColor: '#f0f0f0',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    display: 'inline-block',
                    marginBottom: '10px'
                }}>
                    ⏱️ 경과 시간: {formatTime(seconds)}
                </p>
                <p>{quiz.question}</p>

                {quiz.question_type === "matching" && quiz.prompt && (
                    <div style={{backgroundColor: "#f9f9f9", padding: 10, borderRadius: 5, marginBottom: 10}}>
                        <p><strong>매칭 대상:</strong></p>
                        <ul style={{paddingLeft: 20}}>
                            {Object.entries(quiz.prompt).map(([key, val]) => (
                                <li key={key}><strong>{key}.</strong> {val}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div>
                    {Object.entries(quiz.options).map(([key, val]) => (
                        <button
                            key={key}
                            onClick={() => selectAnswer(key)}
                            style={{
                                display: "block",
                                marginTop: 10,
                                backgroundColor: (quiz.question_type === "multiple"
                                    ? selected.includes(key)
                                    : selected === key)
                                    ? "#e0e0e0" : "#fff",
                                width: "100%",
                                padding: 10,
                                textAlign: "left",
                            }}
                        >
                            {key}. {val}
                        </button>
                    ))}
                </div>
                <div style={{marginTop: 20}}>
                    <button onClick={goPrevious} disabled={currentIndex === 0}>
                        이전 문제
                    </button>
                    <button
                        onClick={goNext}
                        style={{marginLeft: 10}}
                        disabled={quiz.question_type === "multiple"
                            ? selected.length === 0
                            : !selected}
                    >
                        {currentIndex === quizData.length - 1 ? "결과 보기" : "다음 문제"}
                    </button>
                </div>
            </div>
            <div style={{flex: 1, border: "1px solid #ccc", borderRadius: 10, padding: 10, height: "fit-content"}}>
                <h3>답안 현황</h3>
                <ul style={{listStyle: "none", padding: 0}}>
                    {quizData.map((q, idx) => (
                        <li
                            key={q.id}
                            style={{
                                marginBottom: 4,
                                cursor: "pointer",
                                fontWeight: idx === currentIndex ? "bold" : "normal",
                                color: answers[q.id] ? "#333" : "#bbb"
                            }}
                            onClick={() => setCurrentIndex(idx)}
                        >
                            {q.id} - {
                            Array.isArray(answers[q.id])
                                ? answers[q.id].join(",")
                                : answers[q.id] || "-"
                        }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
