const app = require("../app");
const express = require("express");
const axios = require("./axios");

exports.home = async (req, res) => {
  var status = [];
  const home = await axios
    .get("/")
    .then((home) => {
      if (home.status == 200) {
        status.push({ home: { status: "ok" } });
      }
    })
    .catch((err) => {
      console.log(err.response.status);
      status.push({ home: { status: "down" } });
    });
  const loginPage = await axios({
    method: "POST",
    url: "/api/v1/auth/login",
    data: {
      email: "onijlo@mal.com",
      password: "Password",
    },
  }).then((response) => {
      if (response.status != 404) {
        status.push({ loginPage: { status: "ok" } });
      }
    })
    .catch((err) => {
      console.log(err.response.status);
      status.push({ loginPage: { status: "down" } });
    });

    const sendAudio = await axios
      .post("/api/v1/sendAudio")
      .then((sendAudio) => {
        if (sendAudio.status != 404) {
          status.push({ sendAudio: { status: "ok" } });
        }
      })
      .catch((err) => {
        console.log(err.response.status);
        status.push({ sendAudio: { status: "down" } });
      });

      const logoutPage = await axios
        .get("/api/v1/auth/logout")
        .then((response) => {
          if (response.status == 200) {
            status.push({ logoutPage: { status: "ok" } });
          }
        })
        .catch((err) => {
          console.log(err.response.status);
          status.push({ logoutPage: { status: "down" } });
        });

        const test = await axios
          .get("/api/v1/test")
          .then((response) => {
            if (response.status == 200) {
              status.push({ testPage: { status: "ok" } });
            }
          })
          .catch((err) => {
            console.log(err.response.status);
            status.push({ testPage: { status: "down" } });
          });

  return res.status(200).send(status);
};
