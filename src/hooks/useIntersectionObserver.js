// src/hooks/useIntersectionObserver.js

import { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = (options) => {
    const [entry, setEntry] = useState(null);
    const observer = useRef(null);
    const elementRef = useRef(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(([entry]) => {
            setEntry(entry);
        }, options);

        const { current: currentObserver } = observer;
        if (elementRef.current) {
            currentObserver.observe(elementRef.current);
        }

        return () => currentObserver.disconnect();
    }, [elementRef, options]);

    return [elementRef, entry];
};

export default useIntersectionObserver;