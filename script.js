// ================================================
// J&F Smart Logistics - Homepage JavaScript
// ================================================

// === CONFIGURATION - UPDATE YOUR DETAILS HERE ===
const CONFIG = {
    whatsappNumber: '250788351489',  // include country code, no + or spaces
    phone: '+250 788 351 489'
};

// Services offered in the booking form, grouped by tab
const SERVICES = {
    mobility: [
        'Airport Transfers',
        'Executive Chauffeur Services',
        'Corporate Transport Solutions',
        'Hotel Transfers',
        'VIP Transportation Services'
    ],
    tourism: [
        'Travel Planning & Coordination',
        'Local and International Tours',
        'Holiday Packages',
        'Business Travel Management',
        'Tourism & Excursion Services'
    ],
    freight: [
        'Local Truck Transport (Rwanda)',
        'Africa & Regional Trucking',
        'International Freight (Europe, Asia, USA)',
        'Port-to-Kigali Haulage',
        'Customs & Documentation Support',
        'Heavy, Project & Vehicle Cargo'
    ]
};

const BOOKING_LABELS = {
    mobility: { from: 'Pickup location', to: 'Drop-off', fromPh: "e.g. Kigali Int'l Airport", toPh: 'e.g. Kigali Marriott', date: 'Date', qty: 'Passengers', qtyKey: 'Passengers' },
    tourism: { from: 'Starting from', to: 'Destination', fromPh: 'e.g. Kigali', toPh: 'e.g. Volcanoes National Park', date: 'Date', qty: 'Travellers', qtyKey: 'Travellers' },
    freight: { from: 'Loading point', to: 'Delivery point', fromPh: 'e.g. Kigali, Shanghai or Hamburg', toPh: 'e.g. Musanze', date: 'Cargo ready date', qty: 'Containers / trucks', qtyKey: 'Containers/Trucks' }
};

// Translate a UI string (see i18n.js); falls back to English
const tr = s => (window.I18N ? I18N.t(s) : s);
const LANG_NAMES = { en: 'English', fr: 'French', es: 'Spanish', zh: 'Chinese' };

document.addEventListener('DOMContentLoaded', function () {
    if (window.AOS) {
        AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 80 });
    }

    initHeader();
    initSmoothScroll();
    initBooking();
    initCounters();
    initWhatsAppButton();
    initCoreCards();
});

// === Core service cards open the matching services tab ===
function initCoreCards() {
    document.querySelectorAll('.core-card[data-tab]').forEach(card => {
        card.addEventListener('click', () => {
            const trigger = document.querySelector(`.service-switch [data-bs-target="${card.dataset.tab}"]`);
            if (trigger) bootstrap.Tab.getOrCreateInstance(trigger).show();
        });
    });
}

// === Header: shrink on scroll + active link ===
function initHeader() {
    const header = document.getElementById('siteHeader');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#mainNav .nav-link');
    let ticking = false;

    const update = () => {
        header.classList.toggle('scrolled', window.scrollY > 40);

        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 160) current = section.id;
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    });
    update();

    // Close mobile menu after clicking a link
    document.querySelectorAll('#navbarNav a').forEach(link => {
        link.addEventListener('click', () => {
            const collapse = document.getElementById('navbarNav');
            if (collapse.classList.contains('show')) {
                bootstrap.Collapse.getOrCreateInstance(collapse).hide();
            }
        });
    });
}

// === Smooth scrolling that accounts for the fixed header ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            const headerHeight = document.getElementById('siteHeader').offsetHeight;
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

// === Booking form → WhatsApp ===
function initBooking() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    const select = document.getElementById('bkService');
    const tabs = document.querySelectorAll('.booking-tabs button');
    const dateInput = document.getElementById('bkDate');

    dateInput.min = new Date().toISOString().split('T')[0];

    let currentMode = 'mobility';
    const setMode = (mode, preselect) => {
        tabs.forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
        select.innerHTML = SERVICES[mode].map(s => `<option value="${s}">${tr(s)}</option>`).join('');
        if (preselect) select.value = preselect;

        const labels = BOOKING_LABELS[mode];
        document.getElementById('bkFromLabel').textContent = tr(labels.from);
        document.getElementById('bkToLabel').textContent = tr(labels.to);
        document.getElementById('bkFrom').placeholder = tr(labels.fromPh);
        document.getElementById('bkTo').placeholder = tr(labels.toPh);
        document.getElementById('bkPaxLabel').textContent = tr(labels.qty);
        document.querySelector('label[for="bkDate"]').textContent = tr(labels.date);
        document.getElementById('bkName').placeholder = tr('Full name');
        currentMode = mode;
    };

    tabs.forEach(tab => tab.addEventListener('click', () => setMode(tab.dataset.mode)));
    setMode('mobility');

    // Re-render labels and service names when the language changes
    document.addEventListener('langchange', () => setMode(currentMode, select.value));

    // Any "Book" link with data-book preselects the matching service
    document.querySelectorAll('[data-book]').forEach(link => {
        link.addEventListener('click', () => {
            const service = link.dataset.book;
            const mode = Object.keys(SERVICES).find(m => SERVICES[m].includes(service)) || 'mobility';
            setMode(mode, service);
            if (link.dataset.dest) document.getElementById('bkTo').value = link.dataset.dest;
            setTimeout(() => document.getElementById('bkFrom').focus({ preventScroll: true }), 600);
        });
    });

    form.addEventListener('submit', e => {
        e.preventDefault();

        let valid = true;
        form.querySelectorAll('input, select').forEach(field => {
            const ok = field.checkValidity() && field.value.trim() !== '';
            field.classList.toggle('is-invalid', !ok);
            if (!ok) valid = false;
        });
        if (!valid) {
            showNotification(tr('Please fill in all fields.'), 'warning');
            return;
        }

        const val = id => document.getElementById(id).value.trim();
        const message = [
            '*New Booking Request - J&F Smart Logistics*',
            '',
            `*Service:* ${val('bkService')}`,
            `*From:* ${val('bkFrom')}`,
            `*To:* ${val('bkTo')}`,
            `*${BOOKING_LABELS[currentMode].date}:* ${val('bkDate')}`,
            `*${BOOKING_LABELS[currentMode].qtyKey}:* ${val('bkPax')}`,
            `*Name:* ${val('bkName')}`,
            `*Language:* ${LANG_NAMES[window.I18N ? I18N.lang : 'en']}`
        ].join('\n');

        window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
        showNotification(tr('Opening WhatsApp with your request...'), 'success');
    });

    form.addEventListener('input', e => e.target.classList.remove('is-invalid'));
}

// === Animated counters ===
function initCounters() {
    const counters = document.querySelectorAll('.stat-num[data-count]');
    const format = (n, el) => {
        if (el.dataset.compact && n >= 1000) return Math.floor(n / 1000) + 'K' + el.dataset.suffix;
        return n + (el.dataset.suffix || '');
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            const start = performance.now();
            const duration = 1800;

            const tick = now => {
                const p = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = format(Math.round(target * eased), el);
                if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

// === Floating WhatsApp button message ===
function initWhatsAppButton() {
    const btn = document.getElementById('whatsappButton');
    if (!btn) return;
    const message = encodeURIComponent('Hello! I would like to know more about your mobility & travel services.');
    btn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
}

// === Notification toast ===
function showNotification(message, type = 'success') {
    document.querySelector('.custom-notification')?.remove();

    const note = document.createElement('div');
    note.className = `custom-notification alert alert-${type} position-fixed top-0 start-50 translate-middle-x shadow-lg`;
    note.style.cssText = 'z-index:9999;min-width:280px;margin-top:90px;';
    note.innerHTML = `<i class="bi bi-${type === 'success' ? 'check-circle-fill' : 'exclamation-circle-fill'} me-2"></i>${message}`;
    document.body.appendChild(note);

    setTimeout(() => note.remove(), 3000);
}
