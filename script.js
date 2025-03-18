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
const passwordToggle = document.getElementById("toggle-password");
const message = document.getElementById("message");

// Función para mostrar mensajes con colores
function showMessage(text, type) {
    message.textContent = text;
    message.className = type; // 'success' o 'error'
    message.style.display = "block";
    setTimeout(() => { message.style.display = "none"; }, 5000);
}

// Registro de usuario con validación y correo de confirmación
signupBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        showMessage("❌ Ingresa un correo y contraseña", "error");
        return;
    }
    if (password.length < 6) {
        showMessage("❌ La contraseña debe tener al menos 6 caracteres", "error");
        return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
        showMessage("❌ " + error.message, "error");
    } else {
        showMessage("✅ Registro exitoso. Revisa tu correo.", "success");
    }
});

// Inicio de sesión con validación
loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        showMessage("❌ Ingresa un correo y contraseña", "error");
        return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        showMessage("❌ " + error.message, "error");
    } else {
        showMessage("✅ Bienvenido " + email, "success");
        logoutBtn.style.display = "block";
    }
});

// Cerrar sesión
logoutBtn.addEventListener("click", async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        showMessage("❌ " + error.message, "error");
    } else {
        showMessage("👋 Sesión cerrada.", "success");
        logoutBtn.style.display = "none";
    }
});

// Mostrar/Ocultar contraseña
passwordToggle.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggle.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        passwordToggle.textContent = "👁";
    }
});

// Redireccionar al usuario después de la confirmación del email en Supabase
async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        window.location.href = "https://loginprofesional.netlify.app/";
    }
}

// Ejecutar la verificación al cargar la página
checkSession();
