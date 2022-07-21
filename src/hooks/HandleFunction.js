import { useState, useContext, useEffect, useMemo } from 'react';
import * as d3 from 'd3';

const HandleFunction = () => {

    const [deviceType, setDeviceType] = useState('');

    useEffect(() => {
        if (
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
            navigator.userAgent
        )
        ) {
        setDeviceType('Mobile');
        } else {
        setDeviceType('Desktop');
        }

        // console.log('durl', window.innerWidth)
        // if (window.innerWidth < 950) {
        //     setDeviceType('Mobile');
        // } else {
        //     setDeviceType('Desktop');
        // }
    }, []);



    const wrap = (text, width) => {
        text.each(function () {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.2, // ems
                x = text.attr("x"),
                y = text.attr("y"),
                dy = 0, //parseFloat(text.attr("dy")),
                tspan = text.text(null)
                            .append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan")
                                .attr("x", x)
                                .attr("y", y)
                                .attr("dy", ++lineNumber * lineHeight + dy + "em")
                                .text(word);
                }
            }
        });
    }


    function useIsInViewport(ref) {    
        const [isIntersecting, setIsIntersecting] = useState(false);	
      
        const observer = useMemo(
          () =>
            new IntersectionObserver(([entry]) =>            
              setIsIntersecting(entry.isIntersecting),
            ),
          [],
        );
      
        useEffect(() => {
          observer.observe(ref.current);
      
          return () => {
            observer.disconnect();
          };
        }, [ref, observer]);
      
        return isIntersecting;
    }

    return { wrap, deviceType, useIsInViewport };
}

export default HandleFunction;



