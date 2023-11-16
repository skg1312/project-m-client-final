import React, { useEffect, useState } from "react";

const AdminCreateInvoice = () => {
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
      companyid: "",
      companyname: "",
      companyregistrationtype: "",
      companygstno: "",
      companycontact: "",
      companycountry: "",
      companystate: "",
      companyofficeaddress: "",
      companypincode: ""
    },
    sellerdetails: {
      sellerid: "",
      sellercompanyname: "",
      sellercompanygstno: "",
      sellercompanyaddress: "",
      sellercompanystatename: "",
      sellercompanystatecode: ""
    },
    buyerdetails: {
      buyerid: "",
      buyercompanyname: "",
      buyercompanygstno: "",
      buyercompanyaddress: "",
      buyercompanystatename: "",
      buyercompanystatecode: ""
    },
    vehicledetails: {
      vehicleid: "",
      drivername: "",
      drivernumber: "",
      driveraddress: "",
      driveridproof: "",
      driverlicenseno: "",
      vehiclenumber: "",
      vehiclemodel: "",
      vehicleofficebranch: ""
    },
    consignmentdetails: {
      itemdetails: [
        {
          itemname: "",
          itemquantity: 0,
          itemhsn: "",
          itemprice: 0,
          itemtaxrate: ""
        }
      ]
    },
    invoicedetails: {
      invoiceno: "",
      ewaybillno: "",
      invoicedate: "",
      deliverynote: "",
      supplierref: "",
      otherref: "",
      buyersorder: "",
      ordereddate: "",
      dispatchdocumentno: "",
      deliverynotedate: "",
      dispatchthrough: "",
      destination: "",
      termsandcondition: ""
    },
    boardingdetails: {
      weight: 0,
      transportationcost: 0,
      totalcost: 0,
      dateofloading: "",
      startingpoint: "",
      endingpoint: ""
    }
  });

  const API = "https://squid-app-qoup6.ondigitalocean.app/";

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${API}company`);
        if (response.ok) {
          const data = await response.json();
          setCompanies(data);
        } else {
          console.error("Failed to fetch companies data");
        }
      } catch (error) {
        console.error("Error fetching companies data:", error);
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
        } else {
          console.error("Failed to fetch sellers data");
        }
      } catch (error) {
        console.error("Error fetching sellers data:", error);
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
        } else {
          console.error("Failed to fetch buyers data");
        }
      } catch (error) {
        console.error("Error fetching buyers data:", error);
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
        } else {
          console.error("Failed to fetch vehicles data");
        }
      } catch (error) {
        console.error("Error fetching vehicles data:", error);
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
        } else {
          console.error("Failed to fetch consignments data");
        }
      } catch (error) {
        console.error("Error fetching consignments data:", error);
      }
    };
    fetchConsignments();
  }, [API]);

  const handleSelectChangeCompany = (e) => {
    const selectedCompanyId = e.target.value;
    const selectedCompany = companies.find(
      (company) => company._id === selectedCompanyId
    );

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
        companypincode: selectedCompany.companypincode
      }
    }));
    setSelectedCompany(selectedCompany);
  };

  const handleSelectChangeSeller = (e) => {
    const selectedSellerId = e.target.value;
    const selectedSeller = sellers.find(
      (seller) => seller._id === selectedSellerId
    );

    setDataToSend((prevData) => ({
      ...prevData,
      sellerdetails: {
        ...prevData.sellerdetails,
        sellerid: selectedSeller.sellerid,
        sellercompanyname: selectedSeller.sellercompanyname,
        sellercompanygstno: selectedSeller.sellercompanygstno,
        sellercompanyaddress: selectedSeller.sellercompanyaddress,
        sellercompanystatename: selectedSeller.sellercompanystatename,
        sellercompanystatecode: selectedSeller.sellercompanystatecode
      }
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
        buyercompanystatecode: selectedBuyer.buyercompanystatecode
      }
    }));
    setSelectedBuyer(selectedBuyer);
  };

  const handleSelectChangeVehicle = (e) => {
    const selectedVehicleId = e.target.value;
    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle._id === selectedVehicleId
    );

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
        vehicleofficebranch: selectedVehicle.vehicleofficebranch
      }
    }));
    setSelectedVehicle(selectedVehicle);
  };
  const handleSelectChangeConsignment = (e) => {
    const selectedConsignmentId = e.target.value;
    const selectedConsignment = consignments.find(
      (consignment) => consignment._id === selectedConsignmentId
    );

    setDataToSend((prevData) => {
      const updatedItemDetails = prevData.consignmentdetails.itemdetails.map(
        (item, index) => {
          if (index === 0) {
            return {
              ...item,
              itemname: selectedConsignment.itemname,
              itemquantity: selectedConsignment.itemquantity,
              itemhsn: selectedConsignment.itemhsn,
              itemprice: selectedConsignment.itemprice,
              itemtaxrate: selectedConsignment.itemtaxrate
            };
          }
          return item;
        }
      );

      return {
        ...prevData,
        consignmentdetails: {
          itemdetails: updatedItemDetails
        }
      };
    });

    // Update selectedConsignment
    setSelectedConsignment(selectedConsignment);
  };

  const handleChange = (e, section, field) => {
    const value = e.target.value;
    setDataToSend((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));
  };
  const ConsignmentsAdd = () => {
    setDataToSend((prevData) => ({
      ...prevData,
      consignmentdetails: {
        ...prevData.consignmentdetails,
        itemdetails: [
          ...prevData.consignmentdetails.itemdetails,
          {
            itemname: "",
            itemquantity: 0,
            itemhsn: "",
            itemprice: 0,
            itemtaxrate: ""
          }
        ]
      }
    }));
  };
  const ConsignmentsRemove = (index) => {
    setDataToSend((prevData) => ({
      ...prevData,
      consignmentdetails: {
        ...prevData.consignmentdetails,
        itemdetails: prevData.consignmentdetails.itemdetails.filter(
          (item, i) => i !== index
        )
      }
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
              [field]: value
            };
          }
          return item;
        })
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}invoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Invoice created successfully:", data);
      } else {
        console.error("Invoice creation failed");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };
  return (
    <div className="top">
      <div className="invoice-container">
        <h1 className="invoice-heading">Create Invoice</h1>
        <form className="invoice-form" onSubmit={handleSubmit}>
          <div className="invoice-form-section">
            <h3 className="invoice-form-section-heading">Company Details</h3>
            <div className="invoice-form-section-inputs">
              <div className="invoice-form-section-inputs-left">
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="companyid">Company ID</label>
                  <select
                    id="companyid"
                    name="companyid"
                    value={selectedCompany.companyid}
                    onChange={handleSelectChangeCompany}
                    required
                  >
                    <option value="">Select Company ID</option>
                    {companies.map((company) => (
                      <option key={company._id} value={company._id}>
                        {company.companyname}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="companyname">Company Name</label>
                  <input
                    id="companyname"
                    name="companyname"
                    type="text"
                    value={selectedCompany.companyname}
                    onChange={(e) =>
                      handleChange(e, "companydetails", "companyname")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="companyregistrationtype">
                    Company Registration Type
                  </label>
                  <input
                    id="companyregistrationtype"
                    name="companyregistrationtype"
                    type="text"
                    value={selectedCompany.companyregistrationtype}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "companydetails",
                        "companyregistrationtype"
                      )
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="companygstno">Company GST No.</label>
                  <input
                    id="companygstno"
                    name="companygstno"
                    type="text"
                    value={selectedCompany.companygstno}
                    onChange={(e) =>
                      handleChange(e, "companydetails", "companygstno")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="companycontact">Company Contact</label>
                  <input
                    id="companycontact"
                    name="companycontact"
                    type="text"
                    value={selectedCompany.companycontact}
                    onChange={(e) =>
                      handleChange(e, "companydetails", "companycontact")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="companycountry">Company Country</label>
                  <input
                    id="companycountry"
                    name="companycountry"
                    type="text"
                    value={selectedCompany.companycountry}
                    onChange={(e) =>
                      handleChange(e, "companydetails", "companycountry")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="companystate">Company State</label>
                  <input
                    id="companystate"
                    name="companystate"
                    type="text"
                    value={selectedCompany.companystate}
                    onChange={(e) =>
                      handleChange(e, "companydetails", "companystate")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="companyofficeaddress">
                    Company Office Address
                  </label>
                  <input
                    id="companyofficeaddress"
                    name="companyofficeaddress"
                    type="text"
                    value={selectedCompany.companyofficeaddress}
                    onChange={(e) =>
                      handleChange(e, "companydetails", "companyofficeaddress")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="companypincode">Company Pincode</label>
                  <input
                    id="companypincode"
                    name="companypincode"
                    type="text"
                    value={selectedCompany.companypincode}
                    onChange={(e) =>
                      handleChange(e, "companydetails", "companypincode")
                    }
                    required
                  />
                </div>
              </div>
              <div className="invoice-form-section-inputs-right">
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="sellerid">Seller ID</label>
                  <select
                    id="sellerid"
                    name="sellerid"
                    value={selectedSeller.sellerid}
                    onChange={handleSelectChangeSeller}
                    required
                  >
                    <option value="">Select Seller ID</option>
                    {sellers.map((seller) => (
                      <option key={seller._id} value={seller._id}>
                        {seller.sellerid}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="sellercompanyname">Seller Company Name</label>
                  <input
                    id="sellercompanyname"
                    name="sellercompanyname"
                    type="text"
                    value={selectedSeller.sellercompanyname}
                    onChange={(e) =>
                      handleChange(e, "sellerdetails", "sellercompanyname")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="sellercompanygstno">
                    Seller Company GST No.
                  </label>
                  <input
                    id="sellercompanygstno"
                    name="sellercompanygstno"
                    type="text"
                    value={selectedSeller.sellercompanygstno}
                    onChange={(e) =>
                      handleChange(e, "sellerdetails", "sellercompanygstno")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="sellercompanyaddress">
                    Seller Company Address
                  </label>
                  <input
                    id="sellercompanyaddress"
                    name="sellercompanyaddress"
                    type="text"
                    value={selectedSeller.sellercompanyaddress}
                    onChange={(e) =>
                      handleChange(e, "sellerdetails", "sellercompanyaddress")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="sellercompanystatename">
                    Seller Company State Name
                  </label>
                  <input
                    id="sellercompanystatename"
                    name="sellercompanystatename"
                    type="text"
                    value={selectedSeller.sellercompanystatename}
                    onChange={(e) =>
                      handleChange(e, "sellerdetails", "sellercompanystatename")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="sellercompanystatecode">
                    Seller Company State Code
                  </label>
                  <input
                    id="sellercompanystatecode"
                    name="sellercompanystatecode"
                    type="text"
                    value={selectedSeller.sellercompanystatecode}
                    onChange={(e) =>
                      handleChange(e, "sellerdetails", "sellercompanystatecode")
                    }
                    required
                  />
                </div>
              </div>
              <div className="invoice-form-section-inputs-left">
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="buyerid">Buyer ID</label>
                  <select
                    id="buyerid"
                    name="buyerid"
                    value={selectedBuyer.buyerid}
                    onChange={handleSelectChangeBuyer}
                    required
                  >
                    <option value="">Select Buyer ID</option>
                    {buyers.map((buyer) => (
                      <option key={buyer._id} value={buyer._id}>
                        {buyer.buyerid}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="buyercompanyname">Buyer Company Name</label>
                  <input
                    id="buyercompanyname"
                    name="buyercompanyname"
                    type="text"
                    value={selectedBuyer.buyercompanyname}
                    onChange={(e) =>
                      handleChange(e, "buyerdetails", "buyercompanyname")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="buyercompanygstno">
                    Buyer Company GST No.
                  </label>
                  <input
                    id="buyercompanygstno"
                    name="buyercompanygstno"
                    type="text"
                    value={selectedBuyer.buyercompanygstno}
                    onChange={(e) =>
                      handleChange(e, "buyerdetails", "buyercompanygstno")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="buyercompanyaddress">
                    Buyer Company Address
                  </label>
                  <input
                    id="buyercompanyaddress"
                    name="buyercompanyaddress"
                    type="text"
                    value={selectedBuyer.buyercompanyaddress}
                    onChange={(e) =>
                      handleChange(e, "buyerdetails", "buyercompanyaddress")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="buyercompanystatename">
                    Buyer Company State Name
                  </label>
                  <input
                    id="buyercompanystatename"
                    name="buyercompanystatename"
                    type="text"
                    value={selectedBuyer.buyercompanystatename}
                    onChange={(e) =>
                      handleChange(e, "buyerdetails", "buyercompanystatename")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="buyercompanystatecode">
                    Buyer Company State Code
                  </label>
                  <input
                    id="buyercompanystatecode"
                    name="buyercompanystatecode"
                    type="text"
                    value={selectedBuyer.buyercompanystatecode}
                    onChange={(e) =>
                      handleChange(e, "buyerdetails", "buyercompanystatecode")
                    }
                    required
                  />
                </div>
              </div>
              <div className="invoice-form-section-inputs-right">
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="vehicleid">Vehicle ID</label>
                  <select
                    id="vehicleid"
                    name="vehicleid"
                    value={selectedVehicle.vehicleid}
                    onChange={handleSelectChangeVehicle}
                    required
                  >
                    <option value="">Select Vehicle ID</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle._id} value={vehicle._id}>
                        {vehicle.drivername}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="drivername">Driver Name</label>
                  <input
                    id="drivername"
                    name="drivername"
                    type="text"
                    value={selectedVehicle.drivername}
                    onChange={(e) =>
                      handleChange(e, "vehicledetails", "drivername")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="drivernumber">Driver Number</label>
                  <input
                    id="drivernumber"
                    name="drivernumber"
                    type="text"
                    value={selectedVehicle.drivernumber}
                    onChange={(e) =>
                      handleChange(e, "vehicledetails", "drivernumber")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="driveraddress">Driver Address</label>
                  <input
                    id="driveraddress"
                    name="driveraddress"
                    type="text"
                    value={selectedVehicle.driveraddress}
                    onChange={(e) =>
                      handleChange(e, "vehicledetails", "driveraddress")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="driveridproof">Driver ID Proof</label>
                  <input
                    id="driveridproof"
                    name="driveridproof"
                    type="text"
                    value={selectedVehicle.driveridproof}
                    onChange={(e) =>
                      handleChange(e, "vehicledetails", "driveridproof")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="driverlicenseno">Driver License No.</label>
                  <input
                    id="driverlicenseno"
                    name="driverlicenseno"
                    type="text"
                    value={selectedVehicle.driverlicenseno}
                    onChange={(e) =>
                      handleChange(e, "vehicledetails", "driverlicenseno")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="vehiclenumber">Vehicle Number</label>
                  <input
                    id="vehiclenumber"
                    name="vehiclenumber"
                    type="text"
                    value={selectedVehicle.vechiclenuumber}
                    onChange={(e) =>
                      handleChange(e, "vehicledetails", "vehiclenumber")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="vehiclemodel">Vehicle Model</label>
                  <input
                    id="vehiclemodel"
                    name="vehiclemodel"
                    type="text"
                    value={selectedVehicle.vechiclemodel}
                    onChange={(e) =>
                      handleChange(e, "vehicledetails", "vehiclemodel")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="vehicleofficebranch">
                    Vehicle Office Branch
                  </label>
                  <input
                    id="vehicleofficebranch"
                    name="vehicleofficebranch"
                    type="text"
                    value={selectedVehicle.vechicleofficebranch}
                    onChange={(e) =>
                      handleChange(e, "vehicledetails", "vehicleofficebranch")
                    }
                    required
                  />
                </div>
              </div>
              <div className="invoice-form-secion">
                <h3 className="invoice-form-section-heading">
                  Consignment Details
                </h3>
                <select
                  id="consignmentid"
                  name="consignmentid"
                  value={selectedConsignment.consignmentid}
                  onChange={handleSelectChangeConsignment}
                  required
                >
                  <option value="">Select Consignment ID</option>
                  {consignments &&
                    Array.isArray(consignments) &&
                    consignments.map((consignment) => (
                      <option key={consignment._id} value={consignment._id}>
                        {consignment.itemname}
                      </option>
                    ))}
                </select>

                <table className="invoice-form-section-table">
                  <thead className="invoice-form-section-table-thead">
                    <tr className="invoice-form-section-table-thead-tr">
                      <th className="invoice-form-section-table-thead-th">
                        Item Name
                      </th>
                      <th className="invoice-form-section-table-thead-th">
                        Item Quantity
                      </th>
                      <th className="invoice-form-section-table-thead-th">
                        Item HSN
                      </th>
                      <th className="invoice-form-section-table-thead-th">
                        Item Price
                      </th>
                      <th className="invoice-form-section-table-thead-th">
                        Item Tax Rate
                      </th>
                      <th className="invoice-form-section-table-thead-th">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="invoice-form-section-table-tbody">
                    {dataToSend.consignmentdetails.itemdetails.map(
                      (item, index) => (
                        <tr
                          key={index}
                          className="invoice-form-section-table-tbody-input-tr"
                        >
                          <td className="invoice-form-section-table-tbody-input-td">
                            <input
                              type="text"
                              value={item.itemname}
                              onChange={(e) =>
                                handleConsignmentChange(e, 0, "itemname")
                              }
                              required
                            />
                          </td>
                          <td className="invoice-form-section-table-tbody-input-td">
                            <input
                              type="number"
                              value={item.itemquantity}
                              onChange={(e) =>
                                handleConsignmentChange(e, 0, "itemquantity")
                              }
                              required
                            />
                          </td>
                          <td className="invoice-form-section-table-tbody-input-td">
                            <input
                              type="text"
                              value={item.itemhsn}
                              onChange={(e) =>
                                handleConsignmentChange(e, 0, "itemhsn")
                              }
                              required
                            />
                          </td>
                          <td className="invoice-form-section-table-tbody-input-td">
                            <input
                              type="number"
                              value={item.itemprice}
                              onChange={(e) =>
                                handleConsignmentChange(e, 0, "itemprice")
                              }
                              required
                            />
                          </td>
                          <td className="invoice-form-section-table-tbody-input-td">
                            <input
                              type="text"
                              value={item.itemtaxrate}
                              onChange={(e) =>
                                handleConsignmentChange(e, 0, "itemtaxrate")
                              }
                              required
                            />
                          </td>
                          <td className="invoice-form-section-table-tbody-input-td">
                            <button
                              type="button"
                              onClick={() => ConsignmentsAdd(0)}
                            >
                              Add
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                    
                  </tbody>
                </table>
              </div>
              <div className="invoice-form-section-inputs-left">
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="invoiceno">Invoice No.</label>
                  <input
                    id="invoiceno"
                    name="invoiceno"
                    type="text"
                    value={selectedConsignment.invoiceno}
                    onChange={(e) =>
                      handleChange(e, "invoicedetails", "invoiceno")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="ewaybillno">E-Way Bill No.</label>
                  <input
                    id="ewaybillno"
                    name="ewaybillno"
                    type="text"
                    value={selectedConsignment.ewaybillno}
                    onChange={(e) =>
                      handleChange(e, "invoicedetails", "ewaybillno")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="invoicedate">Invoice Date</label>
                  <input
                    id="invoicedate"
                    name="invoicedate"
                    type="date"
                    value={selectedConsignment.invoicedate}
                    onChange={(e) =>
                      handleChange(e, "invoicedetails", "invoicedate")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="deliverynote">Delivery Note</label>
                  <input
                    id="deliverynote"
                    name="deliverynote"
                    type="text"
                    value={selectedConsignment.deliverynote}
                    onChange={(e) =>
                      handleChange(e, "invoicedetails", "deliverynote")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="supplierref">Supplier Ref.</label>
                  <input
                    id="supplierref"
                    name="supplierref"
                    type="text"
                    value={selectedConsignment.supplierref}
                    onChange={(e) =>
                      handleChange(e, "invoicedetails", "supplierref")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="otherref">Other Ref.</label>
                  <input
                    id="otherref"
                    name="otherref"
                    type="text"
                    value={selectedConsignment.otherref}
                    onChange={(e) =>
                      handleChange(e, "invoicedetails", "otherref")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="buyersorder">Buyers Order</label>
                  <input
                    id="buyersorder"
                    name="buyersorder"
                    type="text"
                    value={selectedConsignment.buyersorder}
                    onChange={(e) =>
                      handleChange(e, "invoicedetails", "buyersorder")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="ordereddate">Ordered Date</label>
                  <input
                    id="ordereddate"
                    name="ordereddate"
                    type="date"
                    value={selectedConsignment.ordereddate}
                    onChange={(e) =>
                      handleChange(e, "invoicedetails", "ordereddate")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="dispatchdocumentno">
                    Dispatch Document No.
                  </label>
                  <input
                    id="dispatchdocumentno"
                    name="dispatchdocumentno"
                    type="text"
                    value={selectedConsignment.dispatchdocumentno}
                    onChange={(e) =>
                      handleChange(e, "invoicedetails", "dispatchdocumentno")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="deliverynotedate">Delivery Note Date</label>
                  <input
                    id="deliverynotedate"
                    name="deliverynotedate"
                    type="date"
                    value={selectedConsignment.deliverynotedate}
                    onChange={(e) =>
                      handleChange(e, "invoicedetails", "deliverynotedate")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="dispatchthrough">Dispatch Through</label>
                  <input
                    id="dispatchthrough"
                    name="dispatchthrough"
                    type="text"
                    value={selectedConsignment.dispatchthrough}
                    onChange={(e) =>
                      handleChange(e, "invoicedetails", "dispatchthrough")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="destination">Destination</label>
                  <input
                    id="destination"
                    name="destination"
                    type="text"
                    value={selectedConsignment.destination}
                    onChange={(e) =>
                      handleChange(e, "invoicedetails", "destination")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-right-input">
                  <label htmlFor="termsandcondition">Terms and Condition</label>
                  <input
                    id="termsandcondition"
                    name="termsandcondition"
                    type="text"
                    value={selectedConsignment.termsandcondition}
                    onChange={(e) =>
                      handleChange(e, "invoicedetails", "termsandcondition")
                    }
                    required
                  />
                </div>
              </div>
              <div className="invoice-form-section-inputs-left">
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="weight">Weight</label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    value={selectedConsignment.weight}
                    onChange={(e) =>
                      handleChange(e, "boardingdetails", "weight")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="transportationcost">
                    Transportation Cost
                  </label>
                  <input
                    id="transportationcost"
                    name="transportationcost"
                    type="number"
                    value={selectedConsignment.transportationcost}
                    onChange={(e) =>
                      handleChange(e, "boardingdetails", "transportationcost")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="totalcost">Total Cost</label>
                  <input
                    id="totalcost"
                    name="totalcost"
                    type="number"
                    value={selectedConsignment.totalcost}
                    onChange={(e) =>
                      handleChange(e, "boardingdetails", "totalcost")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="dateofloading">Date of Loading</label>
                  <input
                    id="dateofloading"
                    name="dateofloading"
                    type="date"
                    value={selectedConsignment.dateofloading}
                    onChange={(e) =>
                      handleChange(e, "boardingdetails", "dateofloading")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="startingpoint">Starting Point</label>
                  <input
                    id="startingpoint"
                    name="startingpoint"
                    type="text"
                    value={selectedConsignment.startingpoint}
                    onChange={(e) =>
                      handleChange(e, "boardingdetails", "startingpoint")
                    }
                    required
                  />
                </div>
                <div className="invoice-form-section-inputs-left-input">
                  <label htmlFor="endingpoint">Ending Point</label>
                  <input
                    id="endingpoint"
                    name="endingpoint"
                    type="text"
                    value={selectedConsignment.endingpoint}
                    onChange={(e) =>
                      handleChange(e, "boardingdetails", "endingpoint")
                    }
                    required
                  />
                </div>
              </div>
              <div className="invoice-form-section-button">
                <button type="submit">Create Invoice</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateInvoice;
