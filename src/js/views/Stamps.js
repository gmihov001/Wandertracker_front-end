import React from "react";
import { Link } from "react-router-dom";
import { Navbar2 } from "../component/Navbar2";
import StampPic from "../../img/stamp.jpg";
import CamIcon from "../../img/Image.png";
import { Context } from "../store/appContext.js";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import firebase from "../firebase";

export class Stamps extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stamps: [],
			photoIndex: 0,
			isOpen: false
		};
	}

	componentDidMount() {
		const stampRef = firebase.database().ref("Stamps");
		stampRef.on("value", snapshot => {
			let stamps = snapshot.val();
			let stampList = [];
			for (let item in stamps) {
				stampList.push({
					stampID: item,
					photo: stamps[item].photo,
					label: stamps[item].label,
					value: stamps[item].value,
					user_id: stamps[item].user_id
				});
			}
			this.setState({
				stamps: stampList
			});
		});
	}

	getImage = country => {
		return `https://www.countryflags.io/${country}/shiny/64.png`;
	};

	addDefaultSrc = ev => {
		ev.target.src = "https://i.ytimg.com/vi/YecyKnQUcBY/maxresdefault.jpg";
	};

	render() {
		const { isOpen, photoIndex, stamps } = this.state;
		return (
			<div className="wrapper">
				<Navbar2 />
				<div className="container">
					<div className="row my-4 d-flex justify-content-center">
						<div className="col-md-4 text-center">
							<h2 className="pageTitle text-center py-2 px-3">Stamps</h2>
						</div>
					</div>
					<div className="row my-3 d-flex justify-content-center">
						<div className="col d-flex justify-content-center mb-2">
							<Link to="/camStamps">
								<img
									className="take-pic navbar-brand mb-0 mr-0 h1"
									title="Take a picture of your stamp"
									src={CamIcon}
								/>
							</Link>
						</div>
					</div>
					<div className="row my-5 d-flex justify-content-center">
						<Context.Consumer>
							{({ store, actions }) => {
								return (
									<div className="col-12 d-block">
										{stamps.length &&
											stamps.map((item, index) => (
												<div
													key={index}
													className="row #61 py-2 my-4 mx-1 d-sm-block d-md-flex justify-content-between bg-white shadow">
													<div className="col-xs-4 col-sm-2 col-md-2 pageEntry ml-3 px-2 h-1 mt-4">
														<h4 className="align-middle center-block">{item.label}</h4>
													</div>
													<div className="col-sm-3 #65 col-md-4 text-center">
														<img
															onClick={() =>
																this.setState({ isOpen: true, photoIndex: index })
															}
															className="img-prev navbar-brand mb-0 img-fluid"
															onError={this.addDefaultSrc}
															src={item.photo}
														/>
													</div>
													<div className="col-sm-3 #80 col-md-2 text-center">
														<img
															className="stamp-prev navbar-brand flag img-fluid"
															onError={this.addDefaultSrc}
															src={this.getImage(item.value)}
														/>
													</div>
													<div className="col-sm-3 col-md-2 mr-2 my-2 d-flex justify-content-center">
														<button className="smallShare my-4 px-2 mx-2">Share</button>
														<button
															className="smallDelete my-4 px-2 mx-2"
															type="button"
															onClick={() => {
																actions.removeStamp(item.id);
															}}>
															Delete
														</button>
													</div>
												</div>
											))}
										{isOpen && (
											<Lightbox
												mainSrc={stamps[photoIndex].photo}
												imageCaption={`Stamp from:  ${stamps[photoIndex].label}`}
												onCloseRequest={() => this.setState({ isOpen: false })}
											/>
										)}
									</div>
								);
							}}
						</Context.Consumer>
					</div>
				</div>
			</div>
		);
	}
}
