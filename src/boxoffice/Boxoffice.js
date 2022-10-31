/* eslint-disable */

import {useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
function Boxoffice() {
  // useState를 이용한 변수 선언
  const [viewDay, setViewDay] = useState();
  const [viewDayF, setViewDayF] = useState();
  const [officeList, setofficeList] = useState([]);

  // useRef를 이용한 date 박스에 써먹을 변수 선언
  const refdateIn = useRef();

  // 인자값을 너무 겁내지 마시고. 밑에서 변수 d를 받아서 이 함수에서 써먹겠다는 얘기다.
  const getBoxoffice = async (d) => {

    // url이 쿼리스트링으로 물려 있는 경우에는 
    // 니가 다음에 쓸 걸 생각해서 좀 떼 놓아라 다음에 쓰기 편하게.
    let url = 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?';
    url += 'key=' + 'f5eef3421c602c6cb7ea224104795888';
    url += '&targetDt=' + d;
    
    // 비동기 통신 :   //then.. catch 구문
    // fetch(url)
    // // .then((resp) => {return resp.json()})  
    // .then((resp) =>  resp.json())
    // .then((data) => console.log(data))
    // .catch((err) => {console.log(err)})

    //비동기 통신 : async ... await
    try {
      // url이 fetch될 때까지 await     
      const resp = await fetch(url);
      const data = await resp.json();
      let dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
      setofficeList(
        dailyBoxOfficeList.map((item) => <li key={item.movieCd}>
          <Link to= {'/mv?mvcd=' + item.movieCd}>
          <mark>{item.rank}</mark>&nbsp;
          {item.movieNm}&nbsp;
          {item.rankInten > 0 ? '🔼 ': item.rankInten < 0 ? '🔽' : ''}
          {Math.abs(Number(item.rankInten))}
          
          </Link>
        </li>)
      )

      console.log(dailyBoxOfficeList);
    } catch (err) {

    }
  }
  
  // 페이지가 처음 렌더링될 때 실행되는 Hook
  useEffect(() => {
    // 어제 날짜 추출
    // 인터넷에 찾아보시면 다른 방법이 있으실 수도 있고, 그렇게 하시면 된다.
    const yesterday = new Date();
    yesterday.setDate(new Date().getDate() - 1);
    let d = yesterday.toISOString().substring(0, 10).replaceAll('-','');
    // 박스오피스 open API 호출
    // useState로 만든 변수 변경
    setViewDay(d);
    getBoxoffice(d);
  }, [])
  
  // date 태그의 onChange에 써먹을 handleChange함수 선언
  const handleChange = (e) => {
    e.preventDefault();
    //current.value까지는 찍어주셔야 된다. current. 뒤에 다른 거를 찍는 경우도 있다.
    // *.current.focus같은 거. 포커싱해준다.
    // useRef(); 메서드로 받은 저 refdateIn의 현재 값을 
    // dash는 빼고 받아서 setViewDay에 넣겠다는 얘기다.
    setViewDay(refdateIn.current.value.replaceAll('-',''));
  }

  useEffect(() => {
    // 괄호를 치고 연산자를 친 저거는 앞의 변수가 true이면 AND 뒤의 값을 긁겠다는 뜻이다.
    // 이때 값이 있으면 true, 없으면 false.
    // 이 짓을 왜 했냐면 바로 자르니까 딜레이때문에 undefined를 긁었거든.
    (viewDay && setViewDayF(viewDay.substring(0,4) + '.' + viewDay.substring(4,6)+'.'+viewDay.substring(6,8))); getBoxoffice(viewDay);
  },[viewDay])
  
  return (
    <>
    <h1>박스오피스 {viewDayF}일자</h1>
    <form>
      <input type="date" name='dateIn' ref={refdateIn} onChange={handleChange} />
    </form>
    <ul>
      {officeList}
    </ul>
    </>
    )
  }
  
  export default Boxoffice;