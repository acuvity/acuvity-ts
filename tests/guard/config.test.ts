import { Match } from '../../src/guard/config'
import { DEFAULT_THRESHOLD } from '../../src/guard/threshold';
import { GuardName } from '../../src/guard/constants';
import { GuardConfig, Guard } from '../../src/guard/config';
import { GuardConfigError } from '../../src/guard/errors';
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Match', () => {
    it('should create a Match instance with default values', () => {
        const match = Match.create();

        expect(match.threshold).toEqual(DEFAULT_THRESHOLD);
        expect(match.redact).toBeFalsy();
        expect(match.countThreshold).toBe(0);
    });
});

describe('GuardConfig', () => {
    // Test 1: Default configuration
    test('should create with default configuration', () => {
        const config = new GuardConfig();
        const guards = config.getParsedGuards;

        expect(guards).toBeDefined();
        expect(Array.isArray(guards)).toBe(true);
        expect(guards.length).toBeGreaterThan(0);

        // Verify each guard has default values
        guards.forEach(guard => {
            expect(guard).toBeInstanceOf(Guard);
            expect(guard.threshold).toEqual(DEFAULT_THRESHOLD);
            expect(guard.matches).toEqual({});
            expect(guard.countThreshold).toBe(0);
        });
    });

    test('should create from object configuration with string name', () => {
        const configObj = {
            name: "prompt_injection",  // Using string name
            threshold: '>= 0.5',
        };

        const config = new GuardConfig(configObj);
        const guards = config.getParsedGuards;
        expect(guards.length).toBe(1);

        const guard = guards[0];
        expect(guard).toBeDefined();

        if (guard) {
            expect(guard.name.toString()).toBe("prompt_injection");
            expect(guard.threshold.toString()).toBe('>= 0.5');
        }
    });

    // Test 2: Object configuration
    test('should create from object configuration', () => {
        const configObj = {
            name: GuardName.KEYWORD_DETECTOR,
            threshold: '>= 0.5',
            matches: {
                'test-key': {
                    threshold: '>= 0.7',
                    redact: true,
                    countThreshold: 1
                }
            }
        };

        const config = new GuardConfig(configObj);
        const guards = config.getParsedGuards;

        expect(guards.length).toBe(1);
        const guard = guards[0];
        expect(guard).toBeDefined();
        if (guard) {
            expect(guard.name).toBe(GuardName.KEYWORD_DETECTOR);
            expect(guard.threshold.toString()).toBe('>= 0.5');
            expect(Object.keys(guard.matches).length).toBe(1);
            expect(guard.matches['test-key']).toBeDefined();
            if (guard.matches['test-key']) {
                expect(guard.matches['test-key'].redact).toBe(true);
                expect(guard.matches['test-key'].countThreshold).toBe(1);
            }
        } else {
            console.error("Guard not found")
        }
    });

    // Test 3: Invalid guard name
    test('should throw error for invalid guard name', () => {
        const configObj = {
            name: 'INVALID_GUARD',
            threshold: '>= 0.5'
        };

        expect(() => {
            new GuardConfig(configObj);
        }).toThrow(GuardConfigError);
    });
});


describe('GuardConfig YAML Tests', () => {
    let tempFilePath: string;

    beforeEach(() => {
        // Create a temporary file before each test
        tempFilePath = path.join(os.tmpdir(), `test-config-${Date.now()}.yaml`);
    });

    afterEach(() => {
        // Clean up temporary file after each test
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
    });

    test('should load valid YAML configuration', () => {
        // Create test YAML content
        const yamlContent = `
guardrails:
  - name: prompt_injection
    threshold: ">= 0.5"
  - name: jailbreak
    threshold: ">= 0.6"
`;

        // Write YAML to temporary file
        fs.writeFileSync(tempFilePath, yamlContent, 'utf8');

        // Load configuration
        const config = new GuardConfig(tempFilePath);
        const guards = config.getParsedGuards;

        // Verify configuration
        expect(guards.length).toBe(2);

        // Verify first guard
        const firstGuard = guards[0];
        if (firstGuard) {
            expect(firstGuard.name.toString()).toBe('prompt_injection');
            expect(firstGuard.threshold.toString()).toBe('>= 0.5');
            expect(Object.keys(firstGuard.matches).length).toBe(0);
            if (firstGuard.matches['test-key']) {
                expect(firstGuard.matches['test-key'].threshold.toString()).toBe('>= 0.7');
            }
        }

        // Verify second guard
        const secondGuard = guards[1];
        if (secondGuard) {
            expect(secondGuard.name.toString()).toBe('jailbreak');
            expect(secondGuard.threshold.toString()).toBe('>= 0.6');
            expect(Object.keys(secondGuard.matches).length).toBe(0);
        }
    });

    test('should throw error for invalid YAML format', () => {
        // Create invalid YAML content
        const invalidYamlContent = `
guardrails:
  - name: prompt_inject
    threshold: ">= 0.5"
`;

        // Write invalid YAML to temporary file
        fs.writeFileSync(tempFilePath, invalidYamlContent, 'utf8');

        // Verify it throws error
        expect(() => {
            new GuardConfig(tempFilePath);
        }).toThrow(GuardConfigError);
    });

    test('should throw error for non-existent YAML file', () => {
        const nonExistentPath = path.join(os.tmpdir(), 'non-existent.yaml');

        expect(() => {
            new GuardConfig(nonExistentPath);
        }).toThrow(GuardConfigError);
    });
});


describe('GuardConfig Array Tests', () => {
    test('should accept array of Guard objects', () => {
        // Create array of Guard instances
        const guards = [
            Guard.create(
                GuardName.PROMPT_INJECTION,
                {},
                '>= 0.5'
            ),
            Guard.create(
                GuardName.JAIL_BREAK,
                {},
                '>= 0.6'
            )
        ];

        const config = new GuardConfig(guards);
        const parsedGuards = config.getParsedGuards;

        // Verify guards were parsed correctly
        expect(parsedGuards.length).toBe(2);

        // Verify first guard
        const firstGuard = parsedGuards[0];
        if (firstGuard) {
            expect(firstGuard.name).toBe(GuardName.PROMPT_INJECTION);
            expect(firstGuard.threshold.toString()).toBe('>= 0.5');
        }

        // Verify second guard
        const secondGuard = parsedGuards[1];
        if (secondGuard) {
            expect(secondGuard.name).toBe(GuardName.JAIL_BREAK);
            expect(secondGuard.threshold.toString()).toBe('>= 0.6');
            expect(Object.keys(secondGuard.matches)).toEqual([]);
        }
    });

    test('should handle empty array of guards', () => {
        const guards: Guard[] = [];
        const config = new GuardConfig(guards);

        expect(config.getParsedGuards.length).toBe(0);
    });

    test('should handle array with mixed guard configurations', () => {
        const guards = [
            // Guard with matches
            Guard.create(GuardName.PII_DETECTOR, {
                'email': Match.create('>= 0.9', true),
                'phone': Match.create('>= 0.8', true)
            }),
            // Guard without matches
            Guard.create(GuardName.TOXICITY),
            // Guard with custom threshold
            Guard.create(GuardName.BIAS, {}, '>= 0.7')
        ];

        const config = new GuardConfig(guards);
        const parsedGuards = config.getParsedGuards;

        expect(parsedGuards.length).toBe(3);

        // Check PII detector guard
        const piiGuard = parsedGuards[0];
        if (piiGuard) {
            expect(piiGuard.name).toBe(GuardName.PII_DETECTOR);
            expect(Object.keys(piiGuard.matches).length).toBe(2);
            if (piiGuard.matches['email']) {
                expect(piiGuard.matches['email'].threshold.toString()).toBe('>= 0.9');
            }
            if (piiGuard.matches['phone']) {
                expect(piiGuard.matches['phone'].threshold.toString()).toBe('>= 0.8');
            }
        }
        // Check toxicity guard
        const toxicityGuard = parsedGuards[1];
        if (toxicityGuard) {
            expect(toxicityGuard.name).toBe(GuardName.TOXICITY);
            expect(Object.keys(toxicityGuard.matches).length).toBe(0);
        }

        // Check bias guard
        const biasGuard = parsedGuards[2];
        if (biasGuard) {
            expect(biasGuard.name).toBe(GuardName.BIAS);
            expect(biasGuard.threshold.toString()).toBe('>= 0.7');
        }
    });

    test('should validate each guard in the array', () => {
        // Create an invalid guard (wrong type for threshold)
        const invalidGuard = {
            name: GuardName.PROMPT_INJECTION,
            threshold: 'invalid threshold'
        };

        // @ts-ignore - intentionally passing invalid type for testing
        expect(() => {
            new GuardConfig([invalidGuard]);
        }).toThrow(GuardConfigError);
    });
});
