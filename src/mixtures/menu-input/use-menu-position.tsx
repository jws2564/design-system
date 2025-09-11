import React, { useCallback, useState } from "react";

export type Placement = "top" | "bottom";

export interface UseMenuPositionOptions {
  open: boolean;
  margin?: number;
  preferredPlacement?: Placement;
  watchElementResize?: boolean;
  throttleMs?: number;
  zIndex?: number;
}

export interface MenuPositionResult {
  style: React.CSSProperties;
  placement: Placement;
  recomputePlacement: () => void;
}

export function useMenuPosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  menuRef: React.RefObject<HTMLElement | null>,
  options: UseMenuPositionOptions,
): MenuPositionResult {
  const {
    open,
    margin = 8,
    preferredPlacement = "bottom",
    watchElementResize = true,
    throttleMs = 16, // ~1 frame
    zIndex,
  } = options;

  const [placement, setPlacement] = useState<Placement>(preferredPlacement);

  const [style, setStyle] = useState<React.CSSProperties>(() => ({
    position: "fixed",
    top: "0px",
    left: "0px",
    minWidth: "0px",
    visibility: "hidden",
    pointerEvents: "none",
    ...(zIndex != null ? { zIndex } : {}),
  }));

  const compute = useCallback(() => {
    const triggerElement = triggerRef.current;
    const menuElement = menuRef.current;
    if (!triggerElement || !menuElement) return;

    const vw = window.visualViewport?.width ?? window.innerWidth;
    const vh = window.visualViewport?.height ?? window.innerHeight;

    const tRect = triggerElement.getBoundingClientRect();

    // Measure menu off-screen, fixed, hidden
    const prev = {
      position: menuElement.style.position,
      visibility: menuElement.style.visibility,
      top: menuElement.style.top,
      left: menuElement.style.left,
      minWidth: menuElement.style.minWidth,
    };
    const minWidth = Math.ceil(tRect.width);

    menuElement.style.position = "fixed";
    menuElement.style.visibility = "hidden";
    menuElement.style.top = "0px";
    menuElement.style.left = "0px";
    menuElement.style.minWidth = `${minWidth}px`;

    const mRect = menuElement.getBoundingClientRect();
    const belowSpace = vh - tRect.bottom - margin;
    const aboveSpace = tRect.top - margin;
    const fitsBelow = mRect.height <= belowSpace;
    const fitsAbove = mRect.height <= aboveSpace;

    let nextPlacement: Placement;
    if (preferredPlacement === "bottom") {
      nextPlacement =
        fitsBelow || (!fitsAbove && belowSpace >= aboveSpace)
          ? "bottom"
          : "top";
    } else {
      nextPlacement =
        fitsAbove || (!fitsBelow && aboveSpace >= belowSpace)
          ? "top"
          : "bottom";
    }

    const top =
      nextPlacement === "bottom"
        ? Math.min(tRect.bottom + margin, vh - margin - mRect.height)
        : Math.max(tRect.top - margin - mRect.height, margin);

    let left = tRect.left;

    if (left + mRect.width + margin > vw) {
      left = Math.max(margin, vw - margin - mRect.width);
    }

    if (left < margin) {
      left = margin;
    }

    // Restore temp styles
    menuElement.style.position = prev.position;
    menuElement.style.visibility = prev.visibility;
    menuElement.style.top = prev.top;
    menuElement.style.left = prev.left;
    menuElement.style.minWidth = prev.minWidth;

    setPlacement(nextPlacement);
    setStyle({
      position: "fixed",
      top: `${Math.round(top)}px`,
      left: `${Math.round(left)}px`,
      minWidth: `${minWidth}px`,
      visibility: "visible",
      pointerEvents: "auto",
      ...(zIndex != null ? { zIndex } : {}),
    });
  }, [triggerRef, menuRef, margin, preferredPlacement, zIndex]);

  // Throttled handler to coalesce rapid scroll/resize
  const throttledCompute = React.useRef<number | null>(null);

  const requestCompute = React.useCallback(() => {
    if (throttledCompute.current != null) return;
    throttledCompute.current = window.setTimeout(() => {
      throttledCompute.current = null;
      compute();
    }, throttleMs);
  }, [compute, throttleMs]);

  // Recompute when open + on viewport changes
  React.useLayoutEffect(() => {
    if (!open) return;
    // Compute synchronously before first paint of the open cycle
    compute();

    const onResize = requestCompute;
    const onScroll = requestCompute;

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // Optional: track element size changes (e.g., filtering)
    let ro: ResizeObserver | undefined;
    if (watchElementResize && "ResizeObserver" in window && menuRef.current) {
      ro = new ResizeObserver(() => requestCompute());
      ro.observe(menuRef.current);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      ro?.disconnect();
      if (throttledCompute.current != null) {
        clearTimeout(throttledCompute.current);
        throttledCompute.current = null;
      }
    };
  }, [open, compute, requestCompute, watchElementResize, menuRef]);

  return { style, placement, recomputePlacement: compute };
}
