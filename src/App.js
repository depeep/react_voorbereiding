import React, { useState, useEffect } from 'react';
import './dataFetcher.css'; //voor het schaalbare grid

// JVP 18-11-2025 
// dit is een grote verbouwing van het axios bestand zie appDatafetcher.js
// Om een lokaal JSON-bestand op te halen in een React-app, kun je het bestand opnemen in je projectmap (bijvoorbeeld in de public folder) en het ophalen met fetch() in plaats van axios.
// - fetch() werkt direct met bestanden in de public folder.
// - axios probeert standaard via HTTP, wat niet werkt voor lokale bestanden buiten een servercontext.
//  axios is misschien wel te gebruiken als we met een backend werken (haalt daar volgens mij een json vandaan)

//app groter maken, hier functies of hooks  invoegen
function App() {
    return (
      <div>
        {/* <NameForm/> */}
        <DataFetcher/>
        </div>
    );
  }


  
// in het json bestand staat:
//      "id": "Kunstwerk 2",
//     "title": "Kunstwerk 2",
//     "artist": "Piet Onbekend",
//     "year": 2024,
//     "imageUrl": "https://picsum.photos/200/201",
//     "description": "Een mooie foto 2",
//     "techniques": ["Foto", "Lange sluitertijd"]

// voorlopig zinloos een formulier erbij
function NameForm() {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    alert('A name was submitted: ' + name);
    event.DataFetcher(); //geeft een error
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
//einde formulier

function DataFetcher() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/kunstwerken.json')  // root is de map public!
      .then(response => {
        if (!response.ok) {
          throw new Error('Netwerkfout');
        }
        return response.json();
      })
      .then(json => {
        setData(json);
      })
      .catch(error => {
        console.error('Fout bij ophalen van JSON:', error);
      });
  }, []);

  // hieronder eigenlijk gewoon html editten dit is de basiversie die alles onder elkaar zet
//   return (
//     <div>
//       {data.length > 0 ? (
//         <div>
//           {data.map((item) => (
//             <div key={item.id}>
//               <h2>{item.title}</h2>
//               <h3>{item.artist} {item.year}</h3>
//               <img src={item.imageUrl} alt={item.title} />
//               <p><b>beschrijving: </b><i>{item.description}</i></p>
//               <p><b>gebruikte technieken: </b><i>{item.techniques}</i></p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Bezig met laden...</p>
//       )}
//     </div>
//   );
// }



  return (
    <div>
      {data.length > 0 ? (
        <div className="grid-container"> 
          {data.map((item) => (
            <div className="grid-item" key={item.id}>
              <a href = "reactie.html"><img src={item.imageUrl} alt={item.title} /></a>

              <h2>{item.title}</h2>
              <h3>{item.artist} ({item.year})</h3>
              <p><b>Beschrijving:</b> <i>{item.description}</i></p>
              <p><b>Technieken:</b> <i>{item.techniques.join(', ')}</i></p>
            </div>
          ))}
        </div>
      ) : (
        <p>Bezig met laden...</p>
      )}
    </div>
  );
}



//het kreng naar de browser sturen, is er ook iets anders mogelijk dan default? zou leuk zijn >>Ja dus
// export default DataFetcher;
export default App;


//TODO:

//klik op plaatje geeft details (weghalen uit datafetcher)

//zoekfunctie zoeken op titel en kunstenaar

//favorieten markeren en bekijken

//opmerkingen achterlaten

//admin panel 

