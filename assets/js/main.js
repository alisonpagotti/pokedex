const pokemonList = document.getElementById('pokemonList')
const pokemonStatus = document.getElementById('pokemonStatus')

const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 9
let offset = 0


function convertPokemonToList(pokemon) {
	return `
	<li class="pokemon ${pokemon.type} pokeball-image fadeIn">
    	<span class="number slideInDown">#${pokemon.number}</span>
        <span class="name slideInDown">${pokemon.name}</span>

        <div class="detail">
          <ol class="types">
		  	${pokemon.types.map((type) => `<li class="type slideInLeft ${type}">${type}</li>`).join('')}
          </ol>
          <img src="${pokemon.photo}" alt="${pokemon.name}" class="slideInRight" />
        </div>
      </li>
	`
}

function loadAllPokemons(offset, limit) {
	pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
		const newHtml = pokemons.map(convertPokemonToList).join('')
		pokemonList.innerHTML += newHtml
	})
}

loadAllPokemons(offset, limit)

loadMoreButton.addEventListener('click', () => {
	offset += limit
	const qtyRecordsWithNextPage = offset + limit

	if (qtyRecordsWithNextPage >= maxRecords) {
		const newLimit = maxRecords - offset
		loadAllPokemons(offset, newLimit)

		loadMoreButton.parentElement.removeChild(loadMoreButton)
	} else {
		loadAllPokemons(offset, limit)
	}
})