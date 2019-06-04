import React from "react";
import NavBar from "./NavBar";
import '../assets/about.css';
import george from '../assets/images/ll.jpg';
import merge from '../assets/images/merge2.gif';



const About = () =>  {
	return (
	    <div>
            <NavBar/>
            <div style={{width: "100%", textAlign: "center", position: "absolute", bottom: "5px" }}>
            <div className="about">
                <div className="card">
                    <div className="thumbnail"><img className="left" src={merge}/>
                    </div>
                    <div className="right">
                        <h1>What is Tweet - ai ?</h1>

                        <div className="separator"></div>
                        <p>Tweet - ai has been designed in order to predict emotions in English Tweets. It is implemented
                            by using Deep and Machine learning methods which include Word Vectors, Lexicons, Features, LSTMs, Attention Mechanisms and Algorithms such as
                            Random Forests and Support Vector Machines. The training has been made from the Affect in Tweets Task's dataset of
                            2018 Semeval Conference. It also uses Genetic Algorithms to Ensemble methods. Created by:</p>
                        <div className="author"><img src={george}/>
                            <a style={{color:'white'}} href="http://www.linkedin.com/in/george-n-stathis" target="_blank"><h2>George Stathis</h2></a>
                        </div>
                    </div>


                </div>
            </div>

                Proudly Developed by <strong><a href="http://www.linkedin.com/in/george-n-stathis" target="_blank">George Stathis</a></strong>
            </div>
        </div>
	);
};

export default About;
