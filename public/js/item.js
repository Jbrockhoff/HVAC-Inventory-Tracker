const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#item-name').value.trim();
    const quantity =document.querySelector('#item-quantity').value.trim();
    const cost = document.querySelector('#item-cost').value.trim();
    const retail = document.querySelector('#item-retail').value.trim();
    
    if (name  && quantity && cost && retail) {
      const response = await fetch(`/api/item`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/item');
      } else {
        alert('Failed to create item');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/item/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/item');
      } else {
        alert('Failed to delete item');
      }
    }
  };
  
  
  
  
  document
    .querySelector('.new-item-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.item-list')
    .addEventListener('click', delButtonHandler);