import { useMemo, useState } from "react";
// Adjust these import paths to match your project structure:
import { getTimeZones } from "@vvo/tzdb";
import { TimeZoneModal } from "./organisms/time-zone-modal/time-zone-modal.tsx";
import type { ListItem } from "./compounds/list-card/list-card.tsx";

// PerformanceTestPage: renders 200 independent modals,
// each containing your existing TimeZoneModal with 100,000 randomized timezones (ListItem[]).
export default function PerformanceTestPage() {
  // Build a 100,000-sized timezone dataset once, as ListItem[] with unique ids.
  const bigTimeZones: ListItem[] = useMemo(() => {
    const baseList = getTimeZones?.() ?? [];

    // Normalize to a string label seed from whatever getTimeZones() returns.
    const seed: string[] =
      baseList.length > 0
        ? baseList.map((z: any) =>
            typeof z === "string"
              ? z
              : (z.name ?? z.label ?? z.id ?? "Etc/UTC"),
          )
        : ["Etc/UTC", "America/New_York", "Europe/London", "Asia/Tokyo"];

    const target = 100_000;
    const items: ListItem[] = new Array(target);

    for (let i = 0; i < target; i++) {
      const pick = seed[(Math.random() * seed.length) | 0];
      // Unique id per item. Index alone guarantees uniqueness and is cheap to compute.
      const id = `tz-${i.toString(36)}`;
      const label = `${pick} #${i.toString(36)}`;
      items[i] = { id, label } as ListItem;
    }

    return items;
  }, []);

  const modalCount = 200;
  const [openMap, setOpenMap] = useState<boolean[]>(() =>
    Array.from({ length: modalCount }, () => false),
  );

  const openModal = (idx: number) => {
    setOpenMap((prev) => {
      if (prev[idx]) return prev;
      const copy = prev.slice();
      copy[idx] = true;
      return copy;
    });
  };

  const closeModal = (idx: number) => {
    setOpenMap((prev) => {
      if (!prev[idx]) return prev;
      const copy = prev.slice();
      copy[idx] = false;
      return copy;
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Performance Test</h1>
      <p>
        This page renders 200 independent modals. Opening any modal mounts a
        timezone picker with 100,000 randomized entries for stress testing.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12,
          marginTop: 16,
        }}
      >
        {Array.from({ length: modalCount }, (_, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              background: "#fafafa",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ fontWeight: 600 }}>Modal #{i + 1}</div>
            <button
              onClick={() => openModal(i)}
              style={{ padding: "6px 10px" }}
            >
              Open
            </button>

            {openMap[i] ? (
              <TimeZoneModal
                isOpen={true}
                onCloseCallback={() => closeModal(i)}
                // If your modal expects a different prop name (e.g., `items`, `options`), rename this prop accordingly.
                timeZoneList={bigTimeZones}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
