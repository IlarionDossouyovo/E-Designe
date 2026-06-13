/**
 * E-Graphisme - Cart Manager
 * Gestion du panier et des commandes
 */

class CartManager {
    constructor() {
        this.items = [];
        this.storageKey = 'e_graphisme_cart';
        this.loadCart();
    }

    /**
     * Charger le panier depuis localStorage
     */
    loadCart() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    /**
     * Sauvegarder le panier
     */
    saveCart() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    }

    /**
     * Ajouter un article au panier
     * @param {Object} service - Service à ajouter
     * @param {number} quantity - Quantité
     */
    addItem(service, quantity = 1) {
        const existingIndex = this.items.findIndex(item => item.id === service.id);
        
        if (existingIndex >= 0) {
            this.items[existingIndex].quantity += quantity;
        } else {
            this.items.push({
                id: service.id,
                name: service.name,
                price: service.price,
                currency: service.currency || 'XOF',
                quantity: quantity,
                image: service.image,
                duration: service.duration
            });
        }
        
        this.saveCart();
        this.updateUI();
    }

    /**
     * Retirer un article du panier
     * @param {string} itemId - ID de l'article
     */
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateUI();
    }

    /**
     * Mettre à jour la quantité
     * @param {string} itemId - ID de l'article
     * @param {number} quantity - Nouvelle quantité
     */
    updateQuantity(itemId, quantity) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(itemId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateUI();
            }
        }
    }

    /**
     * Vider le panier
     */
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateUI();
    }

    /**
     * Obtenir le total
     */
    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    /**
     * Obtenir le nombre d'articles
     */
    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    /**
     * Formater le prix
     * @param {number} price - Prix
     * @param {string} currency - Devise
     */
    formatPrice(price, currency = 'XOF') {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(price);
    }

    /**
     * Mettre à jour l'interface utilisateur
     */
    updateUI() {
        // Update cart badge
        const badge = document.getElementById('cart-badge');
        if (badge) {
            badge.textContent = this.getItemCount();
            badge.style.display = this.getItemCount() > 0 ? 'flex' : 'none';
        }

        // Update cart total
        const totalEl = document.getElementById('cart-total');
        if (totalEl) {
            totalEl.textContent = this.formatPrice(this.getTotal());
        }

        // Trigger custom event
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: this.getSummary() }));
    }

    /**
     * Obtenir le résumé du panier
     */
    getSummary() {
        return {
            items: this.items,
            itemCount: this.getItemCount(),
            total: this.getTotal(),
            formattedTotal: this.formatPrice(this.getTotal())
        };
    }

    /**
     * Passer la commande
     * @param {Object} customerData - Données client
     */
    async checkout(customerData) {
        const order = {
            id: 'order_' + Date.now(),
            items: [...this.items],
            customer: customerData,
            total: this.getTotal(),
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        try {
            // Envoyer au backend
            const response = await fetch('/php/orders.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });

            if (response.ok) {
                this.clearCart();
                return { success: true, orderId: order.id };
            } else {
                throw new Error('Erreur lors de la commande');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            // Fallback: sauvegarder localement
            const orders = JSON.parse(localStorage.getItem('e_graphisme_orders') || '[]');
            orders.push(order);
            localStorage.setItem('e_graphisme_orders', JSON.stringify(orders));
            this.clearCart();
            return { success: true, orderId: order.id, local: true };
        }
    }

    /**
     * Afficher le panier dans un modal
     */
    showCartModal() {
        const modal = document.createElement('div');
        modal.className = 'cart-modal';
        modal.innerHTML = `
            <div class="cart-modal-content">
                <div class="cart-modal-header">
                    <h2>Votre Panier</h2>
                    <button class="cart-close">&times;</button>
                </div>
                <div class="cart-items">
                    ${this.items.length === 0 ? '<p class="empty-cart">Votre panier est vide</p>' : 
                        this.items.map(item => `
                            <div class="cart-item" data-id="${item.id}">
                                <img src="${item.image || '/assets/images/placeholder.svg'}" alt="${item.name}">
                                <div class="cart-item-info">
                                    <h4>${item.name}</h4>
                                    <p>${item.duration}</p>
                                </div>
                                <div class="cart-item-price">${this.formatPrice(item.price)}</div>
                                <div class="cart-item-quantity">
                                    <button class="qty-btn minus" data-id="${item.id}">-</button>
                                    <span>${item.quantity}</span>
                                    <button class="qty-btn plus" data-id="${item.id}">+</button>
                                </div>
                                <button class="cart-item-remove" data-id="${item.id}">&times;</button>
                            </div>
                        `).join('')
                    }
                </div>
                <div class="cart-modal-footer">
                    <div class="cart-total">
                        <span>Total</span>
                        <span>${this.formatPrice(this.getTotal())}</span>
                    </div>
                    <button class="btn-checkout" ${this.items.length === 0 ? 'disabled' : ''}>
                        Passer la commande
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.cart-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        modal.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => this.removeItem(btn.dataset.id));
        });

        modal.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = this.items.find(i => i.id === btn.dataset.id);
                this.updateQuantity(btn.dataset.id, item.quantity - 1);
            });
        });

        modal.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = this.items.find(i => i.id === btn.dataset.id);
                this.updateQuantity(btn.dataset.id, item.quantity + 1);
            });
        });

        modal.querySelector('.btn-checkout').addEventListener('click', () => {
            modal.remove();
            this.showCheckoutForm();
        });
    }

    /**
     * Afficher le formulaire de commande
     */
    showCheckoutForm() {
        const modal = document.createElement('div');
        modal.className = 'checkout-modal';
        modal.innerHTML = `
            <div class="checkout-modal-content">
                <div class="checkout-modal-header">
                    <h2>Finaliser la commande</h2>
                    <button class="checkout-close">&times;</button>
                </div>
                <form class="checkout-form">
                    <div class="form-group">
                        <label>Nom complet *</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Téléphone *</label>
                        <input type="tel" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label>Entreprise</label>
                        <input type="text" name="company">
                    </div>
                    <div class="form-group">
                        <label>Message</label>
                        <textarea name="message" rows="3"></textarea>
                    </div>
                    <div class="checkout-total">
                        <span>Total à payer</span>
                        <span>${this.formatPrice(this.getTotal())}</span>
                    </div>
                    <button type="submit" class="btn-submit">
                        Confirmer la commande
                    </button>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.checkout-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        modal.querySelector('.checkout-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const customerData = Object.fromEntries(formData);
            
            const result = await this.checkout(customerData);
            
            if (result.success) {
                alert(`Commande ${result.orderId} créée avec succès!`);
                modal.remove();
            }
        });
    }
}

// Initialiser le panier
window.cartManager = new CartManager();

// Ajouter les event listeners pour les boutons "Commander"
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-order').forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceId = btn.dataset.service;
            // Récupérer les données du service
            const service = {
                id: serviceId,
                name: btn.closest('.service-card')?.querySelector('h3')?.textContent || 'Service',
                price: parseInt(btn.closest('.service-card')?.querySelector('.service-price')?.textContent?.replace(/\D/g, '') || 0),
                duration: btn.closest('.service-card')?.querySelector('.service-duration')?.textContent || '',
                image: btn.closest('.service-card')?.querySelector('img')?.src
            };
            window.cartManager.addItem(service);
            window.cartManager.showCartModal();
        });
    });
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartManager;
}