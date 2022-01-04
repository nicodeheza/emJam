import Sine from "../svg/Sine";
import Square from "../svg/Square";
import Triangle from "../svg/Triangle";
import Sawtooth from "../svg/Sawtooth";
import VolumeIcon from "../svg/VolumeIcon";
import "./settings.css";
import { useRef, useEffect, useState } from "react";

export default function Settings({instrumentSettings, setInstrumentSettings, showSettings, drumsSelected}){

    const settingsBox= useRef(null);
    const mainContainer= useRef(null);
    const [boxWidth, setBoxWidth]= useState(10000);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      useEffect(() => {
        window.addEventListener("resize", handleResize);
        return ()=>{
            window.removeEventListener("resize", handleResize);
        }   
      }, []);

    useEffect(()=>{
       const bw= settingsBox.current.getBoundingClientRect().width;
       setBoxWidth(bw);
    },[dimensions, drumsSelected]);

    useEffect(()=>{
        if(!showSettings){
            setTimeout(()=>{
                mainContainer.current.style.opacity= "0";
            }, 1000);
        }else{
            mainContainer.current.style.opacity= "1";
        }
    },[showSettings]);


    return(
        
        <div className="settingsMainContainer"
        style= {showSettings ? 
            {transform: `translateX(0%)`,
            transition: " transform 1s"
            } : 
            {transform: `translateX(${(boxWidth + 20 )* -1}px)`,
            transition: " transform 1s"
            }} 
            ref={mainContainer}
        >
            <div className="settingFlexContainer" ref={settingsBox}>
                {
                    ! drumsSelected ?
                    (
                        <>
                            <div className="sliderCategory">
                                <h5>Wave Settings</h5>
                                <div className="sliderContainer">
                                    <input type="range" name="sineRange" id="sineRange" min="0" max="100"
                                    value={instrumentSettings.sine} 
                                    onChange={(e)=> setInstrumentSettings({...instrumentSettings, sine: parseFloat(e.target.value)})} />
                                    <Sine classN={"waveIcon"} />
                                </div>
                                <div className="sliderContainer">
                                    <input type="range" name="squareRange" id="squareRange" min="0" max="100"
                                    value={instrumentSettings.square} 
                                    onChange={(e)=> setInstrumentSettings({...instrumentSettings, square: parseFloat(e.target.value)})} />
                                    <Square classN={"waveIcon"} />
                                </div>
                                <div className="sliderContainer">
                                    <input type="range" name="triangleRange" id="triangleRange" min="0" max="100"
                                    value={instrumentSettings.triangle} 
                                    onChange={(e)=> setInstrumentSettings({...instrumentSettings, triangle: parseFloat(e.target.value)})} />
                                    <Triangle classN={"waveIcon"} />
                                </div>
                                <div className="sliderContainer">
                                    <input type="range" name="sawtoothRange" id="sawtoothRange" min="0" max="100"
                                    value={instrumentSettings.sawtooth} 
                                    onChange={(e)=> setInstrumentSettings({...instrumentSettings, sawtooth: parseFloat(e.target.value)})} />
                                    <Sawtooth classN={"waveIcon"} />
                                </div>
                            </div>
                            <div className="sliderCategory">
                                <h5>Vibrato</h5>
                                <div className="sliderContainer">
                                    <input type="range" name="vibratoGainSlider" id="vibratoGainSlider" min="0" max="100"
                                    value={instrumentSettings.vibratoGain} 
                                    onChange={(e)=> setInstrumentSettings({...instrumentSettings, vibratoGain: parseFloat(e.target.value)})} />
                                    <label htmlFor="vibratoGainSlider">Gain</label>
                                </div>
                                <div className="sliderContainer">
                                    <input type="range" name="vibratoFreqRange" id="vibratoFreqRange" min="0" max="100"
                                    value={instrumentSettings.vibratoFreq} 
                                    onChange={(e)=> setInstrumentSettings({...instrumentSettings, vibratoFreq: parseFloat(e.target.value)})} />
                                    <label htmlFor="vibratoFreqRange">Freq</label>
                                </div>
                            </div>
                        </>
                        
                    ) : (null)
                }
                <div className="sliderCategory">
                    <h5>Volumen</h5>
                    <div className="sliderContainer">
                        <input type="range" name="volumeInstrumentSlider" id="volumeInstrumentSlider" min="0" max="100"
                        value={instrumentSettings.volume} 
                        onChange={(e)=> setInstrumentSettings({...instrumentSettings, volume: parseFloat(e.target.value)})} />
                        <VolumeIcon classN={"instrumentVolIcon"} />
                    </div>
                </div>
            </div>
        </div>
    )
}