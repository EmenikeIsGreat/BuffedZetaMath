// const axios = require('axios');

// // Function to test the login route
// async function testLoginRoute() {
//   try {
//     const response = await axios.post('http://localhost:3000/login', {
//       username: 'exampleUser',
//       password: 'examplePassword'
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.error(error.response.data);
//   }
// }

// // Function to test the sign-up route
// async function testSignupRoute() {
//   try {
//     const response = await axios.post('http://localhost:3000/signup', {
//       username: 'newUser1',
//       password: 'newPassword1'
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.error(error.response.data);
//   }
// }

// // Call the functions to test the routes
// //testLoginRoute();
// // testSignupRoute();

// // Login data
// const loginData = {
//   username: 'exampleUser',
//   password: 'examplePassword'
// };

// // POST request to the login endpoint with the necessary headers
// axios.post('https://us-east-1.aws.data.mongodb-api.com/app/data-hrrjy/endpoint/login', loginData, {
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
//   .then((response) => {
//     // Handle the successful response here
//     console.log(response.data); // This will log the user data if the login is successful
//   })
//   .catch((error) => {
//     // Handle any errors here
//     console.error(error);
//   });



function generateProblems() {
  let res = [];
  for (let i = 0; i < 6000; i++) {
      let operation = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)];
      let num1, num2, answ;

      switch (operation) {
          case "+":
              num1 = Math.floor(Math.random() * 99 + 2);
              num2 = Math.floor(Math.random() * 99 + 2);
              res.push([num1, "+", num2, num1 + num2]);
              break;
          case "-":
              num1 = Math.floor(Math.random() * 99 + 2);
              num2 = Math.floor(Math.random() * 99 + 2);
              answ = Math.random() >= 0.5 ? num1 : num2;
              res.push([num1 + num2, "-", num1 + num2 - answ, answ]);
              break;
          case "*":
              num1 = Math.floor(Math.random() * 11 + 2);
              num2 = Math.floor(Math.random() * 99 + 2);
              res.push([num1, "*", num2, num1 * num2]);
              break;
          case "/":
              num1 = Math.floor(Math.random() * 11 + 2);
              num2 = Math.floor(Math.random() * 99 + 2);
              answ = Math.random() >= 0.5 ? num1 : num2;
              res.push([num1 * num2, "/", num1, num2]);
              break;
      }

  
  }
  return res

}

console.log(generateProblems())