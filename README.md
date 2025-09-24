I selected a Bookstore Web App built with React, TailwindCSS, and Express (Node.js backend).
This repo provides a book catalog with categories, free/paid courses, and a card-based UI.

Implemented Feature:-
✅ Search & Filter Books Across Pages
Added a global search bar in Navbar.
When a user searches, they are redirected to the Course page.
The Course page displays only the filtered books (by name or category) in the existing grid layout.
If no results match, a "No books found" message is shown.
Implemented with React Router (useNavigate, useLocation) and query parameters for state persistence.

Evaluation of AI-Generated Code

🟢 What Worked Well
AI generated the Navbar search with routing using useNavigate.
AI integrated filtering directly into the Course.jsx grid (not separate divs).
Query persistence (?search=...) worked as expected.
Search results updated dynamically based on input.

🔴 Shortcomings
AI initially placed filtered results inside Navbar instead of Course page.
State management for search text wasn’t persistent across pages.
Missing validation for empty input (navigating without query still redirected).
Needed refactoring for cleaner conditional rendering of filtered results.

🛠 Suggested Improvements
Sync Navbar input with query string, so search text stays filled after redirect.
Debounce search input (avoid too many state updates on every keystroke).
Add backend search support (for large datasets, instead of frontend-only filtering).
Improve UX: highlight search keywords in results, add category filters/dropdowns.

🔹 Conclusion
This project demonstrated how AI can help implement features quickly, but also highlighted the need for:
Careful validation of AI output.
Manual refactoring to maintain clean and scalable code.
Combining AI with developer insight for best results.
