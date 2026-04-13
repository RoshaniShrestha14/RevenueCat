import kotlin from "./kotlin";
import aiSubscriptionMarginsPost from "./aiSubscriptionMargins";
import solveTimePost from "./solveTimePost";
import androidPaywallPost from "./androidPaywallPost";
import freeTrialPost from "./freeTrialPost";
import stateOfSubscription from "./stateOfSubscription";

const posts = [
  ...kotlin,
  aiSubscriptionMarginsPost,
  solveTimePost,
  androidPaywallPost,
  freeTrialPost,
  ...stateOfSubscription,
];

export default posts;
