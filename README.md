# StyleMerge

The **StyleMerge** is a **Tailwind CSS** plugin that allows you to combine classes and styles within the Tailwind configuration file itself.

## 🛠️ Features

- Create custom utility classes based on the Tailwind theme.
- Use fixed values ​​or theme variables (with the `$` prefix).
- Fully supports variants like `responsive` and `hover`.
- Set a custom prefix for your classes.

---

## 🚀 Installation

Install the plugin via **npm**:

```bash
npm install tw-style-merge
```

---

## ⚙️Configuration

Add the plugin to your `tailwind.config.js` file and define your custom styles under the `merge` theme key:

```javascript
const styleMerge = require('tw-style-merge')

module.exports = {
  plugins: [
    styleMerge(), // Or pass a custom prefix, e.g. styleMerge('custom')
  ],
  theme: {
    extend: {
      merge: {
        heading: {
          fontFamily: '$heading',
          fontSize: '$xl',
          fontWeight: '$bold',
          lineHeight: '48px',
          letterSpacing: '0.1em',
          color: '$primary.500',
        },
        body: {
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '24px',
          color: '#333333',
        },
      },
    },
  },
}
```

---

## 💡 Usage

After configuring the plugin, you can use the generated classes in your HTML:

```html
<h1 class="merge-heading">Main heading</h1>
<p class="merge-body">Body text with custom styling.</p>
```

### Example with custom prefix

If you configure a different prefix, such as `styleMerge('custom')`, the generated classes will use the corresponding prefix:

```html
<h1 class="custom-heading">Main heading</h1>
<p class="custom-body">Body text with custom styling.</p>
```

---

## 📝 Defining styles

### Theme syntax

Styles defined in the `merge` theme can use:

- **Theme variables**: use the `$` prefix to reference configured theme values.
  Example: `$heading`, `$primary.500`
- **Direct values**: Pass the value directly. Example: `'Arial, sans-serif'`, `'#333333'`

### Complete configuration example

```javascript
merge: {
  title: {
    fontFamily: '$heading',
    fontSize: '32px',
    fontWeight: '$bold',
    lineHeight: '40px',
    letterSpacing: '0.1em',
    color: '$primary.700',
  },
  subtitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '32px',
    color: '#555555',
  },
  caption: {
    fontFamily: '$caption',
    fontSize: '14px',
    fontWeight: '$light',
    color: '$secondary.300',
  },
},
```

---

## ↔️ Variable Correlation

When declaring a variable in tw-style-merge, its value is retrieved based on the context of the corresponding property. For example, if you declare a variable in the color property, the plugin will look for the variable's value in the colors attribute inside the theme object in the tailwind.config.js file. Similarly, if you declare a variable in the width, padding, or margin properties, among others, the plugin will look for the value in the spacing attribute within the same theme. Below is a table with the complete correlation:

|  Tailwind theme | CSS Property |
|--|--|
| `colors` | `color` |
| `fontFamily` | `fontFamily` |
| `fontSize` | `fontSize` |
| `spacing` | `width`, `height`, `padding`, `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom`, `margin`, `marginLeft`, `marginRight`, `marginTop`, `marginBottom` |
| `borderRadius` | `borderRadius` |
| `boxShadow` | `boxShadow` |
| `opacity` | `opacity` |
| `zIndex` | `zIndex` |
| `lineHeight` | `lineHeight` |
| `letterSpacing` | `letterSpacing` |
| `maxWidth` | `maxWidth` |
| `maxHeight` | `maxHeight` |
| `minWidth` | `minWidth` |
| `minHeight` | `minHeight` |
| `transitionDuration` | `transitionDuration` |

---

## 🔧 Advanced Options

- **Custom Prefix**: You can set a custom prefix for generated classes:

```javascript
styleMerge('custom-prefix')
```

- **Variants**: Classes are compatible with all Tailwind variants, such as `hover`, `focus`, and `responsive`.
  Example:

```html
<p class="merge-body hover:merge-heading">Hover Effect</p>
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
