const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

const username = document.getElementById('username');
const password = document.getElementById('password');

const cpassword = document.getElementById('confirmPassword');
const cusername = document.getElementById('cusername');

if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!username.value || !password.value) {
      alert('Please fill in all fields');
      return;
    }
    const data = {
      username: username.value,
      password: password.value
    };
    try {
    
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      const result = await res.json();
      console.log('Login successful:', result);
      localStorage.setItem('token', result.access_token);
      window.location.href = './client/index.html ';

    } catch (err) {
      console.error(err);
      alert('Invalid email or password. Please try again.');
    }
  });
}


// Signup Form Handler
// if (signupForm) {
//   signupForm.addEventListener('submit', async function (e) {
//     e.preventDefault();

//     if (password.value !== cpassword.value) {
//       alert('Passwords do not match');
//       return;
//     }

//     const data = {
//       email: email.value,
//       password: password.value,
//       username: username.value
//     };

//     try {
//       const res = await fetch('https://6874d57add06792b9c95705b.mockapi.io/api/v1/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });

//       if (!res.ok) {
//         throw new Error('Signup failed');
//       }

//       const result = await res.json();
//       console.log('Signup successful:', result);
//       alert('Signup successful! Please log in.');
//       window.location.href = '../index.html';
//     } catch (err) {
//       console.error(err);
//       alert('Something went wrong during signup.');
//     }
//   });
// }
