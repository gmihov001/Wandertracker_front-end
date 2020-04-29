import React from "react";
import firebase from "./firebase";
import Router from "@reach/router";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { MainGate } from "./views/MainGate";
import { SignUp } from "./views/SignUp";
import { LogIn } from "./views/LogIn";
import { HomePage } from "./views/HomePage";
import { Stamps } from "./views/Stamps";
import { TravelDoc } from "./views/TravelDoc";
import { Map } from "./views/Map";
import { TripPlanner } from "./views/TripPlanner";
import { AddTrip } from "./views/AddTrip";
import { TripDetails } from "./views/TripDetails";
import { EmergContacts } from "./views/EmergContacts";
import { camTravelDoc } from "./component/camTravelDoc";
import { camStamps } from "./component/camStamps";
import injectContext from "./store/appContext.js";
import { Footer } from "./component/footer";

export class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			displayName: "",
			userID: null
		};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(FBUser => {
			if (FBUser) {
				this.setState({
					user: FBUser,
					displayName: FBUser.displayName,
					userID: FBUser.uid
				});
			} else {
				this.setState({
					user: null,
					displayName: null,
					userID: null
				});
			}
		});
	}

	render() {
		const { userID, user } = this.state;
		console.log("User: ");
		console.log(user);

		return (
			<div className="d-flex flex-column h-100">
				<BrowserRouter>
					<ScrollToTop>
						<Switch>
							<Route exact path="/" component={MainGate} user={user} />
							<Route path="/LogIn" component={LogIn} />
							<Route path="/SignUp" component={SignUp} />
							{userID && <Route path="/HomePage" component={HomePage} />}
							{userID && <Route path="/Stamps" component={Stamps} />}
							{userID && <Route path="/TravelDoc" component={TravelDoc} />}
							{userID && <Route path="/Map" component={Map} />}
							{userID && <Route path="/TripPlanner" component={TripPlanner} />}
							{userID && <Route path="/AddTrip" component={AddTrip} />}
							{userID && <Route path="/TripDetails/:id" component={TripDetails} />}
							{userID && <Route path="/EmergContacts" component={EmergContacts} />}
							{userID && <Route path="/camTravelDoc" component={camTravelDoc} />}
							{userID && <Route path="/camStamps" component={camStamps} />}
							{userID && <Route render={() => <h1>Not found!</h1>} />}
						</Switch>
						<Footer />
					</ScrollToTop>
				</BrowserRouter>
			</div>
		);
	}
}

export default injectContext(Layout);
/*

*/
