const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const merkleTree = new MerkleTree(niceList);

async function main() {
  {
    console.log('=== [Case 1: valid proof and valid name] ===');
    const index = Math.round(Math.random() * 10);
    const name = niceList[index];
    const proof = merkleTree.getProof(index);
    await proofProcedure({ name, proof });
    console.log('=== [End] ===');
  }

  {
    console.log('=== [Case 2: valid proof but invalid name] ===');
    const index = Math.round(Math.random() * 10);
    const name = 'whoami';
    const proof = merkleTree.getProof(index);
    await proofProcedure({ name, proof });
    console.log('=== [End] ===');
  }

  {
    console.log('=== [Case 3a: invalid proof but valid name] ===');
    const index = Math.round(Math.random() * 10);
    const name = niceList[index];
    const proof = [{ data: Buffer.from(name, 'utf-8').toString('hex'), left: true }];
    await proofProcedure({ name, proof });
    console.log('=== [End] ===');
  }

  {
    console.log('=== [Case 3b: invalid proof but valid name] ===');
    const index = Math.round(Math.random() * 10);
    const name = niceList[index];
    const proof = [{ data: Buffer.from(name, 'utf-8').toString('hex'), left: false }];
    await proofProcedure({ name, proof });
    console.log('=== [End] ===');
  }

  async function proofProcedure({ name, proof }) {
    // TODO: how do we prove to the server we're on the nice list?

    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      // TODO: add request body parameters here!
      name,
      proof,
    });

    console.log({ gift });
  }
}

main();
