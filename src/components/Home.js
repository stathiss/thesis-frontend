import React, { Component } from 'react';
import { Chart } from 'react-charts';
import {FormControl, Form, FormGroup, ControlLabel,} from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MagicSpinner } from 'react-spinners-kit';
import logo from '../assets/images/logo_2.png';
import fear from '../assets/images/fear.png';
import sadness from '../assets/images/sadness.png';
import joy from '../assets/images/joy.png';
import anger from '../assets/images/anger.png';
import fear_emoji from '../assets/images/fear_emoji.png';
import sadness_emoji from '../assets/images/sadness_emoji.png';
import joy_emoji from '../assets/images/joy_emoji.png';
import anger_emoji from '../assets/images/anger_emoji.png';
import 'react-tabs/style/react-tabs.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {hashtag: ''},
      isLoaded: false,
      loading: false,
      top: [],
      trends: [],
      tweets: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    fetch('http://127.0.0.1:5000/trends',
      {
        method: 'GET'
      }).then(res => res.json())
      .then(json => {
        this.setState({
          trends: json['trends']
        });
      });
  }

  handleClick() {
    this.setState({ loading: true });
    console.error(this.state.form.hashtag);
    fetch('http://127.0.0.1:5000?hashtag=' + this.state.form.hashtag,
    {
      method: 'GET'
    }).then(res => res.json())
      .then(json => {
        console.log(json);
        console.log(this.state);
        this.setState({
          isLoaded: true,
          loading: false,
          top: json['top'],
          tweets: json['tweets']
        });
      });
  }

  handleChange(event) {
    console.log(event);
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({form: {...this.state.form, [fieldName]: fleldVal}})
  }

  onPickColor(e){
    console.log('[onPickColor]', this.hashtag );
    this.setState({ form: { ...this.state.form, hashtag: (this.hashtag.value.startsWith('#') ? this.hashtag.value.substr(1) : this.hashtag.value) }});
  }

  render() {
    const { tweets, isLoaded, loading, trends, top} = this.state;
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
              color='#0084b4'
              loading={loading}
            />
            ) : (
          <Form onSubmit={e => { e.preventDefault(); this.handleClick();}}>
            <Tabs>
              <TabList className='tabs-list'>
                <Tab  className='tabs'> Search </Tab>
                <Tab  className='tabs'> Top Trends </Tab>
              </TabList>
              <TabPanel>
                <div><br/></div>
                <FormGroup controlId='formControlsText'>
                  <ControlLabel>Insert here (ignore the #, we will put that for you): </ControlLabel>
                  <FormControl autoComplete='off' type='input' pattern='[a-zA-Z0-9_]+[a-zA-Z0-9_]{1,50}' name='hashtag' placeholder='Enter hashtag text...' defaultValue={this.state.form.hashtag} onChange={this.handleChange} />
                </FormGroup>
              </TabPanel>
              <TabPanel>
                <div><br/></div>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select Trend (English only available)</ControlLabel>
                  <FormControl
                    onChange={this.onPickColor.bind(this)}
                    inputRef={ el => this.hashtag=el }
                    componentClass="select" placeholder="select">
                    {trends.map(item => (
                      <option value={item.name}> {item.name} </option>
                    ))}
                  </FormControl>
                </FormGroup>
              </TabPanel>
            </Tabs>
            <button type='submit'>Submit</button>
          </Form>
            )}
          <img src={sadness} width={100} height={40} alt='sadness'/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <img src={anger} width={120} height={35} alt='anger'/>
          <img src={joy} width={120} height={50} alt='joy'/>
        </div>
        {isLoaded &&
          <div className='intro-text' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            Current Hashtag: #{this.state.form.hashtag}
          </div>
        }
        <div style={{ position: 'relative', left: '15%', width: '70%' }}>
          { isLoaded &&
          <Tabs>
            <TabList className='tabs-list'>
              <Tab style={{ backgroundColor: '#0084b4', width: 250 }} className='tabs'> Tweets </Tab>
              <Tab style={{ backgroundColor: 'white', width: 250 }} className='tabs'> Top Tweets </Tab>
              <Tab style={{ backgroundColor: '#0084b4', width: 250 }} className='tabs'> Regression Plots </Tab>
              <Tab style={{ backgroundColor: 'white', width: 250 }} className='tabs'> Ordinal Classification Plots </Tab>
              <Tab style={{ backgroundColor: '#0084b4', width: 250 }} className='tabs'> Classification Plots </Tab>
            </TabList>
            <TabPanel style={{ backgroundColor: '#0084b4', color:'black' }} className='tabs-panel'>
              <table className='table table-hover'>
                <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>UserName</th>
                  <th scope='col'>Tweet</th>
                </tr>
                </thead>
                <tbody>
                {tweets.sort((a, b) => { return a.counter - b.counter} ).map(item => (
                  <tr onClick={ () => window.open('https://twitter.com/statuses/' + item.id, '_blank') }>
                    <th>{item.counter}</th>
                    <td>{item.author}</td>
                    <td>{item.text}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </TabPanel>
            <TabPanel style={{ backgroundColor: 'white', color: 'black' }} className='tabs-panel'>
              <h1 align='center' style={{ 'font-size': '50px'}}>Top Tweets</h1>
              <div className='circles'>
                <div className='circle-with-text multi-line-text '>
                  <h1>Fear</h1>
                  'Hello..from above our magnificent planet, Earth'#amazing #beautiful #Earth #sky #nature #sunset #love #sunrise #magnificent #sky #planet #hello #ocean #quote #wanderlust #photo #ExpressionQuote #CreativityWords #LifeQuotes
                  <img style={{ right: 0, bottom: 0}} src={fear_emoji} width={125} height={125} alt='fear_emoji'/>
                  <div className='score'> 0.87 </div>
                </div>
                <div className='circle-with-text multi-line-text'>
                  <h1>Sadness</h1>
                  'Hello..from above our magnificent planet, Earth'#amazing #beautiful #Earth #sky #nature #sunset #love #sunrise #magnificent #sky #planet #hello #ocean #quote #wanderlust #photo #ExpressionQuote #CreativityWords #LifeQuotes
                  <img style={{ left: 0, bottom: 0}} src={sadness_emoji} width={125} height={125} alt='sadness_emoji'/>
                  <div className='score'> 0.88 </div>
                </div>
              </div>
              <div className='circles'>
                <div className='circle-with-text multi-line-text'>
                  <h1>Joy</h1>
                  'Hello..from above our magnificent planet, Earth'#amazing #beautiful #Earth #sky #nature #sunset #love #sunrise #magnificent #sky #planet #hello #ocean #quote #wanderlust #photo #ExpressionQuote #CreativityWords #LifeQuotes
                  <img style={{ right: 0, bottom: 0}} src={joy_emoji} width={125} height={125} alt='joy_emoji'/>
                  <div className='score'> 0.66 </div>
                </div>
                <div className='circle-with-text multi-line-text'>
                  <h1>Anger</h1>
                  'Hello..from above our magnificent planet, Earth'#amazing #beautiful #Earth #sky #nature #sunset #love #sunrise #magnificent #sky #planet #hello #ocean #quote #wanderlust #photo #ExpressionQuote #CreativityWords #LifeQuotes
                  <img style={{ left: 0, bottom: 0}} src={anger_emoji} width={125} height={125} alt='anger_emoji'/>
                  <div className='score'> 0.65 </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel style={{ backgroundColor: '#0084b4', color: 'black' }} className='tabs-panel'>
              { ['fear', 'joy', 'sadness', 'anger'].map(emotion => (
                <div>
                  <h1 align='center' style={{fontSize: '50px', textTransform: 'uppercase', textDecoration: 'underline'}}>{emotion}</h1>

                  <div
                    style={{
                      width: '100%',
                      height: '400px',
                      backgroundColor: 'white'
                    }}
                  >
                    <Chart
                      data={[
                        {
                          label: 'Fear',
                          data: tweets.sort((a, b) => { return a.regression[emotion] - b.regression[emotion];} ).map(item => ([item.counter, item.regression[emotion], item.text]))
                        }
                      ]}
                      series={{type: 'bar'}}
                      axes={[
                        {primary: true, type: 'ordinal', position: 'bottom'},
                        {position: 'left', type: 'linear', stacked: true},
                      ]}
                      primaryCursor
                      tooltip
                    />
                  </div>
                  <div><br/></div>
                </div>
              ))}
            </TabPanel>
            <TabPanel style={{ backgroundColor: 'white', color: 'black' }} className='tabs-panel'>
              { ['fear', 'joy', 'sadness', 'anger'].map(emotion => (
                <div>
                  <h1 align='center' style={{fontSize: '50px', textTransform: 'uppercase', textDecoration: 'underline'}}>{emotion}</h1>
                  <div align='right'> Avg = 0.54</div>
                  <div
                    style={{
                      width: '100%',
                      height: '400px',
                      backgroundColor: '0084b4'
                    }}
                  >
                    <Chart
                      data={[
                        {
                          label: 'Fear',
                          data: [
                            ['No ' + emotion + ' can be inferred', 12],
                            ['Low amount of ' + emotion + ' can be inferred', 34],
                            ['Moderate amount of ' + emotion + ' can be inferred', 80],
                            ['High amount of ' + emotion + ' can be inferred', 6]]
                        }
                      ]}
                      series={{type: 'bar', color: 'red'}}
                      axes={[
                        {primary: true, type: 'ordinal', position: 'bottom'},
                        {position: 'left', type: 'linear', stacked: true},
                      ]}
                      primaryCursor
                      tooltip
                    />
                  </div>
                  <div><br/></div>
                </div>
              ))}
            </TabPanel>
            <TabPanel style={{ backgroundColor: '#0084b4', color: 'black' }} className='tabs-panel'>
              <div>
                <h1 align='center' style={{fontSize: '50px', textTransform: 'uppercase', textDecoration: 'underline'}}>EMOTIONS</h1>
                <div
                  style={{
                    width: '100%',
                    height: '400px',
                    backgroundColor: 'white'
                  }}
                >
                  <Chart
                    data={[
                      {
                        label: 'Fear',
                        data: [
                          ['Anger', 12],
                          ['Anticipation', 34],
                          ['Disgust', 80],
                          ['Fear', 21],
                          ['Joy', 45],
                          ['Love', 9],
                          ['Optimism', 63],
                          ['Pessimism', 22],
                          ['Sadness', 11],
                          ['Trust', 41],
                        ]
                      }
                    ]}
                    series={{type: 'bar', color: 'red'}}
                    axes={[
                      {primary: true, type: 'ordinal', position: 'bottom'},
                      {position: 'left', type: 'linear', stacked: true},
                    ]}
                    primaryCursor
                    tooltip
                  />
                </div>
                <div><br/></div>
              </div>
            </TabPanel>
          </Tabs> }
        </div>
      </div>
    );
  };
}

export default Home;