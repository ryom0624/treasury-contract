import { task, types } from 'hardhat/config';

task('treasury:balance', 'get balance of treasury contract', async (_, hre) => {
  const { deployments } = hre;

  const signers = await hre.ethers.getSigners();
  const owner = signers[0];

  const treasury = await deployments.get('Treasury');
  const contract = await hre.ethers.getContractAt('Treasury', treasury.address, owner);

  const balance = await contract.balance();

  console.log('address', treasury.address);
  console.log('balance', hre.ethers.utils.formatEther(balance));
});

task('treasury:deposit', 'deposit to treasury contract')
  .addParam('amount', 'amount of ether to deposit ("1" = 1 ether)', undefined, types.string)
  .setAction(async (taskArgs, hre) => {
    const amout = taskArgs.amount;

    const { deployments } = hre;

    const signers = await hre.ethers.getSigners();
    const owner = signers[0];

    const treasury = await deployments.get('Treasury');

    const tx = await owner.sendTransaction({
      to: treasury.address,
      value: hre.ethers.utils.parseEther(amout),
    });

    console.log('tx', tx);
  });

task('treasury:withdraw', 'withdaaw from treasury contract', async (_, hre) => {
  const { deployments } = hre;

  const signers = await hre.ethers.getSigners();
  const owner = signers[0];

  const treasury = await deployments.get('Treasury');
  const contract = await hre.ethers.getContractAt('Treasury', treasury.address, owner);

  const tx = await contract.connect(owner).withdraw();
  console.log('tx', tx);
});
