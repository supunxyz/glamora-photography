import React, { useRef, useEffect, useState } from 'react';

const ScrollReveal = ({ children, className = "", direction = "up", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // Unobserve after revealing to keep it visible
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.15, // Trigger when 15% visible
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    const getDirectionClasses = () => {
        switch (direction) {
            case 'left': return '-translate-x-16';
            case 'right': return 'translate-x-16';
            case 'up': return 'translate-y-16';
            case 'down': return '-translate-y-16';
            default: return 'translate-y-16';
        }
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${getDirectionClasses()}`
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
