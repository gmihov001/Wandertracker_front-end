import React from "react";
import Camera from "react-html5-camera-photo";
//import { Link } from "react-router-dom";
import { Navbar2 } from "./Navbar2";
//import passport from "../../img/passport.jpg";
import countries from "../constants/countries";
import "react-html5-camera-photo/build/css/index.css";
import CameraImport, { FACING_MODES } from "react-html5-camera-photo";
import { Context } from "../store/appContext.js";
import PropTypes from "prop-types";
//import { ImagePreview } from "./ImagePreview";
import firebase from "../firebase";

export class camStamps extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stamp: {
				photo: null,
				label: "",
				value: ""
			}
		};
	}

	handleSubmit = e => {
		e.preventDefault();

		const ref = firebase.database().ref(`Stamps`);
		ref.push({
			photo: this.state.stamp.photo,
			label: this.state.stamp.label,
			value: this.state.stamp.value
		});

		this.setState({ stamp: {} });
	};

	onTakePhoto = photo => {
		//const newstamp = Object.assign(this.state.stamp, photo);
		//this.setState({ stamp: { ...this.state.stamp, photo: photo } });
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
					this.setState({ stamp: { ...this.state.stamp, photo: url } });
				});
			}
		);
	};

	onChange = e => {
		let str = e.target.options[e.target.selectedIndex].innerHTML;
		let split = str.split(":");

		this.setState({
			stamp: {
				...this.state.stamp,
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
								<option value="Select Country">Select a Country</option>
								{countries.map(({ label, value }, index) => (
									<option key={index} value={value}>
										{value}: {label}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="row">
						{this.state.stamp ? (
							<div className="col-12 d-sm-block d-md-flex mx-1 justify-content-between py-4 my-4 bg-white shadow">
								<div className="col-sm-4 col-md-3 pageEntry ml-3 px-2 mt-4">
									<h3 className="country-name align-middle">{this.state.stamp.label}</h3>
								</div>
								<div className="col-sm-4 text-center">
									<img
										className="stamp-prev img-thumbnail navbar-brand mb-0 h-1"
										onError={this.addDefaultSrc}
										src={this.state.stamp.photo}
									/>
								</div>
								<div className="col-sm-4 col-md-3 text-center">
									<img
										className="stamp-prev img-thumbnail navbar-brand flag mr-5 text-center"
										onError={this.addDefaultSrc}
										src={this.getImage(this.state.stamp.value)}
									/>
								</div>
							</div>
						) : null}
					</div>
					<Context.Consumer>
						{({ actions }) => (
							<div className="row my-5 d-flex justify-content-center">
								<div className="col-md-4 d-flex justify-content-center">
									<h2
										className="xlButton glass text-center py-2 px-3 m-auto"
										type="button"
										onMouseUp={e => {
											if (this.handleSubmit(e)) {
												this.props.history.push("/Stamps");
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

camStamps.propTypes = {
	history: PropTypes.object
};
