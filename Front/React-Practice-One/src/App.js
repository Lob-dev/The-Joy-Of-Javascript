import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [c, d] = [10, 100];

  // ['남자 코트 추천', function]
  let [data , dataSetter] = useState(['남자 코트 추천', '강남 우동 맛집', '강남 고기 맛집']); 
  let [count, countSetter] = useState(0);
  let [modal, modalSetter] = useState(false);
  let [index, indexSetter] = useState(0);

  let [input, inputSetter] = useState('');
  // data 에 값이 하나일 때 인덱스로 접근 가능
  // 남 자 코 트 추 천
  // 0  1  2  3  4  5

  // data 에 값이 두개 이상일 때
  // 남자 코트 추천, 강남 우동 맛집
  // 0              1 

  // array, object와 같은 state는 직접 수정하지 않고 우선 deep copy 한 뒤
  // 변수에 저장하여 일부분을 수정하고 다시 state의 setter로 저장한다.
  // 1. Object.assign()  2. ...Variable  3. _.cloneDeep() <- 최고
  // 혹은 커스텀 함수를 사용한다.
 
  return (
    <div className="App">
      <div className="black-nav">
        <div className="title">
          개발 blog
        </div>
      </div>
      { 
        data.map((data, i) => {
          return (
            <div className="list" key={i}>
              <h4 onClick={ ()=>{ 
                modalSetter(true)
                indexSetter(i)
              }}>{ data } 
              <span onClick={ ()=>{ countSetter(count+1) } }>❤️</span> { count } </h4>
              <p>2월 17일 발행</p>
              <hr/>
            </div>
          )
        })
      }

      <div className="publish">
        <input onChange={ (e)=>{ inputSetter(e.target.value) } } />
        <button onClick={ ()=>{ 
          let newArray = [...data];
          newArray.unshift(input);
          dataSetter(newArray);
        } }>전송</button>
      </div>
      
      <button onClick={ () => { 
        let newArray = [...data];
        newArray[0] = '여성 코트 추천';
        dataSetter(newArray);
      }}>버튼</button>
      <button onClick={ ()=>{ indexSetter(0) } }>버튼1</button>
      <button onClick={ ()=>{ indexSetter(1) } }>버튼2</button>
      <button onClick={ ()=>{ indexSetter(2) } }>버튼3</button>
      <button onClick={ ()=>{ modalSetter(!modal) } }>열고닫기</button>
      {
        modal === true
        ? <Modal data={ data } index={ index } />
        : null
      }
      
    </div>
  );
}


// 컴포넌트 생성
// 함수를 만들고
// 축약을 원하는 HTML에 넣고
// 사용하기 원하는 곳에 <함수명 /> 형식으로 작성한다.
function Modal(props){
  return (
    <div className="modal">
      <h2>{ props.data[props.index] }</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;
