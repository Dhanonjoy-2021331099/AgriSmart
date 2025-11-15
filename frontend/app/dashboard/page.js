'use client';
import ProtectedClient from '../../components/ProtectedClient';
import useSWR from 'swr';
import axios from 'axios';
import LineChart from '../../components/LineChart';
import { useEffect, useState } from 'react';

const fetcher = url => axios.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }).then(r=>r.data);

export default function Dashboard(){
  const api = process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api';
  const { data, error } = useSWR(api + '/sensor/latest', fetcher, { refreshInterval: 5000 });

  const [chartData, setChartData] = useState({labels:[], datasets:[]});
  useEffect(()=>{
    if(data){
      const reversed = [...data].reverse();
      setChartData({
        labels: reversed.map(d=>new Date(d.createdAt).toLocaleTimeString()),
        datasets: [
          { label:'Moisture', data: reversed.map(d=>d.moisture) },
          { label:'Temperature', data: reversed.map(d=>d.temperature) },
          { label:'pH', data: reversed.map(d=>d.ph) },
        ]
      });
    }
  },[data]);

  return (
    <ProtectedClient>
      <section>
        <h2>Farmer Dashboard</h2>
        <div className="grid-2" style={{marginTop:12}}>
          <div className="card">
            <h4>Live Sensor Chart</h4>
            {data ? <LineChart chartData={chartData} /> : <p>Loading chart...</p>}
          </div>

          <div>
            <div className="card">
              <h4>Latest readings</h4>
              <ul>
                {data?.slice(0,10).map((d,i)=>(
                  <li key={i} style={{marginBottom:8}}>
                    <strong>{new Date(d.createdAt).toLocaleString()}</strong><br/>
                    Moisture: {d.moisture} %, Temp: {d.temperature} °C, pH: {d.ph}
                  </li>
                )) || <p>No data yet</p>}
              </ul>
            </div>

            <div className="card" style={{marginTop:12}}>
              <h4>Quick Actions</h4>
              <button className="btn" onClick={async ()=>{
                // send demo data
                const token = localStorage.getItem('token');
                const sample = { moisture: Math.round(30+Math.random()*50), temperature: Math.round(18+Math.random()*12), ph: +(5+Math.random()*3).toFixed(1) };
                await axios.post(api + '/sensor/data', sample, { headers: { Authorization: 'Bearer ' + token }});
                alert('Sample data sent');
              }}>Send sample sensor data</button>
            </div>

          </div>
        </div>
      </section>
    </ProtectedClient>
  )
}
