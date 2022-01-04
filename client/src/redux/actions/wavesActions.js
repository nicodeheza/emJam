import {CREATE_WAVE, DELETE_WAVE, RESET_WAVES} from "../consts"; 

const colors= [
    'rgb(255,0,0)',
    'rgb(0,255,0)',
    'rgb(0,0,255)',
    'rgb(255,255,0)',
    'rgb(0,255,255)',
];
let colorIndex= 0;


export const createWave=(userId)=>(dispatch, getState)=>{
    const{audioCtx, masterGain}= getState().audioCtx;
    const wave={};
    wave.analyser= audioCtx.createAnalyser();
    wave.analyser.connect(masterGain);
    wave.analyser.fftSize= 2048;
    const bl= wave.analyser.frequencyBinCount;
    wave.bufferLength= bl;
    wave.dataArr= new Uint8Array(bl);

    //colors
    wave.color= colors[colorIndex];
    colorIndex++;
    colorIndex= colorIndex % 5;
   
    dispatch({
        type: CREATE_WAVE, 
        payload:{userId, wave}
    });

}

export const deleteWave=(userId)=>(dispatch, getState)=>{
    const waves= getState().waves;
    const{masterGain}= getState().audioCtx;
    waves[userId].analyser.disconnect(masterGain);
    delete waves[userId];
    dispatch({
        type: DELETE_WAVE, 
        payload: waves
    });
}

export const resetWaves=()=>(dispatch, getState)=>{
    const waves= getState().waves;
    const{masterGain}= getState().audioCtx;
    for(const wave in waves){
        if(wave !== "local"){
            waves[wave].analyser.disconnect(masterGain);
            delete waves[wave];
        }
    }
    dispatch({
        type: RESET_WAVES, 
        payload: waves
    });
}
