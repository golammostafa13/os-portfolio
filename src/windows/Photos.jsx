import { WindowControls } from "#components";
import { photosLinks, gallery } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Photos = () => {
    const { openWindow } = useWindowStore();

    const openPhoto = (photo) => {
        openWindow("imgfile", {
            name: `Photo ${photo.id}`,
            imageUrl: photo.img,
        });
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="photos" />
                <h2>Gallery</h2>
                <span />
            </div>

            <div className="bg-white flex h-full">
                <div className="sidebar">
                    <h2>Photos</h2>
                    <ul>
                        {photosLinks.map((link) => (
                            <li key={link.id}>
                                <img src={link.icon} alt={link.title} className="w-4" />
                                <p>{link.title}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="gallery overflow-y-auto max-h-[80vh]">
                    <ul>
                        {gallery.map((photo) => (
                            <li
                                key={photo.id}
                                onClick={() => openPhoto(photo)}
                                className="cursor-pointer group"
                            >
                                <img
                                    src={photo.img}
                                    alt={`Gallery photo ${photo.id}`}
                                    className="group-hover:brightness-90 transition-all duration-200"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
