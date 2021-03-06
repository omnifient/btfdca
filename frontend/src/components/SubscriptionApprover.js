import Button from "./mui/Button";
import { getSignerAndFramework } from "../helpers/sf";

// TODO: revamp this component
// list all existent distributions, and show an approve status and approve button

// async function approveSubscription(targetToken) {
//   console.log("approving subscription to", targetToken);
//   const [chainId, signer, sf] = await getSignerAndFramework();

//   try {
//     const subscriptionApprovalOp = await sf.idaV1.approveSubscription({
//       indexId: SF_DISTRIBUTION_SUBSCRIPTION_IDX, // TODO: nop
//       superToken: targetToken,
//       publisher: ADDRESSES[chainId].ADDRESS_DCA_SUPERAPP, // TODO: this needs to be parametrized
//     });
//     console.log("approval operation", subscriptionApprovalOp);

//     const result = await subscriptionApprovalOp.exec(signer);
//     console.log("subscription approved", result);
//   } catch (error) {
//     console.error(error);
//   }
// }

function SubscriptionApprover({ chainId }) {
  return (
    <div>
      <Button
        variant="contained"
        size="large"
        component="button"
        color="secondary"
        sx={{ mt: 2, mb: 2, minWidth: 200 }}
        // onClick={async () =>
        //   // TODO: go to wallet
        // approveSubscription(ADDRESSES[chainId].TARGET_TOKEN)
        // }
      >
        🤑 I want to get paid! 💰
      </Button>
    </div>
  );
}

export default SubscriptionApprover;
