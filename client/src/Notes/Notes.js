export default class Note {
	constructor(
		freq,
		analyser,
		sine,
		square,
		sawtooth,
		triangle,
		vibratoGain,
		vibratoFrequency,
		audioCtx,
		instrumentVolume
	) {
		this.freq = freq;

		this.oscTotal = sine + square + sawtooth + triangle;
		this.oscData = [
			{type: "sine", gain: sine / this.oscTotal},
			{type: "square", gain: square / this.oscTotal},
			{type: "sawtooth", gain: sawtooth / this.oscTotal},
			{type: "triangle", gain: triangle / this.oscTotal}
		];

		this.audioCtx = audioCtx;

		this.instrumentGain = this.audioCtx.createGain();
		this.instrumentGain.gain.setValueAtTime(instrumentVolume / 100, 0);
		this.instrumentGain.connect(analyser);

		//this.noteGain= masterGain;
		this.sustainGain = this.audioCtx.createGain();

		this.sustain();

		this.vibrato = this.audioCtx.createOscillator();
		this.vibrato.frequency.value = vibratoFrequency;
		this.vibratoGain = this.audioCtx.createGain();
		this.vibratoGain.gain.value = vibratoGain;
		this.vibrato.connect(this.vibratoGain);

		this.oscillators = [];

		this.oscData.forEach((osc) => {
			if (osc.gain > 0) {
				const oscillator = this.audioCtx.createOscillator();
				oscillator.frequency.setValueAtTime(this.freq, this.audioCtx.currentTime);
				oscillator.type = osc.type;
				const gainOscNode = this.audioCtx.createGain();
				gainOscNode.gain.setValueAtTime(osc.gain, this.audioCtx.currentTime);
				this.vibratoGain.connect(oscillator.frequency);
				oscillator.connect(gainOscNode);
				gainOscNode.connect(this.sustainGain);
				this.oscillators.push(oscillator);
			}
		});

		this.play();
	}

	sustain() {
		//podria agregar un argumento de maxLevel para poder controlar el solo del volumen del instrumento
		//ver mas tarde
		const attackTime = 0.2;
		const decayTime = 0.3;
		const maxLevel = 1;
		const sustainLevel = maxLevel - 0.3;
		const now = this.audioCtx.currentTime;

		this.sustainGain.gain.setValueAtTime(0, now);
		this.sustainGain.gain.linearRampToValueAtTime(1, now + attackTime);
		this.sustainGain.gain.linearRampToValueAtTime(
			sustainLevel,
			now + attackTime + decayTime
		);
		this.sustainGain.connect(this.instrumentGain);
	}

	play() {
		this.vibrato.start();
		this.oscillators.forEach((osc) => {
			osc.start();
		});
	}

	stop() {
		const stopTime = this.audioCtx.currentTime + 0.2;
		// console.log("current time: " + this.audioCtx.currentTime);
		//console.log("stop1");
		this.sustainGain.gain.linearRampToValueAtTime(0, stopTime);

		//console.log("stop2");
		this.oscillators.forEach((osc) => {
			osc.stop(stopTime);
		});
		this.vibrato.stop(stopTime);
	}
}
