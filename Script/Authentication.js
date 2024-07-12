const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwField = document.querySelectorAll(".password");

      function validateForm() {
            const email = document.getElementById('email');
            const password = document.getElementById('password');

            if (!email.value) {
                alert('Please fill out the email field.');
                email.focus();
                return false;
            }

            if (!password.value) {
                alert('Please fill out the password field.');
                password.focus();
                return false;
            }

            // If everything is filled out correctly, submit the form.
            document.getElementById('loginForm').submit();
        }

         function validateSignupForm() {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            const terms = document.getElementById('terms');

            if (!name.value) {
                alert('Please fill out the name field.');
                name.focus();
                return false;
            }

            if (!email.value) {
                alert('Please fill out the email field.');
                email.focus();
                return false;
            }

            if (!password.value) {
                alert('Please fill out the password field.');
                password.focus();
                return false;
            }

            if (!confirmPassword.value) {
                alert('Please confirm your password.');
                confirmPassword.focus();
                return false;
            }

            if (password.value !== confirmPassword.value) {
                alert('Passwords do not match.');
                confirmPassword.focus();
                return false;
            }

            if (!terms.checked) {
                alert('You must accept the terms and conditions.');
                terms.focus();
                return false;
            }

            // If everything is filled out correctly, submit the form.
            document.getElementById('signupForm').submit();
        }

// show/hide password

     pwShowHide.forEach(eyeIcon=>{
     	eyeIcon.addEventListener("click",()=>{
     		pwField.forEach(pwField=>{

     			if(pwField.type === "password"){
     				pwField.type = "text";

     				pwShowHide.forEach(icon=>{
     					icon.classList.replace("uil-eye-slash","uil-eye");

     				})


     			}else{
     				pwField.type = "password";
     				pwShowHide.forEach(icon=>{
     					icon.classList.replace("uil-eye","uil-eye-slash");

     				})

     			}

     		})

     	})




     })








     document.addEventListener('DOMContentLoaded', () => {
        function handleSignUp(event) {
            event.preventDefault(); // Prevent default form submission

            // Collect form data
            const username = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            // Basic form validation (customize as needed)
            if (username === '' || email === '' || password === '') {
                alert('Please fill out all fields.');
                return;
            }

            // Create user object
            const newUser = {
                name: username,
                email: email,
                password: password
            };

            // Retrieve existing users data from localStorage
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Assign a unique ID to the new user
            newUser.id = users.length > 0 ? users[users.length - 1].id + 1 : 0;

            // Add the new user to the array
            users.push(newUser);

            // Save updated users data back to localStorage
            localStorage.setItem('users', JSON.stringify(users));

            // Reset the form fields
            document.getElementById('signupForm').reset();

            // Redirect to profile.html after successful signup
            window.location.href = 'profile.html';

            // Provide feedback to the user (optional)
            alert('Sign up successful!');
        }

        // Attach the event handler to the button
        document.querySelector('.input-field.button input[type="button"]').addEventListener('click', handleSignUp);
    });