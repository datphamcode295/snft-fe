import {
  useWeb3Modal,
  useWeb3ModalAccount,
} from '@web3modal/ethers/react'

const MetamaskLogin = () => {
  // const [account, setAccount] = useState(null);
  const { isConnected } = useWeb3ModalAccount()


  const modal = useWeb3Modal()
  // const state = useWeb3ModalState()

  return (
    <>
      {isConnected ? (
        <w3m-account-button balance='hide' />
      ) : (
        // <button onClick={connectToMetamask}>Login</button>
        <span className="flex items-center gap-4 cursor-pointer" onClick={() => {
          modal.open().then((provider) => {
              // setAccount("Ox1234")          
            })
        }}>
          <span
            className="rounded-md flex items-center gap-2 bg-[#295ED5] text-white h-10 px-4 transition hover:brightness-110"
            data-svelte-h="svelte-ci5bmk"
          >
            <span >Connect</span>
          </span>
        </span>
        // <>
        // {isConnected ? <w3m-account-button /> : <w3m-connect-button />}
        // </>
      )}
    </>
  );
};

export default MetamaskLogin
