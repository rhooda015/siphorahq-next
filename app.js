// DOM Elements
const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('file-input');
const demoButton = document.getElementById('demo-button');

const heroSection = document.getElementById('hero-section');
const processingSection = document.getElementById('processing-section');
const resultsSection = document.getElementById('results-section');

const previewImage = document.getElementById('preview-image');
const progressBar = document.getElementById('progressBar');
const statusTitle = document.getElementById('status-title');
const galleryGrid = document.getElementById('gallery-grid');

const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');

// Simulated AI Generation Steps
const processSteps = [
    { title: 'Isolating product from background...', duration: 2000, id: 'step-1' },
    { title: 'Locking structural integrity and textures...', duration: 1500, id: 'step-2' },
    { title: 'Generating luxury scenes...', duration: 3000, id: 'step-3' },
    { title: 'Applying photorealistic lighting...', duration: 2000, id: 'step-4' }
];

// Demo Assets (will be replaced by actual images)
const demoAssets = {
    source: 'assets/product_source.png',
    results: [
        { src: 'assets/luxury_scene_1.png', tag: 'Marble Pedestal', title: 'Classic Elegance' },
        { src: 'assets/luxury_scene_2.png', tag: 'Dark Moody', title: 'Midnight Reflection' },
        { src: 'assets/luxury_scene_3.png', tag: 'Botanical', title: 'Tropical Oasis' },
        { src: 'assets/luxury_scene_4.png', tag: 'Neon Podium', title: 'Cyber Chic' }
    ]
};

// Event Listeners for Upload
uploadZone.addEventListener('click', () => fileInput.click());

uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
        handleFileSelect(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
        handleFileSelect(e.target.files[0]);
    }
});

demoButton.addEventListener('click', () => {
    startProcessing(null, demoAssets.source);
});

// Modal Listeners
modalClose.addEventListener('click', closeModal);
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal || e.target.classList.contains('modal-backdrop')) {
        closeModal();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !imageModal.classList.contains('hidden')) {
        closeModal();
    }
});

// State
let generatedResults = [];

// Functions
function handleFileSelect(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        startProcessing(file, e.target.result);
    };
    reader.readAsDataURL(file);
}

async function startProcessing(file, imageSrc) {
    // Switch Views
    heroSection.classList.add('hidden');
    processingSection.classList.remove('hidden');
    
    // Set preview image
    previewImage.src = imageSrc;
    
    // Reset steps
    document.querySelectorAll('.step').forEach(el => {
        el.classList.remove('active', 'completed');
    });
    
    const pBar = document.getElementById('progress-bar');
    pBar.style.width = '0%';
    
    // If it's the demo button (no file), run fake animation
    if (!file) {
        generatedResults = demoAssets.results;
        await runFakeAnimation(pBar);
        showResults();
        return;
    }

    // --- REAL BACKEND INTEGRATION ---
    // Start animation step 1 & 2 visually
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    step1.classList.add('active');
    statusTitle.textContent = "Uploading and formatting image...";
    pBar.style.width = '20%';

    try {
        const formData = new FormData();
        formData.append('image', file);

        // Transition to Generation step visually
        setTimeout(() => {
            step1.classList.remove('active'); step1.classList.add('completed');
            step2.classList.remove('active'); step2.classList.add('completed');
            document.getElementById('step-3').classList.add('active');
            statusTitle.textContent = "OpenAI is generating luxury scenes...";
            pBar.style.width = '60%';
        }, 1500);

        const response = await fetch('http://localhost:3001/generate', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to generate images');
        }

        generatedResults = data.results;

        // Finish animation
        document.getElementById('step-3').classList.remove('active');
        document.getElementById('step-3').classList.add('completed');
        document.getElementById('step-4').classList.add('active');
        statusTitle.textContent = "Applying final touches...";
        pBar.style.width = '100%';
        
        setTimeout(() => {
            document.getElementById('step-4').classList.remove('active');
            document.getElementById('step-4').classList.add('completed');
            showResults();
        }, 1000);

    } catch (error) {
        alert('Error: ' + error.message);
        // Reset UI on error
        processingSection.classList.add('hidden');
        heroSection.classList.remove('hidden');
    }
}

async function runFakeAnimation(pBar) {
    let totalDuration = processSteps.reduce((acc, step) => acc + step.duration, 0);
    let currentTime = 0;
    for (let i = 0; i < processSteps.length; i++) {
        const step = processSteps[i];
        const stepEl = document.getElementById(step.id);
        stepEl.classList.add('active');
        statusTitle.textContent = step.title;
        currentTime += step.duration;
        const targetPercent = (currentTime / totalDuration) * 100;
        await new Promise(resolve => {
            pBar.style.width = `${targetPercent}%`;
            setTimeout(resolve, step.duration);
        });
        stepEl.classList.remove('active');
        stepEl.classList.add('completed');
    }
}

function showResults() {
    processingSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    
    galleryGrid.innerHTML = '';
    
    generatedResults.forEach((result, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animation = `fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s forwards`;
        
        item.innerHTML = `
            <img src="${result.src}" alt="${result.title}" loading="lazy">
            <div class="gallery-overlay">
                <span class="gallery-tag">${result.tag}</span>
                <h3 class="gallery-title">${result.title}</h3>
            </div>
        `;
        
        item.addEventListener('click', () => openModal(result));
        
        galleryGrid.appendChild(item);
    });
}

function openModal(result) {
    modalImage.src = result.src;
    modalTitle.textContent = result.title;
    imageModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    imageModal.classList.add('hidden');
    document.body.style.overflow = '';
}
