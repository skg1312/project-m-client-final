import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Consignment = () => {
  const [consignments, setConsignments] = useState([]);
  const [dataToSend, setDataToSend] = useState({
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
  });
  const [selectedConsignment, setSelectedConsignment] = useState(null);

  const API = process.env.REACT_APP_API;

  useEffect(() => {
    axios
      .get(`${API}consignment`)
      .then((response) => {
        setConsignments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching consignment data:', error);
      });
  }, [API]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Only submit the added consignment data
    const addedConsignment = dataToSend.consignmentdetails.itemdetails[0];
    axios
      .post(`${API}consignment`, { consignmentdetails: { itemdetails: [addedConsignment] } })
      .then((response) => {
        console.log(response);
        alert('Consignment Added Successfully');
      })
      .catch((error) => {
        console.error('Error adding consignment:', error);
        alert('Error adding consignment');
      });
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItemDetails = [...dataToSend.consignmentdetails.itemdetails];
    updatedItemDetails[index] = {
      ...updatedItemDetails[index],
      [name]: value,
    };

    setDataToSend({
      ...dataToSend,
      consignmentdetails: {
        ...dataToSend.consignmentdetails,
        itemdetails: updatedItemDetails,
      },
    });
  };

  const handleItemAdd = () => {
    setDataToSend((prevData) => {
      return {
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
      };
    });
  };

  const handleItemDelete = () => {
    // Remove the added consignment by resetting the itemdetails array
    setDataToSend({
      ...dataToSend,
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
    });
  };

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selected = consignments.find(
      (consignment) => consignment.id === selectedId
    );

    setSelectedConsignment(selected);

    // Update input values based on the selected consignment
    setDataToSend({
      ...dataToSend,
      consignmentdetails: {
        ...dataToSend.consignmentdetails,
        itemdetails: [
          {
            itemname: selected?.itemname || '',
            itemquantity: selected?.itemquantity || 0,
            itemhsn: selected?.itemhsn || '',
            itemprice: selected?.itemprice || 0,
            itemtaxrate: selected?.itemtaxrate || '',
          },
        ],
      },
    });
  };

  return (
    <div>
      <div className="container">
        <form className="invoice-form" onSubmit={handleFormSubmit}>
          <div className="invoice-form-section">
            <select
              value={selectedConsignment?.id}
              onChange={(e) => handleSelectChange(e)}
            >
              <option value="" disabled>
                Select a Consignment
              </option>
              {consignments.map((consignment) => (
                <option key={consignment.id} value={consignment.id}>
                  {consignment.name}
                </option>
              ))}
            </select>
            <table className="invoice-form-section-table">
              <thead className="invoice-form-section-table-thead">
                <tr className="invoice-form-section-table-thead-tr">
                  <th className="invoice-form-section-table-thead-th">Item Name</th>
                  <th className="invoice-form-section-table-thead-th">Item Quantity</th>
                  <th className="invoice-form-section-table-thead-th">Item HSN</th>
                  <th className="invoice-form-section-table-thead-th">Item Price</th>
                  <th className="invoice-form-section-table-thead-th">Item Tax Rate</th>
                  <th className="invoice-form-section-table-thead-th">Action</th>
                </tr>
              </thead>
              <tbody className="invoice-form-section-table-tbody">
                <tr className="invoice-form-section-table-tbody-input-tr">
                  <td className="invoice-form-section-table-tbody-input-td">
                    <input
                      type="text"
                      name="itemname"
                      value={dataToSend.consignmentdetails.itemdetails[0].itemname}
                      onChange={(e) => handleItemChange(e, 0)}
                      required
                    />
                  </td>
                  <td className="invoice-form-section-table-tbody-input-td">
                    <input
                      type="number"
                      name="itemquantity"
                      value={dataToSend.consignmentdetails.itemdetails[0].itemquantity}
                      onChange={(e) => handleItemChange(e, 0)}
                      required
                    />
                  </td>
                  <td className="invoice-form-section-table-tbody-input-td">
                    <input
                      type="text"
                      name="itemhsn"
                      value={dataToSend.consignmentdetails.itemdetails[0].itemhsn}
                      onChange={(e) => handleItemChange(e, 0)}
                      required
                    />
                  </td>
                  <td className="invoice-form-section-table-tbody-input-td">
                    <input
                      type="number"
                      name="itemprice"
                      value={dataToSend.consignmentdetails.itemdetails[0].itemprice}
                      onChange={(e) => handleItemChange(e, 0)}
                      required
                    />
                  </td>
                  <td className="invoice-form-section-table-tbody-input-td">
                    <input
                      type="text"
                      name="itemtaxrate"
                      value={dataToSend.consignmentdetails.itemdetails[0].itemtaxrate}
                      onChange={(e) => handleItemChange(e, 0)}
                      required
                    />
                  </td>
                  <td className="invoice-form-section-table-tbody-input-td">
                    <button type="button" onClick={handleItemAdd}>
                      Add
                    </button>
                  </td>
                </tr>
                  <tr className="invoice-form-section-table-tbody-view-tr">
                    <td className="invoice-form-section-table-tbody-view-td">
                      {selectedConsignment?.itemname}
                    </td>
                    <td className="invoice-form-section-table-tbody-view-td">
                      {selectedConsignment?.itemquantity}
                    </td>
                    <td className="invoice-form-section-table-tbody-view-td">
                      {selectedConsignment?.itemhsn}
                    </td>
                    <td className="invoice-form-section-table-tbody-view-td">
                      {selectedConsignment?.itemprice}
                    </td>
                    <td className="invoice-form-section-table-tbody-view-td">
                      {selectedConsignment?.itemtaxrate}
                    </td>
                    <td className="invoice-form-section-table-tbody-view-td">
                      <button
                        type="button"
                        onClick={handleItemDelete}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
          <div className="invoice-form-section-button">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Consignment;
