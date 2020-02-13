import React from "react";
import { Link } from "react-router-dom";
import { Navbar2 } from "../component/Navbar2";
import StampPic from "../../img/stamp.jpg";
import CamIcon from "../../img/Image.png";
import { Context } from "../store/appContext.js";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export class Stamps extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	getImage = country => {
		return `https://www.countryflags.io/${country}/shiny/64.png`;
	};

	addDefaultSrc = ev => {
		ev.target.src = "https://i.ytimg.com/vi/YecyKnQUcBY/maxresdefault.jpg";
	};

	render() {
		const { isOpen } = this.state;
		return (
			<div className="wrapper">
				<Navbar2 />
				<div className="container">
					<div className="row my-4 d-flex justify-content-center">
						<div className="col-md-4 text-center">
							<h1 className="pageTitle text-center py-2 px-3">Stamps</h1>
						</div>
					</div>
					<div className="row my-3 d-flex justify-content-center">
						<div className="col d-flex justify-content-center mb-2">
							<Link to="/camStamps">
								<img
									className="take-pic navbar-brand mb-0 h1"
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
										{store.stamps.map((item, index) => (
											<div
												key={index}
												className="row #61 py-2 my-4 mx-1 d-sm-block d-md-flex justify-content-between bg-white shadow">
												<div className="col-xs-4 col-sm-2 col-md-2 pageEntry ml-3 px-2 h-1 mt-4">
													<h4 className="align-middle center-block">{item.label}</h4>
												</div>
												<div className="col-sm-3 #65 col-md-4 text-center">
													<img
														onClick={() => this.setState({ isOpen: true })}
														className="img-prev navbar-brand mb-0 img-fluid"
														onError={this.addDefaultSrc}
														src={StampPic}
													/>

													{isOpen && (
														<Lightbox
															mainSrc={StampPic}
															onCloseRequest={() => this.setState({ isOpen: false })}
														/>
													)}
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
