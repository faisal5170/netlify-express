/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";
import { toast } from 'react-toastify';
import { history, hideLoader } from '../_helpers';
import { useDispatch } from 'react-redux';
import { userActions } from '../_actions';
import campaignsArr from "../campaignList.json";
import { Modal } from "react-bootstrap";

const Campaign = () => {
	const dispatch = useDispatch();
	const [cartItems, updateCartItems] = useState([]);
	const [packageDetails, updatePackageDetails] = useState(null);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	function cartClickEvent(campaign, checked) {
		if (checked) {
			updateCartItems(arr => [...arr, campaign]);
		}
		else {
			var array = [...cartItems];
			var index = cartItems.filter(item => item.id !== campaign.Id);
			if (index !== -1) {
				array.splice(index, 1);
				updateCartItems(array);
			}
		}
	};

	useEffect(() => {
		hideLoader();
		dispatch(userActions.updateCart(cartItems));
		sessionStorage.removeItem("cartInfo")
	}, [cartItems, dispatch]);

	async function handleNextEvent() {
		if (cartItems.length === 0) {
			toast.error("Please select at least one compaign");
		} else {
			history.push('/selected');
		}
	}

	function displayDetails(title) {
		updatePackageDetails(campaignsArr.filter(x => x.Title === title)[0]);
		setShow(true);
	}

	return (
		<>
			<Sidebar />
			<div className="compaign-right-content-main p-3">
				<Header />

				<section className="campaign-wizard-step-main compaign-list-box-next p-md-3 mt-3">
					<div className="container-fluid">
						<div className="row campaign-wizard-wrap-row py-4">
							<div className="col-12 col-lg-4">
								<div className="campaign-wizard-top-icon pb-3 px-xl-5">
									<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-alarm" viewBox="0 0 16 16">
										<path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
										<path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
									</svg>
									<div className="campaign-title">
										<h1 className="fw-bold fst-italic fs-2">Save Time</h1>
									</div>
									<h2 className="fst-italic fs-2 ind-4-left-text-h2">& Reasources</h2>
								</div>
							</div>
							<div className="col-12 col-lg-8 ps-xl-5">
								<div className="title d-flex flex-md-row-reverse">
									<h3 className="fs-4 ind-4-left-text-h3">The days of manual work are over! <br />Focus on strategyand not on production.</h3>
								</div>
							</div>
						</div>
						<div className="row px-xl-5 py-5">
							<div className="col-12 col-sm-5">
								<p>Please select all campaigns you are intrested in.</p>
							</div>
							<div className="col-12 col-sm-5">
								<div className="text-end pt-2 ind-4-total">
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
										<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
									</svg>
									<span className="ind-4-total-count">&nbsp;{cartItems.length}</span> &nbsp;&nbsp;&nbsp;|
								<span className="ps-3">Your total: ${cartItems.map(x => x.Price).reduce((acc, cur) => acc + cur, 0).toFixed(2)}</span>
								</div>
							</div>
							<div className="col-12 col-sm-2 ind-4-button">
								<button type="button" onClick={() => handleNextEvent()} className="float-end next">Next &nbsp;&nbsp;
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg>
								</button>
							</div>
						</div>
						<div className="row px-xl-5">
							{
								campaignsArr.map(function (campaign, index) {
									return (
										<div className="col-lg-3 col-md-6 col-12 d-flex flex-row pb-3" key={campaign.Id}>
											<div className="form-check btn-color  float-end">
												<input className="form-check-input form-check-input1 me-2" type="checkbox" onChange={(e) => cartClickEvent(campaign, e.target.checked)} id={'flexCheckDefault_' + campaign.Id} />
												<label className="checkmark clearfix" htmlFor={'flexCheckDefault_' + campaign.Id}>
													<span key={index} dangerouslySetInnerHTML={{ __html: campaign.Icon }}></span>
													<h3 className="price my-4 float-end">${campaign.Price}</h3>
													<h3 className="float-start ind-4-box-title text-start w-100">{campaign.Title}</h3>
													<a href="#" className="float-end see-details pt-3" onClick={() => displayDetails(campaign.Title)}>See Details</a>
												</label>
											</div>
										</div>
									)
								})
							}

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

export default Campaign
