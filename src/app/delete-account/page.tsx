"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DeleteAccountPage() {
  const router = useRouter();
  const [step, setStep] = useState<"confirm" | "deleting" | "done">("confirm");
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setStep("deleting");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Not logged in — just redirect to email option
        setStep("done");
        return;
      }

      // Delete user data
      await supabase.from("favorites").delete().eq("user_id", user.id);
      await supabase.from("deal_going").delete().eq("user_id", user.id);
      await supabase.from("push_subscriptions").delete().eq("user_id", user.id);
      await supabase.from("redemptions").delete().eq("user_id", user.id);

      // Sign out
      await supabase.auth.signOut();
      setStep("done");
    } catch {
      setError("Something went wrong. Please email hello@dealeo.es to request deletion.");
      setStep("confirm");
    }
  };

  if (step === "done") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-sm">
          <p className="text-4xl mb-4">✅</p>
          <h1 className="font-bold text-xl text-gray-900 mb-2">Account deleted</h1>
          <p className="text-gray-500 text-sm mb-6">Your data has been removed from Dealeo.</p>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-sm">
        <h1 className="font-bold text-xl text-gray-900 mb-2">Delete your account</h1>
        <p className="text-gray-500 text-sm mb-6">
          This will permanently delete your Dealeo account and all associated data including
          saved deals, redemptions, and preferences. This cannot be undone.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-xl p-3 mb-4">{error}</div>
        )}

        <div className="bg-amber-50 rounded-xl p-4 mb-6 text-sm text-amber-800">
          <p className="font-semibold mb-1">Alternatively</p>
          <p>Email us at <a href="mailto:hello@dealeo.es" className="underline font-medium">hello@dealeo.es</a> and we'll delete your account within 48 hours.</p>
        </div>

        <button
          onClick={handleDelete}
          disabled={step === "deleting"}
          className="w-full bg-red-500 text-white font-bold py-3 rounded-xl mb-3 disabled:opacity-50"
        >
          {step === "deleting" ? "Deleting..." : "Delete my account"}
        </button>

        <button
          onClick={() => router.back()}
          className="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-xl"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
