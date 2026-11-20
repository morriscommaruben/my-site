"use client"; // need useState for hovers
import { url } from "inspector";
import { useId, useState } from "react";

// individual items for the radial menu
export type RadialMenuItem = {
    id: string;
    label: string;
    // unsure, so optional; on-hover extra info
    detail?: string;
    imageURL?: string;
};

// properties for the radial menu type
type RadialMenuProps = {

    items: RadialMenuItem[];

    // (svg units) outer radius of menu
    // should scale to container
    radius?: number;

    // (svg units) radius of inner hole
    innerRadius?: number;

    // width of gap between pie segments
    gap?: number;

    // growth parameter for hovered segment
    // eg: 1.2 = 120% of original size
    hoverScale?: number;

    // cover = fill whole segment and crop if needed
    // contain = whole image visible but may not reach corners
    imageFit?: "cover" | "contain";
};

// convert from polar coords to cartesian and account for offset w/ centre
function polar(
    cx: number, 
    cy: number, 
    r: number, 
    angle: number
) {
    return {
        x: (cx + r * Math.sin(angle)),
        y: (cy + r * Math.cos(angle))
    };

}

// build single ring segment (google tells me this is called an "annular sector")
// angular padding = gap/radius
// so gap has same with at both inner and outer edge
// instead of being a wedge shape

// o1 --------- o2
//  \           /
//   \         /
//    i2 ---- i1

// inner = radius of inner edge
// outer = radius of outer edge
// start/end = angles in radians where segments start and end
// gap = total width of gap between segments
function segmentPath(
    c: number,
    inner: number,
    outer: number,
    start: number,
    end: number,
    gap: number,
) {

    // i need a total with of 'gap' between segments
    // so each segment yields HALF of the 'gap'
    // to have correct total together
    const half = gap / 2;

    // angle = distance / radius
    // inner angle will have to be bigger to cover same distance as outer arc
    // so i need 2 separate padding angles to keep width consistent
    const outerPad = half / outer;
    const innerPad = half / inner;

    const o1 = polar(c, c, outer, (start + outerPad));
    const o2 = polar(c, c, outer, (end - outerPad));
    const i1 = polar(c, c, inner, (end - innerPad));
    const i2 = polar(c, c, inner, (start + innerPad));

    // svg arcs: need to know if the arc takes up more than half of a circle
    // ie: more than PI
    // so check if (end-start) is more than pi
    // then store for use in arc to "tell" it how to draw
    const largeArc = (end - start > Math.PI) ? 1 : 0;

    // svg path commands
    // `M x y` = move pen to point without "drawing"
    // `A rx ry rot large sweep x y` = "draw" arc to point
    //                                 (sweep = 1 for counter-clockwise, 0 for clockwise)
    // `L x y` = "draw" straight line to point
    // "Z" = close shape (back to start)
    return [
        `M ${o1.x} ${o1.y}`, // start at outer corner on start side
        `A ${outer} ${outer} 0 ${largeArc} 0 ${o2.x} ${o2.y}`, // clockwise curve (outer edge)
        `L ${i1.x} ${i1.y}`, // line down to inner edge
        `A ${inner} ${inner} 0 ${largeArc} 1 ${i2.x} ${i2.y}`, // counter-clockwise curve back along inner edge
        "Z", // line back to start
    ].join(" ");

}

// find smallest rectangle inside bounds of segment
function segmentBounds(
    c: number,
    inner: number,
    outer: number,
    start: number,
    end: number,
) {
    const mid = (start + end) / 2;
    const points = [
        polar(c, c, outer, start),
        polar(c, c, outer, mid),
        polar(c, c, outer, end),
        polar(c, c, inner, start),
        polar(c, c, inner, mid),
        polar(c, c, inner, end),
    ];
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    return {
        x: minX,
        y: minY,
        width: Math.max(...xs) - minX,
        height: Math.max(...ys) - minY,
    };
}

export default function RadialMenu({
    // defaults if prop not passed in
    items,
    radius = 200,
    innerRadius = 70,
    gap = 8,
    hoverScale = 1.15,
    imageFit = "cover",
} : RadialMenuProps ) {

        // need to ID which segment is hovered (or if none is)
        // don't think i can avoid a re-render here
        const [activeId, setActiveId] = useState<string | null>(null);

        const uid = useId().replace(/:/g, "");

        // canvas for svg has to be bigger than circle to allow bigger (hovered)
        // segment to fit in
        // diameter = radius * 2 * hoverScale + margin
        const size = radius * 2 * hoverScale + 8;

        // centre of canvas (square so x = y)
        const c = size / 2;

        // angle taken up by each segment = full circle / no. of items
        // scale for any no. of items
        const step = (Math.PI * 2) / items.length;

        // temp label location (halfway)
        const labelRadius = (radius + innerRadius) / 2;

        // retrieve item id for hovered item
        // used for caption
        const active = items.find((item => item.id === activeId));

        return (
            <div className="flex flex-col min-w-dvh items-center">
                {/* viewBox for svg coord system */}
                <svg
                    viewBox={`0 0 ${size} ${size}`} 
                    className="w-full max-w-md" 
                    role="menu"
                    aria-label="Skills"
                >
                    {/* loop over given items and draw each segment */}
                    {items.map((item, i) => {

                        // segment i starts at i*step and ends 1 step later
                        const start = i * step;
                        const end = start + step;
                        const mid = start + step / 2; // middle angle for label

                        // is focus on current element
                        const isActive = item.id === activeId;

                        const labelPos = polar(c, c, labelRadius, mid);

                        // segment path
                        const d = segmentPath(c, innerRadius, radius, start, end, gap);

                        // unique id for this segment's clipPath
                        const clipId = `${uid}-clip-${item.id}`;
                
                        // only needed when there's an image, but cheap to compute
                        const bounds = segmentBounds(c, innerRadius, radius, start, end);


                        return (
                            // <g> to group shape and label
                            <g
                                key={item.id} // unique key for each list item (react needs)
                                role="menuitem"
                                tabIndex={0} // reachable with tab key
                                aria-label={item.label}
                                // facilitate hover on mouse entrance/exit
                                onMouseEnter={() => setActiveId(item.id)}
                                onMouseLeave={() => setActiveId(null)}
                                // do same for keyboard (tab) focus
                                onFocus={() => setActiveId(item.id)}
                                onBlur={() => setActiveId(null)}
                                className="cursor-pointer outline-none"
                                style={{
                                    // grow segment from centre
                                    // but need to also grow menu outward
                                    // prevent overlapping

                                    // transformOrigin = origin point for scaling
                                    transformOrigin: `${c}px ${c}px`,

                                    // transformBox view-box = measure from top-left instead of SHAPE'S origin
                                    transformBox: "view-box",

                                    // scaling mechanism (either 1 for regular size or hoverScale depending on active state)
                                    transform: `scale(${isActive ? hoverScale : 1})`,

                                    //animation for growth of selected segment
                                    transition: "transform 180ms ease-out",
                                }}
                            >
                                {/* clipPath = invisible cut-out */}
                                <defs>
                                    <clipPath id={clipId}>
                                    <path d={d} />
                                    </clipPath>
                                </defs>

                                <path
                                    // d = outline of segmentPath
                                    d={d}
                                    // temp: allow for 2 transition colours using active state
                                    className={
                                        `transition-colors duration-150 ${
                                            item.imageURL ? "fill-[#71808e]" : isActive ? "fill-[#f0a63a]" : "fill-[#71808e]"
                                        }` 
                                    }
                                />

                                {item.imageURL && (
                                    <image
                                        href={item.imageURL}
                                        // draw to segment's bounding rectangle
                                        x={bounds.x}
                                        y={bounds.y}
                                        width={bounds.width}
                                        height={bounds.height}
                                        // then trim to actual shape
                                        clipPath={`url(#${clipId})`}
                                        // slice = cover whole area (crops)
                                        // meet = fit inside (no crop)
                                        preserveAspectRatio={
                                            imageFit === "cover" ? "xMidYMid slice" : "xMidYMid meet"
                                        }
                                        // greyscale when idle, full colour on hover. because `filter`
                                        // is listed in `transition`, fades smoothly between the two.
                                        style={{
                                            filter: isActive ? "grayscale(0)" : "grayscale(1)",
                                            transition: "filter 180ms ease-out",
                                        }}


                                    />
                                )}

                                {/* label at segment centre */}
                                {/* <text
                                    x={labelPos.x}
                                    y={labelPos.y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    // ensure text doesn't block mouse
                                    // no select events
                                    className="pointer-events-none select-none text-[15px] font-semibold"
                                    // change text colour with hover
                                    style={{
                                        fill: isActive ? "#171717" : "#ffffff"
                                    }}
                                >
                                    {item.label}
                                </text> */}
                            </g>
                        );
                    })};
                </svg>
                <p className="mt-4 min-h-6 text-center text-lg" aria-live="polite">
                    {active?.detail}
                </p>
            </div>
        );
    };