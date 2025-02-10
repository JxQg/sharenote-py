function initDocument() {
    /*
     * Callout fold/unfold
     */
    document.querySelectorAll('.callout.is-collapsible > .callout-title')
        .forEach(titleEl => {
            // Add a listener on the title element
            titleEl.addEventListener('click', () => {
                const calloutEl = titleEl.parentElement;
                // Toggle the collapsed class
                calloutEl.classList.toggle('is-collapsed');
                titleEl.querySelector('.callout-fold').classList.toggle('is-collapsed');
                // Show/hide the content
                calloutEl.querySelector('.callout-content').style.display = calloutEl.classList.contains('is-collapsed') ? 'none' : '';
            });
        });

    /*
     * List fold/unfold
     */
    document.querySelectorAll('.list-collapse-indicator')
        .forEach(collapseEl => {
            collapseEl.addEventListener('click', () => {
                // Toggle the collapsed class
                collapseEl.classList.toggle('is-collapsed');
                collapseEl.parentElement.classList.toggle('is-collapsed');
            });
        });

    /*
     * Light/Dark theme toggle
     */
    const themeToggleEl = document.querySelector('#theme-mode-toggle');
    themeToggleEl.onclick = () => {
        document.body.classList.toggle('theme-dark');
        document.body.classList.toggle('theme-light');
    };

    /*
     * Copy code button
     */
    document.querySelectorAll('button.copy-code-button')
        .forEach(buttonEl => {
            buttonEl.addEventListener('click', () => {
                const codeEl = buttonEl.parentElement.querySelector('code');
                navigator.clipboard.writeText(codeEl.innerText.trim()).then();
            });
        });

    /*
     * Responsive mobile classes
     */
    function toggleMobileClasses() {
        const mobileClasses = ['is-mobile', 'is-phone'];
        if (window.innerWidth <= 768) {
            // Is mobile
            document.body.classList.add(...mobileClasses);
        } else {
            document.body.classList.remove(...mobileClasses);
        }
    }

    toggleMobileClasses();
    window.addEventListener('resize', toggleMobileClasses);

    /*
     * Lucide icons
     */
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://unpkg.com/lucide@0.287.0/dist/umd/lucide.min.js';
    script.onload = () => {
        lucide.createIcons({
            attrs: {
                class: ['callout-icon']
            },
            nameAttr: 'data-share-note-lucide'
        });
    };
    document.head.appendChild(script);

    /**
     * generateTOC
     */
    function generateTOC() {
        const headers = document.querySelectorAll('.markdown-preview-section h1, .markdown-preview-section h2, .markdown-preview-section h3, .markdown-preview-section h4');
        const tocContainer = document.getElementById('toc');
        const tocList = document.createElement('ul');
        tocList.className = 'toc-list';

        headers.forEach((header, index) => {
            const id = `header-${index}`;
            header.id = id;

            const li = document.createElement('li');
            li.className = `toc-item toc-${header.tagName.toLowerCase()}`;

            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = header.textContent;
            a.onclick = (e) => {
                e.preventDefault();
                header.scrollIntoView({behavior: 'smooth'});
                if (window.innerWidth <= 768) {
                    document.querySelector('.toc-container').classList.remove('show');
                }
            };

            li.appendChild(a);
            tocList.appendChild(li);
        });

        tocContainer.appendChild(tocList);
    }

    /**
     * Mobile TOC Toggle
     */
    const tocToggle = document.querySelector('.toc-toggle');
    const tocContainer = document.querySelector('.toc-container');

    tocToggle?.addEventListener('click', () => {
        tocContainer.classList.toggle('show');
    });

    generateTOC();
}
