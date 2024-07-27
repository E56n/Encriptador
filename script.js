document.addEventListener('DOMContentLoaded', function() {
    // Obtén los elementos del DOM
    const inputText = document.getElementById('input-text');
    const processedMessage = document.getElementById('processed-message');
    const illustration = document.getElementById('illustration');
    const lockImage = document.getElementById('lock-image');
    const copyButton = document.getElementById('copy-button');
    const encryptButton = document.getElementById('encrypt-button');
    const decryptButton = document.getElementById('decrypt-button');
    const instruction = document.getElementById('instruction');
    const notification = document.getElementById('notification');

    // Verifica que los elementos se seleccionen correctamente
    console.log({
        inputText,
        processedMessage,
        illustration,
        lockImage,
        copyButton,
        encryptButton,
        decryptButton,
        instruction,
        notification
    });

    // Evento para encriptar el texto
    encryptButton.addEventListener('click', () => {
        const text = inputText.value.trim();
        if (text) {
            const encryptedText = encryptText(text);
            displayMessage(encryptedText, 'locked.png'); // Muestra el mensaje encriptado con imagen de bloqueo
        }
    });

    // Evento para desencriptar el texto
    decryptButton.addEventListener('click', () => {
        const text = inputText.value.trim();
        if (text) {
            try {
                const decryptedText = decryptText(text);
                displayMessage(decryptedText, 'unlocked.png'); // Muestra el mensaje desencriptado con imagen desbloqueada
            } catch (e) {
                alert('Error al desencriptar el texto. Asegúrate de que el texto esté en el formato correcto.');
            }
        }
    });

    // Evento para copiar el texto al portapapeles
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(processedMessage.textContent).then(() => {
            showNotification('Texto copiado al portapapeles'); // Muestra una notificación de éxito
        });
    });

    // Evento para resetear la vista si el input está vacío
    inputText.addEventListener('input', () => {
        if (inputText.value.trim() === '') {
            resetView(); // Resetea la vista si el campo de texto está vacío
        }
    });

    // Muestra el mensaje encriptado/desencriptado
    function displayMessage(message, lockImageUrl) {
        console.log('Displaying message:', message);
        processedMessage.textContent = message; // Muestra el mensaje procesado
        lockImage.src = lockImageUrl; // Establece la imagen de bloqueo

        console.log('Lock image URL:', lockImage.src);

        lockImage.onload = () => console.log('Lock image loaded successfully');
        lockImage.onerror = () => console.log('Error loading lock image');

        // Mostrar elementos
        document.getElementById('messages').style.display = 'block'; // Muestra el contenedor de mensajes
        lockImage.style.display = 'block'; // Muestra la imagen de bloqueo
        illustration.style.display = 'none'; // Oculta la ilustración
        processedMessage.style.display = 'block'; // Muestra el mensaje procesado
        copyButton.style.display = 'inline-block'; // Muestra el botón de copiar
        instruction.style.display = 'none'; // Oculta las instrucciones
    }

    // Resetea la vista a su estado inicial
    function resetView() {
        console.log('resetView');
        lockImage.style.display = 'none'; // Oculta la imagen de bloqueo
        processedMessage.style.display = 'none'; // Oculta el mensaje procesado
        illustration.style.display = 'block'; // Muestra la ilustración
        copyButton.style.display = 'none'; // Oculta el botón de copiar
        instruction.style.display = 'block'; // Muestra las instrucciones
    }

    // Encriptación simple con base64
    function encryptText(text) {
        return btoa(text); // Codifica el texto en base64
    }

    // Desencriptación simple con base64
    function decryptText(text) {
        return atob(text); // Decodifica el texto de base64
    }

    // Muestra la notificación
    function showNotification(message) {
        notification.textContent = message; // Establece el texto de la notificación
        notification.classList.add('show'); // Muestra la notificación
        setTimeout(() => {
            notification.classList.remove('show'); // Oculta la notificación después de 2 segundos
        }, 2000);
    }
});
