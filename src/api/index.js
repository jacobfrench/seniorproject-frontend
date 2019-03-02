import { store } from "app/src/redux/store"; // use store.getState().authToken;
import { setAuthToken } from "app/src/redux/actions";

const url = "http://45.33.39.105:8080";
// const url = "http://192.168.1.15:8080";

const api = {


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


  updateUserLocation(data) {
      return new Promise((resolve, reject) =>
        fetch(url + '/users/update/user/' + data.id + '/lat/' + data.latitude + '/long/' + data.longitude + '/online/' + data.isOnline, {
          method: 'PATCH',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": store.getState().authToken
          },
        })
          .then((res) => res.json())
          .then(resJson => {
            resolve(resJson);
          })
      ).catch(err => console.error(err));
  },

  findBusinessesByDistance(data){
    return new Promise((resolve, reject) =>
    fetch(url + '/users/get/dist/lat/'+data.latitude+'/long/'+data.longitude+'/radius/'+data.radius+'/ind/'+data.industry, {
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
  ).catch(err => {reject(err)});
  }
};

export default api;
