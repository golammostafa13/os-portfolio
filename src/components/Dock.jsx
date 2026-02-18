import { Tooltip } from "react-tooltip"
import gsap from "gsap";
import React, { useRef } from 'react'
import { dockApps } from "#constants/index.js";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window.js";

const Dock = () => {
    const { windows, openWindow, closeWindow, focusWindow } = useWindowStore();
    const dockRef = useRef(null);

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = dock.querySelectorAll(".dock-icon");
        const spread = 20000;

        const animateIcons = (mouseX) => {
            const { left } = dock.getBoundingClientRect();

            icons.forEach(icon => {
                const { left: l, width: w } = icon.getBoundingClientRect();
                const center = l - left + w / 2;
                const distance = Math.abs(mouseX - center);
                const intensity = Math.exp(-(distance ** 2.5) / spread);

                gsap.to(icon, {
                    scale: 1 + intensity * 0.25,
                    y: -15 * intensity,
                    ease: "power1.out",
                    duration: 0.2,
                });
            });
        };

        const handleMouseMove = (e) => {
            const { left } = dock.getBoundingClientRect();
            const mouseX = e.clientX - left;
            animateIcons(mouseX);
        };

        const resetIcons = () => {
            icons.forEach(icon => {
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    ease: "power1.out",
                    duration: 0.3,
                });
            });
        };

        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        };
    }, []);

    const toogleApp = (app) => {
        if (!app.canOpen) return;
        const window = windows[app.id];
        if (!window) {
            console.error(`Window ${app.id} not found`);
            return;
        };

        if (window.isOpen) {
            closeWindow(app.id);
        } else {
            openWindow(app.id);
        }
    }

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map(app => (
                    <div key={app.id} className="relative flex justify-center">
                        <button
                            type='button'
                            className="dock-icon"
                            aria-label={app.name}
                            data-tooltip-id={"dock-tooltip"}
                            data-tooltip-content={app.name}
                            data-tooltip-delay-show={150}
                            disabled={!app.canOpen}
                            onClick={() => toogleApp(app)}>
                            <img
                                src={`images/${app.icon}`}
                                alt={app.name}
                                loading="lazy"
                                className={app.canOpen ? "" : "opacity-60"}
                            />
                        </button>
                    </div>
                ))}

                <Tooltip id={"dock-tooltip"} place={"top"} className={"tooltip"} />
            </div>
        </section>
    )
}
export default Dock
