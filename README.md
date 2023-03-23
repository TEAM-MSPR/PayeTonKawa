# PayeTonKawa

## Sécurité de l'API
L'accès à l'application requiert une connexion d'utilisateur, avec génération de token lors de la validation de l'inscription. Pour renforcer la sécurité, un code QR est également généré et un envoi de mail est effectué pour vérifier l'authenticité de l'utilisateur. Ces mesures permettent de limiter les risques d'accès non autorisés et de protéger les données sensibles.

## Langage de programmation
Le langage de programmation choisi pour le développement est JavaScript. Ce choix a été motivé par la familiarité de l'équipe avec ce langage. Le langage offre également de nombreux outils et bibliothèques qui facilitent le développement et la maintenance de l'application.

## Règles d'hébergement
L'application peut être hébergée sur une infrastructure qui permet la gestion de cache et de base de données. Nous pouvons utiliser des outils d'automatisation pour gérer le déploiement et les mises à jour de l'application, ce qui réduit les risques d'erreurs humaines et assure une haute disponibilité. Nous pouvons également mettre en place un système de scaling horizontal et vertical pour garantir des performances optimales, même en cas de pic de trafic.

## Gestion du code source
Nous utilisons GitHub comme plateforme de gestion de code source. Cette solution offre de nombreux avantages, notamment en termes de collaboration et de suivi des modifications. Nous avons également choisi d'utiliser GitHub Actions pour la gestion du déploiement, ce qui va en accord avec ce choix de gestionnaire de code source.

## Gestion du déploiement
Nous avons choisi Github Actions pour la gestion du déploiement de notre projet, afin de maintenir une cohérence avec notre outil de gestion du code source, Github. Cette solution permet d'automatiser les workflows et d'utiliser des actions prêtes à l'emploi pour les différentes étapes du processus, évitant ainsi à l'utilisateur d'avoir à écrire du code répétitif. Cela simplifie également la maintenance de nos scripts en assurant leur compatibilité avec les dernières versions des différents outils et technologies utilisés.
