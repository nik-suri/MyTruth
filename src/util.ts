export const bkg = chrome.extension.getBackgroundPage()

export enum Display {
  Main,
  SaveSuccess,
  Beliefs
}

export enum BeliefStatus {
  True = 'true',
  False = 'false',
  Unsure = 'unsure'
}

export interface SavedBelief {
  belief: string;
  status: BeliefStatus;
}