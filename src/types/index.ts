export type PopupType = "alert" | "confirm" | "prompt" | "toast" | "custom";

export type ThemeName =
  // iOS & Apple-Inspired (1-15)
  | "ios-glass"
  | "ios-dark"
  | "ios-light"
  | "macos-ventura"
  | "macos-dark"
  | "apple-watch"
  | "ipados-split"
  | "ios-action-sheet"
  | "apple-silicon"
  | "airdrop"
  | "ios-springboard"
  | "tvos"
  | "ios-haptic"
  | "ios-status-bar"
  | "ios-live-activity"
  // Glass Morphism (16-28)
  | "glass-clear"
  | "glass-blue"
  | "glass-purple"
  | "glass-dark"
  | "glass-sunset"
  | "glass-ocean"
  | "glass-aurora"
  | "glass-mono"
  | "glass-neon"
  | "glass-rose"
  | "glass-amber"
  | "glass-ink"
  | "glass-holographic"
  // Dark & Moody (29-42)
  | "minimal-dark"
  | "obsidian"
  | "charcoal"
  | "dracula"
  | "midnight"
  | "ink-black"
  | "raven"
  | "deep-space"
  | "void"
  | "carbon"
  | "shadow"
  | "dark-gradient"
  | "eclipse"
  | "phantom"
  // Light & Clean (43-54)
  | "minimal-light"
  | "paper"
  | "snow"
  | "chalk"
  | "linen"
  | "cloud"
  | "clean-corporate"
  | "origami"
  | "frost-white"
  | "eggshell"
  | "gallery"
  | "rice-paper"
  // Gradient & Colourful (55-68)
  | "gradient-sunset"
  | "gradient-ocean"
  | "gradient-aurora"
  | "gradient-candy"
  | "gradient-midnight"
  | "gradient-forest"
  | "gradient-fire"
  | "gradient-lavender"
  | "gradient-rose-gold"
  | "gradient-neon-rainbow"
  | "gradient-cotton-candy"
  | "gradient-cyber"
  | "gradient-vintage"
  | "gradient-universe"
  // Neon & Cyberpunk (69-78)
  | "neon-green"
  | "neon-pink"
  | "neon-blue"
  | "neon-cyan"
  | "neon-yellow"
  | "neon-red"
  | "cyber-grid"
  | "hologram"
  | "glitch"
  | "matrix-rain"
  // Flat & Material Design (79-88)
  | "material-blue"
  | "material-elevated"
  | "material-you"
  | "flat-red"
  | "flat-green"
  | "flat-yellow"
  | "flat-purple"
  | "flat-teal"
  | "fluent-ui"
  | "bootstrap"
  // Soft & Pastel (89-98)
  | "soft-pastel"
  | "pastel-pink"
  | "pastel-blue"
  | "pastel-mint"
  | "pastel-lilac"
  | "pastel-peach"
  | "pastel-lemon"
  | "bubblegum"
  | "cotton-candy"
  | "kawaii"
  // Classic & Vintage (99-108)
  | "classic"
  | "windows-98"
  | "windows-xp"
  | "terminal"
  | "dos-prompt"
  | "newspaper"
  | "typewriter"
  | "vintage-stamp"
  | "film-noir"
  | "retro-80s"
  // Gaming & Fun (109-118)
  | "achievement"
  | "game-over"
  | "rpg-quest"
  | "pixel-art"
  | "pokemon"
  | "loading-screen"
  | "loot-box"
  | "health-bar"
  | "arcade"
  | "minecraft"
  // Nature & Organic (119-126)
  | "forest"
  | "ocean-wave"
  | "sunset-sky"
  | "leaf-green"
  | "stone"
  | "sakura"
  | "desert-sand"
  | "aurora-borealis"
  // Business & Professional (127-134)
  | "executive"
  | "corporate-grey"
  | "startup"
  | "legal"
  | "medical"
  | "finance"
  | "dashboard-card"
  | "invoice"
  // Special & Experimental (135-150)
  | "neumorphism"
  | "brutalist-black"
  | "brutalist-white"
  | "sticker"
  | "comic"
  | "watercolour"
  | "emoji-burst"
  | "flip-card"
  | "spotlight"
  | "ticket"
  | "receipt"
  | "polaroid"
  | "voice-note"
  | "countdown"
  | "skeleton"
  | "confetti-burst"
  // Pakistani Themes
  | "ajrak-royal"
  | "sindhi-topi"
  | "mohenjo-stone"
  | "lal-shahbaz"
  | "indus-delta"
  | "tharparkar-sun"
  | "sachal-sufi"
  | "bhit-shah"
  | "hala-lacquer"
  | "keenjhar-lake"
  | "shahi-qila"
  | "badshahi-dome"
  | "mughal-miniature"
  | "taxila-museum"
  | "derawar-fortress"
  | "wazir-khan-masjid"
  | "shalimar-garden"
  | "rohtas-gate"
  | "naulakha-pearl"
  | "faisal-mosque"
  | "bedford-king"
  | "truck-phari"
  | "chai-dhaba"
  | "mehfil-rang"
  | "chamak-patti"
  | "parrot-green"
  | "dil-dil-pakistan"
  | "jingle-truck"
  | "lahori-gali"
  | "basant-kite"
  | "punjabi-phulkari"
  | "minar-e-pakistan"
  | "anarkali-bazar"
  | "sohni-mahiwal"
  | "heer-ranjha"
  | "ravi-night"
  | "balochi-suzani"
  | "quetta-apple"
  | "makran-coast"
  | "peshawari-chappal"
  | "khyber-pass"
  | "attan-fire"
  | "karachi-night"
  | "biryani-dum"
  | "iqbal-shair"
  | "cricket-green"
  | "sufi-qawwali"
  | "jashn-azadi"
  | "k2-summit"
  | "pakistan-zindabad";

export interface PoplyOptions {
  theme?: ThemeName | string;
  title?: string;
  message?: string;
  icon?: string;
  animation?:
    | "fade"
    | "slide-up"
    | "slide-down"
    | "zoom"
    | "bounce"
    | "flip"
    | "rotate"
    | "shake"
    | "none";
  duration?: number;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  width?: string;
  maxWidth?: string;
  zIndex?: number;
  backdropColor?: string;
  backdropBlur?: string;
  borderRadius?: string;
  customClass?: string;
  rtl?: boolean;
  position?:
    | "center"
    | "top"
    | "bottom"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  html?: string;
  onOpen?: () => void;
  onClose?: () => void;

  // Alert options
  buttonText?: string;
  buttonColor?: string;
  buttonTextColor?: string;

  // Confirm options
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  cancelColor?: string;
  dangerMode?: boolean;
  swapButtons?: boolean;

  // Prompt options
  placeholder?: string;
  defaultValue?: string;
  inputType?: "text" | "email" | "password" | "number" | "tel" | "url";
  maxLength?: number;
  validator?: (val: string) => boolean | string;

  // Toast options
  progress?: boolean;
  pauseOnHover?: boolean;
  closeable?: boolean;
  stack?: boolean;

  // Interal overrides
  customCSS?: Record<string, string>;
  respectSystemTheme?: boolean;
  forceDark?: boolean;
  forceLight?: boolean;
}

export interface PoplyInstance {
  alert(options: PoplyOptions): Promise<void>;
  confirm(options: PoplyOptions): Promise<boolean>;
  prompt(options: PoplyOptions): Promise<string | null>;
  toast(options: PoplyOptions): Promise<void>;
  custom(options: PoplyOptions): Promise<void>;
}
