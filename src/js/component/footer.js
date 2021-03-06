import React, { Component } from "react";
import wtLogo from "../../img/wanderTrackerLogo.png";

export const Footer = () => (
	<footer className="container-fluid footer mt-auto  p-0  text-center   ">
		<div className="footer-cont row justify-content-center m-0 p-0">
			<div className="col-md-5 text-center text-secondary">
				<img className="logo-footer" src={wtLogo} />
				<p>
					<strong>Contact Info</strong>
					<br />
					(888) 888-8888
					<br />
					email@wandertracker.com
					<br />
					Created by George Mihov
				</p>
				<a href="#" target="_blank">
					<i className="fab fa-facebook-square" />
				</a>
				<a href="#" target="_blank">
					<i className="fab fa-twitter-square" />
				</a>
				<a href="#" target="_blank">
					<i className="fab fa-instagram" />
				</a>
			</div>
		</div>
	</footer>
);
