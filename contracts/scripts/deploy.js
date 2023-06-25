async function main() {
  const voter = await ethers.deployContract("Voter")
  await voter.deployTransaction.wait()

  console.log(`Voter contract deployed to ${voter.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
