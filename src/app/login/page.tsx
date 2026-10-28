"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import { signIn, signUp } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const { lang } = useLang();
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Detect Supabase PASSWORD_RECOVERY event (user clicked reset link in email)
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setMode("reset");
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const tr = {
    login: {
      title: lang === "es" ? "Bienvenido de nuevo" : "Welcome back",
      subtitle: lang === "es" ? "Inicia sesión para acceder a tus ofertas" : "Sign in to access your deals",
      btn: lang === "es" ? "Iniciar sesión" : "Sign in",
      switchText: lang === "es" ? "¿No tienes cuenta?" : "Don't have an account?",
      switchBtn: lang === "es" ? "Crear cuenta" : "Create account",
    },
    signup: {
      title: lang === "es" ? "Crea tu cuenta" : "Create your account",
      subtitle: lang === "es" ? "Gratis para siempre · Sin tarjeta de crédito" : "Free forever · No credit card needed",
      btn: lang === "es" ? "Crear cuenta gratis" : "Create free account",
      switchText: lang === "es" ? "¿Ya tienes cuenta?" : "Already have an account?",
      switchBtn: lang === "es" ? "Iniciar sesión" : "Sign in",
    },
    reset: {
      title: lang === "es" ? "Nueva contraseña" : "Set new password",
      subtitle: lang === "es" ? "Introduce tu nueva contraseña" : "Enter your new password below",
      btn: lang === "es" ? "Guardar contraseña" : "Save password",
      switchText: "",
      switchBtn: "",
    },
  };

  const t = tr[mode];

  const handleForgotPassword = async () => {
    if (!email) {
      setError(lang === "es" ? "Introduce tu email primero" : "Enter your email address first");
      return;
    }
    setResetting(true);
    setError("");
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    setResetting(false);
    setResetSent(true);
  };

  const handleSetNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError(lang === "es" ? "Mínimo 6 caracteres" : "Minimum 6 characters");
      return;
    }
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setError(error.message);
    } else {
      setResetSuccess(true);
      setTimeout(() => router.push("/profile"), 2000);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signup") {
      const { data: signUpData, error } = await signUp(email, password);
      if (error) {
        setError(error.message);
      } else if (signUpData?.session) {
        // Session returned immediately — send welcome email fire-and-forget
        fetch("/api/email/welcome", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, lang }),
        });
        router.push("/profile");
      } else {
        // Supabase may require email confirmation — try to sign in anyway
        const { error: signInError } = await signIn(email, password);
        if (!signInError) {
          router.push("/profile");
        } else if (signInError.message.toLowerCase().includes("confirm") || signInError.message.toLowerCase().includes("verif")) {
          // Email confirmation required — show friendly message
          setSuccessMsg(lang === "es"
            ? "✅ Cuenta creada — revisa tu email para confirmar tu cuenta"
            : "✅ Account created — check your email to confirm your account");
          setError("");
        } else {
          setError(signInError.message);
        }
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(lang === "es" ? "Email o contraseña incorrectos" : "Incorrect email or password");
      } else {
        router.push("/profile");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} aria-label="Go back" className="text-gray-500 hover:text-gray-700 text-2xl p-2 -m-2">←</button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-8 max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🍽️</div>
          <h1 className="text-2xl font-black text-gray-900">{t.title}</h1>
          <p className="text-gray-500 text-sm mt-1">{t.subtitle}</p>
        </div>

        {/* Password reset form */}
        {mode === "reset" ? (
          resetSuccess ? (
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <p className="font-bold text-gray-900 text-lg mb-1">
                {lang === "es" ? "¡Contraseña actualizada!" : "Password updated!"}
              </p>
              <p className="text-gray-500 text-sm">
                {lang === "es" ? "Redirigiendo a tu perfil..." : "Redirecting to your profile..."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSetNewPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {lang === "es" ? "Nueva contraseña" : "New password"}
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  autoFocus
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {lang === "es" ? "Mínimo 6 caracteres" : "Minimum 6 characters"}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-4 rounded-2xl transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {lang === "es" ? "Guardando..." : "Saving..."}
                  </span>
                ) : t.btn}
              </button>
            </form>
          )
        ) : (
          <>
            {/* Login / Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {lang === "es" ? "Email" : "Email"}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {lang === "es" ? "Contraseña" : "Password"}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
                {mode === "signup" && (
                  <p className="text-xs text-gray-400 mt-1">
                    {lang === "es" ? "Mínimo 6 caracteres" : "Minimum 6 characters"}
                  </p>
                )}
                {mode === "login" && (
                  <div className="flex justify-end mt-1">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={resetting}
                      className="text-xs text-orange-500 hover:text-orange-600 font-medium"
                    >
                      {resetting
                        ? (lang === "es" ? "Enviando..." : "Sending...")
                        : (lang === "es" ? "¿Olvidaste tu contraseña?" : "Forgot password?")}
                    </button>
                  </div>
                )}
              </div>

              {resetSent && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
                  {lang === "es"
                    ? "✅ Email enviado — revisa tu bandeja de entrada para restablecer tu contraseña"
                    : "✅ Email sent — check your inbox to reset your password"}
                </div>
              )}

              {successMsg && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
                  {successMsg}
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-4 rounded-2xl transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {lang === "es" ? "Cargando..." : "Loading..."}
                  </span>
                ) : t.btn}
              </button>

              {mode === "signup" && (
                <p className="text-xs text-gray-400 text-center leading-relaxed">
                  {lang === "es"
                    ? <>Al crear una cuenta aceptas nuestros <a href="/terms" className="underline hover:text-gray-600">Términos de uso</a> y <a href="/privacy" className="underline hover:text-gray-600">Política de privacidad</a>.</>
                    : <>By creating an account you agree to our <a href="/terms" className="underline hover:text-gray-600">Terms of Use</a> and <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>.</>
                  }
                </p>
              )}
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">{lang === "es" ? "o" : "or"}</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Switch mode */}
            <p className="text-center text-sm text-gray-500">
              {t.switchText}{" "}
              <button
                onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
                className="text-orange-500 font-bold hover:text-orange-600"
              >
                {t.switchBtn}
              </button>
            </p>

            {/* Business link */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400">
                {lang === "es" ? "¿Eres dueño de un negocio?" : "Are you a business owner?"}{" "}
                <a href="/business/login" className="text-gray-500 font-medium hover:text-gray-700 underline">
                  {lang === "es" ? "Accede aquí" : "Login here"}
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
