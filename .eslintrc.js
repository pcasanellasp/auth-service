module.exports = {
  "extends": "standard",
  "env": {
    "jest": true
  },
  rules: {
    'no-console': ['error', { 'allow': ['info', 'warn', 'error'] }],
    'comma-dangle': ['error', 'always-multiline'],
  },
  globals: {
    "ApiError": "readonly",
  },
}