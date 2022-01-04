export default class Drum{
    constructor(buffer, analyser, audioCtx, instrumentVolume){
        const source= audioCtx.createBufferSource();
        source.buffer= buffer;
        const drumGain= audioCtx.createGain();
        drumGain.gain.setValueAtTime((instrumentVolume /100) * 4 , 0);
        source.connect(drumGain);
        drumGain.connect(analyser);
        source.start();
    }
}