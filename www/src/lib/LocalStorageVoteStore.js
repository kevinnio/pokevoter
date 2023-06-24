export default class LocalStorageVoteStore {
  getVotes(pokemon) {
    const votes = (pokemon && JSON.parse(localStorage.getItem(this.getKey(pokemon)))) || { likes: 0, dislikes: 0 }

    return Promise.resolve(votes)
  }

  async storeLike(pokemon) {
    const votes = await this.getVotes(pokemon)

    votes.likes++
    localStorage.setItem(this.getKey(pokemon), JSON.stringify(votes))

    return votes
  }

  async storeDislike(pokemon) {
    const votes = await this.getVotes(pokemon)

    votes.dislikes++
    localStorage.setItem(this.getKey(pokemon), JSON.stringify(votes))

    return votes
  }

  getKey(pokemon) {
    return `pokevoter-${pokemon.name}-votes`
  }
}
