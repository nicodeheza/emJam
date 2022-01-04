import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./canvas.css";


export default function Canvas(){
    const canvas= useRef(null);
    const waves= useSelector(s=>s.waves);
    const w =useRef(0);
    const h= useRef(0);
    const ctx= useRef(null);
    const requestRef= useRef(null);
    const [wavesKeys, setWavesKeys]= useState([]);

    // useEffect(() => {
    //    console.log(Object.keys(waves).length);
    // }, [waves])

    const onResize= useCallback(()=>{
        const container= document.getElementById('viewCon');
        w.current= container.offsetWidth;
        h.current= container.offsetHeight;
        canvas.current.width= w.current;
        canvas.current.height= h.current;
    },[]);

    useEffect(()=>{
        onResize();
        window.addEventListener('resize', onResize);

        return()=>{
            window.removeEventListener('resize', onResize);
        }
    },[onResize]);

    //sort waves
    useEffect(()=>{
        const keys= Object.keys(waves);
        const center= Math.ceil(keys.length / 2);
        const waveKeys=  keys.filter(ele=> ele !== "local");
        waveKeys.splice(center -1 , 0, "local");
        setWavesKeys(waveKeys);
       // console.log(waveKeys.length);
    },[waves]);

    //get context
    useEffect(()=>{
        ctx.current= canvas.current.getContext("2d");
    },[]);

    const draw= useCallback(()=>{
        ctx.current.fillStyle= "rgba(0,0,0,1)";
        ctx.current.fillRect(0,0,w.current,h.current);

        wavesKeys.forEach((key, i)=>{
            if(waves[key]){
                const {analyser, bufferLength, dataArr, color}= waves[key];
                analyser.getByteTimeDomainData(dataArr);
    
                const scaX= key === "local" ? 0.7 : 0.5;
                const rad= 128 * scaX;
                const sw= w.current - rad;
        
                const posX= sw / wavesKeys.length  * i + ( w.current - sw / wavesKeys.length * (wavesKeys.length - 1)) / 2;
        
                makeGraphics(color, posX, h.current/1.7, bufferLength, dataArr, scaX, 0.5);
            }
        });
        requestRef.current= requestAnimationFrame(draw);
    },[waves, wavesKeys]);

    function makeGraphics(color, posX, posY, bufferLength, dataArr, circleScale, graphScale){
        ctx.current.strokeStyle = color;
        ctx.current.lineWidth = 1;
        ctx.current.beginPath();
        for(let i= 0; i < bufferLength; i ++){
    
            let x= (dataArr[i] - 128) * graphScale ;
            x= x + posX; 
        
            let y= (dataArr[bufferLength - i] - 128) * graphScale;
            y= y + posY;
    
            if(i === 0){
                ctx.current.moveTo(x,y);
            }else{
                ctx.current.lineTo(x,y);
            }
        }
        ctx.current.stroke();
    
        ctx.current.strokeStyle = color;
        ctx.current.lineWidth = 2;
        ctx.current.beginPath();
        for(let i= 0; i < bufferLength; i++){
            let x= posX + (dataArr[i] * circleScale) * Math.cos(2 * Math.PI * i / bufferLength);
            let y= posY + (dataArr[i] * circleScale) * Math.sin(2 * Math.PI * i / bufferLength);
    
            if(i === 0){
                ctx.current.moveTo(x,y);
            }else{
                ctx.current.lineTo(x,y);
            }
    
        }
        ctx.current.stroke();
    }

    //draw loop
    useEffect(()=>{
        //console.log("loop")
        requestRef.current= requestAnimationFrame(draw);
        return ()=> cancelAnimationFrame(requestRef.current);
    },[draw]);


    return(
        <canvas ref={canvas}  className="canvas"/>
    )
}