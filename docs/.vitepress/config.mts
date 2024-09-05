import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Eve Silfanus' amazing portfolio",
  description: "6.1040 Fall 2024",
  base: "/portfolio-eves/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Blogs", link: "/blogs" },
    ],

    sidebar: [
      {
        text: "Blogs",
        link: "/blogs",
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/61040-fa24" }],
  },
});
