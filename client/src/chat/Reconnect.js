import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {DISCONNECTED, FAIL} from "../connectionConst";
import { connect } from "../redux/actions/chatActions";

import "./reconnect.css"

export default function Reconnect({connectionState}){
    const dispatch= useDispatch();
    const [seconds, setSeconds]=useState(5);

    useEffect(()=>{
        if(connectionState === FAIL){
            let sec= 5;
            const timer=setInterval(()=>{
                setSeconds(sec);
                sec --;
                if(sec === -2){
                    clearInterval(timer);
                    dispatch(connect());
                    setSeconds(5);
                }
            }, 1000);
        }
    },[connectionState, dispatch]);

    return(
        <div className="reconnectContainer">
            {
                connectionState === DISCONNECTED ?
                (
                    <>
                    <h3>Connecting to server</h3>
                    <p>please wait...</p>
                    </>
                ) : connectionState === FAIL ? 
                (
                    <>
                    <h3>Unable to connect to server</h3>
                    <p>trying to reconnect in {seconds} seconds</p>
                    </>
                ): (null)
            }

        </div>
    )
}