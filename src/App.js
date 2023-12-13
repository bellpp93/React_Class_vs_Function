import React, { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Hello World</h1>
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}

function FuncComp(props) {
  // 함수형 컴포넌트에서 state를 만들 때는 useState 함수를 호출해야 한다.
  var numberState = useState(props.initNumber);
  var number = numberState[0];
  var setNumber = numberState[1];

  // 코드를 좀 더 단순하고 보기 쉽게 구현하는 방법
  // var dateState = useState(new Date().toString());
  // var _date = dateState[0];
  // var setDate = dateState[1];
  // 주로 이 방식을 많이 사용 ↓↓↓
  var [_date, setDate] = useState(new Date().toString());

  console.log("numberState", numberState);
  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
      <input
        type="button"
        value="random"
        onClick={function () {
          setNumber(Math.random());
        }}
      ></input>
      <input
        type="button"
        value="date"
        onClick={function () {
          setDate(new Date().toString());
        }}
      ></input>
    </div>
  );
}

class ClassComp extends React.Component {
  // 클래스 컴포넌트에서는 state라는 하나의 객체 안에 number와 date를 모두 넣는다.
  state = {
    number: this.props.initNumber,
    date: new Date().toString(),
  };
  render() {
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input
          type="button"
          value="random"
          onClick={function () {
            this.setState({ number: Math.random() });
          }.bind(this)}
        ></input>
        <input
          type="button"
          value="date"
          onClick={function () {
            this.setState({ date: new Date().toString() });
          }.bind(this)}
        ></input>
      </div>
    );
  }
}

export default App;
