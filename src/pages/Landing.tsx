import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Landing() {
  const { user, loading, signInWithGoogle } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) return <Navigate to="/app" replace />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-primary" />
          <span className="font-heading text-xl text-foreground">Cal</span>
        </div>
        <Button
          size="sm"
          onClick={signInWithGoogle}
          className="bg-primary hover:bg-moss text-primary-foreground"
        >
          Sign in
        </Button>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg"
        >
          <h1 className="font-heading text-5xl sm:text-6xl text-foreground leading-tight mb-4">
            Plan your days,
            <br />
            <span className="italic text-primary">simply.</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-sm mx-auto leading-relaxed">
            A minimal calendar to track events and stay organized — nothing more, nothing less.
          </p>
          <Button
            onClick={signInWithGoogle}
            size="lg"
            className="bg-primary hover:bg-moss text-primary-foreground gap-2 text-base px-8"
          >
            Get started with Google
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-muted-foreground">
        Simple. Calm. Yours.
      </footer>
    </div>
  );
}
