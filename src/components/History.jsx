/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/scope */
import React, { useState, useEffect } from 'react'
import Sidebar from "./Sidebar";
import Header from "./Header";
import campaignsArr from "../campaignList.json";
import configData from "../../src/config.json";
import { toast } from 'react-toastify';
import { getUserInfo, hideLoader } from '../_helpers';
import Moment from 'react-moment';
import 'moment-timezone';
import { Modal } from "react-bootstrap";

const History = () => {

	const [historyList, updateHisotries] = useState([]);
	const [isLoaded, updateIsLoaded] = useState(false);
	const [packageDetails, updatePackageDetails] = useState(null);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	useEffect(() => {
		loadHistories();
	}, [])

	function getPackgeIcon(title) {
		if (campaignsArr.filter(x => x.Title === title).length > 0) {
			return campaignsArr.filter(x => x.Title === title)[0]['SmallIcon']
		}
		return campaignsArr[0]['SmallIcon']
	}

	function displayDetails(title) {
		updatePackageDetails(campaignsArr.filter(x => x.Title === title)[0]);
		setShow(true);
	}

	function loadHistories() {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Access-Control-Allow-Origin', configData.API_URL);
		headers.append('Access-Control-Allow-Credentials', 'true');
		var userInfo = getUserInfo();
		var reqModel = {
			"hub_id": userInfo.hub_id,
		}
		var requestOptions = {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(reqModel)
		};
		fetch(configData.API_URL + "/Customers/history", requestOptions)
			.then(response => response.json())
			.then(result => {
				hideLoader();
				debugger
				updateIsLoaded(true);
				var response = JSON.parse(result);
				if (response.error === 0) {
					updateHisotries(response.data);
				} else {
					toast.error(response.message)
				}
			})
			.catch(error => {
				hideLoader();
				alert('error', error)
			});
	}

	return (
		<>
			<Sidebar />
			<div className="compaign-right-content-main p-3">
				<Header />
				<section className="campaign-wizard-step-main p-3 mt-3">
					<div className="container">
						<div className="row pt-4 ps-xl-5 pb-3">
							<div className="col-12 text-right-color">
								<h3 className="ind-4-sec-page-title">Added campagins.</h3>
							</div>
						</div>
						<div className="row px-xl-5">
							<div className="col-12 gx-xl-4 gx-0">
								<div className="table-wrapper-scroll-y my-custom-scrollbar mb-5 table-responsive table-responsive-over">
									<table className="table align-middle">
										<thead className="thead-fixed">
											<tr>
												<th scope="col"></th>
												<th scope="col">Title</th>
												<th scope="col">Date</th>
												<th scope="col">Cloned</th>
												<th scope="col"></th>
											</tr>
										</thead>
										<tbody className="ind-8-table">
											{
												historyList.length === 0 && !isLoaded ? <tr className="align-middle"><td colSpan="4">Loading history...</td></tr> :
													historyList.map(function (history, index) {
														return (
															<tr className="align-middle" key={history.id}>
																<td scope="row">
																	<span key={index} dangerouslySetInnerHTML={{ __html: getPackgeIcon(history.package_name) }}></span>
																</td>
																<td className="py-4">
																	<h5>{history.package_name} </h5>
																</td>
																<td className="py-4">
																	{
																		<Moment format="MMM DD, YYYY">
																			{history.create_at}
																		</Moment>}
																</td>
																<td className="py-4">
																	<h5>{history.migrated_status === "0" ? 'No' : 'Yes'} </h5>
																</td>
																<td className="py-4">
																	<a href="#" className="text-decoration-underline" onClick={() => displayDetails(history.package_name)}>See Details</a>
																</td>
															</tr>
														)
													})
											}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div>
						{/*<!-- Modal See Details dialog -->*/}
						<Modal show={show} className="modal-dialog-image">
							<Modal.Body>
								<div className="row">
									<div className="text-end modal-button">
										<button type="button" className="btn-close text-dark p-3  ind-4-sec-page-close" onClick={() => handleClose()} aria-label="Close"></button>
									</div>
									<div className="col-lg-6 col-12">
										<div className="campaign-see-details-modal p-5">
											<span dangerouslySetInnerHTML={{ __html: packageDetails?.Details?.ImagePath }}></span>

										</div>
									</div>
									<div className="col-lg-6 col-12 ps-4">
										<div className="pe-4 pt-5">
											<h3 className="modal-see-title">{packageDetails?.Title}</h3>
											<p className="modal2-contant">
												{packageDetails?.Details?.Description}
											</p>
										</div>
										<div className="py-4 pe-4">
											<ul className="model-list">
												<li>
													<div className="row ps-2">
														<div className="col-1 pt-1 gx-1">
															<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle pe-2 icon-size" viewBox="0 0 16 16">
																<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
																<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
															</svg>
														</div>
														<div className="col-10 gx-2">
															<p className="modal2-contant">
																{packageDetails?.Details?.AssetsIncluded}
															</p>
														</div>
													</div>
												</li>
												<li>
													<div className="row ps-2">
														<div className="col-1 pt-1 gx-1">
															<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle pe-2 icon-size" viewBox="0 0 16 16">
																<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
																<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
															</svg>
														</div>
														<div className="col-10 gx-2">
															<p className="modal2-contant">
																Software Requirements: {packageDetails?.Details?.SoftwareRequirements}
															</p>
														</div>
													</div>
												</li>
												<li>
													<div className="row ps-2">
														<div className="col-1 pt-1 gx-1">
															<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle pe-2 icon-size" viewBox="0 0 16 16">
																<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
																<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
															</svg>
														</div>
														<div className="col-10 gx-2">
															<p className="modal2-contant">
																Delivery Time: {packageDetails?.Details?.DeliveryTime}
															</p>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</Modal.Body>
						</Modal>
					</div>
				</section>
			</div>
		</>
	)
}

export default History
