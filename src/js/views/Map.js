import React from "react";
import { Link } from "react-router-dom";
import { Navbar2 } from "../component/Navbar2";
import StampPic from "../../img/stamp.jpg";
import wtLogo from "../../img/wanderTrackerLogo.png";

<a href="https://icons8.com/icon/22917/postcard">Postcard icon by Icons8</a>;

export const Map = () => (
	<div className="wrapper">
		<div className="container-fluid d-flex justify-content-between">
			<Link to="/HomePage">
				<img className="logo-navbar navbar-brand mb-0 h1" src={wtLogo} />
			</Link>
			<Link to="/">
				<button className="navbar-signup btn text-danger ">Sign Out</button>
			</Link>
		</div>

		<div className="container">
			<Navbar2 />
			<div className="row my-4 d-flex justify-content-center">
				<div className="col-md-4 text-center">
					<h1 className="pageTitle text-center py-2 px-3">Map</h1>
				</div>
			</div>
			<div className="row my-4 d-flex justify-content-center">
				<div className="col-md-4 text-center">
					<p className="text-center py-2 px-3">
						<Link to="/AddStamp">
							<img
								src="https://img.icons8.com/cotton/64/000000/plus--v3.png"
								className="createTrip m-2"
								title="Save New Stamp"
							/>
						</Link>
					</p>
				</div>
			</div>

			<div className="row py-4 my-4 d-flex justify-content-between bg-white shadow">
				<div className="col d-flex "></div>
			</div>
		</div>
	</div>
);
