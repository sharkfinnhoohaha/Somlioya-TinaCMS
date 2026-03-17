"use client";

import { useEffect } from "react";

interface InstagramHeroProps {
  embedUrl: string;
  title: string;
  subtitle?: string;
}

export default function InstagramHero({
  embedUrl,
  title,
  subtitle,
}: InstagramHeroProps) {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Process embeds when script loads
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[500px] overflow-hidden flex items-center justify-center">
      {/* Instagram Embed Background */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <div className="w-full max-w-[540px] px-4">
          <div
            dangerouslySetInnerHTML={{
              __html: `
                <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${embedUrl}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
                  <div style="padding:16px;"> 
                    <a href="${embedUrl}" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> 
                      <div style=" display: flex; flex-direction: row; align-items: center;"> 
                        <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> 
                        <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> 
                          <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> 
                          <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div>
                        </div>
                      </div>
                      <div style="padding: 19% 0;"></div> 
                      <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"></div>
                      <div style="padding-top: 8px;"> 
                        <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div>
                      </div>
                      <div style="padding: 12.5% 0;"></div> 
                    </a>
                  </div>
                </blockquote>
              `,
            }}
          />
        </div>
      </div>

      {/* Text Overlay - Made darker and larger for readability */}
      <div className="relative z-10 text-center px-6 pointer-events-none">
        <h2
          className="font-heading text-white font-semibold tracking-[0.08em] leading-tight drop-shadow-2xl"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 7rem)",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
            letterSpacing: "0.08em",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="font-heading text-white/95 italic font-normal tracking-wide mt-4 drop-shadow-xl"
            style={{
              fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

// Extend window type to include Instagram object
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
