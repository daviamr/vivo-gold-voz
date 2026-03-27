'use client'

import { useState } from "react"
import Accordion from '../accordion/Accordion'

function Index() {
  const [menuOption, setMenuOption] = useState('productsAndBenefits')

  const ACCORDIONS: AccordionProps = {
    PRODUCTS_AND_BENEFITS: [
      {
        title: 'O que é o Vivo Total?',
        desc: <p>Uma oferta completa, com vários benefícios e economia para você ficar conectado dentro e fora de casa com a maior cobertura 5G do país. Com os combos de internet e celular Vivo Total, você terá o melhor do Pós Pago + Vivo Fibra, além de descontos em aparelhos e muitas outras vantagens para você e sua família.</p>
      },
      {
        title: 'É possível alterar a oferta pós ou a velocidade do Vivo Fibra no Vivo Total?',
        desc: <p>Não é possível fazer alterações na sua oferta Vivo Total. Mas, você pode escolher aquela que mais combina com a sua família. São diversas opções, confira!</p>
      },
      {
        title: 'Quais as vantagens de contratar Vivo Total com internet e celular?',
        desc: <p>Você pode economizar até 40%, numa oferta com internet Fibra e celular Pós em uma única fatura. Além de aproveitar as vantagens de todos os recursos ao mesmo tempo, gastando menos em relação às contratações feitas separadamente. Confira mais detalhes de como funciona no Vivo Explica.<br /><br />Além disso, cliente Vivo Total tem acesso ao Vivo Valoriza, o programa de benefícios da Vivo que oferece descontos em lojas parceiras e cupons especiais para comprar celulares e outros produtos na Loja Online.</p>
      },
      {
        title: 'As ofertas Vivo Total possuem Vivo Travel?',
        desc: 'Sim, as ofertas Vivo Total possuem Vivo Travel, serviço de roaming internacional disponível em mais de 175 países. Para saber como funciona e como habilitá-lo.'
      },
      {
        title: 'Quais são as vantagens do Vivo Travel?',
        desc: 'O Vivo Travel é serviço de roaming internacional ideal para quem deseja continuar conectado em suas viagens internacionais utilizando o seu próprio chip da Vivo. Além de fazer e receber ligações em qualquer lugar do mundo.'
      },
      {
        title: 'Posso ter Vivo Play no Vivo Total?',
        desc: <p>Sim! Você pode adicionar o Vivo Play na sua oferta Vivo Total sem gastar dados da sua internet, criando um combo de internet e celular com o streaming da Vivo. Um mundo de conteúdos à sua disposição em uma plataforma de entretenimento com filmes, séries, esportes, notícias e muito mais.<br /><br />Além do acesso pela TV, você pode assistir seus canais favoritos a qualquer hora e onde estiver.</p>
      },
      {
        title: 'Não tenho Fibra na minha região, posso adquirir o Vivo Total?',
        desc: 'Não é possível. Todas as ofertas Vivo Total são compostas com internet Vivo Fibra.'
      },
      {
        title: 'Posso contratar um pacote de TV Vivo Play nas ofertas de Vivo Total?',
        desc: 'Sim, todos os pacotes do Vivo Play estão para contratação nas ofertas Vivo Total e podem ser adquiridos por um preço especial, criando um combo exclusivo de acordo com o que você quer'
      },
      {
        title: 'O que são os serviços digitais inclusos nas ofertas e como usar?',
        desc: 'São aplicativos gratuitos que acompanham as ofertas. Tem apps para assistir esportes, séries, filmes, aprender inglês e muito mais. Consulte as opções disponíveis em cada oferta e aproveite!'
      },
      {
        title: 'Como realizar o cancelamento da internet Vivo Fibra?',
        desc: <p>O cancelamento da Vivo Fibra é realizado pela Central de Atendimento, no número 103 15. Quando ligar, é só escolher a opção de cancelar seus serviços.<br /><br />Por questões de segurança, será necessário informar o CPF do assinante e o código do cliente. Você encontra o seu código do cliente na parte superior da fatura. São 12 números que ficam perto da data de vencimento e dos dados cadastrais.<br /><br />Outra opção é acessar a área logada do site da Vivo pelo seu computador, e realizar sua solicitação nas opções “Atendimento e Suporte” e depois “Cancelamento Eletrônico”.</p>
      }
    ],
    INSTALLATION_AND_SINGLE_INVOICE: [
      {
        title: 'Quanto tempo demora a instalação da fibra? E se eu mudar de ideia e quiser a TV na hora que o técnico estiver na minha casa?',
        desc: 'Aproximadamente 4h. Caso queira a TV, será necessária alteração do pedido feito e nova visita técnica.'
      },
      {
        title: 'Sou cliente cobre, se mudar para Vivo Total fico sem minha conexão?',
        desc: 'Na mudança de cobre para fibra, a instalação da fibra ocorre em paralelo e o cobre só é desligado após a ativação da fibra. O cliente nunca fica desconectado!'
      },
      {
        title: 'Como ocorre a cobrança do plano?',
        desc: 'O valor referente ao serviço móvel só será cobrado a partir do momento que o chip for ativado e a fibra, a partir do momento que a fibra for instalada, tudo em uma única fatura.'
      },
      {
        title: 'No plano Vivo Total Família, preciso ativar todas as linhas adicionais na hora da compra?',
        desc: 'Não é necessário, o titular poderá ativar as linhas adicionais quando quiser, apenas indo a uma loja Vivo. A gestão das linhas adicionais ativas poderá ser feita através do App Vivo.'
      },
      {
        title: 'Fiz um Vivo Total para mim e toda minha família. Quantas faturas irei receber? Terei datas de vencimento diferentes? Vou pagar pelo valor cheio já na primeira fatura?',
        desc: 'O plano Vivo Total família possui fatura unificada para o titular, linhas adicionais e banda larga fixa. A data de vencimento será única, porém poderá haver cobrança proporcional na primeira fatura devido a diferença na data de ativação dos serviços'
      },
      {
        title: 'Os planos Vivo Total possuem período de fidelidade?',
        desc: 'Sim, todos os planos possuem um período de fidelidade de 12 meses.'
      },
      {
        title: 'Como recebo meu chip?',
        desc: 'O chip chegará aos clientes via correios com o devido passo-a-passo para ativação. Caso a ativação seja feita em loja, o cliente já sai com o chip e linha móvel ativados.'
      },
      {
        title: 'O Vivo Total pode ser instalado na minha casa de praia?',
        desc: 'Caso tenha cobertura e disponibilidade de fibra na região, sim.'
      },
      {
        title: 'É possível contratar duas Bandas Largas no Vivo Total?',
        desc: 'Cada plano Vivo Total consta com uma banda larga. Mas caso queira efetuar a instalação em outro endereço, não há problema em faturar 2 serviços Vivo Total para um mesmo cliente, lembrando que ele também terá direito a duas linhas móveis.'
      },
      {
        title: 'Posso ter o Pós em um endereço e a Banda Larga em outro?',
        desc: 'Sim, a região de ativação da linha móvel não precisa ser a mesma do endereço de ativação da fibra. Adquirir o Plano Vivo Total pelo site.'
      },
    ],
    BONUS_VAUCHER: [
      {
        title: 'Como ganho Vale Bonus?',
        desc: 'Além dos benefícios do seu plano Vivo Total, você também ganha até R$ 250 em Vale Bonus todos os meses conforme sua categoria, pagando sua fatura Vivo em dia via Pix, débito automático ou cartão de crédito.'
      },
      {
        title: 'O que é Vale Bonus?',
        desc: 'É uma moeda digital que o cliente pode usar como parte do pagamento em diversas marcas, restaurantes e serviços. Também poderá encontrar ofertas especiais para pagar integralmente com suas moedas digitais.'
      },
      {
        title: 'Como participar?',
        desc: 'Adquirindo sua Vivo Fibra e, caso não possua nenhuma outra linha móvel com a Vivo, será necessário se cadastrar no App Vivo (você precisa fazer isso apenas uma vez). Após o pagamento da fatura pelos meios citados acima, você receberá Vale Bonus para aproveitar milhares de restaurantes e marcas.'
      }
    ],
    VIVO_TOTAL_MORE_APP: [
      {
        title: 'O que é Fibra + Pós + App?',
        desc: 'É o plano Vivo Total ainda mais completo, com a possibilidade de escolher até quantos serviços de streaming você quiser. É o melhor do Pós Pago + Vivo Fibra + o seu app favorito em um único plano, com o desconto Vivo que você queria. E tudo isso em uma única fatura!'
      },
      {
        title: 'É possível escolher mais de um app de streaming no meu plano Vivo Total + App?',
        desc: 'Sim! Você pode escolher quantos parceiros contratar no seu plano Vivo Total + App.'
      },
      {
        title: 'Quais são as vantagens de contratar Vivo Total + App?',
        desc: 'Além do plano mais completo da Vivo, com o melhor do Pós Pago + Vivo Fibra, ainda é possível contratar apps de streaming com um desconto Vivo!'
      },
      {
        title: 'Como faço para ativar o meu app contratado com o Vivo Total?',
        desc: 'Confira a FAQ específica de cada serviço.'
      },
      {
        title: 'É possível compartilhar as contas dos serviços de streaming com outras pessoas?',
        desc: 'As regras de compartilhamento das contas seguem as diretrizes de cada parceiro.'
      },
      {
        title: 'É possível mudar de plano do app sem cancelar o meu plano?',
        desc: 'Sim! Você pode fazer a troca de plano do APP de streaming contratado com o Vivo Total + APPs, tudo isso sem você perder o acesso ao APP de streaming.'
      },
      {
        title: 'Existe algum tipo de suporte ao cliente exclusivo para os serviços de streaming?',
        desc: 'Não, o suporte é realizado diretamente pelo app de streaming escolhido.'
      },
      {
        title: 'Como é feito o pagamento pelo plano?',
        desc: 'O pagamento é feito diretamente na fatura única do seu plano Vivo Total + App.'
      },
    ]
  }

  return (
    <div>
      <ul className="grid grid-cols-3 max-w-145 text-center cursor-pointer">
        <li
          className={`border-b-3 ${(menuOption === 'productsAndBenefits' && 'border-default-purple')}`}
          onClick={() => setMenuOption('productsAndBenefits')}>
          Produtos e vantagens
        </li>

        <li
          className={`border-b-3 ${(menuOption === 'installationAndSingleInvoice' && 'border-default-purple')}`}
          onClick={() => setMenuOption('installationAndSingleInvoice')}>
          Instalação e Fatura única
        </li>

        <li
          className={`border-b-3 ${(menuOption === 'bonusVaucher' && 'border-default-purple')}`}
          onClick={() => setMenuOption('bonusVaucher')}>
          Vale Bônus
        </li>
      </ul>

      <div className="mt-4 mb-16">
        {
          (menuOption === 'productsAndBenefits') && (
            <div>
              {ACCORDIONS.PRODUCTS_AND_BENEFITS.map((item, i) => (
                <Accordion title={item.title} desc={item.desc} key={i} />
              ))}
            </div>
          )
        }

        {
          (menuOption === 'installationAndSingleInvoice') && (
            <div>
              {ACCORDIONS.INSTALLATION_AND_SINGLE_INVOICE.map((item, i) => (
                <Accordion title={item.title} desc={item.desc} key={i} />
              ))}
            </div>
          )
        }

        {
          (menuOption === 'bonusVaucher') && (
            <div>
              {ACCORDIONS.BONUS_VAUCHER.map((item, i) => (
                <Accordion title={item.title} desc={item.desc} key={i} />
              ))}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Index

type AccordionProps = {
  PRODUCTS_AND_BENEFITS: { title: string, desc: any }[],
  INSTALLATION_AND_SINGLE_INVOICE: { title: string, desc: any }[],
  BONUS_VAUCHER: { title: string, desc: any }[],
  VIVO_TOTAL_MORE_APP: { title: string, desc: any }[]
}