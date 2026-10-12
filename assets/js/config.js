/* ==========================================================================
   BUCO — SITE CONFIG
   Everything the restaurant needs to connect lives here.
   Leave a value as null until you have the REAL one. Never guess a URL.
   - null links are hidden (or fall back to the phone number).
   - null images show a styled placeholder. Replace before launch.
   ========================================================================== */
window.BUCO_CONFIG = {
  business: {
    name: "BUCO",
    phoneDisplay: "+961 3 843 474",
    phoneHref: "tel:+9613843474",
    street: "Gouraud Street",
    city: "Beirut",
    country: "Lebanon",
    hours: "Daily · 12:30 PM – 12:00 AM",
    // Reservation requests are accepted between these times (24h). Closing time is midnight;
    // the last request time is set 30 minutes earlier. Change here if BUCO prefers otherwise.
    opens: "12:30",
    lastRequest: "23:30"
  },

  links: {
    // Booking system URL supplied by BUCO (e.g. their own booking page). Do NOT invent one.
    // While null, every "Reserve" button scrolls to the reservation section.
    reserve: null,

    // Official menu URL or PDF (e.g. "assets/menu/buco-menu.pdf"). While null, the
    // "Explore the full menu" button is hidden.
    menu: null,

    // Official Instagram profile URL. While null, the Instagram link is hidden.
    instagram: null,

    // Google Maps search link (documented Maps URL format; opens in Maps, nothing embedded).
    // Replace with the exact "Share → Copy link" URL from BUCO's Google Business listing.
    directions: "https://www.google.com/maps/search/?api=1&query=BUCO%20Gouraud%20Street%20Beirut"
  },

  reservationForm: {
    // Set to false to hide the request form and show phone booking only.
    enabled: true,
    // HTTPS endpoint that accepts a JSON POST (your own server or a form processor
    // BUCO has a data-processing agreement with). While null, NOTHING is sent anywhere:
    // the form validates and then asks the guest to call.
    endpoint: null
  }

  // PHOTOS: put BUCO's photos in assets/img/ with these exact names and they replace the stand-ins automatically:
  // hero.jpg, room.jpg, fries.jpg, wagyu.jpg, shroomz.jpg, classic.jpg, margarita.jpg, gimlet.jpg,
  // espresso.jpg, bar.jpg, dining.jpg, kitchen.jpg, drinks.jpg, chef.jpg
};
