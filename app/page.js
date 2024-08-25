/* eslint-disable react/no-unescaped-entities */

"use client";

import { useEffect, useState } from 'react';
import BarChart from '../components/BarChart';

export default function Home() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/statistics');
      const result = await res.json();
      setData(result.data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the date to ISO 8601 format (YYYY-MM-DD)
    const formattedDate = new Date(date).toISOString().split('T')[0];

    const newData = {
      date: formattedDate,
      value: parseFloat(value), // Convert value to a number
    };

    const res = await fetch('/api/statistics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });

    if (res.ok) {
      const updatedData = await res.json();
      setData(updatedData.data);
      setDate('');
      setValue('');
    }
  };

  return (
    <div>
      <a href="https://djapbarchart1.vercel.app/" target="_blank" rel="noopener noreferrer"style={{ color: 'blue', textDecoration: 'underline' }}>Advisor Protection Tracking</a>
    
      <h1>COAST Financial Solutions - Advisor Mortgage Tracking</h1>
      <h2>Add 'Month End' Data</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'flex-end', // Align items at the bottom of the container
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column'}}> 
          <label>Date:</label>
          <input style={{padding: '5px 10px'}}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Value:</label>
          <input style={{padding: '5px 10px'}}
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ padding: '5px 10px' }}>
          Add Data
        </button>
      </form>

      
      {data.length > 0 ? <BarChart data={data} /> : <p>Loading...</p>}
    </div>
  );
}
