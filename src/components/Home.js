import React, { Component } from "react";
import logo from '../assets/images/logo_2.png';
import fear from '../assets/images/fear.png';
import sadness from '../assets/images/sadness.png';
import joy from '../assets/images/joy.png';
import anger from '../assets/images/anger.png';
import wheel from '../assets/images/wheel.png'

import {FormControl, FormGroup, ControlLabel, Button} from "react-bootstrap";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      isLoaded: false,
      form: {hashtag: ''}
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    fetch('http://127.0.0.1:5000?hashtag=' + this.state.form.hashtag,
    {
      method: 'GET'
    }).then(res => res.json())
      .then(json => {
        console.log(json);
        console.log(this.state);
        this.setState({
          isLoaded: true,
          items: json
        });
      });
  }

  handleChange(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({form: {...this.state.form, [fieldName]: fleldVal}})
  }


  render() {
    const {_isLoaded, items} = this.state;
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh'}}>

          <img src={logo} width={500} height={500} alt='logo'/>
        </div>
        <div className='plane'>

        </div>
        <div className='intro-text' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          Tweet-ai has learned to understand emotions for english tweet. Type a hashtag to see what the program thinks
        </div>
        <div>
          <p>&nbsp;</p>
        </div>
        <div>
          <p>&nbsp;</p>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <img src={fear} width={100} height={30} alt='fear'/>
          <form onSubmit={e => { e.preventDefault(); this.handleClick();}}>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Insert here: </ControlLabel>
              <FormControl type="text" name="hashtag" placeholder="Enter hashtag text..." defaultValue={this.state.form.hashtag} onChange={this.handleChange} />
            </FormGroup>
            <Button className='button' onClick={this.handleClick}>
              Submit
            </Button>
          </form>
          <img src={sadness} width={100} height={40} alt='sadness'/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <img src={anger} width={120} height={35} alt='anger'/>
          <img src={joy} width={120} height={50} alt='joy'/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {items.hashtag}
        </div>
      </div>
    );
  };
}

export default Home;