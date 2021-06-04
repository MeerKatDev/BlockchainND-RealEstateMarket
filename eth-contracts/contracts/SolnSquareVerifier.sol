pragma solidity ^0.5.1;

import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "../../zokrates/code/square/verifier.sol";

contract CustomVerifier is Verifier {

}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {

	CustomVerifier public verifierContract;
    constructor(address verifier)
    CustomERC721Token()
    public
    {
        verifierContract = CustomVerifier(verifier);
    }

	// TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address to;
    }

	// TODO define an array of the above struct
    Solution[] solutionsArray;

	// TODO define a mapping to store unique solutions submitted
	mapping(bytes32 => Solution) private solutions;

	// TODO Create an event to emit when a solution is added
    event SolutionAdded(address to, uint256 index);

	// TODO Create a function to add the solutions to the array and emit the event
    function addSolutionToArray(address to, uint256 index, bytes32 solutionKey) internal {
        Solution memory solution = Solution(index, to);
        solutionsArray.push(solution);

    	solutions[solutionKey] = solution;
    	emit SolutionAdded(to, index);
    }

	// TODO Create a function to mint new NFT only after the solution has been verified
	//  - make sure the solution is unique (has not been used before)
	//  - make sure you handle metadata as well as tokenSuplly
    function mint(address _to, uint256 _tokenId, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input)
    public
    {
        // hash solution to get key
        bytes32 solutionKey = keccak256(abi.encodePacked(a, b, c, input));

        //  - make sure the solution is unique (has not been used before)
        require(solutions[solutionKey].to == address(0), "Solution is already in use.");

        //  verify solution
        require(verifierContract.verifyTx(a, b, c, input), "Solution incorrect");

        addSolutionToArray(_to, _tokenId, solutionKey);
        //  - make sure you handle metadata as well as tokenSuplly
        super.mint(_to, _tokenId);
    }
}


  


























