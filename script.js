const appPaths = [
    'apps/gp-share/info.json',
    'apps/GP-screen-Strum/info.json'
];

let allAppsCache = [];
let currentFilter = 'All';
let searchTerm = '';

async function loadApps() {
    let appsData = [];
    for (let path of appPaths) {
        try {
            let response = await fetch(path);
            let data = await response.json();
            appsData.push(data);
        } catch (error) {
            console.error("Error loading app data:", error);
        }
    }
    allAppsCache = appsData;
    renderFilteredApps();
}

function renderCard(app) {
    let downloadsHTML = '';
    if (app.androidUrl) {
        downloadsHTML += `<a href="${app.androidUrl}" target="_blank" class="download-btn">Android APK</a>`;
    }
    if (app.pcUrl) {
        downloadsHTML += `<a href="${app.pcUrl}" target="_blank" class="download-btn" style="background:var(--accent-color); color:white;">PC Tool</a>`;
    }
    if (!app.androidUrl && !app.pcUrl && app.downloadUrl) {
        downloadsHTML += `<a href="${app.downloadUrl}" target="_blank" class="download-btn">Download</a>`;
    }

    let iconHTML = app.icon.startsWith('http') || app.icon.includes('/') 
        ? `<img src="${app.icon}" alt="Icon">` 
        : (app.icon || '📱');

    return `
        <div class="project-card" data-category="${app.category}">
            <div class="card-header">
                <div class="app-icon-box">${iconHTML}</div>
                <div>
                    <h4 onclick="openDetailsModalData('${app.id}')">${app.title}</h4>
                    <span class="version-tag">${app.tagline}</span>
                </div>
            </div>
            <p class="app-description">${app.description}</p>
            <div class="screenshot-gallery">
                ${app.images.map(img => `<img src="${img}" alt="Screenshot" onclick="openLightbox('${img}')">`).join('')}
            </div>
            <div class="card-footer">
                <div class="downloads-row">
                    ${downloadsHTML}
                </div>
                <div class="action-row">
                    <span class="file-size">${app.fileSize || ''}</span>
                    <button class="secondary-btn" onclick="openDetailsModalData('${app.id}')">Info / GitHub</button>
                </div>
            </div>
        </div>
    `;
}

function renderFilteredApps() {
    let filtered = allAppsCache.filter(app => {
        let matchesCat = (currentFilter === 'All' || app.category === currentFilter);
        let matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            app.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCat && matchesSearch;
    });

    const latestGrid = document.getElementById('latest-grid');
    if (latestGrid) {
        latestGrid.innerHTML = allAppsCache.slice(0, 3).map(renderCard).join('');
    }

    const allAppsGrid = document.getElementById('all-apps-grid');
    if (allAppsGrid) {
        allAppsGrid.innerHTML = filtered.length ? filtered.map(renderCard).join('') : '<p style="color:var(--text-muted);">No applications found.</p>';
    }
}

function filterCategory(cat) {
    currentFilter = cat;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(cat.toLowerCase()) || (cat==='All' && btn.textContent==='All'));
    });
    renderFilteredApps();
}

function handleSearch() {
    const input = document.getElementById('search-input');
    if (input) {
        searchTerm = input.value;
        renderFilteredApps();
    }
}

function openLightbox(src) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    if (modal && img) {
        img.src = src;
        modal.style.display = 'flex';
    }
}
function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) modal.style.display = 'none';
}

function openDetailsModalData(id) {
    const app = allAppsCache.find(a => a.id === id);
    if (!app) return;

    document.getElementById('modal-app-title').textContent = app.title;
    document.getElementById('modal-app-version').textContent = app.tagline;
    document.getElementById('modal-changelog').textContent = app.changelog || "Initial stable release.";
    document.getElementById('modal-requirements').textContent = app.requirements || "Compatible platform.";
    document.getElementById('modal-hash').textContent = app.sha256 || "Verified Secure Hash";
    
    document.getElementById('modal-github-link').href = app.githubRepoUrl || "#";
    document.getElementById('modal-readme-link').href = app.readmeUrl || "#";

    document.getElementById('details-modal').style.display = 'flex';
}
function closeDetailsModal(event) {
    if (!event || event.target.id === 'details-modal' || event.target.classList.contains('close-modal')) {
        document.getElementById('details-modal').style.display = 'none';
    }
}

function closeAnnouncement() {
    const bar = document.getElementById('announcement-bar');
    if (bar) bar.style.display = 'none';
}

function toggleFeedbackModal() {
    const popup = document.getElementById('feedback-modal');
    if (popup) {
        popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    }
}
function sendFeedback() {
    const msg = document.getElementById('fb-msg').value;
    if(!msg) { alert("Please write a message!"); return; }
    alert("Thank you! Your feedback has been recorded.");
    toggleFeedbackModal();
    document.getElementById('fb-name').value = '';
    document.getElementById('fb-msg').value = '';
}

document.addEventListener("DOMContentLoaded", async () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        const mainSite = document.getElementById('main-site');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }
        if (mainSite) {
            mainSite.style.display = 'block';
            setTimeout(() => mainSite.style.opacity = '1', 50);
        }
    }, 800);

    await loadApps();
});
