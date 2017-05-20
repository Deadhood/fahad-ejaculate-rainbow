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
    const vw = {
      wx: window.innerWidth || document.body.clientWidth,
      hx: window.innerHeight || document.body.clientHeight
    }
    const num = Math.ceil(vw.hx / 250) * Math.floor(vw.wx / 450)

    window.fetch(`/json?num=${num}`)
      .then(res => res.json())
      .then(raw => {
        if (raw.code === 200) return raw.data
        if (raw.code === 404) return []
        throw new Error('500 Server error')
      })
      .then(rows => {
        if (rows.length > 0) {
          return rows.map((url, idx) => <iframe
            src={url}
            key={'vid-' + idx}
            title={idx + 'Spankbang'}
            frameBorder='0'
            scrolling='no'
            height='250px'
            width='450px'
            allowFullScreen
            seamless
          />)
        } else {
          return [
            "The server didn't return any video.", <br />,
            'Please try reloading the page in a while.', <br />,
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
