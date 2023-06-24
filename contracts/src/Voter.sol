// SPDX-License-Identifier: GPL-2

pragma solidity ^0.8.0;

contract Voter {
  struct VoteResult {
    uint likes;
    uint dislikes;
  }

  mapping (string => VoteResult) results;

  function like(string calldata pokemonName) public {
    results[pokemonName].likes++;
  }

  function dislike(string calldata pokemonName) public {
    results[pokemonName].dislikes++;
  }

  function getResults(string calldata pokemonName) public view returns (uint[2] memory) {
    VoteResult memory result = results[pokemonName];

    return [result.likes, result.dislikes];
  }
}
