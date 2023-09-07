import React, { useEffect, useState } from 'react'
import axios from "axios";
import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CInputGroup, CModal, CModalBody, CModalFooter, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPen, cilTrash } from '@coreui/icons';
import Snackbar from './Snackbar';

const FoodBanks = () => {
  const [foodbanks, setFoodbanks] = useState([]);
  const URL = "http://localhost:5040/cmfb/foodBank/getAllFoodBanks";
  const [add, setAdd] = useState(true);
  const [formData, setFormData] = useState('')
  const [visible, setVisible] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      axios
        .get(URL)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          console.log(data);
          setFoodbanks(data?.data ? data?.data : data);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, e, 'formdata');
    if (formData?._id) {
      axios.put(`http://localhost:5040/cmfb/foodBank/foodBank/${formData._id}`, formData).then((response) => {
        console.log('DATA' + JSON.stringify(response));
        setAdd(true);
        setSnackbarMessage('Food bank updated Successfully!');
        setShowSnackbar(true);
        fetchData();
      })
    }
    else {
      axios.post(`http://localhost:5040/cmfb/foodBank/foodbank`, formData).then((response) => {
        console.log('DATA' + JSON.stringify(response));
        setSnackbarMessage('Food bank saved Successfully!');
        setShowSnackbar(true);
        setAdd(true);
        fetchData();
      })
    }


  }

  const deleteFoodBank = () => {
    axios.delete(`http://localhost:5040/cmfb/foodBank/${formData._id}`).then((response) => {
      console.log('DATA' + JSON.stringify(response));
      setVisible(false);
      fetchData();
    });
  }

  const confirmDeletion = (item) => {
    setVisible(!visible);
    setFormData(item);
  }

  return (
    <>
      {add ?
        (<CButton type="submit" className="addBtn btn-dark-yellow btn btn-custom" onClick={() => { setAdd(false); setFormData('') }}>Add</CButton>) :
        (<CButton type="submit" className="addBtn btn-dark-yellow btn btn-custom" onClick={() => setAdd(true)}>Go Back</CButton>)}

      {!add ? (
        <CCard className="p-4 addForm">
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <h4>{!add && formData ? 'Edit' : 'Add'} Food Bank</h4>
              <CRow>
                <div>
                  <label className='formLabel'>Zip Code</label>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      type="text"
                      name='zipcode'
                      placeholder="Enter Zip Code"
                      value={formData?.zipcode}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                </div>

              </CRow>

              <label className='formLabel'>Address</label>
              <CInputGroup className="mb-3">
                <CFormInput
                  type="text"
                  name='address'
                  placeholder="Enter Address"
                  value={formData?.address}
                  onChange={handleChange}
                  required
                />
              </CInputGroup>
              <label className='formLabel'>Province</label>
              <CInputGroup className="mb-3">
                <CFormInput
                  type="text"
                  name='province'
                  placeholder="Enter Province"
                  value={formData?.province}
                  onChange={handleChange}
                  required
                />
              </CInputGroup>
              <label className='formLabel'>Helpline Number</label>
              <CInputGroup className="mb-3">
                <CFormInput
                  type="text"
                  name='helpline'
                  placeholder="Enter Helpline number"
                  value={formData?.helpline}
                  onChange={handleChange}
                  required
                />
              </CInputGroup>
              <CRow>
                <CCol xs={6}>
                  <CButton type="submit" className="btn-dark login btn btn-custom">
                    Submit
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      ) : (
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Address</th>
              <th>Province</th>
              <th>Zip Code</th>
              <th>Helpline</th>
            </tr>
          </thead>
          <tbody>
            {foodbanks?.length !== 0 ?
              foodbanks?.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.address}</td>
                  <td>{item.province}</td>
                  <td>{item.zipcode}</td>
                  <td>{item.helpline}</td>

                  <td onClick={() => { setAdd(false); setFormData(item); }}><CIcon icon={cilPen} /></td>
                  <td onClick={() => { confirmDeletion(item) }}><CIcon icon={cilTrash} /></td>
                </tr>
              )) : <p>No records found.</p>
            }
          </tbody>
        </table>
      )}
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalBody>
          Are you sure you want to delete this food bank?
        </CModalBody>
        <CModalFooter>
          <CButton className="addBtn btn-dark-yellow btn btn-custom" onClick={() => setVisible(false)}>
            No
          </CButton>
          <CButton className="addBtn btn-dark-yellow btn btn-custom" onClick={() => deleteFoodBank()}>Yes</CButton>
        </CModalFooter>
      </CModal>
      {showSnackbar && (
        <Snackbar message={snackbarMessage} onClose={handleCloseSnackbar} />
      )}
    </>
  )
}

export default FoodBanks
