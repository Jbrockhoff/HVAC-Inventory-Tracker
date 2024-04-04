
  //To delete exiting item by ID
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
    .querySelector('.item-list')
    .addEventListener('click', delButtonHandler);