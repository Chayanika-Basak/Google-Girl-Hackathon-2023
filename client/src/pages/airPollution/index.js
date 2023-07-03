import React , {useState, useEffect} from 'react'
import MyLayout from '../myLayout'
import Chart from 'chart.js/auto'
import { geoKey, aqiKey } from '../confidential'

const index = () => {
    var myChart = null;
    const getAirQualityData = async (getAddress, getPollutant) => {
        var address = "New Delhi";
        var pollutant = "co";
        if(getAddress) address=getAddress;
        if(getPollutant) pollutant = getPollutant;
        var response = await fetch(`http://api.positionstack.com/v1/forward?access_key=${geoKey}&query=${address.replace(/ /g, "+")}`);
        var data = await response.json();
        const lat = data['data'][0]['latitude'];
        const lon = data['data'][0]['longitude'];
        // parseInt((new Date('2012.08.10').getTime() / 1000).toFixed(0))
        let cd = new Date();
        let mon = cd.getMonth()+1;
        let day = cd.getDate();
        if(mon<10) mon = "0" + mon;
        if(day<10) day = "0" + day;
        let currDate = cd.getFullYear() + '.' + mon + '.' + day;
        let st = parseInt((new Date(currDate).getTime() / 1000).toFixed(0));
        // let st = 1688322600;
        let e = parseInt((Date.now() / 1000).toFixed(0));
        // let e = 1688408999;
        response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${st}&end=${e}&appid=${aqiKey}`);
        data = await response.json();
        var co=[];
        var time=[];
        console.log(data);
        for(var el in data["list"]){
            console.log(el);
            co.push(data["list"][el]["components"][pollutant]);
            var t = new Date(data["list"][el]["dt"] * 1000);
            var hr = t.getHours();
            var mins = "0" + t.getMinutes();
            var ft = hr + ':' + mins.substr(-2);
            time.push(ft);
        }
       const canvas = document.createElement('canvas');
       canvas.width = 300;
       canvas.height = 150;
       var div = document.getElementById("julyChart");
       var toReplace = div.children[0];
       div.replaceChild(canvas,toReplace);
       myChart = new Chart(canvas, {
         type: "line",
         data: {
             labels: time,
             datasets: [{
               fill: false,
               lineTension: 0,
               backgroundColor: "rgba(0,0,255,1.0)",
               borderColor: "rgba(0,0,255,0.1)",
               data: co
             }]
         },
         options: {
           legend: {display: false},
           scales: {
             y: {
               title : {
                 display:true,
                 text:'CO emissions for today'
               }
             },
             x: {
               title: {
                 display: true,
                 text: 'Time'
               }
             }
           }
         }
       });
      }

      useEffect(()=>{
        getAirQualityData();
      },[])
  return (
    <MyLayout pageName="airPollution">
    <div>
    <div className='flex flex-col w-3/5 px-5 rounded-41xl shadow-md'>
        <div className='h-36'>
        <h1 className='text-lg text-center'>Carbon Monoxide Emissions for Today</h1>
        <hr className='mt-4'/>
        </div>
        <div className='flex items-center'>
          <input type="text" className='border w-1/2' id="address" placeholder="New Delhi"></input>
          <button className='w-1/2 rounded-full bg-teal-300 ml-4 py-1 shadow-md' onClick={() => getAirQualityData(document.getElementById("address").value, "co")}>
            Get Chart
          </button>
        </div>
        <div id="julyChart">
            <div>
            </div>
        </div>
        {/* <div className='flex items-center'>
          <div className='w-64'>
            <img src='/images/thermometer.png' alt='thermometer'/>
          </div> */}
          {/* <h1 className='text-xl font-bold'>{ans}°C</h1> */}
        {/* </div> */}
      </div>
    </div>
    </MyLayout>
  )
}

export default index