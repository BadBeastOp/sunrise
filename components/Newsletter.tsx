"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import AnimatedButton from "./AnimatedButton";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="py-[70px] md:py-[90px] lg:py-section">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex max-w-[700px] flex-col items-center text-center"
        >
          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            Join The Inner Circle
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/60 md:text-lg">
            Early access to new collections, private sales, and a short note
            from our design studio — once or twice a month, never more.
          </p>

          {submitted ? (
            <p className="mt-8 text-sm font-medium text-gold-deep">
              You&apos;re in. Look out for our next note in your inbox.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex w-full flex-col items-center gap-5"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address"
                className="w-full max-w-[500px] rounded-lux border border-border bg-white px-6 py-4 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none"
              />
              <AnimatedButton type="submit" variant="primary">
                Subscribe
              </AnimatedButton>
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
