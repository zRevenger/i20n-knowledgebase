﻿import { useState, useEffect } from "react";

export default function UseLocalStorage(key, initialValue) {
    const[value, setValue] = useState(() => {
        try
        {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : initialValue;
        } catch (error) {
            console.error("Errore nel leggere localStorage", error);
            return initialValue;
        }
    });

    useEffect(() =>{
       try
       {
           localStorage.setItem(key, JSON.stringify(value));
       } catch(error){
           console.error("Errore nel salvare localStorage", error);
       }
    }, [key, value]);

    return [value, setValue];
}