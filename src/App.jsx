import { useContext, useState, useEffect } from "react";
import { RoleContext } from "./component/context/useRoleProvider.js";
import TranslationManager from "./component/TranslationManager.jsx";

const roles = [
    { key: "admin", label: "Admin" },
    { key: "public", label: "Public" },
];

const App = () => {
    const { role, setDataRoleHandler } = useContext(RoleContext);
    const [activeTab, setActiveTab] = useState(role || "public");

    useEffect(() => {
        setActiveTab(role || "public");
    }, [role]);

    const handleTabChange = (newRole) => {
        if (newRole !== activeTab) {
            setActiveTab(newRole);
            setDataRoleHandler(newRole);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 mt-5">
            <div role="tablist" className="flex gap-2 justify-center mb-4">
                {roles.map(({ key, label }) => (
                    <button
                        key={key}
                        role="tab"
                        className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 shadow-sm
              ${activeTab === key
                            ? "bg-primary text-white shadow-md scale-105"
                            : "bg-base-200 text-base-content hover:bg-base-300 hover:shadow"
                        }`}
                        onClick={() => handleTabChange(key)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="bg-base-100 border border-base-300 rounded-box p-6 min-h-[200px]">
                <TranslationManager />
            </div>
        </div>
    );
};

export default App;
