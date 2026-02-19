import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import useWindowStore from "#store/window";

const Text = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile.data;

    if (!data) return null;

    const { name, image, subtitle, description = [] } = data;

    return (
        <>
            <div id="window-header">
                <WindowControls target="txtfile" />
                <h2>{name}</h2>
                <span />
            </div>

            <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
                {image && (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-auto object-cover object-center rounded-lg"
                    />
                )}

                {subtitle && (
                    <p className="text-base font-semibold text-gray-700">{subtitle}</p>
                )}

                <div className="space-y-3">
                    {description.map((paragraph, index) => (
                        <p key={index} className="text-sm text-gray-600 leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </>
    );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
