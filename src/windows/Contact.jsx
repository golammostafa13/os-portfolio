import { WindowControls } from "#components";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader } from "lucide-react";

// ─── EmailJS config ──────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Create a service (Gmail) → copy the Service ID
// 3. Create an email template → copy the Template ID
//    Template variables used: {{from_name}}, {{from_email}}, {{message}}
// 4. Go to Account → copy your Public Key
// 5. Replace the three placeholders below with your real values
const EMAILJS_SERVICE_ID = "service_hk4qr1p";
const EMAILJS_TEMPLATE_ID = "template_ikjupo8";
const EMAILJS_PUBLIC_KEY = "NRP5_OEaVXUSW1vjD";
// ─────────────────────────────────────────────────────────────────

const INITIAL = { from_name: "", from_email: "", message: "" };

const Contact = () => {
    const formRef = useRef(null);
    const [form, setForm] = useState(INITIAL);
    const [status, setStatus] = useState("idle"); // idle | sending | success | error

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === "sending") return;
        setStatus("sending");

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                { publicKey: EMAILJS_PUBLIC_KEY }
            );
            setStatus("success");
            setForm(INITIAL);
            setTimeout(() => setStatus("idle"), 4000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact Me</h2>
                <span />
            </div>

            <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
                {/* Avatar + intro */}
                <div className="flex items-center gap-4">
                    <img
                        src="https://avatars.githubusercontent.com/u/57527888?v=4"
                        alt="mostafa"
                        className="size-14 rounded-full object-cover ring-2 ring-gray-200"
                    />
                    <div>
                        <h3 className="text-base font-semibold text-gray-800">Let's Connect</h3>
                        <p className="text-xs text-gray-500">Got an idea, a bug to squash, or just want to talk tech? I'm in.</p>
                    </div>
                </div>

                {/* Social links */}
                <ul>
                    {socials.map((social) => (
                        <li key={social.id} style={{ backgroundColor: social.bg }}>
                            <a href={social.link} target="_blank" rel="noopener noreferrer" title={social.text}>
                                <img src={social.icon} alt={social.text} className="size-5" />
                                <p>{social.text}</p>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400 font-medium">or send a message</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Mail form */}
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
                    <div className="contact-field">
                        <label>Name</label>
                        <input
                            id="contact-name"
                            type="text"
                            name="from_name"
                            placeholder="Your name"
                            value={form.from_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact-field">
                        <label>Email</label>
                        <input
                            id="contact-email"
                            type="email"
                            name="from_email"
                            placeholder="your@email.com"
                            value={form.from_email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact-field">
                        <label>Message</label>
                        <textarea
                            id="contact-message"
                            name="message"
                            rows={4}
                            placeholder="What's on your mind?"
                            value={form.message}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Status feedback */}
                    {status === "success" && (
                        <div className="contact-status success">
                            <CheckCircle className="size-4" />
                            <span>Message sent! I'll get back to you soon.</span>
                        </div>
                    )}
                    {status === "error" && (
                        <div className="contact-status error">
                            <AlertCircle className="size-4" />
                            <span>Something went wrong. Please try again.</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="contact-submit"
                    >
                        {status === "sending" ? (
                            <>
                                <Loader className="size-4 animate-spin" />
                                <span>Sending…</span>
                            </>
                        ) : (
                            <>
                                <Send className="size-4" />
                                <span>Send Message</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </>
    );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
