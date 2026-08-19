// Captura del campo de archivo
const archivoInput = document.getElementById('multimedia');

// 1. Validar que el usuario adjuntó un archivo
if (!archivoInput.files || archivoInput.files.length === 0) {
  errores.push('Debe adjuntar al menos un archivo de foto o vídeo del avistamiento.');
} else {
  // 2. Opcional: Validar el tipo de archivo (MIME type)
  const archivo = archivoInput.files[0];
  const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime'];

  if (!tiposPermitidos.includes(archivo.type)) {
    errores.push('El archivo adjunto debe ser una imagen (JPG, PNG, WEBP) o un vídeo (MP4, WEBM, MOV).');
  }

  // 3. Opcional: Validar tamaño máximo (Ejemplo: máximo 15 MB)
  const tamanoMaximoMB = 15;
  const tamanoMaximoBytes = tamanoMaximoMB * 1024 * 1024;
  if (archivo.size > tamanoMaximoBytes) {
    errores.push(`El archivo no puede superar los ${tamanoMaximoMB} MB.`);
  }
}