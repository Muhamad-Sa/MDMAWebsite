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
