import Poply from '../src/index';

document.getElementById('btn-alert')?.addEventListener('click', async () => {
    await Poply.alert({
        theme: 'ios-glass',
        title: 'Hello! 👋',
        message: 'Welcome to poply-ui. This is the iOS Glass theme.',
        icon: '🍎'
    });
});

document.getElementById('btn-confirm')?.addEventListener('click', async () => {
    const result = await Poply.confirm({
        theme: 'minimal-dark',
        title: 'Delete Repo?',
        message: 'This action is irreversible.',
        dangerMode: true,
        confirmText: 'Delete Forever'
    });
    if (result) {
        Poply.toast({ theme: 'flat-green', message: 'Repo deleted!' });
    }
});

document.getElementById('btn-prompt')?.addEventListener('click', async () => {
    const name = await Poply.prompt({
        theme: 'neon-cyan',
        title: 'TARGET ACQUIRED',
        placeholder: 'Enter designation...',
        confirmText: 'INITIATE'
    });
    if (name) {
        Poply.alert({ theme: 'neon-cyan', title: 'SYSTEM LOG', message: `Welcome, User ${name}` });
    }
});

document.getElementById('btn-toast')?.addEventListener('click', async () => {
    await Poply.toast({
        theme: 'gradient-sunset',
        message: 'Profile updated successfully! ✨',
        duration: 3000,
        position: 'bottom-right'
    });
});

document.getElementById('btn-custom')?.addEventListener('click', async () => {
    await Poply.custom({
        theme: 'brutalist-black',
        html: `
      <h2>CUSTOM HTML</h2>
      <p style="text-transform:none; font-family:sans-serif;">You can render anything here. <br><br> <img src="https://via.placeholder.com/200x100" style="width:100%" /></p>
      <button class="poply-btn poply-close-btn" style="width:100%; margin-top:10px">CLOSE THIS</button>
    `,
        width: '400px'
    });
});

// All 240+ Themes
const allThemes = [
  'achievement', 'airdrop', 'ajrak-royal', 'amex-card', 'anarkali-bazar', 'android-notification',
  'apple-silicon', 'apple-watch', 'apple-watch-ultra', 'arcade', 'attan-fire', 'aurora-borealis',
  'badshahi-dome', 'balochi-suzani', 'banner-notification', 'basant-kite', 'bedford-king',
  'bhit-shah', 'biryani-dum', 'bmw-idrive', 'bootstrap', 'brutalist-black', 'brutalist-white',
  'bubblegum', 'calendar-event', 'carbon', 'cassette', 'cd-disc', 'chai-dhaba', 'chalk',
  'chamak-patti', 'charcoal', 'chrome-os', 'classic', 'clean-corporate', 'cloud', 'comic',
  'confetti-burst', 'corporate-grey', 'cotton-candy', 'countdown', 'cricket-green',
  'cyber-grid', 'dark-gradient', 'dashboard-card', 'deep-space', 'derawar-fortress',
  'desert-sand', 'digital-clock', 'dil-dil-pakistan', 'discord', 'dos-prompt', 'dracula',
  'eclipse', 'eggshell', 'emoji-burst', 'executive', 'faisal-mosque', 'fifa', 'film-noir',
  'finance', 'flat-green', 'flat-purple', 'flat-red', 'flat-teal', 'flat-yellow', 'flight-board',
  'flip-card', 'fluent-ui', 'forest', 'frost-white', 'gallery', 'game-over', 'glass-amber',
  'glass-aurora', 'glass-blue', 'glass-clear', 'glass-dark', 'glass-holographic', 'glass-ink',
  'glass-mono', 'glass-neon', 'glass-ocean', 'glass-purple', 'glass-rose', 'glass-sunset',
  'glitch', 'gradient-aurora', 'gradient-candy', 'gradient-cotton-candy', 'gradient-cyber',
  'gradient-fire', 'gradient-forest', 'gradient-lavender', 'gradient-midnight',
  'gradient-neon-rainbow', 'gradient-ocean', 'gradient-rose-gold', 'gradient-sunset',
  'gradient-universe', 'gradient-vintage', 'hala-lacquer', 'health-bar', 'heer-ranjha',
  'hologram', 'indus-delta', 'ink-black', 'instagram', 'invoice', 'ios-action-sheet',
  'ios-dark', 'ios-glass', 'ios-haptic', 'ios-light', 'ios-live-activity', 'ios-springboard',
  'ios-status-bar', 'ipados-split', 'iphone-notification', 'iqbal-shair', 'japanese-zen',
  'jashn-azadi', 'jingle-truck', 'k2-summit', 'karachi-night', 'kawaii', 'keenjhar-lake',
  'khyber-pass', 'lahori-gali', 'lal-shahbaz', 'leaf-green', 'legal', 'linen', 'loading-screen',
  'loot-box', 'macos-big-sur', 'macos-classic', 'macos-dark', 'macos-ventura', 'makran-coast',
  'mastercard', 'material-blue', 'material-elevated', 'material-you', 'matrix-rain',
  'mcdonalds', 'medical', 'mehfil-rang', 'midnight', 'minar-e-pakistan', 'minecraft',
  'minimal-dark', 'minimal-light', 'mohenjo-stone', 'mughal-miniature', 'naulakha-pearl',
  'nba', 'neon-blue', 'neon-cyan', 'neon-green', 'neon-pink', 'neon-red', 'neon-yellow',
  'netflix', 'neumorphism', 'newspaper', 'nike-run', 'nintendo-switch', 'obsidian',
  'ocean-wave', 'origami', 'pakistan-zindabad', 'paper', 'parrot-green', 'pastel-blue',
  'pastel-lemon', 'pastel-lilac', 'pastel-mint', 'pastel-peach', 'pastel-pink',
  'peshawari-chappal', 'phantom', 'pixel-art', 'playstation', 'pokemon', 'polaroid',
  'punjabi-phulkari', 'quetta-apple', 'raven', 'ravi-night', 'receipt', 'retro-80s',
  'rice-paper', 'rohtas-gate', 'rolex', 'rpg-quest', 'sachal-sufi', 'sakura', 'shadow',
  'shahi-qila', 'shalimar-garden', 'sindhi-topi', 'skeleton', 'slack', 'smart-speaker',
  'snackbar', 'snow', 'soft-pastel', 'sohni-mahiwal', 'space-station', 'spotify', 'spotlight',
  'starbucks', 'startup', 'steam', 'sticker', 'stone', 'sufi-qawwali', 'sunset-sky',
  'swiss-design', 'taxila-museum', 'terminal', 'tesla', 'tharparkar-sun', 'ticket',
  'truck-phari', 'tvos', 'typewriter', 'uber-eats', 'ubuntu-gnome', 'ultra-minimal',
  'vintage-stamp', 'vinyl-record', 'visa-card', 'voice-note', 'void', 'watercolour',
  'wazir-khan-masjid', 'weather-alert', 'whatsapp', 'windows-2000', 'windows-3-1',
  'windows-98', 'windows-aero', 'windows-xp', 'xbox', 'youtube'
];

const container = document.getElementById('all-themes-container');

if (container) {
  allThemes.forEach(theme => {
    const btn = document.createElement('button');
    btn.style.padding = '8px 12px';
    btn.style.borderRadius = '4px';
    btn.style.border = '1px solid #ccc';
    btn.style.cursor = 'pointer';
    btn.style.backgroundColor = '#fdfdfd';
    btn.innerText = theme.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    
    btn.addEventListener('click', async () => {
      // Different types
      if (theme.includes('confirm') || theme.includes('action') || theme.includes('qila') || theme.includes('zindabad')) {
        await Poply.confirm({
          theme: theme,
          title: theme.toUpperCase(),
          message: `Testing the ${theme} confirm dialog design! Proceed?`,
          confirmText: 'Yes, Proceed', cancelText: 'Cancel Action'
        });
      } else if (theme.includes('toast') || theme.includes('chamak') || theme.includes('night') || theme.includes('pulse')) {
        Poply.toast({
          theme: theme,
          message: `Hello from ${theme}! ✨`,
          position: 'bottom-right', duration: 4000
        });
      } else if (theme.includes('prompt') || theme.includes('input') || theme.includes('gali') || theme.includes('bazar')) {
        Poply.prompt({
          theme: theme,
          title: `Input needed for ${theme}`,
          placeholder: 'Enter text...'
        });
      } else {
        Poply.alert({
          theme: theme,
          title: theme.replace(/-/g, ' ').toUpperCase(),
          message: `This is what the ${theme} alert looks like live!`,
          icon: '🎨'
        });
      }
    });

    container.appendChild(btn);
  });
}

