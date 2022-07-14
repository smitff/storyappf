import * as React from 'react';
import {CommonActions, StackActions} from '@react-navigation/native';


export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}
function popToTop() {
  navigationRef.current?.popToTop();
}

// function reset(value) {
//   navigationRef.current.dispatch(
//     CommonActions.reset({
//       index: 1,
//       routes: [
//         {name: 'Login'},
//         {name: 'Singup'},
//         {name: 'ForgotPassword'},

//         // {
//         //   name: 'Profile',
//         // },
//       ],
//     }),
//   );
// }

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}

export default {
  navigate,
  goBack,
  popToTop,
//   reset,
  push,
};
