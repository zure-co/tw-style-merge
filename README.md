# StyleMerge

The **TwStyleMerge** is a Tailwind CSS plugin that enables you to create CSS classes with multiple properties directly in the `tailwind.config.js` file. This eliminates the need to use directives like `@apply` in your CSS files, streamlining and organizing your styling workflow.

## 🛠️ Features

- Create custom utility classes based on the Tailwind theme.
- Using a variable to reference styles already existing in tailwind.config.js
- Set a custom prefix for your classes.

---

## 🚀 Installation

Install the plugin via **npm**:

```bash
npm install tw-style-merge
```

---

## ⚙️Configuration

Add the plugin to your `tailwind.config.js` file and define your custom styles under the `tw-style-merge` theme key:

```javascript
// tailwind.config.js
const twStyleMerge = require('tw-style-merge')

module.exports = {
  plugins: [
    twStyleMerge()
  ],
  theme: {
    // plugin configuration
    "tw-style-merge": {
       "heading-1": {
         "fontFamily": "Arial",
   	 "color": "#000000"
       }
    }
  },
}
```

> This setting also works inside `theme.extends`

### Plugin typing inside tailwind.config.js

To type the plugin inside `tailwind.config.js` just add this [JSDoc Type Annotation](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html).

```javascript
/** @type {import('tw-style-merge').TwStyleMerge} */
const styleMerge = require('tw-style-merge')
```

## 💡 Usage

After configuring the plugin, you can use the generated classes in your HTML:

```html
<h1 class="heading-1">Main heading</h1>
```

> If you're using an external plugin for Tailwind class suggestions, such as **[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)** , the `IntelliSense` will work seamlessly, displaying all attributes and properties of the configured classes.

## Adding prefix to classes

### Setting prefix

To set a prefix for your custom classes, simply configure it in the plugin declaration within the `tailwind.config.js` file as follows:

```javascript
// tailwind.config.js

module.exports = {
   // ...
   plugins: [
     styleMerge({ prefix: 'my-prefix' }),
   ],
}
```

### Using your prefixed classes

```html
<h1 class="my-prefix-heading-1">Main heading</h1>
```

---

## 📝 Using variables

With  **TwStyleMerge** , you can use variables to reference properties already defined in your `tailwind.config.js`, making it easier to maintain consistency and reuse styles.

### Usage example

```javascript
// tailwind.config.js
const twStyleMerge = require('tw-style-merge')

module.exports = {
  plugins: [
    twStyleMerge()
  ],
  theme: {
    "colors": {
       "primary": {
          "dark": "#0000ff"
        }
     },
  
    "tw-style-merge": {
       "heading-1": {
         "fontFamily": "Arial",
   	 "color": "$primary.dark" // The plugin will look for the primary.dark attribute within the colors configuration. 
       }
    }
  },
}
```

### ↔️ Variable Correlation

The plugin will retrieve the value of each declared variable within its corresponding context. For example:

* Variables declared under the `color` property will be fetched from `colors`.
* Variables under the `fontFamily` property will be fetched from `fontFamily`.
* For properties like `margin`, `padding`, `width`, etc., the plugin will fetch values from `spacing`.

Below is a table mapping CSS properties to their corresponding sections in the `tailwind.config.js` file:

| Tailwind theme         | CSS Property                                                                                                                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `colors`             | `color`                                                                                                                                                                              |
| `fontFamily`         | `fontFamily`                                                                                                                                                                         |
| `fontSize`           | `fontSize`                                                                                                                                                                           |
| `spacing`            | `width`, `height`, `padding`, `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom`, `margin`, `marginLeft`, `marginRight`, `marginTop`, `marginBottom` |
| `borderRadius`       | `borderRadius`                                                                                                                                                                       |
| `boxShadow`          | `boxShadow`                                                                                                                                                                          |
| `opacity`            | `opacity`                                                                                                                                                                            |
| `zIndex`             | `zIndex`                                                                                                                                                                             |
| `lineHeight`         | `lineHeight`                                                                                                                                                                         |
| `letterSpacing`      | `letterSpacing`                                                                                                                                                                      |
| `maxWidth`           | `maxWidth`                                                                                                                                                                           |
| `maxHeight`          | `maxHeight`                                                                                                                                                                          |
| `minWidth`           | `minWidth`                                                                                                                                                                           |
| `minHeight`          | `minHeight`                                                                                                                                                                          |
| `transitionDuration` | `transitionDuration`                                                                                                                                                                 |

---

## 🔧 Advanced Options

### Changing the plugin configuration node

It is possible to change the default node used for **TwStyleMerge** configuration. By default, the node is set to `"tw-style-merge"`. However, if needed, you can modify it with the following configuration:

```javascript
// tailwind.config.js

module.exports = {
   plugins: [
     styleMerge({ node: 'custom-node-name' }),
   ],
   theme: {
      "custom-node-name": { // definition of classes... }
   }
}

```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a pull request or submit an issue on [GitHub](https://github.com/zure-co/tw-style-merge).

---

## 🌟 Thanks

Built with ❤️ and **Tailwind CSS** for developers who love clean, reusable styles.
