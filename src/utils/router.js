document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelector('#main').addEventListener('click', () => {
      window.location.href = 'index.html'; 
    });
  
    document.querySelector('#goToAbout').addEventListener('click', () => {
      window.location.href = 'about.html'; 
    });
  
    document.querySelector('#goToServices').addEventListener('click', () => {
      window.location.href = 'services.html'; 
    });
  
    document.querySelector('#goToContacts').addEventListener('click', () => {
      window.location.href = 'contacts.html'; 
    });
  });