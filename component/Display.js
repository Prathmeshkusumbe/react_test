import React from 'react'

import './Display.css'

export default class Display extends React.Component{

    render(){
      console.log(this.props.value);
        return(<div className='component-display'>
            <div>{this.props.value}</div>
        </div>)
    }
}