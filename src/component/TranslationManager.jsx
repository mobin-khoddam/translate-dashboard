import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
    TouchSensor,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {ToastContainer} from "react-toastify";
import AddKeywordModal from "./AddKeywordModal.jsx";
import SortableItem from "./SortableItem.jsx";
import {RoleContext} from "./context/useRoleProvider.js";

const TranslationManager = () => {
    const [currentLang, setCurrentLang] = useState('');
    const [items, setItems] = useState([
            {en: 'hello', fa: 'سلام', de: 'Hallo', es: 'Hola'},
            {en: 'world', fa: 'جهان', de: '', es: ''},
            {en: 'apple', fa: 'سیب', de: 'Apfel', es: 'Manzana'},
            {en: 'book', fa: 'کتاب', de: '', es: 'Libro'},
            {en: 'key', fa: '', de: '', es: 'Llave'},
            {en: 'head', fa: 'سر', de: 'Kopf', es: ''},
            {en: 'green', fa: 'سبز', de: '', es: ''},
            {en: 'food', fa: '', de: 'Essen', es: 'Comida'}
        ]
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {distance: 5}}),
        useSensor(TouchSensor, {activationConstraint: {delay: 250, tolerance: 5}})
    );

    const {role, setTranslateLangHandler, translateLang, languageValidation} = useContext(RoleContext);
    const hasMounted = useRef(false);

    const handleEditeTranslate = (keyName, editValue) => {
        setItems(prev =>
            prev.map(item =>
                item.en === keyName
                    ? {...item, [translateLang]: editValue}
                    : item
            )
        );
    };

    const addNewKeyword = (newKeyword) => {
        setItems(prev => [newKeyword, ...prev]);
    };

    const handleDragEnd = ({active, over}) => {
        if (active?.id !== over?.id) {
            const oldIndex = items.findIndex(i => i.en === active.id.en);
            const newIndex = items.findIndex(i => i.en === over.id.en);
            setItems(prev => arrayMove(prev, oldIndex, newIndex));
        }
    };

    const deleteKeywordHandler = (keyId) => {
        setItems(prev => prev.filter(item => item.en !== keyId));
    };

    useLayoutEffect(() => {
        const saved = localStorage.getItem('list');
        if (saved) {
            setItems(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        if (hasMounted.current) {
            localStorage.setItem('list', JSON.stringify(items));
        } else {
            hasMounted.current = true;
        }
    }, [items]);

    useLayoutEffect(() => {
        const {language} = languageValidation();
        setCurrentLang(language);
    }, [languageValidation, translateLang]);

    return (
        <div className='max-w-2xl' style={{margin: "50px auto"}}>
            <input
                defaultValue={currentLang}
                onChange={(e) => setTranslateLangHandler(e.target.value)}
                type="text"
                className="input w-full"
                placeholder="Which translate language do you use"
                list="languages"
            />
            <datalist id="languages">
                <option value="Farsi"></option>
                <option value="German"></option>
                <option value="Spanish"></option>
            </datalist>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    {items.map((item) => (
                        <SortableItem
                            key={item.en}
                            id={item}
                            handleEditeTranslate={handleEditeTranslate}
                            deleteKeywordHandler={deleteKeywordHandler}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            {role === 'admin' && <AddKeywordModal items={items} addNewKeyword={addNewKeyword}/>}

            <ToastContainer
                position="top-right"
                toastOptions={{
                    style: {pointerEvents: 'none'},
                }}
            />
        </div>
    );
};

export default TranslationManager;
