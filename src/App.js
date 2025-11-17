// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



//  import React from 'react';
import React, { useState, useEffect } from 'react';
// useEffect is een hook die side effects in functionele componenten mogelijk maakt
// zoals data fetchen, subscriptions, of handmatig DOM updaten 
// zonder dat we class componenten hoeven te gebruiken
//  Hierboven importeren we useState en useEffect direct uit 'react'
// zodat we ze kunnen gebruiken zonder de React. prefix

function Welcome (props) {
    return <h1>Hello, {props.name}</h1>;
  }   

  function App() {
    return (
      <div>
        {/* OPDRACHT 1 */}
       <Welcome name="kAYLEIGH, dit gaat wel erg realtime" />
       {/* opdracht 2 */}
       <Counter />
       {/* opdracht 3 */}
        <Timer />
        {/* opdracht 4 */}
        {/* <Greeting name="Alice"></greeting> voorstel van VSCode, maar geeft mega-errors! */}
        <Greeting name="Alice"/>
        <Greeting name="Bob"/>
        <Greeting name="Charlie"/>
        {/* opdracht 5 */}
        <Nameform />
        </div>
    );
  }
// OPDRACHT 2 State en Props
// Maak een Counter component die een knop weergeeft.
// Elke keer dat de knop wordt geklikt, moet een teller met 1 worden verhoogd en de nieuwe waarde worden weergegeven.


function Counter() {
   // hier staat React.useState omdat we alleen React hebben geimporteerd met import React from 'react';
   // maar we kunnen ook direct useState importeren zoals hierboven gedaan is
  // const [count, setCount] = React.useState(0); 
 
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
// OPDRACHT 3 Gebruik van hooks: Side Effects met de hook useEffect
// Maak een Timer component die elke seconde een teller verhoogt en de verstreken tijd in seconden weergeeft.
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => prevCount + 1);     
    }, 1000);
    return () => clearInterval(timer);
  }, []); // lege dependency array betekent dat dit effect alleen bij de eerste render wordt uitgevoerd

  return (
    <div>
      <p>Timer: {count} seconds</p>
    </div>
  );
} 

// opdracht 4 Componenten en props

function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}

// opdracht 5 formulieren en gebeurtenissen
function Nameform() {
  const[name, setName] = useState ('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit =(event) =>{
    alert ('a name was submitted: '+ name);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <label>
        Name: 
        <input type="text"value={name} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
  }

  // opdracht 6 API-aanroep met Axios


  export default App; 
