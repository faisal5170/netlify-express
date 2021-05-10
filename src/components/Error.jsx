/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { history, hideLoader } from '../_helpers';

const Error = () => {
	useEffect(() => {
		hideLoader();
	}, [])
	return (
		<>
			<section className="campaign-wizard-wrap p-3">
				<div className="container-fluid">
					<div className="row campaign-wizard-row">
						<div className="col-12 col-md-5 campaign-wizard-left d-flex position-relative align-items-center justify-content-center ">
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
						<div className="col-12 col-md-7 campaign-wizard-right bg-light d-flex position-relative align-items-center ps-lg-5">
							<div className="campaign-wizard-right-content position-absolute ps-sm-5 pe-3 pe-sm-0">
								<div className="campaign-wizard-right-img campaign-img-size icon-border">
									<svg xmlns="http://www.w3.org/2000/svg" width="63" height="60" fill="currentColor" className="bi bi-exclamation" viewBox="0 0 16 16">
										<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z" />
									</svg>
								</div>
								<div className="py-4">
									<h2 className="campaign-wizard-right-content-text-h2">There seems to have been an issue during the syncing.</h2>
									<p className="pt-4 text-right-color ">
										Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do eisumod tempor incididunt ut labore et dolore magna aliqua.
							</p>
									<div className="pt-4">
										<button type="button" onClick={() => history.push('/')} className="try-agin-btn">Try Agian</button>
									</div>
									<div className="pt-4">
										<a href="#" className="campaign-right-link text-decoration-underline">Cancel</a>
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

export default Error
