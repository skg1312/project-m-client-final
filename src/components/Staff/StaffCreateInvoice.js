import React,{useEffect,useState} from 'react'
import './StaffCreateInvoice.css';
import background from '../images/Desktop.png'
import A from '../images/A.png';
import D from '../images/D.png';
import E from '../images/E.png';
import StaffNavbar from './StaffNavbar';


const StaffCreateInvoice = () => {

    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState({});

    const [sellers, setSellers] = useState([]);
    const [selectedSeller, setSelectedSeller] = useState({});

    const [buyers, setBuyers] = useState([]);
    const [selectedBuyer, setSelectedBuyer] = useState({});

    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState({});

    const [consignments, setConsignments] = useState([]);
    const [selectedConsignment, setSelectedConsignment] = useState({});

    const [dataToSend, setDataToSend] = useState({
        companydetails: {
          companyid: '',
          companyname: '',
          companyregistrationtype: '',
          companygstno: '',
          companycontact: '',
          companycountry: '',
          companystate: '',
          companyofficeaddress: '',
          companypincode: '',
        },
        sellerdetails: {
          sellerid: '',
          sellercompanyname: '',
          sellercompanygstno: '',
          sellercompanyaddress: '',
          sellercompanystatename: '',
          sellercompanystatecode: '',
        },
        buyerdetails: {
          buyerid: '',
          buyercompanyname: '',
          buyercompanygstno: '',
          buyercompanyaddress: '',
          buyercompanystatename: '',
          buyercompanystatecode: '',
        },
        vehicledetails: {
            vehicleid: '',
            drivername: '',
            drivernumber: '',
            driveraddress: '',
            driveridproof: '',
            driverlicenseno: '',
            vehiclenumber: '',
            vehiclemodel: '',
            vehicleofficebranch: '',
        },
        consignmentdetails: {
            itemdetails: [
              {
                itemname: '',
                itemquantity: 0,
                itemhsn: '',
                itemprice: 0,
                itemtaxrate: '',
              },
            ],
          },
          invoicedetails: {
            invoiceno: '',
            ewaybillno: '',
            invoicedate: '',
            deliverynote: '',
            supplierref: '',
            otherref: '',
            buyersorder: '',
            ordereddate: '',
            dispatchdocumentno: '',
            deliverynotedate: '',
            dispatchthrough: '',
            destination: '',
            termsandcondition: '',
        },
        boardingdetails: {
            weight: 0,
            transportationcost: 0,
            totalcost: 0,
            dateofloading: '',
            startingpoint: '',
            endingpoint: '',
        },

      });

    const API = process.env.REACT_APP_API;

    useEffect(() => {
        const fetchCompanies = async () => {
          try {
            const response = await fetch(`${API}company`);
            if (response.ok) {
              const data = await response.json();
              setCompanies(data);
            } else {
              console.error('Failed to fetch companies data');
            }
          } catch (error) {
            console.error('Error fetching companies data:', error);
          }
        };
      
        fetchCompanies();
      }, [API]);

        useEffect(() => {
            const fetchSellers = async () => {
            try {
                const response = await fetch(`${API}seller`);
                if (response.ok) {
                const data = await response.json();
                setSellers(data);
                }
                else{
                console.error('Failed to fetch sellers data');
                }
            }
            catch (error) {
                console.error('Error fetching sellers data:', error);
            }
        };
        fetchSellers();
        }, [API]);

        useEffect(() => {
            const fetchBuyers = async () => {
            try {
                const response = await fetch(`${API}buyer`);
                if (response.ok) {
                const data = await response.json();
                setBuyers(data);
                }
                else{
                console.error('Failed to fetch buyers data');
                }
            }
            catch (error) {
                console.error('Error fetching buyers data:', error);
            }
        };
        fetchBuyers();
        }, [API]);

        useEffect(() => {
            const fetchVehicles = async () => {
            try {
                const response = await fetch(`${API}vechicle`);
                if (response.ok) {
                const data = await response.json();
                setVehicles(data);
                }
                else{
                console.error('Failed to fetch vehicles data');
                }
            }
            catch (error) {
                console.error('Error fetching vehicles data:', error);
            }
        };
        fetchVehicles();
        }, [API]);

        useEffect(() => {
            const fetchConsignments = async () => {
            try {
                const response = await fetch(`${API}consignment`);
                if (response.ok) {
                const data = await response.json();
                setConsignments(data);
                }
                else{
                console.error('Failed to fetch consignments data');
                }
            }
            catch (error) {
                console.error('Error fetching consignments data:', error);
            }
        };
        fetchConsignments();
        }, [API]);

        const handleSelectChangeCompany = (e) => {
            const selectedCompanyId = e.target.value;
            const selectedCompany = companies.find((company) => company._id === selectedCompanyId);

            setDataToSend((prevData) => ({
                ...prevData,
                companydetails: {
                  ...prevData.companydetails,
                  companyid: selectedCompany.companyid,
                  companyname: selectedCompany.companyname,
                  companyregistrationtype: selectedCompany.companyregistrationtype,
                  companygstno: selectedCompany.companygstno,
                  companycontact: selectedCompany.companycontact,
                  companycountry: selectedCompany.companycountry,
                  companystate: selectedCompany.companystate,
                  companyofficeaddress: selectedCompany.companyofficeaddress,
                  companypincode: selectedCompany.companypincode,
                },
                }));
                setSelectedCompany(selectedCompany);
            };

            const handleSelectChangeSeller = (e) => {
                const selectedSellerId = e.target.value;
                const selectedSeller = sellers.find((seller) => seller._id === selectedSellerId);
        
                setDataToSend((prevData) => ({
                  ...prevData,
                  sellerdetails: {
                    ...prevData.sellerdetails,
                    sellerid: selectedSeller.sellerid,
                    sellercompanyname: selectedSeller.sellercompanyname,
                    sellercompanygstno: selectedSeller.sellercompanygstno,
                    sellercompanyaddress: selectedSeller.sellercompanyaddress,
                    sellercompanystatename: selectedSeller.sellercompanystatename,
                    sellercompanystatecode: selectedSeller.sellercompanystatecode,
                  },
                }));
                setSelectedSeller(selectedSeller);
              };

                const handleSelectChangeBuyer = (e) => {
                    const selectedBuyerId = e.target.value;
                    const selectedBuyer = buyers.find((buyer) => buyer._id === selectedBuyerId);
            
                    setDataToSend((prevData) => ({
                      ...prevData,
                      buyerdetails: {
                        ...prevData.buyerdetails,
                        buyerid: selectedBuyer.buyerid,
                        buyercompanyname: selectedBuyer.buyercompanyname,
                        buyercompanygstno: selectedBuyer.buyercompanygstno,
                        buyercompanyaddress: selectedBuyer.buyercompanyaddress,
                        buyercompanystatename: selectedBuyer.buyercompanystatename,
                        buyercompanystatecode: selectedBuyer.buyercompanystatecode,
                      },
                    }));
                    setSelectedBuyer(selectedBuyer);
                  };

                    const handleSelectChangeVehicle = (e) => {
                        const selectedVehicleId = e.target.value;
                        const selectedVehicle = vehicles.find((vehicle) => vehicle._id === selectedVehicleId);
                
                        setDataToSend((prevData) => ({
                          ...prevData,
                          vehicledetails: {
                            ...prevData.vehicledetails,
                            vehicleid: selectedVehicle.vehicleid,                    
                            drivername: selectedVehicle.drivername,
                            drivernumber: selectedVehicle.drivernumber,
                            driveraddress: selectedVehicle.driveraddress,
                            driveridproof: selectedVehicle.driveridproof,
                            driverlicenseno: selectedVehicle.driverlicenseno,
                            vehiclenumber: selectedVehicle.vehiclenumber,
                            vehiclemodel: selectedVehicle.vehiclemodel,
                            vehicleofficebranch: selectedVehicle.vehicleofficebranch,
                          },
                        }));
                        setSelectedVehicle(selectedVehicle);
                      };
                        const handleSelectChangeConsignment = (e) => {
                            const selectedConsignmentId = e.target.value;
                            const selectedConsignment = consignments.find((consignment) => consignment._id === selectedConsignmentId);
                    
                            setDataToSend((prevData) => ({
                              ...prevData,
                              consignmentdetails: {
                                ...prevData.consignmentdetails,
                                itemname: selectedConsignment.itemname,
                                itemquantity: selectedConsignment.itemquantity,
                                itemhsn: selectedConsignment.itemhsn,
                                itemprice: selectedConsignment.itemprice,
                                itemtaxrate: selectedConsignment.itemtaxrate,

                              },
                            }));

                            setSelectedConsignment(selectedConsignment);
                          };
                          
            const handleChange = (e, section, field) => {
                const value = e.target.value;
                setDataToSend((prevData) => ({
                  ...prevData,
                  [section]: {
                    ...prevData[section],
                    [field]: value,
                  },
                }));
            }
            const ConsignmentsAdd = () => {
                setDataToSend((prevData) => ({
                    ...prevData,
                    consignmentdetails: {
                        ...prevData.consignmentdetails,
                        itemdetails: [
                            ...prevData.consignmentdetails.itemdetails,
                            {
                                itemname: '',
                                itemquantity: 0,
                                itemhsn: '',
                                itemprice: 0,
                                itemtaxrate: '',
                            },
                        ],
                    },
                }));
            };
            const ConsignmentsRemove = (index) => {
                setDataToSend((prevData) => ({
                    ...prevData,
                    consignmentdetails: {
                        ...prevData.consignmentdetails,
                        itemdetails: prevData.consignmentdetails.itemdetails.filter((item, i) => i !== index),
                    },
                }));
            };

            const handleConsignmentChange = (e, index, field) => {
                const value = e.target.value;
                setDataToSend((prevData) => ({
                    ...prevData,
                    consignmentdetails: {
                        ...prevData.consignmentdetails,
                        itemdetails: prevData.consignmentdetails.itemdetails.map((item, i) => {
                            if (i === index) {
                                return {
                                    ...item,
                                    [field]: value,
                                };
                            }
                            return item;
                        }),
                    },
                }));
            };


            const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                  const response = await fetch(`${API}invoice`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                  });
                  if (response.ok) {
                    const data = await response.json();
                    console.log('Invoice created successfully:', data);
                  } else {
                    console.error('Invoice creation failed');
                  }
                } catch (error) {
                  console.error('Error creating invoice:', error);
                }
              }
    return (
        <div 
        style={{
            backgroundImage: `url(${background})`,
            minHeight: '100vh',
        }}
        >
          <StaffNavbar/>
            <form onSubmit={handleSubmit}>
            <h1 className='staff-create-invoice-title'>CREATE INVOICE</h1>
            <div className='staff-create-invoice-container'>
        <div className='staff-create-invoice-data'>
      <h2 className='staff-create-invoice-subtitle'>COMPANY DETAILS</h2>
      <select className='staff-create-invoice-select' 
      id="companyid"
      name='companyid'
      value={selectedCompany.companyid}
        onChange={handleSelectChangeCompany}
      >
        <option value="">Select Company ID</option>
        {companies.map((company) => (
            <option key={company._id} value={company._id}>
                {company.companyname}
            </option>
        ))}
      </select>
      </div>
      <form className='staff-create-invoice-form'>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Company Name</label>
        <input className='staff-create-invoice-form-input'
         type="text"
         id="companyname"
            name='companyname'
            value={selectedCompany.companyname}
            onChange={(e) => handleChange(e, "companydetails", "companyname")}
         />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Company Registration type</label>
        <input className='staff-create-invoice-form-input' 
        type="text"
        id="companyregistrationtype"
            name='companyregistrationtype'
            value={selectedCompany.companyregistrationtype}
            onChange={(e) => handleChange(e, "companydetails", "companyregistrationtype")}
        
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Company GST No.</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='companygstno'
        name='companygstno'
        value={selectedCompany.companygstno}
        onChange={(e) => handleChange(e, "companydetails", "companygstno")}      
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Company Contact</label>
        <input className='staff-create-invoice-form-input'
         type="text"
         id='companycontact'
            name='companycontact'
            value={selectedCompany.companycontact}
            onChange={(e) => handleChange(e, "companydetails", "companycontact")}
         />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Company country</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='companycountry'
        name='companycountry'
        value={selectedCompany.companycountry}
        onChange={(e) => handleChange(e, "companydetails", "companycountry")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Company State</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='companystate'
        name='companystate'
        value={selectedCompany.companystate}
        onChange={(e) => handleChange(e, "companydetails", "companystate")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Company Office Address</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='companyofficeaddress'
        name='companyofficeaddress'
        value={selectedCompany.companyofficeaddress}
        onChange={(e) => handleChange(e, "companydetails", "companyofficeaddress")}
        
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Company  pincode</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='companypincode'
        name='companypincode'
        value={selectedCompany.companypincode}
        onChange={(e) => handleChange(e, "companydetails", "companypincode")}
        />
        </div>
        </form>
        <div className='staff-create-invoice-data'>
      <h2 className='staff-create-invoice-subtitle'>SELLER DETAILS</h2>
      <select className='staff-create-invoice-select'
      id='sellerid'
        name='sellerid'
        value={selectedSeller.sellerid}
        onChange={handleSelectChangeSeller}
      >
        <option value="">Select Seller ID</option>
        {sellers.map((seller) => (
            <option key={seller._id} value={seller._id}>
                {seller.sellercompanyname}
            </option>
        ))}
      </select>
      </div>
      <form className='staff-create-invoice-form'>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Seller Company Name</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='sellercompanyname'
        name='sellercompanyname'
        value={selectedSeller.sellercompanyname}
        onChange={(e) => handleChange(e, "sellerdetails", "sellercompanyname")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Seller Company GST No.</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='sellercompanygstno'
        name='sellercompanygstno'
        value={selectedSeller.sellercompanygstno}
        onChange={(e) => handleChange(e, "sellerdetails", "sellercompanygstno")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Seller Company Address</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='sellercompanyaddress'
        name='sellercompanyaddress'
        value={selectedSeller.sellercompanyaddress}
        onChange={(e) => handleChange(e, "sellerdetails", "sellercompanyaddress")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Seller Company State Name</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='sellercompanystatename'
        name='sellercompanystatename'
        value={selectedSeller.sellercompanystatename}
        onChange={(e) => handleChange(e, "sellerdetails", "sellercompanystatename")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Seller Company State Code</label>    
        <input className='staff-create-invoice-form-input' type="text"
        id='sellercompanystatecode'
        name='sellercompanystatecode'
        value={selectedSeller.sellercompanystatecode}
        onChange={(e) => handleChange(e, "sellerdetails", "sellercompanystatecode")}
        />
        </div>
        </form>
        <div className='staff-create-invoice-data'>
      <h2 className='staff-create-invoice-subtitle'>BUYER DETAILS</h2>
      <select className='staff-create-invoice-select'
      id='buyerid'
        name='buyerid'
        value={selectedBuyer.buyerid}
        onChange={handleSelectChangeBuyer}
      >
        <option value="">Select Buyer ID</option>
        {buyers.map((buyer) => (
            <option key={buyer._id} value={buyer._id}>
                {buyer.buyercompanyname}
            </option>
        ))}
      </select>
      </div>
      <form className='staff-create-invoice-form'>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Buyer Company Name</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='buyercompanyname' 
        name='buyercompanyname'
        value={selectedBuyer.buyercompanyname}
        onChange={(e) => handleChange(e, "buyerdetails", "buyercompanyname")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Buyer Company GST No.</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='buyercompanygstno'
        name='buyercompanygstno'
        value={selectedBuyer.buyercompanygstno}
        onChange={(e) => handleChange(e, "buyerdetails", "buyercompanygstno")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Buyer Company Address</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='buyercopmanyaddress'
        name='buyercopmanyaddress'
        value={selectedBuyer.buyercompanyaddress}
        onChange={(e) => handleChange(e, "buyerdetails", "buyercompanyaddress")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Buyer Company State Name</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='buyercompanystatename'
        name='buyercompanystatename'
        value={selectedBuyer.buyercompanystatename}
        onChange={(e) => handleChange(e, "buyerdetails", "buyercompanystatename")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Buyer Company State Code</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='buyercompanystatecode'
        name='buyercompanystatecode'
        value={selectedBuyer.buyercompanystatecode}
        onChange={(e) => handleChange(e, "buyerdetails", "buyercompanystatecode")}
        />
        </div>
        </form>
        <div className='staff-create-invoice-data'>
      <h2 className='staff-create-invoice-subtitle'>VECHICLE DETAILS</h2>
      <select className='staff-create-invoice-select'
      id='vehicleid'
        name='vehicleid'
        value={selectedVehicle.vehicleid}
        onChange={handleSelectChangeVehicle}
      >
        <option value="">Select Vehicle ID</option>
        {vehicles.map((vehicle) => (
            <option key={vehicle._id} value={vehicle._id}>
                {vehicle.drivername}
            </option>
        ))}
      </select>
      </div>
      <form className='staff-create-invoice-form'>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Driver Name</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='drivername'
        name='drivername'
        value={selectedVehicle.drivername}
        onChange={(e) => handleChange(e, "vehicledetails", "drivername")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Driver Number</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='drivernumber'
        name='drivernumber'
        value={selectedVehicle.drivernumber}
        onChange={(e) => handleChange(e, "vehicledetails", "drivernumber")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Driver Address</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='driveraddress'
        name='driveraddress'
        value={selectedVehicle.driveraddress}
        onChange={(e) => handleChange(e, "vehicledetails", "driveraddress")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Driver Id Proof</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='driveridproof'
        name='driveridproof'
        value={selectedVehicle.driveridproof}
        onChange={(e) => handleChange(e, "vehicledetails", "driveridproof")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Driver License No.</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='driverlicenseno'
        name='driverlicenseno'
        value={selectedVehicle.driverlicenseno}
        onChange={(e) => handleChange(e, "vehicledetails", "driverlicenseno")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Vechicle Number</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='vehiclenumber'
        name='vehiclenumber'
        value={selectedVehicle.vehiclenumber}
        onChange={(e) => handleChange(e, "vehicledetails", "vehiclenumber")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Vechicle Model</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='vehiclemodel'
        name='vehiclemodel'
        value={selectedVehicle.vehiclemodel}
        onChange={(e) => handleChange(e, "vehicledetails", "vehiclemodel")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Vechicle office branch</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='vehicleofficebranch'
        name='vehicleofficebranch'
        value={selectedVehicle.vehicleofficebranch}
        onChange={(e) => handleChange(e, "vehicledetails", "vehicleofficebranch")}
        />
        </div>
        </form>
        <div className='staff-create-invoice-data'>
      <h2 className='staff-create-invoice-subtitle'>CONSIGNMENT DETAILS</h2>
      <select className='staff-create-invoice-select'
      id='consignmentid'
        name='consignmentid'
        value={selectedConsignment.consignmentid}
        onChange={handleSelectChangeConsignment}
      >
        <option value="">Select Consignment ID</option>
      </select>
      </div>
      <table className='staff-create-invoice-table-consigment'>
        <tr className='staff-create-invoice-table-row-head'>
          <th className='staff-create-invoice-table-row-th'>ITEM NAME</th>
          <th className='staff-create-invoice-table-row-th'>ITEM QUANTITY</th>
          <th className='staff-create-invoice-table-row-th'>ITEM HSN</th>
          <th className='staff-create-invoice-table-row-th'>ITEM PRICE</th>
          <th className='staff-create-invoice-table-row-th'>ITEM TAX RATE</th>
          <th className='staff-create-invoice-table-row-th'>ACTION</th>
        </tr>
        <br />
        <tr className='staff-create-invoice-table-row-body'>
          <td><input className='staff-create-invoice-table-consigment-input' type="text"/></td>
          <td><input className='staff-create-invoice-table-consigment-input' type="number"/></td>
          <td><input className='staff-create-invoice-table-consigment-input' type="text"/></td>
          <td><input className='staff-create-invoice-table-consigment-input' type="number"/></td>
          <td><input className='staff-create-invoice-table-consigment-input' type="text"/></td>
          <td>
            <button className='staff-create-invoice-table-consigment-button'>
            <img className='staff-create-invoice-table-consigment-icon' src={A} alt='add'/>
            </button>
          </td>
        </tr>
        <br />
        <tr className='staff-create-invoice-table-row-body'>
          <td className='staff-create-invoice-table-consigment-value'>srcap</td>
          <td className='staff-create-invoice-table-consigment-value'>450</td>
          <td className='staff-create-invoice-table-consigment-value'>087099</td>
          <td className='staff-create-invoice-table-consigment-value'>907980</td>
          <td className='staff-create-invoice-table-consigment-value'>18</td>
          <td>
          <button className='staff-create-invoice-table-consigment-button'>
            <img className='staff-create-invoice-table-consigment-icon-low' src={E} alt='edit'/>
            </button>
            <button className='staff-create-invoice-table-consigment-button'>
            <img className='staff-create-invoice-table-consigment-icon-low' src={D} alt='delete'/>
            </button>
          </td>
        </tr>
      </table>
      <div className='staff-create-invoice-data'>
      <h2 className='staff-create-invoice-subtitle'>INVOICE DETAILS</h2>
      </div>
      <form className='staff-create-invoice-form'>
      <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Invoice No.</label>
        <br />
        <input className='staff-create-invoice-form-input'
         type="text"
         id='invoiceno'
            name='invoiceno'
            onChange={(e) => handleChange(e, "invoicedetails", "invoiceno")}
         />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Invoice Date</label>
        <br />
        <input className='staff-create-invoice-form-input' type="date"
        id='invoicedate'
        name='invoicedate'
        onChange={(e) => handleChange(e, "invoicedetails", "invoicedate")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>E Way Bill No</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='ewaybillno'
        name='ewaybillno'
        onChange={(e) => handleChange(e, "invoicedetails", "ewaybillno")}

        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Delivery Note</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='deliverynote'
        name='deliverynote'
        onChange={(e) => handleChange(e, "invoicedetails", "deliverynote")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Supplier Ref.</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='supplierref'
        name='supplierref'
        onChange={(e) => handleChange(e, "invoicedetails", "supplierref")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Other Ref.</label>
        <br />
        <input className='staff-create-invoice-form-input' type="text"
        id='otherref'
        name='otherref'
        onChange={(e) => handleChange(e, "invoicedetails", "otherref")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Buyer's Order No.</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='buyersorder'
        name='buyersorder'
        onChange={(e) => handleChange(e, "invoicedetails", "buyersorder")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Buyer's Order Date</label>
        <input className='staff-create-invoice-form-input' type="date"
        id='ordereddate'
        name='ordereddate'
        onChange={(e) => handleChange(e, "invoicedetails", "ordereddate")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Dispatch Document No.</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='dispatchdocumentno'
        name='dispatchdocumentno'
        onChange={(e) => handleChange(e, "invoicedetails", "dispatchdocumentno")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Delivery Note Date</label>
        <input className='staff-create-invoice-form-input' type="date"
        id='deliverynotedate'
        name='deliverynotedate'
        onChange={(e) => handleChange(e, "invoicedetails", "deliverynotedate")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Dispatch Through</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='dispatchthrough'
        name='dispatchthrough'
        onChange={(e) => handleChange(e, "invoicedetails", "dispatchthrough")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Destination</label>
        <br />
        <input className='staff-create-invoice-form-input' type="text"
        id='destination'
        name='destination'
        onChange={(e) => handleChange(e, "invoicedetails", "destination")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Terms and Conditions</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='termsandcondition'
        name='termsandcondition'
        onChange={(e) => handleChange(e, "invoicedetails", "termsandcondition")}
        />
        </div>
        </form>
        <div className='staff-create-invoice-data'>
      <h2 className='staff-create-invoice-subtitle'>BOARDING DETAILS</h2>
      </div>
      <form className='staff-create-invoice-form'>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Weight of Load</label>
        <input className='staff-create-invoice-form-input' type="Number"
        id='weight'
        name='weight'
        onChange={(e) => handleChange(e, "boardingdetails", "weight")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Transportation Cost</label>
        <input className='staff-create-invoice-form-input' type="number"
        id='transportationcost'
        name='transportationcost'
        onChange={(e) => handleChange(e, "boardingdetails", "transportationcost")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Total Transportation Cost</label>
        <input className='staff-create-invoice-form-input' type="number"
        id='totalcost'
        name='totalcost'
        onChange={(e) => handleChange(e, "boardingdetails", "totalcost")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Date of Loading</label>
        <input className='staff-create-invoice-form-input' type="date"
        id='dateofloading'
        name='dateofloading'
        onChange={(e) => handleChange(e, "boardingdetails", "dateofloading")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Starting Point</label>
        <input className='staff-create-invoice-form-input' type="text"
        id='startingpoint'
        name='startingpoint'
        onChange={(e) => handleChange(e, "boardingdetails", "startingpoint")}
        />
        </div>
        <div className='staff-create-invoice-form-div'>
        <label className='staff-create-invoice-form-label'>Ending Point</label>
        <br />
        <input className='staff-create-invoice-form-input' type="text"
        id='endingpoint'
        name='endingpoint'
        onChange={(e) => handleChange(e, "boardingdetails", "endingpoint")}
        />
        </div>
        </form>
        <div className='staff-create-invoice-data-submit'>
      <button className='staff-create-invoice-button'
      >CREATE INVOICE</button>
    </div>
    </div>
    </form>
    </div>
    )
}

export default StaffCreateInvoice;