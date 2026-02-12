import { useEffect, useRef, useState } from "react";
import { logEvent } from "../utils/eventLogger";

const generateAttemptId = () =>
  "attempt_" + Date.now() + "_" + Math.random().toString(36).slice(2);

export default function useProctoring() {
  const attemptIdRef = useRef(generateAttemptId());
  const attemptId = attemptIdRef.current;
  const violationLocked = useRef(false);

  const submittedKey = `assessmentSubmitted_${attemptId}`;

  const [violations, setViolations] = useState(0);
  const isSubmitted = useRef(
    localStorage.getItem(submittedKey) === "true"
  );

  const recordViolation = (eventType) => {
  if (isSubmitted.current) return;
  if (violationLocked.current) return; // 🚫 prevent double count

  violationLocked.current = true;

  setViolations((v) => v + 1);

  logEvent({
    eventType,
    attemptId,
    metadata: { visibility: document.visibilityState }
  });

  alert("⚠️ Violation detected!");
};


  useEffect(() => {
  const onVisibilityChange = () => {
    if (document.hidden) {
      recordViolation("TAB_SWITCH_DETECTED");
    } else {
      violationLocked.current = false; // 🔓 unlock on focus return

      logEvent({
        eventType: "FOCUS_RESTORED",
        attemptId
      });
    }
  };

  const onBlur = () => {
    recordViolation("WINDOW_BLUR_DETECTED");
  };

  window.addEventListener("blur", onBlur);
  document.addEventListener("visibilitychange", onVisibilityChange);

  return () => {
    window.removeEventListener("blur", onBlur);
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
}, []);


  const submitAssessment = () => {
    if (isSubmitted.current) return;

    isSubmitted.current = true;

    logEvent({
      eventType: "ASSESSMENT_SUBMITTED",
      attemptId
    });

    localStorage.setItem(submittedKey, "true");

    alert("Assessment submitted. Logs are locked.");
  };

  return {
    violations,
    submitAssessment,
    isSubmitted: isSubmitted.current,
    attemptId
  };
}
