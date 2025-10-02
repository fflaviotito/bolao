/** @type {import('ts-jest').JestConfigWithTsJest} */

const config = {
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/tests/**/*.test.ts'],
    moduleDirectories: ['node_modules', 'src'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: true,
                tsconfig: 'tsconfig.json',
            },
        ],
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default config;
