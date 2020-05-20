import {
  CHANGE_USER_INFO,
  CHANGE_SENT_STATUS,
  CHANGE_LOGIN_STATUS,
  LOGIN_BY_PHONE,
  LOGIN_BY_VCODE,
  SENT_VCODE
} from "./constants";

export const saveUserInfo = payload => ({
  type: CHANGE_USER_INFO,
  payload
});

export const saveSentStatus = payload => ({
  type: CHANGE_SENT_STATUS,
  payload
});

export const saveLoginStatus = payload => ({
  type: CHANGE_LOGIN_STATUS,
  payload
});

export const loginByPhone = (phone, password) => ({
  type: LOGIN_BY_PHONE,
  payload:{
    phone,
    password
  }
})
// {
//   return dispatch => {
//     loginByPhoneRequest(phone, password)
//       .then(res => {
//         dispatch(saveUserInfo(res));
//       })
//       .catch(() => {
//         console.log("登录失败！");
//       });
//   };
// };

export const loginByVcode = (phone, vcode) => ({
  type: LOGIN_BY_VCODE,
  payload:{
    phone,
    captcha:vcode
  }
})
// {
//   return dispatch => {
//     loginByVcodeRequest(phone, vcode)
//       .then(res => {
//         if (res.code === 200) {
//           dispatch(saveUserInfo(res));
//           dispatch(saveLoginStatus(true));
//         }
//       })
//       .catch(() => {
//         console.log("登录失败！");
//       });
//   };
// };

export const sentVcode = phone => ({
  type: SENT_VCODE,
  payload: {
    phone
  }
})
// {
//   return dispatch => {
//     sentVcodeRequest(phone)
//       .then(res => {
//         if (res.code === 200) {
//           dispatch(saveSentStatus(true));
//         }
//       })
//       .catch(() => {
//         console.log("请求失败！");
//       });
//   };
// };
