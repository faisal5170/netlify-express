/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import Sidebar from "./Sidebar";
import Header from "./Header";
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import { history, hideLoader, showLoader } from '../_helpers';
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import configData from "../../src/config.json";
import { useSelector } from 'react-redux';
import { getUserInfo } from '../_helpers';

const Selected = (props) => {

	const initialFormState = {
		paymentEmail: '',
		paymentCardName: '',
		paymentCardNumber: '',
		paymentCardCvc: '',
		paymentCardMonth: '',
		paymentcardYear: '',
		paymentCountry: '',
		total: 0,
		paymentBillingddress: false,
	};
	const { cartInfo } = useSelector(state => state.users);
	const [cartItems, updateCartItems] = useState([]);
	const [failedPackagesName, updatefailedPackagesName] = useState(null);
	const [packageDetails, updatePackageDetails] = useState(null);
	const [ctId, updateCTId] = useState(0);
	const [showDetails, setShowDetails] = useState(false);
	const handleDetailsClose = () => setShowDetails(false);

	function displayDetails(title) {
		updatePackageDetails(cartItems.filter(x => x.Title === title)[0]);
		setShowDetails(true);
	}


	useEffect(() => {
		hideLoader();
		if (cartInfo) {
			updateCartItems(cartInfo);
			sessionStorage.setItem("cartInfo", JSON.stringify(cartInfo));
		}
	}, [cartInfo]);


	useEffect(() => {
		const cartStorageInfo = (sessionStorage.getItem("cartInfo") || [])
		if (cartStorageInfo == null || cartStorageInfo.length === 0) {
			history.push('/campaign');
		} else {
			updateCartItems(JSON.parse(cartStorageInfo));
		}
	}, [])

	const [show, setShow] = useState(false);
	const [showThanksModal, setThanksShow] = useState(false);
	const [showResponseModal, setResponseShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleThanksClose = () => setThanksShow(false);
	const handleResponseClose = () => setResponseShow(false);
	const [cardInfo, setCardDetails] = useState(initialFormState);

	const handleInputChange = event => {
		const { name, value } = event.target;
		setCardDetails({ ...cardInfo, [name]: value });
	}

	function bindHeaders() {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Access-Control-Allow-Origin', configData.API_URL);
		headers.append('Access-Control-Allow-Credentials', 'true');
		return headers;
	}

	async function handlePayment(event) {
		event.preventDefault();
		showLoader();
		let headers = bindHeaders();
		cardInfo.total = cartItems.map(x => x.Price).reduce((acc, cur) => acc + cur, 0).toFixed(2);
		fetch(configData.API_URL + `/payment`, {
			method: 'post',
			body: JSON.stringify(cardInfo),
			headers: headers
		})
			.then(res => res.json())
			.then(res => {
				if (res.code !== undefined) {
					hideLoader();
					toast.error(res.raw.message);
				} else {
					var userInfo = getUserInfo();
					var reqModel = {
						"hub_id": userInfo.hub_id,
						"user": userInfo.user,
						"id": res.id,
						"amount": res.amount / 100,
						"title": cartItems.map(x => x.Title).toString()
					}
					var requestOptions = {
						method: 'POST',
						headers: headers,
						body: JSON.stringify(reqModel)
					};

					fetch(configData.API_URL + "/Customers/transactions", requestOptions)
						.then(response => response.json())
						.then(result => {
							hideLoader();
							var response = JSON.parse(result);
							if (response.error === 0) {
								updateCTId(response.id);
								setShow(false);
								setThanksShow(true);
								//history.push('/history');
							} else {
								toast.error(response.message)
							}
						})
						.catch(error => {
							hideLoader();
							toast.error('error', error)
						});
				}
			})
		return (res) => {
			// Anything in here is fired on component unmount.
		}
	};

	async function startTransfer() {
		showLoader();
		let headers = bindHeaders();
		var userInfo = getUserInfo();
		var reqModel = {
			"token": userInfo.token,
			"packages": cartItems.map(x => x.Title).toString(),
			"ctId": ctId
		}
		var requestOptions = {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(reqModel)
		};

		await fetch(configData.API_URL + "/Customers/transfer", requestOptions)
			.then(response => response.json())
			.then(result => {
				hideLoader();
				setThanksShow(false);
				var resultArr = result.filter(x => x.isCloned === false);
				if (resultArr.length > 0) {
					updatefailedPackagesName(resultArr.filter(x => x.isCloned === false).map(x => x.package).toString());
					setResponseShow(true);
				} else {
					setResponseShow(false);
					toast.success('Campaign trasfered successfully.')
					history.push('/history');
				}
			})
			.catch(error => {
				hideLoader();
				toast.error('An error has occured, Please contact system admin', error)
			});
	}

	function cartClickEvent(campaign) {
		var array = [...cartItems];
		var index = cartItems.findIndex(item => item.Id === campaign.Id);
		if (index !== -1) {
			array.splice(index, 1);
			updateCartItems(array);
			sessionStorage.setItem("cartInfo", JSON.stringify(array));
			if (array.length === 0) {
				history.push('/campaign');
			}
		}
	};

	return (
		<>
			<Sidebar />
			<div className="compaign-right-content-main p-3">
				<Header />
				<section className="campaign-wizard-step-main compaign-list-box-back p-md-3 mt-3">
					<div className="container-fluid">
						<div className="row py-5 ps-4 mx-xl-3">
							<div className="col-12 d-flex flex-row">
								<h3 className="ind-4-sec-page-title">Your selected campaigns</h3>

							</div>
						</div>
						<div className="table-responsive p-xl-5 pt-xl-2">
							<table className="table">
								<tbody>
									{
										cartItems.map(function (campaign, index) {
											return (
												<tr className="align-middle" key={campaign.Id}>
													<th scope="row">
														<span key={index} dangerouslySetInnerHTML={{ __html: campaign.SmallIcon }}></span>
													</th>
													<td className="py-4">
														<h5 className="fw-bold ind-4-sec-page-content">{campaign.Title} </h5>
														<h6 className="ind-4-sec-page-text">{campaign.Description}</h6>
													</td>
													<td className="py-4 text-end">
														<a href="#modal3" className="back-btn text-decoration-underline ind-4-sec-page-text" onClick={() => displayDetails(campaign.Title)}>See Details</a>
													</td>
													<td className="py-4 text-end">
														<h4 className="price">${campaign.Price}</h4>
													</td>
													<td className="py-4">
														<a href="#" onClick={(e) => cartClickEvent(campaign)}>
															<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x back-btn ind-4-sec-page-close" viewBox="0 0 16 16">
																<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
															</svg>
														</a>
													</td>
												</tr>
											)
										})

									}
								</tbody>
							</table>
						</div>
						<div className="row px-xl-5">
							<div className="col-sm-3 col-12 p-3">
								<Link to="/campaign" className="back-btn back">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left ind-4-sec-page-close" viewBox="0 0 16 16">
										<path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
									</svg>
									<span className="ps-2 ind-4-sec-page-text">Back</span>
								</Link>
							</div>
							<div className="col-sm-9 col-12 p-3 d-flex justify-content-end">
								<div className="px-lg-5 px-4 text-color pt-2">
									<h5>Your total:${cartItems.map(x => x.Price).reduce((acc, cur) => acc + cur, 0).toFixed(2)}</h5>
								</div>
								<div className="ind-4-button">
									<a className="ind-4-sec-page-button" onClick={() => setShow(true)} role="button" >Checkout</a>
								</div>
							</div>
						</div>
						<div className="row px-xl-5">
							<div className="col-12 pt-2 text-end">
								<p className="ind-4-sec-page-text"> You'all be prompted to enter your billing info.</p>
							</div>
						</div>
						<div className="row mt-5 mx-0">
							{/*<!-- First modal dialog -->*/}

							<Modal show={show} onHide={handleClose}>
								<Modal.Body>
									<form action="" autoComplete="off" method="post" onSubmit={handlePayment}>
										<div className="text-end px-3 pt-2">
											<button type="button" className="btn-close ind-4-sec-page-close" onClick={() => setShow(false)} aria-label="Close"></button>
										</div>
										<div className="row px-4">
											<div className="d-flex ">
												<div className="d-inline-block">
													<span className="modal1-button-top">Powerder by <strong>Stripe</strong></span>
												</div>
												<div className="px-5">
													<h4 className="modal-title modal1-title" id="staticBackdropLabel">Checkout</h4>
													<h4 className="text-center">
														<span className="text-color">${cartItems.map(x => x.Price).reduce((acc, cur) => acc + cur, 0).toFixed(2)}</span>
													</h4>
												</div>
											</div>
										</div>
										<div className="modal-body px-4">
											<div className="row">
												<div className="col-12 ">
													<p className="modal-text ind-4-sec-page-text">
														<small>Please provide the following details to complete your order.</small>
													</p>
												</div>
											</div>
											<div className="row ">
												<div className="col-12 mb-3 text-start">
													<label htmlFor="exampleFormControlInput1" className="form-label modal1-label">
														Your Email
											</label>
													<input type="email" onChange={handleInputChange} name="paymentEmail" required className="form-control p-3 input-border" id="exampleFormControlInput1" />
												</div>
											</div>
											<div className="row">
												<div className="col-12 mb-3 text-start">
													<label htmlFor="exampleFormControlInput1" className="form-label modal1-label">
														Card Holder's Name
											</label>
													<input type="text" onChange={handleInputChange} name="paymentCardName" required className="form-control p-3 input-border" id="exampleFormControlInput1" />
												</div>
											</div>
											<div className="row">
												<div className="col-sm-9 col-12 mb-3 text-start">
													<label htmlFor="exampleFormControlInput1" className="form-label modal1-label">
														Card Number
											</label>
													<InputMask mask="9999-9999-9999-9999" maskChar="#" value={props.value} className="input-border form-control p-3" onChange={handleInputChange} name="paymentCardNumber" required placeholder="####-####-####-####">
													</InputMask>

												</div>
												<div className="col-sm-3 col-12 mb-3 text-start">
													<label htmlFor="exampleFormControlInput1" className="form-label modal1-label">
														CVC
											</label>
													<InputMask mask="999" maskChar="#" value={props.value} className="input-border form-control p-3" onChange={handleInputChange} name="paymentCardCvc" required placeholder="###">
													</InputMask>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-6 col-12 mb-3 text-start">
													<label htmlFor="exampleFormControlInput1" className="form-label modal1-label">
														Expiration Date
											</label>
													<select className="form-select input-border p-3" onChange={handleInputChange} name="paymentCardMonth" required aria-label="Default select example">
														<option defaultValue="" value="">Month</option>
														<option value="01">January</option>
														<option value="02">February</option>
														<option value="03">March</option>
														<option value="04">April</option>
														<option value="05">May</option>
														<option value="06">June</option>
														<option value="07">July</option>
														<option value="08">August</option>
														<option value="09">Septembr</option>
														<option value="10">October</option>
														<option value="11">November</option>
														<option value="12">December</option>
													</select>
												</div>
												<div className="col-sm-6 col-12 mb-3 text-start">
													<label htmlFor="exampleFormControlInput1" className="form-label modal1-label">
														Expiration Date
										  	</label>
													<select className="form-select input-border p-3" onChange={handleInputChange} name="paymentcardYear" required aria-label="Default select example">
														<option defaultValue="" value="">Year</option>
														<option value="2020">2020</option>
														<option value="2021">2021</option>
														<option value="2022">2022</option>
														<option value="2023">2023</option>
														<option value="2024">2024</option>
														<option value="2025">2025</option>
														<option value="2026">2026</option>
														<option value="2027">2027</option>
														<option value="2028">2028</option>
														<option value="2029">2029</option>
														<option value="2030">2030</option>
														<option value="2031">2031</option>
														<option value="2032">2032</option>
														<option value="2033">2033</option>
														<option value="2034">2034</option>
														<option value="2035">2035</option>
														<option value="2036">2036</option>
														<option value="2037">2037</option>
													</select>
												</div>
											</div>
											<div className="row">
												<div className="col-12 mb-3 text-start">
													<label htmlFor="exampleFormControlInput1" className="form-label modal1-label">
														Country
											</label>
													<select className="form-select input-border p-3" aria-label="Default select example" onChange={handleInputChange} name="paymentCountry" required>
														<option defaultValue="" value="">Select country</option>
														<option value="1">India</option>
														<option value="2">America</option>
														<option value="3">Australia</option>
													</select>
												</div>
											</div>
											<div className="row pb-4">
												<div className="col-sm-5 col-12 pt-2 position-relative">
													<input className="form-check-input modal-check billing-checkbox" type="checkbox" value="" id="flexCheckDefault" onChange={handleInputChange} name="paymentBillingddress" />
													<label className="form-check-label checkbox-font fw-bold ps-4 modal1-label" htmlFor="flexCheckDefault">
														<p>Save billing details</p>
													</label>
												</div>
												<div className="col-sm-3 col-4 text-end g-0 pt-2">
													<button type="button" className="btn btn-link text-dark w-40 fw-bold modal1-button-cancel">Cancel</button>
												</div>
												<div className="col-sm-4 col-8 text-end ps-0 ind-4-button">
													{/* <a className="modal1-button-submit" data-bs-toggle="modal" data-bs-target="#modal2" href="#modal2" role="button" data-bs-dismiss="modal">Complete Order</a> */}
													<button className="modal1-button-submit" type="submit">Complete Order</button>
												</div>
											</div>
										</div>
									</form>
								</Modal.Body>
							</Modal>
						</div>
					</div>
					{/*<!-- Second modal dialog -->*/}

					<Modal show={showThanksModal} onHide={handleThanksClose}>
						<Modal.Body>
							<div className="text-end px-3 pt-2">
								<button type="button" className="btn-close ind-4-sec-page-close" onClick={() => setThanksShow(false)} aria-label="Close"></button>
							</div>
							<div className="row px-4">
								<div className="col  text-center">
									<h2 className="modal1-title">Order Complete!</h2>
									<p className="p-3 modal2-contant text-center">
										Thank you For your purchase .click the button below to transfer your portal.
								</p>
									<div>
										<a className="btn btn-primary text-center transfer-btn ind-4-sec-page-button" href="#modal2" onClick={() => startTransfer()} role="button">Transfer Campaigns</a>
									</div>

								</div>
							</div>
						</Modal.Body>
					</Modal>

					<Modal show={showResponseModal} onHide={handleResponseClose}>
						<Modal.Body>
							<div className="text-end px-3 pt-2">
								<button type="button" className="btn-close ind-4-sec-page-close" onClick={() => setResponseShow(false)} aria-label="Close"></button>
							</div>
							<div className="row px-4">
								<div className="col  text-center">
									<h2 className="modal1-title">Unable to migrate!</h2>
									<p className="p-3 modal2-contant text-center">
										Unable to migrate "<b>{failedPackagesName}</b>" packages. Please contact support.
								</p>
									<div>
										<a className="btn btn-primary text-center transfer-btn ind-4-sec-page-button" href="mailto:support@campaignwizard.io" role="button">Contact Support</a>
									</div>

								</div>
							</div>
						</Modal.Body>
					</Modal>

					<div>
						{/*<!-- Modal See Details dialog -->*/}
						<Modal show={showDetails} className="modal-dialog-image">
							<Modal.Body>
								<div className="row">
									<div className="text-end modal-button">
										<button type="button" className="btn-close text-dark p-3  ind-4-sec-page-close" onClick={() => handleDetailsClose()} aria-label="Close"></button>
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

export default Selected
