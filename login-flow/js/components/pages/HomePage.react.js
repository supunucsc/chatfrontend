/*
 * HomePage
 *
 * This is the first thing users see of the app
 * Route: /
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from '../Nav.react';
import { connect } from 'react-redux';
import GiftedChat from '../../../giftedchat/GiftedChat';


const loremIpsum ='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum';


const messages = [];
for (let i = 0; i < 20; i++) {
  messages.push(generateMessage(loremIpsum.substring(0,(Math.random() * 100000)%loremIpsum.length), i))
}



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

class HomePage extends Component {
	constructor() {
    super()
    this.state = {
      messages: messages
    }
   }
	componentWillMount(){
		  document.title = "Enterprise Chat Message Manager";
	}
	render() {
    const dispatch = this.props.dispatch;
    const { loggedIn } = this.props.data;

    return (
			<article>
				<div>
					<section className="text-section">
						{/* Change the copy based on the authentication status */}
						{loggedIn ? (
							<h1>Welcome to Enterprise Chat Message Manager, you are logged in!</h1>
						) : (
							<h1>Welcome to Chat Message Manager!</h1>
						)}

						{loggedIn ? (
							<Link to="/dashboard" className="btn btn--dash">Dashboard</Link>
						) : (
							<div>
								<Link to="/login" className="btn btn--login">Sign in</Link>
								<Link to="/register" className="btn btn--register">Sign up</Link>
							</div>
						)}
					</section>

				</div>
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
export default connect(select)(HomePage);
