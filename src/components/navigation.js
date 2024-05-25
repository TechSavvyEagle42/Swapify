import { getAuth, signOut } from 'firebase/auth'





class Component extends HTMLElement {
  constructor() {
    super()
  
    this.innerHTML = /*html*/ `
  <div class="custom-navigation">
    <div class="navigation-divider">
      <img src="https://firebasestorage.googleapis.com/v0/b/scent-danielle.appspot.com/o/asset%2Fswapify-logo.png?alt=media&token=f02f4f47-c419-491d-891c-4bae54755b90" class="swapify-logo" alt="Swapify Logo">
    </div>
    <div class="navigation-links">
    <a href="/" class="nav-link">
    <i class="fi fi-ss-home"></i>  
    Home
    <span class="loading-animation"></span> 
    </a>
    <a href="/#/gallery" class="nav-link">Gallery
    <span class="loading-animation"></span></a>
    <a href="/#/about" class="nav-link">About
    <span class="loading-animation"></span></a>
    <a class="nav-link logout">Logout
    <span class="loading-animation"></span></a>
    </div>
  </div>
`

    // Add event listener for the button click inside the render method
    document.addEventListener('click', handleLogoutButtonClick)
  }
}

// Function to handle Logout button click event
async function handleLogoutButtonClick(event) {
  // Check if the clicked element is the Logout button
  const button = event.target.closest('.logout')

  // Check if the button variable is not null or undefined
  if (button) {
    // Get the authentication instance
    const auth = getAuth()

    signOut(auth).then(() => {
      // Redirect to the Auth page
      window.location.href = '/'

    }).catch((error) => {
      // Log any unexpected errors during the sign-out process
      console.error('Error in handleLogoutButtonClick:', error)

      // Throw a new Error with a specific message for failed sign-out
      throw new Error('Failed to sign out. Please try again later.')
    })
  } else {
    // Log any unexpected errors during the sign-out process
    console.error('Error: Logout button not found.')
  }
}
  
// Define the custom component 
customElements.define('custom-navigation-component', Component)
