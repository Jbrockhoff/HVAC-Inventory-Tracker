  
    // const name = document.querySelector('#invoice-container').value.trim();
    
    // To create new invoice

    const newFormHandler = async (event) => {
      event.preventDefault();
      
      const firstName = document.querySelector('#inputFirst').value.trim();
      const lastName = document.querySelector('#inputLast').value.trim();
      const email = document.querySelector('#inputEmail').value.trim();
      const phone = document.querySelector('#inputPhone').value.trim();
      const address = document.querySelector('#inputAddress').value.trim();
      const addressTwo = document.querySelector('#inputAddress2').value.trim();
      const city = document.querySelector('#inputCity').value.trim();
      const state = document.querySelector('#inputState').value.trim();
      const zip = document.querySelector('#inputZip').value.trim();
      const description = document.querySelector('#inputDescription').value.trim();
      const item = document.querySelector('#inputItem').value.trim();
      const cost = document.querySelector('#inputCost').value.trim();
      // Add other fields as needed
      if (firstName && lastName && email && phone && address && city && state && zip && description && item && cost) {
        const response = await fetch(`/api/invoice`, {
          method: 'POST',
          body: JSON.stringify({ firstName, lastName, email, phone, address, addressTwo, city, state, zip, description, item, cost }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
   
    
        if (response.ok) {
          
          
          document.location.assign('/invoice');
        } else {
          alert('Failed to create invoice');
        }
      }
    };
 
    document.querySelector('#newInvoiceForm').addEventListener('submit', newFormHandler);



  