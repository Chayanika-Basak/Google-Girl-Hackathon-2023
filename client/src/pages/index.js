import React, {useState, useEffect} from 'react'
import { Inter } from 'next/font/google'
import MyLayout from './myLayout'
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
import Chart from 'chart.js/auto'
import data from '../../public/data/processedData';

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [ans, setAns] = useState(0);
  const [prev, setPrev] = useState(0);
  const [address, setAddress] = useState("New Delhi");
  const loadModel = async (getYear) => {
    console.log('Fetching and Running DNN Model...');
    let year = 2023;
    if(getYear) year=parseInt(getYear);
    const model = await loadGraphModel('./web_dnn_model/model.json');
    let ans = await model.predict(tf.tensor2d([[year]])).array();
    setAns(parseFloat(ans[0][0]).toFixed(2));
  }
  const compare = async (getYear) => {
    let year=2022;
    if(getYear) year=parseInt(getYear);
    const model = await loadGraphModel('./web_dnn_model/model.json');
    let ans = await model.predict(tf.tensor2d([[year]])).array();
    setPrev(parseFloat(ans[0][0]).toFixed(2));
  }
  var myChart = null;

  const plot = () => {
    var year = [];
    var temp = [];
    for(var key in data['year']){
      year.push(data['year'][key]);
    }
    for(var key in data['LandAndOceanAverageTemperature']){
      temp.push(data['LandAndOceanAverageTemperature'][key]);
    }
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 150;
    var div = document.getElementById("lineChart");
    var toReplace = div.children[0];
    div.replaceChild(canvas,toReplace);
    myChart = new Chart(canvas, {
      type: "line",
      data: {
          labels: year,
          datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: temp
          }]
      },
      options: {
        legend: {display: false},
        scales: {
          y: {
            title : {
              display:true,
              text:'Temperature'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Year'
            }
          }
        }
      }
    });
    // myChart.destroy();
  }

  useEffect(()=>{
    if(myChart) myChart.destroy();
    loadModel();
    compare();
    plot();
    // getWeatherData();
  },[])

  return (
    <MyLayout pageName="home">
      <div>
    <div className='flex items-center m-6 gap-5'>
      <div className='flex flex-col w-1/5 px-5 rounded-41xl shadow-md h-72'>
        <div className='h-36'>
        <h1 className='text-lg text-center'>Predictions for Global Average Land and Ocean Surface Temperature</h1>
        <hr className='mt-4'/>
        </div>
        <div className='mt-4 flex items-center'>
          <input type="number" className='border w-1/2' id="year" placeholder="2023"></input>
          <button className='w-1/2 rounded-full bg-teal-300 ml-4 py-1 shadow-md' onClick={() => loadModel(document.getElementById("year").value)}>Predict</button>
        </div>
        <div className='flex items-center'>
          <div className='w-64'>
            <img src='/images/thermometer.png' alt='thermometer'/>
          </div>
          <h1 className='text-xl font-bold'>{ans}°C</h1>
        </div>
      </div>
      <div className='flex flex-col w-1/5 px-5 rounded-41xl shadow-md h-72'>
        <div className='h-36'>
          <h1 className='text-lg text-center'>Compare with statistics from previous years</h1>
          <hr className='mt-4'/>
        </div>
        <div className='mt-4 flex items-center'>
          <input type="text" className='border w-1/2' id="prevYear" placeholder="2022"></input>
          <button className='w-1/2 rounded-full bg-teal-300 ml-4 py-1 shadow-md' onClick={() => compare(document.getElementById("year").value)}>
            Compare
          </button>
        </div>
        <div className='flex items-center'>
          <div className='w-64'>
            <img src='/images/thermometer.png' alt='thermometer'/>
          </div>
          <div className='flex flex-col'>
            <h1 className='text-lg font-bold'>{prev}°C</h1>
            <h1 className='text-md rounded-full bg-red-200 p-2'>{parseFloat(ans/prev).toFixed(3)}x increase</h1>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-3/5 px-5 rounded-41xl shadow-md mx-6'>
        <h1 className='text-xl'>Global Warming Trend along the years</h1>
        <div id="lineChart">
          <div></div>
        </div>
      </div>
    </div>
    <div id="julyChart">
      <div>
      </div>
    </div>
    </div>
    {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js" type='text/javascript'></Script> */}
    </MyLayout>
  )
}
