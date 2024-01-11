import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AdminViewInvoice.css';
import axios from 'axios';

const AdminViewInvoice = () => {
	const { id } = useParams();
	const [invoice, setInvoice] = useState([]);

	const API = process.env.REACT_APP_API;

	useEffect(() => {
		axios
			.get(`${API}invoice`)
			.then((response) => {
				setInvoice(response.data);
			})
			.catch((error) => {
				console.error('Error fetching Invoice data:', error);
			});
	}, [API]);

	console.log('invoice', invoice);

	return (
		<div className='invoice'>
			<div id='background'>
				<p id='bg-text'>companyname</p>
			</div>
			<div className='invoice-header'>
				<p
					style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}
				>
					TAX INVOICE
				</p>
				<div className='logo'>
					<img src='<%= logoPath %>' alt='Logo' />
				</div>
				<div className='comAddress'>
					<p className='companyname'>companyname</p>
					<br />
					<p className='companyname1'>
						companyofficeaddress
						<br />
						GSTIIN/UN : companygstno <br />
						State Name : companystate
					</p>
				</div>

				<div className='left'>
					<b>Invoice No</b>: invoiceno &nbsp;
				</div>
				<div className='right'>
					<b>Date</b>: invoicedate &nbsp;
				</div>
				<div className='qr'>
					<img src='<%= imagePath %>' alt='' />
				</div>
			</div>
			<br />
			<div>
				<div>
					<p className='alignleft'>
						<b>Consignee</b> <br />
						sellercompanyname <br />
						sellercompanyaddress <br />
						GSTIN/UIN : sellercompanygstno
						<br />
						State Name : sellercompanystatename, Code : sellercompanystatecode
						<br />
					</p>
				</div>

				<div>
					<p className='alignright'>
						<b>BUYER</b> (if other than Consignee)
						<br />
						buyercompanyname <br />
						buyercompanyaddress <br />
						GSTIN/UIN : buyercompanygstno <br />
						State Name : buyercompanystatename, Code : buyercompanystatecode
					</p>
				</div>
			</div>
			<div className='line-text'>
				<b>Vehicle Number :</b>vechiclenumber &nbsp;&nbsp;
				<b> Driver Number: </b>drivernumber &nbsp;&nbsp;
				<b>Load From </b> : startpoint&nbsp;&nbsp;
				<b>Ref.</b> : partyref
			</div>

			<table
				className='table01'
				style={{ fontSize: '10px', border: '1px solid black' }}
			>
				<thead>
					<tr>
						<th>S/N</th>
						<th>DESCRIPTION OF GOODS</th>
						<th>HSN/SAC</th>
						<th>QUANTITY(Kgs.)</th>
						<th>PRICE(Per Kg)</th>
						<th>AMOUNT</th>
					</tr>
				</thead>
				<tbody>
					{/* <% var interStateTax =
          (invoiceData.sellerdetails.sellercompanystatecode ==
          invoiceData.buyerdetails.buyercompanystatecode) ? false : true; %> <%
          var itemQuantitySum = 0; %> <% var itemAmountSum = 0; %> <% var
          itemTaxSum = 0; %> <% var itemAmount = 0; %> <% if
          (invoiceData.consignmentdetails.itemdetails.length > 0) { %> <%
          invoiceData.consignmentdetails.itemdetails.forEach((item, index) => {
          %> <% itemQuantitySum += item.itemquantity %> <% itemAmount =
          (item.itemprice * item.itemquantity) %> <% itemAmountSum += itemAmount
          %> <% itemTaxSum += ((18/100 * itemAmount)) %> */}
					<tr>
						<td>index+1</td>
						<td>itemname</td>
						<td>itemhsn</td>
						<td>itemquantity</td>
						<td>itemprice</td>
						<td>commaNumber((itemAmount).toFixed(2))</td>
					</tr>
					{/* <% }); %> <% } %> */}

					<tr className='gst' style={{ borderTop: '1px solid #000' }}>
						<td></td>
						<td>CGST</td>
						<td></td>
						<td></td>
						<td></td>
						{/* <% if(interStateTax == true){ %>
            <td>-</td>
            <% } else { %> */}
						<td>commaNumber((itemTaxSum/2).toFixed(2))</td>
						{/* <% } %> */}
					</tr>
					<tr>
						<td></td>
						<td>SGST</td>
						<td></td>
						<td></td>
						<td></td>
						{/* <% if(interStateTax == true){ %>
            <td>-</td>
            <% } else { %> */}
						<td>commaNumber((itemTaxSum/2).toFixed(2))</td>
						{/* <% } %> */}
					</tr>
					<tr className='igst'>
						<td></td>
						<td>IGST</td>
						<td></td>
						<td></td>
						<td></td>
						{/* <% if(interStateTax == true){ %> */}
						<td>commaNumber((itemTaxSum).toFixed(2))</td>
						{/* <% } else { %>
            <td>-</td>
            <% } %> */}
					</tr>

					<tr>
						<td></td>
						<td>TOTAL</td>
						<td></td>
						<td>itemQuantitySum</td>
						<td></td>
						<td>commaNumber((itemAmountSum + itemTaxSum).toFixed(2))</td>
					</tr>
					<br />
					<tr>
						<td colspan='2'>AMOUNT CHARGEABLE (IN WORDS)</td>
						<td colspan='4'>
							(toWords.convert(itemAmountSum + itemTaxSum)).toUpperCase()
						</td>
					</tr>
				</tbody>
			</table>

			<table
				className='table2'
				style={{ fontSize: '10px', border: '1px solid black' }}
			>
				<thead>
					<tr>
						<th>S/N</th>
						<th>HSN/SAC</th>
						<th>TAXABLE VALUE</th>
						<th colspan='6'>TAX CALCULATION</th>
						<th>AMOUNT</th>
					</tr>
					<tr>
						<th></th>
						<th></th>
						<th></th>
						<th colspan='2' style={{ textAlign: 'center' }}>
							CGST
						</th>
						<th colspan='2' style={{ textAlign: 'center' }}>
							SGST
						</th>
						<th colspan='2' style={{ textAlign: 'center' }}>
							IGST
						</th>
						<th></th>
					</tr>
					<tr>
						<th></th>
						<th></th>
						<th></th>
						<th>RATE</th>
						<th>AMOUNT</th>
						<th>RATE</th>
						<th>AMOUNT</th>
						<th>RATE</th>
						<th>AMOUNT</th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{/* <% if (invoiceData.consignmentdetails.itemdetails.length > 0) { %> <%
          invoiceData.consignmentdetails.itemdetails.forEach((item, index) => {
          %> */}
					<tr>
						<td>index+1</td>
						<td>itemhsn</td>
						<td>
							commaNumber((item.itemprice * item.itemquantity).toFixed(2))
						</td>

						{/* <% if(interStateTax == true){ %> */}
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>18%</td>
						<td>
							commaNumber((18/100 * (item.itemprice*
							item.itemquantity)).toFixed(2))
						</td>
						{/* <% } else { %> */}
						<td>9%</td>
						<td>
							commaNumber((9/100 * (item.itemprice*
							item.itemquantity)).toFixed(2))
						</td>
						<td>9%</td>
						<td>
							commaNumber((9/100 * (item.itemprice*
							item.itemquantity)).toFixed(2))
						</td>
						<td>-</td>
						<td>-</td>
						{/* <% } %> */}

						<td>
							commaNumber((18/100 * (item.itemprice*
							item.itemquantity)).toFixed(2))
						</td>
					</tr>
					{/* <% }); %> <% } %> */}
					<br />
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td>TOTAL</td>
						<td>commaNumber(itemTaxSum.toFixed(2))</td>
					</tr>
					<br />
					<tr>
						<td colspan='3'>AMOUNT CHARGEABLE(IN WORDS)</td>
						<td colspan='7'>(toWords.convert(itemTaxSum)).toUpperCase()</td>
					</tr>
				</tbody>
			</table>
			<div className='additional-charges'>
				<p style={{ textDecorationLine: 'underline' }}>
					<b>DISCLAIMER</b>
				</p>
				<p
					style={{
						textDecorationLine: 'underline',
						textAlign: 'right',
						marginTop: '-5%',
					}}
				>
					<b> FOR companyname</b>
				</p>
				<div class='bottomleft'>
					<p class='disfont'>
						WE DECLARED THAT THIS INVOICE SHOWS THE ACTUAL PRICE <br />
						OF THE GOOD DESCRIBED AND THAT ALL PARTICULAR ARE
					</p>
					<b></b>
				</div>

				<div className='bottomright'>
					<p>Authorized Signature</p>
					{/* <!--  <p><%= invoiceData.companydetails.companyname %></p> --> */}
				</div>
				<div className='center'>
					<p>This is a computer generated invoice</p>
				</div>
			</div>
		</div>
	);
};

export default AdminViewInvoice;
