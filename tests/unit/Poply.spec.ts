import { describe, it, expect, beforeEach } from 'vitest';
import Poply from '../../src/core/Poply';

describe('Poply Core API', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders an alert popup', async () => {
        // We don't await because we just want to inspect the DOM while it's open
        const promise = Poply.alert({ title: 'Test Alert', message: 'Hello' });

        // Give it a tick to render
        await new Promise(r => setTimeout(r, 10));

        expect(document.querySelector('.poply-popup')).not.toBeNull();
        expect(document.querySelector('.poply-title')?.textContent).toBe('Test Alert');
        expect(document.querySelector('.poply-body')?.textContent).toBe('Hello');

        // Clean up
        const btn = document.querySelector('.poply-btn') as HTMLButtonElement;
        btn.click();
        await promise;
        expect(document.querySelector('.poply-popup')).toBeNull();
    });
});
