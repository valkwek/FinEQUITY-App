import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Rick and Morty Characters
        </p>
        <a
          className="App-link"
          href="https://rickandmortyapi.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rick and Morty API
        </a>
      </header>
    </div>
  );
}

const url = 'https://rickandmortyapi.com/api/location/';

// fetch data for all locations from the API
fetch(url)
  .then(response => response.json())
  .then(data => {
    // loop through each location and display its name and characters
    const locations = data.results;
    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];

      const nameElement = document.createElement('h1');
      nameElement.textContent = `Location: ${location.name}`;

      const charactersElement = document.createElement('ul');
      charactersElement.classList.add('character-list');

      // loop through each character in the location and display their name, status, and image
      const characters = location.residents;
      for (let j = 0; j < characters.length; j++) {
        const characterUrl = characters[j];
        fetch(characterUrl)
          .then(response => response.json())
          .then(characterData => {
            const characterName = characterData.name;
            const characterStatus = characterData.status;
            const characterImageUrl = characterData.image;

            const characterContainerElement = document.createElement('li');
            characterContainerElement.classList.add('character-container');

            const characterElement = document.createElement('div');
            characterElement.classList.add('character');
            characterElement.textContent = `${characterName} - ${characterStatus}`;

            const characterImageElement = document.createElement('img');
            characterImageElement.src = characterImageUrl;

            // add event listener to container element
            characterContainerElement.addEventListener('click', () => {
              // fetch character data and display it on a new page
              fetch(characterUrl)
                .then(response => response.json())
                .then(characterData => {
                  const characterName = characterData.name;
                  const characterStatus = characterData.status;
                  const characterLocation = characterData.location.name;
                  const characterImageUrl = characterData.image;

                  const characterDetailsElement = document.createElement('div');
                  characterDetailsElement.classList.add('character-details');
                  characterDetailsElement.innerHTML = `
                    <h2>${characterName}</h2>
                    <img src="${characterImageUrl}" alt="${characterName}">
                    <p>Status: ${characterStatus}</p>
                    <p>Location: ${characterLocation}</p>
                  `;

                  const bodyElement = document.querySelector('body');
                  bodyElement.innerHTML = '';
                  bodyElement.appendChild(characterDetailsElement);
                })
                .catch(error => console.error(error));
            });

            characterContainerElement.appendChild(characterImageElement);
            characterContainerElement.appendChild(characterElement);
            charactersElement.appendChild(characterContainerElement);
          })
          .catch(error => console.error(error));
      }

      // add the elements to the page
      const locationElement = document.createElement('div');
      locationElement.appendChild(nameElement);
      locationElement.appendChild(charactersElement);

      const appElement = document.getElementById('app');
      appElement.appendChild(locationElement);
    }
  })
  .catch(error => console.error(error));

export default App;
