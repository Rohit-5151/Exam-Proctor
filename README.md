Lightweight Browser Proctoring Script (Localhost Version)
  This project implements a browser-based proctoring mechanism that runs directly on a webpage (tested on http://localhost and https://example.com/)
  It monitors user behavior during an assessment by detecting:
  Tab switches
  Window blur (focus loss)
  Focus restoration
  Copy attempts
  Paste attempts
All events are logged with timestamps and stored locally using localStorage.

Objective
  To simulate an online assessment monitoring system that:
  Detects candidate behavior violations
  Maintains a unified event log
  Prevents multiple violation counts per single action
  Locks logs after submission (immutability)
  Works directly in Chrome without any framework
  
How To Test Functionality
1️⃣ Test Window Blur
    Click outside the browser
    Press Alt + Tab
    Open another application
    Expected:
    Alert appears
    WINDOW_BLUR_DETECTED logged

2️⃣ Test Tab Switch
    Switch to another browser tab
    Minimize browser
    Expected:
    Alert appears
    TAB_SWITCH_DETECTED logged
    Only 1 violation counted (no double count)

3️⃣ Test Focus Restored
    Return to the tab
    Expected:
    FOCUS_RESTORED logged
    No violation increment

4️⃣ Test Copy / Paste
    Press Ctrl + C
    Press Ctrl + V
    Expected:
    COPY_ATTEMPT
    PASTE_ATTEMPT

5️⃣ Submit Assessment
    Expected:
    Logs are locked
    Violations stop increasing
    No new logs added
