document.addEventListener('DOMContentLoaded', () => {
    const formAvistamiento = document.getElementById('form-avistamiento');
    const contenedorErrores = document.getElementById('mensajes-error');

    formAvistamiento.addEventListener('submit', (event) => {
        event.preventDefault(); // Previene el envío HTML por defecto
        contenedorErrores.innerHTML = '';
        const errores = [];

        // Captura de elementos
        const tipoAve = document.getElementById('tipo-ave')?.value;
        const nombreAve = document.getElementById('nombre-ave')?.value.trim();
        const lugar = document.getElementById('lugar')?.value.trim();
        const fechaInput = document.getElementById('fecha').value;
        const horaInput = document.getElementById('hora').value;
        const archivoInput = document.getElementById('multimedia');

        // 1. Validación de campos de texto y selección[cite: 1]
        if (!tipoAve) {
            errores.push('Debe seleccionar el tipo de ave.');
        }

        if (!nombreAve || nombreAve.length < 2) {
            errores.push('Debe ingresar un nombre de ave válido.');
        }

        if (!lugar || lugar.length < 3) {
            errores.push('Debe ingresar el lugar del avistamiento.');
        }

        // 2. Validación de Fecha y Hora nativas[cite: 1]
        if (!fechaInput) {
            errores.push('Debe indicar la fecha del avistamiento.');
        }

        if (!horaInput) {
            errores.push('Debe indicar la hora del avistamiento.');
        }

        // 3. Reglas de negocio para Fecha y Hora[cite: 1]
        if (fechaInput && horaInput) {
            // Los inputs nativos entregan formatos ISO: "YYYY-MM-DD" y "HH:mm"
            const fechaHoraAvistamiento = new Date(`${fechaInput}T${horaInput}`);
            const ahora = new Date();

            const haceUnAno = new Date();
            haceUnAno.setFullYear(ahora.getFullYear() - 1);

            if (fechaHoraAvistamiento > ahora) {
                errores.push('La fecha y hora del avistamiento no pueden estar en el futuro.');
            } else if (fechaHoraAvistamiento < haceUnAno) {
                errores.push('El avistamiento no puede ser de hace más de 1 año.');
            }
        }

        // 4. Validación obligatoria de Foto o Vídeo[cite: 1]
        if (!archivoInput || !archivoInput.files || archivoInput.files.length === 0) {
            errores.push('Debe adjuntar al menos un registro en foto o vídeo.');
        } else {
            const archivo = archivoInput.files[0];
            const tiposPermitidos = [
                'image/jpeg', 'image/png', 'image/webp',
                'video/mp4', 'video/webm', 'video/quicktime'
            ];

        if (!tiposPermitidos.includes(archivo.type)) {
            errores.push('El archivo debe ser una imagen (JPG, PNG, WEBP) o vídeo (MP4, WEBM, MOV).');
        }
        }

        // 5. Renderizado de errores o envío exitoso
        if (errores.length > 0) {
            const ul = document.createElement('ul');
            ul.style.color = 'red';
            errores.forEach((err) => {
                const li = document.createElement('li');
                li.textContent = err;
                ul.appendChild(li);
            });
            contenedorErrores.appendChild(ul);

        } else {
            alert('¡Avistamiento registrado exitosamente!');
            formAvistamiento.reset();
        }
    });
});