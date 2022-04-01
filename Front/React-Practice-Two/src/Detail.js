import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from 'styled-components';
import './Detail.scss';

let hello = styled.div`
  padding : 20px;
`;

function Detail(props) {

  // 넘어온 url param 들을 object 형태( {key : value ...} )로 가지고 있다.
  let { id } = useParams();
  let find = props.shoes.find((i) => i.id == id);
  let history = useHistory();
  let [alert, alertSet] = useState(true);
  let [inputData, inputDataSet] = useState('');

  // alert가 변경될 때에만 해당 hook이 동작한다.
  useEffect(()=> {
    let timer = setTimeout(()=>{ alertSet(false)}, 2000)
  },[alert]);

  return (
    <div className="container">
          <hello> <h4 className="red"> sadasdas </h4> </hello>

          <input onChange={(e)=>{ inputDataSet(e.target.vaule) }} />

          {
            alert === true
            ? (<div className="my-alert2">
                <p>재고가 얼마 남지 않았습니다.</p>
              </div>)
              : null
          }

          <div className="row">
            <div className="col-md-6">
              <img src={ `https://codingapple1.github.io/shop/shoes${find.id}.jpg` } width="100%" alt="White and Black shoes" />
            </div>
            <div className="col-md-6 mt-4">
              <h4 className="pt-5"> { find.title } </h4>
              <p> { find.content } </p>
              <p> { find.price } </p>
              <StockInfo stock={ props.stock[id] }/>
              <button className="btn btn-danger" onClick={()=>{
                let datas = [...props.stock];
                datas[id] -= 1;
                props.stockSet([...datas]);

              }}>주문하기</button> 
              <button className="btn btn-danger" onClick={()=>{
                history.push('/');
              }}>뒤로가기</button> 
            </div>
          </div>
        </div> 
  );
}


function StockInfo(props) {
  return (
    <p>재고 : { props.stock }</p>
  );
}

export default Detail;