// ==== DOM references ====
const previewEl = document.getElementById('preview');
const codeOutput = document.getElementById('codeOutput');
const generateBtn = document.getElementById('generateBtn');
const previewBtn = document.getElementById('previewBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

// ==== Component templates ====
const components = {
    carousel: `
        <div id="carouselExample" class="carousel slide mb-5" data-bs-ride="carousel">
            <div class="carousel-inner rounded shadow-sm">
                <div class="carousel-item active"><img src="https://picsum.photos/1200/400?random=1" class="d-block w-100" alt="Slide 1"></div>
                <div class="carousel-item"><img src="https://picsum.photos/1200/400?random=2" class="d-block w-100" alt="Slide 2"></div>
                <div class="carousel-item"><img src="https://picsum.photos/1200/400?random=3" class="d-block w-100" alt="Slide 3"></div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span><span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span><span class="visually-hidden">Next</span>
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
            <div class="container"><h1 class="fw-bold">Sample Header Section</h1></div>
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
                        <li class="nav-item"><a class="nav-link" href="#">Trending</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Articles</a></li>
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
                ${Array.from({ length: 6 }).map((_, i) => `<div class="col-md-4"><img src="https://picsum.photos/400/300?random=${i+1}" class="img-fluid rounded shadow-sm" alt="Photo ${i+1}"></div>`).join('')}
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
                <div class="col-md-4"><div class="card shadow-sm p-4"><h5>Basic</h5><p class="display-6">$9</p></div></div>
                <div class="col-md-4"><div class="card shadow-sm p-4 border-primary border-2"><h5>Pro</h5><p class="display-6">$29</p></div></div>
                <div class="col-md-4"><div class="card shadow-sm p-4"><h5>Enterprise</h5><p class="display-6">$49</p></div></div>
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
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
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
            <small>© ${new Date().getFullYear()} Bootstrap Generator. Built with ❤️ by Kiven.</small>
        </footer>
    `
};

// ==== Navbar generator ====
function generateNavbar(type, style='standard') {
    const sticky = style==='sticky'?'position-sticky top-0 shadow-sm':'';
    if(type==='portfolio') {
        return `
        <nav class="navbar navbar-expand-lg navbar-light bg-white ${sticky}" aria-label="Portfolio navigation">
            <div class="container">
                <a class="navbar-brand fw-bold" href="#">YourName</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navPortfolio">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="navPortfolio">
                    <ul class="navbar-nav mb-2 mb-lg-0">
                        <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                        <li class="nav-item"><a class="nav-link" href="#projects">Work</a></li>
                        <li class="nav-item"><a class="nav-link" href="#notes">Notes</a></li>
                    </ul>
                    <div class="ms-lg-3 d-flex align-items-center">
                        <a class="btn btn-outline-primary me-2 d-none d-lg-inline" href="#projects">View work</a>
                        <a class="btn btn-primary" href="#contact">Contact</a>
                    </div>
                </div>
            </div>
        </nav>`;
    } else {
        return `
        <nav class="navbar navbar-expand-lg navbar-light bg-white ${sticky}" aria-label="Ecommerce navigation">
            <div class="container">
                <a class="navbar-brand fw-bold" href="#">ShopName</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navEcom">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navEcom">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Categories</a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">New</a></li>
                                <li><a class="dropdown-item" href="#">Popular</a></li>
                                <li><a class="dropdown-item" href="#">Sale</a></li>
                            </ul>
                        </li>
                        <li class="nav-item"><a class="nav-link" href="#">Deals</a></li>
                    </ul>
                    <form class="d-flex ms-auto me-3" role="search" onsubmit="event.preventDefault();">
                        <input class="form-control me-2" type="search" placeholder="Search products">
                        <button class="btn btn-outline-secondary" type="submit"><i class="bi bi-search"></i></button>
                    </form>
                    <div class="d-flex align-items-center">
                        <a class="btn btn-outline-dark me-2" href="#"><i class="bi bi-cart"></i> <span class="badge bg-danger">3</span></a>
                        <a class="btn btn-primary" href="#">Sign in</a>
                    </div>
                </div>
            </div>
        </nav>`;
    }
}

// ==== Initialization ====
document.addEventListener('DOMContentLoaded', () => {
    const formEl = document.getElementById('generatedCheckboxes');
    Object.keys(components).forEach(name => {
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
            <label class="form-check">
                <input type="checkbox" class="form-check-input me-2" value="${name}" id="comp_${name}">
                <span>${name.charAt(0).toUpperCase() + name.slice(1)}</span>
            </label>`;
        formEl.appendChild(div);
    });

    // Default checked components
    ['cover', 'features', 'footer'].forEach(id =>
        document.getElementById(`comp_${id}`).checked = true
    );

    renderPreview();
    renderCode();
});

// ==== Build HTML ====
function buildSelectedHTML() {
    const siteType = document.querySelector("input[name='siteType']:checked").value;
    const style = document.getElementById('navStyle').value || 'standard';
    const selected = Array.from(document.querySelectorAll('#generatedCheckboxes input:checked'))
        .map(cb => cb.value);

    const navbar = generateNavbar(siteType, style);
    let bodyComponents = selected.map(k => components[k] || '').join('');

    // Always include footer if not selected
    if (!selected.includes('footer')) bodyComponents += components.footer;

    const fullHTML = `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Generated — ${siteType}</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
<style>
body { background-color: #f8f9fa; }
</style>
</head>
<body>
${navbar}
${bodyComponents}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `;

    return { fullHTML, previewHTML: fullHTML };
}

// ==== Render preview ====
let _currentIframe = null;
function renderPreview() {
    const { fullHTML } = buildSelectedHTML();

    // Create iframe if not exists
    if (!_currentIframe) {
        previewEl.innerHTML = '';
        const iframe = document.createElement('iframe');
        Object.assign(iframe.style, {
            width: '100%',
            height: '600px',
            border: '0',
            background: '#fff'
        });
        previewEl.appendChild(iframe);
        _currentIframe = iframe;
    }

    // Write full HTML (with Bootstrap) into iframe
    const doc = _currentIframe.contentDocument || _currentIframe.contentWindow.document;
    doc.open();
    doc.write(fullHTML);
    doc.close();

    // Auto resize iframe height to fit content
    setTimeout(() => {
        if (_currentIframe && _currentIframe.contentWindow) {
            const doc = _currentIframe.contentDocument;
            const height = doc.body.scrollHeight + 30;
            _currentIframe.style.height = height + 'px';
        }
    }, 400);
}

// ==== Render code ====
function renderCode() {
    codeOutput.textContent = buildSelectedHTML().fullHTML;
}

// ==== Button actions ====
generateBtn.addEventListener('click', () => {
    renderPreview();
    renderCode();
    generateBtn.textContent = 'Generated ✓';
    setTimeout(() => generateBtn.textContent = 'Generate', 1200);
});

previewBtn.addEventListener('click', () => {
    const w = window.open();
    if (w) w.document.write(buildSelectedHTML().fullHTML);
});

copyBtn.addEventListener('click', async () => {
    await navigator.clipboard.writeText(buildSelectedHTML().fullHTML);
    copyBtn.textContent = 'Copied ✓';
    setTimeout(() => copyBtn.textContent = 'Copy HTML', 1200);
});

downloadBtn.addEventListener('click', () => {
    const blob = new Blob([buildSelectedHTML().fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
});
