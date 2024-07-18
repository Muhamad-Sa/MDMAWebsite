import {
  getUserData,
  updateUserData,
  updateUserEmail,
  updateUserPassword,
  getCurrentUser,
  signOutUser,
  onAuthChange,
  uploadProfilePicture,
  updateUserProfilePicture,
  checkAuthState,
} from "./auth.js";

// Fetch and populate user data
window.onload = function () {
  checkAuthState();
  onAuthChange(async (user) => {
    if (user) {
      const userData = await getUserData(user.uid);
      if (userData) {
        document.getElementById("username").value = userData.fullName || "";
        document.getElementById("email").value = userData.email || "";
        document.getElementById("phone").value = userData.phone || "";
        if (userData.profilePicture) {
          document.getElementById("profile-pic").src = userData.profilePicture;
        } else {
          document.getElementById("profile-pic").src =
            "../Html/images/mariam.jpeg";
        }
      } else {
        console.log("No such document!");
      }
    } else {
      window.location.href = "../Html/Login.html";
    }
  });
};

// Update user profile
document
  .getElementById("profile-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const user = getCurrentUser();
    if (user) {
      const fullName = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const oldPassword = document.getElementById("old-password").value;
      const newPassword = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const fileInput = document.getElementById("file-input");
      const file = fileInput.files[0];

      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match");
        return;
      }

      try {
        let downloadURL;
        if (file) {
          downloadURL = await uploadProfilePicture(file, user.uid);
          await updateUserProfilePicture(user.uid, downloadURL);
        }

        await updateUserData(user.uid, {
          fullName: fullName,
          email: email,
          phone: phone,
          ...(downloadURL && { profilePicture: downloadURL }),
        });

        if (email !== user.email) {
          await updateUserEmail(user, email);
        }
        if (newPassword) {
          await updateUserPassword(user, newPassword);
        }

        alert("Profile updated successfully");
        if (downloadURL) {
          document.getElementById("profile-pic").src = downloadURL;
        }
      } catch (error) {
        console.error("Error updating profile: ", error);
        alert("Error updating profile: " + error.message);
      }
    }
  });

// Logout function
document.querySelector(".delete-btn").addEventListener("click", async () => {
  await signOutUser();
  window.location.href = "../Html/Login.html";
});
