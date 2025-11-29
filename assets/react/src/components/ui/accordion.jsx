import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Accordion = React.forwardRef(({ className, type = "single", collapsible, children, ...props }, ref) => {
  const [openItems, setOpenItems] = React.useState(
    type === "single" ? null : []
  )

  const handleToggle = (value) => {
    if (type === "single") {
      setOpenItems(openItems === value ? null : value)
    } else {
      setOpenItems((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      )
    }
  }

  return (
    <div
      ref={ref}
      className={cn("space-y-2", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            openItems: type === "single" ? openItems : openItems,
            onToggle: handleToggle,
            type,
          })
        }
        return child
      })}
    </div>
  )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef(({ className, value, openItems, onToggle, type, children, ...props }, ref) => {
  const isOpen = type === "single" ? openItems === value : openItems?.includes(value)

  return (
    <div
      ref={ref}
      className={cn("border-b", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isOpen,
            onToggle: () => onToggle(value),
            value,
          })
        }
        return child
      })}
    </div>
  )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, isOpen, onToggle, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    )}
    onClick={onToggle}
    data-state={isOpen ? "open" : "closed"}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
  </button>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, children, isOpen, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all",
      isOpen ? "animate-accordion-down" : "animate-accordion-up"
    )}
    data-state={isOpen ? "open" : "closed"}
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>
      {children}
    </div>
  </div>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

