import React, { Component } from 'react';
import './App.css';

import logo from './logo.png'

class App extends Component {

  constructor(){
    super()
    this.state ={
      serial:'',
      name:'Participant',
      isParticipant: false
    }
  }

  inputSerial = (event) =>{
      this.setState({isParticipant: false})
      const serial = event.target.value
      this.setState({serial})
  }

  handleAuthentication = () => {
    const {serial} = this.state

    fetch('https://safe-gorge-73245.herokuapp.com/getid',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body: JSON.stringify({
				serial: serial,
			})
		})
		.then(response => response.json())
		.then(name => {
			if(name.includes("Error")) {
        this.setState({name: "Invalid User"})
        this.setState({serial:"Invalid"})
        this.setState({isParticipant: false})
			} else{
        this.setState({name})
        this.setState({isParticipant: true})
      }
    })
  }

  render() {

    const {name, serial} =  this.state;
    return (
      <div>
        <div className="content">

          <div className="main">
          <h1>Certificate Authentication Portal | WHHC</h1>
            <div className="branding">
              <img src={logo} alt="white-hat-hackers-club-logo" style={{"maxWidth":"80px"}}/>
              <a
                rel="noopener noreferrer" 
                href="https://whhc.in/" target="_blank" className="btn red">Go to WHHC.IN</a>
            </div>
            <p>Type in the Unique Serial Id and <br/>Click on Authenticate:</p>
            <form style={{"display":"flex", "flexDirection":"row"}}>
              <input type="text" name="search" placeholder="Authenticate..." onChange={this.inputSerial}/>
              <a className="btn yellow" onClick={this.handleAuthentication}>Authenticate</a>
            </form>
          </div>
          <div className="certificate-wrapper">
            <div className='text'>
              <p>
                Name: {name} <br/>
                Serial: {serial}
              </p>
            </div>
            <div>
              <img 
                className="certificate" 
                alt="certificate"
                src={this.state.isParticipant ? require(`./certificates/${serial}.png`) : require('./certificates/cert.png')}/>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
