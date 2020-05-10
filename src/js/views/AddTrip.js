import React from "react";
import { Navbar2 } from "../component/Navbar2";
import PropTypes from "prop-types";
import firebase from "../firebase";

export class AddTrip extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			trip: {
				tripId: "",
				name: "",
				month: "",
				year: "",
				contacts: [],
				places: [],
				itinerary: []
			}
		};
	}

	handleName = evt => {
		this.setState({ trip: { ...this.state.trip, name: evt.target.value } });
	};

	handleMonth = evt => {
		this.setState({ trip: { ...this.state.trip, month: evt.target.value } });
	};

	handleYear = evt => {
		this.setState({ trip: { ...this.state.trip, year: evt.target.value } });
	};

	handleSubmit = e => {
		e.preventDefault();

		const ref = firebase.database().ref(`Trips`);
		ref.push({
			name: this.state.trip.name,
			month: this.state.trip.month,
			year: this.state.trip.year,
			contacts: [],
			places: [],
			itinerary: []
		});
		this.setState({ trip: {} });
	};

	render() {
		return (
			<div className="wrapper">
				<Navbar2 />
				<div className="container addWindow bg-white shadow-lg py-4 mt-5">
					<form>
						<div className="row py-3 my-3 d-flex justify-content-center">
							<div className="col-md-4 d-block">
								<h1 className="pageTitle text-center py-2 px-3">Add New Trip</h1>
								<h4 className="text-secondary text-center rounded shadow">
									{this.state.trip.name} {this.state.trip.year}
								</h4>
							</div>
						</div>
						<div className="row mb-5 mt-3 d-block">
							<div className="col d-flex justify-content-center mb-5">
								<input
									type="text"
									id="name"
									className="textfield col-md-6"
									value={this.state.trip.name}
									name="name"
									onChange={this.handleName}
									placeholder="Destination..."
								/>
							</div>

							<div className="col d-flex justify-content-center mb-5">
								<input
									type="text"
									id="month"
									className="textfield col-md-6"
									value={this.state.trip.month}
									name="month"
									onChange={this.handleMonth}
									placeholder="Month of Travel..."
								/>
							</div>

							<div className="col d-flex justify-content-center mb-5">
								<input
									type="text"
									id="year"
									className="textfield col-md-6"
									value={this.state.trip.year}
									name="year"
									onChange={this.handleYear}
									placeholder="Year of Travel"
								/>
							</div>
						</div>
					</form>
				</div>
				<div className="row my-5 d-flex justify-content-center">
					<div className="col-md-4 justify-content-center">
						<h2 className="xlButton glass text-center py-2 px-3 m-auto" onClick={this.handleSubmit}>
							Save
						</h2>
					</div>
				</div>
			</div>
		);
	}
}

AddTrip.propTypes = {
	history: PropTypes.object
};
