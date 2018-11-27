import { store } from "app/src/redux/store"; // use store.getState().authToken;
import { Platform, ToastAndroid } from 'react-native';
import { setAuthToken } from "app/src/redux/actions";

const url = "http://45.33.39.105:8080";

const api = {
  createNewUser(user) {
    fetch(url + "/users/sign-up", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName
      })
    });
  },

  login(email, password) {
    return new Promise((resolve, reject) =>
      fetch(url + "/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      })
        .then(res => {
          if (res.ok) {
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

  postNewBusiness(info, userId) {
    return new Promise((resolve, reject) =>
      fetch(url + '/business/post/' + userId, {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": store.getState().authToken
        },
        body: JSON.stringify(info)
      })
        .then((res) => res.json())
        .then(resJson => {
          resolve(resJson);
        })
    ).catch(err => console.error(err));

  },

  updateBusiness(info) {
    return new Promise((resolve, reject) =>
      fetch(url + '/business/update', {
        method: 'PUT',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": store.getState().authToken
        },
        body: JSON.stringify(info)
      })
        .then((res) => res.json())
        .then(resJson => {
          resolve(resJson);
        })
    ).catch(err => console.error(err));

  },

  postNewMenu(newItem, userId) {
    return new Promise((resolve, reject) =>
      fetch(url + '/business/post/menu/' + userId, {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": store.getState().authToken
        },
        body: JSON.stringify({
          title: newItem.title,
          description: newItem.description,
          imageUrl: newItem.imageUrl
        })
      })
        .then((res) => res.json())
        .then(resJson => {
          resolve(resJson);
        })
    ).catch(err => {
      reject(err);
    });
  },

  getBusinessByUserId(ownerId) {
    return new Promise((resolve, reject) =>
      fetch(url + '/business/get/owner/' + ownerId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': store.getState().authToken
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

  getMenusByUserId(ownerId) {
    return new Promise((resolve, reject) =>
      fetch(url + '/business/get/menus/' + ownerId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': store.getState().authToken
        }
      })
        .then(response => response.json())
        .then(responsJson => {
          resolve(responsJson);
        })
    ).catch(err => {

      reject(err);
    });
  },

};





export default api;
