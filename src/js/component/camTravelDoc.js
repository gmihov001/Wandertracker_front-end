import React from "react";
import Camera from "react-html5-camera-photo";
//import { Link } from "react-router-dom";
import { Navbar2 } from "./Navbar2";
//import passport from "../../img/passport.jpg";
import countries from "../constants/countries";
import "react-html5-camera-photo/build/css/index.css";
import { FACING_MODES } from "react-html5-camera-photo";
import { Context } from "../store/appContext.js";
import PropTypes from "prop-types";
//import { ImagePreview } from "./ImagePreview";
import firebase from "../firebase";

export class camTravelDoc extends React.Component {
	constructor() {
		super();
		this.state = {
			traveldoc: {
				photo: "",
				country_label: "",
				country_value: "",
				user_id: 1
			}
		};
	}

	onTakePhoto = photo => {
		//const newTraveldoc = Object.assign(this.state.traveldoc, photo);
		//this.setState({ traveldoc: { ...this.state.traveldoc, photo: photo } });
		const date = new Date();

		const storageRef = firebase.storage().ref();
		const uploader = storageRef
			.child("/" + date.toString() + ".jpeg")
			.putString(photo.split(",")[1], "base64", { contentType: "image/jpeg" });
		uploader.on(
			"state_changed",
			snapshot => {},
			error => console.log(error),
			() => {
				uploader.snapshot.ref.getDownloadURL().then(url => {
					this.setState({ traveldoc: { ...this.state.traveldoc, photo: url } });
				});
			}
		);
	};

	onChange = e => {
		let str = e.target.options[e.target.selectedIndex].innerHTML;
		let split = str.split(":");

		this.setState({
			traveldocs: {
				...this.state.traveldocs,
				value: split[0],
				label: split[1]
			}
		});
	};

	getImage = country => {
		return `https://www.countryflags.io/${country}/shiny/64.png`;
	};

	addDefaultSrc = ev => {
		ev.target.src = "https://i.ytimg.com/vi/YecyKnQUcBY/maxresdefault.jpg";
	};

	render() {
		console.log("Typeof: " + typeof this.state.traveldoc.photo);
		return (
			<div className="wrapper">
				<Navbar2 />
				<div className="container App mt-5">
					<div className="row my-5 d-flex justify-content-center">
						<Camera
							onTakePhoto={this.onTakePhoto}
							idealFacingMode={FACING_MODES.ENVIRONMENT}
							isImageMirror={false}
						/>
					</div>
					<div className="row d-flex justify-content-center">
						<div className="col-sm-10 col-lg-8">
							<select id="country" name="country" onChange={this.onChange} className="form-control">
								<option value="Select Country">Select Country</option>
								{countries.map(({ label, value }, index) => (
									<option key={index} value={value}>
										{value}: {label}
									</option>
								))}
							</select>
						</div>
					</div>
					<div>
						{this.state.traveldocs ? (
							<div className="row d-sm-block d-md-flex mx-1 justify-content-between py-4 my-4 bg-white shadow">
								<div className="col-sm-4 col-md-3 pageEntry ml-3 px-2 h-1 mt-4">
									<h3 className="country-name align-middle">{this.state.traveldocs.label}</h3>
								</div>
								<div className="col-sm-4 col-md-4 text-center">
									<img
										className="stamp-prev navbar-brand mb-0 img-fluid"
										onError={this.addDefaultSrc}
										src={this.state.traveldocs.photo}
									/>
								</div>
								<div className="col-sm-4 col-md-3 text-center">
									<img
										className="stamp-prev navbar-brand flag img-fluid"
										onError={this.addDefaultSrc}
										src={this.getImage(this.state.traveldocs.value)}
									/>
								</div>
							</div>
						) : null}
					</div>
					<Context.Consumer>
						{({ actions }) => (
							<div className="row my-5 d-flex justify-content-center">
								<div className="col-md-4 justify-content-center">
									<h2
										className="xlButton glass text-center py-2 px-3 m-auto"
										type="text"
										onMouseUp={() => {
											if (actions.addDoc(this.state.traveldocs)) {
												this.props.history.push("/TravelDoc");
											}
										}}>
										Save
									</h2>
								</div>
							</div>
						)}
					</Context.Consumer>
				</div>
			</div>
		);
	}
}

camTravelDoc.propTypes = {
	history: PropTypes.object
};
