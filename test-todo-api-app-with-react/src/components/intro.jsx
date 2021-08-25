import React from 'react';
import './intro.css';


export default class Intro extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            background_image: ""
        }
    }
    componentDidMount(){
        fetch(`https://api.unsplash.com/photos/random/?topics=rainy&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`)
            .then(res => res.json()).then(item => this.setState({background_image: `${item.urls.regular}`}))
    }

    render(){
        return(
            <>
            <img className="bg" src={this.state.background_image} alt="Introducing image" />
            <div className="intro">
                <div className="text">
                    <h1>Hello Uğurcan</h1>
                    <p>Have a look your plans</p>
                </div>
            </div>
            </>
        )
    }
}