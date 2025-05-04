import React, { useContext } from 'react';
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { RoleContext } from "./context/useRoleProvider.js";

const placeholders = {
    fa: 'ترجمه را وارد کنید',
    de: 'Übersetzung eingeben',
    es: 'Introduce la traducción',
    en: 'Enter translation',
};

const FieldTranslate = ({ isEdite, acceptHandler, changeValueHandler, id }) => {
    const { translateLang } = useContext(RoleContext);
    const value = id?.[translateLang];

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') acceptHandler();
    };

    return (
        <div className="flex items-center min-h-[1.5rem]">
            {isEdite ? (
                <input
                    type="text"
                    autoFocus
                    defaultValue={value}
                    placeholder={placeholders[translateLang] || 'Enter translation'}
                    onChange={(e) => changeValueHandler(e.target.value.trim())}
                    onKeyDown={handleKeyDown}
                    className="input input-sm bg-gray-100 text-sm px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-transparent transition-all duration-200"
                />
            ) : value ? (
                <span className="text-base text-gray-800">{value}</span>
            ) : (
                <EllipsisHorizontalIcon className="w-6 h-6 text-white" title="ترجمه‌ای موجود نیست" />
            )}
        </div>
    );
};

export default FieldTranslate;
