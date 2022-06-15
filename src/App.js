/*eslint-disable*/
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import data from './route/Data.js'
import DetailPage from './route/Detail.js'
import Cart from './route/Cart.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios'

function App() {




  let [player, setPlayer] = useState(data);
  let [sort_fun, setSort] = useState('가나다순');
  let navigate = useNavigate();
  let [nums, setNums] = useState(0);
  let get_local = localStorage.getItem('data')




  useEffect(() => {

    
    get_local === null ? localStorage.setItem('data', JSON.stringify([])) : null
  }, [])
  
  return (
    <div className="App">

      
  <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home" onClick={() => {
      localStorage.removeItem('data');
    }}>Liverpool</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <Nav.Link onClick={() => {navigate('/cart')}}>Cart</Nav.Link>
    </Nav>
    </Container>
  </Navbar>

  <Routes>
        <Route path="/Detail/:id" element={<DetailPage player={data}/>}/>
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="*" element={<>
      <div>404 error</div>
      </>} />
        <Route path="/" element={
        <>
    <div className="main-bg"></div>
    <div className="cart-box">
      {get_local}
    </div>
    <button
    onClick={() => {
      let player_1 = [...player];
      let player_2 = [...player];
      player_1 = player_1.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
      player_2 = player_2.sort((a, b) => a.id < b.id ? -1 : 1);
      sort_fun == '가나다순' ? setPlayer(player_1) : setPlayer(player_2);
      setSort( sort_fun == '가나다순' ? sort_fun = '원래대로' : sort_fun = '가나다순')
      console.log(player_1)
    }}>{sort_fun}</button>


      <div className="container">
        {/* <div className="alert alert-warning">
          2초이내 구매시 할인
        </div> */}
          <div className="row" style={{marginTop:'50px'}}>
              {
                player.map(function(a,i) {
                  return (
                    <List player={player[i]} i={i}/>
                    )
                  })
              }
          </div>
          <button onClick={() => {
          //   setNums(nums+=1);
          //   if (nums == 1) {
          //   axios.get('https://liverpooll.github.io/data/data1.JSON')
          //   .then((result) => {
          //     let player_1 = [...player];
          //     let new_player = [...player_1, ...result.data]
          //     setPlayer(new_player)
          //      })
          //   .catch(() => {
          //     console.log('실패함');
          //   })
          // } else if (nums == 2) {
            axios.get('https://liverpooll.github.io/data/data2.JSON')
            .then((result) => {
              let player_1 = [...player];
              let new_player = [...player_1, ...result.data]
              setPlayer(new_player)
               })
            .catch(() => {
              console.log('실패함');
            })
          }}>더보기
          </button>
      </div>



        </>
      }/>
      <Route path="/dd" element={<div> 0번째 선수 상세페이지 내용 </div>}/>
      <Route path="/event" element={<Event/>}>
      <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} /> 
      <Route path="two" element={<div>생일기념 쿠폰받기</div>} /> 
      </Route>


  </Routes>





  {/* <Button variant="outline-success">Success</Button> */}
     
    </div>
  );
}

const Event = () => {
  return (
  <div>
    <h4>오늘의이벤트</h4>
    <Outlet></Outlet>
  </div>
  )
}

const List = (props) => {


  let navigate = useNavigate();

  return (
  <div className="col-md-4">
  <Nav.Link onClick={() => {navigate('/detail/'+props.player.id)}} style={{display:'inline-block'}}>
  <img src={process.env.PUBLIC_URL + '/' + props.player.id + '.png'} width="70%" height="200px"/>
  </Nav.Link>
  <h4>{props.player.name}</h4>
  <p>{props.player.age}</p>
  <p>{props.player.position}</p>
</div>
  )
}



export default App;
