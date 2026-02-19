import { WindowControls } from "#components";
import { locations } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { Trash2 } from "lucide-react";

const trashItems = locations.trash?.children ?? [];

const Trash = () => {
    const { openWindow } = useWindowStore();

    const openItem = (item) => {
        if (item.fileType === "img") {
            openWindow("imgfile", item);
        }
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="trash" />
                <h2>Trash</h2>
                <span className="trash-count">{trashItems.length} items</span>
            </div>

            {trashItems.length === 0 ? (
                <div className="trash-empty-state">
                    <Trash2 className="size-10 text-gray-300" />
                    <p>Trash is Empty</p>
                </div>
            ) : (
                <div className="trash-content">
                    <ul className="trash-grid">
                        {trashItems.map((item) => (
                            <li
                                key={item.id}
                                className="trash-item group"
                                onClick={() => openItem(item)}
                                title={item.name}
                            >
                                <div className="trash-thumb">
                                    <img src={item.imageUrl} alt={item.name} />
                                </div>
                                <p>{item.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

const TrashWindow = WindowWrapper(Trash, "trash");

export default TrashWindow;
