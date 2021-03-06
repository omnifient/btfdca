const ADDRESSES = {
  // hardhat chain
  31337: {
    ADDRESS_SUPERFLUID_RESOLVER: `${process.env.REACT_APP_LOCAL_ADDRESS_SUPERFLUID_RESOLVER}`,
    ADDRESS_SUPERFLUID_HOST: `${process.env.REACT_APP_LOCAL_ADDRESS_SUPERFLUID_HOST}`,
    ADDRESS_SUPERFLUID_CFA: `${process.env.REACT_APP_LOCAL_ADDRESS_SUPERFLUID_CFA}`,
    ADDRESS_SUPERFLUID_IDA: `${process.env.REACT_APP_LOCAL_ADDRESS_SUPERFLUID_IDA}`,
  },
  // polygon mumbai
  80001: {
    ADDRESS_SUPERFLUID_RESOLVER: `${process.env.REACT_APP_MUMBAI_ADDRESS_SUPERFLUID_RESOLVER}`,
    ADDRESS_SUPERFLUID_HOST: `${process.env.REACT_APP_MUMBAI_ADDRESS_SUPERFLUID_HOST}`,
    ADDRESS_SUPERFLUID_CFA: `${process.env.REACT_APP_MUMBAI_ADDRESS_SUPERFLUID_CFA}`,
    ADDRESS_SUPERFLUID_IDA: `${process.env.REACT_APP_MUMBAI_ADDRESS_SUPERFLUID_IDA}`,

    ADDRESS_DCA_STABLEX_ENCX: `${process.env.REACT_APP_MUMBAI_ADDRESS_DCA_STABLEX_ENCX}`,
    ADDRESS_DCA_STABLEX_BTFDCAX: `${process.env.REACT_APP_MUMBAI_ADDRESS_DCA_STABLEX_BTFDCAX}`,
    ADDRESS_DCA_STABLEX_ENCX_IDX: `${process.env.REACT_APP_MUMBAI_ADDRESS_DCA_STABLEX_ENCX_IDX}`,
    ADDRESS_DCA_STABLEX_BTFDCAX_IDX: `${process.env.REACT_APP_MUMBAI_ADDRESS_DCA_STABLEX_BTFDCAX_IDX}`,

    ADDRESS_STABLE: `${process.env.REACT_APP_MUMBAI_ADDRESS_STABLE}`,
    ADDRESS_STABLEX: `${process.env.REACT_APP_MUMBAI_ADDRESS_STABLEX}`,
    ADDRESS_ENC: `${process.env.REACT_APP_MUMBAI_ADDRESS_ENC}`,
    ADDRESS_ENCX: `${process.env.REACT_APP_MUMBAI_ADDRESS_ENCX}`,
    ADDRESS_BTFDCA: `${process.env.REACT_APP_MUMBAI_ADDRESS_BTFDCA}`,
    ADDRESS_BTFDCAX: `${process.env.REACT_APP_MUMBAI_ADDRESS_BTFDCAX}`,
  },
};

export { ADDRESSES };
