import React from "react";
import { Link } from "react-router-dom";
import { Navbar2 } from "../component/Navbar2";
import AddIcon from "../../img/addbutton.png";
import firebase from "../firebase";

export class TripPlanner extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			trips: []
		};
	}

	componentDidMount() {
		const tripsRef = firebase.database().ref("Trips");
		tripsRef.on("value", snapshot => {
			let trips = snapshot.val();
			let tripList = [];
			for (let item in trips) {
				tripList.push({
					tripID: item,
					name: trips[item].name,
					month: trips[item].month,
					year: trips[item].year,
					contacts: trips[item].contacts,
					places: trips[item].places,
					itinerary: trips[item].itinerary
				});
			}
			this.setState({
				trips: tripList
			});
		});
	}

	render() {
		return (
			<div className="wrapper">
				<Navbar2 />
				<div className="container">
					<div className="row my-4 d-flex justify-content-center">
						<div className="col-md-4 text-center">
							<h2 className="pageTitle text-center py-2 px-3">Trip Planner</h2>
						</div>
					</div>

					<div className="row mt-4 mb-0 d-flex flex-row">
						<div className="col-md-4 ml-1 text-center">
							<h1 className="underTitle text-left pl-1 pt-2 pr-4">Trips</h1>
						</div>
					</div>

					{this.state.trips.map((item, index) => (
						<div key={index} className="row py-4 mt-0 mb-4 d-flex justify-content-between bg-white shadow">
							<div className="col d-flex justify-content-between">
								<h4 className="pageEntry">
									{item.name} {item.year}
								</h4>
							</div>
							<div className="pr-3">
								<Link to={`/TripDetails/${item.tripID}`}>
									<button className="smallView bg-white px-2 mx-2">View/Edit</button>
								</Link>
								<button className="smallDelete bg-white px-2 mx-2">Delete</button>
							</div>
						</div>
					))}
					<div className="row my-4 d-flex justify-content-center">
						<div className="col-md-4 text-center">
							<p className="text-center py-2 px-3">
								<Link to="/AddTrip">
									<img src={AddIcon} className="createTrip m-2" title="Create A New Trip" />
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
