import Swal from "sweetalert2";
import { IFileIncident } from "../../features/dashboard/types/catalogs.types";

export const previewFile = (file: IFileIncident) => {
  if (file.type.startsWith("image/")) {
    // Previsualizar imagen
    Swal.fire({
      title: file.name,
      text: file.name,
      imageUrl: file.url,
      imageAlt: file.name,
      imageWidth: "100%",
      imageHeight: "auto",
      showCloseButton: true,
    });
  } else if (file.type === "application/pdf") {
    // Previsualizar PDF
    Swal.fire({
      title: file.name,
      html: `<iframe src="${file.url}" width="100%" height="600px"></iframe>`,
      showCloseButton: true,
    });
  } else {
    // Para otros tipos de archivos, proporcionar un enlace de descarga
    Swal.fire({
      title: file.name,
      text: "No preview available. Click the button below to download the file.",
      confirmButtonText: "Download",
      preConfirm: () => {
        window.open(file.url, "_blank");
      },
    });
  }
};
