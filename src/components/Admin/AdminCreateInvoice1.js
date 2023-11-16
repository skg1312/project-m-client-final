import React from 'react'
import './AdminCreateInvoice.css';
import background from '../images/Desktop.png'
import A from '../images/A.png';
import D from '../images/D.png';
import E from '../images/E.png';
function AdminCreateInvoice() {
  return (
    <div
    style={{
      backgroundImage: `url(${background})`,
      minHeight: '100vh',
    }}
    >
      <h1 className='admin-create-invoice-title'>CREATE INVOICE</h1>
      <div className='admin-create-invoice-container'>
        <div className='admin-create-invoice-data'>
      <h2 className='admin-create-invoice-subtitle'>COMPANY DETAILS</h2>
      <select className='admin-create-invoice-select'>
        <option value="volvo">Company1</option>
        <option value="saab">Company2</option>
      </select>
      </div>
      <form className='admin-create-invoice-form'>
      <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Company Id</label>
        <br />
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Company Name</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Company Registration type</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Company GST No.</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Company Contact</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Company country</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Company State</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Company Office Address</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Company  pincode</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        </form>
        <div className='admin-create-invoice-data'>
      <h2 className='admin-create-invoice-subtitle'>SELLER DETAILS</h2>
      <select className='admin-create-invoice-select'>
        <option value="volvo">Seller1</option>
        <option value="saab">Seller2</option>
      </select>
      </div>
      <form className='admin-create-invoice-form'>
      <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Seller Id</label>
        <br />
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Seller Company Name</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Seller Company GST No.</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Seller Company Address</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Seller Company State Name</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Seller Company State Code</label>    
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        </form>
        <div className='admin-create-invoice-data'>
      <h2 className='admin-create-invoice-subtitle'>BUYER DETAILS</h2>
      <select className='admin-create-invoice-select'>
        <option value="volvo">Buyer1</option>
        <option value="saab">Buyer2</option>
      </select>
      </div>
      <form className='admin-create-invoice-form'>
      <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Buyer Id</label>
        <br />
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Buyer Company Name</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Buyer Company GST No.</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Buyer Company Address</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Buyer Company State Name</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Buyer Company State Code</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        </form>
        <div className='admin-create-invoice-data'>
      <h2 className='admin-create-invoice-subtitle'>VECHICLE DETAILS</h2>
      <select className='admin-create-invoice-select'>
        <option value="volvo">Vechicle1</option>
        <option value="saab">Vechicle2</option>
      </select>
      </div>
      <form className='admin-create-invoice-form'>
      <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Vechicle ID</label>
        <br />
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Driver Name</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Driver Number</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Driver Address</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Driver Id Proof</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Driver License No.</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Vechicle Number</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Vechicle Model</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Vechicle office branch</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        </form>
        <div className='admin-create-invoice-data'>
      <h2 className='admin-create-invoice-subtitle'>CONSIGNMENT DETAILS</h2>
      <select className='admin-create-invoice-select'>
        <option value="volvo">Item1</option>
        <option value="saab">Item2</option>
      </select>
      </div>
      <table className='admin-create-invoice-table-consigment'>
        <tr className='admin-create-invoice-table-row-head'>
          <th className='admin-create-invoice-table-row-th'>ITEM NAME</th>
          <th className='admin-create-invoice-table-row-th'>ITEM QUANTITY</th>
          <th className='admin-create-invoice-table-row-th'>ITEM HSN</th>
          <th className='admin-create-invoice-table-row-th'>ITEM PRICE</th>
          <th className='admin-create-invoice-table-row-th'>ITEM TAX RATE</th>
          <th className='admin-create-invoice-table-row-th'>ACTION</th>
        </tr>
        <br />
        <tr className='admin-create-invoice-table-row-body'>
          <td><input className='admin-create-invoice-table-consigment-input' type="text"/></td>
          <td><input className='admin-create-invoice-table-consigment-input' type="number"/></td>
          <td><input className='admin-create-invoice-table-consigment-input' type="text"/></td>
          <td><input className='admin-create-invoice-table-consigment-input' type="number"/></td>
          <td><input className='admin-create-invoice-table-consigment-input' type="text"/></td>
          <td>
            <button className='admin-create-invoice-table-consigment-button'>
            <img className='admin-create-invoice-table-consigment-icon' src={A} alt='add'/>
            </button>
          </td>
        </tr>
        <br />
        <tr className='admin-create-invoice-table-row-body'>
          <td className='admin-create-invoice-table-consigment-value'>srcap</td>
          <td className='admin-create-invoice-table-consigment-value'>450</td>
          <td className='admin-create-invoice-table-consigment-value'>087099</td>
          <td className='admin-create-invoice-table-consigment-value'>907980</td>
          <td className='admin-create-invoice-table-consigment-value'>18</td>
          <td>
          <button className='admin-create-invoice-table-consigment-button'>
            <img className='admin-create-invoice-table-consigment-icon-low' src={E} alt='edit'/>
            </button>
            <button className='admin-create-invoice-table-consigment-button'>
            <img className='admin-create-invoice-table-consigment-icon-low' src={D} alt='delete'/>
            </button>
          </td>
        </tr>
      </table>
      <div className='admin-create-invoice-data'>
      <h2 className='admin-create-invoice-subtitle'>INVOICE DETAILS</h2>
      </div>
      <form className='admin-create-invoice-form'>
      <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Invoice No.</label>
        <br />
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Invoice Date</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>E Way Bill No</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Delivery Note</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Supplier Ref.</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Other Ref.</label>
        <br />
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Buyer's Order No.</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Buyer's Order Date</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Dispatch Document No.</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Delivery Note Date</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Dispatch Through</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Destination</label>
        <br />
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Terms and Conditions</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        </form>
        <div className='admin-create-invoice-data'>
      <h2 className='admin-create-invoice-subtitle'>BOARDING DETAILS</h2>
      </div>
      <form className='admin-create-invoice-form'>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Weight of Load</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Transportation Cost</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Total Transportation Cost</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Date of Loading</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Starting Point</label>
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'>Ending Point</label>
        <br />
        <input className='admin-create-invoice-form-input' type="text"/>
        </div>
        </form>
        <div className='admin-create-invoice-data-submit'>
      <button className='admin-create-invoice-button'>CREATE INVOICE</button>
    </div>
    </div>
    </div>
  )
}

export default AdminCreateInvoice