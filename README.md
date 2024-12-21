# TwStyleMerge

**TwStyleMerge** is a Tailwind CSS plugin that simplifies the creation of reusable CSS classes directly in the `tailwind.config.js` file. By defining multiple properties for your classes, this plugin eliminates the need for `@apply` directives, streamlining your styling process and enhancing maintainability.

---

## 🛠️ Features

- **Custom Utility Classes**: Define utility classes based on your Tailwind theme.
- **Variable Support**: Reference existing styles defined in your `tailwind.config.js` file.
- **Custom Prefix**: Add a unique prefix to your generated classes.

---

## 🚀 Installation

You can install the plugin using one of the following methods:

### Using npm

```bash
npm install @zure/tw-style-merge
```

### Using Yarn

```bash
yarn add @zure/tw-style-merge
```

### Using pnpm

```bash
pnpm add @zure/tw-style-merge
```

## ⚙️ Configuration

Add the plugin to your `tailwind.config.js` file and define custom styles under the `tw-style-merge` theme key:

```javascript
// tailwind.config.js
const twStyleMerge = require('@zure/tw-style-merge');

module.exports = {
  plugins: [
    twStyleMerge()
  ],
  theme: {
    "tw-style-merge": {
      "heading-1": {
        "fontFamily": "Arial",
        "color": "#000000"
      }
    }
  },
};
```

> **Note**: This configuration works within `theme.extend` as well.

### Plugin Typing in `tailwind.config.js`

To add typing support, use the following JSDoc Type Annotation:

```javascript
/** @type {import('@zure/tw-style-merge').TwStyleMerge} */
const twStyleMerge = require('@zure/tw-style-merge');
```

---

## 💡 Usage

Once configured, use the generated classes in your HTML:

```html
<h1 class="heading-1">Main heading</h1>
```

If you're using **[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)**, IntelliSense will detect and suggest the configured classes seamlessly.

---

## 🔧 Advanced Options

### Adding a Custom Prefix

To prefix your custom classes, configure the plugin as follows:

```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    twStyleMerge({ prefix: 'my-prefix' })
  ],
};
```

Usage:

```html
<h1 class="my-prefix-heading-1">Main heading</h1>
```

### Changing the Configuration Node

Customize the default configuration node (`tw-style-merge`) by specifying a different name:

```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    twStyleMerge({ node: 'custom-node-name' })
  ],
  theme: {
    "custom-node-name": {
      "heading-1": {
        "fontFamily": "Arial",
        "color": "#000000"
      }
    }
  }
};
```

---

## 📝 Variables Support

Leverage variables to reuse existing properties from your `tailwind.config.js` file:

```javascript
// tailwind.config.js
const twStyleMerge = require('@zure/tw-style-merge');

module.exports = {
  plugins: [
    twStyleMerge()
  ],
  theme: {
    colors: {
      primary: {
        dark: "#0000ff"
      }
    },
    "tw-style-merge": {
      "heading-1": {
        "fontFamily": "Arial",
        "color": "$primary.dark"
      }
    }
  }
};
```

### Variable Mapping

The plugin intelligently maps variables to their respective theme sections. For example:

| CSS Property         | Tailwind Theme Section |
| -------------------- | ---------------------- |
| `color`              | `colors`               |
| `fontFamily`         | `fontFamily`           |
| `padding`, `margin`  | `spacing`              |
| `borderRadius`       | `borderRadius`         |
| `boxShadow`          | `boxShadow`            |
| `zIndex`             | `zIndex`               |
| `lineHeight`         | `lineHeight`           |
| `letterSpacing`      | `letterSpacing`        |
| `transitionDuration` | `transitionDuration`   |

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests on [GitHub](https://github.com/zure-co/tw-style-merge).

---

## 📜 License

Licensed under the [MIT License](LICENSE).

---

## 🌟 Thanks

Built with ❤️ for developers who value clean and reusable styles. Powered by **Tailwind CSS**.

