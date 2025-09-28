# Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

# reactjs autocomplete
Live Search with Debounce, Caching, Keyboard Navigation, Mouse Interaction, Shortcut Focus, Match Highlighting, No Results Feedback, Scroll Behavior, Blur Handling, Accessibility

### Core Features:

* **Live Search with Debounce:** As the user types, the input is debounced (300ms delay) to avoid excessive API calls. It fetches matching recipes from the DummyJSON API.
* **Caching:** Previously searched queries are cached to reduce redundant network requests and improve performance.
* **Keyboard Navigation:** Users can navigate results using ArrowUp, ArrowDown, Enter, and Escape. The active item is highlighted and scrolls into view.
* **Mouse Interaction:** Clicking a result sets the input and hides the dropdown. A clear button (×) resets the input.
* **Shortcut Focus:** Pressing / anywhere on the page focuses the search input instantly.
* **Match Highlighting:** The part of the recipe name that matches the query is visually highlighted using <mark>.
* **Result Rendering:** Each result shows a thumbnail, name, cuisine, meal types (joined), rating, and review count.
* **No Results Feedback:** If no matches are found after a search, a friendly “No results found” message is shown.
* **Scroll Behavior:** The active item scrolls into view smoothly when navigating with the keyboard.
* **Blur Handling:** The dropdown closes slightly delayed on blur to allow click events to register.
* **Accessibility:** Each result is focusable (tabIndex={0}), improving keyboard and screen reader support.




1. Project Setup
Create a React project (e.g., using Vite or Create React App).

Add a CSS file named FilterComponent.css for styling.

Install TypeScript if not already present.

2. Component Structure
Create FilterComponent.tsx.
Import necessary hooks: useState, useEffect, useRef.
Define the component and export it.

3. State and Refs Initialization
input: stores the current search input.
results: holds fetched recipe results.
showResults: toggles visibility of the dropdown.
activeIndex: tracks the highlighted result for keyboard navigation.
cache: stores previously fetched results to avoid redundant API calls.
hasSearched: indicates whether a search has completed.
abortControllerRef: manages cancellation of previous fetch requests.
inputRef: references the input element for keyboard shortcut focus.
itemRefs: references each result item for scroll behavior.

4. Data Fetching Logic
fetchData(query: string):
Abort previous request if active.
Use AbortController to manage fetch lifecycle.
Check cache before making a network request.
Fetch from https://dummyjson.com/recipes/search?q=${query}.
Update results, cache, and hasSearched.

5. Debounced Search
useEffect with setTimeout:
Debounce input changes by 300ms.
Cancel timeout on cleanup.

6. Keyboard Shortcut
useEffect to listen for / key:
Focus input if not already focused.

7. Scroll to Active Item
useEffect to scroll into view when activeIndex changes.

8. Highlight Matching Text
highlightMatch(text, query):
Finds and wraps matching substring in <mark>.

9. UI Rendering
Input field with:
onChange, onFocus, onBlur, and onKeyDown handlers.
Clear button to reset input.
Results dropdown:
Conditional rendering based on showResults and input.
Display "No results found" if applicable.
Map over results to render each item:
Thumbnail, name with highlight, cuisine, meal type, rating.

10. Final Touches
CSS styling in FilterComponent.css.
Accessibility: tabIndex, keyboard navigation.

