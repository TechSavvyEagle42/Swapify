class Component extends HTMLElement {
  constructor() {
    super()
  
    this.innerHTML = /*html*/`
      <div class="custom-navigation">
        <div><a href="/" class="nav-link">Swipe</a></div>
        <div><a href="/#/gallery" class="nav-link">Gallery</a></div>
        <div><a href="/#/about" class="nav-link">About</a></div>
        <div><a href="/#/auth" class="nav-link">Logout</a></div>
      </div>
    `
  }
}
  
// Define the custom component 
customElements.define('custom-navigation-component', Component)