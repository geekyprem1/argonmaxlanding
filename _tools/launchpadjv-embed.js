(() => {
    const baseURL = "https://launchpadjv.com";
    const gtmContainerId = "GTM-5J4H6R6F";
    const cards = [
        { id: 22, name: 'American Express' },
        { id: 10, name: 'Discover & Diners Club' },
        { id: 16, name: 'Japan Credit Bureau' },
        { id: 2, name: 'Mastercard' },
        { id: 1, name: 'Visa' }
    ];

    function ensureGTM() {
        try {
            window.dataLayer = window.dataLayer || [];

            // Avoid loading GTM multiple times if multiple embed buttons exist on the page.
            if (window.__lpGtmLoaded) return;
            window.__lpGtmLoaded = true;

            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmContainerId)}`;
            document.head.appendChild(script);
        } catch (e) {
            // don't block embed rendering
        }
    }

    function pushViewItemOnce(product, productIdFromContainer) {
        try {
            window.dataLayer = window.dataLayer || [];
            window.__lpViewedProducts = window.__lpViewedProducts || {};

            const productId = String(product?.id ?? productIdFromContainer ?? '');
            if (!productId) return;
            if (window.__lpViewedProducts[productId]) return;
            window.__lpViewedProducts[productId] = true;

            const totalPrice = Number(product?.totalPrice ?? 0);
            const value = totalPrice > 0 ? totalPrice : (() => {
                const salePrice = Number(product?.salePrice ?? 0);
                const servicePrice = Number(product?.servicePrice ?? 0);
                const platformPrice = Number(product?.platformPrice ?? 0);
                return product?.showOption === 'separate'
                    ? salePrice
                    : Number((salePrice + servicePrice + platformPrice).toFixed(2));
            })();

            window.dataLayer.push({
                event: 'view_item',
                page_type: 'salespage',
                ecomm_pagetype: 'product',
                ecomm_prodid: productId,
                ecomm_totalvalue: value,
                ecommerce: {
                    currency: 'USD',
                    value,
                    items: [{
                        item_id: productId,
                        item_name: String(product?.name ?? ''),
                        price: value,
                        quantity: 1,
                    }]
                }
            });
        } catch (e) {
            // ignore
        }
    }

    // Cache DOM elements and styles that don't change
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = `${baseURL}/css/embed.css`;
    document.head.appendChild(styleLink);

    const getQueryParams = () => {
        try {
            return window.parent.location.search || window.location.search;
        } catch (error) {
            return window.location.search;
        }
    };

    async function fetchProductPrice(productId, params) {
        try {
            const response = await fetch(`${baseURL}/embed/product/${productId}?${params.toString()}`);
            const data = await response.json();
            return {
                ...data?.data,
                buttonOptions: {
                    text: data?.data?.buttonText || 'Buy Now',
                    size: data?.data?.buttonSize || 'medium',
                    bgColor: data?.data?.buttonBgColor || '#40097C',
                    buttonBorderColor: data?.data?.buttonBorderColor || '#40097C',
                    textColor: data?.data?.buttonTextColor || '#fff',
                    priceElementColor: data?.data?.priceTextColor || '#fff',
                    borderRadius: data?.data?.buttonBorderRadius || '22px',
                    customClass: data?.data?.buttonCustomClass || '',
                }
            };
        } catch (error) {
            console.error(`Error fetching product price for ID ${productId}:`, error);
            return null;
        }
    }

    function getCardImages(theme) {
        const cardsEl = document.createElement('div');
        cardsEl.classList.add('accepted-cards');
        
        cards.forEach(card => {
            const img = new Image(); // More performant than createElement
            img.src = `${baseURL}/images/cards/${theme === 'light' ? 'light' : 'dark'}/${card.id}.png`;
            img.alt = card.name;
            cardsEl.appendChild(img);
        });
        return cardsEl;
    }

    async function updateContainer(container, productId, pageId, offerId, theme) {
        const queryParams = new URLSearchParams(getQueryParams());
        if (pageId) queryParams.set('page', pageId);
        if (offerId) queryParams.set('offer', offerId);

        const product = await fetchProductPrice(productId, queryParams);
        if (!product) return;

        // Ensure GTM exists and mark a "view_item" when the button renders on the sales page.
        ensureGTM();
        pushViewItemOnce(product, productId);

        if (product.offerProduct) {
            queryParams.set('offerProduct', product.offerProduct);
        }


        
        // Create price elements
        const priceEl = document.createElement('div');
        priceEl.classList.add('price-wrap');
        priceEl.style.color = product.buttonOptions.priceElementColor || '#fff';
        
        const regularPriceEl = document.createElement('span');
        regularPriceEl.textContent = `Regular Price: $${product.regularPrice}`;
        priceEl.appendChild(regularPriceEl);

        const salePriceEl = document.createElement('span');
       salePriceEl.textContent = product.showOption === 'separate'
    ? `Today: $${product.salePrice}`
    : `Today: $${(Number(product.salePrice) + Number(product.servicePrice) + Number(product.platformPrice)).toFixed(2)}`;
priceEl.appendChild(salePriceEl);

        // Create button
        const buttonOptions = product.buttonOptions;
        const buyNowLink = document.createElement('a');
        buyNowLink.className = buttonOptions.customClass ? `btn-forge ${buttonOptions.customClass}` : 'btn-forge';
        buyNowLink.textContent = buttonOptions.text;

        // IMPORTANT: product.url may already contain its own query string.
        // Merge existing params + current page params (r, sp, platform, etc) + enforced params (page/offer/offerProduct).
        try {
            const urlObj = new URL(product.url, baseURL);
            queryParams.forEach((value, key) => {
                urlObj.searchParams.set(key, value);
            });
            buyNowLink.href = urlObj.toString();
        } catch (e) {
            // Fallback (kept for safety)
            const sep = String(product.url || '').includes('?') ? '&' : '?';
            buyNowLink.href = `${product.url}${sep}${queryParams.toString()}`;
        }
        buyNowLink.target = "_blank";

        // Apply button styles
        Object.assign(buyNowLink.style, {
            backgroundColor: buttonOptions.bgColor,
            color: buttonOptions.textColor,
            borderRadius: buttonOptions.borderRadius,
            borderColor: buttonOptions.buttonBorderColor,
            padding: buttonOptions.size === 'large' ? '20px 30px' 
                  : buttonOptions.size === 'small' ? '8px 12px' 
                  : '14px 20px',
            fontSize: buttonOptions.size === 'large' ? '22px' 
                   : buttonOptions.size === 'small' ? '12px' 
                   : '16px'
        });

        // Build container content
        container.innerHTML = '';
        container.append(
            priceEl,
            buyNowLink
        );

        // Add downsell if enabled
        
        if (product.downsell_offer_id == null && product.upsell_offer_id == null) {
    const continueLink = document.createElement('a');
    continueLink.className = 'btn-forge btn-forge-continue';
    continueLink.textContent = `No Thank You, I Don't Want This Premium Upgrade`;
    continueLink.href = baseURL + "/no-thanx";
    container.appendChild(continueLink);
}

        if (product.downsell && container.dataset.downsell !== 'off') {
            const continueLink = document.createElement('a');
            continueLink.className = 'btn-forge btn-forge-continue';
            continueLink.textContent = `No Thank You, I Don't Want This Premium Upgrade`;
            continueLink.href = product.downsell.url;
            continueLink.target = "_blank";
            container.appendChild(continueLink);
        }

        // Add footer elements
        const taglineEl = document.createElement('div');
        taglineEl.className = 'tagline';
        taglineEl.textContent = 'Powered by Launchpad';
        
        container.append(
            taglineEl,
            getCardImages(theme)
        );
    }

    function init() {
        const forgeContainers = document.querySelectorAll('.forgeContainer');
        forgeContainers.forEach(container => {
            updateContainer(
                container,
                container.dataset.id,
                container.dataset.page,
                container.dataset.offer,
                container.dataset.theme ?? 'dark'
            );
        });
    }

    init();
})();