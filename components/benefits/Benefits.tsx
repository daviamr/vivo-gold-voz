import Image from "next/image"

export default function Benefits() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <Image src="/5g-icon.png" alt="Benefit 1" width={100} height={100} className="mb-4"/>
        <div>
          <p className="mb-2">Ligações ilimitadas para todo o Brasil</p>
          <p className="max-w-100 opacity-75">Permite ligações telefônicas para números externos e internos sem custo adicional para todo Brasil.</p>
        </div>
      </div>

      <div>
        <Image src="/5g-icon.png" alt="Benefit 1" width={100} height={100} className="mb-4"/>
        <div>
          <p className="mb-2">Automatize seu atendimento</p>
          <p className="max-w-100 opacity-75">Tenha uma URA para encaminhar as chamadas para um menu de navegação.</p>
        </div>
      </div>

      <div>
        <Image src="/5g-icon.png" alt="Benefit 1" width={100} height={100} className="mb-4"/>
        <div>
          <p className="mb-2">Economize</p>
          <p className="max-w-100 opacity-75">Leve seu número para a nuvem e evite custos de manutenção de um PABX físico.</p>
        </div>
      </div>

      <div>
        <Image src="/5g-icon.png" alt="Benefit 1" width={100} height={100} className="mb-4"/>
        <div>
          <p className="mb-2">Tenha segurança</p>
          <p className="max-w-100 opacity-75">Conte com segurança ao usar criptografia de ponta a ponta para proteger seus usuários.</p>
        </div>
      </div>

      <div>
        <Image src="/5g-icon.png" alt="Benefit 1" width={100} height={100} className="mb-4"/>
        <div>
          <p className="mb-2">Integração com WhatsApp</p>
          <p className="max-w-100 opacity-75">Atenda e faça chamda de vídeo de qualquer dispositivo com app instalado.</p>
        </div>
      </div>

      <div>
        <Image src="/5g-icon.png" alt="Benefit 1" width={100} height={100} className="mb-4"/>
        <div>
          <p className="mb-2">Vivo Voz Negócio sem descontos na franquia principal</p>
          <p className="max-w-100 opacity-75">A partir de agora, o Softphone Vivo Voz Negócio está incluso nos Apps de Zero Rating dos planos de celular da Vivo, sem descontos da franquia principal.</p>
        </div>
      </div>

      <div>
        <Image src="/5g-icon.png" alt="Benefit 1" width={100} height={100} className="mb-4"/>
        <div>
          <p className="mb-2">Possibilidade de interligações</p>
          <p className="max-w-100 opacity-75">Ideal para clientes que querem combinar plano de voz ilimitada e PABX com menor investimento.</p>
        </div>
      </div>

      <div>
        <Image src="/5g-icon.png" alt="Benefit 1" width={100} height={100} className="mb-4"/>
        <div>
          <p className="mb-2">Integre funções</p>
          <p className="max-w-100 opacity-75">Integra às principais funcionalidades de ferramentas de colaboração, como Microsoft Teams.</p>
        </div>
      </div>

      <div>
        <Image src="/5g-icon.png" alt="Benefit 1" width={100} height={100} className="mb-4"/>
        <div>
          <p className="mb-2">Mobilidade</p>
          <p className="max-w-100 opacity-75">Mobilidade e facilidade de levar para qualquer lugar o seu ramal.</p>
        </div>
      </div>
    </div>
  )
}