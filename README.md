# reactjs-autocomplete
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
