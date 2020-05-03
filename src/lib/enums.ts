// hacky global enum solution as per https://github.com/Microsoft/TypeScript/issues/14975

enum Display {
  Main,
  SaveSuccess,
  Beliefs,
  StaleBeliefs,
  BeliefDetail,
  Settings
}

enum BeliefStatus {
  True = 'True',
  False = 'False',
  Unsure = 'Unsure'
}

(window as { Display?: typeof Display }).Display = Display;
(window as { BeliefStatus?: typeof BeliefStatus }).BeliefStatus = BeliefStatus;