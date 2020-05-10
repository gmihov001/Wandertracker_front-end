import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { TripContacts } from "../component/tripContacts.js";
import { TripPlaces } from "../component/tripPlaces.js";
import { TripItinerary } from "../component/tripItinerary.js";
import { Context } from "../store/appContext.js";
import firebase from "../firebase";

export class TripDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			trip: null,
			tripID: this.props.match.params.id,
			name: "",
			month: "",
			year: "",
			contacts: [],
			places: [],
			itinerary: []
		};
	}

	componentDidMount() {
		const tripRef = firebase.database().ref(`Trips/${this.props.match.params.id}`);
		tripRef.on("value", snapshot => {
			let this_trip = snapshot.val();
			this.setState({
				trip: this_trip,
				name: this_trip.name,
				month: this_trip.month,
				year: this_trip.year,
				contacts: this_trip.contacts,
				places: this_trip.places,
				itinerary: this_trip.itinerary
			});
		});
	}

	render() {
		return (
			<div className="wrapper">
				<div className="container addWindow bg-white shadow-lg py-4 my-5">
					<div className="my-3">
						<div className="row py-2 my-3 d-flex justify-content-between">
							<div className="col-md-4 p-2 text-right align-middle">
								<Link to="/TripPlanner" title="Back to Trips">
									<span className="pageTitle h3 my-1 text-center px-4">&laquo;</span>
								</Link>
							</div>
							<div className="col-md-4 px-1 text-center">
								<h2 className="pageTitle text-center">
									{this.state.name} {this.state.year}
								</h2>
							</div>
							<div className="col-md-4 text-center"></div>
						</div>
						<div className="row py-3 mx-1 d-sm-block d-md-flex mx-1 my-2 bg-white shadow">
							<div id="module" className="container px-1">
								<div className="col-md-12 mb-3">
									<h4 className="pageEntry">Contacts</h4>
								</div>
								<p className="collapse" id="collapseContacts" aria-expanded="false">
									<TripContacts tripID={this.state.tripID} contid={this.state.contacts} />
								</p>
								<a
									role="button"
									className="collapsed"
									data-toggle="collapse"
									href="#collapseContacts"
									aria-expanded="false"
									aria-controls="collapseContacts"></a>
							</div>
						</div>
						<div className="row d-sm-block d-md-flex mx-1 pb-3 pt-2 my-4 bg-white shadow">
							<div id="module" className="container px-1">
								<div className="col-md-12 mb-3">
									<h4 className="pageEntry">Places of Interest</h4>
								</div>

								<p className="collapse" id="collapsePlaces" aria-expanded="false">
									<TripPlaces tripID={this.state.tripID} placeid={this.state.places} />
								</p>
								<a
									role="button"
									className="collapsed"
									data-toggle="collapse"
									href="#collapsePlaces"
									aria-expanded="false"
									aria-controls="collapsePlaces"></a>
							</div>
						</div>
						<div className="row d-sm-block d-md-flex mx-1 pb-3 pt-2 my-4 d-flex bg-white shadow">
							<div id="module" className="container px-1">
								<div className="col-md-12 mb-3">
									<h4 className="pageEntry">Itinerary</h4>
								</div>

								<p className="collapse" id="collapseExample" aria-expanded="false">
									<TripItinerary tripID={this.state.tripID} itinid={this.state.itinerary} />
								</p>
								<a
									role="button"
									className="collapsed"
									data-toggle="collapse"
									href="#collapseExample"
									aria-expanded="false"
									aria-controls="collapseExample"></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

TripDetails.propTypes = {
	match: PropTypes.object
};
