"use client";
import React, { useState } from "react";
import { Mail, MapPin, User, PencilLine, MessageSquare, CheckCircle, Github, Linkedin, Twitter, Send } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const ContactForm = React.memo(() => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");
      setIsSuccess(true);
    } catch (err) {
      setErrorMsg("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center bg-[var(--background)] text-[var(--foreground)] px-4 overflow-hidden">
        {/* Ambient Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--primary)] rounded-full blur-[150px] opacity-20"></div>
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{ backgroundImage: "radial-gradient(var(--foreground) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 bg-[var(--card)]/80 md:bg-[var(--card)]/40 backdrop-blur-none md:backdrop-blur-xl border border-[var(--border)] p-10 md:p-16 rounded-3xl shadow-2xl max-w-xl w-full flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="text-[var(--primary)]" size={40} />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight">
            Message <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">Sent!</span>
          </h2>
          <p className="text-[var(--muted-foreground)] text-base sm:text-lg mb-10 leading-relaxed">
            Thank you for reaching out. I&apos;ve received your message and will get back to you as soon as possible.
          </p>
          <Link
            href="/"
            className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full hover:scale-105 transition-transform duration-300 font-bold shadow-lg"
          >
            Return to Home
          </Link>
        </motion.div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative w-full px-4 sm:px-6 py-32 bg-[var(--background)] text-[var(--foreground)] overflow-hidden min-h-screen flex items-center">
      {/* Ambient Background Effects - Hidden on mobile to prevent lag */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-[var(--primary)] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-[var(--accent)] rounded-full blur-[120px] opacity-10"></div>
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{ backgroundImage: "radial-gradient(var(--foreground) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-black text-5xl md:text-7xl tracking-tight mb-6"
          >
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">Touch</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] mx-auto rounded-full opacity-80"
          ></motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row gap-10"
        >
          {/* Info Section (Left) */}
          <div className="md:w-5/12 space-y-6">
            <motion.div variants={itemVariants} className="bg-[var(--card)]/80 md:bg-[var(--card)]/40 backdrop-blur-none md:backdrop-blur-xl border border-[var(--border)] p-8 rounded-3xl hover:border-[var(--primary)]/50 transition-colors duration-500 will-change-transform">
              <h3 className="text-2xl font-bold mb-4">Let&apos;s connect</h3>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
                I&apos;m currently looking for new opportunities, and my inbox is always open. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--primary)]/10 text-[var(--primary)] rounded-xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <p className="text-[var(--muted-foreground)]">punitr2006@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--primary)]/10 text-[var(--primary)] rounded-xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Location</h4>
                    <p className="text-[var(--muted-foreground)]">Gandhinagar, Gujarat, India</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 will-change-transform">
              <a href="https://github.com/punit1703" target="_blank" rel="noopener noreferrer" className="p-4 bg-[var(--card)]/80 md:bg-[var(--card)]/40 backdrop-blur-none md:backdrop-blur-xl border border-[var(--border)] rounded-2xl text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                <Github size={24} />
              </a>
              <a href="#" className="p-4 bg-[var(--card)]/80 md:bg-[var(--card)]/40 backdrop-blur-none md:backdrop-blur-xl border border-[var(--border)] rounded-2xl text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                <Linkedin size={24} />
              </a>
              <a href="#" className="p-4 bg-[var(--card)]/80 md:bg-[var(--card)]/40 backdrop-blur-none md:backdrop-blur-xl border border-[var(--border)] rounded-2xl text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                <Twitter size={24} />
              </a>
            </motion.div>
          </div>

          {/* Form Section (Right) */}
          <motion.div variants={itemVariants} className="md:w-7/12 will-change-transform">
            <div className="bg-[var(--card)]/80 md:bg-[var(--card)]/40 backdrop-blur-none md:backdrop-blur-xl border border-[var(--border)] p-8 sm:p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:border-[var(--primary)]/30 transition-all duration-500">
              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  icon={<User size={18} />}
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                />

                <div>
                  <InputField
                    icon={<Mail size={18} />}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                  />
                </div>

                <InputField
                  icon={<PencilLine size={18} />}
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                />

                <div className="relative group">
                  <div className="absolute left-4 top-4 text-[var(--muted-foreground)] group-focus-within:text-[var(--primary)] transition-colors">
                    <MessageSquare size={18} />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--muted)]/50 text-[var(--foreground)] border border-[var(--border)] focus:bg-[var(--background)] focus:outline-none focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/50 transition-all resize-none"
                  />
                </div>

                {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex items-center justify-center gap-2 bg-[var(--foreground)] text-[var(--background)] font-bold py-4 rounded-xl transition duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:hover:scale-100 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;

interface InputFieldProps {
  icon: React.ReactNode;
  id: string;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
}

function InputField({
  icon,
  id,
  type,
  name,
  placeholder,
  required = false,
}: InputFieldProps) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] group-focus-within:text-[var(--primary)] transition-colors">{icon}</div>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--muted)]/50 text-[var(--foreground)] border border-[var(--border)] focus:bg-[var(--background)] focus:outline-none focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/50 transition-all"
      />
    </div>
  );
}