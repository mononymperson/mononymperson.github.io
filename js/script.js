// Load work history
function loadWorkHistory() {
    const container = document.getElementById('workHistoryContainer');
    
    workHistory.forEach(item => {
        const workItem = document.createElement('div');
        workItem.className = 'timeline-item';
        
        const html = `
            <h4 class="mb-1">${item.period}</h4>
            <h5 class="mb-3">${item.company}</h5>
            <ul class="mb-0">
                ${item.description.map(desc => `<li>${desc}</li>`).join('')}
            </ul>
        `;
        
        workItem.innerHTML = html;
        container.appendChild(workItem);
    });
}

// Load projects
// Load projects
function loadProjects() {
    const container = document.getElementById('projectsContainer');
    
    projects.forEach((project, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 p-0 p-3';
        
        const html = `
            <div class="project-card card" onclick="openProjectModal(${index})">
                <img src="${project.detail.images[0]}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h3 class="card-title">${project.title}</h3>
                    <p class="card-text text-truncate">${project.detail.description}</p>
                    <div class="tags">
                        ${project.detail.stack.slice(0, 3).map(tech => 
                            `<span class="badge bg-primary me-1">${tech}</span>`
                        ).join('')}
                        ${project.detail.stack.length > 3 ? 
                            `<span class="badge bg-secondary">+${project.detail.stack.length - 3}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
        
        col.innerHTML = html;
        container.appendChild(col);
    });
}

// Open project modal
function openProjectModal(projectIndex) {
    const project = projects[projectIndex];
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    
    // Set modal content
    document.getElementById('projectModalTitle').textContent = project.title;
    document.getElementById('projectModalDescription').textContent = project.detail.description;
    
    // Set technologies
    const techContainer = document.getElementById('projectModalTechnologies');
    techContainer.innerHTML = project.detail.stack.map(tech => 
        `<span class="badge bg-primary me-1 mb-1">${tech}</span>`
    ).join('');
    
    // Set website link
    const websiteLink = document.getElementById('projectModalWebsite');
    websiteLink.href = project.detail.website;
    websiteLink.textContent = project.detail.website;
    
    // Clear existing carousel items
    const carouselInner = document.getElementById('carouselInner');
    const carouselIndicators = document.getElementById('carouselIndicators');
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';
    
    // Add new carousel items
    project.detail.images.forEach((image, index) => {
        // Create indicator
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#projectCarousel');
        indicator.setAttribute('data-bs-slide-to', index.toString());
        if (index === 0) indicator.classList.add('active');
        carouselIndicators.appendChild(indicator);
        
        // Create slide
        const slide = document.createElement('div');
        slide.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${image}" class="d-block w-100" alt="Screenshot ${index + 1}">
        `;
        carouselInner.appendChild(slide);
    });
    
    // Show modal
    modal.show();
}

// Load education
function loadEducation() {
    const container = document.getElementById('educationContainer');
    
    education.forEach(item => {
        const eduItem = document.createElement('div');
        eduItem.className = 'timeline-item';
        
        const html = `
            <h4 class="mb-1">${item.period}</h4>
            <h5 class="mb-1">${item.institution}</h5>
            <p class="text-muted mb-3">${item.degree}</p>
            <ul class="mb-0">
                ${item.description.map(desc => `<li>${desc}</li>`).join('')}
            </ul>
        `;
        
        eduItem.innerHTML = html;
        container.appendChild(eduItem);
    });
}

// Load skills
function loadSkills() {
    const container = document.getElementById('skillsContainer');
    
    for (const category in skills) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'col-md-6 col-lg-3 skill-category';
        
        let categoryTitle = '';
        switch(category) {
            case 'backend': categoryTitle = 'Backend'; break;
            case 'frontend': categoryTitle = 'Frontend'; break;
            case 'database': categoryTitle = 'Database'; break;
            case 'others': categoryTitle = 'Others'; break;
        }
        
        let skillsHtml = '';
        skills[category].forEach(skill => {
            skillsHtml += `
                <div class="skill-item">
                    <div class="skill-name">${skill.name}</div>
                    </div>
                </div>
            `;
        });
        
        const html = `
            <h4>${categoryTitle}</h4>
            ${skillsHtml}
        `;
        
        categoryDiv.innerHTML = html;
        container.appendChild(categoryDiv);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadWorkHistory();
    loadProjects();
    loadEducation();
    loadSkills();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});