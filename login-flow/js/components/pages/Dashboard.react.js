/*
 * HomePage
 *
 * The Dashboard is only visible to logged in users
 * Route: /dashboard
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import GiftedChat from '../../../giftedchat/GiftedChat';
const loremIpsum ='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum';

import Slider from 'react-rangeslider'

// To include the default styles
import 'react-rangeslider/lib/index.css'
 import Sidebar from 'react-sidebar';

function generateMessage(text, index, image) {
  return {
    _id: Math.round(Math.random() * 1000000),
    text: text,
    createdAt: new Date(),
    user: {
      _id: index % 3 == 0 ? 1 : 2,
      name: 'Johniak',
    },
    image
  }
}
const messages = [];
for (let i = 0; i < 20; i++) {
  messages.push(generateMessage(loremIpsum.substring(0,(Math.random() * 100000)%loremIpsum.length), i))
}



class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      messages: messages, value: { min: 2, max: 10 },  volume: 0, sidebarOpen: false
    }
   }
   handleOnChange = (value) => {
   this.setState({
     volume: value
   })
 }

 onSetSidebarOpen(open) {
  this.setState({sidebarOpen: open});
}

  render() {
     var sidebarContent = <b>Sidebar content</b>;
      let { volume } = this.state
    return (
      <article>
        <section className="text-section">
          <h1>Message Viewer</h1>

 
          <Slider
      value={volume}
       onChange={this.handleOnChange}
    />
          <GiftedChat user={{_id: 1,}}
                      messages={this.state.messages}
                      onSend={this.onSend}/>
         </section>
      </article>
    );
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Dashboard);
