import React, { useState, useEffect, useRef } from 'react';

function App() {
const 최대높이= 4000;
const 기본스크롤이동속도= 1;

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
//여기따지 대충 서버에서 데이터 가져오는 내용


  const listRef = useRef(null);
  const heightRef = useRef(최대높이);
  //usestate쓰면 계속 재렌더링되서 useRef사용
  useEffect(() => {
    let animationFrameId;
//animationFrameId:requestAnimationFrame함수에 대한 고유 id
// ->무한루프인 animateScroll을 끝낼 때 이 id로 구별해서 판별
    const animateScroll = () => {
      heightRef.current -= 기본스크롤이동속도;
      if (listRef.current) {
        listRef.current.style.transform = `translateY(-${heightRef.current}px)`;
      }

      animationFrameId = requestAnimationFrame(animateScroll);
      //requestAnimationFrame 화면주사율(60f 에 맞게 알아서 렌더링햊는 함수)
    };

    animationFrameId = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      //requestAnimationFrame 중단
    };
  }, []);

  if (loading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div>
      <h2 style={{position: 'fixed', top: '300px' ,left:'100px'}}>기린기린 그림들어갈자리</h2>
      <ul ref={listRef} style={{ position: 'relative', height: '100vh' }}>//이거 매직넘버 수정해야함
        {formData.map((item, index) => (
          <li
            key={item.timestamp || index}
            style={{
              position: 'absolute',
              top: `${10000 - item.question2 * 10}px`,//이거 매직넘버 수정해야함
              left: `600px`,
              whiteSpace: 'nowrap',
            }}
          >
            {item.question1} {item.question2}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
