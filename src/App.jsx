import React, { Component } from 'react'
import * as nsfwjs from 'nsfwjs'
import Media from './components/Media'
import Chart from './components/Chart'
import './App.css'

// const availableModels = {
//   mobilenetv2: ['/quant_nsfw_mobilenet/'],
//   inceptionv3: ['/model/', { size: 299 }]
// }
export default class App2 extends Component {

  state = {
    model: 'mobilenetv2',
    predictions: [],
    status: 'loading'
  }

  componentDidMount() {
    this.loadModel()
  }

  loadModel() {
    // const availableModels = {
    //   mobilenetv2: ['/quant_nsfw_mobilenet/'],
    //   inceptionv3: ['/model/', { size: 299 }]
    // }
    nsfwjs.load('/quant_nsfw_mobilenet/')
      .then(model => {
        this.model = model
        this.setState({ status: 'ready' })
      })
  }

  classify = async (media) => {
    if (!this.model) return
    this.setState({ status: 'classifying' })
    const predictions = await this.model.classify(media)
    this.setState({ predictions })
    setTimeout(() => this.setState({ status: '' }), 400)
  }

  reset = () => {
    this.setState({
      predictions: [],
      status: ''
    })
  }

  render() {
    const { status, predictions } = this.state
    return (
      <Media
        onData={this.classify}
        onReset={this.reset}
        footer={status}
      >
        <Chart data={predictions} />
      </Media>
    )
  }

}
