const tabContent = [
  {
    tabName: "Tab one",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis voluptates corrupti reiciendis odio repellat laudantium architecto voluptate amet nesciunt saepe obcaecati eum quod dolor, hic neque aspernatur at consequuntur libero fuga voluptatibus deserunt alias magni quia. Recusandae dolores vitae odio ex, impedit nesciunt blanditiis, est officia fuga incidunt sed architecto?",
    active: true
  },
  {
    tabName: "Tab two",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, delectus rerum error distinctio omnis possimus eos officiis atque ad. Quod quo, unde dolores sequi, aliquam libero quae natus voluptas perspiciatis modi et, aliquid dolorum molestiae ut adipisci consequuntur ipsa nemo id! Temporibus nemo necessitatibus rem, voluptas quas blanditiis atque iste. Repellat dolor quibusdam unde nemo, dolore minus consequatur corrupti, repellendus quod nobis rem. Exercitationem, deserunt!",
    active: false
  },
  {
    tabName: "Tab three",
    text: "Nam aliquam deleniti ut numquam dolor reprehenderit.",
    active: false
  },
  {
    tabName: "Tab four",
    text: "Ea ipsa nisi placeat dolorem.",
    active: false
  }
];

document.addEventListener('DOMContentLoaded', () => renderTabs())

function renderTabs() {
  // Page wrapper
  const pageWrapper = document.querySelector('.page-wrapper');

  // create container
  const container = document.createElement('div');
  container.setAttribute('class', 'tab-container');

  // Create tabs container for store clickable tabs
  const tabsCon = document.createElement('ul');
  tabsCon.setAttribute('class', 'tabs');
  container.appendChild(tabsCon);

  // Create text for each tabs
  const textDisplay = document.createElement('p');
  textDisplay.setAttribute('class', 'tab-text');
  container.appendChild(textDisplay);

  tabContent.forEach(tc => {
    const tab = createTabElement(tc.tabName, tc.active);
    tabsCon.appendChild(tab);

    if (tc.active) {
      updateTabText(textDisplay, tc.text);
    }

    tab.addEventListener('click', () => {
      activeTab(tab);
      updateTabText(textDisplay, tc.text);
    });
  });

  pageWrapper.appendChild(container);
}

function createTabElement(tabName, isActive) {
  const activeClassName = isActive ? 'active' : '';
  const tab = document.createElement('li');
  tab.setAttribute('class', `tab ${activeClassName}`);
  tab.setAttribute('data-name', tabName);
  tab.innerText = tabName;

  return tab;
}

function updateTabText(textDisplay, text) {
  textDisplay.innerText = text;
}

function activeTab(target) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  target.classList.add('active');
}