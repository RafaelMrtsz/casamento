const express = require('express');
const mercadopago = require('mercadopago');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Função para obter o IP local
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const LOCAL_IP = getLocalIP();

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Configurar Mercado Pago com ACCESS TOKEN DE PRODUÇÃO
mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN || 'APP_USR-2693216817739349-011211-009a909a5dc94e0582844b27308cce03-252165610'
});

// Rota para criar preferência de pagamento
app.post('/create-preference', async (req, res) => {
    try {
        const { title, price, message } = req.body;

        console.log('📦 Criando preferência para:', { title, price, message });

        const preference = {
            items: [
                {
                    title: title,
                    unit_price: Number(price),
                    quantity: 1,
                    currency_id: 'BRL',
                    description: message || 'Presente de casamento'
                }
            ],
            back_urls: {
                success: `${process.env.BASE_URL || 'http://localhost:' + PORT}/success`,
                failure: `${process.env.BASE_URL || 'http://localhost:' + PORT}/failure`,
                pending: `${process.env.BASE_URL || 'http://localhost:' + PORT}/pending`
            },
            statement_descriptor: 'CASAMENTO',
            external_reference: `gift_${Date.now()}`
        };

        const response = await mercadopago.preferences.create(preference);
        
        console.log('✅ Preferência criada:', response.body.id);
        console.log('🔗 Link de pagamento:', response.body.init_point);
        
        res.json({
            id: response.body.id,
            init_point: response.body.init_point
        });

    } catch (error) {
        console.error('❌ Erro ao criar preferência:', error);
        res.status(500).json({ 
            error: 'Erro ao criar preferência de pagamento',
            details: error.message 
        });
    }
});

// Rota de sucesso
app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'success.html'));
});

// Rota de falha
app.get('/failure', (req, res) => {
    res.sendFile(path.join(__dirname, 'failure.html'));
});

// Rota pendente
app.get('/pending', (req, res) => {
    res.sendFile(path.join(__dirname, 'pending.html'));
});

// Webhook para notificações do Mercado Pago
app.post('/webhook', async (req, res) => {
    try {
        const { type, data } = req.body;
        
        if (type === 'payment') {
            const paymentId = data.id;
            
            // Buscar informações do pagamento
            const payment = await mercadopago.payment.findById(paymentId);
            
            console.log('Pagamento recebido:', {
                id: payment.body.id,
                status: payment.body.status,
                amount: payment.body.transaction_amount,
                description: payment.body.description
            });
            
            // Aqui você pode salvar em um banco de dados, enviar email, etc.
        }
        
        res.sendStatus(200);
    } catch (error) {
        console.error('Erro no webhook:', error);
        res.sendStatus(500);
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log('\n🎉 =======================================');
    console.log('✅ Servidor rodando com SUCESSO!');
    console.log('🌐 Acesso LOCAL: http://localhost:' + PORT);
    console.log('📱 Acesso REDE:  http://' + LOCAL_IP + ':' + PORT);
    console.log('💳 Credenciais: PRODUÇÃO (pagamentos REAIS)');
    console.log('⚠️  ATENÇÃO: Configure sua conta no Mercado Pago primeiro!');
    console.log('=========================================\n');
});
