import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormSelect, CInputGroup, CModal, CModalBody, CModalFooter, CRow } from '@coreui/react'
import { cilPen, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const URL = 'http://localhost:5040/cmfb/user/getAllUsers';
  const [add, setAdd] = useState(true);
  const [formData, setFormData] = useState({
    password: '12345678'
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      await axios
        .get(URL, {
          timeout: 5000,
        })
        .then((response) => {
          console.log('check response' + response)
          setUsers(response.data.data ? response.data.data : response.data)

        })
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, e, 'formdata');
    try {
      if (formData?._id) {
        axios.put(`http://localhost:5040/cmfb/user/userUpdate`, formData).then((response) => {
          console.log('DATA' + JSON.stringify(response));
          setAdd(true);
          fetchData();
        })
      }
      else {
        axios.post(`http://localhost:5040/cmfb/user/register`, formData).then((response) => {
          console.log('DATA' + JSON.stringify(response));
          setAdd(true);
          fetchData();
        })
      }
    } catch (error) {
      console.error('Error updating food bank', error)
    }
  }

  const deleteUser = () => {
    axios.delete(`http://localhost:5040/cmfb/user/deleteUser`).then((response) => {
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
              <h4>{!add && formData ? 'Edit' : 'Add'} User</h4>
              <label className='formLabel'>Email</label>
              <CInputGroup className="mb-3">
                <CFormInput
                  type="email"
                  autoComplete="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </CInputGroup>
              <label className='formLabel'>Name</label>
              <CInputGroup className="mb-3">
                <CFormInput
                  type="text"
                  autoComplete="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </CInputGroup>
              <label className='formLabel'>Address</label>
              <CInputGroup className="mb-3">
                <CFormInput
                  type="text"
                  autoComplete="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </CInputGroup>
              <label className='formLabel'>Phone</label>
              <CInputGroup className="mb-3">
                <CFormInput
                  type="text"
                  autoComplete="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </CInputGroup>
              <label className='formLabel'>Role</label>
              <CInputGroup className="mb-3">
                <CFormSelect
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Role"
                  required
                >
                  <option value="Volunteer">Volunteer</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </CFormSelect>
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
              <th>Role</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.role ? item.role : 'N/A'}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td onClick={() => { setAdd(false); setFormData(item); }}><CIcon icon={cilPen} /></td>
                  <td onClick={() => { confirmDeletion(item) }}><CIcon icon={cilTrash} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalBody>
          Are you sure you want to delete User?
        </CModalBody>
        <CModalFooter>
          <CButton className="addBtn btn-dark-yellow btn btn-custom" onClick={() => setVisible(false)}>
            No
          </CButton>
          <CButton className="addBtn btn-dark-yellow btn btn-custom" onClick={() => deleteUser()}>Yes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Users
