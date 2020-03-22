import React, { Component } from 'react';
import { Chart } from 'react-charts';
import {FormControl, Form, FormGroup, ControlLabel} from 'react-bootstrap';
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
import NavBar from "./NavBar";

const BACKEND_API = 'http://127.0.0.1:5000';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      averages: [],
      form: {hashtag: '', number: 100},
      isLoaded: false,
      loading: false,
      ordinal_class: [],
      top: [],
      trends: [],
      tweets: [],
      searches: [],
      e_c: []

    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    fetch(BACKEND_API + '/trends',
      {
        method: 'GET'
      }).then(res => res.json())
      .then(json => {
        this.setState({
          trends: json['trends']
        });
      });
    fetch(BACKEND_API + '/searches',
      {
        method: 'GET'
      }).then(res => res.json())
      .then(json => {
        this.setState({
          searches: json['searches']
        });
      });
  }

  handleClick() {
    this.setState({ loading: true });
    console.error(this.state.form.hashtag);
    fetch(BACKEND_API + '?hashtag=' + (this.state.form.hashtag.startsWith('#') ? '%23'+this.state.form.hashtag.substr(1) : this.state.form.hashtag) + '&number=' + this.state.form.number,
    {
      method: 'GET'
    }).then(res => res.json())
      .then(json => {
        console.log(json);
        console.log(this.state);
        this.setState({
          isLoaded: true,
          loading: false,
          averages: json['averages'],
          ordinal_class: json['ordinal_class'],
          top: json['top'],
          tweets: json['tweets'],
          e_c: json['e_c']

        });
      });
  }

  handleChange(event) {
    console.log(event);
    let fieldName = event.target.name;
    let fieldVal = event.target.value;
    this.setState({form: {...this.state.form, [fieldName]: fieldVal}})
  }

  onPickTrend(){
    this.setState({ form: { ...this.state.form, hashtag: this.hashtag.value }});
  }

  onPickSearch(){
    this.setState({ form: { ...this.state.form, hashtag: this.hashtag.value }});
  }

  onPickNumber(){
    this.setState({ form: { ...this.state.form, number: this.number.value }});
  }


  render() {
    const { averages, tweets, isLoaded, loading, ordinal_class, trends, searches, top, e_c} = this.state;
    return (
      <div>
      <NavBar/>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh'}}>
          <img src={logo} width={500} height={500} alt='logo'/>
        </div>
        <div className='plane'>

        </div>
        <div className='intro-text' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          Tweet-ai has learned to understand emotions for english tweets. Type a hashtag* or a Trend to see what the program thinks
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <median> * Hashtag must satisfy the following rules</median>
          <ul>
            <li>1. A hashtag must contain only letters (capital and lower case), numbers and underscores</li>
            <li>2. A hashtag must start with the symbol '#' or a letter if it is a Trend</li>
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
          <img src={fear} width={120} height={40} alt='fear'/>
          { loading ? (
            <MagicSpinner
              size={200}
              color='#0084b4'
              loading={loading}
            />
            ) : (
          <Form onSubmit={e => { e.preventDefault(); this.handleClick();}}>
            <FormGroup>
              <label htmlFor="text" style={{float:'left', marginRight: '5px', position: 'relative', top: '6px' }}>Max number of tweets: </label>
              <FormControl
                style={{width: '100px'}}
                onChange={this.onPickNumber.bind(this)}
                inputRef={ el => this.number=el }
                defaultValue={this.state.form.number}
                componentClass="select" placeholder={this.number}>
                <option value={20} >20 </option>
                <option value={40}>40 </option>
                <option value={60}>60 </option>
                <option value={80}>80 </option>
                <option value={100}>100 </option>
              </FormControl>
            </FormGroup>
            <Tabs >
              <TabList className='tabs-list'>
                <Tab  className='tabs'> Search </Tab>
                <Tab  className='tabs'> Top Trends </Tab>
                <Tab  className='tabs'> Previous Searches </Tab>
              </TabList>
              <TabPanel style={{width: '366px','border-radius': '2px', 'background': 'linear-gradient(white, #c0deed)'}}>
                <div><br/></div>
                <FormGroup controlId='formControlsText'>
                  <ControlLabel>Insert Trend or Hashtag here (hashtag starts with '#'): </ControlLabel>
                  <FormControl style={{width: '366px'}} autoComplete='off' type='input' pattern='[a-zA-Z0-9_#]+[a-zA-Z0-9_ ]{1,50}' name='hashtag' placeholder='Enter hashtag/trend text...' defaultValue={(this.state.form.hashtag)} onChange={this.handleChange} />
                </FormGroup>
              </TabPanel>
              <TabPanel style={{width: '366px', 'border-radius': '2px', 'background': 'linear-gradient(white, #c0deed)'}}>
                <div><br/></div>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select Trend (English only available)</ControlLabel>
                  <FormControl
                    style={{width: '366px'}}
                    onChange={this.onPickTrend.bind(this)}
                    inputRef={ el => this.hashtag=el }
                    componentClass="select" placeholder={this.hashtag}>
                    {trends.map(item => (
                      <option value={item.name}> {item.name} </option>
                    ))}
                  </FormControl>
                </FormGroup>
              </TabPanel>
              <TabPanel style={{ width: '366px', 'border-radius': '2px', 'background': 'linear-gradient(white, #c0deed)'}}>
                <div><br/></div>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select Previous Searches</ControlLabel>
                  <FormControl
                    style={{width: '366px'}}
                    onChange={this.onPickSearch.bind(this)}
                    inputRef={ el => this.hashtag=el }
                    componentClass="select" placeholder={this.hashtag}>
                    {searches.map(item => (
                      <option value={item.name}> {item.name} </option>
                    ))}
                  </FormControl>
                </FormGroup>
              </TabPanel>
            </Tabs>
            <button type='submit' disabled={this.state.form.hashtag === ''}>Submit</button>
          </Form>
            )}
          <img src={sadness} width={140} height={60} alt='sadness'/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <img src={anger} width={140} height={50} alt='anger'/>
          <img src={joy} width={140} height={60} alt='joy'/>
        </div>

        {isLoaded &&
          <div className='intro-text' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            Current Hashtag / Trend: {this.state.form.hashtag}
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
              <table style = {{'white-space': 'unset'}}  className='table table-hover'>
                <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>UserName</th>
                  <th scope='col'>Tweet</th>
                </tr>
                </thead>
                <tbody>
                {tweets.sort((a, b) => { return a.counter - b.counter} ).map(item => (
                  <tr style={{cursor: 'pointer'}} onClick={ () => window.open('https://twitter.com/statuses/' + item.id, '_blank') }>
                    <th>{item.counter}</th>
                    <td>{item.author}</td>
                    <td>{item.text}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </TabPanel>
            <TabPanel style={{ backgroundColor: 'white', color: 'black' }} className='tabs-panel'>
              <h1 align='center' style={{ fontSize: '50px'}}>Top Tweets</h1>
              <div className='circles' onClick={ () => window.open('https://twitter.com/statuses/' + top['anger']['id'], '_blank') }>
                <div className='circle-with-text multi-line-text'>
                  <h1>Anger</h1>
                  {top['anger']['tweet']}
                  <img style={{ right: 0, bottom: 0}} src={anger_emoji} width={125} height={125} alt='anger_emoji'/>
                  <div className='score'> {top['anger']['intensity']} </div>
                </div>
                <div className='circle-with-text multi-line-text' onClick={ () => window.open('https://twitter.com/statuses/' + top['fear']['id'], '_blank') }>
                  <h1>Fear</h1>
                  {top['fear']['tweet']}
                  <img style={{ left: 0, bottom: 0}} src={fear_emoji} width={125} height={125} alt='fear_emoji'/>
                  <div className='score'> {top['fear']['intensity']} </div>
                </div>
              </div>
              <div className='circles'>
                <div className='circle-with-text multi-line-text' onClick={ () => window.open('https://twitter.com/statuses/' + top['joy']['id'], '_blank') }>
                  <h1>Joy</h1>
                  {top['joy']['tweet']}
                  <img style={{ right: 0, bottom: 0}} src={joy_emoji} width={125} height={125} alt='joy_emoji'/>
                  <div className='score'> {top['joy']['intensity']} </div>
                </div>
                <div className='circle-with-text multi-line-text' onClick={ () => window.open('https://twitter.com/statuses/' + top['sadness']['id'], '_blank') }>
                  <h1>Sadness</h1>
                  {top['sadness']['tweet']}
                  <img style={{ left: 0, bottom: 0}} src={sadness_emoji} width={125} height={125} alt='sadness_emoji'/>
                  <div className='score'> {top['sadness']['intensity']} </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel style={{ backgroundColor: '#0084b4', color: 'black' }} className='tabs-panel'>
              { ['anger', 'fear', 'joy', 'sadness'].map(emotion => (
                <div>
                  <h1 align='center' style={{fontSize: '40px', textTransform: 'uppercase', textDecoration: 'underline'}}>{emotion}</h1>
                  <div align='right' style={{fontSize: '20px'}}> Avg = {averages[emotion]} </div>
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
                          label: 'Intensity',
                          data: tweets.sort((a, b) => { return a.regression[emotion] - b.regression[emotion];} ).map(item => ([item.counter, item.regression[emotion], item.text]))
                        }
                      ]}
                      series={{type: 'bar'}}
                      axes={[
                        {primary: true, type: 'ordinal', position: 'bottom'},
                        {position: 'left', type: 'linear', stacked: true, hardMax: 1.0},
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
              { [ 'anger', 'fear', 'joy', 'sadness'].map(emotion => (
                <div>
                  <h1 align='center' style={{fontSize: '40px', textTransform: 'uppercase', textDecoration: 'underline'}}>{emotion}</h1>
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
                          label: 'Sum',
                          data: [
                            ['No ' + emotion + ' can be inferred', ordinal_class[emotion][0]],
                            ['Low amount of ' + emotion + ' can be inferred', ordinal_class[emotion][1]],
                            ['Moderate amount of ' + emotion + ' can be inferred', ordinal_class[emotion][2]],
                            ['High amount of ' + emotion + ' can be inferred', ordinal_class[emotion][3]]]
                        }
                      ]}
                      series={{type: 'bar', color: 'red'}}
                      axes={[
                        {primary: true, type: 'ordinal', position: 'bottom', fontSize: 40},
                        {position: 'left', type: 'linear', stacked: true, hardMax: 100},
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
                <h1 align='center' style={{fontSize: '40px', textTransform: 'uppercase', textDecoration: 'underline'}}>EMOTIONS</h1>
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
                        label: 'Sum',
                        data: [
                          ['Anger', e_c[0]],
                          ['Anticipation', e_c[1]],
                          ['Disgust', e_c[2]],
                          ['Fear', e_c[3]],
                          ['Joy', e_c[4]],
                          ['Love', e_c[5]],
                          ['Optimism', e_c[6]],
                          ['Pessimism', e_c[7]],
                          ['Sadness', e_c[8]],
                          ['Surprise', e_c[9]],
                          ['Trust', e_c[10]],
                        ]
                      }
                    ]}
                    series={{type: 'bar', color: 'red'}}
                    axes={[
                      {primary: true, type: 'ordinal', position: 'bottom'},
                      {position: 'left', type: 'linear', stacked: true, hardMax: 100},
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
