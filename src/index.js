import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function HtmlTmp1() {
  // 测试import()动态加载
  let timer = setInterval(() => {
    if (new Date().getTime() % 2 === 0) {
      import('./demo1.js').then(() => {
        console.log(`demo1:${window.demo1}; demo2:${window.demo2}`)
      })
      window.clearInterval(timer)
    } else {
      import('./demo2.js').then(() => {
        console.log(`demo1:${window.demo1}; demo2:${window.demo2}`)
      })
      window.clearInterval(timer)
    }
  }, 100)
  return(
    <div className="demo">
      <label htmlFor="namedInput">Name:</label>
      <input id="namedInput" type="text" name="name"/>
    </div>
  )
}

// 组合
function SplitPane (props) {
  return (
  <div className="demo split-pane">
    <div className="left">
      {props.left}
    </div>
    <div className="right">
      {props.right}
    </div>
  </div>
  )
}

function ShowSplitPane() {
  let left = <div>i am left</div>
  let right = <div>i am right</div>
  return(
    <SplitPane left={left} right={right} />
  )
}

function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <div className="demo">
      <FancyBorder color="blue">
        <h1 className="Dialog-title">
          Welcome
        </h1>
        <p className="Dialog-message" tabIndex="0">
          Thank you for visiting our spacecraft!
        </p>
      </FancyBorder>
    </div>
  );
}

// 状态提升
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />

        <BoilingVerdict
          celsius={parseFloat(temperature)} />

      </fieldset>
    );
  }
}

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'coconut',
      result: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.myRef = React.createRef()
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({result: this.state.value});
    console.log(this.myRef, 'myRef')
    const node = this.myRef.current
    node.style.color = 'red'
    event.preventDefault();
  }

  componentDidMount() {
    this.myRef.current.style.color = 'blue'
  }

  render() {
    return (
      <div className="demo" ref={this.myRef}>
        <form onSubmit={this.handleSubmit}>
        <label>
          选择你喜欢的风味:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
        <input type="submit" value="提交" />
      </form>
      <p>
        result: {this.state.result}
      </p>
      </div>
      
    );
  }
}

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '请撰写一篇关于你喜欢的 DOM 元素的文章.',
      result: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({result: this.state.value})
    event.preventDefault();
  }

  render() {
    return (
      <div className="demo">
        <form onSubmit={this.handleSubmit}>
        <label>
          文章:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
      <p>
        result: {this.state.result}
      </p>
      </div>
      
    );
  }
}

class Demo4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({result: this.state.value});
    event.preventDefault();
  }

  render() {
    return (
      <div className="demo4">
        <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
      <p>
        result：{this.state.result}
      </p>
      </div>
    );
  }
}

class Demo3 extends React.Component {
  dd () {

  }

  constructor (props) {
    super(props)
    this.state = {
      list: []
    }
  }

   parentClick =  () => {
    console.log('i`m parentDom', this)
  }

  childClick = (e) => {
    console.log(`i am childrenCom`, this)
    let list = this.state.list
    list.push((Math.random(10)*10000).toFixed(0))
    this.setState({list})
    // e.stopPropagation()
  }
  render () {
    return <div className="demo3" onClick={() => this.parentClick()}>
    <button onClick={this.childClick}>按钮</button>
    <br/>
    <br/>
    {this.state.list.length > 0 && <p className="hasVal">P1:{this.state.list.length}</p>}
    {this.state.list.length === 0 && <p className="noVal">P2:{this.state.list.length}</p>}
    <br/>
    <br/>
    <ul className="dd">{this.state.list.map(num => 
      <li id={num} key={num}>{num}</li>
    )}</ul>
  </div>
  }
}

function Demo2 (props) {
  return <div className="demo2">hello, demo2</div>
}

class Demo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      num: 0
    }
    
  }

  addNum () {
    setInterval(() => {
      let num = this.state.num
      num = num + 1
      this.setState({num})
    }, 1000)
  }
  // 挂载
  componentDidMount() {
    this.addNum()
  }

  render() {
    
    const text1 = '我是demo1'
    return <div className="dd">
      <p>{text1}</p>
    <p>{this.state.num}</p>
    </div>
  }
}


// -----------------------------------------------------------------------------------------------

function Square(props) {
  return (<button className="square" onClick={props.onClick}>
    {props.value}
  </button>)
}

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" 
//       onClick={() => this.props.onClick()
//       }>
//         {this.props.value}
//       </button>
//     );
//   }
// }

class Board extends React.Component {

  renderSquare(i) {
    return <Square value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          />;
  }

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    }
  }

  jumpTo (step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
    console.log('state:', this.state)
  }

  handleClick (i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] =  this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)
    
    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start'
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status
    if (winner) {
      status = `Winner：${winner}`
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
    }

    return (
      <div className="wrap">
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares}
                    onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
        <div className="demo">
          <Demo/>
          <Demo2/>
          <Demo3/>
          <Demo4/>
          <EssayForm/>
          <FlavorForm/>
          <Calculator/>
          <WelcomeDialog/>
          <ShowSplitPane/>
          <HtmlTmp1/>
        </div>
      </div>
    );
  }
}



// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
