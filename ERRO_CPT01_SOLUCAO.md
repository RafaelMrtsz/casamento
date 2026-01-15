# ⚠️ Erro CPT01-SM75VCWRMWMR do Mercado Pago

## 🔍 O que significa este erro?

O erro **CPT01** do Mercado Pago geralmente indica um problema com a conta ou configurações do vendedor.

## ✅ Soluções Possíveis:

### 1. **Verificar Conta do Mercado Pago**

Acesse: https://www.mercadopago.com.br/settings/account

Verifique se:
- ✅ Sua conta está **verificada**
- ✅ Dados pessoais estão **completos** (CPF/CNPJ, endereço, telefone)
- ✅ Email está **confirmado**

### 2. **Aceitar Termos do Checkout Pro**

1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Vá em **Suas integrações**
3. Clique na sua aplicação
4. Verifique se o **Checkout Pro** está ativado

### 3. **Verificar Credenciais**

As credenciais que você me passou são de **PRODUÇÃO**:
- Access Token: `APP_USR-2693216817739349-011211-009a909a5dc94e0582844b27308cce03-252165610`

Se você ainda não ativou sua conta para produção, precisa usar as credenciais de **TESTE** temporariamente.

### 4. **Usar Credenciais de TESTE primeiro**

Para testar sem problemas, use estas credenciais de TESTE:

1. Acesse: https://www.mercadopago.com.br/developers/panel/app
2. Clique na sua aplicação
3. Copie as credenciais de **TESTE** (não PRODUÇÃO)
4. Substitua no arquivo `server.js`

**Cartões de teste que funcionam:**
- Mastercard aprovado: `5031 4332 1540 6351`
- CVV: `123`
- Validade: `11/25`
- Nome: `APRO`

### 5. **Verificar Ativação do Checkout Pro**

O Mercado Pago pode exigir que você:
1. Complete o cadastro da empresa/pessoa física
2. Adicione conta bancária para receber
3. Aceite os termos de uso do Checkout Pro

### 6. **Limites de Transação**

Se é uma conta nova:
- Pode ter **limite de valor** por transação
- Pode precisar de **aprovação manual** para valores maiores
- Pode estar com **restrição temporária**

## 🧪 **Recomendação:**

1. **Use credenciais de TESTE** primeiro para validar que tudo funciona
2. Depois **ative a conta para produção** no Mercado Pago
3. Só então use as credenciais de **PRODUÇÃO**

## 📞 **Suporte Mercado Pago:**

Se o problema persistir, contate o suporte:
- https://www.mercadopago.com.br/developers/pt/support
- Chat: https://www.mercadopago.com.br/ajuda

## 🔄 **Como mudar para Teste:**

No arquivo `server.js`, linha 30, troque para suas credenciais de **TESTE**:

```javascript
mercadopago.configure({
    access_token: 'SUA_ACCESS_TOKEN_DE_TESTE_AQUI'
});
```

Depois reinicie o servidor: `node server.js`
