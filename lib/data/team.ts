export type TeamGroup = 'Leadership' | 'Engineering' | 'Agronomy';

/**
 * Membre d'équipe. Nom et rôle vivent dans `about.team.members.<id>` (fr/en/ar) ;
 * photo et LinkedIn sont indépendants de la langue.
 */
export type TeamMember = {
  id: string;
  team: TeamGroup;
  photo?: string;
  linkedin?: string;
};

/** Portraits reused from `/public/team/`; left undefined where no file exists. */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'imen-hbiri',
    team: 'Leadership',
    photo: '/team/Imen-Hbiri.png',
    linkedin: 'https://www.linkedin.com/in/dr-ing-imen-hbiri-323a5bb6/',
  },
  {
    id: 'ameur-hbiri',
    team: 'Leadership',
    photo: '/team/Ameur-Hbiri.jpg',
    linkedin: 'https://www.linkedin.com/in/ameur-hbiri/',
  },
  {
    id: 'malek-benmbarek',
    team: 'Leadership',
    photo: '/team/Malek-Ben-mbarek.jpg',
    linkedin: 'https://www.linkedin.com/in/malek-ben-mbarek-16a40a1b/',
  },
  {
    id: 'po',
    team: 'Leadership',
    linkedin: 'https://www.linkedin.com/in/karim-hbiri/',
  },
  {
    id: 'zekri-mohamed',
    team: 'Leadership',
    photo: '/team/Mohamed-zekri.png',
    linkedin: 'https://www.linkedin.com/in/zekri-mohamed-2a4bb7143/',
  },
  {
    id: 'ali-chaabouni',
    team: 'Engineering',
    photo: '/team/Ali-chaabouni.png',
    linkedin: 'https://www.linkedin.com/in/ali-chaabouni-99b515179/',
  },
  {
    id: 'mohamed-habib-loukil',
    team: 'Engineering',
    photo: '/team/Mohamed-Habib-Loukil.png',
    linkedin: 'https://www.linkedin.com/in/habib-loukil/',
  },
  {
    id: 'moataz-guidara',
    team: 'Engineering',
    photo: '/team/Moataz-Guidara.png',
    linkedin: 'https://www.linkedin.com/in/moataz-guidara-5638051a1/',
  },
  {
    id: 'ahmed-elleuch',
    team: 'Engineering',
    photo: '/team/Ahmed-Elleuch.png',
    linkedin: 'https://www.linkedin.com/in/ahmed-elleuch/',
  },
  {
    id: 'ali-fourati',
    team: 'Engineering',
    photo: '/team/Ali-Fourati.png',
    linkedin: 'https://www.linkedin.com/in/ali-fourati-3226a5313/',
  },
  {
    id: 'anwar-benmahmoud',
    team: 'Engineering',
    photo: '/team/Anwar-Ben-Mahmoud.png',
    linkedin: 'https://www.linkedin.com/in/anwar-ben-mahmoud-746354102/',
  },
  {
    id: 'marwa-kadri',
    team: 'Agronomy',
    photo: '/team/Marwa-kadri.png',
    linkedin: 'https://www.linkedin.com/in/marwa-kadri-72a935232/',
  },
  {
    id: 'nour-el-houda-boughattas',
    team: 'Agronomy',
    photo: '/team/Boughattas-Nour-El-Houda.png',
    linkedin: 'https://www.linkedin.com/in/boughattas-nour-el-houda-496031188/',
  },
  {
    id: 'emna-abdellatif',
    team: 'Agronomy',
    linkedin: 'https://www.linkedin.com/in/emna-abdellatif-21623625/',
  },
];
