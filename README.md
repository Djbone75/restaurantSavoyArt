Bienvenue sur Quai Antique restaurant, site créé grâce au soutient de formation studi.fr

Cette application est divisé en deux : une appli pour le front end avec angular, une autre pour le backend en node.js.
cd backend puis npm init pour le backend
cd.. puis cd quaiAntique npm init pour installer les modules.

Pour installer l'application
1: cd backend puis installer le client prisma qui va s'occuper de faire la migration de la base de donnée
npm i @prisma/client --save
2: créer un fichier .env dans /backend contenant :

DATABASE_URL="postgres://login:password@liendeladatabase:ROUTE/keydeladatabase" //il faudra avoir une base de donnée postgres locale
JWT_SECRET="unegrandephraseauhasardcompliquéeàdeviner"

// si vous voulez utiliser cloudinary

CLOUDINARY_URL="cloudinary://<CLOUDINARY_KEY>:<CLOUDINARY_SECRET>@<CLOUDINARY_CLOUD_NAME>"
CLOUDINARY_URL_IMG="https://res.cloudinary.com/<CLOUDINARY_CLOUD_NAME>/image/upload/"
bien sûr un compte (gratuit) cloudinary sera nécessaire mais utile que sur un serveur, car par exemple heroku efface tout les fichiers locaux statiques comme les images, mais en local ce n'est pas obligatoire.

3: les fichiers de migrations sont déjà present il ne reste qu'a faire "npx prisma migrate dev --name init" dans le terminal
la partie backend est terminée
Pour tester l'application:

1: cd backend puis taper "npm run dev" dans l'invite de commande
2: ouvrir un autre terminal, puis taper "ng serve" dans l'invite de commande

le site tourne mais il reste une petite subtilitée.

3: creer un compte avec l'email "admin@admin.com" et le mot de passe "admin" et se rendre sur la page : "http://nomdusitebackend/user/makeadmin". "nomdusitebackend" sera http://localhost:4200 en local
vous pourrez ensuite tester le mode admin.
4: se rendre sur "http://nomdusitebackend/horaires/basicschedule" pour créer les premiers horaires du restaurant que l'on peut ensuite modifier en mode admin

Vous pouvez aussi modifier directement sur la base locale postgres en collant ceci dans psql:
'insert into "Horaires" ("id", "name", "dayStartAM", "dayEndAM", "dayStartPM", "dayEndPM") values (1, 'lundi', '11:00:00', '16:00:00', '18:00:00', '22:00:00'), (2, 'mardi', '11:00:00', '16:00:00', '18:00:00', '22:00:00'),(3, 'mercredi', '11:00:00', '16:00:00', '18:00:00', '22:00:00'),(4, 'jeudi', '11:00:00', '16:00:00', '18:00:00', '22:00:00'),(5, 'vendredi', '11:00:00', '16:00:00', '18:00:00', '22:00:00'),(6, 'samedi', '11:00:00', '16:00:00', '18:00:00', '22:00:00'), (7, 'dimanche', '11:00:00', '16:00:00', '18:00:00', '22:00:00'),;'
