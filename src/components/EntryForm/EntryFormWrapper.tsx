'use client';

import { useUIStore } from "src/store/FormEntryStore";
import { EntryForm } from "./EntryForm";




export const EntryFormWrapper = () => {
    const showForm = useUIStore((state) => state.showForm);

    if (!showForm) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            
            <EntryForm />
        </div>
    );
};
