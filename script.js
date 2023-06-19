function handleDonation() {
    // ... your code for handling the donation ...
  
    // Redirect the user to the desired link
    window.location.href = 'https://pages.razorpay.com/pl_M33VR0moxuyunC/view'; // Replace with your desired link
  }
  document.getElementById('navbar-toggler').addEventListener('click', function() {
    var navbarMenu = document.getElementById('navbar-menu');
    var navbarToggler = document.getElementById('navbar-toggler');
    navbarMenu.classList.toggle('active');
    navbarToggler.classList.toggle('active');
  
    if (navbarToggler.classList.contains('active')) {
      navbarToggler.setAttribute('aria-label', 'Close Menu');
      navbarToggler.innerHTML = '<img src="cross.png" width="35px" alt="Close Icon">';
    } else {
      navbarToggler.setAttribute('aria-label', 'Open Menu');
      navbarToggler.innerHTML = '<span class="navbar-toggler-icon"><img src="ham.png" width="35px" alt=""></span>';
    }
  });
  
  