export type PopupType = 'alert' | 'confirm' | 'prompt' | 'toast' | 'custom';

export interface PoplyOptions {
    theme?: string;
    title?: string;
    message?: string;
    icon?: string;
    animation?: 'fade' | 'slide-up' | 'slide-down' | 'zoom' | 'bounce' | 'flip' | 'rotate' | 'shake' | 'none';
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
    position?: 'center' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
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
    inputType?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
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
