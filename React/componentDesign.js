import axios from 'axios'

/**
 * 比如这个 Weather 组件将数据获取与渲染逻辑耦合在一起，如果数据请求有变化，
 * 就需要在 componentDidMount 生命周期中进行改动；
 * 如果展示天气的逻辑有变化，render 方法又需要变动。s
 */
class Weather extends Component {  
 constructor(props) {
   super(props)
   this.state = { temperature: 'N/A', windSpeed: 'N/A' }
 }

 componentDidMount() {
   axios.get('http://weather.com/api').then(response => {
     const { current } = response.data
     this.setState({
       temperature: current.temperature,
       windSpeed: current.windSpeed
     })
   })
 }

 render() {
   const { temperature, windSpeed } = this.state
   return (
    Temperature: {temperature} °C
    Wind: {windSpeed} km/h
   )
 }
}


// 如果我们将这个组件拆分成：WeatherFetch 和 WeatherInfo 两个组件，
// 这两个组件各自只做一件事情，保持单一职责：

import axios from 'axios'
import WeatherInfo from './weatherInfo'

class WeatherFetch extends Component {  
 constructor(props) {
   super(props)
   this.state = { temperature: 'N/A', windSpeed: 'N/A' }
 }

 componentDidMount() {
   axios.get('http://weather.com/api').then(response => {
     const { current } = response.data
     this.setState({
       temperature: current.temperature,
       windSpeed: current.windSpeed
       })
     })
 }

 render() {
   const { temperature, windSpeed } = this.state
   return (
     
   )
 }
}

// 另一个文件中：
const WeatherInfo = ({ temperature, windSpeed }) =>
 (
    Temperature: {temperature} °C
    Wind: {windSpeed} km/h
 )

// 如果我们想进行重构，使用 async/await 代替 Promise，只需要直接更改 WeatherFetch 组件：
class WeatherFetch extends Component {  
  // ...
  async componentDidMount() {
    const response = await axios.get('http://weather.com/api')
    const { current } = response.data
    this.setState({
      temperature: current.temperature,
      windSpeed: current.windSpeed
      })
    })
  }
  // ...
}

/**
 * 而不会对 WeatherInfo 组件有任何影响。
 * 或者显示风速的逻辑从 Wind: 0 km/h 改为文字描述 Wind: 风平浪静，
 * 也只需要改动 WeatherInfo：
 */
const WeatherInfo = ({ temperature, windSpeed }) => {
  const windInfo = windSpeed === 0 ? 'calm' : `${windSpeed} km/h`
  return (
    Temperature: {temperature} °C
    Wind: {windSpeed} km/h
  )
}

