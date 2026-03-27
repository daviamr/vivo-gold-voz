import HeroTop from '../components/hero/HeroTop'
import NormalPlans from '../components/menu-plans/NormalPlans'
import Benefits from '../components/benefits/Benefits'

export default function Home() {
  return (
    <div>
      <HeroTop />

      <div className='container m-auto px-4'>
        <p className='font-bold uppercase mt-8'>PABX Virtual</p>
        <h1 className='text-3xl max-w-200'>Viva Voz Negócio: sua equipe conectada a qualquer hora ou lugar</h1>
        <p className='mt-2 mb-4 max-w-200 text-gray-500'>Conecte sua internet seu número a um PABX virtual para ter os mesmos benefícios da linha física e outras funcionalidades que conectam seu time e facilitam sua colaboração</p>

        <NormalPlans />
      </div>

      <div className='container m-auto px-4 mb-12'>
        <div className='my-8 mt-24'>
          <h3 className='text-3xl'>PABX Virtual: saiba os benefícios do Vivo Voz Negócio</h3>
        </div>

        <Benefits />
      </div>
    </div>
  )
}