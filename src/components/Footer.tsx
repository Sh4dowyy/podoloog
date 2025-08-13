"use client";

import Link from "next/link";
import { IconArrowUp, IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";

export const Footer = () => {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {}
  };

  return (
    <footer className="mt-0 md:mt-12">
      {/* Background section with softened, blurred poppy field */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center filter saturate-50 brightness-95 contrast-90 blur-sm opacity-75 scale-105 pointer-events-none"
          style={{ backgroundImage: "url(/images/poppy-field.jpg)" }}
        />
        {/* Smooth color blend into site background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ivory-50/85 via-ivory-50/50 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
          {/* Overlay card */}
          <div className="rounded-xl border border-ivory-300 p-6" style={{ backgroundColor: '#FFF2E5' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Brand */}
              <div>
                <div className="leading-none">
                  <div className="text-xs tracking-wider text-sage-900 font-semibold uppercase">ALLA HÜVENEN</div>
                  <div className="text-[10px] tracking-widest text-sage-700 uppercase">PODOLOGY STUDIO</div>
                </div>
                <div className="mt-4 flex items-center gap-3 text-sage-700">
                  <Link href="https://www.instagram.com" target="_blank" className="hover:text-sage-900" aria-label="Instagram">
                    <IconBrandInstagram size={18} />
                  </Link>
                  <Link href="https://www.facebook.com/profile.php?id=100063781140588" target="_blank" className="hover:text-sage-900" aria-label="Facebook">
                    <IconBrandFacebook size={18} />
                  </Link>
                </div>
              </div>

              {/* Contacts */}
              <div>
                <div className="text-xs tracking-widest text-sage-900 font-medium uppercase mb-2">KONTAKT</div>
                <div className="text-sm text-sage-800">
                  <div>
                    Telefon: <a className="hover:underline" href="tel:+37258955153">+372 5895 5153</a>
                  </div>
                  <div>Aadress: Anne 44, Tartu</div>
                </div>
              </div>

              {/* Map */}
              <div>
                <div className="rounded-xl overflow-hidden h-24">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2092.8364910744383!2d26.722621276707756!3d58.37786727471819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eb36f0d4d4c5c5%3A0x4a51c5b1e1a4b7f8!2sAnne%2044%2C%20Tartu%2C%20Estonia!5e0!3m2!1sen!2s!4v1703123456789!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Map preview"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between text-xs text-sage-900 mt-3">
            <div>
              Designed by hyvnikin
            </div>
            <div>{year} © All rights reserved</div>
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="h-7 w-7 rounded-full bg-ivory-50/90 border border-ivory-300 flex items-center justify-center hover:bg-ivory-100"
            >
              <IconArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
