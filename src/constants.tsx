import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'E-mural',
    path: '/mural',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },

  {
    title: 'Treinador',
    path: '/coach',
    icon: <Icon icon="ph:chalkboard-teacher-bold" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {title: 'Informações', path: '/coach/infos'},
      {title: 'Cadastrar', path: '/coach/create'},
      //{title: 'Editar', path: '/coach/edit'},
      //{title: 'Treinos', path: '/coach/trainings'}
    ]
  },
  {
    title: 'Turmas',
    path: '/group',
    icon: <Icon icon="ic:round-groups" width="25" height="25" />,
    submenu: true,
    subMenuItems: [
      {title: 'Cadastrar', path: '/group/create'},
      {title: 'Informações', path: '/group/infos'},
      //{title: 'Editar', path: '/group/edit'}
    ]
  },
  {
    title: 'Responsável',
    path: '/guardian',
    icon: <Icon icon="mdi:guardian" width="25" height="25" />,
    submenu: true,
    subMenuItems: [
      {title: 'Cadastrar', path: '/guardian/create'}
    ]
  },
  
  {
    title: 'Alunos',
    path: '/athlete',
    icon: <Icon icon="ic:baseline-person" width="25" height="25" />,
    submenu: true,
    subMenuItems: [
      {title: 'Cadastrar', path: '/athlete/create'},
      {title: 'Informações', path: '/athlete/infos'}
      
    ]
  },
  {
    title: 'Treinos',
    path: '/training',
    icon: <Icon icon="mdi:application-edit" width="20" height="20" />,
    submenu: true,
    subMenuItems: [
      {title: 'Cadastrar', path: '/training/create'}
    ]
  },

];
