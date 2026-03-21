import { PoplyOptions, PoplyInstance } from '../types';

let toastContainer: HTMLElement | null = null;

const createPopupContainer = (options: PoplyOptions, isToast = false): HTMLDivElement => {
    const container = document.createElement('div');

    if (!isToast) {
        container.className = 'poply-container';
        container.style.zIndex = (options.zIndex || 9999).toString();

        const backdrop = document.createElement('div');
        backdrop.className = 'poply-backdrop';
        if (options.backdropColor) backdrop.style.setProperty('--poply-backdrop-bg', options.backdropColor);
        if (options.backdropBlur) backdrop.style.setProperty('--poply-backdrop-blur', options.backdropBlur);
        container.appendChild(backdrop);
    } else {
        container.className = `poply-toast poply-theme-${options.theme || 'ios-glass'}`;
    }

    // Apply customizations
    if (options.customCSS) {
        for (const [key, value] of Object.entries(options.customCSS)) {
            container.style.setProperty(key, value);
        }
    }

    // Apply dark mode detection
    if (options.forceDark || (options.respectSystemTheme !== false && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        container.classList.add('poply-dark-mode');
    } else if (options.forceLight) {
        container.classList.remove('poply-dark-mode');
    }

    return container;
};

const setupCloseTriggers = (
    container: HTMLElement,
    options: PoplyOptions,
    closeFn: () => void
): void => {
    const backdrop = container.querySelector('.poply-backdrop');
    if (backdrop && (options.closeOnBackdrop !== false)) {
        backdrop.addEventListener('click', closeFn);
    }

    if (options.closeOnEsc !== false) {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeFn();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
    }
};

const animateClose = (container: HTMLElement, isToast = false): Promise<void> => {
    return new Promise(resolve => {
        if (isToast) {
            container.classList.add('poply-hiding');
        } else {
            container.classList.remove('poply-active');
        }

        setTimeout(() => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
            resolve();
        }, 300); // Wait for transition
    });
};

const applyAnimation = (popup: HTMLElement, animation?: string) => {
    if (animation === 'none') {
        popup.style.transition = 'none';
        popup.style.animation = 'none';
    }
    // Simplified for MVP - using CSS transitions mostly
};

const buildPopupElement = (options: PoplyOptions): HTMLDivElement => {
    const popup = document.createElement('div');
    popup.className = `poply-popup poply-theme-${options.theme || 'ios-glass'}`;
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-modal', 'true');

    if (options.width) popup.style.width = options.width;
    if (options.maxWidth) popup.style.maxWidth = options.maxWidth;
    if (options.borderRadius) popup.style.borderRadius = options.borderRadius;
    if (options.customClass) popup.classList.add(options.customClass);
    if (options.rtl) popup.style.direction = 'rtl';

    let html = '';

    if (options.html) {
        html = options.html;
    } else {
        if (options.title || options.icon || options.showCloseButton) {
            html += `<div class="poply-header">`;
            if (options.icon) html += `<span class="poply-icon">${options.icon}</span>`;
            if (options.title) html += `<h2 class="poply-title">${options.title}</h2>`;
            if (options.showCloseButton) html += `<button class="poply-btn poply-close-btn" aria-label="Close" style="margin-left:auto; background:transparent; padding:0; font-size:20px">&times;</button>`;
            html += `</div>`;
        }
        if (options.message) {
            html += `<div class="poply-body">${options.message}</div>`;
        }
    }

    popup.innerHTML = html;
    return popup;
};

export const Poply: PoplyInstance = {
    alert(options: PoplyOptions): Promise<void> {
        return new Promise(resolve => {
            if (options.onOpen) options.onOpen();

            const container = createPopupContainer(options);
            const popup = buildPopupElement(options);
            applyAnimation(popup, options.animation);

            const footer = document.createElement('div');
            footer.className = 'poply-footer';

            const btn = document.createElement('button');
            btn.className = 'poply-btn poply-btn-primary';
            btn.innerText = options.buttonText || 'OK';
            if (options.buttonColor) btn.style.backgroundColor = options.buttonColor;
            if (options.buttonTextColor) btn.style.color = options.buttonTextColor;

            const closeHandler = async () => {
                await animateClose(container);
                if (options.onClose) options.onClose();
                resolve();
            };

            btn.onclick = closeHandler;

            const closeBtn = popup.querySelector('.poply-close-btn');
            if (closeBtn) {
                (closeBtn as HTMLButtonElement).onclick = closeHandler;
            }

            footer.appendChild(btn);
            popup.appendChild(footer);
            container.appendChild(popup);
            document.body.appendChild(container);

            setupCloseTriggers(container, options, closeHandler);

            // Trigger reflow & animation
            requestAnimationFrame(() => {
                container.classList.add('poply-active');
                btn.focus();
            });
        });
    },

    confirm(options: PoplyOptions): Promise<boolean> {
        return new Promise(resolve => {
            if (options.onOpen) options.onOpen();

            const container = createPopupContainer(options);
            const popup = buildPopupElement(options);
            applyAnimation(popup, options.animation);

            const footer = document.createElement('div');
            footer.className = 'poply-footer';

            const closeHandler = async (result: boolean) => {
                await animateClose(container);
                if (options.onClose) options.onClose();
                resolve(result);
            };

            const btnConfirm = document.createElement('button');
            btnConfirm.className = options.dangerMode ? 'poply-btn poply-btn-danger' : 'poply-btn poply-btn-primary';
            btnConfirm.innerText = options.confirmText || 'Confirm';
            if (options.confirmColor) btnConfirm.style.backgroundColor = options.confirmColor;
            btnConfirm.onclick = () => closeHandler(true);

            const btnCancel = document.createElement('button');
            btnCancel.className = 'poply-btn';
            btnCancel.innerText = options.cancelText || 'Cancel';
            if (options.cancelColor) btnCancel.style.backgroundColor = options.cancelColor;
            btnCancel.onclick = () => closeHandler(false);

            if (options.swapButtons) {
                footer.appendChild(btnConfirm);
                footer.appendChild(btnCancel);
            } else {
                footer.appendChild(btnCancel);
                footer.appendChild(btnConfirm);
            }

            const closeBtn = popup.querySelector('.poply-close-btn');
            if (closeBtn) {
                (closeBtn as HTMLButtonElement).onclick = () => closeHandler(false);
            }

            popup.appendChild(footer);
            container.appendChild(popup);
            document.body.appendChild(container);

            setupCloseTriggers(container, options, () => closeHandler(false));

            requestAnimationFrame(() => {
                container.classList.add('poply-active');
                btnConfirm.focus();
            });
        });
    },

    prompt(options: PoplyOptions): Promise<string | null> {
        return new Promise(resolve => {
            if (options.onOpen) options.onOpen();

            const container = createPopupContainer(options);
            const popup = buildPopupElement(options);
            applyAnimation(popup, options.animation);

            const inputContainer = document.createElement('div');
            inputContainer.style.marginTop = '12px';

            const input = document.createElement('input');
            input.className = 'poply-input';
            input.type = options.inputType || 'text';
            input.placeholder = options.placeholder || '';
            input.value = options.defaultValue || '';
            if (options.maxLength) input.maxLength = options.maxLength;

            const errorMsg = document.createElement('div');
            errorMsg.style.color = '#ff3b30';
            errorMsg.style.fontSize = '0.85rem';
            errorMsg.style.marginTop = '4px';
            errorMsg.style.display = 'none';

            inputContainer.appendChild(input);
            inputContainer.appendChild(errorMsg);
            popup.appendChild(inputContainer);

            const footer = document.createElement('div');
            footer.className = 'poply-footer';

            const closeHandler = async (result: string | null) => {
                await animateClose(container);
                if (options.onClose) options.onClose();
                resolve(result);
            };

            const submitAction = () => {
                const val = input.value;
                if (options.validator) {
                    const valid = options.validator(val);
                    if (valid !== true) {
                        errorMsg.innerText = typeof valid === 'string' ? valid : 'Invalid input';
                        errorMsg.style.display = 'block';
                        return;
                    }
                }
                closeHandler(val);
            };

            input.onkeydown = (e) => {
                if (e.key === 'Enter') submitAction();
            };

            const btnConfirm = document.createElement('button');
            btnConfirm.className = 'poply-btn poply-btn-primary';
            btnConfirm.innerText = options.confirmText || 'Submit';
            btnConfirm.onclick = submitAction;

            const btnCancel = document.createElement('button');
            btnCancel.className = 'poply-btn';
            btnCancel.innerText = options.cancelText || 'Cancel';
            btnCancel.onclick = () => closeHandler(null);

            footer.appendChild(btnCancel);
            footer.appendChild(btnConfirm);
            popup.appendChild(footer);
            container.appendChild(popup);
            document.body.appendChild(container);

            setupCloseTriggers(container, options, () => closeHandler(null));

            requestAnimationFrame(() => {
                container.classList.add('poply-active');
                input.focus();
            });
        });
    },

    toast(options: PoplyOptions): Promise<void> {
        return new Promise(resolve => {
            if (options.onOpen) options.onOpen();

            const positionClass = `poply-toast-${options.position || 'top-right'}`;

            if (!toastContainer) {
                toastContainer = document.createElement('div');
                toastContainer.className = `poply-toast-container ${positionClass}`;
                document.body.appendChild(toastContainer);
            } else {
                // Change class if needed, or maintain multiple containers for diff positions (simplified for MVP)
                toastContainer.className = `poply-toast-container ${positionClass}`;
            }

            if (!options.stack && toastContainer.innerHTML) {
                toastContainer.innerHTML = ''; // clear existing
            }

            const toast = createPopupContainer(options, true);

            let html = '';
            if (options.icon) html += `<span class="poply-icon">${options.icon}</span>`;
            html += `<div class="poply-toast-msg">${options.message || ''}</div>`;
            if (options.closeable !== false) {
                html += `<button class="poply-btn poply-close-btn" style="background:transparent; padding:0; font-size:20px; margin-left:auto">&times;</button>`;
            }

            toast.innerHTML = html;
            toastContainer.appendChild(toast);

            const closeHandler = async () => {
                await animateClose(toast, true);
                if (options.onClose) options.onClose();
                resolve();
            };

            const closeBtn = toast.querySelector('.poply-close-btn');
            if (closeBtn) {
                (closeBtn as HTMLButtonElement).onclick = closeHandler;
            }

            const duration = options.duration !== undefined ? options.duration : 3000;
            if (duration > 0) {
                let timer = setTimeout(closeHandler, duration);
                if (options.pauseOnHover !== false) {
                    toast.onmouseenter = () => clearTimeout(timer);
                    toast.onmouseleave = () => { timer = setTimeout(closeHandler, duration); };
                }
            } else if (duration === 0 && options.closeable === false) {
                // user must handle resolution somehow (not recommended usually)
            }
        });
    },

    custom(options: PoplyOptions): Promise<void> {
        return new Promise(resolve => {
            if (options.onOpen) options.onOpen();

            const container = createPopupContainer(options);
            const popup = buildPopupElement(options);
            applyAnimation(popup, options.animation);

            const closeHandler = async () => {
                await animateClose(container);
                if (options.onClose) options.onClose();
                resolve();
            };

            const closeBtn = popup.querySelector('.poply-close-btn');
            if (closeBtn) {
                (closeBtn as HTMLButtonElement).onclick = closeHandler;
            }

            container.appendChild(popup);
            document.body.appendChild(container);

            setupCloseTriggers(container, options, closeHandler);

            requestAnimationFrame(() => {
                container.classList.add('poply-active');
            });
        });
    }
};

export default Poply;
