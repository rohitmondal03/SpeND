import React, { useEffect } from 'react'

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import SplitTypes from "split-type";

import { cn } from '@/lib/utils';


const TextOpacityAnimations = (props) => {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const headingElement = document.querySelector(".animated-class")

        const text = new SplitTypes(headingElement, { types: "chars" });
        gsap.from(text.chars, {
            scrollTrigger: {
                trigger: headingElement,
                start: "top 70%",
                end: "end 0%",
                scrub: true,
                markers: false,
            },
            opacity: 0.1,
            stagger: 0.2,
        });
    })

    return (
        <p className={cn("animated-class", props.className)}>
            {props.text}
        </p>
    )
}

export default TextOpacityAnimations