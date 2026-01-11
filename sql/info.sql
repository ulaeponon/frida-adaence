
CREATE TABLE activities (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);
   CREATE TABLE seniors (
    id INTEGER PRIMARY KEY,
    firstname TEXT NOT NULL,
    age INTEGER NOT NULL,
    job TEXT,
    city TEXT NOT NULL,
    zipcode TEXT NOT NULL,
    description TEXT,
    img link TEXT,
    activity_id INTEGER NOT NULL
);
CREATE TABLE volunteers (
    id INTEGER PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT NOT NULL,
    zipcode TEXT NOT NULL
);
CREATE TABLE meetings (
    id INTEGER PRIMARY KEY,
    senior_id INTEGER,
    volunteer_id INTEGER,
    activity_id INTEGER,
);

INSERT INTO activities (name, description) VALUES
('Un café/thé', 'Moment convivial autour d''une boisson chaude'),
('Un repas', 'Partager un repas ensemble'),
('Une promenade', 'Balade en extérieur'),
('Une sortie culturelle', 'Visite de musée, théâtre, exposition'),
('Autre activité', 'Activité personnalisée selon les envies');

INSERT INTO seniors (firstname, age, job, city, zipcode, description, activity_type) VALUES
('Franco', 95, 'Ouvrier d''usine', 'Saint-Étienne', '42000', 
 'Franco adore raconter ses souvenirs de l''usine et partager un bon café avec les jeunes du quartier.',
 'Un café/thé'),

('Soares', 84, 'Puéricultrice', 'Angers', '49000', 
 'Soares a consacré sa vie aux tout-petits et aime aujourd''hui transmettre tendresse et conseils de vie.',
 'Un repas'),

('Tim', 80, 'Facteur', 'Aurillac', '15000', 
 'Ancien facteur, Tim connaît chaque recoin de sa ville et adore les longues balades en bonne compagnie.',
 'Une promenade'),

('Shimo', 94, 'Professeure', 'Besançon', '25000', 
 'Shimo a le cœur sur la main et des tas d''histoires passionnantes à raconter sur ses années d''enseignement.',
 'Un café/thé'),

('Zanon', 86, 'Journaliste', 'Paris', '75011', 
 'Zanon est curieuse du monde et adore échanger autour d''un bon livre ou d''un article d''actualité.',
 'Une sortie culturelle'),

('Matveev', 77, 'Pilote d''avion', 'Toulouse', '31000', 
 'Pilote à la retraite, Matveev a mille anecdotes à partager sur ses voyages aux quatre coins du monde.',
 'Une sortie culturelle'),

('Mahe', 93, 'Mécanicienne', 'Le Mans', '72000', 
 'Mahe a les mains d''or et le sourire généreux. Elle aime parler de mécanique, mais surtout de lien humain.',
 'Autre activité'),

('Samir', 82, 'Musicien', 'Lyon', '69007', 
 'Musicien passionné, Samir aime improviser quelques notes et créer des moments chaleureux avec les jeunes.',
 'Un repas');


SELECT * FROM activities;
SELECT * FROM seniors;
SELECT firstname, age,activities.name FROM seniors WHERE city = 'Lyon';
SELECT firstname, city, description FROM seniors WHERE activities.name= 'Un café/thé';
SELECT * FROM meetings;