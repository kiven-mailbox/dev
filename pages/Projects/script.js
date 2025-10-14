// ==== Component templates (kept modular) ====
const components = {
    carousel: `
        <div id="carouselExample" class="carousel slide mb-5" data-bs-ride="carousel" aria-label="Image carousel">
            <div class="carousel-inner rounded shadow-sm">
                <div class="carousel-item active"><img src="https://picsum.photos/1200/400?random=1" class="d-block w-100" alt="Slide 1"></div>
                <div class="carousel-item"><img src="https://picsum.photos/1200/400?random=2" class="d-block w-100" alt="Slide 2"></div>
                <div class="carousel-item"><img src="https://picsum.photos/1200/400?random=3" class="d-block w-100" alt="Slide 3"></div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    `,
    cover: `
        <section class="text-center text-white bg-dark py-5 mb-5">
            <div class="container">
                <h1 class="display-4 fw-bold">Beautiful Cover Header</h1>
                <p class="lead">Elegant, simple and modern design for your site.</p>
                <a class="btn btn-outline-light btn-lg" href="#featured">Explore</a>
            </div>
        </section>
    `,
    headers: `
        <header class="bg-primary text-white text-center py-5 mb-4">
            <div class="container">
                <h1 class="fw-bold">Sample Header Section</h1>
            </div>
        </header>
    `,
    features: `
        <section id="featured" class="container py-5 text-center">
            <h2 class="fw-bold mb-4">Features</h2>
            <div class="row g-4">
                <div class="col-md-4"><h5>Responsive</h5><p>Looks great on all devices.</p></div>
                <div class="col-md-4"><h5>Customizable</h5><p>Easy to modify and style.</p></div>
                <div class="col-md-4"><h5>Lightweight</h5><p>Fast and simple setup.</p></div>
            </div>
        </section>
    `,
    buttons: `
        <div class="container text-center py-5">
            <h2 class="mb-3 fw-bold">Buttons</h2>
            <button class="btn btn-primary me-2">Primary</button>
            <button class="btn btn-outline-secondary me-2">Outline</button>
            <button class="btn btn-success">Success</button>
        </div>
    `,
    breadcrumb: `
        <nav aria-label="breadcrumb" class="bg-light p-3 mb-4 rounded">
            <div class="container">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Library</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Data</li>
                </ol>
            </div>
        </nav>
    `,
    sidebar: `
        <div class="container my-5">
            <div class="row">
                <aside class="col-md-3 bg-light p-3 border-end">
                    <ul class="nav flex-column">
                        <li class="nav-item"><a class="nav-link" href="#">Dashboard</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Settings</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Profile</a></li>
                    </ul>
                </aside>
                <main class="col-md-9 p-3">
                    <h3>Main Content Area</h3>
                    <p>Here’s your page content with a sidebar layout.</p>
                </main>
            </div>
        </div>
    `,
    album: `
        <section class="container py-5">
            <h2 class="text-center mb-4">Photo Album</h2>
            <div class="row g-3">
                ${Array.from({ length: 6 })
                    .map(
                        (_, i) =>
                            `<div class="col-md-4"><img src="https://picsum.photos/400/300?random=${i +
                                1}" class="img-fluid rounded shadow-sm" alt="Photo ${i + 1}"></div>`
                    )
                    .join('')}
            </div>
        </section>
    `,
    testimonials: `
        <section class="bg-light py-5 text-center">
            <div class="container">
                <h2 class="mb-4 fw-bold">What Our Users Say</h2>
                <blockquote class="blockquote">
                    <p>"This generator saved me hours of work!"</p>
                    <footer class="blockquote-footer">Satisfied Developer</footer>
                </blockquote>
            </div>
        </section>
    `,
    pricing: `
        <section class="container py-5 text-center">
            <h2 class="fw-bold mb-4">Pricing Plans</h2>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="card shadow-sm p-4">
                        <h5>Basic</h5>
                        <p class="display-6">$9</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card shadow-sm p-4 border-primary border-2">
                        <h5>Pro</h5>
                        <p class="display-6">$29</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card shadow-sm p-4">
                        <h5>Enterprise</h5>
                        <p class="display-6">$49</p>
                    </div>
                </div>
            </div>
        </section>
    `,
    modals: `
        <div class="text-center my-5">
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#demoModal">Open Modal</button>
            <div class="modal fade" id="demoModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Example Modal</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">This is a Bootstrap modal popup.</div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    footer: `
        <footer class="bg-dark text-white text-center py-3 mt-5">
            <small>© ${new Date().getFullYear()} Bootstrap Generator. Built with ❤️ by You.</small>
        </footer>
    `
};

// ==== Navbar generators (portfolio vs ecommerce) ====
function generateNavbar(siteType, style = 'standard') {
    if (siteType === 'portfolio') {
        // Portfolio navbar: centered brand, minimal links, hire-me call to action
        const sticky = style === 'sticky' ? 'position-sticky top-0 shadow-sm' : '';
        const container = `
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm ${sticky}" role="navigation" aria-label="Portfolio navigation">
      <div class="container${style === 'minimal' ? '-fluid' : ''}">
        <a class="navbar-brand d-flex align-items-center gap-2" href="#" aria-label="Homepage">
          <span class="fw-bold">YourName</span>
          <span class="text-muted small d-none d-md-inline">Design • Dev</span>
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navPortfolio" aria-controls="navPortfolio" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-center" id="navPortfolio">
          <ul class="navbar-nav mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link text-body-secondary" href="#about">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-body-secondary" href="#projects">Work</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-body-secondary" href="#notes">Notes</a>
        </li>
          </ul>

          <div class="ms-lg-3 d-flex align-items-center">
        <a class="btn btn-outline-primary me-2 d-none d-lg-inline" href="#projects" aria-label="View portfolio">View work</a>
        <a class="btn btn-primary" href="#contact" aria-label="Contact and hire">Contact</a>
          </div>
        </div>
      </div>
    </nav>
        `;
        return container;
    }

    // E-commerce navbar: brand left, categories, search, cart, sign in
    {
        const sticky = style === 'sticky' ? 'position-sticky top-0 shadow-sm' : '';
        return `
<nav class="navbar navbar-expand-lg navbar-light bg-white ${sticky}" aria-label="Ecommerce navigation">
    <div class="container">
        <a class="navbar-brand fw-bold" href="#">ShopName</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navEcom" aria-controls="navEcom" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navEcom">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="categoriesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categories</a>
                    <ul class="dropdown-menu" aria-labelledby="categoriesDropdown">
                        <li><a class="dropdown-item" href="#">New</a></li>
                        <li><a class="dropdown-item" href="#">Popular</a></li>
                        <li><a class="dropdown-item" href="#">Sale</a></li>
                    </ul>
                </li>
                <li class="nav-item"><a class="nav-link" href="#">Deals</a></li>
            </ul>

            <form class="d-flex ms-auto me-3" role="search" onsubmit="event.preventDefault();">
                <input class="form-control me-2" type="search" placeholder="Search products" aria-label="Search">
                <button class="btn btn-outline-secondary" type="submit"><i class="bi bi-search"></i></button>
            </form>

            <div class="d-flex align-items-center">
                <a class="btn btn-outline-dark me-2" href="#" title="Cart"><i class="bi bi-cart"></i> <span class="badge bg-danger ms-1">3</span></a>
                <a class="btn btn-primary" href="#">Sign in</a>
            </div>
        </div>
    </div>
</nav>
        `;
    }
}

// ==== UI & app wiring ====
const previewEl = document.getElementById('preview');
const codeOutput = document.getElementById('codeOutput');
const generateBtn = document.getElementById('generateBtn');
const previewBtn = document.getElementById('previewBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const componentFormEl = document.getElementById('generatedCheckboxes');
const navStyleSelect = document.getElementById('navStyle');
const beautifyBtn = document.getElementById('beautifyBtn');

// pre-defined list (order matters: navbars are generated separately)
const componentList = [
    'carousel',
    'cover',
    'headers',
    'features',
    'buttons',
    'breadcrumb',
    'sidebar',
    'album',
    'testimonials',
    'pricing',
    'modals',
    'footer'
];

// create checkboxes programmatically (keeps markup minimal)
function initCheckboxes() {
    componentFormEl.innerHTML = '';
    componentList.forEach(name => {
        const id = `comp_${name}`;
        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `
            <label for="${id}" class="form-check">
                <input type="checkbox" class="form-check-input me-2" id="${id}" value="${name}">
                <span>${name.charAt(0).toUpperCase() + name.slice(1)}</span>
            </label>
        `;
        componentFormEl.appendChild(col);
    });
}

// sanitizes & builds final HTML
function buildSelectedHTML() {
    const siteType = document.querySelector("input[name='siteType']:checked").value;
    const style = navStyleSelect.value || 'standard';
    const selected = Array.from(document.querySelectorAll('#generatedCheckboxes input[type="checkbox"]:checked')).map(
        cb => cb.value
    );

    // Build navbar first
    const navbarHTML = generateNavbar(siteType, style);

    // Body content header per site type
    const heroIntro =
        siteType === 'portfolio'
            ? `
        <section class="container py-4 text-center">
            <h2 class="fw-bold">Portfolio Base</h2>
            <p class="muted">A clean starting point for showcasing your work.</p>
        </section>
    `
            : `
        <section class="container py-4 text-center">
            <h2 class="fw-bold">E-Commerce Base</h2>
            <p class="muted">A product-focused layout ready for listings and checkout flows.</p>
        </section>
    `;

    // Append selected components in chosen order
    let bodyComponents = heroIntro;
    selected.forEach(key => {
        if (components[key]) bodyComponents += components[key];
    });

    // Always append footer if not selected
    if (!selected.includes('footer')) bodyComponents += components.footer;

    // Final full HTML (self-contained page)
    const fullHTML = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Generated — ${siteType}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
</head>
<body>
    ${navbarHTML}
    ${bodyComponents}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;

    // previewHTML should include the CSS-ready preview: include Bootstrap so preview shows correctly
    const previewHTML = `<!-- Preview rendered inside generator (Bootstrap present in parent) -->${navbarHTML}${bodyComponents}`;

    return { fullHTML, previewHTML };
}

// Render preview & code
function renderPreview() {
    const { previewHTML } = buildSelectedHTML();
    previewEl.innerHTML = previewHTML;
    // ensure previews look a bit nicer inside generator:
    // small tweak: make navbar background visible if it's white (ecom)
    // nothing else — leave interactivity to bootstrap JS loaded in this page
}

function renderCode() {
    const { fullHTML } = buildSelectedHTML();
    // show readable HTML (not escaped characters intentionally)
    codeOutput.textContent = fullHTML;
}

// Actions
generateBtn.addEventListener('click', () => {
    renderPreview();
    renderCode();
    generateBtn.textContent = 'Generated ✓';
    setTimeout(() => (generateBtn.textContent = 'Generate'), 1200);
});

previewBtn.addEventListener('click', () => {
    const { fullHTML } = buildSelectedHTML();
    const w = window.open('', '_blank');
    w.document.write(fullHTML);
    w.document.close();
});

copyBtn.addEventListener('click', async () => {
    const { fullHTML } = buildSelectedHTML();
    try {
        await navigator.clipboard.writeText(fullHTML);
        copyBtn.textContent = 'Copied ✓';
        setTimeout(() => (copyBtn.textContent = 'Copy HTML'), 1500);
    } catch (e) {
        copyBtn.textContent = 'Copy failed';
        console.error(e);
        setTimeout(() => (copyBtn.textContent = 'Copy HTML'), 1500);
    }
});

downloadBtn.addEventListener('click', () => {
    const { fullHTML } = buildSelectedHTML();
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-page.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
});

beautifyBtn.addEventListener('click', () => {
    // small helper to apply bigger preview width (visual only)
    previewEl.querySelectorAll('img').forEach(img => {
        img.classList.add('img-fluid');
    });
    beautifyBtn.textContent = 'Done ✓';
    setTimeout(() => (beautifyBtn.textContent = 'Beautify Preview'), 1200);
});

// init
document.addEventListener('DOMContentLoaded', () => {
    initCheckboxes();
    // auto-check some sensible defaults
    document.getElementById('comp_cover').checked = true;
    document.getElementById('comp_features').checked = true;
    document.getElementById('comp_footer').checked = true;
    // first render
    renderPreview();
    renderCode();
});