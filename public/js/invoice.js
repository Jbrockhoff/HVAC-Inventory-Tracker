const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#invoice-name').value.trim();
    
    
    if (name) {
      const response = await fetch(`/api/invoice`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/invoice');
      } else {
        alert('Failed to create blog');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('invoice-id')) {
      const id = event.target.getAttribute('invoice-id');
  
      const response = await fetch(`/api/invoice/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/invoice');
      } else {
        alert('Failed to delete invoice');
      }
    }
  };
  
  
  
  
  document
    .querySelector('.new-invoice-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.invoice-list')
    .addEventListener('click', delButtonHandler);