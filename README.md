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

### Additional packages used
Apart from the provided packages, I also added

 - `truffle-assertions`: to add assertions interacting with solidity's `require`
 - `dotenv`: to add the ability of using environment files

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
Since we are only testing, `truffle-config.js` contains the configuration to deploy on INFURA.
To run the migration, having both keys

```bash
MNEMONIC=one two three
INFURA_KEY=<project_id>
```

in the environment file .env under project root:

```bash
cd eth-contracts
truffle migrate --network rinkeby
```

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
