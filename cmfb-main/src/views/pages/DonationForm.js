import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CCol, CContainer, CHeader, CHeaderNav, CNavItem, CNavLink } from '@coreui/react';
import { AppFooter } from 'src/components';
import { NavLink, useNavigate } from 'react-router-dom';
import './../../scss/donationForm.scss'
import Snackbar from './Snackbar';
const DonationForm = () => {
    const [amount, setAmount] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [logoutVal, setLogoutVal] = useState(false);

    const history = useNavigate()

    useEffect(() => {
        const localStorageData = localStorage.getItem('userData');
        if (localStorageData) {
            setLogoutVal(true);
            setEmail(JSON.parse(localStorageData).email)
            setUsername(JSON.parse(localStorageData).name)
        }
    }, []);

    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
    };
    const stripe = useStripe();
    const elements = useElements();

    const handleDonation = async (e) => {
        e.preventDefault();
        setLoading(true);

        const cardElement = elements.getElement(CardElement);
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error('Error creating payment method:', error);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5040/cmfb/donation/donate', {
                amount: parseFloat(amount),
                username,
                email,
                paymentMethodId: paymentMethod.id,
            });

            if (response.status === 201) {
                setSnackbarMessage('Donation successful!');
                setShowSnackbar(true);
                setTimeout(() => {
                    history('/home')
                }, 2000);

            } else {
                setSnackbarMessage('Donation failed!');
                setShowSnackbar(true);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error processing donation:', error);
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.clear();
        history('/login')
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
                        <a className="btn btn-custom font-bold font-white" href="/#/home">
                            Home
                        </a>
                        <a className="btn btn-custom font-bold font-white" href="/#/find-food-bank">
                            Find Food Bank
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
            <CCol xs={12} className='bg-black p-0'>
                <div className="donate m-0" data-parallax="scroll" data-image-src="img/donate.jpg">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-7">
                                <div className="donate-content">
                                    <div className="section-header">
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
                                </div>
                            </div>
                            <div >
                                <form className="donation-form" onSubmit={handleDonation}>
                                    <div className="form-group">
                                        <label htmlFor="amount">Amount:</label>
                                        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                    </div>
                                    {/* <div className="form-group">
                                        <label htmlFor="date">Date:</label>
                                        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                    </div> */}
                                    <div className="form-group">
                                        <label htmlFor="username">Name:</label>
                                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} readOnly={logoutVal}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={logoutVal} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="card-element">Card Details:</label>
                                        <CardElement id="card-element" />
                                    </div>
                                    <button className="submit-btn btn-dark btn btn-custom" type="submit" disabled={loading}>Donate</button>
                                </form>
                                {showSnackbar && (
                                    <Snackbar message={snackbarMessage} onClose={handleCloseSnackbar} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </CCol>
            <AppFooter className={'m-0 borderNone'} isAdmin={false} />
        </>
    );
};

export default DonationForm;
