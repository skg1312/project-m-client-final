import React, { useRef } from 'react';
import './AdminViewandEditInvoice.css';
import QRCode from 'qrcode.react';
import { useReactToPrint } from 'react-to-print';

function AdminViewandEditInvoice() {
	const qrCodeValue = 'url of invoice pdf file';

	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<div>
			<div className='invoice-container' ref={componentRef}>
				<div className='invoice-container-first'>
					<div className='invoice-container-first-left'>
						<p className='invoice-container-first-left-companyname'>
							Mahaveer Trading Company
						</p>
						<p className='invoice-container-first-left-companyaddress'>
							Ground Floor,Shop No 67,Padmawati NagarB. Bhadarna,JAIPUR -
							302013,RAJASTHAN
						</p>
						<p className='invoice-container-first-left-companydetails'>
							<span className='span'> GSTIN :</span> 08PLLPS828IQIZG
							<br />
							<span className='span'>State : </span>Rajasthan
							<span className='span'> State Code :</span>08
						</p>
					</div>
					<div className='invoice-container-first-right'>
						<p className='invoice-container-first-right-taxinvoice'>
							TAX INOVICE
						</p>
						<div className='invoice-container-first-right-qr'>
							<QRCode value={qrCodeValue} size={100} fgColor='#000' />
						</div>
					</div>
				</div>
				<div className='invoice-container-first-left-hr-div'>
					<hr className='invoice-container-first-left-hr' />
					<hr className='invoice-container-first-right-hr' />
				</div>
				<div className='invoice-container-second'>
					<div className='invoice-container-second-left'>
						<div className='invoice-container-first-left'>
							<p className='invoice-container-first-left-companyname'>Seller</p>
							<p className='invoice-container-first-left-companyaddress'>
								Ground Floor,Shop No 67,Padmawati NagarB. Bhadarna,JAIPUR -
								302013,RAJASTHAN
							</p>
							<p className='invoice-container-first-left-companydetails'>
								<span className='span'> GSTIN :</span> 08PLLPS828IQIZG
								<br />
								<span className='span'>State : </span>Rajasthan
								<span className='span'> State Code :</span>08
							</p>
						</div>
						<hr className='invoice-container-second-left-hr' />
						<div className='invoice-container-first-left'>
							<p className='invoice-container-first-left-companyname'>Buyer</p>
							<p className='invoice-container-first-left-companyaddress'>
								Ground Floor,Shop No 67,Padmawati NagarB. Bhadarna,JAIPUR -
								302013,RAJASTHAN
							</p>
							<p className='invoice-container-first-left-companydetails'>
								<span className='span'> GSTIN :</span> 08PLLPS828IQIZG
								<br />
								<span className='span'>State : </span>Rajasthan
								<span className='span'> State Code :</span>08
							</p>
						</div>
						<hr className='invoice-container-second-left-hr' />
						<div className='invoice-container-first-left'>
							<p className='invoice-container-first-left-companydetails'>
								<span className='span'> terms of deilvery</span>
								<br />
								Rajasthan
							</p>
						</div>
					</div>
					<div className='invoice-container-second-right'>
						<div className='invoice-container-second-right-things'>
							<div className='invoice-container-second-right-things-sno'>
								<p className='invoice-container-second-right-invoice'>
									<span className='head'>invoice no</span>
								</p>
							</div>
							<div className='invoice-container-second-right-things-value'>
								<p className='invoice-container-second-right-invoice'>123456</p>
							</div>
						</div>
						<hr className='invoice-container-second-right-hr' />
						<div className='invoice-container-second-right-things'>
							<div className='invoice-container-second-right-things-sno'>
								<p className='invoice-container-second-right-invoice'>
									<span className='head'>e-way no</span>
								</p>
							</div>
							<div className='invoice-container-second-right-things-value'>
								<p className='invoice-container-second-right-invoice'>EBN456</p>
							</div>
						</div>
						<hr className='invoice-container-second-right-hr' />
						<div className='invoice-container-second-right-things'>
							<div className='invoice-container-second-right-things-sno'>
								<p className='invoice-container-second-right-invoice'>
									<span className='head'>dated</span>
								</p>
							</div>
							<div className='invoice-container-second-right-things-value'>
								<p className='invoice-container-second-right-invoice'>
									10-11-2023
								</p>
							</div>
						</div>
						<hr className='invoice-container-second-right-hr' />
						<div className='invoice-container-second-right-things'>
							<div className='invoice-container-second-right-things-sno'>
								<p className='invoice-container-second-right-invoice'>
									<span className='head'>delivery note</span>
								</p>
							</div>
							<div className='invoice-container-second-right-things-value'>
								<p className='invoice-container-second-right-invoice'>DN789</p>
							</div>
						</div>
						<hr className='invoice-container-second-right-hr' />
						<div className='invoice-container-second-right-things'>
							<div className='invoice-container-second-right-things-sno'>
								<p className='invoice-container-second-right-invoice'>
									<span className='head'>mode/terms of payment</span>
								</p>
							</div>
							<div className='invoice-container-second-right-things-value'>
								<p className='invoice-container-second-right-invoice'>--</p>
							</div>
						</div>
						<hr className='invoice-container-second-right-hr' />
						<div className='invoice-container-second-right-things'>
							<div className='invoice-container-second-right-things-sno'>
								<p className='invoice-container-second-right-invoice'>
									<span className='head'>suppilers ref</span>
								</p>
							</div>
							<div className='invoice-container-second-right-things-value'>
								<p className='invoice-container-second-right-invoice'>--</p>
							</div>
						</div>
						<hr className='invoice-container-second-right-hr' />
						<div className='invoice-container-second-right-things'>
							<div className='invoice-container-second-right-things-sno'>
								<p className='invoice-container-second-right-invoice'>
									<span className='head'>other reference(s)</span>
								</p>
							</div>
							<div className='invoice-container-second-right-things-value'>
								<p className='invoice-container-second-right-invoice'>--</p>
							</div>
						</div>
						<hr className='invoice-container-second-right-hr' />
						<div className='invoice-container-second-right-things'>
							<div className='invoice-container-second-right-things-sno'>
								<p className='invoice-container-second-right-invoice'>
									<span className='head'>Dated</span>
								</p>
							</div>
							<div className='invoice-container-second-right-things-value'>
								<p className='invoice-container-second-right-invoice'>
									05-11-2023
								</p>
							</div>
						</div>
						<hr className='invoice-container-second-right-hr' />
						<div className='invoice-container-second-right-things'>
							<div className='invoice-container-second-right-things-sno'>
								<p className='invoice-container-second-right-invoice'>
									<span className='head'>dispatch document no</span>
								</p>
							</div>
							<div className='invoice-container-second-right-things-value'>
								<p className='invoice-container-second-right-invoice'>DDN654</p>
							</div>
						</div>
						<hr className='invoice-container-second-right-hr' />
						<div className='invoice-container-second-right-things'>
							<div className='invoice-container-second-right-things-sno'>
								<p className='invoice-container-second-right-invoice'>
									<span className='head'>delivery note date</span>
								</p>
							</div>
							<div className='invoice-container-second-right-things-value'>
								<p className='invoice-container-second-right-invoice'>
									12-11-2023
								</p>
							</div>
						</div>
						<hr className='invoice-container-second-right-hr' />
						<div className='invoice-container-second-right-things'>
							<div className='invoice-container-second-right-things-sno'>
								<p className='invoice-container-second-right-invoice'>
									<span className='head'>dispatched through</span>
								</p>
							</div>
							<div className='invoice-container-second-right-things-value'>
								<p className='invoice-container-second-right-invoice'>
									Courier
								</p>
							</div>
						</div>
						<hr className='invoice-container-second-right-hr' />
						<div className='invoice-container-second-right-things'>
							<div className='invoice-container-second-right-things-sno'>
								<p className='invoice-container-second-right-invoice'>
									<span className='head'>delivery note</span>
								</p>
							</div>
							<div className='invoice-container-second-right-things-value'>
								<p className='invoice-container-second-right-invoice'>--</p>
							</div>
						</div>
						<hr className='invoice-container-second-right-hr' />
						<div className='invoice-container-second-right-things'>
							<div className='invoice-container-second-right-things-sno'>
								<p className='invoice-container-second-right-invoice'>
									<span className='head'>Destination</span>
								</p>
							</div>
							<div className='invoice-container-second-right-things-value'>
								<p className='invoice-container-second-right-invoice'>RSN</p>
							</div>
						</div>
						<hr className='invoice-container-second-right-hr' />
						<div className='invoice-container-second-right-things'>
							<div className='invoice-container-second-right-things-sno'>
								<p className='invoice-container-second-right-invoice'>
									<span className='head'>BILL LAnding/LR-RR No</span>
								</p>
							</div>
							<div className='invoice-container-second-right-things-value'>
								<p className='invoice-container-second-right-invoice'>
									RND089687
								</p>
							</div>
						</div>
						<hr className='invoice-container-second-right-hr' />
						<div className='invoice-container-second-right-things'>
							<div className='invoice-container-second-right-things-sno'>
								<p className='invoice-container-second-right-invoice'>
									<span className='head'>MOTOR Vehicle number</span>
								</p>
							</div>
							<div className='invoice-container-second-right-things-value'>
								<p className='invoice-container-second-right-invoice'>
									RJBF89A0879
								</p>
							</div>
						</div>
					</div>
				</div>
				<hr className='invoice-container-first-left-hr1' />
				<div className='invoice-container-third'>
					<table className='invoice-container-third-table'>
						<thead className='invoice-container-third-table-head'>
							<tr className='invoice-container-third-table-head-tr'>
								<th className='invoice-container-third-table-head-tr-th'>
									S.No
								</th>
								<th className='invoice-container-third-table-head-tr-th'>
									Description of Goods
								</th>
								<th className='invoice-container-third-table-head-tr-th'>
									HSN/SAC
								</th>
								<th className='invoice-container-third-table-head-tr-th'>
									Quantity
								</th>
								<th className='invoice-container-third-table-head-tr-th'>
									Rate
								</th>
								<th className='invoice-container-third-table-head-tr-th'>
									per
								</th>
								<th className='invoice-container-third-table-head-tr-th'>
									Amount
								</th>
							</tr>
						</thead>
						<hr className='invoice-container-third-table-hr' />
						<tbody className='invoice-container-third-table-body'>
							<tr className='invoice-container-third-table-body-tr'>
								<td className='invoice-container-third-table-body-tr-td'>1</td>
								<td className='invoice-container-third-table-body-tr-td'>
									scrap
								</td>
								<td className='invoice-container-third-table-body-tr-td'>
									1234
								</td>
								<td className='invoice-container-third-table-body-tr-td'>
									100
								</td>
								<td className='invoice-container-third-table-body-tr-td'>18</td>
								<td className='invoice-container-third-table-body-tr-td'>
									100
								</td>
								<td className='invoice-container-third-table-body-tr-td'>
									118
								</td>
							</tr>
							<hr className='invoice-container-third-table-mid-hr' />
							<tr className='invoice-container-third-table-body-tr-last'>
								<td className='invoice-container-third-table-body-tr-td'></td>
								<td className='invoice-container-third-table-body-tr-td'>
									TOTAL
								</td>
								<td className='invoice-container-third-table-body-tr-td'></td>
								<td className='invoice-container-third-table-body-tr-td'></td>
								<td className='invoice-container-third-table-body-tr-td'></td>
								<td className='invoice-container-third-table-body-tr-td'></td>
								<td className='invoice-container-third-table-body-tr-td'>
									118
								</td>
							</tr>
						</tbody>
					</table>
					<hr className='invoice-container-third-table-below-hr' />
					<div className='invoice-container-third-below'>
						<p className='invoice-container-third-below-content'>
							Amount chargeable <span className='style'>(in words)</span>
						</p>
						<p className='invoice-container-third-below-value'>
							One hundred eighteen only
						</p>
					</div>
				</div>
				<hr className='invoice-container-fourth-table-hr-end' />
				<div className='invoice-container-fourth'>
					<table className='invoice-container-fourth-table'>
						<thead className='invoice-container-fourth-table-head'>
							<tr className='invoice-container-fourth-table-head-tr'>
								<th className='invoice-container-fourth-table-head-tr-th'>
									S.No
								</th>
								<th className='invoice-container-fourth-table-head-tr-th'>
									HSN/SAC
								</th>
								<th className='invoice-container-fourth-table-head-tr-th'>
									TAXABLE VALUE
								</th>
								<th className='invoice-container-fourth-table-head-tr-th'>
									RATE
								</th>
								<th className='invoice-container-fourth-table-head-tr-th'>
									AMOUNT
								</th>
								<th className='invoice-container-fourth-table-head-tr-th'>
									TOTAL TAX AMOUNT
								</th>
							</tr>
						</thead>
						<hr className='invoice-container-fourth-table-hr' />
						<tbody className='invoice-container-fourth-table-body'>
							<tr className='invoice-container-fourth-table-body-tr'>
								<td className='invoice-container-fourth-table-body-tr-td'>1</td>
								<td className='invoice-container-fourth-table-body-tr-td'>
									1234
								</td>
								<td className='invoice-container-fourth-table-body-tr-td'>
									100
								</td>
								<td className='invoice-container-fourth-table-body-tr-td'>
									18
								</td>
								<td className='invoice-container-fourth-table-body-tr-td'>
									100
								</td>
								<td className='invoice-container-fourth-table-body-tr-td'>
									118
								</td>
							</tr>
							<hr className='invoice-container-fourth-table-mid-hr' />
							<tr className='invoice-container-fourth-table-body-tr-last'>
								<td className='invoice-container-fourth-table-body-tr-td'></td>
								<td className='invoice-container-fourth-table-body-tr-td'>
									TOTAL
								</td>
								<td className='invoice-container-fourth-table-body-tr-td'></td>
								<td className='invoice-container-fourth-table-body-tr-td'></td>
								<td className='invoice-container-fourth-table-body-tr-td'></td>
								<td className='invoice-container-fourth-table-body-tr-td'>
									118
								</td>
							</tr>
						</tbody>
					</table>
					<hr className='invoice-container-fourth-table-below-hr' />
					<div className='invoice-container-third-below'>
						<p className='invoice-container-third-below-content'>
							Amount chargeable <span className='style'>(in words)</span>
						</p>
						<p className='invoice-container-third-below-value'>
							One hundred eighteen only
						</p>
					</div>
				</div>
				<hr className='invoice-container-fourth-table-hr-end' />
				<div className='invoice-container-fifth'>
					<div className='invoice-container-fifth-left'>
						<p className='invoice-container-fifth-left-content'>disclaimer</p>
						<p className='invoice-container-fifth-left-content-value'>
							WE DECLARED THAT THIS INVOICE SHOWS THE ACTUAL PRICE OF THE GOOD
							DESCRIBED AND THAT ALL PARTICULAR ARE
						</p>
					</div>
					<div className='invoice-container-fifth-right'>
						<p className='invoice-container-fifth-right-content'>
							FOR MAHAVEER TRADING COMPANY
						</p>
						{/* <img src={} alt='sign' /> */}
					</div>
				</div>
				<p className='invoice-container-fifth-end'>
					This is a computer generated invoice.
				</p>
			</div>
			<div>
				<button onClick={handlePrint}>Print Invoice</button>
			</div>
		</div>
	);
}

export default AdminViewandEditInvoice;
