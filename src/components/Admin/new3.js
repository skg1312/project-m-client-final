import React , { useEffect , useState } from 'react';

const New = () => {

    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [addCompany, setAddCompany] = useState({
        companyid:'',
        companyname:'',
        companyregistrationtype:'',
        companygstno:'',
        companycontact:'',
        companyemail:'',
        companyofficeaddress:'',
        companypincode:'',
    });
    const [setDataToSend, setSetDataToSend] = useState({
        companydetails:{
            companyid:'',
            companyname:'',
            companyregistrationtype:'',
            companygstno:'',
            companycontact:'',
            companyemail:'',
            companyofficeaddress:'',
            companypincode:'',
        }
    });
    const API = 'https://squid-app-qoup6.ondigitalocean.app/';

    useEffect(() => {
        axios
            .get(`${API}company`)
            .then((response) => {
                setCompanies(response.data);
            })
            .catch((error) => {
                console.error('Error fetching company data:', error);
            });
    }, [API]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Only submit the added company data
        const addedCompany = setDataToSend.companydetails;
        axios
            .post(`${API}company`, { companydetails: addedCompany })
            .then((response) => {
                console.log(response);
                alert('Company Added Successfully');
            })
            .catch((error) => {
                console.error('Error adding company:', error);
                alert('Error adding company');
            });
    };
    return(

        <div>
            <select>
                //get the options for the company from the database and make the add the map the values in to the below input fields
            </select>
            <form>
                <input />//it get values from the above select tag and able to change that values
                <input />
                <input />
                <input />
                <input />
                <input />
                <input />
                <input />
                <button>
                    Add Company
                    // after make the changes we need to dataToSend to another database
                </button>
            </form>

        </div>
    )
}

export default New;