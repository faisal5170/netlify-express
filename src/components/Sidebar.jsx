/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { NavLink } from "react-router-dom";
const Sidebar = () => {
    return (
        <>
        <div className="side-navbar active-nav pt-3" id="sidebar">
		<div className="sidebar-logo">
			<a href="#" className="nav-link text-white p-3">
				<svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" fill="currentColor" className="bi bi-file-word-fill" viewBox="0 0 16 16">
					<path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5.485 4.879l1.036 4.144.997-3.655a.5.5 0 0 1 .964 0l.997 3.655 1.036-4.144a.5.5 0 0 1 .97.242l-1.5 6a.5.5 0 0 1-.967.01L8 7.402l-1.018 3.73a.5.5 0 0 1-.967-.01l-1.5-6a.5.5 0 1 1 .97-.242z"/>
				</svg>
				Campaign Wizard
			</a>
		</div>
		<ul className="nav flex-column">
			<li className="nav-item">
				<NavLink className="nav-link text-white p-3 active" to="/campaign">
					
					Campaigns
				</NavLink>
			</li>
			<li className="nav-item">
				<NavLink className="nav-link text-white p-3" to="/faqs">
					
					FAQs
				</NavLink>
			</li>
			<li className="nav-item">
				<NavLink className="nav-link text-white p-3" to="/history">
				
					History
				</NavLink>
			</li>
			<li className="nav-item">
				<NavLink className="nav-link text-white p-3" to="/price">
					
					Pricing
				</NavLink>
			</li>
		</ul>
		<div className="campaign-wizard-setting">
			<a className="nav-link text-white p-3" href="index6.html">
			
				Setting
			</a>
		</div>
		<div className="campaign-copyright sidebar-copyright">
			<p className="text-white p-4 p-md-1 text-ind-copy-right ">
				&copy; 2021 Campaign Wizard. <br/>All Right Reserved.<a href="#" className="text-white text-decoration-underline">Privacy Policy</a>
			</p>
		</div>
	</div>  
        </>
    )
}

export default Sidebar
