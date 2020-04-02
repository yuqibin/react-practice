import React, {Suspense, Profiler, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PropTypes from 'prop-types';
import './css/index.less'

// 自定义Hook
const stuMap = {
  'zhangsan': {
    name: '张三',
    stuNo: 10086,
    score: 98
  },
  'lisi': {
    name: '李四',
    stuNo: 10085,
    score: 88
  },
  'wangwu': {
    name: '王五',
    stuNo: 10088,
    score: 92
  }
}

function Stu(props) {
  const stu = useStuName(props.name)
  return(
      <li>
        <span>
          姓名：{stu.name}
        </span>
        <span>
          学号：{stu.stuNo}
        </span>
        <span>
          成绩：{stu.score}
        </span>
      </li>
  )
}

// 学生列表
function StuList() {
  const arr = Object.keys(stuMap)
  return(
    <ul className="stu-list">
      {
        arr.map(name => {
          return <Stu key={name} name={name}></Stu>
        })
      }
    </ul>
  )
}

// 成绩高于90分学生列表
function FineStuList() {
  
}

function useStuName(name) {
  const [stu, setStu] = useState({})
  useEffect(() => {
    setStu(stuMap[name])
  }, [name])
  return stu
}

// Hook 规则 在顶层，不在任何条件循环函数等句法里   只在react函数中调用  不在普通函数调用
// 试试把循环放在useState 内 能不能批量进行 useState   no way
function InputAndHook() {
  const [input] = useState(React.createRef())
  const [name, setName] = useState('嘻嘻')
  return(
    <p>
    <input type="text" ref={input} onChange={() => setName(input.current.value)}/>
      <span>{name}</span>
    </p>
  )
}

// React Hook  --  不编写 class 的情况下使用 state 以及其他的 React 特性
/**
 * State Hook  数据仓库
 * Effect Hook  生命周期
 * 
 */

function HookExample() {
  const [count, setCount] = useState(9) // useState唯一参数：初始值
  const [look, setLook] = useState(0)
  // useEffect第二个参数可以指定哪个值变化才能执行这个effect  如果第二个参数是空数组 那么这个effect只在挂载时执行一次  更新时不执行
  useEffect(() => {
    document.title = `你点击了${count}次`
    console.log('count')
  }, [count])
  useEffect(() => {
    document.title = `你点击了${look}次`
    console.log('look')
  }, [look])
  useEffect(() => {
    console.log('我只在挂载时打印')
  }, [])
  return(
    <>
      <p>点击次数：{count}</p>
      <p>逗比次数： {look}</p>
      <button onClick={() => setCount(count + 1)}>
        click count
      </button>
      <button onClick={() => setLook(look + 1)}>
        click look
      </button>
    </>
  )
}


// 封装复用组件    理解：render prop 是一个用于告知组件需要渲染什么内容的函数 prop
class Cat extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      myRef: React.createRef()
    }
  }

  componentDidMount () {
    console.log('打印ref所在的DOM:', this.state.myRef.current)
  }

  render() {
    const mouse = this.props.mouse;
    return (
      <img ref={this.state.myRef} src={require('./imgs/cat.jpeg')} alt="dd"
      style={{ width: '60px', height: '80px', position: 'absolute', left: mouse.x - 150, top: mouse.y - 430 }} />
    );
  }
}


class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ overflow: 'hidden', height: '30vh', background: '#e6c4c4', position: 'relative' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

Mouse.propTypes = {
  render: PropTypes.func
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}

// diff算法 比较两个节点树🌲

// 不使用JSX
function NoJsxComp(props) {
  return React.createElement('div', null, `Hello ${props.children}`)
}

const DemoComponent = React.lazy(() => import('./components/demoComponent'));

const ThemeContext = React.createContext('light')

// Portals  子节点渲染到父节点以外的dom节点

class PortasComp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {flag : false}
  }
  handleClick () {
    this.setState(state => ({flag : !state.flag}))
    console.log(this.state.flag)
  }

  render () {
    const arr = [1,2,3,4,5,6]
    return (<div>
      <button onClick={() => this.handleClick()}>按钮呀</button>
      <div className="por-a" onClick={() => {console.log('por-a')}}>
        por-a: <PortasChildCom flag={this.state.flag}>
          <span>嘻嘻</span>
        </PortasChildCom>
      </div>
      <div className="por-b" 
            onClick={() => {console.log('por-b')}}
            id="PortasClildrenShow" style={{display : (this.state.flag ? 'block':'none')}}>
        por-b:
      </div>
      {
        this.state.flag && <p>xixi</p>
      }
      {
        arr.map((num) => {
         return <div key={num} value={num}>{num}</div> 
        })
      }
    </div>)
  }
}

class PortasChildCom extends React.Component {
  constructor (props) {
    super(props)
    this.el = document.createElement('span')
  }

  componentDidMount () {
    document.getElementById('PortasClildrenShow').appendChild(this.el)
  }

  componentWillUnmount () {
    document.getElementById('PortasClildrenShow').removeChild(this.el)
  }

  render() {
    return this.props.flag ? ReactDOM.createPortal(this.props.children, this.el) : this.props.children
  }
}


// 性能优化  -----------
// 继承PureComponent
class CounterButton extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      count: 1
    }
  }

  render () {
    return (<button color={this.props.color}
                    onClick={() => this.setState(state => ({count: state.count + 1}))}>
                      Count: {this.state.count}
                    </button>)
  }
}

// -------深入jsx JSX是一种语法糖  方便写  本质

// JSX 类型不能是一个表达式
const jsxComps = {
  photo: (props) => {
    return (<div className="photo"> i am photo <br/> {props.children}  </div>)
  },
  video: (props) => {
    return(<div className="video"> i am video <br/> {props.children}  </div>)
  }
}

function JsxStory(props) {
  const JxsComps = jsxComps[props.type]
  return <JxsComps story={props.story}>我是children，穷给</JxsComps>
}

// 点语法  可构造性强
const MyComponents = {
  DatePicker: function DatePicker(props) {
  return <div>imagine a {props.color} dataPicker here.</div>
  }
}

function BlueDataPicker() {
    return <MyComponents.DatePicker color="blue" />
}

//  高阶组件HOC
const DataSource = {}
// 此函数接收一个组件...返回一个新组件  
// eslint-disable-next-line no-unused-vars
function withSubscription(WrappedComponent, selectData) {
  // ...并返回另一个组件...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ...负责订阅相关的操作...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... 并使用新数据渲染被包装的组件!
      // 请注意，我们可能还会传递其他属性
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

// Refs 转发
const FancyButton = React.forwardRef((props, ref) => (
  <button className="ref-btn" ref={ref} onClick={props.onClick}>
    {props.children}
  </button>
));
class RefSPick extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ref: React.createRef(),
      timeNumStr: new Date().getTime()
    }
  }

  clickMe () {
    let ref = this.state.ref
    ref.current.innerHTML = '改变了ref的current对应的DOM的内容' + (new Date().getTime() - this.state.timeNumStr)
    this.setState({ref})
  }

  componentDidMount () {
    console.log('??', this.state.ref.current)
  }
  
  render () {
    // const ref = React.createRef()
    // console.log('???', ref)
    return(<FancyButton ref={this.state.ref} className="66" onClick={() => this.clickMe()}>Click me!</FancyButton>)
  }
}

// function FancyButton(props) {
//   return (
//     <button className="FancyButton">
//       {props.children}
//     </button>
//   );
// }

// 错误边界
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      hasError: false
    }
  }

  static getDerivedStateFromError (error) {
    return {hasError: true}
  }

  componentDidCatch (error, errorInfo) {
    console.log(`componentDidCatch: error-${error} errorInfo-${errorInfo}`)
  }

  render() {
    if (this.state.hasError) {
      // UI降级
      return <h1>子组件出错，UI降级提示语--GG</h1>
    } 
    return this.props.children
  }
}

class ErrorComp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }
  }
  render () {
    if (this.state.name) {
      // dev挂起 打包打开
      throw new Error('I crashed!');
    } else {
      return(<div className="demo">
      <p className={this.state.name}>
        {this.state.name}
      </p>
      <span>
        123
      </span>
    </div>)
    }
  }
}

// Context  
class ThemeButton extends React.Component {
  static contextType = ThemeContext;
  render () {
  return (<button>{this.context}</button>)
  }
}

// ThemeButton.contextType = ThemeContext

function HtmlTmp1() {
  // 测试import()动态加载
  let timer = setInterval(() => {
    if (new Date().getTime() % 2 === 0) {
      import('./components/demo1.js').then(() => {
        console.log(`demo1:${window.demo1}; demo2:${window.demo2}`)
      })
      window.clearInterval(timer)
    } else {
      import('./components/demo2.js').then(() => {
        console.log(`demo1:${window.demo1}; demo2:${window.demo2}`)
      })
      window.clearInterval(timer)
    }
  }, 100)
  return(
    <div className="demo">
      <ThemeContext.Provider value="dark">
      <ThemeButton onClick={() => {this.changeContext()}}/>
      </ThemeContext.Provider>
      <br/>
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
        <Suspense fallback={<div className="demo-com-loading">Loading...</div>}>
          <DemoComponent />
        </Suspense>
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
          <ErrorBoundary>
            <ErrorComp/>
          </ErrorBoundary>
          <div className="demo">
            <RefSPick/>
          </div>
          <div className="demo">
            <BlueDataPicker/>
          </div>
          <div className="demo">
            <JsxStory story="111" type="video">我是JsxStory的props.children</JsxStory>
          </div>
          <div className="demo">
            <CounterButton/>
          </div>
          <div className="demo">
            <Profiler id="myRenderTimeTest" onRender={onRenderCallback}>
              <PortasComp></PortasComp>
            </Profiler>
          </div>
          <div className="demo">
            <NoJsxComp>Bob</NoJsxComp>
          </div>
          <MouseTracker/>
        </div>
      </div>
    );
  }
}

function onRenderCallback(
  id, // 发生提交的 Profiler 树的 “id”
  phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
  actualDuration, // 本次更新 committed 花费的渲染时间
  baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
  startTime, // 本次更新中 React 开始渲染的时间
  commitTime, // 本次更新中 React committed 的时间
  interactions // 属于本次更新的 interactions 的集合
) {
  // 合计或记录渲染时间。。。
  console.log(id, '\n',phase,'\n',actualDuration,'\n',baseDuration,'\n',startTime,'\n',commitTime,'\n',interactions)
}


// ========================================

ReactDOM.render(
  // StrictMode触发额外的检查和警告
  <React.StrictMode>
    <div className="top-container">
      <Game />
      <HookExample/>
      <InputAndHook/>
      <StuList/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
