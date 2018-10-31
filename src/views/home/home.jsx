import React from 'react';
import './home.css';
import { connect } from 'react-redux';
import * as fn from '../../store/actions/count.js';

const man = () =>{
  return <div>this is man</div>
}

const women = () =>{
  return <div>this is women</div>
}

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <h3>Home</h3>
        <p>{this.props.number}</p>
        <button onClick={()=>{
          this.props.subtract(1)
        }}>-</button>
        <button onClick={()=>{
          this.props.add(1)
        }}>+</button>
        <button onClick={()=>{
          this.props.delayAdd(1)
        }}>delay+</button>

        <hr/>

        
      </div>
    );
  }
}
export default connect(
  state=>({
    user: state.Auth,
    number: state.count
  }),
  dispatch=>({
    add: (num)=>dispatch(fn.add(num)),
    subtract: (num)=>dispatch(fn.subtract(num)),
    delayAdd: (num)=>fn.delayAdd(dispatch)(num)
  })
)(Home)