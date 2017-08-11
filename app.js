(function () {
    const MIN_FREQ = 261.63 // C4

    const beepAndFlash = (audioContext, flashNode) => ({ key }) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        const now = audioContext.currentTime

        const freq = Math.max(Math.abs(Math.sin(key.charCodeAt(0)) * 1000), MIN_FREQ)
        const hue = Math.abs(Math.trunc(Math.sin(freq) * 360))
        const duration = now + 1.337

        gainNode.gain.setValueAtTime(1, now)
        gainNode.connect(audioContext.destination)

        oscillator.type = 'sine'
        oscillator.frequency.value = freq
        oscillator.connect(gainNode)
        oscillator.start()

        // fade out beeping
        gainNode.gain.exponentialRampToValueAtTime(0.001, duration)
        oscillator.stop(duration)

        // flash color
        flashNode.style.backgroundColor = `hsl(${hue}, 100%, 50%)`
    }

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const bodyNode = document.querySelector('body')

    document.addEventListener('keydown', beepAndFlash(audioContext, bodyNode))
}())
