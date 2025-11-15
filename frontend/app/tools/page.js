'use client';
import { useState } from 'react';

export default function Tools(){
  const [moist, setMoist] = useState('');
  const [ph, setPh] = useState('');
  const [res, setRes] = useState('');

  const check = (e) => {
    e.preventDefault();
    const m = Number(moist), p = Number(ph);
    let msg = 'Unknown';
    if(m < 30) msg = 'Low moisture — irrigation recommended';
    else if(m <= 60) msg = 'Moisture OK';
    else msg = 'High moisture — avoid overwatering';

    if(p < 5.5) msg += ' | Acidic soil';
    else if(p <= 7.5) msg += ' | pH good';
    else msg += ' | Alkaline soil';

    setRes(msg);
  };

  return (
    <section>
      <h2>Tools</h2>
      <div className="card" style={{maxWidth:540}}>
        <h4>Soil Checker</h4>
        <form onSubmit={check}>
          <input placeholder="Moisture (%)" value={moist} onChange={e=>setMoist(e.target.value)} style={{width:'100%',padding:10,marginTop:8}}/>
          <input placeholder="pH value" value={ph} onChange={e=>setPh(e.target.value)} style={{width:'100%',padding:10,marginTop:8}}/>
          <button className="btn" style={{marginTop:8}}>Check</button>
        </form>
        {res && <div style={{marginTop:12}} className="card">{res}</div>}
      </div>
    </section>
  )
}
