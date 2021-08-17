const contactForm = document.querySelector('#contactForm');

let contactName = document.getElementById('contactName');
let email = document.getElementById('contactEmail');
let subject = document.getElementById('contactSubject');
let message = document.getElementById('contactMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let mail = {
      contactName: contactName.value,
      email: email.value,
      subject: subject.value,
      message: message.value
  }

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/');
  xhr.setRequestHeader('content-type','application/json');
  xhr.onload = function() {
      if(xhr.responseText == 'success') {
          console.log(xhr.responseText);
          alert('Email successfully sent');
          contactName.value = '';
          email.value = '';
          subject.value = '';
          message.value = '';
      }else{
          alert('oops! something went wrong')
      }
  }

  xhr.send(JSON.stringify(mail));

    
    console.log(mail)
})

