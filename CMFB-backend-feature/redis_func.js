const express = require("express");
const router = express.Router();
const axios = require("axios");
const ioredis_client = require("./index");

const upstashURL = "https://correct-civet-35597.upstash.io";
const apiKey =
  "AYsNACQgOTZhM2Y3YzAtNTkzNS00OWI0LTk0MjgtOGYyZWI5YWFhOWI0ZWE2MTRiM2M4NzIyNDRlYmFlNzIyOWY3NmY1YTU5MTU=";

  const expiresToSeconds = (expires) => {
    now : new Date();
    expiresDate = new Date(expires);
    secondsDelta = expiresDate.getSeconds() - now.getSeconds();
    return secondsDelta < 0 ? 0 : secondsDelta;
  };

class Redis {
  getRedisData = async (key) => {
    return await axios
      .get(`${upstashURL}/get/${key}`, {
        headers: {
          Authorization:
            "Bearer AosNACQgOTZhM2Y3YzAtNTkzNS00OWI0LTk0MjgtOGYyZWI5YWFhOWI0Lc4H2xpQwO__Psj8Sj7OjDyDmAzayq1WV7umI0H2LpI=",
        },
      })
      .then((response) => 
      {
        return response.data
    })
  };

  setRedisData = async (key, data) => {
    // return
    //${data}
    await axios
      .get(`${upstashURL}/set/${key}/${data}`, {
        headers: {
          Authorization:
            "Bearer AYsNACQgOTZhM2Y3YzAtNTkzNS00OWI0LTk0MjgtOGYyZWI5YWFhOWI0ZWE2MTRiM2M4NzIyNDRlYmFlNzIyOWY3NmY1YTU5MTU=",
        },
      })
      .then((response) => 
      {
        console.log(response.data + "in then");
        return response.data
    })
      .then((data) => {
        console.log(data + "in 2nd then");
        return data;
      });
  };

  deleteKey = (key) => {
    axios.get(`${upstashURL}/del/${key}`, {
      // method: "post",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then(response => {
        console.log('Data deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  }
}

module.exports = Redis;
