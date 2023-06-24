import "./Pokemon.css"

const IMAGE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/pk-id.png"

export default function Pokemon({ pokemon, votes }) {
  const pokemonLink = `${new URL(document.location).origin}?pk=${pokemon.name}`
  const imgUrl = IMAGE_URL.replace('pk-id', pokemon.id)

  return (
    <div className="Pokemon">
      <div className="Pokemon__vote-counters row align-items-center bg-dark rounded mb-5">
        <div className="col">
          <span className="Pokemon__like-counter text-success">{votes.likes}</span>
        </div>
        <div className="col">
          <span className="Pokemon__dislike-counter text-danger">{votes.dislikes}</span>
        </div>
      </div>
      <div className="Pokemon__picture-wrapper row align-items-center">
        <div className="col text-center">
          <img className="Pokemon__picture w-100" src={imgUrl} alt="Pokemon sprite" />
        </div>
      </div>
      <div className="Pokemon__number row text-center">
        <h5><a href={pokemonLink}>#{pokemon.id}</a></h5>
      </div>
      <div className="Pokemon__name row text-center">
        <h2 className="text-uppercase">{pokemon.name.replaceAll("-", " ")}</h2>
      </div>
    </div>
  )
}
