import React from "react";
import { Context } from "../store/appContext.js";
import PropTypes from "prop-types";

export class TripContacts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: "",
			address: "",
			phone: ""
		};
	}

	handleChangeContacts = evt => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					return (
						<div className="container pb-1 pt-3">
							{store.trips.map((thisTrip, index) => {
								if (thisTrip.id === this.props.tripID) {
									return (
										<div key={index} className="container d-block">
											<form className="form-inline d-flex justify-content-between w-100">
												<div className="form-group w-100 col-md-12 col-lg-12 justify-content-between mb-2">
													<div className="col-sm-12 d-sm-block d-md-flex justify-content-center py-2">
														<input
															type="text"
															className="textfield my-2 col-sm-8 col-md-3"
															//value={this.state.userInput.contacts.contact}
															name="contact"
															onChange={this.handleChangeContacts}
															placeholder="Contact name..."
														/>
														<input
															type="text"
															className="textfield my-2 col-sm-8 col-md-4"
															//value={this.state.userInput.contacts.address}
															name="address"
															onChange={this.handleChangeContacts}
															placeholder="Address..."
														/>
														<input
															type="text"
															className="textfield my-2 col-sm-4 col-md-3"
															//value={this.state.userInput.contacts.phone}
															name="phone"
															onChange={this.handleChangeContacts}
															placeholder="Phone number..."
														/>
														<div className="text-center my-1 col-sm-4 col-md-2">
															<button
																type="button"
																className="addButton w-50 bg-white px-2 mx-2"
																onClick={() => {
																	actions.addContact(thisTrip.id, { ...this.state });
																}}>
																Add
															</button>
														</div>
													</div>
												</div>
											</form>

											<div className="d-block entry-block col-sm-12 col-md-12">
												{thisTrip.contacts.map((item, index) => (
													<div
														key={index}
														className="row entry-row px-3 d-flex justify-content-center">
														<div className="col-sm-10 col-md-8 col-lg-6 px-0 d-flex justify-content-between">
															<span type="text" className="entry px-1 mx-0">
																{item.contact} , {item.address} , {item.phone}
															</span>
															<span
																className="deleteEntry px-4 text-center"
																onClick={() => {
																	actions.removeContact(thisTrip.id, item.contid);
																}}>
																<i className="far fa-calendar-times"></i>
															</span>
														</div>
													</div>
												))}
											</div>
										</div>
									);
								}
							})}
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}

TripContacts.propTypes = {
	tripID: PropTypes.string,
	contid: PropTypes.string
};
