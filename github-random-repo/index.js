const language = "Java";
const apiUrl = `https://api.github.com/search/repositories?q=language&sort=stars&per_page=1`;
const languageUrl = "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json";

async function fetchLanguage(){
  const response = await fetch(languageUrl);
  const data = await response.json();
  const randomNum = Math.floor(Math.random() * data.length)
  console.log(data[randomNum]);
}

async function showRepoData(){
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
  console.log(data.items);
  console.log(`Name: ${data.items[0].name}`);
  console.log(`Descript: ${data.items[0].description}`);
  console.log(`Stars: ${data.items[0].stargazers_count}`);
  console.log(`Forks: ${data.items[0].forks_count}`);
  console.log(`Open issuses: ${data.items[0].open_issues_count}`);
}

showRepoData()
fetchLanguage()