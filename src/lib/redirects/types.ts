export type RedirectRule = {
  source: string;
  destination: string;
};

export type RedirectMapping = RedirectRule & {
  /**
   * 0..1 score from mapping generator. Only used for review/triage.
   */
  confidence: number;
  /**
   * Optional human-readable rationale for why the mapping was chosen.
   */
  reason?: string;
};
