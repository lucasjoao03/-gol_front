import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'E-mural',
    path: '/mural',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
 /*  {
    title: 'Suporte',
    path: '/suporte',
    icon: <Icon icon="material-symbols-light:support-agent" width="24" height="24"/>
    ,
    submenu: true,
    subMenuItems: [
      {title: 'acessos', path: '/suporte/acessos'},
      {title: 'Arquivos Úteis', path: '/suporte/arquivos-uteis'},
      {title: 'Clientes', path: '/suporte/clientes'},
      {title: 'Contratos Engeinteg', path: '/suporte/contratos-engeinteg'},
      {title: 'Dashboard', path: '/suporte/dashboard'},
      {title: 'Enquete', path: '/suporte/enquete'},
      {title: 'Monitoramento', path: '/suporte/monitoramento'},
      {title: 'NPM Sistemas', path: '/suporte/npm-sistemas'},
      {title: 'Registros Sistemas', path: '/suporte/registros-sistemas'},
      {title: 'Treinamentos', path: '/suporte/treinamentos'},
      {title: 'Uso Dos Sistemas', path: '/suporte/uso-dos-sistemas'},
      {title: 'Videos', path: '/suporte/videos'},
    ]
  }, */
  /* {
    title: 'Dev',
    path: '/desenvolvimento',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Nuvem', path: '/desenvolvimento/nuvem' },
      { title: 'Versões Sistemas', path: '/desenvolvimento/versoes-sistemas' },
      
    ],
  }, */
/*   {
    title: 'Help Desk',
    path: '/help-desk',
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
    submenu: true, 
    subMenuItems: [
      {title: 'Demandas', path: '/help-desk/demandas'}
    ]
  }, */
 /*  {
    title: 'Links Úteis',
    path: '/links-úteis',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'EngeOS', path: 'https://engeos.engematica.com.br/engematica/' },
      { title: 'Base Conhecimento', path: 'https://conhecimento.engematica.com.br/' },
      { title: 'Enge Monitor', path: 'https://monitor.engematica.com.br/' },
      { title: 'Site Engemática', path: 'https://engematica.com.br/' },
      { title: 'EngeintegWeb', path: 'https://engeintegweb.engematica.com.br/' },
      { title: 'Painel Parceiro', path: 'https://parceiro.engematica.com.br/' },
      { title: 'EngeAutorizações', path: 'https://autorizacoes.engematica.com.br/#/login' },
   
      
    ],
  }, */
  {
    title: 'Perfil',
    path: '/perfil',
    icon: <Icon icon="ic:baseline-person" width="24" height="24" />
    ,
    submenu: true,
    subMenuItems: [
      {title: 'Perfil', path: '/perfil/perfil'},
    ]
  },

  
  {
    title: 'Treinador',
    path: '/coach',
    icon: <Icon icon="ph:chalkboard-teacher-duotone" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {title: 'Informações', path: '/coach/infos'},
      {title: 'Cadastrar', path: '/coach/create'},
      {title: 'Editar', path: '/coach/edit'},
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
    title: 'Turmas',
    path: '/group',
    icon: <Icon icon="ic:round-groups" width="25" height="25" />,
    submenu: true,
    subMenuItems: [
      {title: 'Cadastrar', path: '/group/create'},
      {title: 'Informações', path: '/group/infos'},
      {title: 'Editar', path: '/group/edit'}
    ]
  },

];
