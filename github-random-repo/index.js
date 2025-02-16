async function createSelector(container) {
  const languagesUrl = "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json";
  const select = document.createElement('select');
  select.name = 'languages-selector';
  select.id = 'languages-selector';

  const response = await fetch(languagesUrl);
  const languages = await response.json();

  languages.forEach(language => {
    const option = document.createElement('option');
    option.value = language.value;
    option.innerText = language.title;
    select.appendChild(option);
  });

  select.addEventListener('change', () => {
    createRepoDetails(container, select.value);
  });

  container.appendChild(select);
}

async function createRepoDetails(container, language = "") {
  let repoDetails = container.querySelector(".repo-details");

  if (!repoDetails) {
    repoDetails = document.createElement('div');
    repoDetails.className = "repo-details";
    container.appendChild(repoDetails);
  } else {
    repoDetails.innerHTML = "";
  }

  const statusMessage = document.createElement('p');
  statusMessage.className = 'status-message';
  repoDetails.appendChild(statusMessage);

  const refreshBtn = document.querySelector('.refresh-btn');
  if (refreshBtn) refreshBtn.style.display = 'none';

  if (!language) {
    statusMessage.innerText = "Select language";
    statusMessage.classList.add('empty');
    return;
  }

  statusMessage.innerText = "Loading, please wait...";

  try {
    const apiUrl = `https://api.github.com/search/repositories?q=language=${language}&sort=stars`;
    const response = await fetch(apiUrl);

    if (response.status !== 200) {
      throw new Error("Error fetching repositories");
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      throw new Error("No repositories found.");
    }

    const randomIndex = Math.floor(Math.random() * data.items.length);
    const randomRepo = data.items[randomIndex];

    repoDetails.innerHTML = `
      <h2 class="repo-name">${randomRepo.name}</h2>
      <p class="repo-description">${randomRepo.description || "No description available"}</p>
      <ul class="repo-status">
        <li class="repo-language">
          <div class="circle"></div>
          <span>${randomRepo.language}</span>
        </li>
        <li class="repo-stars">
          <img class="icon" src="assets/icons/star-solid.svg" alt="Star icon" width="15" height="15">
          <span>${randomRepo.stargazers_count.toLocaleString()}</span>
        </li>
        <li class="repo-forks">
          <img class="icon" src="assets/icons/code-fork-solid.svg" alt="Code fork icon" width="15" height="15">
          <span>${randomRepo.forks_count.toLocaleString()}</span>
        </li>
        <li class="repo-issues">
          <img class="icon" src="assets/icons/exclamation-solid.svg" alt="Issue icon" width="15" height="15">
          <span>${randomRepo.open_issues_count.toLocaleString()}</span>
        </li>
      </ul>
    `;

    if (refreshBtn) {
      refreshBtn.style.display = 'block';
      refreshBtn.innerText = 'Refresh';
    }
  } catch (error) {
    statusMessage.innerText = error.message;
    statusMessage.classList.add('error');
    if (refreshBtn) {
      refreshBtn.style.display = 'block';
      refreshBtn.innerText = 'Click to retry';
    }
  }
}

async function renderRepoFinder() {
  const pageWrapper = document.querySelector('.page-wrapper');
  const repoFinder = document.createElement('div');
  repoFinder.className = 'repo-finder';
  
  await createSelector(repoFinder);
  await createRepoDetails(repoFinder);

  let refreshBtn = document.querySelector('.refresh-btn');
  if (!refreshBtn) {
    refreshBtn = document.createElement('button');
    refreshBtn.className = 'refresh-btn';
    refreshBtn.style.display = 'none';
    repoFinder.appendChild(refreshBtn);

    refreshBtn.addEventListener('click', () => {
      const selector = document.querySelector('#languages-selector');
      createRepoDetails(repoFinder, selector.value);
    });
  }

  pageWrapper.appendChild(repoFinder);
}

renderRepoFinder();
