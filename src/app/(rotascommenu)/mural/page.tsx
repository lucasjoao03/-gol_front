'use client'

import { Icon } from '@iconify/react';

export default function Home() {
  

    const achievements = [
        { id: 1, title: "Campeonato Juvenil", description: "Vencedores do Campeonato Juvenil 2023", date: "2023-06-15" },
        { id: 2, title: "Melhor Jogador", description: "João Silva eleito o melhor jogador sub-11", date: "2023-08-20" },
        { id: 3, title: "Torneio de Verão", description: "Equipe sub-12 finalista no Torneio de Verão", date: "2023-07-05" }
        
        
    ];

    const trainingImages = [
        { id: 1, src: "https://interacademybrazil.com.br/wp-content/uploads/2022/10/img-img-escola-de-futebol-infantil-da-inter-academy-brazil.min_.jpg", alt: "Descrição da Imagem 1" },
        { id: 2, src: "https://img-21.ccm2.net/BFbeWhfiDZDth0yPy78A4I_Gabg=/da93e617c8b44ed4b6b1c77fa84e24ce/ccm-faq/1297591.jpg", alt: "Descrição da Imagem 2" },
        { id: 3, src: "https://www.esporteeinclusao.com.br/wp-content/uploads/2018/12/aulas-de-futebol.jpg", alt: "Descrição da Imagem 3" }
        
    ];
    return (
      <>
          <span className="font-bold text-4xl">Home</span>
          <div className="relative border-zinc-500 w-full rounded-lg my-4 p-4">
              <h2 className="font-bold text-green-700 border-b-2 mb-4 text-lg">Destaques e Conquistas</h2>
              <div className="flex flex-wrap justify-center gap-4">
                  <Icon icon='tabler:chevron-left' className="absolute left-0 top-1/2 cursor-pointer -translate-y-1/2 "/>
                  {achievements.map((achievement) => (
                      <div key={achievement.id} className="bg-green-100 rounded-lg shadow-md p-4 cursor-pointer hover:bg-green-200">
                          <h3 className="font-bold text-lg text-green-800">{achievement.title}</h3>
                          <p className="text-gray-600 font-semibold">{achievement.description}</p>
                          <p className="text-gray-600 text-sm">{new Date(achievement.date).toLocaleDateString()}</p>
                      </div>
                  ))}
                  <Icon icon='tabler:chevron-right' className="absolute right-0 top-1/2 cursor-pointer -translate-y-1/2 z-10"/>
              </div>
          </div>
          <div className="relative border-zinc-500 w-full rounded-lg my-4 p-4">
              <h2 className={'font-bold text-green-700 border-b-2 mb-4 text-lg'}>Galeria de Treinos</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Icon icon='tabler:chevron-left' className="absolute left-0 top-1/2 cursor-pointer -translate-y-1/2"/>
                  {trainingImages.map((image) => (
                      <div key={image.id} className="rounded-lg shadow-md overflow-hidden h-64">
                          <img src={image.src} alt={image.alt} className="w-full h-full object-cover"/>
                      </div>
                  ))}
                  <Icon icon='tabler:chevron-right' className="absolute right-0 top-1/2 cursor-pointer -translate-y-1/2"/>
              </div>
          </div>
      </>
  );
  
  
  
}