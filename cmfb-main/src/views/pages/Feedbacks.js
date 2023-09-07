import React, { useEffect, useState } from "react";
import axios from "axios";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const URL = "http://localhost:5040/cmfb/feedback/getAllFeedBacks";

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
          setFeedbacks(data?.data? data?.data: data);
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
          <th>User</th>
          <th>Date</th>
          <th>Feedback</th>
        </tr>
      </thead>
      <tbody>
        { feedbacks.length !== 0?
        feedbacks.map((item, i) => (
          <tr key={i}>
            <td>{item.user_name}</td>
            <td>{new Date(item.feedback_date).toLocaleDateString()}</td>
            <td>{item.feedback_message}</td>
          </tr>
        )) : <p>No records found.</p>
        }
      </tbody>
    </table>
  );
};

export default Feedbacks;
