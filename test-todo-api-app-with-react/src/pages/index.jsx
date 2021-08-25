import React from 'react';
import Todo from '../components/todo';
import Intro from '../components/intro';


export default class Index extends React.Component{
    render(){
        return(
            <>
            <Intro />
            <Todo />
            </>
        )
    }
}