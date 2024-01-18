import './App.css';
import React from 'react'

function App() {
  const [start, setStart] = React.useState('');  
  const [end, setEnd] = React.useState('');  
  const [display, setDisplay] = React.useState(true);
  const [time, setTime] = React.useState("00:00:00");
  const [percent, setPercent] = React.useState(0);
  const splitStart = start.split(":");
  const splitEnd = end.split(":");

  function changePage()
  {
    setTime(new Date().toLocaleTimeString());
    setDisplay(!display);
    setInterval(tick, 1000);
  }

  function tick()
  {
    const timeNow = new Date();
    const timeStart = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDay(), parseInt(splitStart[0], 10), parseInt(splitStart[1], 10), parseInt(splitStart[2], 10));
    const timeEnd = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDay(), parseInt(splitEnd[0], 10), parseInt(splitEnd[1], 10), parseInt(splitEnd[2], 10));
    const lessonLength = (timeEnd - timeStart) / 60000;
    const timePassed = (new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDay(), timeNow.getHours(), timeNow.getMinutes(), timeNow.getSeconds()) - timeStart) / 60000;
    
    setPercent((timePassed * 100 / lessonLength).toFixed(2));
    setTime(timeNow.toLocaleTimeString());
  }
  
  return (  
    <div className="App">
      { display ? <div className="mainPage">
        <input placeholder='Начало урока' onChange={event => setStart(event.target.value)} value={start}></input>
        <input placeholder='Конец урока' onChange={event => setEnd(event.target.value)} value={end}></input>
        <button onClick={changePage}>GO</button>
      </div>
      : <div className="timePage">
          <div>
            <div style={{width: `${percent}%`}}/>
          </div>
        <h1>{time}</h1>
        <h3>{percent}%</h3>
      </div>
      }
    </div>
  );
}

export default App;