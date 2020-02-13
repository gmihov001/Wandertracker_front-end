import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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

export const Layout = () => {
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter>
				<ScrollToTop>
					<Switch>
						<Route exact path="/" component={MainGate} />
						<Route path="/LogIn" component={LogIn} />
						<Route path="/SignUp" component={SignUp} />
						<Route path="/HomePage" component={HomePage} />
						<Route path="/Stamps" component={Stamps} />
						<Route path="/TravelDoc" component={TravelDoc} />
						<Route path="/Map" component={Map} />
						<Route path="/TripPlanner" component={TripPlanner} />
						<Route path="/AddTrip" component={AddTrip} />
						<Route path="/TripDetails/:id" component={TripDetails} />
						<Route path="/EmergContacts" component={EmergContacts} />
						<Route path="/camTravelDoc" component={camTravelDoc} />
						<Route path="/camStamps" component={camStamps} />
						<Route render={() => <h1>Not found!</h1>} />
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
