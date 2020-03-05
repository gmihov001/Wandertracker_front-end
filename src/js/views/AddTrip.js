import React from "react";
import { Link } from "react-router-dom";
import { Navbar2 } from "../component/Navbar2";
import wtLogo from "../../img/wanderTrackerLogo.png";
import { Context } from "../store/appContext.js";
import PropTypes from "prop-types";

export class AddTrip extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userInput: {},
			trip: {
				name: "",
				month: "",
				year: "",
				id: "",
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
									{this.state.trip.name} {this.state.trip.month} {this.state.trip.year}
								</h4>
							</div>
						</div>
						<div className="row mb-5 mt-3 d-block">
							<div className="col d-flex justify-content-center mb-5">
								<input
									type="text"
									className="textfield col-md-6"
									value={this.state.userInput.name}
									name="name"
									onChange={this.handleName}
									placeholder="Destination..."
								/>
							</div>

							<div className="col d-flex justify-content-center mb-5">
								<input
									type="text"
									className="textfield col-md-6"
									value={this.state.userInput.month}
									name="month"
									onChange={this.handleMonth}
									placeholder="Month of Travel..."
								/>
							</div>

							<div className="col d-flex justify-content-center mb-5">
								<input
									type="text"
									className="textfield col-md-6"
									value={this.state.userInput.year}
									name="year"
									onChange={this.handleYear}
									placeholder="Year of Travel"
								/>
							</div>
						</div>
					</form>
				</div>
				<Context.Consumer>
					{({ actions }) => (
						<div className="row my-5 d-flex justify-content-center">
							<div className="col-md-4 justify-content-center">
								<h2
									className="xlButton glass text-center py-2 px-3 m-auto"
									onMouseUp={() => {
										if (actions.addTrip(this.state.trip)) {
											this.props.history.push("/TripPlanner");
										}
									}}>
									Save
								</h2>
							</div>
						</div>
					)}
				</Context.Consumer>
			</div>
		);
	}
}

AddTrip.propTypes = {
	history: PropTypes.object
};
