# Finesse Club

Este projeto é um e-commerce de luxo com foco em exclusividade e minimalismo.

## Checkout
O checkout deste projeto é processado exclusivamente via **Yampi**. Toda a integração com Stripe foi removida para garantir um fluxo de pagamento otimizado e transparente via Yampi.

### Configuração de Produtos
Os produtos estão configurados com seus respectivos tokens de checkout da Yampi:
- **Diesel® T-just G15 Black**: `https://seguro.finesseclub.com.br/r/1YMS8P7GFD`
- **Diesel® umtee Black**: `https://seguro.finesseclub.com.br/r/MPMGCJXPW0`
- **Suéter Polo Ralph Lauren®**: `https://seguro.finesseclub.com.br/r/AVRSF80NK8`
- **Lacoste® Pima Cotton**: `https://seguro.finesseclub.com.br/r/540WADO1SJ`

O sistema de carrinho suporta múltiplos produtos, concatenando os tokens conforme o padrão da Yampi (`/r/TOKEN1:QTY1,TOKEN2:QTY2`).

## Soluções de Problemas (Troubleshooting)
- **Carrinho Limpo**: Foi implementada uma nova chave de armazenamento (`finesse-club-v2-cart`) para garantir que dados antigos de sessões anteriores não interfiram na seleção atual de produtos.
- **Redirecionamento Netlify**: O redirecionamento de checkout foi ajustado para ser direto (`window.location.href`) em ambientes de produção, corrigindo bloqueios que ocorriam em pré-visualizações.

## Getting Started

Primeiro, instale as dependências:
```bash
npm install
```

Depois, inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.
