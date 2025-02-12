const dropdownItems = ['First item', 'Second item', 'Third item', 'Fourth item', 'Fifth item'];

function createDropdown(container){
  const dropdown = document.createElement('div');
  dropdown.setAttribute('class', 'dropdown');

  const dropdownBtn = document.createElement('div');
  dropdownBtn.setAttribute('class', 'dropdown-btn');
  dropdownBtn.addEventListener('click', () => {
    dropdown.classList.toggle('show')
  })
  dropdown.appendChild(dropdownBtn);

  const selectedItem = document.createElement('span');
  selectedItem.setAttribute('class', 'selected-item');
  selectedItem.innerText = "Select an item";
  dropdownBtn.appendChild(selectedItem);

  const arrow = document.createElement('span');
  arrow.setAttribute('class', 'arrow');
  arrow.innerText = '<';
  dropdownBtn.appendChild(arrow);

  const dropdownList = document.createElement('ul');
  dropdownList.setAttribute('class', 'dropdown-list');

  dropdownItems.forEach(item => {
    const dropdownItem = document.createElement('li');
    dropdownItem.setAttribute('class', 'dropdown-item');
    dropdownItem.innerText = item;
    dropdownList.appendChild(dropdownItem);

    dropdownItem.addEventListener('click', () => {
      document.querySelectorAll('.dropdown-item').forEach(el => el.classList.remove('active'));
      dropdownItem.classList.add('active')
      selectedItem.innerText = item
      dropdown.classList.remove('show')
    })
  })

  dropdown.appendChild(dropdownList);
  container.appendChild(dropdown);
}

const container = document.querySelector('.page-wrapper');

document.addEventListener('DOMContentLoaded', () => {
  createDropdown(container);
})