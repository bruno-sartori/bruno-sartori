import { useEffect } from "react";
import Head from "next/head";
import "../app/globals.css";
import "@fontsource/geist-sans";
import "@fontsource/geist-mono";

interface Props {
  title: string;
  description: string;
  image?: string;
  url: string;
  site: string;
  generator?: string;
}

const CustomHead = ({ title, description, image = "/blog-placeholder-1.jpg", url, site, generator }: Props) => {
  const canonicalURL = new URL(url, site).toString();

  useEffect(() => {
    function init() {
      preloadTheme();
      onScroll();
      animate();
      updateThemeButtons();
      addCopyCodeButtons();
      setGiscusTheme();

      const backToTop = document.getElementById("back-to-top");
      backToTop?.addEventListener("click", scrollToTop);

      const backToPrev = document.getElementById("back-to-prev");
      backToPrev?.addEventListener("click", () => window.history.back());

      const lightThemeButton = document.getElementById("light-theme-button");
      lightThemeButton?.addEventListener("click", () => {
        localStorage.setItem("theme", "light");
        toggleTheme(false);
        updateThemeButtons();
      });

      const darkThemeButton = document.getElementById("dark-theme-button");
      darkThemeButton?.addEventListener("click", () => {
        localStorage.setItem("theme", "dark");
        toggleTheme(true);
        updateThemeButtons();
      });

      const systemThemeButton = document.getElementById("system-theme-button");
      systemThemeButton?.addEventListener("click", () => {
        localStorage.setItem("theme", "system");
        toggleTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
        updateThemeButtons();
      });

      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => {
          if (localStorage.theme === "system") {
            toggleTheme(event.matches);
          }
        });

      document.addEventListener("scroll", onScroll);
    }

    function updateThemeButtons() {
      const theme = localStorage.getItem("theme");
      const lightThemeButton = document.getElementById("light-theme-button");
      const darkThemeButton = document.getElementById("dark-theme-button");
      const systemThemeButton = document.getElementById("system-theme-button");

      function removeActiveButtonTheme(button: HTMLElement | null) {
        button?.classList.remove("bg-black/5");
        button?.classList.remove("dark:bg-white/5");
      }

      function addActiveButtonTheme(button: HTMLElement | null) {
        button?.classList.add("bg-black/5");
        button?.classList.add("dark:bg-white/5");
      }

      removeActiveButtonTheme(lightThemeButton);
      removeActiveButtonTheme(darkThemeButton);
      removeActiveButtonTheme(systemThemeButton);

      if (theme === "light") {
        addActiveButtonTheme(lightThemeButton);
      } else if (theme === "dark") {
        addActiveButtonTheme(darkThemeButton);
      } else {
        addActiveButtonTheme(systemThemeButton);
      }
    }

    function animate() {
      const animateElements = document.querySelectorAll<HTMLElement>(".animate");

      animateElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("show");
        }, index * 100);
      });
    }

    function onScroll() {
      if (window.scrollY > 0) {
        document.documentElement.classList.add("scrolled");
      } else {
        document.documentElement.classList.remove("scrolled");
      }
    }

    function scrollToTop(event: MouseEvent) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    function toggleTheme(dark: boolean) {
      const css = document.createElement("style");

      css.appendChild(
        document.createTextNode(
          `* {
             -webkit-transition: none !important;
             -moz-transition: none !important;
             -o-transition: none !important;
             -ms-transition: none !important;
             transition: none !important;
          }
        `
        )
      );

      document.head.appendChild(css);

      if (dark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      window.getComputedStyle(css).opacity;
      document.head.removeChild(css);

      setGiscusTheme();
    }

    function preloadTheme() {
      const userTheme: 'light' | 'dark' = 'dark'; // localStorage.theme;

      if (userTheme === "light" || userTheme === "dark") {
        toggleTheme(userTheme === "dark");
      } else {
        toggleTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
      }
    }

    function addCopyCodeButtons() {
      let copyButtonLabel = "📋";
      let codeBlocks = Array.from(document.querySelectorAll<HTMLElement>("pre"));

      async function copyCode(codeBlock: HTMLElement, copyButton: HTMLElement) {
        const codeText = codeBlock.innerText;
        const buttonText = copyButton.innerText;
        const textToCopy = codeText.replace(buttonText, "");

        await navigator.clipboard.writeText(textToCopy);
        copyButton.innerText = "✅";

        setTimeout(() => {
          copyButton.innerText = copyButtonLabel;
        }, 2000);
      }

      for (let codeBlock of codeBlocks) {
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";

        const copyButton = document.createElement("button");
        copyButton.innerText = copyButtonLabel;
        copyButton.classList.add("copy-code");

        codeBlock.setAttribute("tabindex", "0");
        codeBlock.appendChild(copyButton);

        codeBlock.parentNode?.insertBefore(wrapper, codeBlock);
        wrapper.appendChild(codeBlock);

        copyButton?.addEventListener("click", async () => {
          await copyCode(codeBlock, copyButton);
        });
      }
    }

    const setGiscusTheme = () => {
      const giscus = document.querySelector<HTMLIFrameElement>(".giscus-frame");

      const isDark = document.documentElement.classList.contains("dark");

      if (giscus) {
        const url = new URL(giscus.src);
        url.searchParams.set("theme", isDark ? "dark" : "light");
        giscus.src = url.toString();
      }
    };

    init();
    document.addEventListener("DOMContentLoaded", () => init());
    preloadTheme();
  }, []);

  return (
    <Head>
      {/* Global Metadata */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔬</text></svg>"
      />
      {generator && <meta name="generator" content={generator} />}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalURL} />

      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* PageFind */}
      {/*
        <link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
        <script src="/pagefind/pagefind-ui.js" />
      */}
    </Head>
  );
};

export default CustomHead;
