import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './css1.css'

function MvInfo(props) {
  const [mlis, setMlis] = useState(); 
  useEffect(() => {

  const mvinfo = props.m.movieInfoResult.movieInfo;
  

  let myinfo = {};
  const key1 = ['movieNm', 'movieCd', 'openDt', 'prdtStatNm', 'showTm'];
  const key2 = ['audits', 'nations', 'directors', 'genres', 'companys'];
    // 한글화 1
  const keys = {
    'movieNm' : '영화명',
    'movieCd' : '영화코드',
    'openDt' : '개봉일자',
    'prdtStatNm' : '제작상태',
    'showTm' : '상영시간',
    'audits' : '관람등급',
    'nations' : '제작국가',
    'directors' : '감독',
    'genres' : '장르',
    'companys' : '배급사',
  }
  
  // key1에 해당하는 값 추출 : Object의 경우.
  for (let k of key1) {
    myinfo[keys[k]] = mvinfo[k];
  }

  // key2에 해당하는 값 추출 : 배열의 경우.
  for (let k of key2) {
    switch (k) {
      case 'audits' :
        myinfo[keys[k]] = mvinfo[k].map((item) => item.watchGradeNm);
        break;
      case 'nations' :
        myinfo[keys[k]] = mvinfo[k].map((item) => item.nationNm);
        break;
      case 'directors' :
        myinfo[keys[k]] = mvinfo[k].map((item) => item.peopleNm);
        break;
      case 'genres' :
        myinfo[keys[k]] = mvinfo[k].map((item) => item.genreNm);
        break;      
      case 'companys' :
        myinfo[keys[k]] = mvinfo[k].filter((item) => item.companyPartNm === '배급사');
        myinfo[keys[k]] = myinfo[keys[k]].map((item) => item.companyNmEn);
        break;
    }
  }
  console.log(myinfo);
  // 화면에 출력할 내용을 JSX로 만들기
  let lis = [];
  for (let [k, v] of Object.entries(myinfo)) {
    lis.push(<li key={myinfo.movieCd + k} className='li1'>
      <span className='span1'>{k}:</span>
      <span className='span2'>{v}</span></li>);
  }

  setMlis(lis);
    
}, [])
  return (
    <>
    <h1>영화 상세</h1>
    <ul>
      {mlis}
      <br/>
      <button><Link to='/'>홈으로</Link></button>
    </ul>
    </>
  );
}

export default MvInfo;