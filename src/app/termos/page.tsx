import Header from "@/components/sections/Header";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Header />
      <main className="pt-64 pb-12">
        <div className="max-w-[800px] mx-auto px-4 font-sans">
          <h1 className="text-3xl font-bold mb-8">TERMOS E CONDIÇÕES</h1>
          <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
            <p className="!whitespace-pre-line">Bem-vindo a Finesse Club. Ao acessar e usar este site, você concorda com os seguintes termos:

            </p>
            <section>
              <h2 className="text-white font-bold mb-2 uppercase">1. POLÍTICA DE PRIVACIDADE</h2>
              <p>
                Respeitamos a sua privacidade e protegemos os seus dados pessoais. Todas as informações coletadas são usadas exclusivamente para processar seus pedidos e melhorar sua experiência.
              </p>
            </section>
            <section>
              <h2 className="text-white font-bold mb-2 uppercase">2. ENTREGAS</h2>
              <p>
                Nossos prazos de entrega variam de acordo com a sua região. O rastreamento estará disponível assim que o pedido for postado.
              </p>
            </section>
            <section>
              <h2 className="text-white font-bold mb-2 uppercase">3. TROCAS E DEVOLUÇÕES</h2>
              <p>
                Você tem até 7 dias após o recebimento para solicitar a troca ou devolução de um produto, desde que este não tenha sido utilizado e mantenha as etiquetas originais.
              </p>
            </section>
            <section>
              <h2 className="text-white font-bold mb-2 uppercase">4. PAGAMENTOS</h2>
              <p>
                Aceitamos diversas formas de pagamento seguras para garantir a melhor experiência de compra.
              </p>
            </section>
            <section>
              <h2 className="text-white font-bold mb-2 uppercase">5. CONTATO</h2>
              <p>
                Em caso de dúvidas sobre nossos termos ou qualquer outra solicitação, entre em contato com nosso suporte através do Instagram:{" "}
                <a 
                  href="https://www.instagram.com/_finesseclub/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  @_finesseclub
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>);

}