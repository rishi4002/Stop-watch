import { useState } from 'react';
import './App.css'

function App() {
 
 const [time, setTime]= useState({millisec: 0, sec: 0, min: 0});
 const [intervalId, setintervalId] = useState(null);
 const [timeRunning, settimeRunning]= useState(false);
 const [restart, setrestart]= useState(false);
 const [stoped, setstoped]= useState(false);
 const [lap, setLap]= useState([]);

 const handelStart= ()=>{
  settimeRunning(true);
  setstoped(true);
   const interval= setInterval(()=>{
      setTime((prev)=>{
         if(prev.millisec == 100 && prev.sec<60){
          return {millisec: 0, sec: prev.sec+1, min: prev.min}
         }else if(prev.sec == 60){
          return {millisec: 0, sec: 0, min: prev.min+1}
         }else{
          return {millisec: prev.millisec+1, sec: prev.sec, min: prev.min}
         }
      })
      setintervalId(interval);
  }, 10);
 }

 const handelStop= ()=>{
  setrestart(true);
  setstoped(false);
   clearInterval(intervalId);
 }

 function handelReset(){
  settimeRunning(false);
  setrestart(false);
  setTime({millisec:0, sec: 0, min: 0});
  setLap([]);
 }

 const handelLap=()=>{
  const newlap= [...lap,{time}];
  setLap(newlap);
 }

  return(
    <div className='fulldiv'>
    <div className='timediv'>{time.min} :: {time.sec}. {time.millisec}</div>
    {timeRunning || <button onClick={handelStart} className='startbutton'>Start</button>}
    {restart && <button onClick={handelReset} className='resetbutton'>Reset</button>}
    {stoped && <div>
      <button onClick={handelStop} className='stopbutton'>Stop</button>
     <button onClick={handelLap} className='lapbutton'>Lap</button>
     </div>}
     <div className='laptimediv'>
    {lap.map((e,i)=> <div key={i} className='laptime'>{e.time.min}::{e.time.sec}.{e.time.millisec}</div>)}
    </div>
    </div>
  )
}

export default App
