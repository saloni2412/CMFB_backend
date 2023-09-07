/* eslint-disable react/no-unescaped-entities */
import {
  CCarouselCaption,
  CCarouselItem,
  CRow,
  CCol,
  CContainer,
  CHeader,
  CHeaderNav,
  CNavItem,
  CNavLink,
  CCarousel,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppFooter } from 'src/components'
import Carousel1 from 'src/assets/images/carousel-1.jpg'
import Carousel2 from 'src/assets/images/carousel-2.jpg'
import Carousel3 from 'src/assets/images/carousel-3.jpg'
import AboutImg from 'src/assets/images/about.jpg'
import Contact from 'src/assets/images/contact.jpg'
import axios from 'axios'
import Snackbar from './Snackbar'

const Home = (props) => {
  const [logoutVal, setLogoutVal] = useState(false);
  const history = useNavigate();
  const [formData, setFormData] = useState({
    feedback_message: '',
    feedback_date: new Date(),
    email: '',
    user_name: '',
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const localStorageData = localStorage.getItem('userData');
    if (localStorageData) {
      setLogoutVal(true);
      setFormData({...formData, user_name: JSON.parse(localStorageData).name, email: JSON.parse(localStorageData).email })
    }
  }, []);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const logout = () => {
    localStorage.clear();
    history('/login')
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const requestData = {
        feedback_message: formData.feedback_message,
        feedback_date: new Date(),
        user_name: formData.user_name,
        email: formData.email,
      }

      axios.post('http://localhost:5040/cmfb/feedback/feedBack', requestData).then((response) => {
        console.log(response)
        if (response) {
          setFormData({
            feedback_message: '',
            feedback_date: new Date(),
            user_name: '',
            email: ''
          });
          setSnackbarMessage('Feedback sent Successfully!');
          setShowSnackbar(true);
        }
      })
    } catch (error) {
      console.error('Error registering user', error)
    }
  }

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
            <a className="btn btn-custom font-bold font-white" href="/#/find-food-bank">
              Find Food Bank
            </a>
            <a className="btn btn-custom font-bold font-white" href="/#/donate-now">
              Donate Now
            </a>
            {logoutVal ? (
              <a className="btn btn-custom font-bold font-white" onClick={logout}>
                Logout
              </a>
            ) :
              (
                <a className="btn btn-custom font-bold font-white" href="/#/login">
                  Login
                </a>
              )}

          </CHeaderNav>
        </CContainer>
      </CHeader>
      <CRow>
        <CCol xs={12}>
          <CCarousel controls transition="crossfade" classname="carousel">
            <CCarouselItem className="carousel-item">
              <div className="carousel-img">
                <img className="c-block h-100" src={Carousel1} alt="slide 1" />
              </div>
              <CCarouselCaption className="d-none d-md-block carousel-text">
                <h1>Solving Hunger Today, Ending hunger Tomorrow</h1>
                <p>
                  Join our mission to combat hunger and nourish communities across Canada. Access
                  nutritious food and make a difference today!
                </p>
                <div className="carousel-btn">
                  <a className="btn btn-custom" href="/#/donate-now">
                    Donate Now
                  </a>
                </div>
              </CCarouselCaption>
            </CCarouselItem>
            <CCarouselItem>
              <div className="carousel-img">
                <img className="d-block w-100 h-100" src={Carousel2} alt="slide 2" />
              </div>
              <CCarouselCaption className="d-none d-md-block carousel-text">
                <h1>Empowering Communities with Food</h1>
                <p>
                  Join us in creating a hunger-free future. Together, we can make a positive impact,
                  one meal at a time.
                </p>
                <div className="carousel-btn">
                  <a className="btn btn-custom" href="/#/donate-now">
                    Donate Now
                  </a>
                </div>
              </CCarouselCaption>
            </CCarouselItem>
            <CCarouselItem>
              <div className="carousel-img">
                <img className="d-block w-100" src={Carousel3} alt="slide 3" />
              </div>
              <CCarouselCaption className="d-none d-md-block carousel-text">
                <h1>Accessible Food Support for All</h1>
                <p>
                  We're here to ensure no one goes hungry. Join us in providing accessible and
                  inclusive food support across Canada.
                </p>
                <div className="carousel-btn">
                  <a className="btn btn-custom" href="/#/donate-now">
                    Donate Now
                  </a>
                </div>
              </CCarouselCaption>
            </CCarouselItem>
          </CCarousel>
        </CCol>
        <CCol xs={12}>
          <div className="about">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <img className="about-img" src={AboutImg} alt="about" />
                </div>
                <div className="col-lg-6">
                  <div className="section-header">
                    <p>Learn About Us</p>
                    <h2>Canada Mobile Food Bank Online - Non-profit charity organization</h2>
                  </div>
                  <div className="about-tab">
                    <div className="tab-content">
                      <div>
                        Canada Mobile Food Bank is on a mission to combat hunger across Canada. With
                        our dedicated team and community support, we provide nutritious food to
                        those in need. Together, we strive for a hunger-free future, offering
                        additional resources and support to empower individuals and families. Join
                        us in making a positive impact in our community today!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CCol>
        <CCol xs={12}>
          <div className="service">
            <div className="container">
              <div className="section-header text-center">
                <p>What We Do?</p>
                <h2>We believe that we can save more lifes with you</h2>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="service-item">
                    <div className="service-text">
                      <h3>Healthy Food</h3>
                      <p>
                        Nutrition for All: Ensuring access to nourishing food options, promoting
                        health and well-being.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="service-item">
                    <div className="service-text">
                      <h3>Pure Water</h3>
                      <p>
                        Clean Water for All: Delivering safe and pure drinking water, promoting
                        hydration and better health.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="service-item">
                    <div className="service-text">
                      <h3>Social Care</h3>
                      <p>
                        Empowering Communities: Providing essential support and services to foster
                        well-being and belonging.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CCol>
        <CCol xs={12}>
          <div className="donate" data-parallax="scroll" data-image-src="img/donate.jpg">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-12">
                  <div className="donate-content">
                    <div className="section-header text-center">
                      <p>Donate Now</p>
                      <h2>Change Lives, Donate Today!</h2>
                    </div>
                    <div className="donate-text">
                      <p>
                        Your generosity can make a difference. Support Canada Mobile Food Bank in
                        providing essential resources to those in need. Together, we can build a
                        brighter future for all. Click the button on the right to donate and create
                        positive change. Thank you for your support!
                      </p>
                    </div>
                    <div className="text-center" >
                      <a className="btn btn-custom font-bold font-white" href="/#/donate-now">
                        Donate Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CCol>
        <CCol xs={12}>
          <div className="volunteer" data-parallax="scroll" data-image-src="img/volunteer.jpg">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-5">
                  <div className="volunteer-form">
                    <form>
                      <div className="control-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          required="required"
                        />
                      </div>
                      <div className="control-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          required="required"
                        />
                      </div>
                      <div className="control-group">
                        <textarea
                          className="form-control"
                          placeholder="Why you want to become a volunteer?"
                          required="required"
                        ></textarea>
                      </div>
                      <div>
                        <button className="btn btn-custom" type="submit">
                          Become a volunteer
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="volunteer-content">
                    <div className="section-header">
                      <p>Become A Volunteer</p>
                      <h2>Make a Difference Today!</h2>
                    </div>
                    <div className="volunteer-text">
                      <p>
                        Join our dedicated team at Canada Mobile Food Bank and apply as a volunteer.
                        Your time and skills can help fight hunger and create a stronger, more
                        caring community. Fill out the form on the left to learn more about
                        volunteer opportunities and start making a positive impact in the lives of
                        others. Thank you for your willingness to help!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CCol>
        <CCol xs={12}>
          <div className="testimonial">
            <div className="container">
              <div className="section-header text-center">
                <p>Testimonial</p>
                <h2>What people are talking about our charity activities</h2>
              </div>
              <div className="owl-carousel testimonials-carousel">
                <div className="testimonial-item">
                  <div className="testimonial-profile">
                    <div className="testimonial-name">
                      <h3>John D.</h3>
                      <p>Convenient and quality food support! Grateful for Canada Mobile Food Bank.</p>
                    </div>
                  </div>
                </div>
                <div className="testimonial-item">
                  <div className="testimonial-profile">
                    <div className="testimonial-name">
                      <h3>Jennifer K.</h3>
                      <p>Volunteering here is rewarding and inspiring. Proud to be part of this team.</p>
                    </div>
                  </div>
                </div>
                <div className="testimonial-item">
                  <div className="testimonial-profile">
                    <div className="testimonial-name">
                      <h3>David L.</h3>
                      <p>Every dollar counts. Together, we make a hunger-free Canada.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CCol>
        <CCol xs={12}>
          <div className="contact">
            <div className="container">
              <div className="section-header text-center">
                <p>We Value Your Feedback</p>
                <h2>Share Your Thoughts with Us</h2>
              </div>
              <div className="contact-img">
                <img src={Contact} alt="contact" />
              </div>
              <div className="contact-form">
                <div id="success"></div>
                <form name="sentMessage" id="contactForm" onSubmit={handleSubmit}>
                  <div className="control-group">
                    <input
                      type="text"
                      name='user_name'
                      className="form-control"
                      id="user_name"
                      placeholder="Your Name"
                      required="required"
                      value={formData.user_name}
                      onChange={handleChange}
                      readOnly={logoutVal}
                      data-validation-required-message="Please enter your name"
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="control-group">
                    <input
                      type="email"
                      name='email'
                      className="form-control"
                      id="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required="required"
                      readOnly={logoutVal}
                      data-validation-required-message="Please enter your email"
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="control-group">
                    <textarea
                      className="form-control"
                      id="feedback_message"
                      name='feedback_message'
                      placeholder="Message"
                      value={formData.feedback_message}
                      onChange={handleChange}
                      required="required"
                      data-validation-required-message="Please enter your message"
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div>
                    <button className="btn btn-custom" type="submit" id="sendMessageButton">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
      {showSnackbar && (
        <Snackbar message={snackbarMessage} onClose={handleCloseSnackbar} />
      )}
      <AppFooter isAdmin={false} />
    </>
  )
}

export default Home
