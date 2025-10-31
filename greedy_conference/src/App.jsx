import React, { useState, useEffect } from 'react';

function App() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);


  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxHZ5gnTufLiiCZp84solX1laCszMd5jXiRmIfqqDl_OpiIKmQen8VEqMa5qPI6hKk/exec"

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        

        const response = await fetch(APPS_SCRIPT_URL);


        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        const jsonData = await response.json();
        

        console.log("Fetched data:", jsonData);
        
        setFormData(jsonData); 

      } catch (error) {
        console.error("데이터 패치 실패! (CORS 또는 배포 문제일 수 있습니다):", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div>
      <h2>구글 폼 응답 데이터</h2>
      <ul>
        {formData.map((item, index) => (
    
          <li key={item.timestamp || index}>
            <strong>{item.timestamp}:</strong> 
            <br />
            {item.question1}
            <br />
            {item.question2}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

