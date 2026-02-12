import React from "react";
import useProctoring from "./hooks/useProctoring";

export default function App() {
  const {
    violations,
    submitAssessment,
    isSubmitted,
    attemptId
  } = useProctoring();

  return (
    <div className="container">
      <h1>Online Assessment</h1>

      <p><strong>Attempt ID:</strong> {attemptId}</p>
      <p><strong>Violations:</strong> {violations}</p>

      <button
        onClick={submitAssessment}
        disabled={isSubmitted}
      >
        {isSubmitted ? "Assessment Submitted" : "Submit Assessment"}
      </button>

      <p className="hint">
        ⚠️ Switching tabs or losing focus is a violation.
      </p>
    </div>
  );
}
