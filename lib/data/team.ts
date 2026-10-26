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
    photo: '/team/Imen-Hbiri.webp',
    linkedin: 'https://www.linkedin.com/in/dr-ing-imen-hbiri-323a5bb6/',
  },
  {
    id: 'ameur-hbiri',
    team: 'Leadership',
    photo: '/team/Ameur-Hbiri.webp',
    linkedin: 'https://www.linkedin.com/in/ameur-hbiri/',
  },
  {
    id: 'po',
    team: 'Leadership',
    photo: '/team/Karim-Hbiri.webp',
    linkedin: 'https://www.linkedin.com/in/karim-hbiri/',
  },
  {
    id: 'ali-chaabouni',
    team: 'Engineering',
    photo: '/team/Ali-chaabouni.webp',
    linkedin: 'https://www.linkedin.com/in/ali-chaabouni-99b515179/',
  },
  {
    id: 'mohamed-habib-loukil',
    team: 'Engineering',
    photo: '/team/Mohamed-Habib-Loukil.webp',
    linkedin: 'https://www.linkedin.com/in/habib-loukil/',
  },
  {
    id: 'moataz-guidara',
    team: 'Engineering',
    photo: '/team/Moataz-Guidara.webp',
    linkedin: 'https://www.linkedin.com/in/moataz-guidara-5638051a1/',
  },
  {
    id: 'ahmed-elleuch',
    team: 'Engineering',
    photo: '/team/Ahmed-Elleuch.webp',
    linkedin: 'https://www.linkedin.com/in/ahmed-elleuch/',
  },
  {
    id: 'ali-fourati',
    team: 'Engineering',
    photo: '/team/Ali-Fourati.webp',
    linkedin: 'https://www.linkedin.com/in/ali-fourati-3226a5313/',
  },
  {
    id: 'anwar-benmahmoud',
    team: 'Engineering',
    photo: '/team/Anwar-Ben-Mahmoud.webp',
    linkedin: 'https://www.linkedin.com/in/anwar-ben-mahmoud-746354102/',
  },
  {
    id: 'hadil-yangui',
    team: 'Engineering',
    photo: '/team/Hadil-Yangui.webp',
  },
  {
    id: 'marwa-kadri',
    team: 'Agronomy',
    photo: '/team/Marwa-kadri.webp',
    linkedin: 'https://www.linkedin.com/in/marwa-kadri-72a935232/',
  },
  {
    id: 'nour-el-houda-boughattas',
    team: 'Agronomy',
    photo: '/team/Boughattas-Nour-El-Houda.webp',
    linkedin: 'https://www.linkedin.com/in/boughattas-nour-el-houda-496031188/',
  },
  {
    id: 'mariem-yousfi',
    team: 'Agronomy',
    photo: '/team/Mariem-Yousfi.webp',
  },
];
