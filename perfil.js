import { createClient } from '@supabase/supabase-js';

// Conexión con Supabase
const supabase = createClient("https://wtajlgcvlpwjcgmcpwfk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0YWpsZ2N2bHB3amNnbWNwd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMTM2OTEsImV4cCI6MjA1Nzg4OTY5MX0.j5UtCOXk8zPamHg_nL_AajoGIIGQmbdLimTNwZpznno");

// Elementos del DOM
const userEmail = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");

// Verificar si hay un usuario autenticado
async function checkUser() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        console.error("Error obteniendo usuario:", error.message);
        return;
    }

    if (!user) {
        // Si no hay usuario, redirigir a la página de login
        window.location.href = "index.html";
    } else {
        // Mostrar el email del usuario
        userEmail.textContent = user.email;
    }
}

// Cerrar sesión
logoutBtn.addEventListener("click", async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert("Error cerrando sesión: " + error.message);
    } else {
        window.location.href = "index.html"; // Redirigir al login
    }
});

// Ejecutar la verificación al cargar la página
checkUser();
