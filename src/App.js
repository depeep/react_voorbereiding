import React, { useState, useEffect } from 'react';
import './dataFetcher.css'; //voor het schaalbare grid

// JVP 18-11-2025 
// dit is een grote verbouwing van het axios bestand zie appDatafetcher.js
// Om een lokaal JSON-bestand op te halen in een React-app, kun je het bestand opnemen in je projectmap (bijvoorbeeld in de public folder) en het ophalen met fetch() in plaats van axios.
// - fetch() werkt direct met bestanden in de public folder.
// - axios probeert standaard via HTTP, wat niet werkt voor lokale bestanden buiten een servercontext.
//  axios is misschien wel te gebruiken als we met een backend werken (haalt daar volgens mij een json vandaan)

//app groter maken,
function App() {
    return (
      <div>
        <TopBar/>
        <DataFetcher/>
        </div>
    );
  }
//het kreng naar de browser sturen
export default App;
  
// in het json bestand staat:
//      "id": "Kunstwerk 2",
//     "title": "Kunstwerk 2",
//     "artist": "Piet Onbekend",
//     "year": 2024,
//     "imageUrl": "https://picsum.photos/200/201",
//     "description": "Een mooie foto 2",
//     "techniques": ["Foto", "Lange sluitertijd"]



//TODO:

// balk (met dummies)
function TopBar() {
  //werken ophalen met een knop 
  // const [showFetcher, setShowFetcher] = useState(false);
  // const handleShowFetcher = () => {
  //   setShowFetcher(true);
   
  // };

    // info tonen
  // const [showInfo, setShowInfo] = useState(false);
  // const handleShowInfo = () => {
  //       setShowInfo(true);
  // };

  const handleDummy1 = () => {
    alert('Dummy functie 1 aangeroepen');
  };

  const handleDummy2 = () => {
    alert('Dummy functie 2 aangeroepen');
  };

  const handleDummy3 = () => {
    alert('Dummy functie 3 aangeroepen');
  };

  // verwijderd
  // <button onClick={handleShowFetcher}>Gallerij</button>
  // {showFetcher && <DataFetcher/>}
  return (
    <div>
      <div style={styles.bar}>
        
        <button onClick={handleDummy1}>Dummy 1</button>
        <button onClick={handleDummy2}>Dummy 2</button>
        <button onClick={handleDummy3}>Dummy 3</button>
      </div>
      
    </div>
  );
}
// naar css?
const styles = {
  bar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e4ddddff',
    padding: '1rem',
    color: 'white',
  },
};


function DataFetcher() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('/kunstwerken.json');
      if (!response.ok) throw new Error('Netwerkfout');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Fout bij ophalen van JSON:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showInfo = (item) => {
    setData([]); // leegmaken
    setTimeout(() => setSelectedItem(item), 300);
  };

  const handleBack = () => {
    setSelectedItem(null);
    setData([]);
    fetchData();
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    const foundItem = data.find(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundItem) {
      showInfo(foundItem);
    } else {
      alert('Geen kunstwerk gevonden met deze zoekterm.');
    }
  };

  return (
    <div>
      {selectedItem ? (
        // Info weergeven van werk
        <div className="info-container">
          <img src={selectedItem.imageUrl} width="25%" alt={selectedItem.title} />
          <h2>{selectedItem.title}</h2>
          <h3>{selectedItem.artist} ({selectedItem.year})</h3>
          <p><b>Beschrijving:</b> {selectedItem.description}</p>
          <p><b>Technieken:</b> {selectedItem.techniques.join(', ')}</p>
          <button onClick={handleBack}>Terug</button>
        </div>
      ) : data.length > 0 ? (
        <>
          {/* Zoekfunctie, geeft nog niet meer dan een werk weer, dat is nog bagger */}
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Zoek op titel of kunstenaar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Zoek</button>
          </div>
          {/* gallerij */}
          <div className="grid-container">
            {data.map((item) => (
              <div className="grid-item" key={item.id}>
                <img src={item.imageUrl} alt={item.title} />
                <h2>{item.title}</h2>
                <h3>{item.artist} ({item.year})</h3>
                <button onClick={() => showInfo(item)}>Info</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Bezig met laden...</p>
      )}
    </div>
  );
}


// function DataFetcher() {
//   const [data, setData] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('/kunstwerken.json');
//       if (!response.ok) throw new Error('Netwerkfout');
//       const json = await response.json();
//       setData(json);
//     } catch (error) {
//       console.error('Fout bij ophalen van JSON:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData(); // eerste keer laden
//   }, []);

//   const showInfo = (item) => {
//     setData([]); // leegmaken
//     setTimeout(() => setSelectedItem(item), 300);
//   };

//   const handleBack = () => {
//     setSelectedItem(null); // detailweergave sluiten
//     setData([]); // leegmaken voor effect
//     fetchData(); // opnieuw vullen
//   };

//   return (
//     <div>
//       {selectedItem ? (
//         <div className="info-container">
//           <img src={selectedItem.imageUrl} width="25%" alt={selectedItem.title} />
//           <h2>{selectedItem.title}</h2>
//           <h3>{selectedItem.artist} ({selectedItem.year})</h3>
//           <p><b>Beschrijving:</b> {selectedItem.description}</p>
//           <p><b>Technieken:</b> {selectedItem.techniques.join(', ')}</p>
//           <button onClick={handleBack}>Terug</button>
//         </div>
//       ) : data.length > 0 ? (
//         <div className="grid-container">
//           {data.map((item) => (
//             <div className="grid-item" key={item.id}>
//               <img src={item.imageUrl} alt={item.title} />
//               <h2>{item.title}</h2>
//               <h3>{item.artist} ({item.year})</h3>
//               <button onClick={() => showInfo(item)}>Info</button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Bezig met laden...</p>
//       )}
//     </div>
//   );
// }


// V Info weergeven bij alle werken

// function ShowInfo() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('/kunstwerken.json')  // root is de map public!
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Netwerkfout');
//         }
//         return response.json();
//       })
//       .then(json => {
//         setData(json);
//       })
//       .catch(error => {
//         console.error('Fout bij ophalen van JSON:', error);
//       });
//   }, []);



  // return (
  //   <div>
  //     {data.length > 0 ? (
  //       <div className="grid-container"> 
  //         {data.map((item) => (
  //           <div className="grid-item" key={item.id}>
  //             <img src={item.imageUrl} alt={item.title} />
  //             <p><b>Beschrijving:</b> <i>{item.description}</i></p>
  //             <p><b>Technieken:</b> <i>{item.techniques.join(', ')}</i></p>
  //           </div>
  //         ))}
  //       </div>
  //     ) : (
  //       <p>Bezig met laden...</p>
  //     )}
  //   </div>
  // );
// }


//V zoekfunctie zoeken op titel en kunstenaar 



//favorieten markeren en bekijken

//opmerkingen achterlaten

//admin panel 

