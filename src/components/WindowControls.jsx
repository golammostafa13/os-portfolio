import useWindowStore from "#store/window";

const WindowControls = ({ target }) => {
    const { closeWindow } = useWindowStore();
    const handleClose = () => closeWindow(target);
    const handleMinimize = () => {
        
    }
    const handleMaximize = () => {
        
    }
    return (
        <div id="window-controls">
            <div className="close" onClick={handleClose}></div>
            <div className="minimize"></div>
            <div className="maximize"></div>
        </div>
    )
}

export default WindowControls