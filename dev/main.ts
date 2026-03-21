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
