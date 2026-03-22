<div align="center">
  <img src="banner.png" alt="Poply UI Banner" width="100%" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);" />

  # Poply UI 

  **Beautiful, zero-configuration popup components with 240+ professional themes.**  
  Modern, frame-independent, and culturally inspired designs for your next project.

  [![npm version](https://img.shields.io/npm/v/poply-ui.svg?style=flat-square)](https://www.npmjs.com/package/poply-ui)
  [![license](https://img.shields.io/npm/l/poply-ui.svg?style=flat-square)](https://github.com/Munib-Jahangir/poply-ui/blob/main/LICENSE)
  [![size](https://img.shields.io/bundlephobia/minzip/poply-ui?style=flat-square)](https://bundlephobia.com/package/poply-ui)
  [![github issues](https://img.shields.io/github/issues/Munib-Jahangir/poply-ui.svg?style=flat-square)](https://github.com/Munib-Jahangir/poply-ui/issues)

  [Demo](https://poply-ui.dev) • [Documentation](https://github.com/Munib-Jahangir/poply-ui#usage) • [Themes](#themes)

</div>

<hr />

## ✨ Features

- 🚀 **Zero Dependencies**: Lightweight and fast.
- 🎨 **240+ Themes**: From iOS Glass to Cyberpunk, Minimal to Brutalist.
- 🇵🇰 **Pakistani Heritage Collection**: 50 unique designs inspired by Ajrak, Truck Art, and Mughal Architecture.
- 🛠️ **Framework Ready**: Works with **React**, **Vue**, **Svelte**, and **Vanilla JS**.
- 🌓 **Dark Mode Support**: Beautifully crafted dark variants for most themes.
- 📦 **Typescript Support**: Fully typed for a better developer experience.
- 🌐 **CDN Ready**: Use it directly in your HTML with simple `<script>` tags.

---

## 🚀 Quick Start

### Installation

```bash
npm install poply-ui
```

### Basic Usage (Vanilla JS)

```javascript
import Poply from 'poply-ui';
import 'poply-ui/dist/poply-ui.css';

// Show a beautiful glassmorphism alert
Poply.alert({
  theme: 'ios-glass',
  title: 'Success!',
  message: 'Your profile has been updated.',
  icon: '✅'
});
```

---

## 🎭 The Pakistani Collection 🇵🇰
Add a touch of culture to your apps with our exclusive collection of 50 Pakistani-inspired themes.

| Theme | Inspiration |
| :--- | :--- |
| `ajrak-royal` | Sindhi traditional Ajrak patterns |
| `truck-phari` | Vibrant colors of Pakistani truck art |
| `badshahi-dome` | Majestic architecture of Badshahi Masjid |
| `peshawari-chappal` | Hand-stitched leather textures |
| `biryani-dum` | Warm and inviting spice colors |

---

## 🔌 Framework Integration

### React
```tsx
import { PoplyProvider, usePoply } from 'poply-ui/react';

function App() {
  const poply = usePoply();
  
  return (
    <button onClick={() => poply.toast({ message: 'React Toast! 🚀' })}>
      Show Toast
    </button>
  );
}
```

### Vue
```javascript
import { createApp } from 'vue';
import PoplyVue from 'poply-ui/vue';

const app = createApp(App);
app.use(PoplyVue);
```

---

## 🌟 Popular Themes

- **iOS Series**: `ios-glass`, `ios-dark`, `ios-haptic`, `macos-ventura`
- **Glassmorphism**: `glass-aurora`, `glass-holographic`, `glass-ocean`
- **Dark/Moody**: `obsidian`, `dracula`, `midnight`, `raven`
- **Fun/Special**: `windows-xp`, `minecraft`, `comic`, `game-over`

---

## 🌍 CDN Usage
Use Poply directly in your HTML files via UNPKG or JSDelivr:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/poply-ui/dist/poply-ui.css">
<script src="https://cdn.jsdelivr.net/npm/poply-ui/dist/poply-ui.umd.min.js"></script>

<script>
  Poply.alert({
    theme: 'ajrak-royal',
    title: 'Salam!',
    message: 'Welcome via CDN.'
  });
</script>
```

---

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/Munib-Jahangir">Munib Jahangir</a></p>
</div>
