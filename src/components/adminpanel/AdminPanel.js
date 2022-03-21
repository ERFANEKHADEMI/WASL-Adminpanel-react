import React, { Component } from 'react';
import "./AdminPanel.css";
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getvehicles , getRequests , getRentles, getLocations } from '../../redux/actions/postActions';


var modal;
var span;
class AdminPanel extends Component {
 	
 	constructor(props) {
 		super(props);

 		this.tab = this.tab.bind(this);
 		this.EditRequest = this.EditRequest.bind(this);
 		this.Update = this.Update.bind(this);
 		this.sidebarShow = this.sidebarShow.bind(this);

 		this.state = {
 			currentrequestId: "",
 			currentsidebarwaslstatus: 0,
 		}
 	}
 	componentWillMount() {
 		this.props.getvehicles();
 		this.props.getRequests();
 		this.props.getRentles();
 		this.props.getLocations();
 	}

 	sidebarShow() {
 		var sidebarChildrens = document.getElementsByClassName("sidebar_p_c");
 		if(this.state.currentsidebarwaslstatus == 0) {
 			for (var i = 0 ; i < sidebarChildrens.length; i++) {
 				sidebarChildrens[i].setAttribute("style", "display: block");
 			}
 			this.setState({
 				currentsidebarwaslstatus: 1,
 			});
 		}
 		else {
 			for (var i = 0 ; i < sidebarChildrens.length; i++) {
 				sidebarChildrens[i].setAttribute("style", "display: none");
 			}
 			this.setState({
 				currentsidebarwaslstatus: 0,
 			});	
 		}
 	}

 	Update() {
 		modal.style.display = "none";
 		var formdata = {};
 		var flag = document.getElementById("permission").value;
 		formdata.id = this.state.currentrequestId;
 		formdata.value = flag;

 		axios.post("http://localhost:8000/api/userpermission", {formdata})
 		.then(res=>{
 			this.props.getvehicles();
 			this.props.getRequests();
 		})
 		.catch(err=>{
 			alert("failed");
 		})
 	}

 	EditRequest(flag) {
 		this.setState({
 			currentrequestId: flag,
 		})
 		modal = document.getElementById("myModal1");
 		modal.style.display = "block";
 		var span1 = document.getElementById("close1");
 		span1.onclick = function() {
 			modal.style.display = "none";
 		}
 		window.onclick = function(event) {
 			if (event.target == modal) {
 				modal.style.display = "none";
 			}
 		}
 	}
 	tab(flag) {
 		for(var i = 1 ; i <= 4 ; i++ )
 			document.getElementById("tab" + i ).setAttribute("style", "display: none");
 		document.getElementById("tab" + flag).setAttribute("style","display: block");
 	}

	render() {
		var result = Object.values(this.props.vehicles);
		const carItems = result.map(car => (
				<tr>
					<td>{car.ownerIdNum}</td>
					<td>{car.ownerbirthhij}</td>
					<td>{car.ownerbirthgre}</td>
					<td>{car.seqnum}</td>
					<td>{car.rplateletter},{car.mplateletter},{car.lplateletter}</td>
					<td>{car.platenum}</td>
					<td>{car.platetype}</td>
					<td>{car.currentlessor}</td>
					<td>{car.status}</td>
				</tr>
			));
		const style = `
			font-size: "18px",
		`
		var result1 = Object.values(this.props.requests);
		const requestItems = result1.map(request => (
				<tr>
					<td>{request.userid}</td>
					<td>{request.carid}</td>
					<td>{request.status}</td>
					<td>
						<button style={{backgroundColor:"#283142", color: "white", padding:"5px 10px 5px 10px", borderRadius:"5px", boxShadow:"0px 3px 6px 0px rgba(0, 0, 0, 0.4)"}} onClick={()=>{this.EditRequest(request.id)}}> 
							Edit 
						</button>
					</td>
				</tr>
			));
		var result2 = Object.values(this.props.rentles);
		const rentleItems = result2.map(rentle => (
			<tr>
				<td>{rentle.seqnum}</td>
				<td style={{width:"120px"}}>{rentle.comproperid}</td>
				<td>{rentle.pickuplatitude}</td>
				<td>{rentle.pickuplongitude}</td>
				<td>{rentle.dropofflatitude}</td>
				<td>{rentle.dropofflongitude}</td>
				<td style={{width:"90px"}}>{rentle.pickuptimestamp}</td>
				<td style={{width:"90px"}}>{rentle.dropofftimestamp}</td>
				<td>{rentle.rentalperiodmins}</td>
				<td>{rentle.customervehiclerating}</td>
				<td>{rentle.customerservicerating}</td>
			</tr>
			))

		const result3 = Object.values(this.props.locations);
		const locationItems = result3.map(location => (
			<tr>
				<td>{location.vehicleseqnum}</td>
				<td>{location.latitude}</td>
				<td>{location.longitude}</td>
				<td>{location.updatewhen}</td>
				<td>{location.hascustomer}</td>
				<td>{location.cuslocation}</td>
			</tr>
			))

		return (
			<div className="body" id="body">
				<div className="header">
					<img src="logo.png" className="logo_p" alt="none" />
				</div>
				<div className="content">
					<div className="sidebar">
						<p className="sidebar_p" onClick={()=>this.sidebarShow()}>
							WASL SERVICES
						</p>
						<p className="sidebar_p sidebar_p_c" onClick={()=>{this.tab(1)}}>
							Vehicle Register
						</p>
						<p className="sidebar_p sidebar_p_c" onClick={()=>{this.tab(2)}}>
							Vehicle Eligibility
						</p>
						<p className="sidebar_p sidebar_p_c" onClick={()=>{this.tab(3)}}>
							Rental Register
						</p>
						<p className="sidebar_p sidebar_p_c" onClick={()=>{this.tab(4)}}>
							Update Location
						</p>
					</div>
					<div className="view_div" id="tab1">
						<p className="table_title">Vehicles</p>
						<div className="table_div"> 
							<table>
							    <thead>
							        <tr>
							            <th>OwnerIdentify<br />Number</th>
							            <th>OwnerDateOf<br />BirthHijri</th>
							            <th>OwnerDateOf<br />BirthGregorian</th>
							            <th>Sequence<br />Number</th>
							            <th>Plate<br />Letters</th>
							            <th>Plate<br />Number</th>
							            <th>Plate<br />Type</th>
							            <th>Current<br />Lessor</th>
							            <th>Status</th>
							        </tr>
							    </thead>
							    
							    { carItems }
							    
							</table>
						</div>
					</div>
					<div className="view_div" id="tab2">
						<h3>Vehicle Eligibility</h3>
						<table>
						    <thead>
						        <tr>
						            <th>UserId</th>
						            <th>Car_Id</th>
						            <th>Status</th>
						            <th>Edit</th>
						        </tr>
						    </thead>
						    
						    { requestItems }
						    
						</table>
						
					</div>
					<div className="view_div" id="tab3">
						<h3>Rental Operation Register</h3>
						<div className="table_div"> 
							<table>
							    <thead>
							        <tr>
							            <th>Sequence<br />Number</th>
							            <th>Rental Operation<br /> Id</th>
							            <th>Pickup<br />Latitude</th>
							            <th>Pickup<br />Longitude</th>
							            <th>DropOff<br />Latitude</th>
							            <th>DropOff<br />Longitude</th>
							            <th>Pickup<br />TimeStamp</th>
							            <th>DropOff<br />TimeStamp</th>
							            <th>VehicleOccu-<br />-pationPeriod</th>
							            <th>Customer<br />VehicleRating</th>
							            <th>Customer<br />ServiceRating</th>
							        </tr>
							    </thead>
							     {rentleItems}
							</table>
						</div>
					</div>
					<div className="view_div" id="tab4">
						<h3>Update Current Location</h3>
						<div className="table_div"> 
							<table>
							    <thead>
							        <tr>
							            <th>VehicleSeq-<br />-uenceNumber</th>
							            <th>Latitude</th>
							            <th>Longitude</th>
							            <th>UpdatedTime</th>
							            <th>HasCustomer</th>
							            <th>Current<br />Location</th>
							        </tr>
							    </thead>
							    { locationItems }				    
							</table>
						</div>
					</div>
				</div>
			</div>
	    )
  }
}

AdminPanel.propTypes = {
	getvehicles: PropTypes.func.isRequired,
	getRentles: PropTypes.func.isRequired,
	getRequests: PropTypes.func.isRequired,
	getLocations: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	vehicles: state.posts.vehicles,
	requests: state.posts.requests,
	rentles: state.posts.rentles,
	locations: state.posts.locations,
})

export default connect(mapStateToProps, {getvehicles, getRequests , getRentles , getLocations })(AdminPanel);