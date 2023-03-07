module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // gravité moyenne
      'always', // doit être toujours vérifiée
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert'],
      // "feat" pour une nouvelle fonctionnalité
      // "fix" pour une correction de bug
      //"docs" pour une modification de documentation
      //"style" pour une modification d'apparence
      //"refactor" pour une modification de refactoring
      //"test" pour une modification de test
      //"chore" pour une modification qui n'affecte pas le code, comme la mise à jour de la configuration
      //"revert" pour un commit qui annule les modifications précédentes.
    ],
    'subject-empty': [2, 'never'], //interdit les messages de commit vides
    'subject-max-length': [2, '5000'], // limite la longueur maximale de la description à 100 caractères
  },
};