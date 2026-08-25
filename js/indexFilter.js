document.addEventListener('DOMContentLoaded', () => {
    const filtroTipo = document.getElementById('filtro-tipo');
    const ordenarPor = document.getElementById('ordenar-por');
    const contenedorLista = document.querySelector('.lista-avistamientos');
    const tarjetas = Array.from(document.querySelectorAll('.tarjeta-ave'));

    // Capturar y estructurar la información de cada tarjeta visible
    const datosTarjetas = tarjetas.map((tarjeta) => {
        const parrafos = tarjeta.querySelectorAll('p');
        let tipoText = '', lugarText = '', fechaText = '';

        parrafos.forEach((p) => {
            const texto = p.textContent;
            if (texto.includes('Tipo:')) tipoText = texto.replace('Tipo:', '').trim();
            if (texto.includes('Lugar:')) lugarText = texto.replace('Lugar:', '').trim();
            if (texto.includes('Fecha y Hora:')) fechaText = texto.replace('Fecha y Hora:', '').trim();
        });

        // Extraer componentes de la fecha "DD/MM/YYYY - HH:mm hrs"
        const parteFecha = fechaText.split(' - ')[0]; // "18/08/2026"
        const [dia, mes, anio] = parteFecha.split('/');
        
        // Formato ISO "YYYY-MM-DD" para comparar con el input de tipo date
        const fechaISO = `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
        const fechaObj = new Date(`${fechaISO}T00:00:00`);

        return {
            elemento: tarjeta,
            tipo: tipoText.toLowerCase(),
            lugarOriginal: lugarText,
            fechaObj: fechaObj
        };
    });

    // Función principal para filtrar y ordenar
    function aplicarFiltrosYOrden() {
        const valTipo = filtroTipo?.value.toLowerCase() || '';
        const valOrden = ordenarPor?.value || 'fecha-desc';

        // Filtrar elementos
        const filtrados = datosTarjetas.filter((item) => {
            const coincideTipo = !valTipo || item.tipo.includes(valTipo);
            return coincideTipo;
        });

        // Ordenar elementos
        filtrados.sort((a, b) => {
            if (valOrden === 'fecha-desc') {
                return b.fechaObj - a.fechaObj;
            } else if (valOrden === 'fecha-asc') {
                return a.fechaObj - b.fechaObj;
            } else if (valOrden === 'lugar') {
                return a.lugarOriginal.localeCompare(b.lugarOriginal, 'es');
            }
            return 0;
        });

        // Renderizar resultados en el DOM
        datosTarjetas.forEach((item) => {
            item.elemento.style.display = 'none';
        });

        filtrados.forEach((item) => {
            item.elemento.style.display = ''; 
            contenedorLista.appendChild(item.elemento); // Reordena en el DOM
        });
    }

    // Eventos de escucha en los controles de entrada
    filtroTipo?.addEventListener('change', aplicarFiltrosYOrden);
    ordenarPor?.addEventListener('change', aplicarFiltrosYOrden);
});