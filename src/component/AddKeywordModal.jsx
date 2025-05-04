import {PlusIcon, XMarkIcon} from "@heroicons/react/24/outline/index.js";
import {useRef} from "react";
import {useForm} from "react-hook-form";

const AddKeywordModal = ({addNewKeyword, items}) => {
    const ref = useRef(null);

    const {register, setError, setValue, unregister, handleSubmit, formState: {errors}} = useForm();

    const clearInputHandler = () => {
        setValue("en", "");
        setValue("fa", "");
        setValue("de", "");
        setValue("es", "");
        unregister("en");
        unregister("fa");
        unregister("de");
        unregister("es");
    }

    const submitHandler = (formData) => {
        const isInList = items.some((item) => item.en.trim() === formData.en.trim())
        if (isInList) {
            setError('en', {
                type: "manual",
                message: 'An item with this key already exists in the list.'
            })
        } else {
            ref.current?.close()
            addNewKeyword(formData)
            clearInputHandler()
        }
    }

    return (
        <>
            <button
                onClick={() => ref.current?.showModal()}
                className='bg-blue-600 text-white flex items-center justify-center gap-1 p-3 w-full rounded font-semibold'>
                <PlusIcon className="w-6 h-6"/>
                Add Keyword
            </button>
            <dialog ref={ref} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg flex justify-between items-center mb-5">
                        Add your new keyword
                        <XMarkIcon onClick={() => {
                            ref.current?.close();
                            clearInputHandler()
                        }}
                                   className="w-6 h-6 border-2 border-black rounded-full bg-gray-100 cursor-pointer"/>
                    </h3>

                    <form onSubmit={handleSubmit(submitHandler)}
                          className='flex flex-col [&>label]:flex [&>label]:flex-col'>

                        <label className="mt-4 block">
                            English Translate
                            <input
                                className='input bg-gray-200 w-full mt-2'
                                {...register('en', {
                                    required: 'This field is required.',
                                    pattern: {
                                        value: /^[A-Za-z\s]+$|^$/,
                                        message: 'Only English letters and spaces are allowed, or leave it empty.',
                                    },
                                })}
                                type="text"
                            />
                        </label>
                        <span className='min-h-6 text-red-500'>{errors?.en?.message}</span>

                        <label>
                            Persian Translate
                            <input
                                className='input bg-gray-200 w-full mt-2'
                                {...register('fa', {
                                    pattern: {
                                        value: /^[آ-یءئۀ\s]+$|^$/,
                                        message: 'Only Persian letters and spaces are allowed, or leave it empty.',
                                    },
                                })}
                                type="text"
                            />
                        </label>
                        <span className='min-h-6 text-red-500'>{errors?.fa?.message}</span>

                        <label className="mt-4 block">
                            German Translate
                            <input
                                className='input bg-gray-200 w-full mt-2'
                                {...register('de', {
                                    pattern: {
                                        value: /^[A-Za-zäöüÄÖÜß\s]+$|^$/,
                                        message: 'Only German letters, special characters, and spaces are allowed, or leave it empty.',
                                    },
                                })}
                                type="text"
                            />
                        </label>
                        <span className='min-h-6 text-red-500'>{errors?.de?.message}</span>

                        <label className="mt-4 block">
                            Spanish Translate
                            <input
                                className='input bg-gray-200 w-full mt-2'
                                {...register('es', {
                                    pattern: {
                                        value: /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$|^$/,
                                        message: 'Only Spanish letters, special characters, and spaces are allowed, or leave it empty.',
                                    },
                                })}
                                type="text"
                            />
                        </label>
                        <span className='min-h-6 text-red-500'>{errors?.es?.message}</span>
                        <button
                            className='bg-blue-600 text-white flex items-center justify-center gap-1 p-3 w-full rounded font-semibold'>
                            <PlusIcon className="w-6 h-6"/>
                            Add Keyword
                        </button>
                    </form>
                </div>
                <form onSubmit={clearInputHandler} method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default AddKeywordModal
