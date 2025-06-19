"use client";
import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Mail, MapPin, User, PencilLine, MessageSquare } from "lucide-react";
import Link from "next/link";

const ContactForm = React.memo(() => {
  const [state, handleSubmit] = useForm("manjqqbl");

  if (state.succeeded) {
    return (
      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center bg-background text-foreground px-4 py-20 transition-colors">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-500 my-7">
          🎉 Thank You!
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-lg">
          Your message has been sent successfully. I appreciate you taking the
          time to reach out — I'll get back to you as soon as possible.
        </p>
        <Link
          href="/"
          className="px-6 py-3 border-2 border-foreground text-foreground rounded-lg hover:bg-foreground hover:text-background transition duration-300 font-semibold"
        >
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <>
      <div className="absolute z-0 w-[90vw] max-w-[650px] h-[650px] bg-blue-600 blur-[80px] opacity-30 rounded-full pointer-events-none" />

      <section className="w-full px-4 sm:px-6 py-36 bg-background text-foreground transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
          {/* Info Section */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">Get In Touch</h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Feel free to reach out to me for any questions, project inquiries,
              or just to say hello. I'm always open to discussing new projects
              and opportunities.
            </p>

            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2">
                <MapPin className="text-primary" size={18} />
                <span className="text-muted-foreground text-sm">
                  Gandhinagar, Gujarat, India
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-primary" size={18} />
                <span className="text-muted-foreground text-sm">
                  punitr2006@gmail.com
                </span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 bg-[var(--card)] border border-border p-6 sm:p-8 rounded-2xl shadow-2xl transition-colors">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <InputField
                icon={<User size={18} />}
                id="name"
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />

              <InputField
                icon={<Mail size={18} />}
                id="email"
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-500 text-sm"
              />

              <InputField
                icon={<PencilLine size={18} />}
                id="subject"
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />

              <div className="relative">
                <div className="absolute left-3 top-3 text-muted-foreground">
                  <MessageSquare size={18} />
                </div>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full border-2 border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]  font-medium py-3 rounded-lg transition duration-300"
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <hr className="bg-border" />
    </>
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
    <div className="relative">
      <div className="absolute left-3 top-3 text-muted-foreground">{icon}</div>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
      />
    </div>
  );
}