import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Send, MessageCircle, Sparkles, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

export function Contact() {
  const [formData, setFormData] = useState({
    form_name: "",
    form_email: "",
    form_message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Initialize EmailJS on component mount
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "suZ1E4Somq924V19T";
    console.log("Initializing EmailJS with public key:", publicKey);
    emailjs.init(publicKey);
  }, []);

  const validateForm = (): boolean => {
    if (!formData.form_name.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (!formData.form_email.trim() || !formData.form_email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }
    if (!formData.form_message.trim()) {
      setError("Please enter a message");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_je5x9ap",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_k1njq1q",
        {
          from_name: formData.form_name,
          from_email: formData.form_email,
          message: formData.form_message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "suZ1E4Somq924V19T"
      );

      console.log("Email sent successfully:", response);
      setSubmitted(true);
      setFormData({ form_name: "", form_email: "", form_message: "" });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      const errorMessage = error?.text || error?.message || "Failed to send message. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-20 min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-12 md:pt-20 pb-12 sm:pb-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-4 sm:mb-6"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-2xl">
              <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
            </div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-5">
            <span className="text-accent bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground max-w-xl mx-auto">
            Have questions or feedback about Nodify? We would love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-border relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />

              <div className="relative z-10 space-y-5 sm:space-y-6">
                {/* NAME */}
                <div>
                  <label className="block mb-2 sm:mb-3 text-foreground font-semibold flex items-center gap-2">
                    Name
                    {focusedField === "name" && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-primary"
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.span>
                    )}
                  </label>

                  <motion.input
                    type="text"
                    name="form_name"
                    value={formData.form_name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-2 border-border focus:border-primary bg-popover text-foreground transition-all shadow-lg"
                    placeholder="Name"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block mb-2 sm:mb-3 text-foreground font-semibold flex items-center gap-2">
                    Email
                    {focusedField === "email" && (
                      <motion.span className="text-primary">
                        <Sparkles className="w-4 h-4" />
                      </motion.span>
                    )}
                  </label>

                  <motion.input
                    type="email"
                    name="form_email"
                    value={formData.form_email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-2 border-border focus:border-primary bg-popover text-foreground transition-all shadow-lg"
                    placeholder="email@example.com"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block mb-2 sm:mb-3 text-foreground font-semibold flex items-center gap-2">
                    Message
                    {focusedField === "message" && (
                      <motion.span className="text-primary">
                        <Sparkles className="w-4 h-4" />
                      </motion.span>
                    )}
                  </label>

                  <motion.textarea
                    rows={6}
                    name="form_message"
                    value={formData.form_message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-2 border-border focus:border-primary bg-popover text-foreground transition-all shadow-lg resize-none"
                    placeholder="Type your message..."
                  />
                </div>

                {/* BUTTON */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-2xl flex items-center justify-center gap-3 font-bold text-base sm:text-lg shadow-2xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Send size={20} />
                    {loading ? "Sending..." : "Send Message"}
                  </span>
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                {/* ERROR */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-5 sm:p-6 bg-destructive/10 border-2 border-destructive rounded-2xl flex items-center gap-4 shadow-xl"
                    >
                      <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-destructive flex-shrink-0" />
                      <div className="text-sm sm:text-base text-destructive font-medium">{error}</div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SUCCESS */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-5 sm:p-6 bg-success/10 border-2 border-success rounded-2xl flex items-center gap-4 shadow-xl"
                    >
                      <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-success flex-shrink-0" />
                      <div>
                        <div className="font-bold text-success text-base sm:text-lg">Message Sent!</div>
                        <div className="text-sm text-muted-foreground">
                          We'll get back to you soon.
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 flex flex-col gap-4 sm:gap-6"
          >
            {[
              "https://instagram.com/jorge_amadeo_",
              "https://instagram.com/solraq._",
              "https://instagram.com/gradeyy23",
            ].map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-card/80 backdrop-blur-xl rounded-3xl p-4 sm:p-5 shadow-xl border border-border relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10 flex flex-col sm:flex-row md:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">
                        {i === 0 ? "Jorge Amadeo" : i === 1 ? "Carlos Keiran" : "Gradey Kearn"}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground break-words">
                        {i === 0 ? "@jorge_amadeo_" : i === 1 ? "@solraq._" : "@gradeyy23"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}