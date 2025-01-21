module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./tests'],
    testMatch: ['**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.json'
        }]
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1'
    },
};
