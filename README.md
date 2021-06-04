# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

## Description
The project is divided in two main parts: eth-contracts and zokrates.
The js/solidity code is completely contained in eth-contracts.

## Initialization

Install node dependencies and compile contracts, from the project root run:

```bash
npm i && cd eth-contracts && truffle compile
```

## Testing
In order to run tests, we can use `truffle`, from `eth-contracts`:

```bash
truffle test
```

or one by one:

```bash
truffle test ./test/TestERC721Mintable.js
truffle test ./test/TestSquareVerifier.js
truffle test ./test/TestSolnSquareVerifier.js
```


## ZoKrates
To setup and run the example zokrates code, we need Docker. Then we run:

```bash
docker run -v zokrates:/home/zokrates/code -ti zokrates/zokrates /bin/bash
```

to access the container with the zokrates image. Depending on the version, you may need to verify where is zokrates with

```bash
which zokrates
```

then run

```
cd code/square

# Compile the example file
zokrates compile -i square.code

zokrates setup

# we can input infinite arguments, in our case we need two numbers.
zokrates compute-witness -a <a> <b>

zokrates generate-proof

zokrates export-verifier
```

and like that we will obtain all the files needed.

## Deployment
After setting up `truffle-config.js`, we are ready to go and deploy on any network.

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
