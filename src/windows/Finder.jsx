import WindowControls from "#components/WindowControls";
import { locations } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Search } from "lucide-react";
import useLocationStore from "#store/location";
import clsx from "clsx";
import useWindowStore from "#store/window";

const Finder = () => {
    const { activeLocation, setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore()

    const openItem = (item) => {
        if (item.fileType == 'pdf') {
            return openWindow('resume')
        }

        if (item.kind == 'folder') {
            return setActiveLocation(item)
        }

        if (['fig', 'url'].includes(item.fileType) && item.href) {
            return window.open(item.href, '_blank')
        }

        openWindow(`${item.fileType}${item.kind}`, item);
    }

    const renderList = (items, title) => (
        <div>
            <h3>{title}</h3>
            <ul>
                {items.map((location) => (
                    <li key={location.id}
                        onClick={() => setActiveLocation(location)}
                        className={
                            clsx(location.id === activeLocation.id ? "active" : "not-active")
                        }
                    >
                        <img src={location.icon}
                            className="w-4"
                            alt={`location-${location.name}`}
                        />
                        <p className="text-sm font-medium truncate">{location.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )

    return (
        <>
            <div id="window-header">
                <WindowControls target="finder" />
                <Search className="icon" />

            </div>

            <div className="bg-white flex h-full">
                <div className="sidebar">
                    {renderList(Object.values(locations), 'Favorites')}
                    {renderList(locations.work.children, 'Work')}
                </div>
                <ul className="content">
                    {
                        activeLocation?.children.map((item) => (
                            <li key={item.id}
                                onClick={() => openItem(item)}
                                className={item.position}
                            >
                                <img src={item.icon}
                                    alt={`item-${item.name}`}
                                />
                                <p className="text-sm font-medium truncate">{item.name}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>


        </>
    )
}
const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow