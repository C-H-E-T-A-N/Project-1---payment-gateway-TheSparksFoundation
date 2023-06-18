function handleDonation() {
    var amountInput = document.getElementById('amount');
    var amount = amountInput.value;
    var emailInput = document.getElementById('email');
  var email = emailInput.value;
 
  
    if (amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
  
    var options = {
      key: 'rzp_test_scu41OLf6iIFF9',
      amount: amount * 100,  // Amount in paise
      currency: 'INR',
      name: 'Your Organization',
      description: 'Donation for a cause',
      image: 'your_logo.png',
      handler: function(response) {
          // Handle the payment success
          var paymentId = response.razorpay_payment_id;
          var orderId = response.razorpay_order_id;
          var signature = response.razorpay_signature;
          
          // Send an invoice to the user's email address
          sendInvoice(paymentId, orderId, signature);
        },
        email: email,
      prefill: {
        email: email,
    
      },
      notes: {
        donation_type: 'General Donation'
      }
    };
  
    var razorpayPayment = new Razorpay(options);
    razorpayPayment.open();
  }
  
  function sendInvoice(paymentId, orderId, signature) {
    var emailInput = document.getElementById('email');
    var email = emailInput.value;
  
    var invoiceData = {
      payment_id: paymentId,
      order_id: orderId,
      description: 'Invoice for your donation',
      customer: {
        email: email
      },
      line_items: [
        {
          name: 'Donation',
          description: 'Donation for a cause',
          amount: amount * 100, // Amount in paise
          currency: 'INR',
          quantity: 1
        }
      ]
    };
  
    fetch('https://api.razorpay.com/v1/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('rzp_test_scu41OLf6iIFF9:')
      },
      body: JSON.stringify(invoiceData)
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var invoiceUrl = data.invoice.short_url;
      console.log('Invoice URL:', invoiceUrl);
      // You can implement your logic to send the invoice URL to the user's email here
      // Example using window.open to open the invoice URL in a new tab
      window.open(invoiceUrl, '_blank');
    })
    .catch(function(error) {
      console.error('Error creating invoice:', error);
    });
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
  
  