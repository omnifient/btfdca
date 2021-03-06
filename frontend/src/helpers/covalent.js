const API_HOST = "localhost"; // process.env.REACT_APP_API_HOST
const API_PORT = "5000"; // process.env.REACT_APP_API_PORT
const API_SERVER = `http://${API_HOST}:${API_PORT}`;

async function getContractCurrentBalances(
  chainId,
  contractAddr,
  onFetchComplete
) {
  fetch(
    API_SERVER +
      "/balance/current?" +
      new URLSearchParams({ chain_id: chainId, contract_addr: contractAddr })
  )
    .then((rsp) => rsp.json())
    .then((data) => onFetchComplete(data));
}

async function getContractHistoricalBalances(
  chainId,
  contractAddr,
  onFetchComplete
) {
  fetch(
    API_SERVER +
      "/balance/historical?" +
      new URLSearchParams({ chain_id: chainId, contract_addr: contractAddr })
  )
    .then((rsp) => rsp.json())
    .then((data) => onFetchComplete(data));
}

export { getContractCurrentBalances, getContractHistoricalBalances };
