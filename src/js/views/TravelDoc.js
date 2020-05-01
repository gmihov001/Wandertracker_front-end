import React from "react";
import { Link } from "react-router-dom";
import { Navbar2 } from "../component/Navbar2";
import Bulgaria5 from "../../img/Bulgaria-5.png";
import CamIcon from "../../img/Image.png";
import { Context } from "../store/appContext.js";
import Lightbox from "react-image-lightbox";
import firebase from "../firebase";

export class TravelDoc extends React.Component {
	constructor() {
		super();
		this.state = {
			travelDocs: [],
			photoIndex: 0,
			isOpen: false
		};
	}

	componentDidMount() {
		const travelDocsRef = firebase.database().ref("Travel Documents");
		travelDocsRef.on("value", snapshot => {
			let travelDocs = snapshot.val();
			let travelDocList = [];
			for (let item in travelDocs) {
				travelDocList.push({
					travelDocID: item,
					photo: travelDocs[item].photo,
					label: travelDocs[item].label,
					value: travelDocs[item].value,
					user_id: travelDocs[item].user_id
				});
			}
			this.setState({
				travelDocs: travelDocList
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
		const { isOpen, photoIndex, travelDocs } = this.state;
		return (
			<div className="wrapper">
				<Navbar2 />
				<div className="container">
					<div className="row #31 my-4 d-flex justify-content-center">
						<div className="col-md-4 text-center">
							<h2 className="pageTitle text-center py-2 px-3">Travel Documents</h2>
						</div>
					</div>
					<div className="row #36 my-3 d-flex justify-content-center">
						<div className="col d-flex justify-content-center mb-2">
							<Link to="/camTravelDoc">
								<img
									className="take-pic navbar-brand mb-0 h1"
									title="Take a picture of your travel document"
									src={CamIcon}
								/>
							</Link>
						</div>
					</div>

					<div className="row #48 my-5 d-flex justify-content-center">
						<Context.Consumer>
							{({ actions }) => {
								return (
									<div className="col-12 d-block">
										{travelDocs.length &&
											travelDocs.map((doc, index) => (
												<div
													key={index}
													className="row #56 py-2 my-4 mx-1 d-sm-block d-md-flex justify-content-between bg-white shadow">
													<div className="col-xs-4 col-sm-2 col-md-2 pageEntry ml-3 px-2 h-1 mt-4">
														<h4 className="align-middle center-block">{doc.label}</h4>
													</div>
													<div className="col-sm-3 #65 col-md-4 text-center">
														<img
															onClick={() =>
																this.setState({ isOpen: true, photoIndex: index })
															}
															className="img-prev navbar-brand mb-0 img-fluid"
															onError={this.addDefaultSrc}
															src={doc.photo}
														/>
													</div>
													<div className="col-sm-3 #80 col-md-2 text-center">
														<img
															className="stamp-prev navbar-brand flag img-fluid"
															onError={this.addDefaultSrc}
															src={this.getImage(doc.value)}
														/>
													</div>
													<div className="col-sm-2 col-md-2 text-center">
														<button
															className="smallDelete my-4 px-2 mx-1"
															type="button"
															onClick={() => {
																actions.removeDoc(doc.travelDocID);
															}}>
															Delete
														</button>
													</div>
												</div>
											))}
										{isOpen && (
											<Lightbox
												mainSrc={travelDocs[photoIndex].photo}
												imageCaption={`Document from: ${travelDocs[photoIndex].label}`}
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
