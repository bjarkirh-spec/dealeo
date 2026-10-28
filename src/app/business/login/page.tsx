"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/context/LanguageContext";

export default function BusinessLogin() {
  const router = useRouter();
  const { lang, setLang } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Detect PASSWORD_RECOVERY event (user clicked reset link in email)
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setResetMode(true);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter your email address first");
      return;
    }
    setResetting(true);
    setError("");
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/business/login`,
    });
    setResetting(false);
    setResetSent(true);
  };

  const handleSetNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Minimum 6 characters");
      return;
    }
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setError(error.message);
    } else {
      setResetSuccess(true);
      setTimeout(() => router.push("/business/dashboard"), 2000);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await signIn(email, password);
    if (error) {
      setError("Incorrect email or password");
    } else {
      router.push("/business/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black"><span className="text-orange-500">Deal</span><span className="text-teal-600">eo</span></Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-medium">
              <button onClick={() => setLang("en")} className={`px-2.5 py-1 rounded-full transition-all ${lang === "en" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>EN</button>
              <button onClick={() => setLang("es")} className={`px-2.5 py-1 rounded-full transition-all ${lang === "es" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>ES</button>
            </div>
            <Link href="/business" className="text-sm text-gray-500 hover:text-gray-700">← {lang === "es" ? "Para negocios" : "For Businesses"}</Link>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full max-w-md">

          {resetMode ? (
            resetSuccess ? (
              <div className="text-center py-4">
                <div className="text-5xl mb-4">✅</div>
                <p className="font-bold text-gray-900 text-lg mb-1">Password updated!</p>
                <p className="text-gray-500 text-sm">Redirecting to your dashboard...</p>
              </div>
            ) : (
              <>
                <h1 className="text-xl font-black text-gray-900 mb-1">Set new password</h1>
                <p className="text-sm text-gray-500 mb-6">Enter your new password below</p>
                <form onSubmit={handleSetNewPassword} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      autoFocus
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                    <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
                  </div>
                  {error && (
                    <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-xl transition-colors text-sm"
                  >
                    {loading ? "Saving..." : "Save Password →"}
                  </button>
                </form>
              </>
            )
          ) : (
            <>
              <h1 className="text-xl font-black text-gray-900 mb-1">Welcome back</h1>
              <p className="text-sm text-gray-500 mb-6">Log in to manage your deals</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@restaurant.com"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                  <div className="flex justify-end mt-1">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={resetting}
                      className="text-xs text-orange-500 hover:text-orange-600 font-medium"
                    >
                      {resetting ? "Sending..." : "Forgot password?"}
                    </button>
                  </div>
                </div>

                {resetSent && (
                  <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
                    ✅ Email sent — check your inbox to reset your password
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  {loading ? "Please wait..." : "Log In →"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link href="/business/signup" className="text-orange-500 font-bold hover:text-orange-600">
                    Sign up free →
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
