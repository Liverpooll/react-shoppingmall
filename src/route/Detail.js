import { useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { pushCount, increase } from "../store"
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Cart from './Cart.js'



const DetailPage = (props) => {

  let [fade2, setFade2] = useState('');
  let {id} = useParams();
  let [tab, setTab] = useState(0);
  let cart = useSelector( state => state )
  let dispatch = useDispatch()
  let a = 1;
  // let [axios_arr, setAxios] = useState(
  //   axios.get('https://liverpooll.github.io/data/data1.JSON')
  //   .then((result) => {
  //     console.log(result.data)
  //      })
  //   .catch(() => {
  //     console.log('실패함');
  //   })
  // )

  useEffect(()=>{
    setTimeout(()=>{ setFade2('end') }, 100)
    let get_local = localStorage.getItem('data');

    if (get_local == null) {
      get_local = [];
    } else {
      get_local = JSON.parse(get_local);
    }

    get_local.push(id);
    get_local = new Set(get_local);
    get_local = [...get_local];
    localStorage.setItem('data', JSON.stringify(get_local));


    return ()=>{
      setFade2('');
    }
  }, []);
  



  return(
    
<div className={'container start' + fade2}>
  <div className="row">
    <div className="col-md-6">
      <img src={props.player[id].image} width="100%" />
    </div>
    <div className="col-md-6">
      <h4 className="pt-5">{props.player[id].name}</h4>
      <p>{props.player[id].age}</p>
      <p>{props.player[id].position}</p>
      <button className="btn btn-danger" onClick={() => {
        let push_obj = {
          id : [id],
          name : props.player[id].name,
          count : 1
        }
        dispatch(pushCount(push_obj))
      }}>주문하기</button> 
      <Routes>
        <Route path="../Cart" element={<Cart/>}/>
      </Routes>
    </div>
  </div>
    <Nav variant="pills" defaultActiveKey="link-0" style={{marginTop : '20px'}}>
      <Nav.Item>
        <Nav.Link onClick={ () => {setTab(0)}
        } eventKey="link-0">Option 1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={ () => {setTab(1)}} eventKey="link-1">Option 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={ () => {setTab(2)}} eventKey="link-2">Option 3</Nav.Link>
      </Nav.Item>
    </Nav>

    <Tabcontent tab={tab}/>



</div> 

)
}




function Tabcontent ({tab}) {
  // if (tab == 0) {
  //   return <div>0</div>
  // } else if (tab == 1) {
  //   return <div>1</div>
  // } else {
  //   return <div>2</div>
  // }
  let [fade, setFade] = useState('');

  useEffect(() => {
    setTimeout(() => {setFade('end')}, 100);
    return () => {
      setFade(''); 
    }
  }, [tab])

  return (<div className={'start ' + fade}>
    { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab] }
  </div>);
}


export default DetailPage;