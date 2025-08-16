// import Image from "next/image"

// export function Sidebar() {
//   const menuItems = [
//     { icon: "/icons/dashboard.png", active:false },
//     { icon: "/icons/Frame.png", active: false },
//     { icon: "/icons/Frame (1).png", active: false },
//     { icon: "/icons/Frame (3).png", active: false },
//     { icon: "/icons/Frame (4).png", active: false },
//     { icon: "/icons/Frame (5).png", active: false },
//     { icon: "/icons/Frame (6).png", active: false },
//     { icon: "/icons/Frame (7).png", active: false },
//   ]

//   return (
//     <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-16 bg-[#252b3d] border-r border-[#3a4052] flex flex-col items-center py-4 space-y-2 z-40 hidden lg:flex">
//       {menuItems.map((item, index) => (
//         <button
//           key={index}
//           className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 ${
//             item.active ? "bg-orange-500 shadow-lg" : "text-gray-400 hover:text-white hover:bg-[#3a4052]"
//           }`}
//         >
//           <Image
//             src={item.active && item.activeIcon ? item.activeIcon : item.icon}
//             alt={`Menu item ${index + 1}`}
//             width={24}
//             height={24}
//             className={`w-6 h-6 ${item.active ? "brightness-0 invert" : "opacity-70 hover:opacity-100"}`}
//           />
//         </button>
//       ))}
//     </aside>
//   )
// }
import Image from "next/image"

export function Sidebar() {
  const menuItems = [
    { icon: "/icons/dashboard.png", active:false },
    { icon: "/icons/Frame.png", active: false },
    { icon: "/icons/Frame (1).png", active: false },
    { icon: "/icons/Frame (3).png", active: false },
    { icon: "/icons/Frame (4).png", active: false },
    { icon: "/icons/Frame (5).png", active: false },
    { icon: "/icons/Frame (6).png", active: false },
    { icon: "/icons/Frame (7).png", active: false },
  ]

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-20 bg-[#252b3d] border-r border-[#3a4052] flex flex-col items-center py-4 space-y-3 z-40 hidden lg:flex">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={`w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-200 ${
            item.active
              ? "bg-orange-500 shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-[#3a4052]"
          }`}
        >
          <Image
            src={item.icon}
            alt={`Menu item ${index + 1}`}
            width={32}  // bigger
            height={32} // bigger
            className={`w-8 h-8 ${
              item.active
                ? "brightness-0 invert contrast-150"
                : "opacity-90 hover:opacity-100 contrast-125"
            }`}
          />
        </button>
      ))}
    </aside>
  )
}
