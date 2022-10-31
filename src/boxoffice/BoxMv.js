// 주소를 당기려고 가져온거.
import { useLocation } from "react-router-dom";
import qs from 'query-string';
import { useEffect, useState } from "react";
import Mvinfo from './Mvinfo'

export default function BoxMv() {
  // useLocation hook을 쓰는 변수 만들기.
  // 콘솔에 useLocation()만 찍어보니까 니가 받아야하는 주소가 search에 있더라.
  const loc = useLocation().search;

  // 파싱을 한다는 게 뭔 얘기냐면 매개변수를 object 타입으로 바꾸겠다는 얘기다.
  // 그 뒤에 .mvcd만 찍으면 Key값만 빼내게 되는거고.
  const mvcd = qs.parse(loc).mvcd;
  console.log(mvcd);

  const [mv, setMv] = useState();
  const [mvinfo, setMvinfo] = useState();

  const getMovie = async (mvcd) => {
    let url = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?'
    url += 'key=' + 'f5eef3421c602c6cb7ea224104795888'
    url += '&movieCd=' + mvcd;

    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    setMv(data);
  }

// 여기 안에서는 방금 써먹으신 async... await를 먹이기 힘들다.
  useEffect(() => {
    getMovie(mvcd);
  }, []);
    
  return (
    <>
    {mv && <Mvinfo m={mv}/>}
    </>
  )
}