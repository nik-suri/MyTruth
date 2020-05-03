export const bkg = chrome.extension.getBackgroundPage();

export function accessCSSBeliefColor(status: BeliefStatus): string {
  let colorVar: string;
  switch (status) {
  case BeliefStatus.True:
    colorVar = '--true-col';
    break;
  case BeliefStatus.False:
    colorVar = '--false-col';
    break;
  case BeliefStatus.Unsure:
    colorVar = '--unsure-col';
    break;
  }

  return window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(colorVar);
}

export function getLatestBelief(belief: SavedBelief): BeliefUpdate {
  if (belief.updates.length > 0) {
    return belief.updates[belief.updates.length - 1];
  }

  return belief.savedAs;
}