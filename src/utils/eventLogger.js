const LOG_KEY = "proctoring_logs";

const getStoredLogs = () => {
  return JSON.parse(localStorage.getItem(LOG_KEY)) || [];
};

const saveLogs = (logs) => {
  localStorage.setItem(LOG_KEY, JSON.stringify(logs));
};

export const logEvent = ({
  eventType,
  attemptId,
  questionId = null,
  metadata = {}
}) => {
  const submittedKey = `assessmentSubmitted_${attemptId}`;

  if (localStorage.getItem(submittedKey) === "true") return;

  const logs = getStoredLogs();

  const event = {
    eventType,
    timestamp: new Date().toISOString(),
    attemptId,
    questionId,
    metadata: {
      browser: navigator.userAgent,
      focusState: document.hasFocus(),
      ...metadata
    }
  };

  logs.push(event);
  saveLogs(logs);
};
