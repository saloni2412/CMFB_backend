/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import Snackbar from './Snackbar'

const Login = () => {
  const history = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const requestData = {
      email: formData.email,
      password: formData.password,
    }

    axios.post('http://localhost:5040/cmfb/user/login', requestData).then((response) => {
      console.log('User loggedin succesfully' , response);
      localStorage.setItem('userData', JSON.stringify(response?.data?.data))
      setSnackbarMessage('Logged in Sucessfully!');
      setShowSnackbar(true);
      if (response?.data?.data?.role.toLowerCase().includes('admin')) {
        history('/dashboard')
      } else {
        history('/home')
      }
    }).catch((error) => {
      if (error.response) {
        console.log('Server responded with:', error.response.data);
        setSnackbarMessage(error.response.data.message ? error.response.data.message : 'Error logging in!');
        setShowSnackbar(true);
      } else if (error.request) {
        console.log('No response received:', error.request);
        setSnackbarMessage('No response received');
        setShowSnackbar(true);
      } else {
        console.log('Error setting up the request:', error.message);
        setSnackbarMessage('Error setting up the request');
        setShowSnackbar(true);
      }
    });
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  return (
    <div className="bg-black min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        minLength={6}
                        maxLength={12}
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" className="btn-dark login btn btn-custom">
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 bg-yellow" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div className="createAccount">
                    <h2 className="font-white">Create Account!</h2>
                    <h6 className="font-white">Sign up if you still don't have an account.</h6>
                    <Link to="/register">
                      <CButton
                        className="mt-3 registerBtn btn-dark-yellow btn btn-custom"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      {showSnackbar && (
        <Snackbar message={snackbarMessage} onClose={handleCloseSnackbar} />
      )}
    </div>
  )
}

export default Login
