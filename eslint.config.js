export default [
    {
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: {
        parser: (await import('@typescript-eslint/parser')).default,
        parserOptions: {
          sourceType: 'module'
        }
      },
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: '@/utils/hooks/mmkv/useStorage',
                importNames: ['reduxStorage'],
                message: '❌ El uso de reduxStorage está prohibido porque es inseguro.'
              }
            ]
          }
        ]
      }
    }
  ];
  