import { CheckIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";

const iconBaseStyle = "w-7 h-7 p-1 rounded-md cursor-pointer transition-all duration-200 hover:scale-105 shadow-sm";
const EditeButton = ({ isEdite, editeHandler, acceptHandler, cancelHandler }) => {
    return (
        <div className="flex items-center gap-2">
            {!isEdite ? (
                <PencilIcon
                    className={`${iconBaseStyle} bg-gray-300 hover:bg-gray-400`}
                    onClick={editeHandler}
                    title="ویرایش"
                />
            ) : (
                <>
                    <CheckIcon
                        className={`${iconBaseStyle} bg-green-200 hover:bg-green-300`}
                        onClick={acceptHandler}
                        title="تأیید"
                    />
                    <XMarkIcon
                        className={`${iconBaseStyle} bg-red-200 hover:bg-red-300`}
                        onClick={cancelHandler}
                        title="لغو"
                    />
                </>
            )}
        </div>
    );
};

export default EditeButton;
