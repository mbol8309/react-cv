import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";

const downloadPDF = async (data,lang) => {
        
        // 1. Ocultar elementos no deseados
        const noPrintElements = document.querySelectorAll('.no-print');
        noPrintElements.forEach(el => el.style.visibility = 'hidden');

        // Seleccionar todas las secciones del CV
        const cvSections = document.querySelectorAll('.cv-container > section');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const marginLeft = 30;
        const pageWidth = 210 - (2 * marginLeft); // Ancho útil (210mm - 20mm de márgenes)
        const pageHeight = 277; // Altura útil (297mm - 20mm de márgenes)

        let currentY = 10; // Posición vertical inicial

        // 3. Procesar Header
        const header = document.querySelector('.cv-container > header');
        if (header) {
            const headerCanvas = await html2canvas(header, {
                scale: 2,
                windowHeight: header.scrollHeight,
                backgroundColor: '#FFFFFF'
            });
            const headerHeight = (headerCanvas.height * pageWidth) / headerCanvas.width;

            pdf.addImage(headerCanvas, 'PNG', marginLeft, currentY, pageWidth, headerHeight);
            currentY += headerHeight + 5;
        }

        for (const element of cvSections) {

            const h3nsections = element.querySelector('h3');
            // Crear canvas para cada elemento (header o section)
            const h3canvas = await html2canvas(h3nsections, {
                scale: 2,
                logging: false,
                useCORS: true,
                letterRendering: true,
                backgroundColor: '#FFFFFF',
                windowHeight: element.scrollHeight // Ajustar al alto del elemento
            });
            const h3Height = (h3canvas.height * pageWidth) / h3canvas.width;


            const section_content = element.querySelector('.section-content');

            const sectionitem = element.querySelectorAll('.section-item');
            if (sectionitem.length === 0) { // si no hay items, usar el contenido de la sección
                const sectionCanvas = await html2canvas(section_content, {
                    scale: 2,
                    logging: false,
                    useCORS: true,
                    letterRendering: true,
                    backgroundColor: '#FFFFFF',
                    windowHeight: element.scrollHeight // Ajustar al alto del elemento
                });

                const sectionHeight = (sectionCanvas.height * pageWidth) / sectionCanvas.width;



                // Verificar si el elemento cabe en la página actual
                if (currentY + sectionHeight + sectionHeight > pageHeight) {
                    pdf.addPage(); // Nueva página si no cabe
                    currentY = 10; // Resetear posición Y
                }
                //agrega h3
                pdf.addImage(h3canvas, 'PNG', marginLeft, currentY, pageWidth, h3Height);
                currentY += h3Height + (element.tagName === 'HEADER' ? 5 : 10);
                //agrega content
                pdf.addImage(sectionCanvas, 'PNG', marginLeft, currentY, pageWidth, sectionHeight);
                currentY += sectionHeight + 5; // Menor espacio después del header
            } else {
                for (const items of sectionitem) {
                    // Crear canvas para cada elemento (header o section)
                    const canvas2 = await html2canvas(items, {
                        scale: 2,
                        logging: false,
                        useCORS: true,
                        letterRendering: true,
                        backgroundColor: '#FFFFFF',
                        windowHeight: element.scrollHeight // Ajustar al alto del elemento
                    });

                    const imgHeight2 = (canvas2.height * pageWidth) / canvas2.width;
                    if (items == sectionitem[0]) {
                        if (currentY + imgHeight2 + h3Height > pageHeight) {
                            pdf.addPage(); // Nueva página si no cabe
                            currentY = 10; // Resetear posición Y
                        }
                        pdf.addImage(h3canvas, 'PNG', marginLeft, currentY, pageWidth, h3Height);
                        currentY += h3Height + (element.tagName === 'HEADER' ? 5 : 10);
                    }
                    // Verificar si el elemento cabe en la página actual
                    if (currentY + imgHeight2 > pageHeight) {
                        pdf.addPage(); // Nueva página si no cabe
                        currentY = 10; // Resetear posición Y
                    }

                    pdf.addImage(canvas2, 'PNG', marginLeft, currentY, pageWidth, imgHeight2);
                    currentY += imgHeight2 + (element.tagName === 'HEADER' ? 5 : 10); // Menor espacio después del header
                }
            }
        }

        // Restaurar elementos ocultos
        noPrintElements.forEach(el => el.style.visibility = '');

        pdf.save(`${data.name}_${lang}_CV.pdf`);

}
    
export default downloadPDF;