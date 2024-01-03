(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


document.addEventListener('DOMContentLoaded', function () {
  // Fetch and populate states dropdown
  const stateDropdown = document.getElementById('validationCustom04');
  const zipCodeInput = document.getElementById('validationCustom05');
  const stateDescription = document.getElementById('state-description');

  fetch('states.txt')
    .then(response => response.text())
    .then(data => {
      const states = data.split('\n');

      states.forEach(stateData => {
        const [stateName, zipCode, description] = stateData.split('|');

        // Create an option element for each state
        const option = document.createElement('option');
        option.value = stateName;
        option.text = stateName;
        stateDropdown.appendChild(option);
      });

      // Add event listener to update Zip Code and State Description
      stateDropdown.addEventListener('change', function () {
        const selectedState = stateDropdown.value;

        // Find the selected state data
        const selectedStateData = states.find(stateData => {
          const [stateName] = stateData.split('|');
          return stateName === selectedState;
        });

        if (selectedStateData) {
          const [, zipCode, description] = selectedStateData.split('|');

          // Update Zip Code input and State Description
          zipCodeInput.value = zipCode;
          stateDescription.textContent = description;
        }
      });
    })
    .catch(error => console.error('Error fetching states:', error));
});




const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

const appendAlert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');

  alertPlaceholder.innerHTML = ''; // Clear previous alerts
  alertPlaceholder.append(wrapper);
};

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.needs-validation');

  if (form) {
    form.addEventListener('submit', function (event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        // Form is valid, show success alert
        appendAlert('Success', 'One last step!');
      }

      form.classList.add('was-validated');
    });
  }
});

//login form
function login() {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
      const user = JSON.parse(storedUser);
      const enteredUsername = document.getElementById('loginUsername').value;
      const enteredPassword = document.getElementById('loginPassword').value;

      if (enteredUsername === user.username && enteredPassword === user.password) {
          alert('Login successful!');
          // Save user details in sessionStorage for session persistence
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          // Hide login form and show user details
          showUserDetails();
      } else {
          alert('Invalid username or password');
      }
  } else {
      alert('No user found. Please register.');
  }
}

function register() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('registerPassword').value;
  const username = document.getElementById('username').value;
  const profileImage = document.getElementById('profileImage').files[0];

  const user = {
      firstName,
      lastName,
      email,
      password,
      username,
      profileImage: null,
  };

  if (profileImage) {
      const reader = new FileReader();
      reader.onload = function (e) {
          user.profileImage = e.target.result;

          // Store user details in localStorage
          localStorage.setItem('user', JSON.stringify(user));
          // Save user details in sessionStorage for session persistence
          sessionStorage.setItem('currentUser', JSON.stringify(user));

          alert('Registration successful!');
          // Hide registration form and show user details
          showUserDetails();
      };
      reader.readAsDataURL(profileImage);
  } else {
      // Store user details in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      // Save user details in sessionStorage for session persistence
      sessionStorage.setItem('currentUser', JSON.stringify(user));

      alert('Registration successful! (Without profile image)');
      // Hide registration form and show user details
      showUserDetails();
  }
}

function showUserDetails() {
  const storedUser = sessionStorage.getItem('currentUser') || localStorage.getItem('user');
  if (storedUser) {
      const user = JSON.parse(storedUser);

      // Display user details
      document.getElementById('firstNameLabel').innerText = 'First Name: ' + user.firstName;
      document.getElementById('lastNameLabel').innerText = 'Last Name: ' + user.lastName;
      document.getElementById('emailLabel').innerText = 'Email: ' + user.email;
      document.getElementById('usernameLabel').innerText = 'Username: ' + user.username;

      // Display profile image
      const profileImageElement = document.getElementById('profileImageDisplay');
      if (user.profileImage) {
          profileImageElement.src = user.profileImage;
          profileImageElement.style.display = 'block'; // Show image element
          profileImageElement.alt = 'Profile Image';
      } else {
          profileImageElement.style.display = 'none'; // Hide image element if no profile image
      }

      // Hide login/registration forms and show user details
      $('#loginRegistrationUserDetailsModal').modal('show');
      document.getElementById('loginRegistrationForms').style.display = 'none';
      document.getElementById('userDetails').style.display = 'block';
  }
}

// Trigger user details display when the page loads
window.onload = function () {
  showUserDetails();
};

function collectPromoCode() {
  // Get the promo code input value
  const promoCodeInput = document.getElementById('promoCodeInput').value;

  if (promoCodeInput.length === 8) {
      // Show details in an alert
      alert(`Promo Code: ${promoCodeInput}`);
  } else {
      // Show an error alert if the length is not 8
      alert('Please enter a promo code with exactly 8 characters.');
  }
}

// Function to open the login/registration modal
function openFirstModal() {
  // Ensure that jQuery is available
  if (typeof $ === 'function') {
      // Trigger the opening of the first modal (loginRegistrationModal)
      $('#loginRegistrationModal').modal('show');

      // Close the second modal (cartModal) if needed
      $('#cartModal').modal('hide');
  } else {
      console.error('jQuery is not available. Make sure it is included before this script.');
  }
}


// Function to get cart items from sessionStorage
// Function to get cart items from sessionStorage
function getCartItems() {
  const cartItemsJson = sessionStorage.getItem('cartItems');
  return cartItemsJson ? JSON.parse(cartItemsJson) : [];
}

// Function to save cart items to sessionStorage
function saveCartItems(cartItems) {
  const cartItemsJson = JSON.stringify(cartItems);
  sessionStorage.setItem('cartItems', cartItemsJson);
}

function updateVisibleCartSection() {
  // Get existing cart items from sessionStorage
  const cartItems = getCartItems();

  // Render cart items in the visible section
  const visibleCartSection = document.getElementById('visibleCartSection');
  visibleCartSection.innerHTML = '';

  cartItems.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.className = 'list-group-item';
    cartItem.innerHTML = `
      <div class="d-flex justify-content-between">
        <div>${item.productName}</div>
        <div>$${item.price}</div>
        <button type="button" class="btn btn-sm btn-danger" onclick="removeFromCart(this)">Remove</button>
      </div>
    `;
    visibleCartSection.appendChild(cartItem);
  });
}

function addToCart(productName, price) {
  // Get existing cart items from sessionStorage
  const cartItems = getCartItems();

  // Create a new cart item
  const newCartItem = {
    productName: productName,
    price: price
  };

  // Add the new item to the cart
  cartItems.push(newCartItem);

  // Save updated cart items to sessionStorage
  saveCartItems(cartItems);

  // Update the cart badge
  updateCartBadge(1);

  // Render cart items in the modal
  openCartModal();

  // Update the visible cart section on the webpage
  updateVisibleCartSection();
}

function removeFromCart(button) {
  // Get existing cart items from sessionStorage
  const cartItems = getCartItems();

  // Find the index of the item to be removed
  const itemIndexToRemove = Array.from(button.closest('ul').children).indexOf(button.closest('li'));

  // Remove the item from the cartItems array by splicing at the found index
  cartItems.splice(itemIndexToRemove, 1);

  // Save updated cart items to sessionStorage
  saveCartItems(cartItems);

  // Update the cart badge
  updateCartBadge(-1);

  // Render cart items in the modal
  openCartModal();

  // Update the visible cart section on the webpage
  updateVisibleCartSection();
}



function updateCartBadge(change) {
  const cartBadge = document.getElementById('cartBadge');
  const currentCount = parseInt(cartBadge.innerText);
  cartBadge.innerText = currentCount + change;
}

function openCartModal() {
  // Open the cart modal
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();

  // Get existing cart items from sessionStorage
  const cartItems = getCartItems();

  // Render cart items in the modal
  const cartItemList = document.getElementById('cartItemList');
  cartItemList.innerHTML = '';

  cartItems.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.className = 'list-group-item d-flex justify-content-between lh-sm';
    cartItem.innerHTML = `
      <div>
        <h6 class="my-0">${item.productName}</h6>
        <small class="text-body-secondary">Brief description</small>
      </div>
      <span class="text-body-secondary">$${item.price}</span>
      <button type="button" class="btn btn-sm btn-danger" onclick="removeFromCart(this)">Remove</button>
    `;
    cartItemList.appendChild(cartItem);
  });

  // Update the visible cart section on the webpage
  updateVisibleCartSection();
}

// Call openCartModal when the checkout page is loaded
document.addEventListener('DOMContentLoaded', openCartModal);



//Promo Code
function redeemPromoCode() {
  // Get the input value
  const promoCodeInput = document.getElementById('promoCodeInput');
  const promoCode = promoCodeInput.value;

  // Check if the input is an 8-digit code
  if (/^\d{8}$/.test(promoCode)) {
    // Display a discount message
    const discountMessage = `Congratulations! You've received a 10% discount.`;
    alert(discountMessage);
  } else {
    // Display an error message for invalid code
    const errorMessage = `Invalid promo code. Please enter an 8-digit code.`;
    alert(errorMessage);
  }

  // Clear the input field
  promoCodeInput.value = '';
}

//Countdown
function initializeCountdown(container) {
  var countDownDate = new Date().getTime() + parseInt(container.getAttribute('data-countdown')) * 1000;

  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    container.querySelector('.countdown').innerHTML = hours + "h "
      + minutes + "m " + seconds + "s ";

    if (distance < 0) {
      clearInterval(x);
      container.querySelector('.countdown').innerHTML = "Sale Ended";
    }
  }, 1000);
}

// Loop through each product container and initialize countdown
document.querySelectorAll('.product-container').forEach(function (container) {
  initializeCountdown(container);
});

//Full Screen View
document.querySelectorAll('.btn-expand').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    var imageSrc = this.getAttribute('data-image');
    var title = this.getAttribute('data-title');
    document.getElementById('fullscreen-image').src = imageSrc;
    document.getElementById('exampleModalLabel').innerText = title;
    modal.show();
  });
});

//Sliding Text
$(document).ready(function () {
  $('#sliding-text-carousel').carousel({
    interval: 2000,
    wrap: true
  });
});z