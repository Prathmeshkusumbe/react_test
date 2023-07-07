import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import calculate from '../logic/calculate';
export default class App extends React.Component{
    state={
        next:null,
        operation:null,
        total:null,
        display:0
    }
    handleClick = buttonName => {
        this.setState(calculate(this.state, buttonName))
    }
    render(){
        console.log(this.state)
        return(<div className='component-app'>
            <Display value={this.state.display}></Display>
            <ButtonPanel clickHandler={this.handleClick}></ButtonPanel>
        </div>)
    }
}