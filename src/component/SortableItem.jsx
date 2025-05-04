import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useContext, useState} from "react";
import EditeButton from "./EditeButton.jsx";
import {toast} from "react-toastify";
import FieldTranslate from "./FieldTranslate.jsx";
import {RoleContext} from "./context/useRoleProvider.js";
import {TrashIcon} from "@heroicons/react/24/solid";

const SortableItem = ({id, handleEditeTranslate, deleteKeywordHandler}) => {
    const [isEdite, setIsEdite] = useState(false);
    const [changeValue, setChangeValue] = useState("");

    const {translateLang, languageValidation, role} = useContext(RoleContext);
    const {message, regex} = languageValidation();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const changeValueHandler = (value) => setChangeValue(value);

    const editeHandler = () => setIsEdite((prev) => !prev);

    const clearInputHandler = () => setChangeValue("");

    const acceptHandler = () => {
        if (!regex.test(changeValue)) {
            toast.warn(message);
        } else {
            handleEditeTranslate(id.en, changeValue);
            clearInputHandler();
            editeHandler();
        }
    };

    const cancelHandler = () => {
        clearInputHandler();
        editeHandler();
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {... isEdite || role === 'admin' && listeners}
            className={`flex justify-between items-center bg-gray-100 rounded-lg shadow-sm p-3 my-2 ${role === 'admin' && 'cursor-grab'}`}
        >
      <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
        {role === "admin" && (
            <TrashIcon
                className="w-5 h-5 text-red-500 hover:text-red-700 transition cursor-pointer"
                onClick={() => deleteKeywordHandler(id.en)}
                title="حذف کلمه"
            />
        )}
          {id.en}
      </span>

            <div className="flex items-center gap-2">
                {role === "admin" && (
                    <EditeButton
                        isEdite={isEdite}
                        editeHandler={editeHandler}
                        acceptHandler={acceptHandler}
                        cancelHandler={cancelHandler}
                    />
                )}

                <span
                    className={`p-1 rounded min-w-24 flex justify-center items-center text-sm ${
                        id?.[translateLang] ? "bg-gray-200 text-gray-700" : "bg-red-200 text-red-700"
                    }`}
                >
                  <FieldTranslate
                      isEdite={isEdite}
                      acceptHandler={acceptHandler}
                      changeValueHandler={changeValueHandler}
                      id={id}
                  />
                </span>
            </div>
        </div>
    );
};

export default SortableItem;
