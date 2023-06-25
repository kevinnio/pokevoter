import { useEffect, useState, useCallback } from "react"
import Controls from "./components/Controls"
import Pokemon from "./components/Pokemon"

import LocalStorageVoteStore from "./lib/LocalStorageVoteStore"
import HardhatVoteStore from "./lib/HardhatVoteStore"

import "./App.css"

let pokemonList
const voteStore = new HardhatVoteStore()

function getRandomPokemon() {
  const index = Math.floor(Math.random() * pokemonList.length)

  return pokemonList[index]
}

async function fetchPokemonDetails(pokemonListItem) {
  if (pokemonListItem.id) {
    return pokemonListItem
  } else {
    const res = await fetch(pokemonListItem.url)
    const pokemon = await res.json()

    // Cache pokemon details inside pokemonList
    const index = pokemonList.indexOf(pokemonListItem)
    pokemonList[index] = {...pokemonListItem, ...pokemon}

    return pokemonList[index]
  }
}

export default function App({ pokemonName }) {
  const [pokemon, setPokemon] = useState()
  const [votes, setVotes] = useState({ likes: 0, dislikes: 0 })

  const storeLike = useCallback(
    () => voteStore.storeLike(pokemon).then(votes => setVotes(votes)),
    [pokemon]
  )
  const storeDislike = useCallback(
    () => voteStore.storeDislike(pokemon).then(votes => setVotes(votes)),
    [pokemon]
  )
  const showRandomPokemon = useCallback(
    () => fetchPokemonDetails(getRandomPokemon()).then(pokemon => setPokemon(pokemon)),
    []
  )

  // Fetches pokemon list and shows first pokemon
  useEffect(
    () => {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
        .then(res => res.json())
        .then(res => {
          pokemonList = res.results

          let pokemon
          if (pokemonName) {
            pokemon = pokemonList.find(p => p.name === pokemonName)
          } else {
            pokemon = getRandomPokemon()
          }

          fetchPokemonDetails(pokemon).then(pokemon => setPokemon(pokemon))
        })
    },
    [pokemonName]
  )

  // Fetches votes for current pokemon
  useEffect(
    () => {
      voteStore.getVotes(pokemon).then((votes) => setVotes(votes))
    },
    [pokemon, setVotes]
  )

  return pokemon && (
    <main className="App container">
      <Pokemon pokemon={pokemon} votes={votes} />
      <Controls
        storeLike={storeLike}
        storeDislike={storeDislike}
        showRandomPokemon={showRandomPokemon} />
    </main>
  );
}
