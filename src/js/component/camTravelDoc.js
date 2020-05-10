import React from "react";
import Camera from "react-html5-camera-photo";
import { Navbar2 } from "./Navbar2";
import countries from "../constants/countries";
import "react-html5-camera-photo/build/css/index.css";
import { FACING_MODES } from "react-html5-camera-photo";
import { Context } from "../store/appContext.js";
import PropTypes from "prop-types";
import firebase from "../firebase";

export class camTravelDoc extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			traveldoc: {
				photo: "",
				label: "",
				value: "",
				user_id: 1
			}
		};
	}

	handleSubmit = e => {
		e.preventDefault();

		const ref = firebase.database().ref(`Travel Documents`);
		ref.push({
			photo: this.state.traveldoc.photo,
			label: this.state.traveldoc.label,
			value: this.state.traveldoc.value
		});

		this.setState({ traveldoc: {} });
	};

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
			traveldoc: {
				...this.state.traveldoc,
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
						{this.state.traveldoc ? (
							<div className="row d-sm-block d-md-flex mx-1 justify-content-between py-4 my-4 bg-white shadow">
								<div className="col-sm-4 col-md-3 pageEntry ml-3 px-2 h-1 mt-4">
									<h3 className="country-name align-middle">{this.state.traveldoc.label}</h3>
								</div>
								<div className="col-sm-4 col-md-4 text-center">
									<img
										className="stamp-prev navbar-brand mb-0 img-fluid"
										onError={this.addDefaultSrc}
										src={this.state.traveldoc.photo}
									/>
								</div>
								<div className="col-sm-4 col-md-3 text-center">
									<img
										className="stamp-prev navbar-brand flag img-fluid"
										onError={this.addDefaultSrc}
										src={this.getImage(this.state.traveldoc.value)}
									/>
								</div>
							</div>
						) : null}
					</div>
					<div className="row my-5 d-flex justify-content-center">
						<div className="col-md-4 justify-content-center">
							<h2
								className="xlButton glass text-center py-2 px-3 m-auto"
								type="button"
								onClick={e => {
									this.handleSubmit(e);
								}}>
								Save
							</h2>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

camTravelDoc.propTypes = {
	history: PropTypes.object
};
