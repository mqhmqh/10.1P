import React from 'react'

import db from "./firebase"

import axios from 'axios';

import { query, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

import SubscriptionSuccess from './SubscriptionSuccess';

class PaymentForm extends React.Component {

  constructor() {
    super();
    this.state = {
      userID: "",
      paid: "no"
    };
  }

  handleSubmit = async () => {
    const { elements, stripe } = this.props;

    const first = query(
      collection(db, "users"),
    );
    const snapshot = await getDocs(first);
    var users = snapshot.docs.map(doc => doc.data());
    var foundUser;

    users.forEach(user => {

      if (localStorage.getItem("email") === user.email) {
        foundUser = user;
      }

    });

    this.setState({
      userID: foundUser.id
    })


    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
    });


    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);

      //FOR TEST USE FAKE PM
      //const res = await axios.post('http://localhost:5000/sub', {'payment_method': paymentMethod.id, 'email': foundUser.email});
      const res = await axios.post('http://localhost:5000/sub', { 'payment_method': 'pm_card_visa', 'email': foundUser.email });

      const { client_secret, status } = res.data;

      if (status === 'requires_action') {
        stripe.confirmCardPayment(client_secret).then(function (result) {
          if (result.error) {
            console.log('Subscription Setup Failure');
            console.log(result.error);
          } else {
            console.log('Success!');
            this.setState({
              paid: "yes"
            })

          }
        });
      } else {
        console.log('Success!');
        this.setState({
          paid: "yes"
        })
      }
    }
  };

  render() {
    return (
      <div>
        {this.state.paid === "yes" &&
          <SubscriptionSuccess />
        }
        {this.state.paid === "no" &&
          <div>
            <div className="Pay_Button" onClick={this.handleSubmit} style={{ marginLeft: 'auto', marginRight: 'auto' }}>Sign Up</div>
          </div>
        }
      </div>
    );
  }
}

export default class StripePaymentForm extends React.Component {
  render() {
    return (
      <div style={{ width: "30%", marginLeft: "auto", marginRight: "auto" }}>
      </div>
    );
  }
}