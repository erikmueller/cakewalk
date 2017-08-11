class Audio {
    constructor(ctx) {
        this.context = ctx
    }

    beep(freq) {
        const oscillator = this.context.createOscillator()
        const gainNode = this.context.createGain();
        const now = this.context.currentTime
        const duration = now + 1.337

        gainNode.gain.setValueAtTime(1, now);
        gainNode.connect(this.context.destination);

        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        oscillator.connect(gainNode);
        oscillator.start();

        gainNode.gain.exponentialRampToValueAtTime(0.001, duration);
        oscillator.stop(duration);
    }
}
