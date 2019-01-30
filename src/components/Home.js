import React from "react";
import logo from '../assets/images/logo_2.png';
import fear from '../assets/images/fear.png';
import sadness from '../assets/images/sadness.png';
import joy from '../assets/images/joy.png';
import anger from '../assets/images/anger.png';

import {Form,FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button} from "react-bootstrap";

const Home = () => {

  return (
    <div>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '30vh'}}>

        <img src={logo} width={500} height={500} alt='logo'/>
      </div>
        <div className='plane'>

        </div>
      <div className='intro-text' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        Tweet-ai has learned to understand emotions for english tweet. Type a hashtag to see what the program thinks
      </div>
      <div>
        <p>&nbsp;</p>
      </div>
      <div>
        <p>&nbsp;</p>
      </div>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <img src={fear} width={100} height={30} alt='fear'/>
        <form>
          <FormGroup controlId="formControlsText">
            <ControlLabel>Insert here: </ControlLabel>
            <FormControl type="text" placeholder="Enter hashtag text..." />
          </FormGroup>

          <Button type="submit">
            Submit
          </Button>
          <div id="">
          </div>
        </form>
        <img src={sadness} width={100} height={40} alt='sadness'/>
      </div>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <img src={anger} width={120} height={35} alt='anger'/>
        <img src={joy} width={120} height={50} alt='joy'/>
      </div>
    </div>
  );
};

export default Home;