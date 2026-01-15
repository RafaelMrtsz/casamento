# 🚀 Guia de Deploy no Render.com

## ✅ Projeto já preparado!

### Passo 1: Subir para o GitHub

1. **Criar repositório no GitHub:**
   - Acesse: https://github.com/new
   - Nome do repositório: `casamento-rafael-nicolly` (ou o que preferir)
   - Deixe como **público** ou **privado**
   - NÃO adicione README, .gitignore (já temos)
   - Clique em "Create repository"

2. **Subir o código (executar no terminal):**
   ```bash
   git init
   git add .
   git commit -m "Preparado para deploy no Render"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   git push -u origin main
   ```

### Passo 2: Criar conta no Render

1. Acesse: https://render.com
2. Clique em "Get Started for Free"
3. Use sua conta do GitHub para fazer login (recomendado)

### Passo 3: Criar Web Service

1. No dashboard do Render, clique em **"New +"** → **"Web Service"**

2. **Conecte seu repositório:**
   - Autorize o Render a acessar seus repositórios
   - Selecione o repositório do seu projeto

3. **Configure o serviço:**
   - **Name:** `casamento-rafael-nicolly` (ou o que quiser)
   - **Region:** Oregon (US West) - é grátis
   - **Branch:** `main`
   - **Root Directory:** deixe vazio
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

4. **Adicionar Variáveis de Ambiente:**
   - Clique em "Advanced" ou "Environment"
   - Adicione as seguintes variáveis:

   ```
   MERCADOPAGO_ACCESS_TOKEN
   Valor: APP_USR-2693216817739349-011211-009a909a5dc94e0582844b27308cce03-252165610

   BASE_URL
   Valor: (deixe vazio por enquanto, vamos adicionar depois)
   ```

5. Clique em **"Create Web Service"**

### Passo 4: Configurar BASE_URL

1. Aguarde o deploy terminar (2-5 minutos)
2. O Render vai te dar uma URL tipo: `https://casamento-rafael-nicolly.onrender.com`
3. Volte em "Environment" e edite a variável `BASE_URL`:
   - Valor: `https://casamento-rafael-nicolly.onrender.com` (sua URL)
4. Salve - o serviço vai reiniciar automaticamente

### Passo 5: Configurar Mercado Pago

1. Acesse o painel do Mercado Pago
2. Vá em "Suas integrações" → selecione sua aplicação
3. Configure as URLs de redirecionamento:
   - Success: `https://SEU_APP.onrender.com/success`
   - Failure: `https://SEU_APP.onrender.com/failure`
   - Pending: `https://SEU_APP.onrender.com/pending`

## 🎉 Pronto!

Seu site estará disponível em:
**https://SEU_APP.onrender.com**

## ⚠️ Observações Importantes

1. **Plano Free:** O app "dorme" após 15 minutos sem uso e acorda quando alguém acessa (pode demorar 30 segundos)
2. **Deploy automático:** Sempre que você fizer push no GitHub, o Render atualiza automaticamente
3. **Logs:** Você pode ver os logs no dashboard do Render
4. **HTTPS:** Automático e gratuito!

## 🔄 Atualizações Futuras

Para atualizar o site:
```bash
git add .
git commit -m "Sua mensagem"
git push
```

O Render detecta e faz deploy automático!

## 🆘 Problemas Comuns

- **App não inicia:** Verifique os logs no dashboard
- **Erro 503:** O app está "acordando", espere 30 segundos
- **Pagamento não funciona:** Verifique as variáveis de ambiente

---

Dúvidas? Veja a documentação: https://render.com/docs
