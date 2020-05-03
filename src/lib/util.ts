export const bkg = chrome.extension.getBackgroundPage();

export function getLatestBelief(belief: SavedBelief): BeliefUpdate {
  if (belief.updates.length > 0) {
    return belief.updates[belief.updates.length - 1];
  }

  return belief.savedAs;
}