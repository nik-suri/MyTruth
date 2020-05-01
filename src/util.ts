export const bkg = chrome.extension.getBackgroundPage();

export enum Display {
  Main,
  SaveSuccess,
  Beliefs,
  StaleBeliefs,
  BeliefDetail
}

export enum BeliefStatus {
  True = 'true',
  False = 'false',
  Unsure = 'unsure'
}

export interface SavedBelief {
  belief: string;
  status: BeliefStatus;
  savedTime: number;
  updatedTime: number | null;
  beliefURL: string | undefined;
}

// interface to pass a list of stale beliefs to a child component
// the belief is wrapped with its original index in the un-shortened list
export interface WrappedStaleBelief {
  savedBelief: SavedBelief;
  savedIndex: number;
}