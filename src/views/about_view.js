import '../components/navigation.js'
import '../components/contact.js'

const renderAbout = {
  render: async () => {
    return /*html*/ ` 
      <div class="root-container">
        <aside class="left-aside">
          <custom-navigation-component></custom-navigation-component>
        </aside>

        <main class="main-content">
        <div class="about-border">
          <div class = "about-view">
            <h1 class="about-title"> About </h1>
            <p class="about-context">Swapify is a revolutionary platform dedicated to transforming the way people exchange goods and services. Founded with a vision to promote sustainability and community engagement, Swapify provides a seamless and user-friendly interface for individuals and businesses to trade items and skills without the need for cash transactions.
            </p>
            <div class="mission">
            <p class="mission-title">Mission</p>
            <p class="mission-context">Our mission is to empower communities by fostering a culture of sharing and sustainability. We believe that by enabling people to swap what they have for what they need, we can reduce waste, save money, and build stronger, more connected communities.<p>
            </div>

          </div>
          </div>

        </main>

        <aside class="right-aside">
          <custom-contact-list-component></custom-contact-list-component>
        </aside> 
      </div>

    `
  },
}

export default renderAbout


