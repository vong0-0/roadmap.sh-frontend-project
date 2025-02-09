const questions = [
  {
    question: 'What is roadmap.sh?',
    answer: 'roadmap.sh is a community effort to create learning paths, guides, project ideas and other similar content to help developers grow in their careers.'
  },
  {
    question: 'What are the plans for roadmap.sh?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit eum omnis beatae ut ad voluptatibus laboriosam facere illo repudiandae laudantium, maiores veritatis sed architecto voluptatem incidunt ipsa! Iste fugit repellendus ipsa repudiandae dignissimos quod dolor, harum quis tempora ut totam ea dicta animi odio distinctio! Neque laudantium aperiam velit voluptatum architecto quae, facere aliquam odio excepturi ad minus repellendus totam soluta impedit, earum possimus. Commodi voluptate recusandae ullam dicta animi modi voluptatum dolorum corporis quidem repellendus. Quis, eveniet? Eveniet assumenda consequuntur at a voluptatum accusantium, aspernatur vel facilis sequi natus ratione minima cum dolor magni incidunt corrupti ipsum exercitationem aperiam.'
  },
  {
    question: 'How is roadmap.sh built?',
    answer: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam modi nulla praesentium odit omnis officia hic quibusdam consequuntur porro! Eligendi saepe explicabo blanditiis quisquam? Perferendis qui magni quas autem nemo sunt odio eos nisi? Sequi rerum provident ea saepe, distinctio pariatur unde in assumenda corporis excepturi beatae, laboriosam obcaecati, necessitatibus molestias cum architecto sint deserunt! Ex consequuntur assumenda voluptatum eveniet porro, modi neque temporibus! At dolores necessitatibus molestiae magnam voluptate placeat impedit nesciunt ab laboriosam temporibus repellendus odit dolorum, nihil in autem deserunt ea beatae facere nobis, officiis totam debitis? Provident iste amet quo obcaecati ea, veniam repellat eum eligendi facere sint vero nemo dolorem voluptates illum dolorum fugiat. Pariatur ullam voluptas sint cupiditate, obcaecati laboriosam excepturi soluta deserunt modi facere omnis odit totam doloremque aliquam non? Blanditiis quo laboriosam eos voluptatum possimus magni facilis soluta expedita porro delectus omnis odit, velit hic, amet at laudantium, saepe provident ea? Maxime.'
  },
  {
    question: 'Can I use roadmap.sh in my team?',
    answer: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam modi nulla praesentium odit omnis officia hic quibusdam consequuntur porro! Eligendi saepe explicabo blanditiis quisquam? Perferendis qui magni quas autem nemo sunt odio eos nisi? Sequi rerum provident ea saepe, distinctio pariatur unde in assumenda corporis excepturi beatae, laboriosam obcaecati, necessitatibus molestias cum architecto sint deserunt! Ex consequuntur assumenda voluptatum eveniet porro, modi neque temporibus! At dolores necessitatibus molestiae magnam voluptate placeat impedit nesciunt ab laboriosam temporibus repellendus odit dolorum, nihil in autem deserunt ea beatae facere nobis, officiis totam debitis? Provident iste amet quo obcaecati ea, veniam repellat eum eligendi facere sint vero nemo dolorem voluptates illum dolorum fugiat. Pariatur ullam voluptas sint cupiditate, obcaecati laboriosam excepturi soluta deserunt modi facere omnis odit totam doloremque aliquam non? Blanditiis quo laboriosam eos voluptatum possimus magni facilis soluta expedita porro delectus omnis odit, velit hic, amet at laudantium, saepe provident ea? Maxime.'
  },
  {
    question: 'How can I create custom roadmaps?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, sequi quos impedit autem corrupti nostrum. Eaque tenetur iusto at quidem quibusdam quam assumenda harum ad repellat error accusamus eligendi dolorem ipsa odio inventore libero sequi, adipisci qui similique, eveniet nemo delectus amet provident! Voluptatibus porro ullam recusandae minus voluptatum neque? Sapiente id eveniet quisquam labore magni ullam dolores veniam sequi cumque nostrum illum nihil provident quod optio, molestias nam ad vitae earum veritatis totam recusandae autem in. Ullam, optio eaque laboriosam maxime officiis ipsum tempore ex voluptates quibusdam, repellat non iure dignissimos molestias natus possimus quia pariatur voluptas, ad tempora ipsa? Doloribus enim sint, atque accusantium et cum sunt consequatur nesciunt minus! Illum pariatur doloribus labore aliquid esse distinctio quasi voluptas in.'
  },
  {
    question: 'Is roadmap.sh really 7th most starred project on GitHub',
    answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo repudiandae aspernatur perferendis quam. Aliquam aperiam vitae cum incidunt cupiditate. Porro odit asperiores ad vel. Maiores mollitia consequatur illo accusantium magnam obcaecati illum nesciunt libero, optio totam laudantium beatae nulla ratione in perspiciatis cumque. Velit iure eaque labore provident corrupti eius sunt dolorem est sed sit quidem obcaecati, quasi deleniti magni commodi. Non, ipsam. Necessitatibus corporis nostrum itaque similique voluptatibus dolor veniam magnam optio doloremque maxime quibusdam sequi alias accusantium quam, obcaecati deserunt vitae deleniti cum atque delectus. Culpa, fugit a?'
  }
]


function createAccordion(container, title, content){
  const accordion = document.createElement('div');
  accordion.setAttribute('class', 'accordion');

  const accordionHeader = document.createElement('div');
  accordionHeader.setAttribute('class', 'accordion-header');
  accordion.appendChild(accordionHeader);

  const accordionLabel = document.createElement('div');
  accordionLabel.setAttribute('class', 'accordion-label');
  accordionLabel.innerText = title;
  accordionHeader.appendChild(accordionLabel);

  const accordionToggleIcon = document.createElement('div');
  accordionToggleIcon.setAttribute('class', 'accordion-toggle-icon');
  accordionHeader.appendChild(accordionToggleIcon);
  const toggleIcon = document.createElement('img');
  toggleIcon.src = "./assets/icons/chevron-up-solid.svg"
  toggleIcon.alt = "accordion toggle icon";
  accordionToggleIcon.appendChild(toggleIcon);

  const accordionContent = document.createElement('div');
  accordionContent.setAttribute('class', 'accordion-content');
  accordion.appendChild(accordionContent);
  const p = document.createElement('p');
  p.innerText = content;
  accordionContent.appendChild(p);

  accordion.addEventListener('click', () => {
    accordion.classList.toggle('expanded')
  })
  container.appendChild(accordion);
}

function renderAccordions(container){
  questions.forEach(q => {
    createAccordion(container, q.question, q.answer);
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const accordionContainer = document.querySelector('.accordions');
  renderAccordions(accordionContainer);
})