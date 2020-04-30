export const bkg = chrome.extension.getBackgroundPage();

export enum Display {
  Main,
  SaveSuccess,
  Beliefs,
  StaleBeliefs
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
}

export interface WrappedStaleBelief {
  savedBelief: SavedBelief;
  savedIndex: number;
}