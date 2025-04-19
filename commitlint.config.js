module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style']],
        // 'subject-case': [2, 'always', 'sentence-case'],
    },
};