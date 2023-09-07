import React, { useEffect, useState } from 'react'
import axios from "axios";
import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CInputGroup, CModal, CModalBody, CModalFooter, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPen, cilTrash } from '@coreui/icons';

const InventoryManagement = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const URL = "http://localhost:5040/cmfb/inventory/getAllInventory";
  const [add, setAdd] = useState(true);
  const [formData, setFormData] = useState({});
  const [visible, setVisible] = useState(false);
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
          setInventoryData(data?.data? data.data: data);
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
    try {
      if (formData?._id) {
        axios.put(`http://localhost:5040/cmfb/inventory/`+formData?._id, formData).then((response) => {
          console.log('DATA' + JSON.stringify(response));
          setAdd(true);
          fetchData();
        })
      }
      else {
        axios.post(`http://localhost:5040/cmfb/inventory/addInventory`, formData).then((response) => {
          setAdd(true);
          fetchData();
        })
      }
    } catch (error) {
      console.error('Error updating food bank', error)
    }
  }

  const deleteItem = () => {
    axios.delete(`http://localhost:5040/cmfb/user/deleteUser`).then((response) => {
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
              <h4>{!add && formData ? 'Edit' : 'Add'} Inventory</h4>
              <label className='formLabel'>Name</label>
              <CInputGroup className="mb-3">
                <CFormInput
                  type="text"
                  autoComplete="name"
                  name="item_name"
                  value={formData.item_name}
                  onChange={handleChange}
                  required
                />
              </CInputGroup>
              <label className='formLabel'>Description</label>
              <CInputGroup className="mb-3">
                <CFormInput
                  type="text"
                  autoComplete="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </CInputGroup>
              <label className='formLabel'>Price</label>
              <CInputGroup className="mb-3">
                <CFormInput
                  type="number"
                  autoComplete="price"
                  name="price"
                  value={formData.price}
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
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.length !== 0 ?
            inventoryData.map((item, i) => (
              <tr key={i}>
                <td>{i+1}</td>
                <td>{item.item_name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
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
          Are you sure you want to delete Item?
        </CModalBody>
        <CModalFooter>
          <CButton className="addBtn btn-dark-yellow btn btn-custom" onClick={() => setVisible(false)}>
            No
          </CButton>
          <CButton className="addBtn btn-dark-yellow btn btn-custom" onClick={() => deleteItem()}>Yes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default InventoryManagement
