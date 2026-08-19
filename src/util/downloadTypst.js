import profileImage from "../assets/profile.jpg";

const API_URL = "https://cv-api.miguesync.es/api/pdf";

const blobToDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const downloadTypstPDF = async (data, lang, template = "modern") => {
  // 1. Obtener la foto en base64 (data URL)
  let photo = null;
  try {
    const resp = await fetch(profileImage);
    if (resp.ok) {
      photo = await blobToDataUrl(await resp.blob());
    }
  } catch (e) {
    console.warn("No se pudo cargar la foto para el PDF:", e);
  }

  // 2. Llamar a la API de Typst
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, lang, photo, template }),
  });

  if (!resp.ok) {
    let detail = "";
    try {
      detail = await resp.text();
    } catch (_) {
      /* ignore */
    }
    throw new Error("Error generando PDF: " + detail);
  }

  // 3. Descargar el PDF resultante
  const pdfBlob = await resp.blob();
  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${data.name?.replace(/\s+/g, "_") || "CV"}_${lang}_${template}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export default downloadTypstPDF;
