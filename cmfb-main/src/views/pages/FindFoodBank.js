/* eslint-disable react/no-unescaped-entities */
import { CCard, CCardBody, CCol, CContainer, CForm, CHeader, CHeaderNav, CNavItem, CNavLink } from '@coreui/react'
import { useEffect, useState, React } from 'react'
import { NavLink } from 'react-router-dom'
import { AppFooter } from 'src/components'
import axios from 'axios';

const FindFoodBank = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5040/cmfb/foodBank/getAllFoodBanks`);
        const res = data?.data? data.data: data;
        console.log(res, data);
          const suggestion = res.filter(item => item.zipcode.includes(value.toLowerCase()) || item.province.includes(value.toLowerCase()));
          setSuggestions(suggestion);
          console.log(suggestion);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [value]);


  return (
    <>
      <CHeader position="sticky" className='bg-black'>
        <CContainer fluid>
          <CHeaderNav className="d-none d-md-flex me-auto">
            <CNavItem>
              <CNavLink to="/home" component={NavLink} className='logo font-bold font-white'>
                CMFB
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav>
            <a className="btn btn-custom font-bold font-white" href="/#/home">
              Home
            </a>
            <a className="btn btn-custom font-bold font-white" href="/#/donate-now">
              Donate Now
            </a>
            <a className="btn btn-custom font-bold font-white" href="/#/login">
              Login
            </a>
          </CHeaderNav>
        </CContainer>
      </CHeader>
      <CCol xs={12} className='bg-black p-0'>
        <div className="donate m-0" data-parallax="scroll" data-image-src="img/donate.jpg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="donate-content">
                  <div className="section-header">
                    <p>Find a Food Bank Near You</p>
                    <h2>Support and Nourishment for Those in Need!</h2>
                  </div>
                  <div className="donate-text">
                    <p>
                      Discover nearby food banks through our user-friendly platform, ensuring no one goes hungry. Whether you need assistance or want to contribute, join us in building a caring community together.                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="donate-form p-0">
                  <CForm>
                    <div className="control-group">
                      <input
                        type="text"
                        className="form-control"
                        value={value}
                        placeholder="Search food banks by Zip code or Province..."
                        onChange={(e) => {
                          setValue(e.target.value);
                        }}
                      />
                    </div>
                  </CForm>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-black borderNone'>
          {
            suggestions.length === 0 ? (
              <CCard className='noRecords'>
                <CCardBody>
                  No records found.
                </CCardBody>
              </CCard>
            ) :
              suggestions?.map((suggestion, i) => {
                return (<CCard key={i} className='foodBankCard'>
                  <CCardBody>
                    <div className="cardHeading">
                      <p>Food Bank</p>
                    </div>
                    <p><b>Address:</b> {suggestion.address}</p> 
                    <p><b>Zip Code:</b> {suggestion.zipcode}</p>
                    <p><b>Province:</b> {suggestion.province}</p>
                    <p className='m-0'><b>Helpline:</b> <a href="tel:`${suggestion.helpline}`">{suggestion.helpline}</a></p>
                  </CCardBody>
                </CCard>
                )
              }
              )}
        </div>
      </CCol>
      <AppFooter className={'m-0 borderNone'} isAdmin={false} />
    </>)
}

export default FindFoodBank
