/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import configData from "../../src/config.json";
import { hideLoader } from '../_helpers';

const Home = (props) => {

	useEffect(() => {
		hideLoader();
		// Anything in here is fired on component mount.
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Access-Control-Allow-Origin', configData.API_URL);
		headers.append('Access-Control-Allow-Credentials', 'true');
		fetch(configData.API_URL + `/install`, {
			headers: headers
		})
			.then(res => res.json())
			.then(res => {
				window.open(res.data, '_self');
			})
		return () => {
			// Anything in here is fired on component unmount.
		}
	}, [])

	return (
		<>
			<section className="campaign-wizard-wrap p-3">
				<div className="container-fluid">
					<div className="row campaign-wizard-row">
						<div className="col-12 col-md-5 campaign-wizard-left d-flex position-relative align-items-center justify-content-center">
							<div className="campaign-wizard-left-content text-white text-center">
								<div className="campaign-wizard-top-icon pb-3">
									<svg xmlns="http://www.w3.org/2000/svg" width="100" height="80" fill="currentColor" className="bi bi-file-word-fill" viewBox="0 0 16 16">
										<path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5.485 4.879l1.036 4.144.997-3.655a.5.5 0 0 1 .964 0l.997 3.655 1.036-4.144a.5.5 0 0 1 .97.242l-1.5 6a.5.5 0 0 1-.967.01L8 7.402l-1.018 3.73a.5.5 0 0 1-.967-.01l-1.5-6a.5.5 0 1 1 .97-.242z" />
									</svg>
								</div>
								<h2 className="fs-1">Campaign Wizard</h2>
								<div className="pt-5">
									<p className="campaign-wizard-left-content-for">For</p>
									<div className="campaign-img-hs-size">
										<img src="image/hs-logo-white.png" width="108" height="120" alt="Hubspot" />
									</div>
								</div>
							</div>
							<div className="campaign-copyright text-center">
								<p className="text-white">
									&copy; 2021 Campaign Wizard. All Right Reserved.
							<a href="#" className="text-white text-decoration-underline">
										Privacy Policy.
							</a>
								</p>
							</div>
						</div>
						<div className="col-12 col-md-7 campaign-wizard-right bg-light d-flex position-relative align-items-center">
							<div className="campaign-wizard-right-content position-absolute ps-5">
								<h4>Connecting your portal...</h4>
								<div className="campaign-wizard-right-img pt-5 d-flex">
									<div className="campaign-img-size">
										<img src="image/hubspot.png" width="108" height="120" alt="Hubspot" />
									</div>
									<div className="ps-4">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="80" fill="currentColor" className="bi bi-record-fill" viewBox="0 0 16 16">
											<path fillRule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
										</svg>
									</div>
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" width="21" height="80" fill="currentColor" className="bi bi-record-fill" viewBox="0 0 16 16">
											<path fillRule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
										</svg>
									</div>
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" width="25" height="80" fill="currentColor" className="bi bi-record-fill" viewBox="0 0 16 16">
											<path fillRule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

		</>
	)
}

export default Home
