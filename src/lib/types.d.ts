interface BeliefUpdate {
  status: BeliefStatus;
  time: number;
}

interface SavedBelief {
  belief: string;
  savedAs: BeliefUpdate;
  updates: BeliefUpdate[];
  url: string | undefined;
  urlDomain: string | null;
}

// interface to pass a list of stale beliefs to a child component
// the belief is wrapped with its original index in the un-shortened list
interface WrappedStaleBelief {
  savedBelief: SavedBelief;
  savedIndex: number;
}

type WrappedOptionalBelief = [SavedBelief, number] | null;