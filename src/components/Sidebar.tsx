"use client";
import { navlinks } from "@/constants/navlinks";
import { Navlink } from "@/types/navlink";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "./Heading";
import { socials } from "@/constants/socials";
import { Badge } from "./Badge";
import { AnimatePresence, motion } from "framer-motion";
import { IconLayoutSidebarRightCollapse, IconSettings, IconLogin, IconDashboard, IconUser, IconFileText } from "@tabler/icons-react";
import { useAuth } from "./auth/AuthProvider";
import { useLanguage } from "./i18n/LanguageProvider";
import { LanguageSwitcher } from "./i18n/LanguageSwitcher";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobileDevice(mobile);
      if (!mobile) {
        setOpen(true); // Always open on desktop
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <>
      {/* Backdrop overlay for mobile */}
      <AnimatePresence>
        {open && isMobileDevice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-[90] lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(open || !isMobileDevice) && (
          <motion.div
            initial={isMobileDevice ? { x: -200 } : false}
            animate={{ x: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
            exit={isMobileDevice ? { x: -200 } : {}}
            className="px-6 z-[100] py-10 bg-neutral-100 w-[16rem] fixed lg:relative h-screen left-0 flex flex-col justify-between"
          >
            <div className="flex-1 overflow-auto">
              <SidebarHeader />
              <div className="pt-4 pb-2">
                <LanguageSwitcher />
              </div>
              <Navigation setOpen={setOpen} isMobileDevice={isMobileDevice} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile toggle button */}
      {isMobileDevice && (
        <button
          className="fixed bottom-4 right-4 h-12 w-12 bg-white border border-neutral-200 rounded-full shadow-lg flex items-center justify-center z-[110] hover:shadow-xl transition-shadow"
          onClick={() => setOpen(!open)}
        >
          <IconLayoutSidebarRightCollapse 
            className={`h-5 w-5 text-secondary transition-transform ${open ? 'rotate-180' : ''}`} 
          />
        </button>
      )}
    </>
  );
};

export const Navigation = ({
  setOpen,
  isMobileDevice,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileDevice: boolean;
}) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const { t, currentLanguage } = useLanguage();

  const isActive = (href: string) => pathname === href;

  // Navigation links with translations
  const translatedNavlinks = [
    {
      href: "/",
      label: t('home'),
      icon: navlinks[0].icon,
    },
    {
      href: "/biomechanics",
      label: t('biomechanics'),
      icon: navlinks[2].icon,
    },
    {
      href: "/services",
      label: t('services'),
      icon: navlinks[3].icon,
    },
    {
      href: "/products",
      label: currentLanguage === 'et' ? 'Produktid' : 'Продукция',
      icon: navlinks[1].icon,
    },
    {
      href: "/blog",
      label: currentLanguage === 'et' ? 'Blogi' : 'Блог',
      icon: IconFileText,
    },
    {
      href: "/reviews",
      label: t('reviews'),
      icon: navlinks[4].icon,
    },
    {
      href: "/credentials",
      label: t('credentials'),
      icon: navlinks[5].icon,
    },
  ];

  // Admin navigation items (only shown to authenticated users)
  const adminNavlinks = [
    {
      href: "/admin",
      label: t('admin'),
      icon: IconDashboard,
    },
  ];

  return (
    <div className="flex flex-col space-y-1 my-10 relative z-[100]">
      {translatedNavlinks.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => isMobileDevice && setOpen(false)}
          className={twMerge(
            "text-secondary hover:text-primary transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm",
            isActive(link.href) && "bg-white shadow-lg text-primary"
          )}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-sky-500"
            )}
          />
          <span className="truncate">{link.label}</span>
        </Link>
      ))}

      {/* Admin Section - Only visible to authenticated users */}
      {user && (
        <>
          <Heading as="p" className="text-sm md:text-sm lg:text-sm pt-6 px-2">
            {t('admin')}
          </Heading>
          {adminNavlinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => isMobileDevice && setOpen(false)}
              className={twMerge(
                "text-secondary hover:text-primary transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm",
                isActive(link.href) && "bg-white shadow-lg text-primary"
              )}
            >
              <link.icon
                className={twMerge(
                  "h-4 w-4 flex-shrink-0",
                  isActive(link.href) && "text-sky-500"
                )}
              />
              <span className="truncate">{link.label}</span>
            </Link>
          ))}
        </>
      )}

      {/* Authentication Link */}
      {!user && (
        <>
          <Heading as="p" className="text-sm md:text-sm lg:text-sm pt-6 px-2">
            {t('account')}
          </Heading>
          <Link
            href="/login"
            onClick={() => isMobileDevice && setOpen(false)}
            className={twMerge(
              "text-secondary hover:text-primary transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm",
              isActive("/login") && "bg-white shadow-lg text-primary"
            )}
          >
            <IconLogin
              className={twMerge(
                "h-4 w-4 flex-shrink-0",
                isActive("/login") && "text-sky-500"
              )}
            />
            <span className="truncate">{t('login')}</span>
          </Link>
        </>
      )}

      <Heading as="p" className="text-sm md:text-sm lg:text-sm pt-10 px-2">
        {t('socials')}
      </Heading>
      {socials.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          className={twMerge(
            "text-secondary hover:text-primary transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm"
          )}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-sky-500"
            )}
          />
          <span className="truncate">{link.label}</span>
        </Link>
      ))}
    </div>
  );
};

const SidebarHeader = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex space-x-2">
      <Image
        src=""
        alt="Аватар"
        height="40"
        width="40"
        className="object-cover object-top rounded-full flex-shrink-0"
      />
      <div className="flex text-sm flex-col">
        <p className="font-bold text-primary">{t('name')}</p>
        <p className="font-light text-secondary">{t('profession')}</p>
      </div>
    </div>
  );
};
