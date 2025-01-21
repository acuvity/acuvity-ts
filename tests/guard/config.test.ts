import { Match } from '../../src/guard/config'
import { DEFAULT_THRESHOLD } from '../../src/guard/threshold';

describe('Match', () => {
    it('should create a Match instance with default values', () => {
        const match = Match.create();

        expect(match.threshold).toEqual(DEFAULT_THRESHOLD);
        expect(match.redact).toBeFalsy();
        expect(match.countThreshold).toBe(0);
    });
});
