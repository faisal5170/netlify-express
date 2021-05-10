/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import Sidebar from "./Sidebar";
import Header from "./Header";
import { hideLoader } from '../_helpers';

const Faqs = () => {

	useEffect(() => {
		hideLoader();
	}, [])
	return (
		<>
			<Sidebar />
			<div className="compaign-right-content-main p-3">
				<Header />
				<section className="campaign-wizard-step-main p-3 mt-3">
					<div className="row px-xl-5">
						<div className="col-xl-6 col-12 pt-3">
							<div className="pt-3">
								<h3 className="pb-2 ind-4-sec-page-title">Find the answers to your questions here.</h3>
							</div>
							<p className="ind-5-text-left">
								If you don't see the answers you are looking for and or need assistance, please feel free to email us at <a href="#">info@campaignwizard.com</a>
							</p>
						</div>
						<div className="col-xl-3 col-12 pt-3">
							
							<div className="faqimg">
								<div className="faqimg1">
							<a href="#modal3" className="text-decoration-underline" data-bs-toggle="modal">
								
								<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-caret-right-fill faqicon" viewBox="0 0 16 16">
								<path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
								</svg>
							</a></div></div>
						</div>
						<div className="col-xl-3 col-12">
							<div className="psize">
								<p className="ind-4-sec-page-content pt-5">
									Getting started with Compaign Wizard in less than 3 minutes
					</p>
							</div>
						</div>
					</div>
					<div className="row px-xl-5 pt-3">
						<div className="col">
							<div className="accordion accordion-flush" id="accordionFlushExample">
							<div className="accordion-item">
									<h2 className="accordion-header" id="flush-heading6">
										<button className="accordion-button collapsed fw-bold text-start" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse6" aria-expanded="false" aria-controls="flush-collapse6">
											<div className="d-flex">
												<span className="z-index">
													<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-chevron-down text-white" viewBox="0 0 16 16">
														<path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
													</svg>
												</span>
												<span className="ps-3">
												What happens if I want to uninstall an app? 
									</span>
											</div>
										</button>
									</h2>
									<div id="flush-collapse6" className="accordion-collapse collapse" aria-labelledby="flush-heading6" data-bs-parent="#accordionFlushExample">
										<div className="accordion-body">
										You need to do it from your HubSpot portal. 

							  </div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="flush-headingOne">
										<button className="accordion-button collapsed fw-bold text-start" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
											<div className="d-flex">
												<span className="z-index">
													<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-chevron-down text-white" viewBox="0 0 16 16">
														<path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
													</svg>
												</span>
												<span className="ps-3">
												 What happens if I want to remove campaigns? 
									</span>
											</div>
										</button>
									</h2>
									<div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
										<div className="accordion-body">
										It’s best to do it within HubSpot. Make sure everything is turned OFF. You can choose to archive or delete the assets.  

							  </div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="flush-headingTwo">
										<button className="accordion-button collapsed fw-bold text-start" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
											<div className="d-flex">
												<span className="z-index">
													<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-chevron-down text-white" viewBox="0 0 16 16">
														<path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
													</svg>
												</span>
												<span className="ps-3">
													What happens once the campaigns are in my portal? 
									</span>
											</div>
										</button>
									</h2>
									<div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
										<div className="accordion-body">
										Please refer to product specific documentation for next steps. There are certain actions you need to take before turning them on.

							  </div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="flush-heading3">
										<button className="accordion-button collapsed fw-bold text-start" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse3" aria-expanded="false" aria-controls="flush-collapse3">
											<div className="d-flex">
												<span className="z-index">
													<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-chevron-down text-white" viewBox="0 0 16 16">
														<path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
													</svg>
												</span>
												<span className="ps-3">
													How do I reach customer support? 
									</span>
											</div>
										</button>
									</h2>
									<div id="flush-collapse3" className="accordion-collapse collapse" aria-labelledby="flush-heading3" data-bs-parent="#accordionFlushExample">
										<div className="accordion-body">
										Please email us at suppoer@campaignwizard.io. You can also open a support ticket via the chatbot.

							  </div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="flush-heading4">
										<button className="accordion-button collapsed fw-bold text-start" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse4" aria-expanded="false" aria-controls="flush-collapse4">
											<div className="d-flex">
												<span className="z-index">
													<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-chevron-down text-white" viewBox="0 0 16 16">
														<path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
													</svg>
												</span>
												<span className="ps-3">
													Can I use the campaigns in multiple portals?
									</span>
											</div>
										</button>
									</h2>
									<div id="flush-collapse4" className="accordion-collapse collapse" aria-labelledby="flush-heading4" data-bs-parent="#accordionFlushExample">
										<div className="accordion-body">
										Campaigns will only be transferred to the portal that they were purchased in.  
							  </div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="flush-heading5">
										<button className="accordion-button collapsed fw-bold text-start" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse5" aria-expanded="false" aria-controls="flush-collapse5">
											<div className="d-flex">
												<span className="z-index">
													<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-chevron-down text-white" viewBox="0 0 16 16">
														<path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
													</svg>
												</span>
												<span className="ps-3">
													Can I clone these campaigns?
									</span>
											</div>
										</button>
									</h2>
									<div id="flush-collapse5" className="accordion-collapse collapse" aria-labelledby="flush-heading5" data-bs-parent="#accordionFlushExample">
										<div className="accordion-body">
										Yes! We encourage users to re-use these as much as possible. In the product documentation, you’ll find the the necessary steps to clone campaigns

							  </div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="flush-heading7">
										<button className="accordion-button collapsed fw-bold text-start" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse7" aria-expanded="false" aria-controls="flush-collapse7">
											<div className="d-flex">
												<span className="z-index">
													<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-chevron-down text-white" viewBox="0 0 16 16">
														<path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
													</svg>
												</span>
												<span className="ps-3">
													Where is my payment information stored? 
									</span>
											</div>
										</button>
									</h2>
									<div id="flush-collapse7" className="accordion-collapse collapse" aria-labelledby="flush-heading7" data-bs-parent="#accordionFlushExample">
										<div className="accordion-body">
										All payment information is encrypted and securely stored through Stripe. We don’t have access to any customer data.


							  </div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="flush-heading8">
										<button className="accordion-button collapsed fw-bold text-start" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse8" aria-expanded="false" aria-controls="flush-collapse8">
											<div className="d-flex">
												<span className="z-index">
													<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-chevron-down text-white" viewBox="0 0 16 16">
														<path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
													</svg>
												</span>
												<span className="ps-3">
													How do I access or change my payment information? 
									</span>
											</div>
										</button>
									</h2>
									<div id="flush-collapse8" className="accordion-collapse collapse" aria-labelledby="flush-heading8" data-bs-parent="#accordionFlushExample">
										<div className="accordion-body">
										You can checkout as a guest or create a Stripe account for faster future purchases

							  </div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
					<div className="modal fade" id="modal3" aria-hidden="true" aria-labelledby="..." tabindex="-1">
						<div className="modal-dialog modal-dialog-centered">
							<div className="modal-content">
								<div className="row">
									<div className="text-end modal-button1">
										<button type="button" className="btn-close text-white p-3 ind-4-sec-page-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div className="embed-responsive embed-responsive-16by9">
										<iframe className="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
									</div>

								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}

export default Faqs
