// "use client"
//
// import React, { createContext, Dispatch, FormEventHandler, useContext, useState } from "react"
// import { usePathname, useSearchParams } from "next/navigation"
// import { useRouter } from "next/navigation"
//
// interface ISidebarContext<T extends string> {
//   filters: { [key in T]: any }
//   setFilters: Dispatch<React.SetStateAction<{ [key in T]: any }>>
// }
//
// const SidebarContext = createContext<ISidebarContext<any> | undefined>(undefined)
//
// export interface SidebarProps<T extends string> extends React.PropsWithChildren {
//   filters: ISidebarContext<T>["filters"]
//   onSubmit?: (filters: ISidebarContext<T>["filters"]) => void
//   onReset?: (filters: ISidebarContext<T>["filters"]) => void
// }
//
// const Sidebar = <T extends string>(props: SidebarProps<T>) => {
//   const searchParams = useSearchParams()
//   const pathname = usePathname()
//   const { replace } = useRouter()
//   const [ filters, setFilters ] = useState<ISidebarContext<T>["filters"]>(props.filters)
//
//   const submitHandler: FormEventHandler = event => {
//     event.preventDefault()
//
//     const params = new URLSearchParams(searchParams)
//
//     for (const filterKey in filters) {
//       if (filters[filterKey]) {
//         params.delete(filterKey)
//
//         if (Array.isArray(filters[filterKey])) {
//           for (const value of filters[filterKey]) {
//             params.append(filterKey, value)
//           }
//         } else {
//           params.set(filterKey, filters[filterKey])
//         }
//       } else {
//         params.delete(filterKey)
//       }
//     }
//
//     replace(`${pathname}?${params.toString()}`)
//
//     if (props.onSubmit) {
//       props.onSubmit(filters)
//     }
//   }
//
//   const resetHandler: FormEventHandler = event => {
//     event.preventDefault()
//     // @ts-ignore
//     setFilters(Object.fromEntries(Object.keys(filters).map(filterKey => [ filterKey, "" ])))
//
//     const params = new URLSearchParams(searchParams)
//
//     for (const filterKey in filters) {
//       params.delete(filterKey)
//     }
//
//     if (props.onReset) {
//       props.onReset(filters)
//     }
//   }
//
//   return (
//     // @ts-ignore
//     <SidebarContext.Provider value={{ filters, setFilters }}>
//       <aside className="sidebar">
//         <h1 className="sidebar__title">Filters</h1>
//         <form
//           className="sibebar__filters"
//           onSubmit={ submitHandler }
//           onReset={ resetHandler }
//         >
//           <div className="sidebar_btns">
//             { props.children }
//             <button type="submit" className="sibebar__btn">Search</button>
//             <button type="reset" className="sibebar__btn">Reset filters</button>
//           </div>
//         </form>
//       </aside>
//     </SidebarContext.Provider>
//   )
// }
//
// export interface SidebarItemProps<T extends string> extends React.PropsWithChildren {
//   filterKey: T
//   multiple?: boolean
//   groupLabel?: string
// }
//
// export const SidebarItem = <T extends string>(props: SidebarItemProps<T>) => {
//   const { filters, setFilters } = useContext(SidebarContext)! as ISidebarContext<T>
//
//   const handleChange = (value: any) => {
//     setFilters(filters => {
//       if (props.multiple) {
//         const currentValues = filters[props.filterKey] || []
//         return {
//           ...filters,
//           [props.filterKey]: currentValues.includes(value)
//             ? currentValues.filter((v: any) => v !== value)
//             : [...currentValues, value]
//         }
//       } else {
//         return { ...filters, [props.filterKey]: value }
//       }
//     })
//   }
//   return (
//     <div className="sidebar__item item-sidebar">
//       { props.groupLabel && <h3 className="item-sidebar__label">{ props.groupLabel }</h3> } {/* Добавляем заголовок группы, если он передан */ }
//       { React.Children.map(props.children, (child, index) => {
//         return React.cloneElement(child as React.ReactElement, {
//           key: index,
//           checked: props.multiple
//             ? filters[props.filterKey]?.includes((child as React.ReactElement).props.value)
//             : filters[props.filterKey] === (child as React.ReactElement).props.value,
//           onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value),
//         })
//       }) }
//     </div>
//   )
// }
//
// export default Sidebar
