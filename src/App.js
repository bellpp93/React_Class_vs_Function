import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  var [funcShow, setFuncshow] = useState(true);
  var [classShow, setClassShow] = useState(true);
  return (
    <div className="container">
      <h1>Hello World</h1>
      <input type="button" value="remove func" onClick={
        function() {
          setFuncshow(false)
        }}></input>
      <input type="button" value="remove class" onClick={
        function() {
          setClassShow(false)
        }}></input>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}

var funcStyle = "color:blue";
var funcId = 0;
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

  useEffect(function() {
    console.log("%cfunc => useEffect (componentDidMount) "+(++funcId), funcStyle);
    document.title = number;
    return function() {
      console.log("%cfunc => useEffect return (componentWillUnMount) "+(++funcId), funcStyle);
    }
  }, []);

  //side effect
  useEffect(function () {
    console.log("%cfunc => useEffect number (componentDidMount & componentDidUpdate) "+(++funcId), funcStyle);
    document.title = number;
    return function() {
      console.log("%cfunc => useEffect return (componentDidMount & componentDidUpdate) "+(++funcId), funcStyle);
    }
  }, [number]);

  useEffect(function() {
    console.log("%cfunc => useEffect _date (componentDidMount & componentDidUpdate) "+(++funcId), funcStyle);
    document.title = _date;
    return function() {
      console.log("%cfunc => useEffect _date return (componentDidMount & componentDidUpdate) "+(++funcId), funcStyle);
    }
  }, [_date]);
  
  console.log("%cfunc => render " +(++funcId), funcStyle);
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

var classStyle = "color:red";
class ClassComp extends React.Component {
  // 클래스 컴포넌트에서는 state라는 하나의 객체 안에 number와 date를 모두 넣는다.
  state = {
    number: this.props.initNumber,
    date: new Date().toString(),
  };
  UNSAFE_componentWillMount() {
    console.log("%cclass => componentWillMount", classStyle);
  }
  componentDidMount() {
    console.log("%cclass => componentDidMount", classStyle);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("%cclass => shouldComponentUpdate", classStyle);
    return true;
  }
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log("%cclass => componentWillUpdate", classStyle);
  }
  componentDidUpdate(nextProps, nextState) {
    console.log("%cclass => componentDidUpdate", classStyle);
  }
  render() {
    console.log("%cclass => render", classStyle);
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
