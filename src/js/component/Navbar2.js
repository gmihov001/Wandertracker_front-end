import React from "react";
import { Link } from "react-router-dom";
import wtLogo from "../../img/wanderTrackerLogo.png";
import CalIcon from "../../img/Calendar.png";
import DocIcon from "../../img/Documents.png";
import StampsIcon from "../../img/Stamps.png";
import MapIcon from "../../img/MapLocation.png";
import UserIcon from "../../img/user-03.png";

export const Navbar2 = () => {
	return (
		<nav className="navbar2 navbar navbar-expand-lg navbar-light bg-white d-flex justify-content-center">
			<Link to="/HomePage">
				<img className="logo-navbar navbar-brand mb-0 h1" src={wtLogo} />
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<section className="d-flex justify-content-between s2 navbar-nav mr-0 text-center">
					<div className="p-1">
						<Link to="/Stamps">
							<img className="iconbtn icons-navbar mb-0 h1" title="Go to Stamps" src={StampsIcon} />
						</Link>
					</div>

					<div className="p-1">
						<Link to="/TravelDoc">
							<img
								className="iconbtn icons-navbar mb-0 h1"
								title="Go To Travel Documents"
								src={DocIcon}
							/>
						</Link>
					</div>

					<div className="p-1">
						<Link to="/Map">
							<img className="iconbtn icons-navbar mb-0 h1" title="Go To Maps" src={MapIcon} />
						</Link>
					</div>

					<div className="p-1">
						<Link to="/TripPlanner">
							<img className="iconbtn icons-navbar mb-0 h1 " title="Go To Travel Planner" src={CalIcon} />
						</Link>
					</div>

					<div className="p-1">
						<Link to="/HomePage">
							<img className="iconbtn icons-navbar mb-0 h1" title="Go To Profile" src={UserIcon} />
						</Link>
					</div>
				</section>
			</div>
		</nav>
	);
};
