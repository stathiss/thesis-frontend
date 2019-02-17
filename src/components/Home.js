import React, { Component } from "react";
import logo from '../assets/images/logo_2.png';
import fear from '../assets/images/fear.png';
import sadness from '../assets/images/sadness.png';
import joy from '../assets/images/joy.png';
import anger from '../assets/images/anger.png';
import wheel from '../assets/images/wheel.png'
import {FormControl, FormGroup, ControlLabel, Button} from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
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
    const { items } = this.state;
    const { img, color: backgroundColor, text: color, desc } = { img: "eec97ae821295f42e3969e082be11fac.png", color: "white", text: "black", desc: "\"I do some dumb things, and the people I love the most...they pay the price.\"" };
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh'}}>

          <img src={logo} width={500} height={500} alt='logo'/>
        </div>
        <div className='plane'>

        </div>
        <div className='intro-text' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          Tweet-ai has learned to understand emotions for english tweets. Type a hashtag* to see what the program thinks
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <median> * Hashtag must satisfy the following rules</median>
          <ul>
            <li>1. A hashtag must contain only letters (capital and lower case), numbers and underscores</li>
            <li>2. A hashtag must start with the symbol '#' and then a letter</li>
            <li>3. A hashtag must be a single word. Separations are made with underscores</li>
          </ul>
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
              <ControlLabel>Insert here (ignore the #, we will put that for you): </ControlLabel>
              <FormControl type="input" pattern="[a-zA-Z0-9_]{1,50}" name="hashtag" placeholder="Enter hashtag text..." defaultValue={this.state.form.hashtag} onChange={this.handleChange} />
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
        <div>
          <Tabs>
            <TabList className='tabs-list'>
              <Tab style={{ backgroundColor }} className="tabs">Title 1</Tab>
              <Tab style={{ backgroundColor }} className="tabs">Title 2</Tab>
            </TabList>
            <TabPanel style={{ backgroundColor, color }} className="tabs-panel">
              <div style={{width: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ul>
                  {items.map(item => (
                    <li key="{item.id}">
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </TabPanel>
            <TabPanel style={{ backgroundColor, color }} className="tabs-panel">
              Any content 2
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  };
}

export default Home;