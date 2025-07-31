interface Order {
    id: number;
    totalValue: number;
    // Usar tipos literais ajuda a evitar erros de digitação
    customerType: 'REGULAR' | 'VIP' | 'PREMIUM' | 'WHOLESALE';
}

// 1. Criamos um "mapa" ou "dicionário" de estratégias.
// A chave é o tipo de cliente, e o valor é a função que calcula o desconto.
const discountStrategies = {
    REGULAR: (order: Order): number => {
        return order.totalValue * 0.95; // 5% de desconto
    },
    VIP: (order: Order): number => {
        return order.totalValue * 0.90; // 10% de desconto
    },
    PREMIUM: (order: Order): number => {
        return order.totalValue * 0.80; // 20% de desconto
    },
};

// 2. A nossa função principal que calcula o desconto agora está FECHADA para modificação.
// Ela não conhece as regras, apenas sabe como encontrar a estratégia correta e executá-la.
const calculateOrderDiscount = (order: Order): number => {
    const strategy = discountStrategies[order.customerType];

    // Se uma estratégia para o tipo de cliente existir, use-a.
    // Senão, aplique uma regra padrão (sem desconto).
    if (strategy) {
        return strategy(order);
    }

    return order.totalValue;
};

// --- Como ela está ABERTA para extensão? ---
// Novo requisito: Adicionar clientes 'WHOLESALE' com 30% de desconto.
// NÃO MODIFICAMOS NADA ACIMA. Apenas adicionamos a nova estratégia.

discountStrategies['WHOLESALE'] = (order: Order): number => {
    return order.totalValue * 0.70;
};

// TESTANDO
const vipOrder: Order = { id: 1, totalValue: 100, customerType: 'VIP' };
const wholesaleOrder: Order = { id: 2, totalValue: 100, customerType: 'WHOLESALE' };

console.log(`Preço final VIP: $${calculateOrderDiscount(vipOrder)}`); // $90
console.log(`Preço final WHOLESALE: $${calculateOrderDiscount(wholesaleOrder)}`); // $70