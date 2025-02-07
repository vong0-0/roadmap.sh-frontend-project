function setCookie(name, value){
  localStorage.setItem(name, value);
}

function getCookie(name){
  const cookie = localStorage.getItem(name);
  if(cookie) return cookie;

  return null;
}

function checkCookieConsent(){
  const consent = getCookie('cookieConsent');
  if(consent === 'accepted'){
    return
  }

  showCookiePopup();
}

function showCookiePopup(){
  const pageWrapper = document.querySelector('.page-wrapper');

  const popup = document.createElement('div');
  popup.setAttribute('class', 'cookie-popup');

  const closeIcon = document.createElement('img');
  closeIcon.setAttribute('class', 'close-icon');
  closeIcon.setAttribute('src', './assets/icons/x-solid.svg');
  closeIcon.setAttribute('alt', 'close icon');
  popup.appendChild(closeIcon);
  closeIcon.addEventListener('click', () => popup.remove());

  const cookieIcon = document.createElement('img');
  cookieIcon.setAttribute('class', 'cookie-icon');
  cookieIcon.setAttribute('src', './assets/icons/cookie-solid.svg');
  cookieIcon.setAttribute('alt', 'cookie icon');
  popup.appendChild(cookieIcon);

  const cookieContent = document.createElement('div');
  cookieContent.setAttribute('class', 'cookie-content');
  popup.appendChild(cookieContent);

  const message = document.createElement('p');
  message.setAttribute('class', 'cookie-message');
  message.innerText = "We use cookie to improve your user experience.";
  cookieContent.appendChild(message);

  const button = document.createElement('button');
  button.setAttribute('class', 'cookie-consent-btn');
  button.innerText = "I like cookie";
  cookieContent.appendChild(button);
  button.addEventListener('click', () => {
    setCookie('cookieConsent', 'accepted');
    popup.remove();
  })

  popup.appendChild(cookieContent);
  pageWrapper.appendChild(popup);
}

checkCookieConsent()