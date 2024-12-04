const idList = document.getElementById("listPokemon");
const btnVerMais = document.getElementById("btn-verMais");
const detailPokemon = document.getElementById("detailPokemon");
const limit = 8;
let offset = 0;
const maxRecords = 151;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
      const newHTML = pokemonList
        .map(
          (pokemon) =>
            `<a href="#${pokemon.name}">
              <li class="pokemon ${pokemon.type}"">
                    <ol class="header-pkm">
                      <li>
                        <span class="name">${pokemon.name}</span>
                      </li>
                      <li>
                        <span class="id">${pokemon.number}</span>
                      </li>
                    </ol>
                      <div class="detail">
                          <ol class="types">
                              ${pokemon.types.map((type) =>`<li class="type ${type}">${type}</li>`).join("")}
                          </ol>
                          <img src="${pokemon.photo}" alt="${pokemon.name}">
                      </div>              
              </li>
            </a>`
            
        )
        .join("");
      idList.innerHTML += newHTML;
      detailPokemon.innerHTML += modalHTML;
    })
    .catch((error) => console.log(error));
}

loadPokemonItens(offset, limit);

btnVerMais.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    btnVerMais.parentElement.removeChild(btnVerMais);
  } else {
    loadPokemonItens(offset, limit);
  }
});
