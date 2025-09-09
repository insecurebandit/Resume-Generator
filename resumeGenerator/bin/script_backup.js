document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resumeForm");
    const resumeOutput = document.getElementById("resumeOutput");
    const resumeContent = document.getElementById("resumeContent");
    const downloadBtn = document.getElementById("downloadBtn");

    // new: photo input stored as object URL (smaller than inline base64)
    const photoInput = document.getElementById("photo");
    let photoData = null;
    let photoObjectUrl = null;

    if (photoInput) {
        photoInput.addEventListener('change', () => {
            const file = photoInput.files && photoInput.files[0];
            // revoke previous URL
            if (photoObjectUrl) { URL.revokeObjectURL(photoObjectUrl); photoObjectUrl = null; photoData = null; }
            if (!file) { return; }
            photoObjectUrl = URL.createObjectURL(file);
            photoData = photoObjectUrl;
        });
    }

    // disable download until resume is generated
    downloadBtn.disabled = true;

    // make submit handler async so we can await image read if needed
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Collect form data
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const summary = document.getElementById("summary").value;
        const experience = document.getElementById("experience").value;

        const primaryEducation = document.getElementById("primaryEducation").value;
        const yearPrimary = document.getElementById("yearPrimaryEducation").value;

        const secondaryEducation = document.getElementById("secondaryEducation").value;
        const yearSecondary = document.getElementById("yearSecondaryEducation").value;

        const tertiaryEducation = document.getElementById("tertiaryEducation").value;
        const yearTertiary = document.getElementById("yearTertiaryEducation").value;

        const skills = document.getElementById("skills").value;

        // Build structured, safe HTML for the resume
        // Split skills into individual words/tokens.
        // Split on any character that is not a letter, digit, #, +, or -.
        // This turns "Web Development, JavaScript; C++" -> ["Web","Development","JavaScript","C++"]
        const skillsList = (skills || '').split(/[^A-Za-z0-9#\+\-]+/)
            .map(s => s.trim())
            .filter(Boolean);
        
        function escapeHTML(str = '') {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        const resumeHTML = `
            <div class="resume-sheet">
                <header class="resume-header">
                    <div class="header-left">
                        <h1 class="name">${escapeHTML(name)}</h1>
                        <div class="contact">${escapeHTML(email)} &nbsp; | &nbsp; ${escapeHTML(phone)}</div>
                    </div>
                    ${photoData ? `<div class="header-photo"><img class="photo" src="${photoData}" alt="Photo"></div>` : ''}
                </header>

                <section class="section summary">
                    <h2 class="section-title">Professional Summary</h2>
                    <p>${escapeHTML(summary).replace(/\n/g, '<br>')}</p>
                </section>

                <section class="section experience">
                    <h2 class="section-title">Work Experience</h2>
                    <p>${escapeHTML(experience).replace(/\n/g, '<br>')}</p>
                </section>

                <section class="section education">
                    <h2 class="section-title">Education</h2>
                    <ul class="education-list">
                    <li><strong>Primary:</strong> ${escapeHTML(primaryEducation)} <span class="edu-year">(${escapeHTML(yearPrimary)})</span></li>
                    <li><strong>Secondary:</strong> ${escapeHTML(secondaryEducation)} <span class="edu-year">(${escapeHTML(yearSecondary)})</span></li>
                    <li><strong>Tertiary:</strong> ${escapeHTML(tertiaryEducation)} <span class="edu-year">(${escapeHTML(yearTertiary)})</span></li>
                    </ul>
                </section>

                <section class="section skills">
                    <h2 class="section-title">Skills & Expertise</h2>
                    <ul class="skills-list">
                        ${skillsList.map(s => `<li>${escapeHTML(s)}</li>`).join('')}
                    </ul>
                </section>
            </div>
        `;

        // Inject styled HTML
        resumeContent.innerHTML = resumeHTML;
        resumeOutput.classList.remove("hidden");
        // enable download once resume exists
        downloadBtn.disabled = false;
    });

    // small helper to lazy-load external scripts
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            // if already present, resolve
            for (const s of document.scripts) if (s.src && s.src.indexOf(src) !== -1) return resolve();
            const el = document.createElement('script');
            el.src = src;
            el.async = true;
            el.onload = () => resolve();
            el.onerror = () => reject(new Error('Failed to load ' + src));
            document.head.appendChild(el);
        });
    }

    // new: format selector
    const downloadFormat = document.getElementById('downloadFormat');

    // Replace existing download handler with html2canvas/jsPDF exports
    downloadBtn.addEventListener("click", async () => {
        if (downloadBtn.disabled) return;
        // pick element to capture (the inner sheet)
        const sheet = resumeContent.querySelector('.resume-sheet') || resumeContent;
        if (!sheet) return;

        downloadBtn.disabled = true;
        const originalText = downloadBtn.textContent;
        downloadBtn.textContent = 'Preparing...';

        try {
            // lazy-load html2canvas if needed
            if (typeof html2canvas !== 'function') {
                await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
                if (typeof html2canvas !== 'function') throw new Error('html2canvas failed to load');
            }

            // capture at balanced scale for quality vs filesize
            const scale = 1.5; // reduced from 2 for smaller canvas
            const canvas = await html2canvas(sheet, {
                scale,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });

            const format = (downloadFormat && downloadFormat.value) ? downloadFormat.value.toLowerCase() : 'pdf';
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const baseName = (document.getElementById('name').value || 'resume').replace(/\s+/g, '_');

            if (format === 'png' || format === 'jpeg' || format === 'jpg') {
                const mime = format === 'png' ? 'image/png' : 'image/jpeg';
                const dataUrl = canvas.toDataURL(mime, 0.92);
                // trigger download
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = `${baseName}_${timestamp}.${format === 'png' ? 'png' : 'jpg'}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else if (format === 'pdf') {
                // lazy-load jsPDF only when exporting PDF
                if (!(window.jspdf && window.jspdf.jsPDF) && !window.jsPDF) {
                    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
                }
                const jsPDFCtor = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
                if (!jsPDFCtor) throw new Error('jsPDF not loaded');

                // image data (use PNG for embedding for best quality)
                const imgData = canvas.toDataURL('image/png');

                // create PDF in mm with A4 size
                const pdf = new jsPDFCtor({
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait'
                });

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();

                // calculate image dimensions in mm keeping aspect ratio
                const imgProps = pdf.getImageProperties(imgData);
                const imgWidthPx = imgProps.width;
                const imgHeightPx = imgProps.height;
                const imgWidthMm = pageWidth;
                const imgHeightMm = (imgHeightPx * imgWidthMm) / imgWidthPx;

                // if image taller than page, scale down to fit page height and allow page breaks
                if (imgHeightMm <= pageHeight) {
                    pdf.addImage(imgData, 'PNG', 0, 0, imgWidthMm, imgHeightMm);
                    pdf.save(`${baseName}_${timestamp}.pdf`);
                } else {
                    // split long image into pages
                    const pageCanvas = document.createElement('canvas');
                    const scalePxToMm = pageWidth / canvas.width;
                    let yPosPx = 0;
                    while (yPosPx < canvas.height) {
                        const h = Math.min(canvas.height - yPosPx, Math.round(pageHeight / scalePxToMm));
                        pageCanvas.width = canvas.width;
                        pageCanvas.height = h;
                        const ctx = pageCanvas.getContext('2d');
                        ctx.drawImage(canvas, 0, yPosPx, canvas.width, h, 0, 0, canvas.width, h);
                        const pageData = pageCanvas.toDataURL('image/png');
                        const pageImgProps = pdf.getImageProperties(pageData);
                        const pageImgHeightMm = (pageImgProps.height * pageWidth) / pageImgProps.width;
                        if (yPosPx > 0) pdf.addPage();
                        pdf.addImage(pageData, 'PNG', 0, 0, pageWidth, pageImgHeightMm);
                        yPosPx += h;
                    }
                    pdf.save(`${baseName}_${timestamp}.pdf`);
                }
            } else {
                throw new Error('Unsupported format');
            }
        } catch (err) {
            console.error(err);
            alert('Export failed: ' + (err && err.message ? err.message : 'unknown error'));
        } finally {
            downloadBtn.disabled = false;
            downloadBtn.textContent = originalText;
        }
    });
});

