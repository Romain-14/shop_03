# SHOP 3ème partie

## Authentification

- ajouter les pages qui vont gérer la connexion ou la création d'un compte

Cette page aura de base un formulaire simple de connexion
- email
- password

un message sous ce formulaire demandera à l'utilisateur s'il possède déjà un compte et le lien vers cette page à coté / en dessous

dans le menu du header se trouvera uniquement l'accès vers la page de connexion


essayer de mettre en place en autonomie l'installation du module qui permets via un middleware de conserver des données entre chaque cycle de requête / réponse.
Utilise un identifiant qui sera installé dans les cookies du client, et qui fera le lien avec la session coté serveur

https://www.npmjs.com/package/express-session