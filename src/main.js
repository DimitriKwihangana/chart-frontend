import React, { useState, useEffect } from "react";
import "./App.css";
import Barchat from "./component/Barchat";
import { Line } from "react-chartjs-2";
import LineChart from "./component/Line";

import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

function App() {
  const [click, setClick] = useState(true)
  const [finData, setFinData] = useState([]);
  const [selectedFII, setSelectedFII] = useState("");
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Year 2008",
        data: [],
      },
    ],
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let labels = [];
    let datasets = [];

    if (selectedFII) {
      const selectedData = finData.find((data) => data.FII === selectedFII);

      labels = [selectedFII];

      datasets = [
        {
          label: "Year 2008",
          data: selectedData ? [selectedData.year2008] : [],
          backgroundColor: "blue",
        },
        {
          label: "Year 2012",
          data: selectedData ? [selectedData.year2012] : [],
          backgroundColor: "red",
        },
        {
          label: "Year 2016",
          data: selectedData ? [selectedData.year2016] : [],
          backgroundColor: "green",
        },
        {
          label: "Year 2020",
          data: selectedData ? [selectedData.year2020] : [],
          backgroundColor: "yellow",
        },
      ];
    } else {
      labels = finData.map((data) => data.FII);

     datasets = [
       {
         label: "Year 2008",
         data: finData.map((data) => data.year2008 * 100),
         backgroundColor: "blue",
       },
       {
         label: "Year 2012",
         data: finData.map((data) => data.year2012 * 100),
         backgroundColor: "red",
       },
       {
         label: "Year 2016",
         data: finData.map((data) => data.year2016 * 100),
         backgroundColor: "green",
       },
       {
         label: "Year 2020",
         data: finData.map((data) => data.year2020 * 100),
         backgroundColor: "yellow",
       },
     ];
    }

    setUserData((prevState) => ({
      ...prevState,
      labels,
      datasets,
    }));
  }, [finData, selectedFII]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://chart-backendd-dimitri.onrender.com/api/table",
        {
          method: "GET",
        }
      );
      const result = await response.json();
      setFinData(result);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedFII(event.target.value);
  };

  const handleClick = () => {
    const term = document.getElementById("term").value;
    searchData(term)
  
  }
  const handleChange = (event) => {
    setClick(!click);
  };

  const searchData = async(term) => {
    try {
      const search = await fetch(
        `https://chart-backendd-dimitri.onrender.com/api/table/find/${term}`,
        {
          method: "POST",
        }
      );
      const search_data = await search.json()
      console.log(search_data)
      setSelectedFII(search_data.FII)
    } catch (error) {
      console.log(error)
      
    }
  } 
const handleDownload = () => {
  const screen = document.getElementById("chart"); 

  html2canvas(screen).then((canvas) => {
    
    canvas.toBlob((blob) => {
      saveAs(blob, "screenshot.png"); 
    });
  });
};



  return (
    <div className="App">
      <h1>Financial inclusion Indicators</h1>
      <input
        type="text"
        placeholder="Enter the indicator"
        id="term"
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          backgroundColor: "#f2f2f2",
          border: "1px solid #ccc",
          boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
          width: "200px",
          color: "#333",
        }}
      />
      <button
        style={{
          padding: "10px",
          fontSize: "20px",
          borderRadius: "5px",
          backgroundColor: "green",
          border: "1px solid #ccc",
          boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
          color: "white",
        }}
        id="btn"
        onClick={handleClick}
      >
        Search
      </button>
      <select
        value={selectedFII}
        onChange={handleDropdownChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          backgroundColor: "#f2f2f2",
          border: "1px solid #ccc",
          boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
          width: "200px",
          color: "#333",
          marginLeft: "80px",
          marginBottom: "30px",
        }}
      >
        <option value="">Select FII</option>
        {finData.map((data) => (
          <option key={data.FII} value={data.FII}>
            {data.FII}
          </option>
        ))}
      </select>
      <button style={{marginLeft:'20px'}} onClick={handleChange}>change chart</button>

      <div id="chart">
        {!click ? (
          <Barchat chartData={userData} />
        ) : (
          <LineChart chartData={userData} />
        )}
      </div>

      <button
        style={{
          padding: "10px",
          fontSize: "20px",
          borderRadius: "5px",
          backgroundColor: "green",
          border: "1px solid #ccc",
          boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
          color: "white",
        }}
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
}

export default App;
