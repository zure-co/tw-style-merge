# Style Manager

## Structure

The plugin follows a structured approach to manage custom styles defined in `tailwind.config.js`:

```
NODE (tailwind.config.js { theme: { "tw-style.merge": .... } })
  -> CLASS (e.g., heading-1, modal-container)
    -> PROPERTY ({ color: 'black' })
    -> PROPERTY ({ fontFamily: 'Arial' })
```

### Example

Here's an example of how a `node` is structured in the `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    "tw-style.merge": { // NODE
      "heading-1": { // CLASS
        "color": "black", // PROPERTY
        "fontFamily": "Arial" // PROPERTY
      },
      "modal-container": { // CLASS
        "backgroundColor": "white", // PROPERTY
        "padding": "16px" // PROPERTY
      }
    }
  }
};
```

---

## Overview

In the `tailwind.config.js` file, the plugin uses what is referred to as a `node`, which is defined by default as `"tw-style-merge"` (this can be customized in the plugin settings).

- `Node`: A key in the `theme` object within `tailwind.config.js`. It represents a group of custom classes.
- `Class`: Each class within a node represents a styled component, such as `heading-1` or `modal-container`.
- `Properties`: Each class contains one or more properties that define the applied styles. For example:
  ```json
  {
    "color": "black",
    "fontFamily": "Arial"
  }
  ```

### Notes

- Properties correspond directly to CSS rules that will be generated.
- The `node` key is customizable, allowing for flexibility in how styles are grouped and named.
