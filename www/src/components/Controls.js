export default function Controls({ storeLike, storeDislike, showRandomPokemon }) {
  return (
    <div className="Controls row align-items-center mt-5">
      <div className="btn-group">
        <button className="btn btn-lg btn-success" onClick={storeLike}>👍</button>
        <button className="btn btn-lg btn-primary" onClick={showRandomPokemon}>New Pokemon</button>
        <button className="btn btn-lg btn-danger" onClick={storeDislike}>👎</button>
      </div>
    </div>
  )
}
