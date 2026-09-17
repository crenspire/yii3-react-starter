import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext(null)
const AccordionItemContext = React.createContext(null)

const Accordion = React.forwardRef(({ className, type = "single", collapsible = false, children, ...props }, ref) => {
  const [openItems, setOpenItems] = React.useState([])

  const toggle = React.useCallback((value) => {
    setOpenItems((current) => {
      const isOpen = current.includes(value)
      if (type === "single") {
        return isOpen ? (collapsible ? [] : current) : [value]
      }
      return isOpen ? current.filter((item) => item !== value) : [...current, value]
    })
  }, [type, collapsible])

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef(({ className, value, ...props }, ref) => {
  const { openItems } = React.useContext(AccordionContext)
  const id = React.useId()
  const isOpen = openItems.includes(value)

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, id }}>
      <div
        ref={ref}
        className={cn("border-b", className)}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      />
    </AccordionItemContext.Provider>
  )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const { toggle } = React.useContext(AccordionContext)
  const { value, isOpen, id } = React.useContext(AccordionItemContext)

  return (
    <h3 className="flex">
      <button
        ref={ref}
        type="button"
        id={`${id}-trigger`}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        data-state={isOpen ? "open" : "closed"}
        onClick={() => toggle(value)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>
    </h3>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { isOpen, id } = React.useContext(AccordionItemContext)

  // Animates between 0fr and 1fr grid rows, so no measured height is needed.
  return (
    <div
      ref={ref}
      id={`${id}-content`}
      role="region"
      aria-labelledby={`${id}-trigger`}
      data-state={isOpen ? "open" : "closed"}
      inert={!isOpen}
      className={cn(
        "grid text-sm transition-[grid-template-rows] duration-200 ease-out",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
      {...props}
    >
      <div className="overflow-hidden">
        <div className={cn("pb-4 pt-0", className)}>{children}</div>
      </div>
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
