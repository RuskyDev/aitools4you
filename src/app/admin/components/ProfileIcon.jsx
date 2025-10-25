'use client'

export default function ProfileIcon({ name }) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .slice(0, 2)
        .join("")
    : "US";

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm select-none"
      style={{ backgroundColor: "#f0682c" }}
    >
      {initials}
    </div>
  );
}
