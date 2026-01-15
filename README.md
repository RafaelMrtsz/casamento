# Site de Casamento - Rafael e Nicolly

Site de lista de presentes de casamento com integração de pagamentos via PIX e Mercado Pago (Checkout Pro).

## 🎁 Funcionalidades

- ✅ Lista de presentes interativa
- ✅ Pagamento via PIX (geração de QR Code)
- ✅ Pagamento via Cartão (Mercado Pago Checkout Pro)
- ✅ Carrossel de fotos do local do evento
- ✅ Interface responsiva e moderna

## 🚀 Como Configurar

### 1. Criar Conta no Mercado Pago

1. Acesse [Mercado Pago Developers](https://www.mercadopago.com.br/developers)
2. Crie uma conta ou faça login
3. Vá em "Suas integrações" → "Criar aplicação"
4. Escolha "Pagamentos online" → "Checkout Pro"
5. Copie suas credenciais:
   - **Public Key** (para o frontend)
   - **Access Token** (para o backend)

### 2. Configurar as Credenciais

**No arquivo `index.html`** (linha 352):
```javascript
const MERCADOPAGO_PUBLIC_KEY = "YOUR_PUBLIC_KEY_HERE"; // Substitua pela sua Public Key
```

**No arquivo `server.js`** (linha 12):
```javascript
mercadopago.configure({
    access_token: 'YOUR_ACCESS_TOKEN_HERE' // Substitua pelo seu Access Token
});
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Executar o Servidor

```bash
npm start
```

Ou para desenvolvimento com auto-reload:
```bash
npm run dev
```

O site estará disponível em: `http://localhost:3000`

## 📝 Configurações Adicionais

### Personalizar PIX

No arquivo `index.html`, altere as informações do PIX:

```javascript
const PIX_KEY = "58307541000147";  // Sua chave PIX (CPF/CNPJ/Email/Telefone/Chave Aleatória)
const MERCHANT_NAME = "RAFAEL MARTINS DA SILVA";  // Nome do recebedor
const MERCHANT_CITY = "CURITIBA";  // Cidade
```

### Personalizar Lista de Presentes

Edite o array `gifts` no arquivo `index.html`:

```javascript
const gifts = [
    { title: "Nome do Presente", price: 100.00, img: "URL_DA_IMAGEM" },
    // Adicione mais presentes aqui
];
```

### URLs de Redirecionamento (Produção)

Quando colocar em produção, altere as URLs no `server.js`:

```javascript
back_urls: {
    success: `https://seudominio.com/success`,
    failure: `https://seudominio.com/failure`,
    pending: `https://seudominio.com/pending`
},
notification_url: `https://seudominio.com/webhook`
```

## 🔔 Webhook (Notificações)

O webhook em `/webhook` receberá notificações automáticas do Mercado Pago sobre o status dos pagamentos.

Para testar em desenvolvimento local, você pode usar:
- [ngrok](https://ngrok.com/) - Para criar um túnel público temporário
- Configurar o webhook no painel do Mercado Pago

## 📱 Páginas de Retorno

- **Success** (`/success`) - Pagamento aprovado
- **Pending** (`/pending`) - Pagamento pendente
- **Failure** (`/failure`) - Pagamento não aprovado

## 🎨 Personalização Visual

As cores e estilos podem ser alterados nas variáveis CSS no início do arquivo `index.html`:

```css
:root {
    --primary: #d4af37; /* Dourado */
    --primary-dark: #b5952f;
    --bg: #fafafa;
    --text: #333;
    --white: #fff;
    --radius: 12px;
}
```

## 🔒 Segurança

- ⚠️ **NUNCA** exponha seu Access Token no frontend
- ✅ Sempre use HTTPS em produção
- ✅ Valide os webhooks do Mercado Pago
- ✅ Configure variáveis de ambiente para as credenciais

## 📦 Deploy

Para fazer deploy em produção:

1. Configure as variáveis de ambiente
2. Use HTTPS
3. Configure um domínio
4. Atualize as URLs de callback
5. Teste todos os fluxos de pagamento

## 🆘 Suporte

- [Documentação Mercado Pago](https://www.mercadopago.com.br/developers/pt/docs)
- [Checkout Pro](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/landing)
- [Webhooks](https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks)

---

Feito com ❤️ para Rafael e Nicolly
