export const SAMPLE_ACTION = 'SAMPLE_ACTION';

export function sampleAction(payload) {
  return {
    type: SAMPLE_ACTION,
    payload: payload || 'Yo!'
  };
}
