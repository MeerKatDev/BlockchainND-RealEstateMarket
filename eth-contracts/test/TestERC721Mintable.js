const ERC721MintableComplete = artifacts.require('CustomERC721Token');
const truffleAssert = require('truffle-assertions');

contract('TestERC721Mintable', accounts => {

    const accountOne = accounts[0];
    const accountTwo = accounts[1];
    const accountThree = accounts[2];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({ from: accountOne });

            // TODO: mint multiple tokens
            await this.contract.mint(accountTwo, 1, { from: accountOne });
            await this.contract.mint(accountThree, 2, { from: accountOne });
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call();
            assert.equal(totalSupply.toNumber(), 2, 'Couldn\'t to get correct total supply');
        })

        it('should get token balance', async function () { 
            let tokensBalance = await this.contract.balanceOf.call(accountThree, { from: accountThree });
            assert.equal(tokensBalance.toNumber(), 1, "Tokens balance of Account 3 incorrect");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let tokenURI = await this.contract.tokenURI.call(1, { from: accountOne });
            assert.equal(
                tokenURI, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1',
                "TokenURI is not the original URI");
        })

        it('should transfer token from one owner to another', async function () {
            await this.contract.transferFrom(accountTwo, accountThree, 1, { from: accountTwo });

            let newOwner = await this.contract.ownerOf.call(1, { from: accountThree });
            assert.equal(newOwner, accountThree, "transfer failed");
        })
    });

    describe('has ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({ from: accountOne });
        })

        it('should fail when minting when address is not contract owner', async function () {
            // assert.throws(await , Error);
            let failingString = "This function can be called only by the owner";
            await truffleAssert.reverts(this.contract.mint.call(accountThree, 3, { from: accountTwo }), failingString);
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner.call(); //.call({ from: accountOne });
            assert.equal(accountOne, owner, "accountOne should be the owner");
        })

    });
})