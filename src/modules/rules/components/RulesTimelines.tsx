import { useState } from 'react'
import {
  COMMUNITY_RULES_DISCORD,
  COMMUNITY_RULES_GROUPS,
} from 'src/modules/global/constants/rules.const'
import { RulesLineItem } from './RulesLineItem'

type tabsOption = 'groups' | 'general'

export const RulesTimelines = () => {
  const [tabOption, setTabOption] = useState<tabsOption>('general')

  const handleChangeTab = (tab: tabsOption) => {
    setTabOption(tab)
  }

  return (
    <div className='space-y-12'>
      <ul className='flex items-center justify-center gap-4 text-sm font-bold text-center'>
        <li>
          <button
            type='button'
            className={`px-8 py-3 rounded-xl transition-all duration-300 border backdrop-blur-md ${
              tabOption === 'general'
                ? 'text-white border-[#00e5ff] shadow-xl shadow-[#00e5ff]/20 translate-y-[-2px]'
                : 'text-gray-400 border-white/10 hover:text-white hover:border-white/20 bg-white/5'
            }`}
            onClick={() => handleChangeTab('general')}
          >
            Reglas generales
          </button>
        </li>
      </ul>

      {tabOption === 'general' && (
        <div className='animate-fadeIn'>
          <RulesLineItem data={COMMUNITY_RULES_DISCORD} />
        </div>
      )}

      <div className='relative overflow-hidden border border-[#ff6900]/20 bg-[#ff6900]/5 p-8 rounded-3xl max-w-2xl mx-auto'>
        <div className='absolute -right-10 -bottom-10 w-32 h-32 bg-[#ff6900]/10 rounded-full blur-3xl'></div>
        <p className='relative z-10 block font-black mb-3 text-[#ff6900] text-2xl tracking-tight'>
          ⚠️ Aviso Importante
        </p>
        <p className='relative z-10 text-gray-300 text-lg leading-relaxed'>
          La administración se reserva el derecho de admisión y permanencia.
          Estas reglas se presumen conocidas por todos los miembros de la
          comunidad.
        </p>
      </div>
    </div>
  )
}
