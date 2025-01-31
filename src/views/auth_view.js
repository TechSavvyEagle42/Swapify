import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../utils/firebase/database'
import { allUserCollectionReference } from '../utils/firebase/database'
import { setDoc } from 'firebase/firestore'

const renderAuth = {
  render: async () => {
    // Add event listener for the button click inside the render method
    document.addEventListener('click', handleGoogleLoginButtonClick)

    return /*html*/ ` 
    <div class = "landing-page">
    <div class = "landing-top">
    <img src="https://firebasestorage.googleapis.com/v0/b/scent-danielle.appspot.com/o/asset%2Fswapify-logo.png?alt=media&token=f02f4f47-c419-491d-891c-4bae54755b90" class="landing-logo">
    <button class="google-login-button">Sign in with Google</button>
    </div>
    <div class="landing-content">
    <div class="landing-left">
    <div class="landing-left-top">
    Uncover Surprises: Explore Every Swipe!
    </div>
    <div class="landing-left-bottom">
    Simplify the process of trading goods with ease and convenience. Say goodbye to complexity and hello to seamless item exchange.
    </div >
    </div>
    <div class="landing-right">

    <div class="card-item-container-landing">
          <div class="item-info-container-landing">
              <div class="author-avatar-div">
                  <img class="author-avatar-img" src="https://firebasestorage.googleapis.com/v0/b/scent-danielle.appspot.com/o/asset%2Favatar.png?alt=media&token=74b96a45-d0f0-4650-9361-b1d810422e0a">
                  <p class="item-author">Juan Dela Cruz</p>
              </div>
              <div class="item-info-landing">
                <div class="item-pic-landing">           
                    <div class="slider">
                        <div class="slides">
                            <div class="slide"><img src="https://firebasestorage.googleapis.com/v0/b/scent-danielle.appspot.com/o/asset%2Fcar1.png?alt=media&token=97d065fd-53bc-47bd-813a-e7cc4e89103e" alt="Image 1"></div>
                            <div class="slide"><img src="https://firebasestorage.googleapis.com/v0/b/scent-danielle.appspot.com/o/asset%2Fhouse2.png?alt=media&token=7c2405dc-1cc2-448c-9ac4-6389d3d7c9bd" alt="Image 2"></div>
                            <div class="slide"><img src="https://firebasestorage.googleapis.com/v0/b/scent-danielle.appspot.com/o/asset%2Fjeep.png?alt=media&token=5cb05356-cfcd-49e8-af6a-a622f2266bce" alt="Image 3"></div>
                            <div class="slide"><img src="https://firebasestorage.googleapis.com/v0/b/scent-danielle.appspot.com/o/asset%2Fmotor1.png?alt=media&token=64a0537e-3499-4534-ac78-807fed2ef66e" alt="Image 4"></div>
                            <div class="slide"><img src="https://firebasestorage.googleapis.com/v0/b/scent-danielle.appspot.com/o/asset%2Ftoyota.png?alt=media&token=6f496a63-29ed-4880-b213-72322af3e63b" alt="Image 5"></div>
                            <div class="slide"><img src="https://firebasestorage.googleapis.com/v0/b/scent-danielle.appspot.com/o/asset%2Fyamaha_motor.png?alt=media&token=d7df5990-24d1-496e-9a10-fb46d0ef1ff8" alt="Image 6"></div>
                            <div class="slide"><img src="https://firebasestorage.googleapis.com/v0/b/scent-danielle.appspot.com/o/asset%2Fraptor.png?alt=media&token=9caba5a9-2ad8-4604-8df9-7765e4fbd668" alt="Image 7"></div>
                            <div class="slide"><img src="https://firebasestorage.googleapis.com/v0/b/scent-danielle.appspot.com/o/asset%2Fmotor2.png?alt=media&token=b51f107b-1307-45ad-819e-13636f2c654e" alt="Image 8"></div>
                            <div class="slide"><img src="https://firebasestorage.googleapis.com/v0/b/scent-danielle.appspot.com/o/asset%2Fhourse.png?alt=media&token=14996a73-9575-4c8f-a5e7-a3402f0a1640" alt="Image 9"></div>
                            <div class="slide"><img src="https://firebasestorage.googleapis.com/v0/b/scent-danielle.appspot.com/o/asset%2Fcar2.png?alt=media&token=d9a2baf4-40c6-42db-a550-813bb7c0aa83" alt="Image 10"></div>
                        </div>
                    </div>
              </div>           
            </div>
            <div class="item-buttons"> 
             <div class="item-swipe-left">Swipe Left</div>
             <div class="item-chat-action">Chat</div>
             <div class="item-swipe-right">Swipe Right</div>
            </div>
            
            
           
      </div>
    </div>
    </div>

    </div>
</div>
    `
  },
}


// Function to handle Google login button click event
async function handleGoogleLoginButtonClick(event) {
  // Check if the clicked element is the Google login button
  const button = event.target.closest('.google-login-button')

  // Check if the button variable is not null or undefined
  if (button) {
    try {
      // Initialize GoogleAuthProvider for authentication
      const provider = new GoogleAuthProvider()

      // Sign in with Google using a popup
      signInWithPopup(auth, provider)

        // Handle the user credential returned from Google sign-in
        .then(async (userCredential) => {
          // Extract the user information from the user credential
          const user = userCredential.user

          // Extract user data from the authentication result
          const id = user.uid
          const fullName = user.displayName
          const avatar = user.photoURL

          // Collect user data and store it in the database
          await collectUserData(id, fullName, avatar)
  
          // Redirect to the home page
          window.location.href = '/'
        })

        // Log and handle errors during Google sign-in
        .catch((error) => {
          console.error('Error signing in with Google in handleGoogleLoginButtonClick function:', error)
        })

    } catch (error) {
      // Log any unexpected errors during the sign-in process
      console.error('Error in handleGoogleSignInResult:', error)

      // Throw a new Error with a specific message for failed chatroom setup
      throw new Error('Failed to sign in with Google. Please try again later.')
    }

  } else {
    // Log any unexpected errors during the sign-in process
    console.error('Error: Google login button not found.')
  }
}



// Collects user data and stores it in the Firestore collection.
async function collectUserData(id, fullName, avatar) {
  try {
    // Validate user id
    if (!id) {
      console.log('User ID is required.')
    }

    // Validate user fullName
    if (!fullName) {
      console.log('Full name is required.')
    }

    // Validate user avatar
    if (!avatar) {
      console.log('Avatar URL is required.')
    }

    // Add user data to Firestore collection
    await setDoc(allUserCollectionReference(id), {
      id: id, 
      fullName: fullName, 
      avatar: avatar
    })
  
  } catch (error) {
    // Log any unexpected errors during the user data collection process
    console.error('Error adding user data:', error.message)

    // Throw a new Error with a specific message for failed user data collection
    throw new Error('Failed to add user data. Please try again later.')
  }
}




export default renderAuth 



