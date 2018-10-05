import { store } from "app/src/redux/store"; // use store.getState().authToken;
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
          //request data is in json form here
          resolve(responseJson);
        })
    ).catch(err => {
      reject(err);
    });
  },

  postNewBusiness(info){
    fetch(url + 'business/post', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": store.getState().authToken
      },
      body: JSON.stringify({
        name: info.name,
        address: info.address,
        phoneNum: info.phoneNum,
        email: info.email
      })
    })
      .then(res => alert(res))
      .catch(err => alert(err));

  }
};

export default api;
