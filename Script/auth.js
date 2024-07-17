import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, updateEmail, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";


const firebaseConfig = {
    apiKey: "AIzaSyAI2biadXTMqIsDkNq6Kt7DgtUseAO-qaA",
    authDomain: "mdma-iti.firebaseapp.com",
    projectId: "mdma-iti",
    storageBucket: "mdma-iti.appspot.com",
    messagingSenderId: "837004723438",
    appId: "1:837004723438:web:dff62dac42f418ffda9fff",
    measurementId: "G-60E0J8KQTJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export const signUp = async (name, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
            fullName: name,
            email: email
        });
        alert('User signed up successfully');
        window.location.href = '../Html/user.html';
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error('Error:', error.code, error.message);
    }
};

export const login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('User signed in successfully');
            window.location.href = "../index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(`Error: ${errorMessage}`);
        });
};


export const logout = async () => {
    try {
        await signOut(auth);
        alert('User logged out successfully');
        window.location.href = '../index.html';
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error('Error:', error.code, error.message);
    }
};

export const checkAuthState = () => {
    onAuthStateChanged(auth, async (user) => {
        const authLink = document.getElementById('auth-link');
        if (user) {
            authLink.textContent = 'Logout';
            authLink.href = '#';
            authLink.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        } else {
            authLink.textContent = 'Login/Register';
            authLink.href = '../Html/Login.html';
        }
    });
};

export const forgetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        window.location.href = '../Html/forgetpassword-done.html';
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error('Error:', error.code, error.message);
    }
};

// Function to upload profile picture
export async function uploadProfilePicture(file, uid) {
    const storageRef = ref(storage, `profile_pictures/${uid}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
}

// Function to update user profile picture URL in Firestore
export async function updateUserProfilePicture(uid, downloadURL) {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, { profilePicture: downloadURL });
}

// Function to get user data
export async function getUserData(uid) {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data() : null;
}

// Function to update user data
export async function updateUserData(uid, data) {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, data);
}

// Function to update email
export async function updateUserEmail(user, email) {
    await updateEmail(user, email);
}

// Function to update password
export async function updateUserPassword(user, password) {
    await updatePassword(user, password);
}

// Function to get the current authenticated user
export function getCurrentUser() {
    return auth.currentUser;
}

// Function to sign out
export async function signOutUser() {
    await signOut(auth);
}

// Function to listen for auth state changes
export function onAuthChange(callback) {
    onAuthStateChanged(auth, callback);
}