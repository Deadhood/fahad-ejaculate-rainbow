import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor (pr) {
    super(pr)
    this.state = {
      videos: []
    }
  }

  render () {
    return (
      <div className='App'>
        {this.state.videos.length > 0 ? this.state.videos : 'Loading...'}
      </div>
    )
  }

  componentDidMount () {
    window.fetch('/json')
      .then(res => res.json())
      .then(raw => {
        if (raw.code === 200) {
          return raw.data
        } else {
          return []
        }
      })
      .then(rows => {
        if (rows.length > 0) {
          return rows.map((el, idx) => <iframe
            src={el}
            frameBorder='0'
            width='450px'
            height='250px'
            scrolling='no'
            title={idx + 'Spankbang'}
            key={'vid-' + idx}
            allowFullScreen
            seamless
          />)
        } else {
          return [
            "The server didn't return any video.",
            <br />,
            'Please try reloading the page in a while.',
            <br />,
            <button onClick={() => window.history.go(0)}>Reload</button>
          ]
        }
      })
      .then(frames => {
        this.setState({
          videos: frames
        })
      })
  }
}

export default App
