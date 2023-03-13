import { expect } from 'chai';
import '@nomiclabs/hardhat-ethers';
import { ethers, deployments } from 'hardhat';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Treasury } from '../typechain-types';

import { getBalanceETH, getCurrentBlockNumber, takeChainSnapshot } from '../utils/hardhat-test-util';

describe('Treasury', async () => {
  let signer: SignerWithAddress;
  let evilWallet: SignerWithAddress;
  let treasury: Treasury;

  beforeEach(async () => {
    const { Treasury } = await deployments.fixture(['Treasury']);

    treasury = (await ethers.getContractAt('Treasury', Treasury.address, signer)) as Treasury;

    const signers = await ethers.getSigners();
    signer = signers[0];
    evilWallet = signers[1];
  });

  it('expect behavior', async () => {
    expect(await treasury.connect(signer).balance()).to.be.equal(0);

    await signer.sendTransaction({
      to: treasury.address,
      value: ethers.utils.parseEther('1'),
    });

    expect(await treasury.connect(signer).balance()).to.be.equal(ethers.utils.parseEther('1'));

    await expect(treasury.connect(evilWallet).withdraw()).to.be.revertedWith('Only owner can withdraw');

    await treasury.connect(signer).withdraw();

    expect(await treasury.balance()).to.be.equal(0);
  });
});
