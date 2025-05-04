import {useLayoutEffect, useState} from "react";
import {RoleContext} from "./useRoleProvider.js";

const RoleProvider = ({children}) => {
    const [role, setRole] = useState(null);
    const [translateLang, setTranslateLang] = useState("Farsi");
    useLayoutEffect(() => {
        const lang = localStorage.getItem("translateLang");
        if (lang) {
            setTranslateLang(lang);
        } else {
            localStorage.setItem("translateLang", "fa")
        }
    }, [])

    const setDataRoleHandler = (role) => {
        setRole(role)
    }

    const setTranslateLangHandler = (lang) => {
        let currentLang;
        switch (lang) {
            case 'Spanish':
                currentLang = 'es';
                break;
            case 'German':
                currentLang = 'de';
                break;
            case 'Farsi':
                currentLang = 'fa';
                break;
            default:
                currentLang = 'fa';
        }

        if (lang.trim()) {
            setTranslateLang(currentLang)
            localStorage.setItem("translateLang", currentLang);
        }
    }

    const languageValidation = () => {
        switch (translateLang) {
            case "fa":
                return {
                    language: "Farsi",
                    regex: /^[آ-یءئۀ\s]+$|^$/,
                    message: 'Only Persian letters and spaces are allowed, or leave it empty.'
                };
            case "de":
                return {
                    language: "Germany",
                    regex: /^[A-Za-zäöüÄÖÜß\s]+$|^$/,
                    message: 'Only German letters, special characters, and spaces are allowed, or leave it empty.'
                };
            case "es":
                return {
                    language: "Spanish",
                    regex: /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$|^$/,
                    message: 'Only Spanish letters, special characters, and spaces are allowed, or leave it empty.'
                };
            default:
                return {
                    language: "Farsi",
                    regex: /^[A-Za-z\s]+$|^$/,
                    message: 'Only English letters and spaces are allowed, or leave it empty.'
                };
        }

    };

    return (
        <RoleContext.Provider
            value={{role, setDataRoleHandler, translateLang, setTranslateLangHandler, languageValidation}}>
            {children}
        </RoleContext.Provider>
    )
}
export default RoleProvider
