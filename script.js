import { createClient } from '@supabase/supabase-js';

// Conexión con Supabase (Usando tu URL y API Key)
const supabase = createClient("https://wtajlgcvlpwjcgmcpwfk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0YWpsZ2N2bHB3amNnbWNwd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMTM2OTEsImV4cCI6MjA1Nzg4OTY5MX0.j5UtCOXk8zPamHg_nL_AajoGIIGQmbdLimTNwZpznno");

// Elementos del DOM
const authForm = document.getElementById("auth-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const logoutBtn = document.getElementById("logout-btn");
const profileLink = document.getElementById("profile-link");
const message = document.getElementById("message");

// Función para mostrar mensajes
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
    message.style.display = "block";
    setTimeout(() => { message.style.display = "none"; }, 5000);
}

// Verificar sesión sin redirección automática
async function checkSession() {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
        console.error("Error verificando sesión:", error.message);
        return;
    }

    if (session && session.user) {
        console.log("✅ Usuario autenticado:", session.user.email);
        showMessage("✅ Sesión iniciada como " + session.user.email, "success");

        // Mostrar el botón "Ir a Mi Perfil" en lugar de redirigir automáticamente
        if (profileLink) profileLink.style.display = "block";
        if (logoutBtn) logoutBtn.style.display = "block";
    } else {
        // Si no hay sesión, asegurarse de ocultar botones
        if (profileLink) profileLink.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "none";
    }
}

// Ejecutar solo en la página de login
if (window.location.pathname === "/" || window.location.pathname.includes("index.html")) {
    document.addEventListener("DOMContentLoaded", checkSession);
}

// Registro de usuario
signupBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        showMessage("❌ Ingresa un correo y contraseña", "error");
        return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
        showMessage("❌ " + error.message, "error");
    } else {
        showMessage("✅ Registro exitoso. Revisa tu correo.", "success");
    }
});

// Inicio de sesión SIN REDIRECCIÓN AUTOMÁTICA
loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        showMessage("❌ Ingresa un correo y contraseña", "error");
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        showMessage("❌ " + error.message, "error");
    } else {
        showMessage("✅ Bienvenido " + email, "success");

        // Mostrar el botón "Ir a Mi Perfil" en lugar de redirigir
        if (profileLink) profileLink.style.display = "block";
        if (logoutBtn) logoutBtn.style.display = "block";
    }
});

// Cerrar sesión
logoutBtn.addEventListener("click", async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        showMessage("❌ " + error.message, "error");
    } else {
        showMessage("👋 Sesión cerrada.", "success");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    }
});