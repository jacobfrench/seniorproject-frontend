import { store } from "app/src/redux/store"; // use store.getState().authToken;
import { setAuthToken } from "../actions";
import Axios from 'axios';

const url = "http://45.33.39.105:8080"; //TODO: get ip from upper level component.
const axios = Axios.create({
  baseURL: url,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": store.getState().authToken
  }
});

const api = {

  createNewUser(user) {
    axios.post('/users/sign-up', user);
  },

  login(email, password){
    return new Promise((resolve, reject) =>
      axios.post("/login", {
          username: email,
          password: password
        })
        .then(res => {
          if (res.data.ok) {
            let jwtToken = res.headers.map.authorization[0];
            store.dispatch(setAuthToken(jwtToken));
          } else {
            store.dispatch(setAuthToken(""));
          }
          resolve();
        })
        .catch(error => reject(error))
    );
  },

  fetchUserInfoByEmail(email) {
    return new Promise((resolve, reject) =>
      fetch(url + "/users/get/email/" + email, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": store.getState().authToken
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
        })
    ).catch(err => {
      reject(err);
    });
  },

};

export default api;
