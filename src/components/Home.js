import React, { Component } from "react";
import logo from '../assets/images/logo_2.png';
import fear from '../assets/images/fear.png';
import sadness from '../assets/images/sadness.png';
import joy from '../assets/images/joy.png';
import anger from '../assets/images/anger.png';
import fear_emoji from '../assets/images/fear_emoji.png';
import sadness_emoji from '../assets/images/sadness_emoji.png';
import joy_emoji from '../assets/images/joy_emoji.png';
import anger_emoji from '../assets/images/anger_emoji.png';
import {FormControl, FormGroup, ControlLabel} from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MagicSpinner } from "react-spinners-kit";
import "react-tabs/style/react-tabs.css";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      form: {hashtag: ''},
      isLoaded: false,
      loading: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.setState({ loading: true });
    fetch('http://127.0.0.1:5000?hashtag=' + this.state.form.hashtag,
    {
      method: 'GET'
    }).then(res => res.json())
      .then(json => {
        console.log(json);
        console.log(this.state);
        this.setState({
          isLoaded: true,
          items: json['tweets'],
          loading: false
        });
      });
  }

  handleChange(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({form: {...this.state.form, [fieldName]: fleldVal}})
  }


  render() {
    const { items, isLoaded, loading} = this.state;

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
          { loading ? (
            <MagicSpinner
              size={200}
              color="#0084b4"
              loading={loading}
            />
            ) : (
          <form onSubmit={e => { e.preventDefault(); this.handleClick();}}>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Insert here (ignore the #, we will put that for you): </ControlLabel>
              <FormControl autoComplete="off" type="input" pattern="[a-zA-Z0-9_]+[a-zA-Z0-9_]{1,50}" name="hashtag" placeholder="Enter hashtag text..." defaultValue={this.state.form.hashtag} onChange={this.handleChange} />
            </FormGroup>
            <button type="submit">Submit</button>
          </form>
            )}
          <img src={sadness} width={100} height={40} alt='sadness'/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <img src={anger} width={120} height={35} alt='anger'/>
          <img src={joy} width={120} height={50} alt='joy'/>
        </div>
        <div style={{ position: 'relative', left: '15%', width: '70%' }}>
          { isLoaded &&
          <Tabs>
            <TabList className='tabs-list'>
              <Tab style={{ 'background-color': '#0084b4', width: 250 }} className="tabs"> Tweets </Tab>
              <Tab style={{ 'background-color': 'white', width: 250 }} className="tabs"> Statistics </Tab>
              <Tab style={{ 'background-color': '#0084b4', width: 250 }} className="tabs"> Regression Plots </Tab>
              <Tab style={{ 'background-color': 'white', width: 250 }} className="tabs"> Ordinal Classification Plots </Tab>
              <Tab style={{ 'background-color': '#0084b4', width: 250 }} className="tabs"> Classification Plots </Tab>
            </TabList>
            <TabPanel style={{ 'background-color': '#0084b4', color:'black' }} className="tabs-panel">
              <table className="table table-hover">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">UserName</th>
                  <th scope="col">Tweet</th>
                </tr>
                </thead>
                <tbody>
                {items.map(item => (
                  <tr>
                    <th>{item.counter}</th>
                    <td>{item.author}</td>
                    <td>{item.text}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </TabPanel>
            <TabPanel style={{ 'background-color': 'white', color: 'black' }} className="tabs-panel">
              <h1 align="center" style={{ 'font-size': '50px'}}>Top Tweets</h1>
              <div className="circles">
                <div className="circle-with-text multi-line-text ">
                  <h1>Fear</h1>
                  "Hello..from above our magnificent planet, Earth"#amazing #beautiful #Earth #sky #nature #sunset #love #sunrise #magnificent #sky #planet #hello #ocean #quote #wanderlust #photo #ExpressionQuote #CreativityWords #LifeQuotes
                  <img style={{ right: 0, bottom: 0}} src={fear_emoji} width={125} height={125} alt='fear_emoji'/>
                  <div className='score'> 0.87 </div>
                </div>
                <div className="circle-with-text multi-line-text">
                  <h1>Sadness</h1>
                  "Hello..from above our magnificent planet, Earth"#amazing #beautiful #Earth #sky #nature #sunset #love #sunrise #magnificent #sky #planet #hello #ocean #quote #wanderlust #photo #ExpressionQuote #CreativityWords #LifeQuotes
                  <img style={{ left: 0, bottom: 0}} src={sadness_emoji} width={125} height={125} alt='sadness_emoji'/>
                  <div className='score'> 0.88 </div>
                </div>
              </div>
              <div className="circles">
                <div className="circle-with-text multi-line-text">
                  <h1>Joy</h1>
                  "Hello..from above our magnificent planet, Earth"#amazing #beautiful #Earth #sky #nature #sunset #love #sunrise #magnificent #sky #planet #hello #ocean #quote #wanderlust #photo #ExpressionQuote #CreativityWords #LifeQuotes
                  <img style={{ right: 0, bottom: 0}} src={joy_emoji} width={125} height={125} alt='joy_emoji'/>
                  <div className='score'> 0.66 </div>
                </div>
                <div className="circle-with-text multi-line-text">
                  <h1>Anger</h1>
                  "Hello..from above our magnificent planet, Earth"#amazing #beautiful #Earth #sky #nature #sunset #love #sunrise #magnificent #sky #planet #hello #ocean #quote #wanderlust #photo #ExpressionQuote #CreativityWords #LifeQuotes
                  <img style={{ left: 0, bottom: 0}} src={anger_emoji} width={125} height={125} alt='anger_emoji'/>
                  <div className='score'> 0.65 </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel style={{ 'background-color': '#0084b4', color: 'black' }} className="tabs-panel">
              Any content 2
            </TabPanel>
            <TabPanel style={{ 'background-color': 'white', color: 'black' }} className="tabs-panel">
              Any content 2
            </TabPanel>
            <TabPanel style={{ 'background-color': '#0084b4', color: 'black' }} className="tabs-panel">
              Any content 2
            </TabPanel>
          </Tabs> }
        </div>
      </div>
    );
  };
}

export default Home;