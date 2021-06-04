var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

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
            assert.equal(totalSupply.toNumber(), 3, 'Couldn\'t to get correct total supply');
        })

        it('should get token balance', async function () { 
            let tokensBalance = await this.contract.balanceOf.call(accountThree, { from: accountThree })
            assert.equal(balance.toNumber(), 2, "Tokens balance of Account 3 incorrect");
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

            let newOwner = await this.contract.ownerOf.call(tokenId, { from: accountThree });
            assert.equal(newOwner, accountThree, "transfer failed");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({ from: accountOne });
        })

        it('should fail when minting when address is not contract owner', async function () {
            assert.fail(await config.myToken.mint(accountThree, 3, { from: accountTwo }));
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract._owner.call({ from: accountOne });
            assert.equal(accountOne, owner, "accountOne should be the owner");
        })

    });
})