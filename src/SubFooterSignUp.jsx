
import React from 'react'
import { Input, Button } from 'semantic-ui-react'

import { Navigate } from 'react-router-dom';


import axios from 'axios';

class SubFooterSignUp extends React.Component{


  constructor() {
    super();
    this.state = {
      email: "",
      success: false
    };
  }

  sendEmail = async () => {


    const res = await axios.post('http://localhost:5000/welcome', {'email': this.state.email}, {timeout: 2000});

    console.log(res);

    this.setState({success: true});


  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {

    if (this.state.success) {
      return <Navigate to={'/subscribed'} />;
    }

    return (

        <div className='subfooter'>

        <div className='subfooterContent'>

        <div style={{float: "left", margin: "auto"}}><h3>Sign Up to our Daily Insider</h3></div>
        

        <Input className="emailInput" name="email" onChange={this.updateInput} placeholder='Enter your email...' />



          <Button className="submitButton" onClick={this.sendEmail} >Subscribe</Button>

          </div>
        </div>
    
    )
  }
   
}
export default SubFooterSignUp