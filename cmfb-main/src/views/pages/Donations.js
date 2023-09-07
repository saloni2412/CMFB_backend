import React, { useEffect, useState } from "react";
import axios from "axios";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const URL = "http://localhost:5040/cmfb/donation/getAllDonations";

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
          setDonations(data?.data? data.data: data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  };

  return (
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {donations.length !== 0 ?
          donations.map((item, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{item.user_name}</td>
              <td>${item.donation_amount? item.donation_amount: '10'}</td>
              <td>{new Date(item.donation_datetime).toLocaleDateString()}</td>
            </tr>
          )) : <p>No records found.</p>
        }
      </tbody>
    </table>
  );
};
export default Donations;
