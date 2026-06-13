/**
 * E-Graphisme - Export Manager
 * Export vers différents formats
 */

class ExportManager {
    constructor() {
        this.formats = {
            png: { extension: '.png', mime: 'image/png' },
            pdf: { extension: '.pdf', mime: 'application/pdf' },
            figma: { extension: '.fig', mime: 'application/figma' },
            canva: { extension: '.canva', mime: 'application/canva' },
            psd: { extension: '.psd', mime: 'image/vnd.adobe.photoshop' },
            svg: { extension: '.svg', mime: 'image/svg+xml' },
            zip: { extension: '.zip', mime: 'application/zip' }
        };
    }

    /**
     * Exporter en PNG
     */
    exportPNG(element, filename = 'design') {
        // Utiliser html2canvas si disponible
        if (typeof html2canvas !== 'undefined') {
            return html2canvas(element).then(canvas => {
                this.download(canvas.toDataURL('image/png'), filename + '.png');
            });
        }
        // Fallback: afficher un message
        alert('Export PNG nécessite la bibliothèque html2canvas');
    }

    /**
     * Exporter en PDF
     */
    async exportPDF(content, filename = 'document') {
        // Utiliser jsPDF si disponible
        if (typeof jspdf !== 'undefined') {
            const { jsPDF } = jspdf;
            const pdf = new jsPDF();
            pdf.text(content, 10, 10);
            pdf.save(filename + '.pdf');
        } else {
            alert('Export PDF nécessite la bibliothèque jsPDF');
        }
    }

    /**
     * Exporter en SVG
     */
    exportSVG(svgElement, filename = 'design') {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        this.download(URL.createObjectURL(blob), filename + '.svg');
    }

    /**
     * Exporter en ZIP
     */
    async exportZIP(files, filename = 'exports') {
        // Utiliser JSZip si disponible
        if (typeof JSZip !== 'undefined') {
            const zip = new JSZip();
            files.forEach(file => {
                zip.file(file.name, file.data);
            });
            const content = await zip.generateAsync({ type: 'blob' });
            this.download(URL.createObjectURL(content), filename + '.zip');
        } else {
            alert('Export ZIP nécessite la bibliothèque JSZip');
        }
    }

    /**
     * Télécharger un fichier
     */
    download(url, filename) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
    }

    /**
     * Exporter vers Figma (format JSON)
     */
    exportToFigma(data, filename = 'figma-design') {
        const content = JSON.stringify(data, null, 2);
        const blob = new Blob([content], { type: 'application/json' });
        this.download(URL.createObjectURL(blob), filename + '.json');
    }

    /**
     * Exporter vers Canva (format JSON)
     */
    exportToCanva(data, filename = 'canva-design') {
        const content = JSON.stringify(data, null, 2);
        const blob = new Blob([content], { type: 'application/json' });
        this.download(URL.createObjectURL(blob), filename + '.canva');
    }
}

window.exportManager = new ExportManager();