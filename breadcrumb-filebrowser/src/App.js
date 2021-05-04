import {React,useState,useEffect} from 'react';
import './App.css';
import Breadcrumb from './components/breadcrumb/breadcrumb.components';

function App() {
  const [crumbs, setCrumbs] = useState([]);
  const [currentData,setCurrentData] = useState();

  const selected = crumb => {
    fetch(`http://localhost:5000/path/${crumb}`)
    .then(response => response.json())
    .then(data => setCurrentData(data.data));
    
  }

  useEffect(() => {
    // Update the document title using the browser API
    fetch('http://localhost:5000/directories')
    .then(response => response.json())
    .then(data => setCrumbs(data.data));
    // setCrumbs(['root','home','myname','projects','mysupersecretproject'])
  },[]);


  return (
    <div className="App container">
      <Breadcrumb crumbs={ crumbs } selected={ selected }  />
      <h2>{currentData}</h2>
    </div>
  );
}

export default App;
