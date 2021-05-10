/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { history, hideLoader } from '../_helpers';
import { toast } from 'react-toastify';
import configData from "../../src/config.json";

const Portal = (props) => {
	var initialValues = {
		hub_id: 'Loading...'
	}
	const [tokenInfo, setHubId] = useState(initialValues);
	useEffect(() => {

		let token = localStorage.getItem("token");
		const params = new URLSearchParams(window.location.search);
		token = params.get('t');
		localStorage.setItem("token", token);

		if (token == null || token === undefined || token === "null") {
			history.push('/');
		} else {
			hideLoader();
			getTokenInfo(token);
		}
	}, []);

	function getTokenInfo(token) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Access-Control-Allow-Origin', configData.API_URL);
		headers.append('Access-Control-Allow-Credentials', 'true');
		fetch(configData.API_URL + `/hubspot/userinfo`, {
			method: 'post',
			headers: headers,
			body: JSON.stringify({ token: token }),
		})
			.then(res => res.json())
			.then(res => {
				if (res.statusCode !== undefined && res.statusCode !== 200) {
					toast.error(JSON.parse(res.error).message);
					history.push('/error');
				} else {
					setHubId(res);
					sessionStorage.setItem('tokenInfo', JSON.stringify(res));
				}
			})
	}

	return (
		<>
			<header className="container-fluid ">
				<div className="row">
					<div className="col">
						<div className="campaign-wizard-top-icon py-2">
							<svg xmlns="http://www.w3.org/2000/svg" width="100" height="30" fill="currentColor" className="bi bi-file-word-fill text-white" viewBox="0 0 16 16">
								<path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5.485 4.879l1.036 4.144.997-3.655a.5.5 0 0 1 .964 0l.997 3.655 1.036-4.144a.5.5 0 0 1 .97.242l-1.5 6a.5.5 0 0 1-.967.01L8 7.402l-1.018 3.73a.5.5 0 0 1-.967-.01l-1.5-6a.5.5 0 1 1 .97-.242z" />
							</svg>
						</div>
					</div>
					<div className="col d-flex align-items-center justify-content-end">
						<div>
							<a href="#" className="top-header-text text-decoration-none">Campagin Creators: {tokenInfo.hub_id}</a>
						</div>
					</div>
				</div>
			</header>
			<section className="py-5">
				<div className="container">
					<div className="row ">
						<div className="col-lg-8 col-12 py-5">
							<h2 className="portal-color">Your portal is connected! </h2>
							<h4 className="right-content-inde-3 py-2">Campaign Wizard offers turnkey campaign templates for HubSpot users. </h4>
							<p className="text-right-color text-ind-3-color">Looking to launch sales and marketing efforts faster, with no QA/QC headaches and at a fraction of the cost of an agency? Campaign Wizard is the optimal solution for:
</p>
							<div className="text-right-color">
								<p>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle pe-2 icon-size" viewBox="0 0 16 16">
										<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
										<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
									</svg>New HubSpot users looking to rapidly deploy initiatives </p>
								<p>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle pe-2 icon-size" viewBox="0 0 16 16">
										<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
										<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 	11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
									</svg>Seasoned HubSpot users looking to spend more time on strategy </p>
								<p>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle pe-2 icon-size" viewBox="0 0 16 16">
										<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
										<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
									</svg>Small teams that are budget-conscious but need results </p>
								<p>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle pe-2 icon-size" viewBox="0 0 16 16">
										<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
										<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 	1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
									</svg>Agile teams that launch multiple initiatives (these campaigns are easily cloneable)</p>
								<p>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle pe-2 icon-size" viewBox="0 0 16 16">
										<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
										<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 	1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
									</svg>Drastically reduce the amount of QA; templates are already vetted</p>
								<p>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle pe-2 icon-size" viewBox="0 0 16 16">
										<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
										<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 	1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
									</svg>HubSpot users feeling scared to press the ON button (it happens to the best of us!)</p>
							</div>
							<div className="pt-3 "><NavLink to="/campaign"><button type="button" className="try-agin-btn">Get Started</button></NavLink></div>
						</div>
						<div className="col-lg-4 col-12 py-5">
							<div>
								<img src="image/portal.jpg" width="108" height="120" alt="portal" />
							</div>
						</div>
					</div>
				</div>
			</section>
			<footer>
				<div className="row g-0">
					<div className="col-12">
						<div className="text-center text-ind-copy-right">
							<p>&copy; 2021 Campaign Wizard. All Right Reserved.
						<a href="#" className="text-decoration-underline text-secondary">Privacy Policy.</a>
							</p>
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Portal